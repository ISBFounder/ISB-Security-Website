import { NextResponse } from "next/server";
import {
  demoSchema,
  sectorLabels,
  challengeLabels,
  conversationLabels,
  timelineLabels,
  reportingMethodLabels,
} from "@/lib/validations";
import { formatDemoEmail, sendMail } from "@/lib/email";
import { limitFormRequest } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip =
      forwarded?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    let limited: Awaited<ReturnType<typeof limitFormRequest>> | null = null;
    try {
      limited = await limitFormRequest(`demo:${ip}`);
    } catch {
      console.error("[demo] rate limit unavailable");
      limited = null;
    }

    if (limited && !limited.success) {
      return NextResponse.json(
        {
          error:
            "Too many requests were received from this connection. Please try again later.",
          code: "rate_limited",
        },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Validation failed", code: "validation_failed" },
        { status: 400 }
      );
    }

    const parsed = demoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          code: "validation_failed",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    // Do not send mail when the rate limiter cannot be reached.
    if (!limited) {
      return NextResponse.json(
        {
          error:
            "Online submission is temporarily unavailable. Please email info@isbsecuritysolutions.nl.",
          code: "server",
        },
        { status: 503 }
      );
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const d = parsed.data;
    const mail = formatDemoEmail({
      company: d.company,
      contactPerson: d.contactPerson,
      jobTitle: d.jobTitle || "",
      email: d.email,
      phone: d.phone || "",
      companySize: d.companySize,
      workforceSize: d.workforceSize,
      country: d.country,
      websiteUrl: d.websiteUrl || "",
      sectors: d.sectors.map((s) => sectorLabels[s] || s),
      currentSoftware: d.currentSoftware || "",
      reportingMethods: (d.reportingMethods || []).map(
        (r) => reportingMethodLabels[r] || r
      ),
      activeObjects: d.activeObjects || "",
      multiCustomer: d.multiCustomer || "",
      centralPlanning: d.centralPlanning || "",
      mobileWorkforce: d.mobileWorkforce || "",
      challenges: d.challenges.map((c) => challengeLabels[c] || c),
      conversation: conversationLabels[d.conversation] || d.conversation,
      timeline: timelineLabels[d.timeline] || d.timeline,
      message: d.message || "",
    });

    const result = await sendMail(mail);

    if (!result.ok) {
      const status = result.code === "NO_PROVIDER" ? 503 : 502;
      return NextResponse.json(
        {
          error:
            result.code === "NO_PROVIDER"
              ? "Online submission is temporarily unavailable. Please email info@isbsecuritysolutions.nl."
              : "Failed to deliver your request. Please try again or email us directly.",
          code: result.code,
        },
        { status }
      );
    }

    return NextResponse.json({ ok: true, id: result.id });
  } catch {
    return NextResponse.json(
      { error: "Server error", code: "server" },
      { status: 500 }
    );
  }
}

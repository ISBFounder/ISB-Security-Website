import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { formatContactEmail, sendMail } from "@/lib/email";
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
      limited = await limitFormRequest(`contact:${ip}`);
    } catch {
      console.error("[contact] rate limit unavailable");
      limited = null;
    }

    if (limited && !limited.success) {
      return NextResponse.json(
        {
          error:
            "Too many submissions were received from this connection. Please try again later.",
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

    const parsed = contactSchema.safeParse(body);

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
            "Message delivery is temporarily unavailable. Please email info@isbsecuritysolutions.nl directly.",
          code: "server",
        },
        { status: 503 }
      );
    }

    // Honeypot — accept silently without sending
    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const mail = formatContactEmail(parsed.data);
    const result = await sendMail(mail);

    if (!result.ok) {
      const status = result.code === "NO_PROVIDER" ? 503 : 502;
      return NextResponse.json(
        {
          error:
            result.code === "NO_PROVIDER"
              ? "Message delivery is temporarily unavailable. Please email info@isbsecuritysolutions.nl directly."
              : "Failed to deliver your message. Please try again or email us directly.",
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

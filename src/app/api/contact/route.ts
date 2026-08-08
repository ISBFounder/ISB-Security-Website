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

    const limited = await limitFormRequest(`contact:${ip}`);
    if (!limited.success) {
      return NextResponse.json(
        {
          error:
            "Too many submissions were received from this connection. Please try again later.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
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
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

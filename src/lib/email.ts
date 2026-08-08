import { Resend } from "resend";
import { enquiryTypeLabels, type EnquiryType } from "@/lib/validations";

const resendKey = process.env.RESEND_API_KEY;
const fromEmail =
  process.env.CONTACT_FROM_EMAIL || "noreply@isbsecuritysolutions.nl";
const toEmail =
  process.env.CONTACT_TO_EMAIL || "info@isbsecuritysolutions.nl";

export type MailPayload = {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export type MailResult =
  | { ok: true; id?: string }
  | { ok: false; error: string; code: "NO_PROVIDER" | "SEND_FAILED" };

export function isMailConfigured(): boolean {
  return Boolean(resendKey && resendKey.length > 10);
}

export async function sendMail(payload: MailPayload): Promise<MailResult> {
  if (!isMailConfigured()) {
    return {
      ok: false,
      error:
        "Email delivery is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL.",
      code: "NO_PROVIDER",
    };
  }

  try {
    const resend = new Resend(resendKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      replyTo: payload.replyTo,
    });

    if (error) {
      console.error("[email] Resend error:", error.message || error);
      return {
        ok: false,
        error: error.message || "Send failed",
        code: "SEND_FAILED",
      };
    }

    return { ok: true, id: data?.id };
  } catch (err) {
    console.error("[email] Exception:", err instanceof Error ? err.message : "unknown");
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Send failed",
      code: "SEND_FAILED",
    };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function formatContactEmail(data: {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  enquiryType?: EnquiryType | string;
}): MailPayload {
  const ts = new Date().toISOString();
  const typeKey = (data.enquiryType || "general") as EnquiryType;
  const typeLabel =
    enquiryTypeLabels[typeKey] || String(data.enquiryType || "General");
  const who = data.company?.trim() || data.name;

  const fields: [string, string][] = [
    ["Enquiry type", typeLabel],
    ["Name", data.name],
    ["Company", data.company?.trim() || "—"],
    ["Email", data.email],
    ["Phone", data.phone?.trim() || "—"],
    ["Subject", data.subject],
    ["Submitted", ts],
    ["Message", data.message],
  ];

  const text = fields.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `
    <h2>Contact enquiry — ISB Security Solutions</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${fields
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top">${escapeHtml(k)}</td><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
        )
        .join("")}
    </table>
  `;

  return {
    subject: `ISB Contact — ${typeLabel} — ${who}`,
    html,
    text,
    replyTo: data.email,
  };
}

export function formatDemoEmail(data: {
  company: string;
  contactPerson: string;
  jobTitle?: string;
  email: string;
  phone?: string;
  companySize: string;
  workforceSize: string;
  country: string;
  websiteUrl?: string;
  sectors: string[];
  currentSoftware?: string;
  reportingMethods?: string[];
  activeObjects?: string;
  multiCustomer?: string;
  centralPlanning?: string;
  mobileWorkforce?: string;
  challenges: string[];
  conversation: string;
  timeline: string;
  message?: string;
}): MailPayload {
  const ts = new Date().toISOString();
  const fields: [string, string][] = [
    ["Company", data.company],
    ["Contact person", data.contactPerson],
    ["Job title", data.jobTitle || "—"],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Company size", data.companySize],
    ["Security workforce", data.workforceSize],
    ["Country", data.country],
    ["Website", data.websiteUrl || "—"],
    ["Sectors", (data.sectors || []).join(", ") || "—"],
    ["Current software", data.currentSoftware || "—"],
    ["Reporting methods", (data.reportingMethods || []).join(", ") || "—"],
    ["Active objects", data.activeObjects || "—"],
    ["Multiple customers", data.multiCustomer || "—"],
    ["Central planning", data.centralPlanning || "—"],
    ["Mobile workforce", data.mobileWorkforce || "—"],
    ["Challenges", (data.challenges || []).join(", ") || "—"],
    ["Conversation interest", data.conversation],
    ["Timeline", data.timeline],
    ["Message", data.message || "—"],
    ["Submitted", ts],
  ];

  const textBody = fields.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `
    <h2>Demo request — ISB Security Solutions</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${fields
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top">${escapeHtml(k)}</td><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
        )
        .join("")}
    </table>
  `;

  return {
    subject: `ISB Demo Request — ${data.conversation} — ${data.company}`,
    html,
    text: textBody,
    replyTo: data.email,
  };
}


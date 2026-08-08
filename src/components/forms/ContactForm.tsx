"use client";

import {
  useState,
  useRef,
  useEffect,
  FormEvent,
  useMemo,
} from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  enquiryTypes,
  enquiryTypeLabels,
  type EnquiryType,
} from "@/lib/validations";
import { cn } from "@/lib/utils";

type Status =
  | "idle"
  | "submitting"
  | "success"
  | "validation"
  | "server"
  | "rate_limited"
  | "unavailable";

const fieldClass =
  "mt-1.5 w-full border border-border bg-bg/80 px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-60";

const INTENT_MAP: Record<string, EnquiryType> = {
  pilot: "pilot",
  partnership: "partnership",
  security: "security",
  platform: "platform",
  general: "general",
  other: "other",
};

export function ContactForm() {
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent");
  const initialType = useMemo<EnquiryType>(() => {
    if (intent && INTENT_MAP[intent]) return INTENT_MAP[intent];
    return "general";
  }, [intent]);

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [enquiryType, setEnquiryType] = useState<EnquiryType>(initialType);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEnquiryType(initialType);
  }, [initialType]);

  useEffect(() => {
    if (
      (status === "validation" ||
        status === "server" ||
        status === "rate_limited" ||
        status === "unavailable") &&
      errorRef.current
    ) {
      errorRef.current.focus();
    }
    if (status === "success" && successRef.current) {
      successRef.current.focus();
    }
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    setFieldErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      subject: String(fd.get("subject") || ""),
      message: String(fd.get("message") || ""),
      enquiryType: String(fd.get("enquiryType") || enquiryType),
      privacy: fd.get("privacy") === "on" ? "on" : "",
      website: String(fd.get("website") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 429) {
        setStatus("rate_limited");
        setErrorMsg(
          data.error ||
            "Too many submissions were received from this connection. Please try again later."
        );
        return;
      }

      if (res.status === 503 || data.code === "NO_PROVIDER") {
        setStatus("unavailable");
        setErrorMsg(
          data.error ||
            "Your message could not be delivered. Please try again later or contact ISB directly by email."
        );
        return;
      }

      if (res.status === 400) {
        setStatus("validation");
        const details = data.details?.fieldErrors as
          | Record<string, string[]>
          | undefined;
        if (details) {
          const mapped: Record<string, string> = {};
          Object.entries(details).forEach(([k, v]) => {
            if (v?.[0]) mapped[k] = v[0];
          });
          setFieldErrors(mapped);
        }
        setErrorMsg(data.error || "Please correct the highlighted fields.");
        return;
      }

      if (!res.ok || !data.ok) {
        setStatus("server");
        setErrorMsg(
          data.error ||
            "Your message could not be delivered. Please try again later or contact ISB directly by email."
        );
        return;
      }

      setStatus("success");
      form.reset();
      setEnquiryType(initialType);
    } catch {
      setStatus("server");
      setErrorMsg(
        "Your message could not be delivered. Please try again later or contact ISB directly by email."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="border border-status-success/30 bg-status-success/5 p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <h3 className="text-lg font-semibold text-ink">
          Your message has been received by ISB Security Solutions.
        </h3>
        <p className="mt-2 text-sm text-ink-secondary">
          ISB reviews incoming enquiries and responds where follow-up is
          appropriate.
        </p>
        <button
          type="button"
          className="mt-6 text-[13px] font-medium text-gold hover:text-gold-light"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  const busy = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5"
      noValidate
      aria-busy={busy}
    >
      {(status === "validation" ||
        status === "server" ||
        status === "rate_limited" ||
        status === "unavailable") && (
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          className="border border-status-critical/40 bg-status-critical/5 px-4 py-3 text-sm text-ink-secondary"
        >
          <p className="font-medium text-ink">{errorMsg}</p>
          {(status === "server" || status === "unavailable") && (
            <p className="mt-2">
              Direct email:{" "}
              <a
                href="mailto:info@isbsecuritysolutions.nl"
                className="text-gold hover:text-gold-light"
              >
                info@isbsecuritysolutions.nl
              </a>
            </p>
          )}
          {Object.keys(fieldErrors).length > 0 && (
            <ul className="mt-2 list-inside list-disc text-[13px]">
              {Object.entries(fieldErrors).map(([k, v]) => (
                <li key={k}>{v}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div>
        <label htmlFor="enquiryType" className="text-sm text-ink-secondary">
          Enquiry type
        </label>
        <select
          id="enquiryType"
          name="enquiryType"
          value={enquiryType}
          onChange={(e) => setEnquiryType(e.target.value as EnquiryType)}
          disabled={busy}
          className={fieldClass}
        >
          {enquiryTypes.map((t) => (
            <option key={t} value={t}>
              {enquiryTypeLabels[t]}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm text-ink-secondary">
            Name *
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={120}
            disabled={busy}
            className={cn(fieldClass, fieldErrors.name && "border-status-critical")}
            autoComplete="name"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "err-name" : undefined}
          />
          {fieldErrors.name && (
            <p id="err-name" className="mt-1 text-[12px] text-status-critical">
              {fieldErrors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="text-sm text-ink-secondary">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            disabled={busy}
            className={cn(fieldClass, fieldErrors.email && "border-status-critical")}
            autoComplete="email"
            aria-invalid={Boolean(fieldErrors.email)}
          />
          {fieldErrors.email && (
            <p className="mt-1 text-[12px] text-status-critical">
              {fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="text-sm text-ink-secondary">
            Company
          </label>
          <input
            id="company"
            name="company"
            maxLength={160}
            disabled={busy}
            className={fieldClass}
            autoComplete="organization"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm text-ink-secondary">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            maxLength={40}
            disabled={busy}
            className={fieldClass}
            autoComplete="tel"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="text-sm text-ink-secondary">
          Subject *
        </label>
        <input
          id="subject"
          name="subject"
          required
          maxLength={200}
          disabled={busy}
          className={cn(fieldClass, fieldErrors.subject && "border-status-critical")}
          aria-invalid={Boolean(fieldErrors.subject)}
        />
        {fieldErrors.subject && (
          <p className="mt-1 text-[12px] text-status-critical">
            {fieldErrors.subject}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-sm text-ink-secondary">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          maxLength={5000}
          disabled={busy}
          className={cn(fieldClass, fieldErrors.message && "border-status-critical")}
          aria-invalid={Boolean(fieldErrors.message)}
        />
        {fieldErrors.message && (
          <p className="mt-1 text-[12px] text-status-critical">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Honeypot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-muted">
        <input
          type="checkbox"
          name="privacy"
          value="on"
          required
          disabled={busy}
          className="mt-1"
        />
        <span>
          Information submitted through this form is used to respond to your
          enquiry. See our{" "}
          <a href="/privacy" className="text-gold hover:underline">
            Privacy Policy
          </a>
          .
        </span>
      </label>

      {enquiryType === "security" && (
        <p className="text-[12px] text-ink-muted">
          Potential security issues may be reported through this form or
          directly to{" "}
          <a
            href="mailto:info@isbsecuritysolutions.nl"
            className="text-gold hover:text-gold-light"
          >
            info@isbsecuritysolutions.nl
          </a>
          . No bug bounty or response SLA is claimed.
        </p>
      )}

      <Button type="submit" disabled={busy}>
        {busy ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}

"use client";

import {
  useState,
  useRef,
  useEffect,
  FormEvent,
  useMemo,
} from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import {
  enquiryTypes,
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
  const t = useTranslations("forms");
  const errors = useTranslations("forms.errors");
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent");
  const initialType = useMemo<EnquiryType>(() => {
    if (intent && INTENT_MAP[intent]) return INTENT_MAP[intent];
    return "general";
  }, [intent]);

  const [status, setStatus] = useState<Status>("idle");
  const [errorKey, setErrorKey] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [enquiryType, setEnquiryType] = useState<EnquiryType>(initialType);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  function fieldText(code: string) {
    return errors.has(code) ? errors(code) : t("banners.validationFailed");
  }

  function bannerText(key: string) {
    const path = `banners.${key}`;
    return t.has(path) ? t(path) : t("banners.validationFailed");
  }

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
    setErrorKey("");
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
      const code = typeof data?.code === "string" ? data.code : undefined;

      if (res.status === 429 || code === "rate_limited") {
        setStatus("rate_limited");
        setErrorKey("contactRateLimited");
        return;
      }

      if (res.status === 503 || code === "NO_PROVIDER") {
        setStatus("unavailable");
        setErrorKey("contactNoProvider");
        return;
      }

      if (res.status === 502 || code === "SEND_FAILED") {
        setStatus("server");
        setErrorKey("contactSendFailed");
        return;
      }

      if (res.status === 400 || code === "validation_failed") {
        setStatus("validation");
        const details = data?.details?.fieldErrors as
          | Record<string, string[]>
          | undefined;
        if (details) {
          const mapped: Record<string, string> = {};
          Object.entries(details).forEach(([k, v]) => {
            if (typeof v?.[0] === "string" && v[0]) mapped[k] = v[0];
          });
          setFieldErrors(mapped);
        }
        setErrorKey("validationFailed");
        return;
      }

      if (res.status === 500 || code === "server") {
        setStatus("server");
        setErrorKey("server");
        return;
      }

      if (!res.ok || !data?.ok) {
        setStatus("server");
        setErrorKey("contactNetwork");
        return;
      }

      setStatus("success");
      form.reset();
      setEnquiryType(initialType);
    } catch {
      setStatus("server");
      setErrorKey("contactNetwork");
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
          {t("contact.successTitle")}
        </h3>
        <p className="mt-2 text-sm text-ink-secondary">
          {t("contact.successBody")}
        </p>
        <button
          type="button"
          className="mt-6 text-[13px] font-medium text-gold hover:text-gold-light"
          onClick={() => setStatus("idle")}
        >
          {t("contact.sendAnother")}
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
      aria-label={t("contact.ariaForm")}
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
          <p className="font-medium text-ink">{bannerText(errorKey)}</p>
          {(status === "server" || status === "unavailable") && (
            <p className="mt-2">
              {t("contact.directEmail")}{" "}
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
                <li key={k}>{fieldText(v)}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div>
        <label htmlFor="enquiryType" className="text-sm text-ink-secondary">
          {t("contact.enquiryType")}
        </label>
        <select
          id="enquiryType"
          name="enquiryType"
          value={enquiryType}
          onChange={(e) => setEnquiryType(e.target.value as EnquiryType)}
          disabled={busy}
          className={fieldClass}
        >
          {enquiryTypes.map((id) => (
            <option key={id} value={id}>
              {t(`enquiryTypes.${id}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm text-ink-secondary">
            {t("contact.name")}
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
              {fieldText(fieldErrors.name)}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="text-sm text-ink-secondary">
            {t("contact.email")}
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
            aria-describedby={fieldErrors.email ? "err-email" : undefined}
          />
          {fieldErrors.email && (
            <p id="err-email" className="mt-1 text-[12px] text-status-critical">
              {fieldText(fieldErrors.email)}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="text-sm text-ink-secondary">
            {t("contact.company")}
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
            {t("contact.phone")}
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
          {t("contact.subject")}
        </label>
        <input
          id="subject"
          name="subject"
          required
          maxLength={200}
          disabled={busy}
          className={cn(fieldClass, fieldErrors.subject && "border-status-critical")}
          aria-invalid={Boolean(fieldErrors.subject)}
          aria-describedby={fieldErrors.subject ? "err-subject" : undefined}
        />
        {fieldErrors.subject && (
          <p id="err-subject" className="mt-1 text-[12px] text-status-critical">
            {fieldText(fieldErrors.subject)}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-sm text-ink-secondary">
          {t("contact.message")}
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
          aria-describedby={fieldErrors.message ? "err-message" : undefined}
        />
        {fieldErrors.message && (
          <p id="err-message" className="mt-1 text-[12px] text-status-critical">
            {fieldText(fieldErrors.message)}
          </p>
        )}
      </div>

      {/* Honeypot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="website">{t("contact.honeypot")}</label>
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
          aria-invalid={Boolean(fieldErrors.privacy)}
        />
        <span>
          {t("contact.privacyBefore")}
          <Link href="/privacy" className="text-gold hover:underline">
            {t("contact.privacyLink")}
          </Link>
          {t("contact.privacyAfter")}
        </span>
      </label>

      {enquiryType === "security" && (
        <p className="text-[12px] text-ink-muted">
          {t("contact.securityBefore")}{" "}
          <a
            href="mailto:info@isbsecuritysolutions.nl"
            className="text-gold hover:text-gold-light"
          >
            info@isbsecuritysolutions.nl
          </a>
          {t("contact.securityAfter")}
        </p>
      )}

      <Button type="submit" disabled={busy}>
        {busy ? t("contact.sending") : t("contact.send")}
      </Button>
    </form>
  );
}

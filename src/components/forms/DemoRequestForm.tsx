"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  companySizeOptions,
  workforceSizeOptions,
  sectorOptions,
  reportingMethodOptions,
  challengeOptions,
  conversationOptions,
  timelineOptions,
} from "@/lib/validations";

type Status =
  | "idle"
  | "submitting"
  | "success"
  | "validation"
  | "server"
  | "rate_limited"
  | "unavailable";

type FormData = {
  company: string;
  contactPerson: string;
  jobTitle: string;
  email: string;
  phone: string;
  companySize: string;
  workforceSize: string;
  country: string;
  websiteUrl: string;
  sectors: string[];
  currentSoftware: string;
  reportingMethods: string[];
  activeObjects: string;
  multiCustomer: string;
  centralPlanning: string;
  mobileWorkforce: string;
  challenges: string[];
  conversation: string;
  timeline: string;
  message: string;
  privacy: boolean;
  website: string;
};

const initial: FormData = {
  company: "",
  contactPerson: "",
  jobTitle: "",
  email: "",
  phone: "",
  companySize: "",
  workforceSize: "",
  country: "",
  websiteUrl: "",
  sectors: [],
  currentSoftware: "",
  reportingMethods: [],
  activeObjects: "",
  multiCustomer: "",
  centralPlanning: "",
  mobileWorkforce: "",
  challenges: [],
  conversation: "",
  timeline: "",
  message: "",
  privacy: false,
  website: "",
};

const STEPS = [
  { id: 1, key: "organization" },
  { id: 2, key: "operations" },
  { id: 3, key: "requirements" },
  { id: 4, key: "review" },
] as const;

const field =
  "mt-1.5 w-full border border-border bg-bg/80 px-3 py-2.5 text-sm text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-60";

function toggleIn(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
}

export function DemoRequestForm() {
  const t = useTranslations("forms");
  const errors = useTranslations("forms.errors");
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(() => ({
    ...initial,
    country: t("demo.defaultCountry"),
  }));
  const [status, setStatus] = useState<Status>("idle");
  const [errorKey, setErrorKey] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  function fieldText(code: string) {
    return errors.has(code) ? errors(code) : t("banners.validationFailed");
  }

  function bannerText(key: string) {
    const path = `banners.${key}`;
    return t.has(path) ? t(path) : t("banners.validationFailed");
  }

  function optionText(group: string, id: string, blank = "") {
    if (!id) return blank;
    const key = `${group}.${id}`;
    return t.has(key) ? t(key) : t("banners.validationFailed");
  }

  function yesNoLabel(value: string, single = false) {
    if (!value) return t("demo.empty");
    if (value === "yes") return t("demo.yes");
    if (value === "no") return single ? t("demo.noSingle") : t("demo.no");
    if (value === "unknown") return t("demo.unknown");
    return t("banners.validationFailed");
  }

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (
      ["validation", "server", "rate_limited", "unavailable"].includes(status)
    ) {
      errorRef.current?.focus();
    }
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function validateStep(s: number): boolean {
    const errs: Record<string, string> = {};
    if (s === 1) {
      if (data.company.trim().length < 2) errs.company = "company_required";
      if (data.contactPerson.trim().length < 2)
        errs.contactPerson = "contact_required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
        errs.email = "email_business";
      if (!data.companySize) errs.companySize = "company_size_required";
      if (!data.workforceSize)
        errs.workforceSize = "workforce_required";
      if (data.country.trim().length < 2) errs.country = "country_required";
    }
    if (s === 2) {
      if (data.sectors.length < 1)
        errs.sectors = "sector_required";
    }
    if (s === 3) {
      if (data.challenges.length < 1)
        errs.challenges = "challenge_required";
      if (!data.conversation)
        errs.conversation = "conversation_required";
      if (!data.timeline) errs.timeline = "timeline_required";
      if (!data.privacy) errs.privacy = "privacy_required";
    }
    setFieldErrors(errs);
    if (Object.keys(errs).length) {
      setStatus("validation");
      setErrorKey("correctFields");
      return false;
    }
    setStatus("idle");
    setErrorKey("");
    return true;
  }

  function next() {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(4, s + 1));
  }

  function back() {
    setStatus("idle");
    setErrorKey("");
    setFieldErrors({});
    setStep((s) => Math.max(1, s - 1));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    // Submit is only allowed from the review step (step 4).
    // Enter key or accidental form submit on earlier steps must not send the request.
    if (step !== 4) {
      if (validateStep(step)) {
        setStep((s) => Math.min(4, s + 1));
      }
      return;
    }

    // Re-validate required fields from step 3 before sending.
    if (!validateStep(3)) {
      setStep(3);
      return;
    }

    // Prevent double submit.
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorKey("");

    const payload = {
      company: data.company,
      contactPerson: data.contactPerson,
      jobTitle: data.jobTitle,
      email: data.email,
      phone: data.phone,
      companySize: data.companySize,
      workforceSize: data.workforceSize,
      country: data.country,
      websiteUrl: data.websiteUrl,
      sectors: data.sectors,
      currentSoftware: data.currentSoftware,
      reportingMethods: data.reportingMethods,
      activeObjects: data.activeObjects,
      multiCustomer: data.multiCustomer || undefined,
      centralPlanning: data.centralPlanning || undefined,
      mobileWorkforce: data.mobileWorkforce || undefined,
      challenges: data.challenges,
      conversation: data.conversation,
      timeline: data.timeline,
      message: data.message,
      privacy: data.privacy ? "on" : "",
      website: data.website,
    };

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      const code = typeof body?.code === "string" ? body.code : undefined;

      if (res.status === 429 || code === "rate_limited") {
        setStatus("rate_limited");
        setErrorKey("demoRateLimited");
        return;
      }
      if (res.status === 503 || code === "NO_PROVIDER") {
        setStatus("unavailable");
        setErrorKey("demoNoProvider");
        return;
      }
      if (res.status === 502 || code === "SEND_FAILED") {
        setStatus("server");
        setErrorKey("demoSendFailed");
        return;
      }
      if (res.status === 400 || code === "validation_failed") {
        setStatus("validation");
        const details = body?.details?.fieldErrors as
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
        setStep(1);
        return;
      }
      if (res.status === 500 || code === "server") {
        setStatus("server");
        setErrorKey("server");
        return;
      }
      if (!res.ok || !body?.ok) {
        setStatus("server");
        setErrorKey("demoNetwork");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("server");
      setErrorKey("demoNetwork");
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
        <h2 className="text-lg font-semibold text-ink">
          {t("demo.successTitle")}
        </h2>
        <p className="mt-3 text-sm text-ink-secondary">
          {t("demo.successBody")}
        </p>
      </div>
    );
  }

  const busy = status === "submitting";

  return (
    <div>
      {/* Progress */}
      <nav aria-label={t("demo.ariaSteps")} className="mb-8 border-b border-border">
        <ol className="flex flex-wrap gap-0">
          {STEPS.map((s) => {
            const current = step === s.id;
            const done = step > s.id;
            return (
              <li key={s.id} className="flex items-center">
                <button
                  type="button"
                  disabled={s.id > step || busy}
                  onClick={() => s.id < step && setStep(s.id)}
                  className={cn(
                    "border-b-2 px-3 py-2.5 text-[12px] font-medium transition-colors sm:px-4 sm:text-[13px]",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
                    current
                      ? "border-gold text-ink"
                      : done
                        ? "border-transparent text-ink-secondary hover:text-ink"
                        : "border-transparent text-ink-faint"
                  )}
                  aria-current={current ? "step" : undefined}
                >
                  <span className="font-mono text-[10px] text-ink-faint">
                    0{s.id}
                  </span>{" "}
                  {t(`demo.steps.${s.key}`)}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {(status === "validation" ||
        status === "server" ||
        status === "rate_limited" ||
        status === "unavailable") && (
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          className="mb-6 border border-status-critical/40 bg-status-critical/5 px-4 py-3 text-sm text-ink-secondary"
        >
          <p className="font-medium text-ink">{bannerText(errorKey)}</p>
          {(status === "server" || status === "unavailable") && (
            <p className="mt-2">
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

      <form onSubmit={onSubmit} noValidate aria-busy={busy} aria-label={t("demo.ariaForm")}>
        {/* Step 1 */}
        {step === 1 && (
          <fieldset disabled={busy} className="space-y-5">
            <legend className="sr-only">{t("demo.steps.organization")}</legend>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="heading-md outline-none"
            >
              {t("demo.headings.organization")}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="company" className="text-sm text-ink-secondary">
                  {t("demo.company")}
                </label>
                <input
                  id="company"
                  className={cn(field, fieldErrors.company && "border-status-critical")}
                  value={data.company}
                  onChange={(e) => set("company", e.target.value)}
                  maxLength={160}
                  autoComplete="organization"
                  aria-invalid={Boolean(fieldErrors.company)}
                />
              </div>
              <div>
                <label
                  htmlFor="contactPerson"
                  className="text-sm text-ink-secondary"
                >
                  {t("demo.contactPerson")}
                </label>
                <input
                  id="contactPerson"
                  className={cn(
                    field,
                    fieldErrors.contactPerson && "border-status-critical"
                  )}
                  value={data.contactPerson}
                  onChange={(e) => set("contactPerson", e.target.value)}
                  maxLength={120}
                  autoComplete="name"
                  aria-invalid={Boolean(fieldErrors.contactPerson)}
                />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="jobTitle" className="text-sm text-ink-secondary">
                  {t("demo.jobTitle")}
                </label>
                <input
                  id="jobTitle"
                  className={field}
                  value={data.jobTitle}
                  onChange={(e) => set("jobTitle", e.target.value)}
                  maxLength={120}
                  autoComplete="organization-title"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm text-ink-secondary">
                  {t("demo.businessEmail")}
                </label>
                <input
                  id="email"
                  type="email"
                  className={cn(field, fieldErrors.email && "border-status-critical")}
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                  maxLength={200}
                  autoComplete="email"
                  aria-invalid={Boolean(fieldErrors.email)}
                />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="text-sm text-ink-secondary">
                  {t("demo.phone")}
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={field}
                  value={data.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  maxLength={40}
                  autoComplete="tel"
                />
              </div>
              <div>
                <label htmlFor="country" className="text-sm text-ink-secondary">
                  {t("demo.country")}
                </label>
                <input
                  id="country"
                  className={cn(field, fieldErrors.country && "border-status-critical")}
                  value={data.country}
                  onChange={(e) => set("country", e.target.value)}
                  maxLength={80}
                  autoComplete="country-name"
                  aria-invalid={Boolean(fieldErrors.country)}
                />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="companySize"
                  className="text-sm text-ink-secondary"
                >
                  {t("demo.companySize")}
                </label>
                <select
                  id="companySize"
                  className={cn(
                    field,
                    fieldErrors.companySize && "border-status-critical"
                  )}
                  value={data.companySize}
                  onChange={(e) => set("companySize", e.target.value)}
                  aria-invalid={Boolean(fieldErrors.companySize)}
                >
                  <option value="">{t("demo.select")}</option>
                  {companySizeOptions.map((o) => (
                    <option key={o} value={o}>
                      {t(`companySizes.${o}`)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="workforceSize"
                  className="text-sm text-ink-secondary"
                >
                  {t("demo.workforceSize")}
                </label>
                <select
                  id="workforceSize"
                  className={cn(
                    field,
                    fieldErrors.workforceSize && "border-status-critical"
                  )}
                  value={data.workforceSize}
                  onChange={(e) => set("workforceSize", e.target.value)}
                  aria-invalid={Boolean(fieldErrors.workforceSize)}
                >
                  <option value="">{t("demo.select")}</option>
                  {workforceSizeOptions.map((o) => (
                    <option key={o} value={o}>
                      {t(`workforceSizes.${o}`)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="websiteUrl" className="text-sm text-ink-secondary">
                {t("demo.website")}
              </label>
              <input
                id="websiteUrl"
                className={field}
                value={data.websiteUrl}
                onChange={(e) => set("websiteUrl", e.target.value)}
                maxLength={200}
                placeholder={t("demo.websitePlaceholder")}
                autoComplete="url"
              />
            </div>
          </fieldset>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <fieldset disabled={busy} className="space-y-6">
            <legend className="sr-only">{t("demo.steps.operations")}</legend>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="heading-md outline-none"
            >
              {t("demo.headings.operations")}
            </h2>
            <div>
              <p className="text-sm text-ink-secondary" id="sectors-label">
                {t("demo.sectors")}
              </p>
              <div
                role="group"
                aria-labelledby="sectors-label"
                aria-invalid={Boolean(fieldErrors.sectors)}
                aria-describedby={fieldErrors.sectors ? "err-sectors" : undefined}
                className="mt-2 space-y-1 border border-border-subtle"
              >
                {sectorOptions.map((s) => (
                  <label
                    key={s}
                    className="flex cursor-pointer items-center gap-3 border-b border-border-subtle px-3 py-2.5 text-[13px] text-ink-secondary last:border-0 hover:bg-surface/40"
                  >
                    <input
                      type="checkbox"
                      checked={data.sectors.includes(s)}
                      onChange={() => set("sectors", toggleIn(data.sectors, s))}
                      className="h-4 w-4"
                    />
                    {t(`sectors.${s}`)}
                  </label>
                ))}
              </div>
              {fieldErrors.sectors && (
                <p id="err-sectors" className="mt-1 text-[12px] text-status-critical">
                  {fieldText(fieldErrors.sectors)}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="currentSoftware"
                className="text-sm text-ink-secondary"
              >
                {t("demo.currentSoftware")}
              </label>
              <input
                id="currentSoftware"
                className={field}
                value={data.currentSoftware}
                onChange={(e) => set("currentSoftware", e.target.value)}
                maxLength={500}
                placeholder={t("demo.currentSoftwarePlaceholder")}
              />
            </div>
            <div>
              <p className="text-sm text-ink-secondary" id="reporting-label">
                {t("demo.reporting")}
              </p>
              <div
                role="group"
                aria-labelledby="reporting-label"
                className="mt-2 space-y-1 border border-border-subtle"
              >
                {reportingMethodOptions.map((r) => (
                  <label
                    key={r}
                    className="flex cursor-pointer items-center gap-3 border-b border-border-subtle px-3 py-2.5 text-[13px] text-ink-secondary last:border-0 hover:bg-surface/40"
                  >
                    <input
                      type="checkbox"
                      checked={data.reportingMethods.includes(r)}
                      onChange={() =>
                        set(
                          "reportingMethods",
                          toggleIn(data.reportingMethods, r)
                        )
                      }
                      className="h-4 w-4"
                    />
                    {t(`reportingMethods.${r}`)}
                  </label>
                ))}
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="activeObjects"
                  className="text-sm text-ink-secondary"
                >
                  {t("demo.activeObjects")}
                </label>
                <input
                  id="activeObjects"
                  className={field}
                  value={data.activeObjects}
                  onChange={(e) => set("activeObjects", e.target.value)}
                  maxLength={80}
                />
              </div>
              <div>
                <label
                  htmlFor="multiCustomer"
                  className="text-sm text-ink-secondary"
                >
                  {t("demo.multiCustomer")}
                </label>
                <select
                  id="multiCustomer"
                  className={field}
                  value={data.multiCustomer}
                  onChange={(e) => set("multiCustomer", e.target.value)}
                >
                  <option value="">{t("demo.select")}</option>
                  <option value="yes">{t("demo.yes")}</option>
                  <option value="no">{t("demo.noSingle")}</option>
                  <option value="unknown">{t("demo.unknown")}</option>
                </select>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="centralPlanning"
                  className="text-sm text-ink-secondary"
                >
                  {t("demo.centralPlanning")}
                </label>
                <select
                  id="centralPlanning"
                  className={field}
                  value={data.centralPlanning}
                  onChange={(e) => set("centralPlanning", e.target.value)}
                >
                  <option value="">{t("demo.select")}</option>
                  <option value="yes">{t("demo.yes")}</option>
                  <option value="no">{t("demo.no")}</option>
                  <option value="unknown">{t("demo.unknown")}</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="mobileWorkforce"
                  className="text-sm text-ink-secondary"
                >
                  {t("demo.mobileWorkforce")}
                </label>
                <select
                  id="mobileWorkforce"
                  className={field}
                  value={data.mobileWorkforce}
                  onChange={(e) => set("mobileWorkforce", e.target.value)}
                >
                  <option value="">{t("demo.select")}</option>
                  <option value="yes">{t("demo.yes")}</option>
                  <option value="no">{t("demo.no")}</option>
                  <option value="unknown">{t("demo.unknown")}</option>
                </select>
              </div>
            </div>
          </fieldset>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <fieldset disabled={busy} className="space-y-6">
            <legend className="sr-only">{t("demo.steps.requirements")}</legend>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="heading-md outline-none"
            >
              {t("demo.headings.requirements")}
            </h2>
            <div>
              <p className="text-sm text-ink-secondary" id="challenges-label">
                {t("demo.challenges")}
              </p>
              <div
                role="group"
                aria-labelledby="challenges-label"
                aria-invalid={Boolean(fieldErrors.challenges)}
                aria-describedby={
                  fieldErrors.challenges ? "err-challenges" : undefined
                }
                className="mt-2 grid gap-1 border border-border-subtle sm:grid-cols-2"
              >
                {challengeOptions.map((c) => (
                  <label
                    key={c}
                    className="flex cursor-pointer items-center gap-3 border-b border-border-subtle px-3 py-2.5 text-[13px] text-ink-secondary last:border-0 hover:bg-surface/40 sm:border-r sm:odd:border-r"
                  >
                    <input
                      type="checkbox"
                      checked={data.challenges.includes(c)}
                      onChange={() =>
                        set("challenges", toggleIn(data.challenges, c))
                      }
                      className="h-4 w-4"
                    />
                    {t(`challenges.${c}`)}
                  </label>
                ))}
              </div>
              {fieldErrors.challenges && (
                <p
                  id="err-challenges"
                  className="mt-1 text-[12px] text-status-critical"
                >
                  {fieldText(fieldErrors.challenges)}
                </p>
              )}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="conversation"
                  className="text-sm text-ink-secondary"
                >
                  {t("demo.conversation")}
                </label>
                <select
                  id="conversation"
                  className={cn(
                    field,
                    fieldErrors.conversation && "border-status-critical"
                  )}
                  value={data.conversation}
                  onChange={(e) => set("conversation", e.target.value)}
                  aria-invalid={Boolean(fieldErrors.conversation)}
                >
                  <option value="">{t("demo.select")}</option>
                  {conversationOptions.map((o) => (
                    <option key={o} value={o}>
                      {t(`conversations.${o}`)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="timeline"
                  className="text-sm text-ink-secondary"
                >
                  {t("demo.timeline")}
                </label>
                <select
                  id="timeline"
                  className={cn(
                    field,
                    fieldErrors.timeline && "border-status-critical"
                  )}
                  value={data.timeline}
                  onChange={(e) => set("timeline", e.target.value)}
                  aria-invalid={Boolean(fieldErrors.timeline)}
                >
                  <option value="">{t("demo.select")}</option>
                  {timelineOptions.map((o) => (
                    <option key={o} value={o}>
                      {t(`timelines.${o}`)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="text-sm text-ink-secondary">
                {t("demo.message")}
              </label>
              <textarea
                id="message"
                rows={4}
                className={field}
                value={data.message}
                onChange={(e) => set("message", e.target.value)}
                maxLength={5000}
              />
            </div>
            <label className="flex items-start gap-3 text-sm text-ink-muted">
              <input
                type="checkbox"
                checked={data.privacy}
                onChange={(e) => set("privacy", e.target.checked)}
                className="mt-1 h-4 w-4"
                aria-invalid={Boolean(fieldErrors.privacy)}
                aria-describedby={fieldErrors.privacy ? "err-privacy" : undefined}
              />
              <span>
                {t("demo.privacyBefore")}
                <Link href="/privacy" className="text-gold hover:underline">
                  {t("demo.privacyLink")}
                </Link>
                {t("demo.privacyAfter")}
              </span>
            </label>
            {fieldErrors.privacy && (
              <p id="err-privacy" className="text-[12px] text-status-critical">
                {fieldText(fieldErrors.privacy)}
              </p>
            )}
            {/* Honeypot */}
            <div
              className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
              aria-hidden
            >
              <label htmlFor="website">{t("demo.honeypot")}</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={data.website}
                onChange={(e) => set("website", e.target.value)}
              />
            </div>
          </fieldset>
        )}

        {/* Step 4 Review */}
        {step === 4 && (
          <div className="space-y-6">
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="heading-md outline-none"
            >
              {t("demo.headings.review")}
            </h2>
            <div className="space-y-0 border border-border">
              {[
                {
                  id: "organization",
                  title: t("demo.steps.organization"),
                  step: 1,
                  rows: [
                    ["company", t("demo.review.company"), data.company],
                    ["contact", t("demo.review.contact"), data.contactPerson],
                    [
                      "jobTitle",
                      t("demo.review.jobTitle"),
                      data.jobTitle || t("demo.empty"),
                    ],
                    ["email", t("demo.review.email"), data.email],
                    ["phone", t("demo.review.phone"), data.phone || t("demo.empty")],
                    ["country", t("demo.review.country"), data.country],
                    [
                      "companySize",
                      t("demo.review.companySize"),
                      optionText("companySizes", data.companySize),
                    ],
                    [
                      "workforce",
                      t("demo.review.workforce"),
                      optionText("workforceSizes", data.workforceSize),
                    ],
                  ],
                },
                {
                  id: "operations",
                  title: t("demo.steps.operations"),
                  step: 2,
                  rows: [
                    [
                      "sectors",
                      t("demo.review.sectors"),
                      data.sectors
                        .map((s) => optionText("sectors", s))
                        .join(", "),
                    ],
                    [
                      "currentSoftware",
                      t("demo.review.currentSoftware"),
                      data.currentSoftware || t("demo.empty"),
                    ],
                    [
                      "reporting",
                      t("demo.review.reporting"),
                      data.reportingMethods
                        .map((r) => optionText("reportingMethods", r))
                        .join(", ") || t("demo.empty"),
                    ],
                    [
                      "objects",
                      t("demo.review.objects"),
                      data.activeObjects || t("demo.empty"),
                    ],
                    [
                      "multiCustomer",
                      t("demo.review.multiCustomer"),
                      yesNoLabel(data.multiCustomer, true),
                    ],
                    [
                      "centralPlanning",
                      t("demo.review.centralPlanning"),
                      yesNoLabel(data.centralPlanning),
                    ],
                    [
                      "mobileWorkforce",
                      t("demo.review.mobileWorkforce"),
                      yesNoLabel(data.mobileWorkforce),
                    ],
                  ],
                },
                {
                  id: "requirements",
                  title: t("demo.steps.requirements"),
                  step: 3,
                  rows: [
                    [
                      "challenges",
                      t("demo.review.challenges"),
                      data.challenges
                        .map((c) => optionText("challenges", c))
                        .join(", "),
                    ],
                    [
                      "conversation",
                      t("demo.review.conversation"),
                      optionText(
                        "conversations",
                        data.conversation,
                        t("demo.empty")
                      ),
                    ],
                    [
                      "timeline",
                      t("demo.review.timeline"),
                      optionText("timelines", data.timeline, t("demo.empty")),
                    ],
                    [
                      "notes",
                      t("demo.review.notes"),
                      data.message || t("demo.empty"),
                    ],
                  ],
                },
              ].map((section) => (
                <div
                  key={section.id}
                  className="border-b border-border-subtle p-4 last:border-0"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-wide text-gold">
                      {section.title}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStep(section.step)}
                      className="text-[12px] text-ink-muted hover:text-gold"
                    >
                      {t("demo.edit")}
                    </button>
                  </div>
                  <dl className="mt-2 space-y-1 text-[13px]">
                    {section.rows.map(([key, label, value]) => (
                      <div key={key} className="flex gap-3">
                        <dt className="w-36 shrink-0 text-ink-faint">{label}</dt>
                        <dd className="text-ink-secondary">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          {step > 1 ? (
            <Button type="button" variant="ghost" onClick={back} disabled={busy}>
              {t("demo.back")}
            </Button>
          ) : (
            <span />
          )}
          {step < 4 ? (
            <Button type="button" onClick={next} disabled={busy}>
              {t("demo.continue")}
            </Button>
          ) : (
            <Button type="submit" disabled={busy}>
              {busy ? t("demo.submitting") : t("demo.submit")}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

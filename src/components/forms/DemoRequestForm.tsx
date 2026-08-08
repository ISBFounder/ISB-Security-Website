"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  companySizeOptions,
  workforceSizeOptions,
  sectorOptions,
  sectorLabels,
  reportingMethodOptions,
  reportingMethodLabels,
  challengeOptions,
  challengeLabels,
  conversationOptions,
  conversationLabels,
  timelineOptions,
  timelineLabels,
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
  country: "Netherlands",
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
  { id: 1, label: "Organization" },
  { id: 2, label: "Operations" },
  { id: 3, label: "Requirements" },
  { id: 4, label: "Review" },
] as const;

const field =
  "mt-1.5 w-full border border-border bg-bg/80 px-3 py-2.5 text-sm text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-60";

function toggleIn(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
}

export function DemoRequestForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

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
      if (data.company.trim().length < 2) errs.company = "Company is required";
      if (data.contactPerson.trim().length < 2)
        errs.contactPerson = "Contact person is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
        errs.email = "Valid business email required";
      if (!data.companySize) errs.companySize = "Company size is required";
      if (!data.workforceSize)
        errs.workforceSize = "Security workforce size is required";
      if (data.country.trim().length < 2) errs.country = "Country is required";
    }
    if (s === 2) {
      if (data.sectors.length < 1)
        errs.sectors = "Select at least one operational sector";
    }
    if (s === 3) {
      if (data.challenges.length < 1)
        errs.challenges = "Select at least one operational challenge";
      if (!data.conversation)
        errs.conversation = "Select what you want to discuss";
      if (!data.timeline) errs.timeline = "Select an evaluation timeline";
      if (!data.privacy) errs.privacy = "Privacy consent required";
    }
    setFieldErrors(errs);
    if (Object.keys(errs).length) {
      setStatus("validation");
      setErrorMsg("Please correct the highlighted fields.");
      return false;
    }
    setStatus("idle");
    setErrorMsg("");
    return true;
  }

  function next() {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(4, s + 1));
  }

  function back() {
    setStatus("idle");
    setErrorMsg("");
    setFieldErrors({});
    setStep((s) => Math.max(1, s - 1));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validateStep(3) && step === 3) return;
    if (step === 4 && !validateStep(3)) {
      setStep(3);
      return;
    }
    setStatus("submitting");
    setErrorMsg("");

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

      if (res.status === 429) {
        setStatus("rate_limited");
        setErrorMsg(
          body.error ||
            "Too many submissions were received from this connection. Please try again later."
        );
        return;
      }
      if (res.status === 503 || body.code === "NO_PROVIDER") {
        setStatus("unavailable");
        setErrorMsg(
          body.error ||
            "Online submission is temporarily unavailable. Please email info@isbsecuritysolutions.nl."
        );
        return;
      }
      if (res.status === 400) {
        setStatus("validation");
        const details = body.details?.fieldErrors as
          | Record<string, string[]>
          | undefined;
        if (details) {
          const mapped: Record<string, string> = {};
          Object.entries(details).forEach(([k, v]) => {
            if (v?.[0]) mapped[k] = v[0];
          });
          setFieldErrors(mapped);
        }
        setErrorMsg(body.error || "Please correct the highlighted fields.");
        setStep(1);
        return;
      }
      if (!res.ok || !body.ok) {
        setStatus("server");
        setErrorMsg(
          body.error ||
            "Your request could not be delivered. Please try again later or contact ISB directly."
        );
        return;
      }
      setStatus("success");
    } catch {
      setStatus("server");
      setErrorMsg(
        "Your request could not be delivered. Please try again later or contact ISB directly."
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
        <h2 className="text-lg font-semibold text-ink">
          Your demonstration request has been received by ISB Security
          Solutions.
        </h2>
        <p className="mt-3 text-sm text-ink-secondary">
          The information you provided will be used to prepare the conversation
          around your operational context.
        </p>
      </div>
    );
  }

  const busy = status === "submitting";

  return (
    <div>
      {/* Progress */}
      <nav aria-label="Form steps" className="mb-8 border-b border-border">
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
                  {s.label}
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
          <p className="font-medium text-ink">{errorMsg}</p>
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
                <li key={k}>{v}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <form onSubmit={onSubmit} noValidate aria-busy={busy}>
        {/* Step 1 */}
        {step === 1 && (
          <fieldset disabled={busy} className="space-y-5">
            <legend className="sr-only">Organization</legend>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="heading-md outline-none"
            >
              Organization
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="company" className="text-sm text-ink-secondary">
                  Company *
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
                  Contact person *
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
                />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="jobTitle" className="text-sm text-ink-secondary">
                  Job title
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
                  Business email *
                </label>
                <input
                  id="email"
                  type="email"
                  className={cn(field, fieldErrors.email && "border-status-critical")}
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                  maxLength={200}
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="text-sm text-ink-secondary">
                  Phone
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
                  Country *
                </label>
                <input
                  id="country"
                  className={cn(field, fieldErrors.country && "border-status-critical")}
                  value={data.country}
                  onChange={(e) => set("country", e.target.value)}
                  maxLength={80}
                  autoComplete="country-name"
                />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="companySize"
                  className="text-sm text-ink-secondary"
                >
                  Company size *
                </label>
                <select
                  id="companySize"
                  className={cn(
                    field,
                    fieldErrors.companySize && "border-status-critical"
                  )}
                  value={data.companySize}
                  onChange={(e) => set("companySize", e.target.value)}
                >
                  <option value="">Select…</option>
                  {companySizeOptions.map((o) => (
                    <option key={o} value={o}>
                      {o === "1000+" ? "1,000+" : o.replace("-", "–")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="workforceSize"
                  className="text-sm text-ink-secondary"
                >
                  Security workforce size *
                </label>
                <select
                  id="workforceSize"
                  className={cn(
                    field,
                    fieldErrors.workforceSize && "border-status-critical"
                  )}
                  value={data.workforceSize}
                  onChange={(e) => set("workforceSize", e.target.value)}
                >
                  <option value="">Select…</option>
                  {workforceSizeOptions.map((o) => (
                    <option key={o} value={o}>
                      {o === "unknown"
                        ? "Not applicable / Unknown"
                        : o === "1000+"
                          ? "1,000+"
                          : o.replace("-", "–")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="websiteUrl" className="text-sm text-ink-secondary">
                Website
              </label>
              <input
                id="websiteUrl"
                className={field}
                value={data.websiteUrl}
                onChange={(e) => set("websiteUrl", e.target.value)}
                maxLength={200}
                placeholder="https://"
                autoComplete="url"
              />
            </div>
          </fieldset>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <fieldset disabled={busy} className="space-y-6">
            <legend className="sr-only">Operations</legend>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="heading-md outline-none"
            >
              Operational model
            </h2>
            <div>
              <p className="text-sm text-ink-secondary" id="sectors-label">
                Operational sectors *
              </p>
              <div
                role="group"
                aria-labelledby="sectors-label"
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
                    {sectorLabels[s]}
                  </label>
                ))}
              </div>
              {fieldErrors.sectors && (
                <p className="mt-1 text-[12px] text-status-critical">
                  {fieldErrors.sectors}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="currentSoftware"
                className="text-sm text-ink-secondary"
              >
                Current operational software
              </label>
              <input
                id="currentSoftware"
                className={field}
                value={data.currentSoftware}
                onChange={(e) => set("currentSoftware", e.target.value)}
                maxLength={500}
                placeholder="e.g. spreadsheets, paper, multiple systems…"
              />
            </div>
            <div>
              <p className="text-sm text-ink-secondary" id="reporting-label">
                Current reporting method
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
                    {reportingMethodLabels[r]}
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
                  Approximate active objects / locations
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
                  Multiple customers?
                </label>
                <select
                  id="multiCustomer"
                  className={field}
                  value={data.multiCustomer}
                  onChange={(e) => set("multiCustomer", e.target.value)}
                >
                  <option value="">Select…</option>
                  <option value="yes">Yes</option>
                  <option value="no">No — single customer</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="centralPlanning"
                  className="text-sm text-ink-secondary"
                >
                  Central planning present?
                </label>
                <select
                  id="centralPlanning"
                  className={field}
                  value={data.centralPlanning}
                  onChange={(e) => set("centralPlanning", e.target.value)}
                >
                  <option value="">Select…</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="mobileWorkforce"
                  className="text-sm text-ink-secondary"
                >
                  Mobile workforce?
                </label>
                <select
                  id="mobileWorkforce"
                  className={field}
                  value={data.mobileWorkforce}
                  onChange={(e) => set("mobileWorkforce", e.target.value)}
                >
                  <option value="">Select…</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            </div>
          </fieldset>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <fieldset disabled={busy} className="space-y-6">
            <legend className="sr-only">Requirements</legend>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="heading-md outline-none"
            >
              Requirements
            </h2>
            <div>
              <p className="text-sm text-ink-secondary" id="challenges-label">
                Main operational challenges *
              </p>
              <div
                role="group"
                aria-labelledby="challenges-label"
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
                    {challengeLabels[c]}
                  </label>
                ))}
              </div>
              {fieldErrors.challenges && (
                <p className="mt-1 text-[12px] text-status-critical">
                  {fieldErrors.challenges}
                </p>
              )}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="conversation"
                  className="text-sm text-ink-secondary"
                >
                  What are you interested in discussing? *
                </label>
                <select
                  id="conversation"
                  className={cn(
                    field,
                    fieldErrors.conversation && "border-status-critical"
                  )}
                  value={data.conversation}
                  onChange={(e) => set("conversation", e.target.value)}
                >
                  <option value="">Select…</option>
                  {conversationOptions.map((o) => (
                    <option key={o} value={o}>
                      {conversationLabels[o]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="timeline"
                  className="text-sm text-ink-secondary"
                >
                  Desired evaluation timeline *
                </label>
                <select
                  id="timeline"
                  className={cn(
                    field,
                    fieldErrors.timeline && "border-status-critical"
                  )}
                  value={data.timeline}
                  onChange={(e) => set("timeline", e.target.value)}
                >
                  <option value="">Select…</option>
                  {timelineOptions.map((o) => (
                    <option key={o} value={o}>
                      {timelineLabels[o]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="text-sm text-ink-secondary">
                Anything else we should understand about your operation?
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
              />
              <span>
                I agree that ISB Security Solutions may use the information
                provided to respond to this demonstration request. See our{" "}
                <a href="/privacy" className="text-gold hover:underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {fieldErrors.privacy && (
              <p className="text-[12px] text-status-critical">
                {fieldErrors.privacy}
              </p>
            )}
            {/* Honeypot */}
            <div
              className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
              aria-hidden
            >
              <label htmlFor="website">Website</label>
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
              Review & submit
            </h2>
            <div className="space-y-0 border border-border">
              {[
                {
                  title: "Organization",
                  step: 1,
                  rows: [
                    ["Company", data.company],
                    ["Contact", data.contactPerson],
                    ["Job title", data.jobTitle || "—"],
                    ["Email", data.email],
                    ["Phone", data.phone || "—"],
                    ["Country", data.country],
                    ["Company size", data.companySize],
                    ["Security workforce", data.workforceSize],
                  ],
                },
                {
                  title: "Operations",
                  step: 2,
                  rows: [
                    [
                      "Sectors",
                      data.sectors
                        .map((s) => sectorLabels[s as keyof typeof sectorLabels])
                        .join(", "),
                    ],
                    ["Current software", data.currentSoftware || "—"],
                    [
                      "Reporting",
                      data.reportingMethods
                        .map(
                          (r) =>
                            reportingMethodLabels[
                              r as keyof typeof reportingMethodLabels
                            ]
                        )
                        .join(", ") || "—",
                    ],
                    ["Objects", data.activeObjects || "—"],
                    ["Multi-customer", data.multiCustomer || "—"],
                    ["Central planning", data.centralPlanning || "—"],
                    ["Mobile workforce", data.mobileWorkforce || "—"],
                  ],
                },
                {
                  title: "Requirements",
                  step: 3,
                  rows: [
                    [
                      "Challenges",
                      data.challenges
                        .map(
                          (c) =>
                            challengeLabels[c as keyof typeof challengeLabels]
                        )
                        .join(", "),
                    ],
                    [
                      "Conversation",
                      conversationLabels[
                        data.conversation as keyof typeof conversationLabels
                      ] || data.conversation,
                    ],
                    [
                      "Timeline",
                      timelineLabels[
                        data.timeline as keyof typeof timelineLabels
                      ] || data.timeline,
                    ],
                    ["Notes", data.message || "—"],
                  ],
                },
              ].map((section) => (
                <div
                  key={section.title}
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
                      Edit
                    </button>
                  </div>
                  <dl className="mt-2 space-y-1 text-[13px]">
                    {section.rows.map(([k, v]) => (
                      <div key={k} className="flex gap-3">
                        <dt className="w-36 shrink-0 text-ink-faint">{k}</dt>
                        <dd className="text-ink-secondary">{v}</dd>
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
              Back
            </Button>
          ) : (
            <span />
          )}
          {step < 4 ? (
            <Button type="button" onClick={next} disabled={busy}>
              Continue
            </Button>
          ) : (
            <Button type="submit" disabled={busy}>
              {busy ? "Submitting…" : "Submit request"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

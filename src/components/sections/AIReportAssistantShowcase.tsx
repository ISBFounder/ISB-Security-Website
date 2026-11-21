"use client";

import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent as RKEvent,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { osPanelTransition } from "@/lib/motion";

type StageId =
  | "notes"
  | "extraction"
  | "draft"
  | "review"
  | "approval"
  | "locked";

type ActorId = "officer" | "ai" | "supervisor" | "system";

const STAGES: { id: StageId; index: string; actor: ActorId }[] = [
  { id: "notes", index: "01", actor: "officer" },
  { id: "extraction", index: "02", actor: "ai" },
  { id: "draft", index: "03", actor: "ai" },
  { id: "review", index: "04", actor: "officer" },
  { id: "approval", index: "05", actor: "supervisor" },
  { id: "locked", index: "06", actor: "system" },
];

const EXTRACT_IDS = [
  "time",
  "location",
  "observation",
  "action",
  "secondary",
  "escalation",
] as const;

const DRAFT_IDS = ["time", "location", "observation", "action", "escalation", "evidence"] as const;

const REVIEW_CHECKS = [
  { id: "owner", tone: "warning" },
  { id: "photo", tone: "warning" },
  { id: "instruction", tone: "muted" },
] as const;

const LOCKED_IDS = ["id", "object", "status", "review", "audit", "evidence"] as const;

function FieldNotesView() {
  const t = useTranslations("home");
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-ink-muted">
        <span>
          {t("assistant.notes.officer")}
          <span className="text-ink-secondary">K. Jansen</span>
        </span>
        <span>
          {t("assistant.notes.object")}
          <span className="text-ink-secondary">NL-OBJ-042</span>
        </span>
        <span>
          {t("assistant.notes.time")}
          <span className="text-ink-secondary">22:14</span>
        </span>
        <span>
          {t("assistant.notes.input")}
          <span className="text-ink-secondary">{t("assistant.notes.mobile")}</span>
        </span>
      </div>
      <div className="border border-border-subtle bg-bg/50 p-4">
        <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
          {t("assistant.notes.raw")}
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-ink-secondary">
          {t("assistant.notes.body")}
        </p>
      </div>
      <p className="font-mono text-[9px] text-ink-faint">{t("cap.illustrative")}</p>
    </div>
  );
}

function ExtractionView() {
  const t = useTranslations("home");
  return (
    <div className="space-y-4">
      <p className="text-[12px] text-ink-muted">{t("assistant.extraction.kicker")}</p>
      <dl className="divide-y divide-border-subtle border border-border-subtle">
        {EXTRACT_IDS.map((id) => (
          <div key={id} className="flex gap-4 px-3 py-2.5 text-[13px]">
            <dt className="w-40 shrink-0 font-mono text-[10px] text-ink-faint">
              {t(`assistant.extraction.fields.${id}.label`)}
            </dt>
            <dd className="text-ink-secondary">{t(`assistant.extraction.fields.${id}.value`)}</dd>
          </div>
        ))}
      </dl>
      <div className="border border-border-subtle bg-bg/40 px-3 py-2.5 text-[12px]">
        <span className="text-ink-muted">{t("assistant.extraction.context")}</span>
        <span className="text-ink-secondary">{t("assistant.extraction.identified")}</span>
        <span className="mx-2 text-ink-faint">·</span>
        <span className="text-status-warning">{t("assistant.extraction.missing")}</span>
      </div>
    </div>
  );
}

function DraftReportView() {
  const t = useTranslations("home");
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="border border-gold/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-gold">
          {t("assistant.draft.generated")}
        </span>
        <span className="border border-border-subtle px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-ink-muted">
          {t("assistant.draft.notFinal")}
        </span>
      </div>
      <div className="border border-border-subtle bg-bg/50 p-4">
        <p className="text-[14px] leading-relaxed text-ink-secondary">{t("assistant.draft.body")}</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {DRAFT_IDS.map((id) => (
          <div key={id} className="border border-border-subtle bg-bg/30 px-3 py-2">
            <p className="font-mono text-[9px] text-ink-faint">{t(`assistant.draft.fields.${id}.label`)}</p>
            <p className="mt-0.5 text-[12px] text-ink-secondary">{t(`assistant.draft.fields.${id}.value`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HumanReviewView() {
  const t = useTranslations("home");
  return (
    <div className="space-y-4">
      <div className="border border-border-subtle bg-bg/50 p-4">
        <p className="font-mono text-[9px] text-ink-faint">{t("assistant.review.kicker")}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">
          {t("assistant.review.body")}{" "}
          <span className="bg-status-warning/15 text-ink">{t("assistant.review.followUp")}</span>
        </p>
      </div>
      <div className="space-y-1.5">
        <p className="label">{t("assistant.review.checklist")}</p>
        {REVIEW_CHECKS.map((w) => (
          <div
            key={w.id}
            className={cn(
              "border px-3 py-2 text-[12px]",
              w.tone === "warning"
                ? "border-status-warning/30 bg-status-warning/5 text-ink-secondary"
                : "border-border-subtle bg-bg/30 text-ink-muted"
            )}
          >
            {t(`assistant.review.checks.${w.id}`)}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 font-mono text-[11px]">
        <span className="border border-border-subtle px-2 py-1 text-ink-secondary">
          {t("assistant.review.reviewed")}
        </span>
        <span className="border border-gold/30 bg-gold/5 px-2 py-1 text-gold">
          {t("assistant.review.pending")}
        </span>
      </div>
    </div>
  );
}

function SupervisorApprovalView() {
  const t = useTranslations("home");
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="border border-border-subtle bg-bg/40 p-3">
          <p className="font-mono text-[9px] text-ink-faint">{t("assistant.approval.officerVersion")}</p>
          <p className="mt-2 text-[12px] text-ink-secondary">{t("assistant.approval.officerBody")}</p>
        </div>
        <div className="border border-border-subtle bg-bg/40 p-3">
          <p className="font-mono text-[9px] text-ink-faint">{t("assistant.approval.supervisor")}</p>
          <p className="mt-1 text-[12px] text-ink-secondary">{t("assistant.approval.role")}</p>
          <p className="mt-2 text-[12px] text-ink-muted">{t("assistant.approval.comment")}</p>
          <p className="mt-2 font-mono text-[10px] text-status-warning">{t("assistant.approval.status")}</p>
        </div>
      </div>
      <div className="border border-status-success/30 bg-status-success/5 px-3 py-2.5 text-[12px] text-ink-secondary">
        {t("assistant.approval.after")}
      </div>
    </div>
  );
}

function LockedRecordView() {
  const t = useTranslations("home");
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <span className="border border-status-success/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-status-success">
          {t("assistant.locked.approved")}
        </span>
        <span className="border border-border-subtle px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-ink-muted">
          {t("assistant.locked.finalized")}
        </span>
      </div>
      <dl className="divide-y divide-border-subtle border border-border-subtle text-[13px]">
        {LOCKED_IDS.map((id) => (
          <div key={id} className="flex gap-4 px-3 py-2.5">
            <dt className="w-28 shrink-0 font-mono text-[10px] text-ink-faint">
              {t(`assistant.locked.fields.${id}.label`)}
            </dt>
            <dd className="text-ink-secondary">{t(`assistant.locked.fields.${id}.value`)}</dd>
          </div>
        ))}
      </dl>
      <p className="text-[11px] text-ink-faint">{t("assistant.locked.note")}</p>
    </div>
  );
}

function StageContent({ id }: { id: StageId }) {
  switch (id) {
    case "notes":
      return <FieldNotesView />;
    case "extraction":
      return <ExtractionView />;
    case "draft":
      return <DraftReportView />;
    case "review":
      return <HumanReviewView />;
    case "approval":
      return <SupervisorApprovalView />;
    case "locked":
      return <LockedRecordView />;
  }
}

export function AIReportAssistantShowcase() {
  const t = useTranslations("home");
  const [active, setActive] = useState<StageId>("notes");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const history = t.raw("assistant.history") as { version: string; time: string; label: string }[];
  const scope = t.raw("assistant.scope") as string[];
  const limits = t.raw("assistant.limits") as string[];

  const select = useCallback((id: StageId, i: number) => {
    setActive(id);
    refs.current[i]?.focus();
  }, []);

  function onKey(e: RKEvent<HTMLButtonElement>, i: number) {
    let n = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      n = (i + 1) % STAGES.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      n = (i - 1 + STAGES.length) % STAGES.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      n = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      n = STAGES.length - 1;
    } else return;
    select(STAGES[n].id, n);
  }

  const currentIndex = STAGES.findIndex((s) => s.id === active);
  const current = STAGES[currentIndex];
  const suffixKey = current.actor === "ai" ? "ai" : current.actor === "system" ? "system" : "human";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-2 border border-border bg-surface/30 px-4 py-3 font-mono text-[11px] text-ink-muted sm:gap-3">
        <span className="text-ink-muted">{t("assistant.assists")}</span>
        <span className="text-ink-faint" aria-hidden>
          →
        </span>
        <span className="text-ink-secondary">{t("assistant.reviews")}</span>
        <span className="text-ink-faint" aria-hidden>
          →
        </span>
        <span className="text-gold">{t("assistant.approves")}</span>
        <span className="ml-0 w-full text-center text-[10px] text-ink-faint sm:ml-2 sm:w-auto sm:text-left">
          {t("assistant.motto")}
        </span>
      </div>

      <div className="border border-border">
        <div
          role="tablist"
          aria-label={t("assistant.aria")}
          className="flex gap-0 overflow-x-auto border-b border-border"
        >
          {STAGES.map((s, i) => {
            const selected = active === s.id;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`ai-tab-${s.id}`}
                aria-selected={selected}
                aria-controls={`ai-panel-${s.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(s.id, i)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "flex shrink-0 flex-col gap-0.5 border-b-2 px-3 py-3 text-left transition-colors sm:px-4",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
                  selected
                    ? "border-gold bg-surface text-ink"
                    : "border-transparent text-ink-muted hover:text-ink-secondary"
                )}
              >
                <span className="font-mono text-[9px] text-ink-faint">
                  {s.index} · {t(`assistant.actors.${s.actor}`)}
                </span>
                <span className="text-[12px] font-medium sm:text-[13px]">
                  {t(`assistant.stages.${s.id}`)}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-0 lg:grid-cols-[1fr_200px]">
          <div
            role="tabpanel"
            id={`ai-panel-${active}`}
            aria-labelledby={`ai-tab-${active}`}
            className="bg-surface/15 p-5 md:p-6"
          >
            <div className="mb-4 flex items-center justify-between gap-3 text-[12px] text-ink-muted">
              <p>
                {t("assistant.actorPrefix")}
                <span className={current.actor === "ai" ? "text-ink-muted" : "text-ink-secondary"}>
                  {t(`assistant.actors.${current.actor}`)}
                </span>
                {t(`assistant.suffix.${suffixKey}`)}
              </p>
              <div className="flex gap-2 lg:hidden">
                <button
                  type="button"
                  className="border border-border-subtle px-2.5 py-1 disabled:opacity-40"
                  disabled={currentIndex === 0}
                  onClick={() => select(STAGES[currentIndex - 1].id, currentIndex - 1)}
                >
                  {t("assistant.previous")}
                </button>
                <button
                  type="button"
                  className="border border-border-subtle px-2.5 py-1 disabled:opacity-40"
                  disabled={currentIndex === STAGES.length - 1}
                  onClick={() => select(STAGES[currentIndex + 1].id, currentIndex + 1)}
                >
                  {t("assistant.next")}
                </button>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={osPanelTransition}
              >
                <StageContent id={active} />
              </motion.div>
            </AnimatePresence>
          </div>

          <aside className="border-t border-border bg-bg/40 p-4 lg:border-l lg:border-t-0">
            <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
              {t("assistant.historyLabel")}
            </p>
            <ul className="mt-3 space-y-2 font-mono text-[11px]">
              {history.map((row) => (
                <li key={row.version} className="flex flex-col gap-0.5 border-b border-border-subtle pb-2 last:border-0">
                  <span className="text-ink-secondary">
                    {row.version} · {row.time}
                  </span>
                  <span className="text-ink-faint">{row.label}</span>
                </li>
              ))}
            </ul>

            <p className="mt-5 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
              {t("assistant.scopeLabel")}
            </p>
            <ul className="mt-2 space-y-1 text-[11px] text-ink-muted">
              {scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      <div className="border border-border-subtle bg-surface/20 px-4 py-3">
        <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
          {t("assistant.limitsLabel")}
        </p>
        <ul className="mt-2 space-y-1 text-[12px] text-ink-muted">
          {limits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-2 text-[11px] text-ink-faint">{t("assistant.limitsNote")}</p>
      </div>
    </div>
  );
}

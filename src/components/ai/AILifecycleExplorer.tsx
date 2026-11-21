"use client";

import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent as RKEvent,
} from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type StageId = "input" | "assist" | "review" | "approve" | "audit";

const STAGE_IDS: StageId[] = ["input", "assist", "review", "approve", "audit"];

const REVIEW_WARN = [true, true, false];

function Content({ id }: { id: StageId }) {
  const t = useTranslations("ai");

  if (id === "input") {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-ink-muted">
          <span>{t("lifecycle.input.officer")}</span>
          <span>{t("lifecycle.input.object")}</span>
          <span>{t("lifecycle.input.time")}</span>
        </div>
        <div className="border border-border-subtle bg-bg/50 p-4">
          <p className="font-mono text-[9px] uppercase text-ink-faint">
            {t("lifecycle.input.fieldNotes")}
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-secondary">
            {t("lifecycle.input.note")}
          </p>
        </div>
        <p className="font-mono text-[9px] text-ink-faint">{t("lifecycle.input.demo")}</p>
      </div>
    );
  }
  if (id === "assist") {
    const rows = t.raw("lifecycle.assist.rows") as { k: string; v: string }[];
    return (
      <div className="space-y-4">
        <p className="text-[12px] text-ink-muted">{t("lifecycle.assist.lead")}</p>
        <dl className="divide-y divide-border-subtle border border-border-subtle text-[13px]">
          {rows.map((row) => (
            <div key={row.k} className="flex gap-4 px-3 py-2">
              <dt className="w-28 shrink-0 font-mono text-[10px] text-ink-faint">{row.k}</dt>
              <dd className="text-ink-secondary">{row.v}</dd>
            </div>
          ))}
        </dl>
        <div className="border border-border-subtle bg-bg/40 px-3 py-2 text-[12px]">
          <span className="text-ink-muted">{t("lifecycle.assist.completeness")}</span>
          <span className="text-ink-secondary">{t("lifecycle.assist.identified")}</span>
          <span className="mx-2 text-ink-faint">·</span>
          <span className="text-status-warning">{t("lifecycle.assist.missing")}</span>
        </div>
        <div className="border border-border-subtle bg-bg/50 p-4 text-[13px] leading-relaxed text-ink-secondary">
          {t("lifecycle.assist.draft")}
        </div>
        <span className="inline-block border border-gold/40 px-2 py-0.5 font-mono text-[9px] uppercase text-gold">
          {t("lifecycle.assist.badge")}
        </span>
      </div>
    );
  }
  if (id === "review") {
    const warnings = t.raw("lifecycle.review.warnings") as string[];
    return (
      <div className="space-y-4">
        <div className="border border-border-subtle bg-bg/50 p-4 text-[13px] leading-relaxed text-ink-secondary">
          {t("lifecycle.review.lead")}{" "}
          <span className="bg-status-warning/15">{t("lifecycle.review.added")}</span>
        </div>
        <ul className="space-y-1.5 text-[12px]">
          {warnings.map((text, i) => (
            <li
              key={text}
              className={cn(
                "border px-3 py-2",
                REVIEW_WARN[i]
                  ? "border-status-warning/30 bg-status-warning/5 text-ink-secondary"
                  : "border-border-subtle text-ink-muted"
              )}
            >
              {text}
            </li>
          ))}
        </ul>
        <p className="font-mono text-[11px] text-ink-secondary">
          {t("lifecycle.review.status")}
        </p>
      </div>
    );
  }
  if (id === "approve") {
    return (
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border border-border-subtle bg-bg/40 p-3">
            <p className="font-mono text-[9px] text-ink-faint">{t("lifecycle.approve.version")}</p>
            <p className="mt-2 text-[12px] text-ink-secondary">
              {t("lifecycle.approve.versionBody")}
            </p>
          </div>
          <div className="border border-border-subtle bg-bg/40 p-3">
            <p className="font-mono text-[9px] text-ink-faint">{t("lifecycle.approve.supervisor")}</p>
            <p className="mt-1 text-[12px] text-ink-secondary">
              {t("lifecycle.approve.comment")}
            </p>
            <p className="mt-2 font-mono text-[10px] text-status-warning">
              {t("lifecycle.approve.revision")}
            </p>
          </div>
        </div>
        <div className="border border-status-success/30 bg-status-success/5 px-3 py-2 text-[12px] text-ink-secondary">
          {t("lifecycle.approve.approved")}
        </div>
      </div>
    );
  }
  const events = t.raw("lifecycle.audit.events") as string[];
  return (
    <div className="space-y-3">
      <p className="text-[12px] text-ink-muted">{t("lifecycle.audit.lead")}</p>
      <ul className="border border-border-subtle divide-y divide-border-subtle text-[12px] text-ink-secondary">
        {events.map((e) => (
          <li key={e} className="px-3 py-2 font-mono text-[11px]">
            {e}
          </li>
        ))}
      </ul>
      <p className="text-[11px] text-ink-faint">{t("lifecycle.audit.footer")}</p>
    </div>
  );
}

export function AILifecycleExplorer() {
  const t = useTranslations("ai");
  const [active, setActive] = useState<StageId>("input");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();

  const select = useCallback((id: StageId, i: number) => {
    setActive(id);
    refs.current[i]?.focus();
  }, []);

  function onKey(e: RKEvent<HTMLButtonElement>, i: number) {
    let n = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      n = (i + 1) % STAGE_IDS.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      n = (i - 1 + STAGE_IDS.length) % STAGE_IDS.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      n = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      n = STAGE_IDS.length - 1;
    } else return;
    select(STAGE_IDS[n], n);
  }

  return (
    <div className="border border-border">
      <div
        role="tablist"
        aria-label={t("lifecycle.aria")}
        className="flex gap-0 overflow-x-auto border-b border-border"
      >
        {STAGE_IDS.map((id, i) => {
          const selected = active === id;
          return (
            <button
              key={id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`ai-life-${id}`}
              aria-selected={selected}
              aria-controls={`ai-life-panel-${id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(id, i)}
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
                {t(`lifecycle.stages.${id}.index`)}
              </span>
              <span className="text-[12px] font-medium sm:text-[13px]">
                {t(`lifecycle.stages.${id}.label`)}
              </span>
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`ai-life-panel-${active}`}
        aria-labelledby={`ai-life-${active}`}
        className="bg-surface/15 p-5 md:p-6"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Content id={active} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

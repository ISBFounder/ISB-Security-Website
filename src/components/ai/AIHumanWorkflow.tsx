"use client";

import { useCallback, useRef, useState, type KeyboardEvent as RKEvent } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { osPanelTransition } from "@/lib/motion";
import { OsStatus, type OsMaturity } from "@/components/os/OsStatus";

type StepId =
  | "observation"
  | "extraction"
  | "draft"
  | "review"
  | "approval"
  | "locked";

type ActorId = "officer" | "ai" | "supervisor" | "system";

const STEPS: { id: StepId; actor: ActorId; status: OsMaturity }[] = [
  { id: "observation", actor: "officer", status: "development" },
  { id: "extraction", actor: "ai", status: "development" },
  { id: "draft", actor: "ai", status: "development" },
  { id: "review", actor: "officer", status: "development" },
  { id: "approval", actor: "supervisor", status: "development" },
  { id: "locked", actor: "system", status: "discovery" },
];

const FIELDS = ["input", "actor", "action", "output", "authority"] as const;

export function AIHumanWorkflow() {
  const t = useTranslations("ai");
  const [active, setActive] = useState<StepId>("observation");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const i = STEPS.findIndex((s) => s.id === active);
  const current = STEPS[i];
  const values: Record<(typeof FIELDS)[number], string> = {
    input: t(`workflow.steps.${current.id}.input`),
    actor: t(`workflow.actors.${current.actor}`),
    action: t(`workflow.steps.${current.id}.action`),
    output: t(`workflow.steps.${current.id}.output`),
    authority: t(`workflow.steps.${current.id}.authority`),
  };

  const select = useCallback((id: StepId, index: number) => {
    setActive(id);
    refs.current[index]?.focus();
  }, []);

  function onKey(e: RKEvent<HTMLButtonElement>, index: number) {
    let n = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      n = (index + 1) % STEPS.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      n = (index - 1 + STEPS.length) % STEPS.length;
    } else return;
    select(STEPS[n].id, n);
  }

  return (
    <div>
      <p className="mb-4 text-center font-mono text-[11px] text-ink-muted">
        {t("workflow.lead")}
      </p>
      <div
        role="tablist"
        aria-label={t("workflow.aria")}
        className="flex gap-0 overflow-x-auto border border-border"
      >
        {STEPS.map((s, idx) => {
          const selected = s.id === active;
          const human = s.actor !== "ai";
          return (
            <button
              key={s.id}
              ref={(el) => {
                refs.current[idx] = el;
              }}
              type="button"
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(s.id, idx)}
              onKeyDown={(e) => onKey(e, idx)}
              className={cn(
                "flex min-w-[7.5rem] shrink-0 flex-col gap-0.5 border-b-2 px-3 py-3 text-left",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
                selected
                  ? human
                    ? "border-gold bg-surface text-ink"
                    : "border-border-strong bg-surface/60 text-ink-secondary"
                  : "border-transparent text-ink-muted hover:text-ink-secondary"
              )}
            >
              <span className="font-mono text-[9px] text-ink-faint">
                {t(`workflow.actors.${s.actor}`)}
              </span>
              <span className="text-[12px] font-medium">
                {t(`workflow.steps.${s.id}.label`)}
              </span>
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={reduce ? false : { opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={osPanelTransition}
          className="border border-t-0 border-border bg-surface/15 p-5"
        >
          <div className="mb-4 flex justify-between gap-3 text-[12px] text-ink-muted lg:hidden">
            <button
              type="button"
              className="border border-border-subtle px-2.5 py-1 disabled:opacity-40"
              disabled={i === 0}
              onClick={() => select(STEPS[i - 1].id, i - 1)}
            >
              {t("workflow.previous")}
            </button>
            <button
              type="button"
              className="border border-border-subtle px-2.5 py-1 disabled:opacity-40"
              disabled={i === STEPS.length - 1}
              onClick={() => select(STEPS[i + 1].id, i + 1)}
            >
              {t("workflow.next")}
            </button>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2">
            {FIELDS.map((k) => (
              <div key={k} className="border-b border-border-subtle pb-2">
                <dt className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                  {t(`workflow.fields.${k}`)}
                </dt>
                <dd
                  className={cn(
                    "mt-1 text-[13px]",
                    k === "authority" && current.actor !== "ai"
                      ? "text-gold"
                      : "text-ink-secondary"
                  )}
                >
                  {values[k]}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-3">
            <OsStatus status={current.status} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

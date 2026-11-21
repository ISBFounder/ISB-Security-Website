"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { osPanelTransition } from "@/lib/motion";
import { OsStatus, type OsMaturity } from "@/components/os/OsStatus";

type ContextId = "object" | "event" | "patrol" | "retail" | "education";

const CONTEXT_IDS: ContextId[] = [
  "object",
  "event",
  "patrol",
  "retail",
  "education",
];

const STATUS: Record<ContextId, OsMaturity> = {
  object: "development",
  event: "development",
  patrol: "development",
  retail: "planned",
  education: "planned",
};

export function SolutionContextSwitcher() {
  const t = useTranslations("solutions");
  const [active, setActive] = useState<ContextId>("object");
  const reduce = useReducedMotion();
  const future = t.raw("switcher.future") as string[];
  const priorities = t.raw(`contexts.${active}.priorities`) as string[];
  const modules = t.raw(`contexts.${active}.modules`) as string[];
  const workflow = t.raw(`contexts.${active}.workflow`) as string[];

  return (
    <div>
      <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
        {t("switcher.lead")}
      </p>
      <div
        className="flex flex-wrap gap-px border border-border bg-border-subtle"
        role="tablist"
        aria-label={t("switcher.aria")}
      >
        {CONTEXT_IDS.map((id) => {
          const selected = id === active;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(id)}
              className={cn(
                "bg-bg px-3 py-2.5 text-[12px]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
                selected ? "surface-3 os-selected text-ink" : "text-ink-muted hover:text-ink-secondary"
              )}
            >
              {t(`contexts.${id}.title`)}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={reduce ? false : { opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={osPanelTransition}
          className="border border-t-0 border-border bg-surface/15 p-5"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-medium text-ink">
              {t(`contexts.${active}.title`)}
            </h3>
            <OsStatus status={STATUS[active]} />
          </div>
          <div className="mt-4 grid gap-5 sm:grid-cols-3">
            <div>
              <p className="label mb-2">{t("switcher.priorities")}</p>
              <ul className="space-y-1 text-[13px] text-ink-secondary">
                {priorities.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label mb-2">{t("switcher.modules")}</p>
              <ul className="space-y-1 text-[13px] text-ink-secondary">
                {modules.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label mb-2">{t("switcher.workflow")}</p>
              <ol className="space-y-1 text-[13px] text-ink-secondary">
                {workflow.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mt-4 border border-border-subtle px-4 py-3">
        <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
          {t("switcher.futureEyebrow")}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {future.map((f) => (
            <span
              key={f}
              className="border border-border-subtle px-2.5 py-1 font-mono text-[10px] text-ink-faint"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

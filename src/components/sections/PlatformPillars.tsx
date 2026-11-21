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

type PillarId =
  | "operations"
  | "reporting"
  | "people"
  | "objects"
  | "compliance"
  | "intelligence";

const PILLAR_IDS: PillarId[] = [
  "operations",
  "reporting",
  "people",
  "objects",
  "compliance",
  "intelligence",
];

const CONNECTED: Record<PillarId, PillarId[]> = {
  operations: ["people", "objects", "reporting", "compliance"],
  reporting: ["operations", "objects", "intelligence", "compliance"],
  people: ["operations", "compliance", "objects"],
  objects: ["operations", "reporting", "compliance"],
  compliance: ["reporting", "people", "objects"],
  intelligence: ["reporting", "operations", "people", "objects"],
};

export function PlatformPillars() {
  const t = useTranslations("home");
  const [active, setActive] = useState<PillarId>("operations");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();

  const pillars = PILLAR_IDS.map((id, i) => ({
    id,
    index: String(i + 1).padStart(2, "0"),
    title: t(`pillars.items.${id}.title`),
    summary: t(`pillars.items.${id}.summary`),
    capabilities: t.raw(`pillars.items.${id}.capabilities`) as string[],
    workflow: t.raw(`pillars.items.${id}.workflow`) as string[],
    connected: CONNECTED[id],
    outcome: t(`pillars.items.${id}.outcome`),
  }));
  const foundation = t.raw("pillars.foundation") as string[];
  const current = pillars.find((p) => p.id === active)!;

  const select = useCallback((id: PillarId, index: number) => {
    setActive(id);
    tabRefs.current[index]?.focus();
  }, []);

  function onKey(e: RKEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      next = (index + 1) % pillars.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      next = (index - 1 + pillars.length) % pillars.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      next = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      next = pillars.length - 1;
    } else {
      return;
    }
    select(pillars[next].id, next);
  }

  return (
    <div>
      <div className="mb-4 overflow-hidden border border-border">
        <div className="flex items-center justify-between gap-3 border-b border-border-subtle bg-surface/40 px-4 py-2.5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
            {t("pillars.kicker")}
          </p>
          <p className="hidden font-mono text-[10px] text-ink-muted sm:block">
            {t("pillars.trail")}
          </p>
        </div>
        <div
          className="grid grid-cols-2 gap-px bg-border-subtle sm:grid-cols-3 lg:grid-cols-6"
          role="group"
          aria-label={t("pillars.domainsAria")}
        >
          {pillars.map((p, i) => {
            const selected = active === p.id;
            const related = current.connected.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => select(p.id, i)}
                className={cn(
                  "min-w-0 bg-bg px-3 py-3 text-left transition-colors",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
                  selected
                    ? "surface-3 text-ink"
                    : related
                      ? "bg-surface/70 text-ink-secondary"
                      : "bg-bg text-ink-muted hover:text-ink-secondary"
                )}
                aria-pressed={selected}
              >
                <span className="block font-mono text-[9px] text-ink-faint">{p.index}</span>
                <span className="mt-1 block text-[12px] font-medium">{p.title}</span>
                {selected && (
                  <span className="mt-1 block font-mono text-[9px] text-gold">{t("pillars.active")}</span>
                )}
                {!selected && related && (
                  <span className="mt-1 block font-mono text-[9px] text-ink-faint">{t("pillars.connected")}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-0 border border-border lg:grid-cols-[220px_1fr]">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label={t("pillars.pillarsAria")}
          className="flex gap-0 overflow-x-auto border-b border-border lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r"
        >
          {pillars.map((p, i) => {
            const selected = active === p.id;
            return (
              <button
                key={p.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`pillar-tab-${p.id}`}
                aria-selected={selected}
                aria-controls={`pillar-panel-${p.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(p.id, i)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "flex shrink-0 items-center gap-3 px-4 py-3.5 text-left transition-colors",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
                  selected
                    ? "border-b-2 border-gold bg-surface text-ink lg:border-b-0 lg:border-l-2"
                    : "border-b-2 border-transparent text-ink-muted hover:text-ink-secondary lg:border-l-2 lg:border-transparent"
                )}
              >
                <span className="font-mono text-[10px] text-ink-faint">{p.index}</span>
                <span className="text-[13px] font-medium">{p.title}</span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`pillar-panel-${current.id}`}
          aria-labelledby={`pillar-tab-${current.id}`}
          className="bg-surface/20 p-5 md:p-7"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={osPanelTransition}
              className="space-y-6"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                  {t("pillars.pillar", { index: current.index })}
                </p>
                <h3 className="heading-md mt-1">{current.title}</h3>
                <p className="body mt-3 max-w-2xl">{current.summary}</p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <p className="label mb-3">{t("pillars.core")}</p>
                  <ul className="space-y-1.5">
                    {current.capabilities.map((c) => (
                      <li key={c} className="flex gap-2 border-b border-border-subtle py-1.5 text-[13px] text-ink-secondary last:border-0">
                        <span className="mt-1.5 h-1 w-1 shrink-0 bg-gold/70" aria-hidden />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label mb-3">{current.id === "objects" ? t("pillars.hierarchy") : t("pillars.workflow")}</p>
                  <div className="border border-border-subtle bg-bg/40 p-3">
                    <ol className="space-y-0">
                      {current.workflow.map((step, i) => (
                        <li key={step} className="flex gap-3">
                          <div className="flex w-5 flex-col items-center" aria-hidden>
                            <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0", i === 0 || i === current.workflow.length - 1 ? "bg-gold" : "bg-ink-faint")} />
                            {i < current.workflow.length - 1 && <span className="w-px flex-1 bg-border-subtle" />}
                          </div>
                          <span className="pb-3 text-[12px] text-ink-secondary last:pb-0">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
              <div>
                <p className="label mb-3">{t("pillars.connectedDomains")}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="border border-gold/30 bg-gold/10 px-2.5 py-1.5 text-[12px] font-medium text-ink">{current.title}</span>
                  {current.connected.map((id) => {
                    const peer = pillars.find((p) => p.id === id)!;
                    const idx = pillars.findIndex((p) => p.id === id);
                    return (
                      <span key={id} className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-ink-faint" aria-hidden>↔</span>
                        <button type="button" onClick={() => select(id, idx)} className="border border-border-subtle bg-bg/50 px-2.5 py-1.5 text-[12px] text-ink-secondary transition-colors hover:border-gold/30 hover:text-ink">{peer.title}</button>
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="border-t border-border-subtle pt-4">
                <p className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">{t("pillars.outcome")}</p>
                <p className="mt-1 text-[13px] text-ink-secondary">{current.outcome}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="border border-t-0 border-border bg-bg-secondary/60 px-4 py-4 md:px-5">
        <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-muted">{t("pillars.foundationTitle")}</p>
        <div className="flex flex-wrap gap-1.5">
          {foundation.map((f) => (
            <span key={f} className="border border-border-subtle bg-surface/40 px-2.5 py-1 font-mono text-[10px] text-ink-muted">{f}</span>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-ink-faint">{t("pillars.foundationNote")}</p>
      </div>
    </div>
  );
}

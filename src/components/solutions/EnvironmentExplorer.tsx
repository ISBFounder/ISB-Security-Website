"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type KeyboardEvent as RKEvent,
} from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type EnvId =
  | "object"
  | "mobile"
  | "event"
  | "retail"
  | "corporate"
  | "healthcare"
  | "education"
  | "municipal"
  | "government";

const ENV_IDS: EnvId[] = [
  "object",
  "mobile",
  "event",
  "retail",
  "corporate",
  "healthcare",
  "education",
  "municipal",
  "government",
];

const STAGED = new Set<EnvId>(["mobile", "retail"]);

const HASH_TO_ENV: Record<string, EnvId> = {
  "object-security": "object",
  "mobile-patrol": "mobile",
  "event-security": "event",
  retail: "retail",
  corporate: "corporate",
  healthcare: "healthcare",
  education: "education",
  government: "government",
  "security-companies": "object",
};

export function EnvironmentExplorer() {
  const t = useTranslations("solutions");
  const [active, setActive] = useState<EnvId>("object");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const stage = STAGED.has(active) ? t(`envs.${active}.stage`) : undefined;
  const stakeholders = t.raw(`envs.${active}.stakeholders`) as string[];
  const risks = t.raw(`envs.${active}.risks`) as string[];
  const workflow = t.raw(`envs.${active}.workflow`) as string[];
  const reports = t.raw(`envs.${active}.reports`) as string[];
  const controls = t.raw(`envs.${active}.controls`) as string[];
  const capabilities = t.raw(`envs.${active}.capabilities`) as string[];
  const domains = t.raw(`envs.${active}.domains`) as string[];
  const decisions = t.raw(`envs.${active}.decisions`) as string[];
  const challenges = t.raw(`envs.${active}.challenges`) as string[];

  useEffect(() => {
    function applyHash() {
      const hash = window.location.hash.replace("#", "");
      const target = HASH_TO_ENV[hash];
      if (target) setActive(target);
    }
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const select = useCallback((id: EnvId, i: number) => {
    setActive(id);
    refs.current[i]?.focus();
  }, []);

  function onKey(e: RKEvent<HTMLButtonElement>, i: number) {
    let n = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      n = (i + 1) % ENV_IDS.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      n = (i - 1 + ENV_IDS.length) % ENV_IDS.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      n = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      n = ENV_IDS.length - 1;
    } else return;
    select(ENV_IDS[n], n);
  }

  return (
    <div id="operational-environments" className="relative scroll-mt-24 overflow-hidden border border-border">
      {Object.keys(HASH_TO_ENV).map((id) => (
        <span key={id} id={id} className="absolute top-0 h-0 w-0" aria-hidden />
      ))}
      <div className="grid lg:grid-cols-[minmax(0,0.28fr)_minmax(0,0.72fr)]">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label={t("explorer.aria")}
          className="flex gap-0 overflow-x-auto border-b border-border lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r"
        >
          {ENV_IDS.map((id, i) => {
            const selected = active === id;
            return (
              <button
                key={id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`sol-tab-${id}`}
                aria-selected={selected}
                aria-controls={`sol-panel-${id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(id, i)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "shrink-0 px-4 py-3 text-left text-[13px] font-medium transition-colors",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
                  selected
                    ? "border-b-2 border-gold bg-surface text-ink lg:border-b-0 lg:border-l-2"
                    : "border-b-2 border-transparent text-ink-muted hover:text-ink-secondary lg:border-l-2 lg:border-transparent"
                )}
              >
                {t(`envs.${id}.title`)}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`sol-panel-${active}`}
          aria-labelledby={`sol-tab-${active}`}
          className="min-w-0 overflow-x-auto bg-surface/15 p-4 sm:p-5 md:p-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-6"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                    {t("explorer.kicker")}
                  </p>
                  {stage && (
                    <span className="border border-border-subtle px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-ink-muted">
                      {stage}
                    </span>
                  )}
                </div>
                <h3 className="heading-md mt-1">{t(`envs.${active}.title`)}</h3>
                <p className="body mt-2 max-w-2xl">{t(`envs.${active}.context`)}</p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="min-w-0">
                  <p className="label mb-2">{t("explorer.stakeholders")}</p>
                  <ul className="space-y-1">
                    {stakeholders.map((s) => (
                      <li
                        key={s}
                        className="border-b border-border-subtle py-1.5 text-[12px] text-ink-secondary last:border-0"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="min-w-0">
                  <p className="label mb-2">{t("explorer.risks")}</p>
                  <ul className="space-y-1">
                    {risks.map((r) => (
                      <li
                        key={r}
                        className="border-b border-border-subtle py-1.5 text-[12px] text-ink-secondary last:border-0"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="min-w-0">
                <p className="label mb-3">{t("explorer.workflow")}</p>
                <ol className="border border-border-subtle bg-bg/40 p-3">
                  {workflow.map((step, i) => (
                    <li key={step} className="flex gap-3 text-[12px]">
                      <div className="flex w-4 flex-col items-center" aria-hidden>
                        <span
                          className={cn(
                            "mt-1.5 h-1.5 w-1.5",
                            i === 0 || i === workflow.length - 1
                              ? "bg-gold"
                              : "bg-ink-faint"
                          )}
                        />
                        {i < workflow.length - 1 && (
                          <span className="w-px flex-1 bg-border-subtle" />
                        )}
                      </div>
                      <span className="pb-2.5 text-ink-secondary last:pb-0">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="min-w-0">
                  <p className="label mb-2">{t("explorer.reports")}</p>
                  <p className="text-[12px] text-ink-secondary">
                    {reports.join(" · ")}
                  </p>
                  <p className="label mb-2 mt-4">{t("explorer.controls")}</p>
                  <p className="text-[12px] text-ink-secondary">
                    {controls.join(" · ")}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="label mb-2">{t("explorer.capabilities")}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {capabilities.map((c) => (
                      <span
                        key={c}
                        className="border border-border-subtle bg-bg/50 px-2 py-1 text-[11px] text-ink-secondary"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <p className="label mb-2 mt-4">{t("explorer.domains")}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {domains.map((d, i) => (
                      <span key={d} className="flex items-center gap-2">
                        {i > 0 && (
                          <span className="font-mono text-[10px] text-ink-faint" aria-hidden>
                            —
                          </span>
                        )}
                        <span className="border border-border-subtle bg-bg/40 px-2 py-1 text-[12px] text-ink-secondary">
                          {d}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="min-w-0">
                <p className="label mb-2">{t("explorer.decisions")}</p>
                <ul className="space-y-1">
                  {decisions.map((d) => (
                    <li key={d} className="text-[12px] text-ink-secondary">
                      · {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 border-t border-border-subtle pt-4 lg:grid-cols-2">
                <div className="min-w-0">
                  <p className="label mb-2">{t("explorer.challenges")}</p>
                  <ul className="space-y-1.5">
                    {challenges.map((c) => (
                      <li key={c} className="text-[12px] text-ink-muted">
                        · {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="min-w-0">
                  <p className="label mb-2">{t("explorer.change")}</p>
                  <p className="text-[13px] text-ink-secondary">
                    {t(`envs.${active}.change`)}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

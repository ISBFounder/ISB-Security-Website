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

type Id =
  | "object"
  | "mobile"
  | "event"
  | "retail"
  | "corporate"
  | "healthcare"
  | "education"
  | "municipal"
  | "government";

const IDS: Id[] = [
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

export function IndustryExplorer() {
  const t = useTranslations("industries");
  const [active, setActive] = useState<Id>("object");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const objectModel = t.raw(`profiles.${active}.objectModel`) as string[];
  const domains = t.raw(`profiles.${active}.domains`) as string[];
  const config = t.raw(`profiles.${active}.config`) as string[];
  const architecture = t.raw(`profiles.${active}.architecture`) as string[];
  const note = t.has(`profiles.${active}.note`)
    ? t(`profiles.${active}.note`)
    : undefined;

  const select = useCallback((id: Id, i: number) => {
    setActive(id);
    refs.current[i]?.focus();
  }, []);

  function onKey(e: RKEvent<HTMLButtonElement>, i: number) {
    let n = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      n = (i + 1) % IDS.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      n = (i - 1 + IDS.length) % IDS.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      n = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      n = IDS.length - 1;
    } else return;
    select(IDS[n], n);
  }

  return (
    <div className="overflow-hidden border border-border">
      <div className="grid lg:grid-cols-[minmax(0,0.28fr)_minmax(0,0.72fr)]">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label={t("explorer.aria")}
          className="flex gap-0 overflow-x-auto border-b border-border lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r"
        >
          {IDS.map((id, i) => {
            const selected = active === id;
            return (
              <button
                key={id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`ind-tab-${id}`}
                aria-selected={selected}
                aria-controls={`ind-panel-${id}`}
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
                {t(`profiles.${id}.title`)}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`ind-panel-${active}`}
          aria-labelledby={`ind-tab-${active}`}
          className="min-w-0 overflow-x-auto bg-surface/15 p-4 sm:p-5 md:p-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-5"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                  {t("explorer.profileLabel")}
                </p>
                <h3 className="heading-md mt-1">{t(`profiles.${active}.title`)}</h3>
                <p className="body mt-2">{t(`profiles.${active}.profile`)}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 text-[12px]">
                <div className="border border-border-subtle bg-bg/40 p-3">
                  <p className="font-mono text-[9px] text-ink-faint">{t("explorer.operating")}</p>
                  <p className="mt-1 text-ink-secondary">{t(`profiles.${active}.operating`)}</p>
                </div>
                <div className="border border-border-subtle bg-bg/40 p-3">
                  <p className="font-mono text-[9px] text-ink-faint">{t("explorer.location")}</p>
                  <p className="mt-1 text-ink-secondary">{t(`profiles.${active}.location`)}</p>
                </div>
                <div className="border border-border-subtle bg-bg/40 p-3">
                  <p className="font-mono text-[9px] text-ink-faint">{t("explorer.workforce")}</p>
                  <p className="mt-1 text-ink-secondary">{t(`profiles.${active}.workforce`)}</p>
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <div className="min-w-0">
                  <p className="label mb-2">{t("explorer.objectStructure")}</p>
                  <p className="font-mono text-[12px] text-ink-secondary break-words">
                    {objectModel.join(" ")}
                  </p>
                  <p className="label mb-2 mt-4">{t("explorer.reportingMix")}</p>
                  <p className="text-[12px] text-ink-secondary">{t(`profiles.${active}.reporting`)}</p>
                  <p className="label mb-2 mt-4">{t("explorer.escalation")}</p>
                  <p className="text-[12px] text-ink-secondary">{t(`profiles.${active}.escalation`)}</p>
                </div>
                <div className="min-w-0">
                  <p className="label mb-2">{t("explorer.domains")}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {domains.map((d) => (
                      <span
                        key={d}
                        className="border border-border-subtle bg-bg/50 px-2 py-1 text-[11px] text-ink-secondary"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                  <p className="label mb-2 mt-4">{t("explorer.config")}</p>
                  <ul className="space-y-1 text-[12px] text-ink-secondary">
                    {config.map((c) => (
                      <li key={c}>· {c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="min-w-0">
                <p className="label mb-2">{t("explorer.architecture")}</p>
                <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-ink-secondary">
                  {architecture.map((a, i) => (
                    <li key={a} className="flex items-center gap-2">
                      {i > 0 && (
                        <span className="text-ink-faint" aria-hidden>
                          →
                        </span>
                      )}
                      <span className="border border-border-subtle bg-bg/40 px-2 py-1">
                        {a}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {note && (
                <p className="text-[12px] text-ink-faint">{note}</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

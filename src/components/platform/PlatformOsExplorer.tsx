"use client";

import { useCallback, useRef, useState, type KeyboardEvent as RKEvent } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { osPanelTransition } from "@/lib/motion";
import { OsStatus, type OsMaturity } from "@/components/os/OsStatus";

type DomainId =
  | "operations"
  | "reporting"
  | "people"
  | "objects"
  | "compliance"
  | "intelligence";

const DOMAIN_ORDER: {
  id: DomainId;
  index: string;
  connected: DomainId[];
  status: OsMaturity;
}[] = [
  {
    id: "operations",
    index: "01",
    connected: ["people", "objects", "reporting", "compliance"],
    status: "development",
  },
  {
    id: "reporting",
    index: "02",
    connected: ["operations", "objects", "intelligence", "compliance"],
    status: "development",
  },
  {
    id: "people",
    index: "03",
    connected: ["operations", "compliance", "objects"],
    status: "development",
  },
  {
    id: "objects",
    index: "04",
    connected: ["operations", "reporting", "compliance"],
    status: "development",
  },
  {
    id: "compliance",
    index: "05",
    connected: ["reporting", "people", "objects"],
    status: "foundation",
  },
  {
    id: "intelligence",
    index: "06",
    connected: ["reporting", "operations", "people", "objects"],
    status: "development",
  },
];

export function PlatformOsExplorer() {
  const t = useTranslations("platform");
  const [active, setActive] = useState<DomainId>("reporting");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const domains = DOMAIN_ORDER.map((d) => ({
    ...d,
    title: t(`explorer.domains.${d.id}.title`),
    summary: t(`explorer.domains.${d.id}.summary`),
    concepts: t.raw(`explorer.domains.${d.id}.concepts`) as string[],
  }));
  const current = domains.find((d) => d.id === active)!;
  const steps = t.raw("explorer.steps") as string[];
  const context = t.raw("explorer.context") as string[];
  const foundation = t.raw("explorer.foundation") as string[];

  const select = useCallback((id: DomainId, i: number) => {
    setActive(id);
    refs.current[i]?.focus();
  }, []);

  function onKey(e: RKEvent<HTMLButtonElement>, i: number) {
    let n = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      n = (i + 1) % domains.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      n = (i - 1 + domains.length) % domains.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      n = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      n = domains.length - 1;
    } else return;
    select(domains[n].id, n);
  }

  return (
    <div>
      <ol className="mb-6 grid gap-px border border-border bg-border-subtle font-mono text-[11px] text-ink-muted sm:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step} className="bg-bg px-3 py-2.5">
            <span className="text-[9px] uppercase tracking-wide text-ink-faint">
              0{i + 1}
            </span>
            <p className="mt-1 text-ink-secondary">{step}</p>
          </li>
        ))}
      </ol>

      <div className="border border-border">
        <div className="flex items-center justify-between gap-3 border-b border-border-subtle bg-surface/40 px-4 py-2.5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
            {t("explorer.chrome")}
          </p>
          <p className="hidden font-mono text-[10px] text-ink-muted sm:block">
            {t("explorer.inherit")}
          </p>
        </div>
        <div
          className="grid grid-cols-2 gap-px bg-border-subtle sm:grid-cols-3 lg:grid-cols-6"
          role="tablist"
          aria-label={t("explorer.domainsAria")}
        >
          {domains.map((d, i) => {
            const selected = active === d.id;
            const related = current.connected.includes(d.id);
            return (
              <button
                key={d.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(d.id, i)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "min-w-0 bg-bg px-3 py-3 text-left",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
                  selected
                    ? "surface-3 os-selected text-ink"
                    : related
                      ? "bg-surface/70 text-ink-secondary"
                      : "text-ink-muted hover:text-ink-secondary"
                )}
              >
                <span className="block font-mono text-[9px] text-ink-faint">{d.index}</span>
                <span className="mt-1 block text-[12px] font-medium">{d.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={reduce ? false : { opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={osPanelTransition}
          className="border border-t-0 border-border bg-surface/15 p-5 md:p-6"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="heading-md">{current.title}</h3>
            <OsStatus status={current.status} />
          </div>
          <p className="body mt-2 max-w-2xl">{current.summary}</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-2">
            <div>
              <p className="label mb-3">{t("explorer.conceptsLabel")}</p>
              <ul className="space-y-1.5">
                {current.concepts.map((c) => (
                  <li
                    key={c}
                    className="border-b border-border-subtle py-1.5 text-[13px] text-ink-secondary last:border-0"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label mb-3">{t("explorer.connectedLabel")}</p>
              <div className="flex flex-wrap gap-2">
                {current.connected.map((id) => {
                  const peer = domains.find((d) => d.id === id)!;
                  const idx = domains.findIndex((d) => d.id === id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => select(id, idx)}
                      className="border border-border-subtle bg-bg/50 px-2.5 py-1.5 text-[12px] text-ink-secondary hover:border-gold/30 hover:text-ink"
                    >
                      {peer.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 border border-border bg-bg-secondary/50 px-4 py-4">
        <p className="label mb-3">{t("explorer.contextLabel")}</p>
        <div className="flex flex-wrap gap-1.5">
          {context.map((c) => (
            <span
              key={c}
              className="border border-border-subtle bg-surface/40 px-2.5 py-1 font-mono text-[10px] text-ink-muted"
            >
              {c}
            </span>
          ))}
        </div>
        <p className="label mb-3 mt-5">{t("explorer.foundationLabel")}</p>
        <div className="flex flex-wrap gap-1.5">
          {foundation.map((f) => (
            <span
              key={f}
              className="border border-border-subtle bg-surface/40 px-2.5 py-1 font-mono text-[10px] text-ink-muted"
            >
              {f}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-ink-faint">
          {t("explorer.footnote")}
        </p>
      </div>
    </div>
  );
}

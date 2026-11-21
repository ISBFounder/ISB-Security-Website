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

type Stage = "foundation" | "development" | "discovery" | "planned" | "future";
type CapId =
  | "reporting"
  | "operations"
  | "objects"
  | "personnel"
  | "customers"
  | "compliance"
  | "ai"
  | "intelligence";

const CAP_IDS: CapId[] = [
  "reporting",
  "operations",
  "objects",
  "personnel",
  "customers",
  "compliance",
  "ai",
  "intelligence",
];

const CAP_STAGE: Record<CapId, Stage> = {
  reporting: "development",
  operations: "development",
  objects: "development",
  personnel: "development",
  customers: "development",
  compliance: "foundation",
  ai: "development",
  intelligence: "planned",
};

const STAGE_STYLE: Record<Stage, string> = {
  foundation: "border-border-subtle text-ink-muted",
  development: "border-gold/40 text-gold",
  discovery: "border-border text-ink-muted",
  planned: "border-border text-ink-faint",
  future: "border-dashed border-border text-ink-faint",
};

function ReportingInterface() {
  const t = useTranslations("home");
  const rows = [
    ["SR-2026-00482", t("capUi.reporting.specific"), "NL-OBJ-042", t("capUi.reporting.awaiting")],
    ["IR-2026-00194", t("capUi.reporting.incident"), t("places.siteA"), t("capUi.reporting.escalated")],
    ["DR-2026-00067", t("capUi.reporting.damage"), t("places.campus03"), t("capUi.reporting.draft")],
  ];
  return (
    <div className="overflow-x-auto border border-border-subtle">
      <table className="w-full min-w-[300px] text-left text-[12px]">
        <thead>
          <tr className="border-b border-border-subtle bg-surface/50 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
            <th className="px-3 py-2 font-medium">{t("capUi.reporting.id")}</th>
            <th className="px-3 py-2 font-medium">{t("capUi.reporting.type")}</th>
            <th className="px-3 py-2 font-medium">{t("capUi.reporting.object")}</th>
            <th className="px-3 py-2 font-medium">{t("capUi.reporting.status")}</th>
          </tr>
        </thead>
        <tbody className="text-ink-secondary">
          {rows.map((r) => (
            <tr key={r[0]} className="border-b border-border-subtle last:border-0">
              <td className="px-3 py-2 font-mono text-gold">{r[0]}</td>
              <td className="px-3 py-2">{r[1]}</td>
              <td className="px-3 py-2">{r[2]}</td>
              <td className="px-3 py-2">{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OperationsInterface() {
  const t = useTranslations("home");
  const rows = [
    ["14:00", t("capUi.operations.shift")],
    ["14:12", t("capUi.operations.patrol")],
    ["14:28", t("capUi.operations.checkpoint")],
    ["14:35", t("capUi.operations.supervisor")],
    ["14:41", t("capUi.operations.action")],
  ];
  return (
    <div className="border border-border-subtle">
      <div className="border-b border-border-subtle bg-surface/40 px-3 py-2 font-mono text-[10px] text-ink-faint">
        {t("capUi.operations.kicker")}
      </div>
      <ul className="divide-y divide-border-subtle font-mono text-[11px]">
        {rows.map(([time, event]) => (
          <li key={time} className="flex gap-3 px-3 py-2">
            <span className="w-10 shrink-0 text-ink-faint">{time}</span>
            <span className="text-ink-secondary">{event}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ObjectsInterface() {
  const t = useTranslations("home");
  return (
    <div className="border border-border-subtle bg-bg/40 p-3 font-mono text-[12px] leading-7 text-ink-secondary">
      <p className="text-gold">{t("places.northOps")}</p>
      <p className="pl-3">└ NL-OBJ-042</p>
      <p className="pl-6">{t("capUi.objects.building")}</p>
      <p className="pl-9 text-ink">{t("capUi.objects.entrance")}</p>
      <p className="pl-6">{t("capUi.objects.requirements")}</p>
      <p className="mt-1 pl-3 text-ink-muted">{t("capUi.objects.corporate")}</p>
    </div>
  );
}

function PersonnelInterface() {
  const t = useTranslations("home");
  const rows = [
    ["K. Jansen", "NL-OBJ-042", t("capUi.personnel.qualified"), t("capUi.personnel.onDuty"), false],
    ["D. Vermeer", t("places.siteA"), t("capUi.personnel.qualified"), t("capUi.personnel.onDuty"), false],
    ["M. de Wit", t("places.campus03"), t("capUi.personnel.renewal"), t("capUi.personnel.onDuty"), true],
  ] as const;
  return (
    <div className="overflow-x-auto border border-border-subtle">
      <table className="w-full min-w-[300px] text-left text-[12px]">
        <thead>
          <tr className="border-b border-border-subtle bg-surface/50 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
            <th className="px-3 py-2">{t("capUi.personnel.officer")}</th>
            <th className="px-3 py-2">{t("capUi.personnel.assignment")}</th>
            <th className="px-3 py-2">{t("capUi.personnel.qualification")}</th>
            <th className="px-3 py-2">{t("capUi.personnel.status")}</th>
          </tr>
        </thead>
        <tbody className="text-ink-secondary">
          {rows.map((r) => (
            <tr key={r[0]} className="border-b border-border-subtle last:border-0">
              <td className="px-3 py-2 font-medium text-ink">{r[0]}</td>
              <td className="px-3 py-2">{r[1]}</td>
              <td className={cn("px-3 py-2", r[4] && "text-status-warning")}>{r[2]}</td>
              <td className="px-3 py-2">{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CustomersInterface() {
  const t = useTranslations("home");
  const rows = [
    [t("capUi.customers.customer"), t("places.northOps")],
    [t("capUi.customers.linked"), t("capUi.customers.linkedValue")],
    [t("capUi.customers.contact"), t("capUi.customers.contactValue")],
    [t("capUi.customers.requirements"), t("capUi.customers.requirementsValue")],
  ];
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {rows.map(([k, v]) => (
        <div key={k} className="border border-border-subtle bg-bg/40 px-3 py-2">
          <p className="font-mono text-[9px] uppercase text-ink-faint">{k}</p>
          <p className="mt-0.5 text-[12px] text-ink-secondary">{v}</p>
        </div>
      ))}
    </div>
  );
}

function ComplianceInterface() {
  const t = useTranslations("home");
  const steps = t.raw("capUi.compliance.steps") as string[];
  return (
    <div className="border border-border-subtle">
      <ol className="divide-y divide-border-subtle text-[12px]">
        {steps.map((s, i) => (
          <li key={s} className="flex gap-3 px-3 py-2 text-ink-secondary">
            <span className="font-mono text-[10px] text-ink-faint">{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

function AIInterface() {
  const t = useTranslations("home");
  return (
    <div className="space-y-2">
      <div className="border border-border-subtle bg-bg/50 p-3">
        <p className="font-mono text-[9px] text-ink-faint">{t("capUi.ai.notes")}</p>
        <p className="mt-1 text-[12px] text-ink-secondary">{t("capUi.ai.quote")}</p>
      </div>
      <div className="border border-border-subtle bg-bg/40 p-3 font-mono text-[11px] text-ink-secondary">
        <p>{t("capUi.ai.time")}</p>
        <p>{t("capUi.ai.location")}</p>
        <p>{t("capUi.ai.action")}</p>
        <p>{t("capUi.ai.secondary")}</p>
      </div>
      <div className="border border-gold/30 bg-gold/5 p-3 text-[12px] text-ink-secondary">
        {t("capUi.ai.review")}
      </div>
    </div>
  );
}

function IntelligenceInterface() {
  const t = useTranslations("home");
  const items = t.raw("capUi.intelligence.items") as string[];
  return (
    <div className="border border-border-subtle p-3">
      <p className="font-mono text-[9px] uppercase text-ink-faint">{t("capUi.intelligence.kicker")}</p>
      <ul className="mt-2 space-y-1.5 text-[12px] text-ink-muted">
        {items.map((item, i) => (
          <li key={item} className={i === items.length - 1 ? "text-ink-faint" : undefined}>
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-ink-faint">{t("capUi.intelligence.note")}</p>
    </div>
  );
}

function CapabilityInterface({ id }: { id: CapId }) {
  switch (id) {
    case "reporting":
      return <ReportingInterface />;
    case "operations":
      return <OperationsInterface />;
    case "objects":
      return <ObjectsInterface />;
    case "personnel":
      return <PersonnelInterface />;
    case "customers":
      return <CustomersInterface />;
    case "compliance":
      return <ComplianceInterface />;
    case "ai":
      return <AIInterface />;
    case "intelligence":
      return <IntelligenceInterface />;
  }
}

export function OperationalCapabilityExplorer() {
  const t = useTranslations("home");
  const [active, setActive] = useState<CapId>("reporting");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();

  const capabilities = CAP_IDS.map((id) => ({
    id,
    title: t(`cap.items.${id}.title`),
    category: t(`cap.items.${id}.category`),
    stage: CAP_STAGE[id],
    overview: t(`cap.items.${id}.overview`),
    purpose: t(`cap.items.${id}.purpose`),
    workflow: t.raw(`cap.items.${id}.workflow`) as string[],
    modules: t.raw(`cap.items.${id}.modules`) as string[],
    related: t.raw(`cap.items.${id}.related`) as string[],
    stageLabel: t(`cap.items.${id}.stageLabel`),
  }));
  const current = capabilities.find((c) => c.id === active)!;

  const select = useCallback((id: CapId, i: number) => {
    setActive(id);
    refs.current[i]?.focus();
  }, []);

  function onKey(e: RKEvent<HTMLButtonElement>, i: number) {
    let n = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      n = (i + 1) % capabilities.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      n = (i - 1 + capabilities.length) % capabilities.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      n = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      n = capabilities.length - 1;
    } else return;
    select(capabilities[n].id, n);
  }

  return (
    <div className="overflow-hidden border border-border">
      <div className="grid lg:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)]">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label={t("cap.aria")}
          className="flex gap-0 overflow-x-auto border-b border-border lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r"
        >
          {capabilities.map((c, i) => {
            const selected = active === c.id;
            return (
              <button
                key={c.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`cap-tab-${c.id}`}
                aria-selected={selected}
                aria-controls={`cap-panel-${c.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(c.id, i)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "flex shrink-0 flex-col gap-1 px-4 py-3 text-left transition-colors",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
                  selected
                    ? "border-b-2 border-gold bg-surface lg:border-b-0 lg:border-l-2"
                    : "border-b-2 border-transparent text-ink-muted hover:text-ink-secondary lg:border-l-2 lg:border-transparent"
                )}
              >
                <span className={cn("text-[13px] font-medium", selected && "text-ink")}>
                  {c.title}
                </span>
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[9px] tracking-wide text-ink-faint">
                    {c.category}
                  </span>
                  <span
                    className={cn(
                      "border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide",
                      STAGE_STYLE[c.stage]
                    )}
                  >
                    {t(`cap.stages.${c.stage}`)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`cap-panel-${current.id}`}
          aria-labelledby={`cap-tab-${current.id}`}
          className="min-w-0 overflow-x-auto bg-surface/15 p-4 sm:p-5 md:p-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-6"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                    {current.category}
                  </p>
                  <span
                    className={cn(
                      "border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide",
                      STAGE_STYLE[current.stage]
                    )}
                  >
                    {t(`cap.stages.${current.stage}`)}
                  </span>
                </div>
                <h3 className="heading-md mt-1">{current.title}</h3>
                <p className="body mt-2 max-w-2xl">{current.overview}</p>
                <p className="mt-2 text-[13px] text-ink-muted">{current.purpose}</p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="min-w-0">
                  <p className="label mb-3">{t("cap.workflow")}</p>
                  <ol className="border border-border-subtle bg-bg/40 p-3">
                    {current.workflow.map((step, i) => (
                      <li key={step} className="flex gap-3 text-[12px]">
                        <div className="flex w-4 flex-col items-center" aria-hidden>
                          <span
                            className={cn(
                              "mt-1.5 h-1.5 w-1.5",
                              i === 0 || i === current.workflow.length - 1
                                ? "bg-gold"
                                : "bg-ink-faint"
                            )}
                          />
                          {i < current.workflow.length - 1 && (
                            <span className="w-px flex-1 bg-border-subtle" />
                          )}
                        </div>
                        <span className="pb-2.5 text-ink-secondary last:pb-0">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="min-w-0">
                  <p className="label mb-3">{t("cap.example")}</p>
                  <CapabilityInterface id={current.id} />
                  <p className="mt-2 font-mono text-[9px] text-ink-faint">{t("cap.illustrative")}</p>
                </div>
              </div>

              <div className="min-w-0">
                <p className="label mb-3">{t("cap.modules")}</p>
                <div className="flex flex-wrap gap-1.5">
                  {current.modules.map((m) => (
                    <span
                      key={m}
                      className="border border-border-subtle bg-bg/50 px-2.5 py-1 text-[12px] text-ink-secondary"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="min-w-0">
                <p className="label mb-3">{t("cap.related")}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="border border-gold/30 bg-gold/10 px-2.5 py-1.5 text-[12px] font-medium text-ink">
                    {current.title}
                  </span>
                  {current.related.map((r) => (
                    <span key={r} className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-ink-faint" aria-hidden>
                        —
                      </span>
                      <span className="border border-border-subtle bg-bg/40 px-2.5 py-1.5 text-[12px] text-ink-secondary">
                        {r}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-border-subtle pt-4">
                <p className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                  {t("cap.implementation")}
                </p>
                <p className="mt-1 text-[13px] text-ink-secondary">{current.stageLabel}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

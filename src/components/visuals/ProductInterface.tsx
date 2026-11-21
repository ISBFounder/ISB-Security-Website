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

type TabId = "command" | "reporting" | "objects" | "personnel";

const TABS: TabId[] = ["command", "reporting", "objects", "personnel"];

const SIDE_NAV: { id: string; tab?: TabId }[] = [
  { id: "command", tab: "command" },
  { id: "reports", tab: "reporting" },
  { id: "objects", tab: "objects" },
  { id: "personnel", tab: "personnel" },
  { id: "patrols" },
  { id: "incidents" },
  { id: "compliance" },
  { id: "intelligence" },
  { id: "administration" },
];

export function ProductInterface() {
  const t = useTranslations("home");
  const [tab, setTab] = useState<TabId>("command");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();

  const selectTab = useCallback((id: TabId, index: number) => {
    setTab(id);
    tabRefs.current[index]?.focus();
  }, []);

  function onTabKey(e: RKEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      next = (index + 1) % TABS.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      next = (index - 1 + TABS.length) % TABS.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      next = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      next = TABS.length - 1;
    } else {
      return;
    }
    selectTab(TABS[next], next);
  }

  return (
    <div
      className="relative"
      role="region"
      aria-label={t("product.aria")}
    >
      <div
        className="pointer-events-none absolute -inset-px border border-border/80"
        aria-hidden
      />
      <div className="glass-os relative overflow-hidden">
        <div className="flex items-center gap-3 border-b border-border bg-bg px-3 py-2 sm:px-4">
          <span className="h-4 w-0.5 shrink-0 bg-gold" aria-hidden />
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-secondary sm:text-[11px]">
            {t("product.env")}
          </span>
          <span className="hidden font-mono text-[10px] text-ink-faint sm:inline">
            {t("product.host")}
          </span>
          <span className="ml-auto border border-border bg-surface px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-ink-muted sm:text-[10px]">
            {t("cap.illustrative")}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-border-subtle bg-surface/80 px-3 py-2 font-mono text-[10px] text-ink-muted sm:gap-x-4 sm:px-4 sm:text-[11px]">
          <span>
            {t("product.orgLabel")}{" "}
            <span className="text-ink-secondary">{t("product.orgValue")}</span>
          </span>
          <span className="hidden text-border-strong sm:inline" aria-hidden>
            |
          </span>
          <span>
            {t("product.customerLabel")}{" "}
            <span className="text-ink-secondary">{t("places.northOps")}</span>
          </span>
          <span className="hidden text-border-strong sm:inline" aria-hidden>
            |
          </span>
          <span>
            {t("product.objectLabel")} <span className="text-ink-secondary">NL-OBJ-042</span>
          </span>
          <span className="hidden text-border-strong md:inline" aria-hidden>
            |
          </span>
          <span className="hidden md:inline">
            {t("product.roleLabel")}{" "}
            <span className="text-ink-secondary">{t("product.roleValue")}</span>
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 bg-status-success" aria-hidden />
            {t("product.normalOps")}
          </span>
          <span className="w-full font-mono text-[10px] text-ink-faint sm:w-auto">
            {t("product.view", { context: t(`product.tabs.${tab}`) })}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] lg:grid-cols-[180px_1fr]">
          <aside
            className="hidden border-r border-border-subtle bg-bg/50 p-2 md:block"
            aria-label={t("product.modulesAria")}
          >
            <p className="mb-2 px-2 font-mono text-[9px] uppercase tracking-wider text-ink-faint">
              {t("product.modules")}
            </p>
            {SIDE_NAV.map((item) => {
              const selected = item.tab === tab;
              const label = t(`product.nav.${item.id}`);
              if (item.tab) {
                const index = TABS.indexOf(item.tab);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectTab(item.tab!, index)}
                    className={cn(
                      "mb-0.5 w-full px-2 py-1.5 text-left text-[12px]",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
                      selected
                        ? "border-l-2 border-gold bg-surface text-ink"
                        : "border-l-2 border-transparent text-ink-muted hover:text-ink-secondary"
                    )}
                  >
                    {label}
                  </button>
                );
              }
              return (
                <div
                  key={item.id}
                  className="mb-0.5 border-l-2 border-transparent px-2 py-1.5 text-[12px] text-ink-faint"
                >
                  {label}
                </div>
              );
            })}
          </aside>
          <div className="min-w-0">
            <div
              role="tablist"
              aria-label={t("product.viewsAria")}
              className="flex overflow-x-auto border-b border-border-subtle"
            >
              {TABS.map((id, i) => {
                const selected = tab === id;
                return (
                  <button
                    key={id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`tab-${id}`}
                    aria-selected={selected}
                    aria-controls={`panel-${id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => selectTab(id, i)}
                    onKeyDown={(e) => onTabKey(e, i)}
                    className={cn(
                      "shrink-0 border-b-2 px-3 py-2.5 text-[12px] font-medium transition-colors sm:px-4",
                      selected
                        ? "border-gold text-ink"
                        : "border-transparent text-ink-muted hover:text-ink-secondary"
                    )}
                  >
                    {t(`product.tabs.${id}`)}
                  </button>
                );
              })}
            </div>
            <div className="p-3 sm:p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  role="tabpanel"
                  id={`panel-${tab}`}
                  aria-labelledby={`tab-${tab}`}
                  initial={reduce ? false : { opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: -6 }}
                  transition={osPanelTransition}
                >
                  {tab === "command" && <CommandView />}
                  {tab === "reporting" && <ReportingView />}
                  {tab === "objects" && <ObjectsView />}
                  {tab === "personnel" && <PersonnelView />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommandView() {
  const t = useTranslations("home");
  const metrics = [
    { label: t("product.command.activeIncidents"), value: "3", tone: "text-status-warning" },
    { label: t("product.command.officers"), value: "14", tone: "text-ink" },
    { label: t("product.command.patrols"), value: "8", tone: "text-ink" },
    { label: t("product.command.missed"), value: "2", tone: "text-status-critical" },
  ];
  const attention = [
    { id: "ESC-184", text: t("product.command.esc184"), sev: t("product.command.high"), sevClass: "text-status-critical" },
    { id: "ESC-181", text: t("product.command.esc181"), sev: t("product.command.medium"), sevClass: "text-status-warning" },
    { id: "CERT-09", text: t("product.command.cert"), sev: t("product.command.watch"), sevClass: "text-ink-muted" },
  ];
  const activity = [
    { time: "14:32", event: t("product.command.submitted"), detail: t("product.command.submittedDetail") },
    { time: "14:28", event: t("product.command.missedEvent"), detail: t("product.command.missedDetail") },
    { time: "14:21", event: t("product.command.shiftStarted"), detail: t("product.command.shiftDetail") },
    { time: "14:17", event: t("product.command.instruction"), detail: t("product.command.instructionDetail") },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-px border border-border-subtle bg-border-subtle sm:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-surface/60 px-3 py-2.5">
            <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
              {m.label}
            </p>
            <p className={cn("mt-0.5 text-lg font-semibold tabular-nums", m.tone)}>
              {m.value}
            </p>
          </div>
        ))}
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="border border-border-subtle">
          <div className="border-b border-border-subtle bg-surface/40 px-3 py-2">
            <p className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
              {t("product.command.attention")}
            </p>
          </div>
          <ul className="divide-y divide-border-subtle text-[12px]">
            {attention.map((e) => (
              <li key={e.id} className="flex items-start justify-between gap-2 px-3 py-2.5">
                <div>
                  <span className="font-mono text-[11px] text-gold">{e.id}</span>
                  <p className="text-ink-secondary">{e.text}</p>
                </div>
                <span className={cn("shrink-0 font-mono text-[10px]", e.sevClass)}>
                  {e.sev}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-border-subtle">
          <div className="border-b border-border-subtle bg-surface/40 px-3 py-2">
            <p className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
              {t("product.command.activity")}
            </p>
          </div>
          <ul className="divide-y divide-border-subtle font-mono text-[11px]">
            {activity.map((a) => (
              <li key={a.time + a.event} className="px-3 py-2.5">
                <div className="flex gap-3">
                  <span className="shrink-0 text-ink-faint">{a.time}</span>
                  <div>
                    <p className="text-ink-secondary">{a.event}</p>
                    <p className="text-ink-faint">{a.detail}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ReportingView() {
  const t = useTranslations("home");
  const rows = [
    ["SR-2026-00482", t("product.reporting.specific"), "NL-OBJ-042", "K. Jansen", "14:32", t("product.reporting.awaiting")],
    ["IR-2026-00194", t("product.reporting.incident"), t("places.corporate"), "D. Vermeer", "13:58", t("product.reporting.escalated")],
    ["DR-2026-00067", t("product.reporting.damage"), t("places.campusObj"), "M. de Wit", "12:41", t("product.reporting.draft")],
  ];
  const fields = [
    [t("product.reporting.eventTime"), "14:32"],
    [t("product.reporting.location"), t("product.reporting.locationValue")],
    [t("product.reporting.observation"), t("product.reporting.observationValue")],
    [t("product.reporting.action"), t("product.reporting.actionValue")],
    [t("product.reporting.escalation"), t("product.reporting.escalationValue")],
    [t("product.reporting.evidence"), t("product.reporting.evidenceValue")],
    [t("product.reporting.reviewer"), t("product.reporting.reviewerValue")],
    [t("product.reporting.state"), t("product.reporting.stateValue")],
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[13px] font-medium text-ink">{t("product.reporting.queue")}</p>
        <span className="font-mono text-[10px] text-ink-muted">
          {t("product.reporting.awaitingCount")}
        </span>
      </div>
      <div className="overflow-x-auto border border-border-subtle">
        <table className="w-full min-w-[520px] text-left text-[12px]">
          <thead>
            <tr className="border-b border-border-subtle bg-surface/40 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
              <th className="px-3 py-2 font-medium">{t("product.reporting.reportId")}</th>
              <th className="px-3 py-2 font-medium">{t("capUi.reporting.type")}</th>
              <th className="px-3 py-2 font-medium">{t("capUi.reporting.object")}</th>
              <th className="px-3 py-2 font-medium">{t("capUi.personnel.officer")}</th>
              <th className="px-3 py-2 font-medium">{t("product.reporting.time")}</th>
              <th className="px-3 py-2 font-medium">{t("capUi.reporting.status")}</th>
            </tr>
          </thead>
          <tbody className="text-ink-secondary">
            {rows.map((row, i) => (
              <tr
                key={row[0]}
                className={cn(
                  "border-b border-border-subtle last:border-0",
                  i === 0 && "bg-gold/5"
                )}
              >
                <td className="px-3 py-2.5 font-mono text-gold">{row[0]}</td>
                <td className="px-3 py-2.5">{row[1]}</td>
                <td className="px-3 py-2.5">{row[2]}</td>
                <td className="px-3 py-2.5">{row[3]}</td>
                <td className="px-3 py-2.5 font-mono">{row[4]}</td>
                <td className="px-3 py-2.5">{row[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border border-border-subtle">
        <div className="border-b border-border-subtle bg-surface/40 px-3 py-2">
          <p className="font-mono text-[10px] text-ink-faint">
            {t("product.reporting.selected")}
          </p>
        </div>
        <div className="grid gap-3 p-3 text-[12px] sm:grid-cols-2">
          {fields.map(([k, v]) => (
            <div key={k} className="flex gap-2 border-b border-border-subtle pb-2 last:border-0 sm:border-0 sm:pb-0">
              <span className="w-28 shrink-0 font-mono text-[10px] text-ink-faint">
                {k}
              </span>
              <span className="text-ink-secondary">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ObjectsView() {
  const t = useTranslations("home");
  const details = [
    [t("capUi.reporting.status"), t("product.objects.normal")],
    [t("product.objects.shift"), "14:00–22:00"],
    [t("product.objects.officer"), "K. Jansen"],
    [t("product.objects.instructions"), t("product.objects.instructionsValue")],
    [t("product.objects.risk"), t("product.objects.riskValue")],
    [t("product.objects.emergency"), t("product.objects.emergencyValue")],
    [t("product.objects.nextPatrol"), t("product.objects.nextPatrolValue")],
    [t("product.objects.recent"), t("product.objects.recentValue")],
    [t("product.objects.completion"), t("product.objects.completionValue")],
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
      <div className="border border-border-subtle">
        <div className="border-b border-border-subtle bg-surface/40 px-3 py-2">
          <p className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
            {t("pillars.hierarchy")}
          </p>
        </div>
        <div className="p-3 font-mono text-[12px] leading-7 text-ink-secondary">
          <p className="text-gold">{t("places.northOps")}</p>
          <p className="pl-3">└ NL-OBJ-042</p>
          <p className="pl-6">├ {t("places.buildingA")}</p>
          <p className="pl-9">└ {t("places.floor01")}</p>
          <p className="pl-12">└ {t("places.zoneNorth")}</p>
          <p className="pl-14 text-ink">· {t("places.northEntrance")}</p>
          <p className="pl-14 text-ink">· {t("product.objects.checkpoint")}</p>
          <p className="mt-2 pl-3 text-ink-muted">└ {t("places.corporate")}</p>
          <p className="pl-3 text-ink-muted">└ {t("places.campusObj")}</p>
        </div>
      </div>
      <div className="border border-border-subtle">
        <div className="border-b border-border-subtle bg-surface/40 px-3 py-2">
          <p className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
            {t("product.objects.detail")}
          </p>
        </div>
        <dl className="divide-y divide-border-subtle text-[12px]">
          {details.map(([k, v]) => (
            <div key={k} className="flex gap-3 px-3 py-2">
              <dt className="w-36 shrink-0 font-mono text-[10px] text-ink-faint">
                {k}
              </dt>
              <dd className="text-ink-secondary">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function PersonnelView() {
  const t = useTranslations("home");
  const rows = [
    ["K. Jansen", "NL-OBJ-042", "14:00–22:00", t("capUi.personnel.qualified"), t("capUi.personnel.onDuty"), "14:26", false],
    ["D. Vermeer", t("places.corporate"), "12:00–20:00", t("capUi.personnel.qualified"), t("capUi.personnel.onDuty"), "14:19", false],
    ["M. de Wit", t("places.campusObj"), "08:00–16:00", t("capUi.personnel.renewal"), t("capUi.personnel.onDuty"), "14:11", true],
    ["A. Bakker", t("places.dcNorth"), "14:00–22:00", t("capUi.personnel.qualified"), t("capUi.personnel.onDuty"), "14:05", false],
  ] as const;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-medium text-ink">{t("product.personnel.roster")}</p>
        <span className="font-mono text-[10px] text-ink-muted">
          {t("product.personnel.fictional")}
        </span>
      </div>
      <div className="overflow-x-auto border border-border-subtle">
        <table className="w-full min-w-[560px] text-left text-[12px]">
          <thead>
            <tr className="border-b border-border-subtle bg-surface/40 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
              <th className="px-3 py-2 font-medium">{t("capUi.personnel.officer")}</th>
              <th className="px-3 py-2 font-medium">{t("capUi.personnel.assignment")}</th>
              <th className="px-3 py-2 font-medium">{t("product.personnel.shift")}</th>
              <th className="px-3 py-2 font-medium">{t("capUi.personnel.qualification")}</th>
              <th className="px-3 py-2 font-medium">{t("product.personnel.availability")}</th>
              <th className="px-3 py-2 font-medium">{t("product.personnel.checkIn")}</th>
            </tr>
          </thead>
          <tbody className="text-ink-secondary">
            {rows.map((row) => (
              <tr key={row[0]} className="border-b border-border-subtle last:border-0">
                <td className="px-3 py-2.5 font-medium text-ink">{row[0]}</td>
                <td className="px-3 py-2.5">{row[1]}</td>
                <td className="px-3 py-2.5 font-mono">{row[2]}</td>
                <td className={cn("px-3 py-2.5", row[6] && "text-status-warning")}>{row[3]}</td>
                <td className="px-3 py-2.5">{row[4]}</td>
                <td className="px-3 py-2.5 font-mono">{row[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

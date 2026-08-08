"use client";

import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent as RKEvent,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type TabId = "command" | "reporting" | "objects" | "personnel";

const TABS: { id: TabId; label: string }[] = [
  { id: "command", label: "Command" },
  { id: "reporting", label: "Reporting" },
  { id: "objects", label: "Objects" },
  { id: "personnel", label: "Personnel" },
];

const SIDE_NAV = [
  "Command",
  "Reports",
  "Objects",
  "Personnel",
  "Patrols",
  "Incidents",
  "Compliance",
  "Intelligence",
  "Administration",
] as const;

export function ProductInterface() {
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
    selectTab(TABS[next].id, next);
  }

  return (
    <div
      className="relative"
      role="region"
      aria-label="Illustrative ISB Security Platform interface. Demonstration data only."
    >
      {/* Technical frame */}
      <div
        className="pointer-events-none absolute -inset-px border border-border/80"
        aria-hidden
      />
      <div className="relative border border-border bg-bg-secondary shadow-elevated">
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-border-subtle bg-surface px-3 py-2 sm:px-4">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2 w-2 bg-border-strong" />
            <span className="h-2 w-2 bg-border-strong" />
            <span className="h-2 w-2 bg-border-strong" />
          </div>
          <span className="font-mono text-[10px] text-ink-faint sm:text-[11px]">
            app.isbsecuritysolutions.nl
          </span>
          <span className="ml-auto border border-border bg-bg px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-ink-muted sm:text-[10px]">
            Illustrative demonstration data
          </span>
        </div>

        {/* Context bar */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-border-subtle bg-surface/80 px-3 py-2 font-mono text-[10px] text-ink-muted sm:gap-x-4 sm:px-4 sm:text-[11px]">
          <span>
            Org{" "}
            <span className="text-ink-secondary">ISB Demo Environment</span>
          </span>
          <span className="hidden text-border-strong sm:inline" aria-hidden>
            |
          </span>
          <span>
            Customer{" "}
            <span className="text-ink-secondary">North Region Operations</span>
          </span>
          <span className="hidden text-border-strong sm:inline" aria-hidden>
            |
          </span>
          <span>
            Object <span className="text-ink-secondary">NL-OBJ-042</span>
          </span>
          <span className="hidden text-border-strong md:inline" aria-hidden>
            |
          </span>
          <span className="hidden md:inline">
            Role{" "}
            <span className="text-ink-secondary">Operations Supervisor</span>
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 bg-status-success" aria-hidden />
            Normal Operations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] lg:grid-cols-[180px_1fr]">
          {/* App side nav — desktop/tablet */}
          <aside
            className="hidden border-r border-border-subtle bg-bg/50 p-2 md:block"
            aria-hidden
          >
            <p className="mb-2 px-2 font-mono text-[9px] uppercase tracking-wider text-ink-faint">
              Modules
            </p>
            {SIDE_NAV.map((item, i) => (
              <div
                key={item}
                className={cn(
                  "mb-0.5 px-2 py-1.5 text-[12px]",
                  i === 0
                    ? "border-l-2 border-gold bg-surface text-ink"
                    : "border-l-2 border-transparent text-ink-muted"
                )}
              >
                {item}
              </div>
            ))}
          </aside>

          <div className="min-w-0">
            {/* Tabs */}
            <div
              role="tablist"
              aria-label="Operational views"
              className="flex overflow-x-auto border-b border-border-subtle"
            >
              {TABS.map((t, i) => {
                const selected = tab === t.id;
                return (
                  <button
                    key={t.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`tab-${t.id}`}
                    aria-selected={selected}
                    aria-controls={`panel-${t.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => selectTab(t.id, i)}
                    onKeyDown={(e) => onTabKey(e, i)}
                    className={cn(
                      "shrink-0 border-b-2 px-3 py-2.5 text-[12px] font-medium transition-colors sm:px-4",
                      selected
                        ? "border-gold text-ink"
                        : "border-transparent text-ink-muted hover:text-ink-secondary"
                    )}
                  >
                    {t.label}
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
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
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

/* ——— Views ——— */

function CommandView() {
  return (
    <div className="space-y-4">
      {/* Compact operational strip */}
      <div className="grid grid-cols-2 gap-px border border-border-subtle bg-border-subtle sm:grid-cols-4">
        {[
          { label: "Active incidents", value: "3", tone: "text-status-warning" },
          { label: "Officers on duty", value: "14", tone: "text-ink" },
          { label: "Patrols in progress", value: "8", tone: "text-ink" },
          { label: "Missed checkpoints", value: "2", tone: "text-status-critical" },
        ].map((m) => (
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
              Attention
            </p>
          </div>
          <ul className="divide-y divide-border-subtle text-[12px]">
            {[
              { id: "ESC-184", text: "Gate 3 unsecured · NL-OBJ-042", sev: "High", sevClass: "text-status-critical" },
              { id: "ESC-181", text: "Camera 4 obstructed · Distribution Centre North", sev: "Medium", sevClass: "text-status-warning" },
              { id: "CERT-09", text: "2 qualifications renewal due · 30 days", sev: "Watch", sevClass: "text-ink-muted" },
            ].map((e) => (
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
              Activity stream
            </p>
          </div>
          <ul className="divide-y divide-border-subtle font-mono text-[11px]">
            {[
              { t: "14:32", e: "Incident report submitted", d: "NL-OBJ-042 · Awaiting supervisor review" },
              { t: "14:28", e: "Checkpoint missed", d: "Distribution Centre North · Escalation triggered" },
              { t: "14:21", e: "Officer shift started", d: "Corporate Site A · Post North Entrance" },
              { t: "14:17", e: "Object instruction updated", d: "Campus Object 03 · Version 7 approved" },
            ].map((a) => (
              <li key={a.t + a.e} className="px-3 py-2.5">
                <div className="flex gap-3">
                  <span className="shrink-0 text-ink-faint">{a.t}</span>
                  <div>
                    <p className="text-ink-secondary">{a.e}</p>
                    <p className="text-ink-faint">{a.d}</p>
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
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[13px] font-medium text-ink">Report queue</p>
        <span className="font-mono text-[10px] text-ink-muted">
          3 awaiting review
        </span>
      </div>
      <div className="overflow-x-auto border border-border-subtle">
        <table className="w-full min-w-[520px] text-left text-[12px]">
          <thead>
            <tr className="border-b border-border-subtle bg-surface/40 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
              <th className="px-3 py-2 font-medium">Report ID</th>
              <th className="px-3 py-2 font-medium">Type</th>
              <th className="px-3 py-2 font-medium">Object</th>
              <th className="px-3 py-2 font-medium">Officer</th>
              <th className="px-3 py-2 font-medium">Time</th>
              <th className="px-3 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-ink-secondary">
            {[
              ["SR-2026-00482", "Specific Report", "NL-OBJ-042", "K. Jansen", "14:32", "Awaiting review"],
              ["IR-2026-00194", "Incident Report", "Corporate Site A", "D. Vermeer", "13:58", "Escalated"],
              ["DR-2026-00067", "Damage Report", "Campus Object 03", "M. de Wit", "12:41", "Draft"],
            ].map((row, i) => (
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

      {/* Selected report preview */}
      <div className="border border-border-subtle">
        <div className="border-b border-border-subtle bg-surface/40 px-3 py-2">
          <p className="font-mono text-[10px] text-ink-faint">
            Selected · SR-2026-00482 · Illustrative
          </p>
        </div>
        <div className="grid gap-3 p-3 text-[12px] sm:grid-cols-2">
          {[
            ["Event time", "14:32"],
            ["Location", "NL-OBJ-042 · Zone North · Gate 3"],
            ["Observation", "Access door found unsecured"],
            ["Action taken", "Door secured · Control notified"],
            ["Escalation", "Object supervisor informed"],
            ["Evidence", "Photo attachment · 1 file"],
            ["Reviewer", "Pending assignment"],
            ["State", "Submitted · Awaiting review"],
          ].map(([k, v]) => (
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
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
      <div className="border border-border-subtle">
        <div className="border-b border-border-subtle bg-surface/40 px-3 py-2">
          <p className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
            Hierarchy
          </p>
        </div>
        <div className="p-3 font-mono text-[12px] leading-7 text-ink-secondary">
          <p className="text-gold">North Region Operations</p>
          <p className="pl-3">└ NL-OBJ-042</p>
          <p className="pl-6">├ Building A</p>
          <p className="pl-9">└ Floor 01</p>
          <p className="pl-12">└ Zone North</p>
          <p className="pl-14 text-ink">· North Entrance</p>
          <p className="pl-14 text-ink">· Checkpoint CP-04</p>
          <p className="mt-2 pl-3 text-ink-muted">└ Corporate Site A</p>
          <p className="pl-3 text-ink-muted">└ Campus Object 03</p>
        </div>
      </div>
      <div className="border border-border-subtle">
        <div className="border-b border-border-subtle bg-surface/40 px-3 py-2">
          <p className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
            Object detail · NL-OBJ-042
          </p>
        </div>
        <dl className="divide-y divide-border-subtle text-[12px]">
          {[
            ["Status", "Normal operations"],
            ["Current shift", "14:00–22:00"],
            ["Active officer", "K. Jansen"],
            ["Open instructions", "2 approved"],
            ["Risk note", "Perimeter camera 4 vegetation obstruction"],
            ["Emergency contact", "Control room · on-call supervisor"],
            ["Next patrol", "15:00 · Zone North route"],
            ["Recent incident", "SR-2026-00482 · awaiting review"],
            ["Checkpoint completion", "10 / 12 this shift"],
          ].map(([k, v]) => (
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
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-medium text-ink">Duty roster</p>
        <span className="font-mono text-[10px] text-ink-muted">
          Illustrative · fictional names
        </span>
      </div>
      <div className="overflow-x-auto border border-border-subtle">
        <table className="w-full min-w-[560px] text-left text-[12px]">
          <thead>
            <tr className="border-b border-border-subtle bg-surface/40 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
              <th className="px-3 py-2 font-medium">Officer</th>
              <th className="px-3 py-2 font-medium">Assignment</th>
              <th className="px-3 py-2 font-medium">Shift</th>
              <th className="px-3 py-2 font-medium">Qualification</th>
              <th className="px-3 py-2 font-medium">Availability</th>
              <th className="px-3 py-2 font-medium">Last check-in</th>
            </tr>
          </thead>
          <tbody className="text-ink-secondary">
            {[
              ["K. Jansen", "NL-OBJ-042", "14:00–22:00", "Qualified", "On duty", "14:26"],
              ["D. Vermeer", "Corporate Site A", "12:00–20:00", "Qualified", "On duty", "14:19"],
              ["M. de Wit", "Campus Object 03", "08:00–16:00", "Renewal due", "On duty", "14:11"],
              ["A. Bakker", "Distribution Centre North", "14:00–22:00", "Qualified", "On duty", "14:05"],
            ].map((row) => (
              <tr key={row[0]} className="border-b border-border-subtle last:border-0">
                <td className="px-3 py-2.5 font-medium text-ink">{row[0]}</td>
                <td className="px-3 py-2.5">{row[1]}</td>
                <td className="px-3 py-2.5 font-mono">{row[2]}</td>
                <td
                  className={cn(
                    "px-3 py-2.5",
                    row[3] === "Renewal due" && "text-status-warning"
                  )}
                >
                  {row[3]}
                </td>
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

"use client";

import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent as RKEvent,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Stage = "foundation" | "development" | "planned" | "future";
type CapId =
  | "reporting"
  | "operations"
  | "objects"
  | "personnel"
  | "customers"
  | "compliance"
  | "ai"
  | "intelligence";

type Capability = {
  id: CapId;
  title: string;
  category: string;
  stage: Stage;
  overview: string;
  purpose: string;
  workflow: string[];
  modules: string[];
  related: string[];
  stageLabel: string;
};

const STAGE_STYLE: Record<Stage, string> = {
  foundation: "border-border-subtle text-ink-muted",
  development: "border-gold/40 text-gold",
  planned: "border-border text-ink-faint",
  future: "border-dashed border-border text-ink-faint",
};

const CAPABILITIES: Capability[] = [
  {
    id: "reporting",
    title: "Reporting",
    category: "DOCUMENTATION",
    stage: "foundation",
    overview:
      "Structured operational reports from field observation through supervisor approval and locked history.",
    purpose:
      "Replace ad-hoc notes and messaging with traceable reports that share the same object, personnel and audit context as the rest of the platform.",
    workflow: [
      "Field observation captured",
      "Structured draft created",
      "Attachments linked",
      "Officer reviews draft",
      "Supervisor approval",
      "Record locked in history",
    ],
    modules: [
      "Specific Report",
      "Daily Report",
      "Incident Report",
      "Damage Report",
      "Accident Report",
      "AI Draft",
      "Attachments",
      "Approval",
      "History",
    ],
    related: ["Operations", "Objects", "Compliance", "AI Assistance"],
    stageLabel: "Implemented foundation · AI draft in active development",
  },
  {
    id: "operations",
    title: "Operations",
    category: "CONTROL",
    stage: "foundation",
    overview:
      "Shift context, patrols, tasks and escalations on a single operational surface.",
    purpose:
      "Coordinate day-to-day security activity without losing context across tools, shifts or sites.",
    workflow: [
      "Shift opens",
      "Assignments issued",
      "Patrol executes",
      "Checkpoint exception",
      "Escalation raised",
      "Supervisor acts",
      "Outcome recorded",
    ],
    modules: [
      "Shift context",
      "Patrol timeline",
      "Tasks",
      "Escalations",
      "Notifications",
      "Open actions",
      "Handover notes",
      "Realtime foundations",
    ],
    related: ["Personnel", "Objects", "Reporting", "Compliance"],
    stageLabel: "Implemented foundation · realtime foundations expanding",
  },
  {
    id: "objects",
    title: "Object Management",
    category: "STRUCTURE",
    stage: "foundation",
    overview:
      "Physical hierarchy from customer and object down to posts, checkpoints and assets.",
    purpose:
      "Anchor every report, patrol and instruction to a shared site model so context is never re-entered.",
    workflow: [
      "Customer defined",
      "Object created",
      "Buildings & zones mapped",
      "Posts & checkpoints set",
      "Requirements attached",
      "Routes & risks maintained",
    ],
    modules: [
      "Buildings",
      "Floors",
      "Zones",
      "Rooms",
      "Posts",
      "Checkpoints",
      "Assets",
      "Emergency contacts",
      "Routes",
      "Requirements",
      "Risks",
    ],
    related: ["Operations", "Reporting", "Compliance", "Customers"],
    stageLabel: "Implemented foundation",
  },
  {
    id: "personnel",
    title: "Personnel",
    category: "PEOPLE",
    stage: "foundation",
    overview:
      "Roles, qualifications, availability and assignments bound to operational objects.",
    purpose:
      "Ensure the right qualified people are assigned, with activity retained for review.",
    workflow: [
      "Profile & role set",
      "Qualification verified",
      "Assignment to object",
      "Shift active",
      "Operational activity",
      "Audit retained",
    ],
    modules: [
      "Users",
      "Roles",
      "Qualifications",
      "Certifications",
      "Availability",
      "Scheduling foundations",
      "Assignments",
      "Team structure",
    ],
    related: ["Operations", "Compliance", "Objects"],
    stageLabel: "Implemented foundation · scheduling foundations planned",
  },
  {
    id: "customers",
    title: "Customer Management",
    category: "COMMERCIAL",
    stage: "development",
    overview:
      "Customer context spanning objects, contacts and contractual requirements.",
    purpose:
      "Keep multi-customer operations coherent without separate spreadsheets per client.",
    workflow: [
      "Customer onboarding",
      "Objects linked",
      "Contacts registered",
      "Requirements captured",
      "Operational delivery",
      "Evidence available",
    ],
    modules: [
      "Customers",
      "Linked objects",
      "Contacts",
      "Contractual notes",
      "Requirements",
      "Visibility scopes",
    ],
    related: ["Objects", "Reporting", "Compliance"],
    stageLabel: "Active development",
  },
  {
    id: "compliance",
    title: "Compliance",
    category: "GOVERNANCE",
    stage: "foundation",
    overview:
      "Access boundaries, evidence chains and change history designed into operations.",
    purpose:
      "Support oversight and customer requirements without claiming external certifications the product does not hold.",
    workflow: [
      "Requirement defined",
      "Control assigned",
      "Operational action",
      "Evidence recorded",
      "Review completed",
      "Audit trail retained",
    ],
    modules: [
      "Role-based access",
      "Audit logging",
      "Approval trails",
      "Qualification tracking",
      "Change history",
      "Operational evidence",
      "Customer requirements",
    ],
    related: ["Reporting", "Personnel", "Objects"],
    stageLabel: "Implemented foundation",
  },
  {
    id: "ai",
    title: "AI Assistance",
    category: "ASSIST",
    stage: "development",
    overview:
      "AI structures field notes into draft reports. Human review remains mandatory before any official record.",
    purpose:
      "Reduce administrative load while keeping operational decisions with officers and supervisors.",
    workflow: [
      "Field notes entered",
      "AI structures draft",
      "Missing fields flagged",
      "Officer reviews",
      "Supervisor approves",
      "Record finalized",
    ],
    modules: [
      "Field note input",
      "Structured extraction",
      "Draft generation",
      "Missing-field prompts",
      "Human review gate",
      "Approval link",
    ],
    related: ["Reporting", "Operations", "Compliance"],
    stageLabel: "Active development · Specific Report workflow in MVP",
  },
  {
    id: "intelligence",
    title: "Intelligence",
    category: "INSIGHT",
    stage: "planned",
    overview:
      "Operational insight built on structured platform data. Recommendations remain future direction.",
    purpose:
      "Help supervisors understand patterns over time — without autonomous decision-making.",
    workflow: [
      "Operational data accumulates",
      "Structured signals derived",
      "Pattern support presented",
      "Human interpretation",
      "Action decided by operations",
    ],
    modules: [
      "Insight views — planned",
      "Pattern analysis — planned",
      "Risk signals — planned",
      "Recommendations — future",
      "Predictive support — future",
    ],
    related: ["Reporting", "Operations", "Personnel", "Objects"],
    stageLabel: "Planned · future recommendations clearly staged",
  },
];

/* ——— Purpose-built interfaces per capability ——— */

function ReportingInterface() {
  return (
    <div className="overflow-x-auto border border-border-subtle">
      <table className="w-full min-w-[360px] text-left text-[12px]">
        <thead>
          <tr className="border-b border-border-subtle bg-surface/50 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
            <th className="px-3 py-2 font-medium">ID</th>
            <th className="px-3 py-2 font-medium">Type</th>
            <th className="px-3 py-2 font-medium">Object</th>
            <th className="px-3 py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="text-ink-secondary">
          {[
            ["SR-2026-00482", "Specific", "NL-OBJ-042", "Awaiting review"],
            ["IR-2026-00194", "Incident", "Site A", "Escalated"],
            ["DR-2026-00067", "Damage", "Campus 03", "Draft"],
          ].map((r) => (
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
  return (
    <div className="border border-border-subtle">
      <div className="border-b border-border-subtle bg-surface/40 px-3 py-2 font-mono text-[10px] text-ink-faint">
        Patrol timeline · illustrative
      </div>
      <ul className="divide-y divide-border-subtle font-mono text-[11px]">
        {[
          ["14:00", "Shift open · North Region"],
          ["14:12", "Patrol NL-OBJ-042 started"],
          ["14:28", "Checkpoint CP-04 missed · escalation"],
          ["14:35", "Supervisor assigned"],
          ["14:41", "Action recorded · door secured"],
        ].map(([t, e]) => (
          <li key={t} className="flex gap-3 px-3 py-2">
            <span className="w-10 shrink-0 text-ink-faint">{t}</span>
            <span className="text-ink-secondary">{e}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ObjectsInterface() {
  return (
    <div className="border border-border-subtle bg-bg/40 p-3 font-mono text-[12px] leading-7 text-ink-secondary">
      <p className="text-gold">North Region Operations</p>
      <p className="pl-3">└ NL-OBJ-042</p>
      <p className="pl-6">├ Building A · Floor 01 · Zone North</p>
      <p className="pl-9 text-ink">· North Entrance · CP-04</p>
      <p className="pl-6">└ Requirements · Risks · Routes</p>
      <p className="mt-1 pl-3 text-ink-muted">└ Corporate Site A</p>
    </div>
  );
}

function PersonnelInterface() {
  return (
    <div className="overflow-x-auto border border-border-subtle">
      <table className="w-full min-w-[360px] text-left text-[12px]">
        <thead>
          <tr className="border-b border-border-subtle bg-surface/50 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
            <th className="px-3 py-2">Officer</th>
            <th className="px-3 py-2">Assignment</th>
            <th className="px-3 py-2">Qualification</th>
            <th className="px-3 py-2">Status</th>
          </tr>
        </thead>
        <tbody className="text-ink-secondary">
          {[
            ["K. Jansen", "NL-OBJ-042", "Qualified", "On duty"],
            ["D. Vermeer", "Site A", "Qualified", "On duty"],
            ["M. de Wit", "Campus 03", "Renewal due", "On duty"],
          ].map((r) => (
            <tr key={r[0]} className="border-b border-border-subtle last:border-0">
              <td className="px-3 py-2 font-medium text-ink">{r[0]}</td>
              <td className="px-3 py-2">{r[1]}</td>
              <td className={cn("px-3 py-2", r[2] === "Renewal due" && "text-status-warning")}>
                {r[2]}
              </td>
              <td className="px-3 py-2">{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CustomersInterface() {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {[
        ["Customer", "North Region Operations"],
        ["Linked objects", "3 active"],
        ["Primary contact", "Ops desk · on-call"],
        ["Requirements", "12 tracked"],
      ].map(([k, v]) => (
        <div key={k} className="border border-border-subtle bg-bg/40 px-3 py-2">
          <p className="font-mono text-[9px] uppercase text-ink-faint">{k}</p>
          <p className="mt-0.5 text-[12px] text-ink-secondary">{v}</p>
        </div>
      ))}
    </div>
  );
}

function ComplianceInterface() {
  return (
    <div className="border border-border-subtle">
      <ol className="divide-y divide-border-subtle text-[12px]">
        {[
          "Requirement · perimeter check every 60 min",
          "Control assigned · patrol route Zone North",
          "Operational action · CP-04 logged",
          "Evidence · report SR-2026-00482",
          "Review · supervisor signed",
          "Audit trail · immutable entry retained",
        ].map((s, i) => (
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
  return (
    <div className="space-y-2">
      <div className="border border-border-subtle bg-bg/50 p-3">
        <p className="font-mono text-[9px] text-ink-faint">Field notes</p>
        <p className="mt-1 text-[12px] text-ink-secondary">
          &ldquo;22:14 north patrol. gate 3 open. secured. cam 4 blocked vegetation.&rdquo;
        </p>
      </div>
      <div className="border border-border-subtle bg-bg/40 p-3 font-mono text-[11px] text-ink-secondary">
        <p>Time · 22:14</p>
        <p>Location · Gate 3</p>
        <p>Action · Secured</p>
        <p>Secondary · Camera obstructed</p>
      </div>
      <div className="border border-gold/30 bg-gold/5 p-3 text-[12px] text-ink-secondary">
        Review required — draft is not an official record until approved.
      </div>
    </div>
  );
}

function IntelligenceInterface() {
  return (
    <div className="border border-border-subtle p-3">
      <p className="font-mono text-[9px] uppercase text-ink-faint">Staged capability</p>
      <ul className="mt-2 space-y-1.5 text-[12px] text-ink-muted">
        <li>Insight views — planned</li>
        <li>Pattern analysis — planned</li>
        <li>Risk signals — planned</li>
        <li className="text-ink-faint">Recommendations — future direction</li>
      </ul>
      <p className="mt-3 text-[11px] text-ink-faint">
        Human interpretation required. No autonomous decisions.
      </p>
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
  const [active, setActive] = useState<CapId>("reporting");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const current = CAPABILITIES.find((c) => c.id === active)!;

  const select = useCallback((id: CapId, i: number) => {
    setActive(id);
    refs.current[i]?.focus();
  }, []);

  function onKey(e: RKEvent<HTMLButtonElement>, i: number) {
    let n = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      n = (i + 1) % CAPABILITIES.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      n = (i - 1 + CAPABILITIES.length) % CAPABILITIES.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      n = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      n = CAPABILITIES.length - 1;
    } else return;
    select(CAPABILITIES[n].id, n);
  }

  return (
    <div className="overflow-hidden border border-border">
      <div className="grid lg:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)]">
        {/* Navigator */}
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Operational capabilities"
          className="flex gap-0 overflow-x-auto border-b border-border lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r"
        >
          {CAPABILITIES.map((c, i) => {
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
                    {c.stage}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Workspace */}
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
                    {current.stage}
                  </span>
                </div>
                <h3 className="heading-md mt-1">{current.title}</h3>
                <p className="body mt-2 max-w-2xl">{current.overview}</p>
                <p className="mt-2 text-[13px] text-ink-muted">{current.purpose}</p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <p className="label mb-3">Operational workflow</p>
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

                <div>
                  <p className="label mb-3">Example interface</p>
                  <CapabilityInterface id={current.id} />
                  <p className="mt-2 font-mono text-[9px] text-ink-faint">
                    Illustrative demonstration data
                  </p>
                </div>
              </div>

              <div>
                <p className="label mb-3">Modules</p>
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

              <div>
                <p className="label mb-3">Related capabilities</p>
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
                  Implementation stage
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

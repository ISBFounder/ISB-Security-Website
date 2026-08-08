"use client";

import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent as RKEvent,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type PillarId =
  | "operations"
  | "reporting"
  | "people"
  | "objects"
  | "compliance"
  | "intelligence";

type Pillar = {
  id: PillarId;
  index: string;
  title: string;
  summary: string;
  capabilities: string[];
  workflow: string[];
  connected: string[];
  outcome: string;
};

const PILLARS: Pillar[] = [
  {
    id: "operations",
    index: "01",
    title: "Operations",
    summary:
      "Coordinate shifts, patrols, tasks and escalations within a shared operational context — not as isolated messages or spreadsheets.",
    capabilities: [
      "Shift context",
      "Patrol workflows",
      "Tasks & open actions",
      "Notifications",
      "Escalations",
      "Realtime update foundations",
      "Operational handovers",
    ],
    workflow: [
      "Shift starts",
      "Officer receives assignment",
      "Patrol begins",
      "Checkpoint missed",
      "Escalation triggered",
      "Supervisor reviews",
      "Action recorded",
    ],
    connected: ["People", "Objects", "Reporting", "Compliance"],
    outcome: "Centralized operational control with recorded handovers and clear accountability.",
  },
  {
    id: "reporting",
    index: "02",
    title: "Reporting",
    summary:
      "Structured operational documentation — from field observation to approved record — with human review remaining mandatory.",
    capabilities: [
      "Specific Report",
      "Incident / Daily / Damage / Accident reports",
      "AI-assisted drafting",
      "Attachments",
      "Review and approval",
      "Report history",
      "Signatures",
    ],
    workflow: [
      "Field observation",
      "Report draft",
      "AI assistance",
      "Officer review",
      "Supervisor approval",
      "Locked operational record",
    ],
    connected: ["Operations", "Objects", "Intelligence", "Compliance"],
    outcome: "Traceable operational records suitable for internal oversight and client evidence.",
  },
  {
    id: "people",
    index: "03",
    title: "People",
    summary:
      "Personnel, roles, qualifications and assignments bound to the same objects and operational rules as the rest of the platform.",
    capabilities: [
      "User profiles",
      "Roles & permissions",
      "Qualifications",
      "Certifications",
      "Availability",
      "Teams",
      "Assignments",
      "Scheduling foundations",
    ],
    workflow: [
      "Officer profile",
      "Qualification check",
      "Assignment",
      "Shift",
      "Operational activity",
      "Audit record",
    ],
    connected: ["Operations", "Compliance", "Objects"],
    outcome: "Qualified personnel in the right place, with activity retained for review.",
  },
  {
    id: "objects",
    index: "04",
    title: "Objects",
    summary:
      "The physical hierarchy that anchors every report, patrol and instruction — from customer to checkpoint and asset.",
    capabilities: [
      "Object requirements",
      "Emergency contacts",
      "Risks",
      "Instructions",
      "Patrol routes",
      "Resources",
      "Documents",
      "Object history",
    ],
    workflow: [
      "Customer",
      "Object",
      "Building",
      "Floor",
      "Zone",
      "Post / Checkpoint",
      "Asset",
    ],
    connected: ["Operations", "Reporting", "Compliance"],
    outcome: "One shared site model for every operational action and requirement.",
  },
  {
    id: "compliance",
    index: "05",
    title: "Compliance",
    summary:
      "Governance and traceability designed into the platform — access boundaries, evidence and change history.",
    capabilities: [
      "Role-based access",
      "Audit logging",
      "Approval trails",
      "Qualification tracking",
      "Certification status",
      "Change history",
      "Operational evidence",
      "Customer requirements",
    ],
    workflow: [
      "Requirement",
      "Assigned control",
      "Operational action",
      "Recorded evidence",
      "Review",
      "Audit trail",
    ],
    connected: ["Reporting", "People", "Objects"],
    outcome: "Defensible operational evidence without claiming completed external certifications.",
  },
  {
    id: "intelligence",
    index: "06",
    title: "Intelligence",
    summary:
      "AI assists structure and insight. Human judgment remains required. Capabilities are staged by maturity.",
    capabilities: [
      "AI-assisted report drafting — foundation",
      "Structured information support — foundation",
      "Operational insight — planned",
      "Pattern analysis — planned",
      "Risk signals — planned",
      "Recommendations — future direction",
      "Predictive support — future direction",
    ],
    workflow: [
      "Operational data",
      "Structured extraction",
      "Analysis support",
      "Human review",
      "Decision remains with officer / supervisor",
    ],
    connected: ["Reporting", "Operations", "People", "Objects"],
    outcome: "Assisted understanding — never autonomous operational decisions.",
  },
];

const FOUNDATION = [
  "Multi-tenant architecture",
  "Role-based access",
  "Audit foundation",
  "Notifications",
  "Realtime foundations",
  "Offline foundations",
  "API foundations",
  "Secure storage foundations",
] as const;

export function PlatformPillars() {
  const [active, setActive] = useState<PillarId>("operations");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const current = PILLARS.find((p) => p.id === active)!;

  const select = useCallback((id: PillarId, index: number) => {
    setActive(id);
    tabRefs.current[index]?.focus();
  }, []);

  function onKey(e: RKEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      next = (index + 1) % PILLARS.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      next = (index - 1 + PILLARS.length) % PILLARS.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      next = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      next = PILLARS.length - 1;
    } else {
      return;
    }
    select(PILLARS[next].id, next);
  }

  return (
    <div>
      <div className="grid gap-0 border border-border lg:grid-cols-[220px_1fr]">
        {/* Pillar navigation */}
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Platform pillars"
          className="flex gap-0 overflow-x-auto border-b border-border lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r"
        >
          {PILLARS.map((p, i) => {
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
                <span className="font-mono text-[10px] text-ink-faint">
                  {p.index}
                </span>
                <span className="text-[13px] font-medium">{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Workspace */}
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
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-6"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                  Pillar {current.index}
                </p>
                <h3 className="heading-md mt-1">{current.title}</h3>
                <p className="body mt-3 max-w-2xl">{current.summary}</p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Capabilities */}
                <div>
                  <p className="label mb-3">Core capabilities</p>
                  <ul className="space-y-1.5">
                    {current.capabilities.map((c) => (
                      <li
                        key={c}
                        className="flex gap-2 border-b border-border-subtle py-1.5 text-[13px] text-ink-secondary last:border-0"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 bg-gold/70" aria-hidden />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Workflow visual */}
                <div>
                  <p className="label mb-3">
                    {current.id === "objects" ? "Hierarchy" : "Example workflow"}
                  </p>
                  <div className="border border-border-subtle bg-bg/40 p-3">
                    <ol className="space-y-0">
                      {current.workflow.map((step, i) => (
                        <li key={step} className="flex gap-3">
                          <div className="flex w-5 flex-col items-center" aria-hidden>
                            <span
                              className={cn(
                                "mt-1.5 h-1.5 w-1.5 shrink-0",
                                i === 0 || i === current.workflow.length - 1
                                  ? "bg-gold"
                                  : "bg-ink-faint"
                              )}
                            />
                            {i < current.workflow.length - 1 && (
                              <span className="w-px flex-1 bg-border-subtle" />
                            )}
                          </div>
                          <span className="pb-3 text-[12px] text-ink-secondary last:pb-0">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              {/* Connected domains */}
              <div>
                <p className="label mb-3">Connected platform domains</p>
                <div className="flex flex-wrap items-center gap-2" aria-hidden={false}>
                  <span className="border border-gold/30 bg-gold/10 px-2.5 py-1.5 text-[12px] font-medium text-ink">
                    {current.title}
                  </span>
                  {current.connected.map((c) => (
                    <span key={c} className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-ink-faint" aria-hidden>
                        —
                      </span>
                      <span className="border border-border-subtle bg-bg/50 px-2.5 py-1.5 text-[12px] text-ink-secondary">
                        {c}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Outcome */}
              <div className="border-t border-border-subtle pt-4">
                <p className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                  Operational outcome
                </p>
                <p className="mt-1 text-[13px] text-ink-secondary">{current.outcome}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Shared foundation rail — always visible */}
      <div className="border border-t-0 border-border bg-bg-secondary/60 px-4 py-4 md:px-5">
        <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
          Shared platform foundation
        </p>
        <div className="flex flex-wrap gap-1.5">
          {FOUNDATION.map((f) => (
            <span
              key={f}
              className="border border-border-subtle bg-surface/40 px-2.5 py-1 font-mono text-[10px] text-ink-muted"
            >
              {f}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-ink-faint">
          Different operational domains · same organizational, object, user and audit context
        </p>
      </div>
    </div>
  );
}

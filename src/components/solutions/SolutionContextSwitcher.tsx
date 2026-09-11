"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { osPanelTransition } from "@/lib/motion";
import { OsStatus, type OsMaturity } from "@/components/os/OsStatus";

type ContextId = "object" | "event" | "patrol" | "retail" | "education";

const CONTEXTS: {
  id: ContextId;
  title: string;
  priorities: string[];
  modules: string[];
  workflow: string[];
  status: OsMaturity;
}[] = [
  {
    id: "object",
    title: "Object security",
    priorities: ["Objects", "Reporting", "Personnel", "Incidents"],
    modules: ["Objects", "Reporting", "People", "Operations"],
    workflow: ["Post assignment", "Patrol / check", "Incident", "Approved record"],
    status: "foundation",
  },
  {
    id: "event",
    title: "Event security",
    priorities: ["Personnel", "Operations", "Incidents", "Reporting"],
    modules: ["People", "Operations", "Reporting", "Objects"],
    workflow: ["Briefing", "Deployment", "Incident", "Debrief record"],
    status: "development",
  },
  {
    id: "patrol",
    title: "Mobile / patrol",
    priorities: ["Operations", "Objects", "Reporting", "People"],
    modules: ["Operations", "Objects", "Reporting", "People"],
    workflow: ["Route", "Checkpoint", "Exception", "Handover"],
    status: "development",
  },
  {
    id: "retail",
    title: "Retail",
    priorities: ["Objects", "Incidents", "Reporting", "People"],
    modules: ["Objects", "Reporting", "People", "Compliance"],
    workflow: ["Floor observation", "Incident", "Review", "Client evidence"],
    status: "planned",
  },
  {
    id: "education",
    title: "Education",
    priorities: ["Objects", "People", "Reporting", "Compliance"],
    modules: ["Objects", "People", "Reporting", "Compliance"],
    workflow: ["Site instruction", "Duty", "Report", "Audit trail"],
    status: "planned",
  },
];

const FUTURE = [
  "Executive Protection",
  "Secure Mobility / High-Risk Transport",
  "Visitor & Client Flow",
  "Vehicle Intelligence / LPR",
];

export function SolutionContextSwitcher() {
  const [active, setActive] = useState<ContextId>("object");
  const reduce = useReducedMotion();
  const current = CONTEXTS.find((c) => c.id === active)!;

  return (
    <div>
      <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
        Same Security OS · different operational configuration
      </p>
      <div
        className="flex flex-wrap gap-px border border-border bg-border-subtle"
        role="tablist"
        aria-label="Operational contexts"
      >
        {CONTEXTS.map((c) => {
          const selected = c.id === active;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(c.id)}
              className={cn(
                "bg-bg px-3 py-2.5 text-[12px]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
                selected ? "surface-3 text-ink" : "text-ink-muted hover:text-ink-secondary"
              )}
            >
              {c.title}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={reduce ? false : { opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={osPanelTransition}
          className="border border-t-0 border-border bg-surface/15 p-5"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-medium text-ink">{current.title}</h3>
            <OsStatus status={current.status} />
          </div>
          <div className="mt-4 grid gap-5 sm:grid-cols-3">
            <div>
              <p className="label mb-2">Priorities</p>
              <ul className="space-y-1 text-[13px] text-ink-secondary">
                {current.priorities.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label mb-2">Modules in this context</p>
              <ul className="space-y-1 text-[13px] text-ink-secondary">
                {current.modules.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label mb-2">Representative workflow</p>
              <ol className="space-y-1 text-[13px] text-ink-secondary">
                {current.workflow.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mt-4 border border-border-subtle px-4 py-3">
        <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
          Future / research domains
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {FUTURE.map((f) => (
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

"use client";

import { useCallback, useRef, useState, type KeyboardEvent as RKEvent } from "react";
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

const DOMAINS: {
  id: DomainId;
  index: string;
  title: string;
  summary: string;
  connected: DomainId[];
  concepts: string[];
  status: OsMaturity;
}[] = [
  {
    id: "operations",
    index: "01",
    title: "Operations",
    summary: "Shifts, patrols, tasks and escalations in a shared operational context.",
    connected: ["people", "objects", "reporting", "compliance"],
    concepts: ["Shift context", "Patrol workflows", "Escalations", "Handovers"],
    status: "development",
  },
  {
    id: "reporting",
    index: "02",
    title: "Reporting",
    summary: "Field observation to approved record. Human review remains mandatory.",
    connected: ["operations", "objects", "intelligence", "compliance"],
    concepts: ["Specific Report", "AI-assisted draft", "Approval", "History"],
    status: "foundation",
  },
  {
    id: "people",
    index: "03",
    title: "People",
    summary: "Roles, qualifications and assignments bound to the same objects and rules.",
    connected: ["operations", "compliance", "objects"],
    concepts: ["Profiles", "Qualifications", "Assignments", "Availability"],
    status: "development",
  },
  {
    id: "objects",
    index: "04",
    title: "Objects",
    summary: "The physical hierarchy that anchors reports, patrols and instructions.",
    connected: ["operations", "reporting", "compliance"],
    concepts: ["Customer", "Object", "Zone", "Checkpoint"],
    status: "foundation",
  },
  {
    id: "compliance",
    index: "05",
    title: "Compliance",
    summary: "Access boundaries, evidence and change history designed into the platform.",
    connected: ["reporting", "people", "objects"],
    concepts: ["RBAC", "Audit logging", "Approval trails", "Evidence"],
    status: "foundation",
  },
  {
    id: "intelligence",
    index: "06",
    title: "Intelligence",
    summary: "AI assists structure and insight. Human judgment remains required.",
    connected: ["reporting", "operations", "people", "objects"],
    concepts: [
      "Report drafting — foundation",
      "Pattern analysis — planned",
      "Recommendations — future",
    ],
    status: "planned",
  },
];

const CONTEXT = [
  "Organization",
  "Customer",
  "Object / Location",
  "Personnel",
  "Roles / Permissions",
  "Audit context",
] as const;

const FOUNDATION = [
  "Multi-tenancy",
  "Authentication",
  "Authorization / RBAC",
  "Tenant isolation",
  "Auditability",
  "Secure storage foundations",
  "Realtime foundations",
  "Modular architecture",
] as const;

export function PlatformOsExplorer() {
  const [active, setActive] = useState<DomainId>("reporting");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const current = DOMAINS.find((d) => d.id === active)!;

  const select = useCallback((id: DomainId, i: number) => {
    setActive(id);
    refs.current[i]?.focus();
  }, []);

  function onKey(e: RKEvent<HTMLButtonElement>, i: number) {
    let n = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      n = (i + 1) % DOMAINS.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      n = (i - 1 + DOMAINS.length) % DOMAINS.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      n = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      n = DOMAINS.length - 1;
    } else return;
    select(DOMAINS[n].id, n);
  }

  return (
    <div>
      <ol className="mb-6 grid gap-px border border-border bg-border-subtle font-mono text-[11px] text-ink-muted sm:grid-cols-4">
        {["One foundation", "Shared context", "Operational domains", "Connected workflows"].map(
          (step, i) => (
            <li key={step} className="bg-bg px-3 py-2.5">
              <span className="text-[9px] uppercase tracking-wide text-ink-faint">
                0{i + 1}
              </span>
              <p className="mt-1 text-ink-secondary">{step}</p>
            </li>
          )
        )}
      </ol>

      <div className="border border-border">
        <div className="flex items-center justify-between gap-3 border-b border-border-subtle bg-surface/40 px-4 py-2.5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
            Security OS · architecture explorer
          </p>
          <p className="hidden font-mono text-[10px] text-ink-muted sm:block">
            Modules inherit identity, permissions and audit
          </p>
        </div>
        <div
          className="grid grid-cols-2 gap-px bg-border-subtle sm:grid-cols-3 lg:grid-cols-6"
          role="tablist"
          aria-label="Platform domains"
        >
          {DOMAINS.map((d, i) => {
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
              <p className="label mb-3">Representative concepts</p>
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
              <p className="label mb-3">Connected domains</p>
              <div className="flex flex-wrap gap-2">
                {current.connected.map((id) => {
                  const peer = DOMAINS.find((d) => d.id === id)!;
                  const idx = DOMAINS.findIndex((d) => d.id === id);
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
        <p className="label mb-3">Shared context</p>
        <div className="flex flex-wrap gap-1.5">
          {CONTEXT.map((c) => (
            <span
              key={c}
              className="border border-border-subtle bg-surface/40 px-2.5 py-1 font-mono text-[10px] text-ink-muted"
            >
              {c}
            </span>
          ))}
        </div>
        <p className="label mb-3 mt-5">Shared foundation</p>
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
          Domains do not each recreate identity, permissions and operational context.
          They inherit them from the Security OS foundation.
        </p>
      </div>
    </div>
  );
}

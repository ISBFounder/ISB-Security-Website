"use client";

import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent as RKEvent,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type StageId = "input" | "assist" | "review" | "approve" | "audit";

const STAGES: { id: StageId; label: string; index: string }[] = [
  { id: "input", label: "Input", index: "01" },
  { id: "assist", label: "Assist", index: "02" },
  { id: "review", label: "Review", index: "03" },
  { id: "approve", label: "Approve", index: "04" },
  { id: "audit", label: "Audit", index: "05" },
];

function Content({ id }: { id: StageId }) {
  if (id === "input") {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-ink-muted">
          <span>Officer · K. Jansen</span>
          <span>Object · NL-OBJ-042</span>
          <span>Time · 22:14</span>
        </div>
        <div className="border border-border-subtle bg-bg/50 p-4">
          <p className="font-mono text-[9px] uppercase text-ink-faint">Field notes</p>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-secondary">
            &ldquo;22:14 north patrol. gate 3 open. secured gate. camera 4 partly
            blocked by vegetation. supervisor informed.&rdquo;
          </p>
        </div>
        <p className="font-mono text-[9px] text-ink-faint">Illustrative demonstration data</p>
      </div>
    );
  }
  if (id === "assist") {
    return (
      <div className="space-y-4">
        <p className="text-[12px] text-ink-muted">Suggested extraction · requires review</p>
        <dl className="divide-y divide-border-subtle border border-border-subtle text-[13px]">
          {[
            ["Time", "22:14"],
            ["Location", "North perimeter · Gate 3"],
            ["Observation", "Gate found unsecured"],
            ["Action", "Gate secured on location"],
            ["Secondary", "Camera 4 partially obstructed"],
            ["Escalation", "Object supervisor informed"],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-4 px-3 py-2">
              <dt className="w-28 shrink-0 font-mono text-[10px] text-ink-faint">{k}</dt>
              <dd className="text-ink-secondary">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="border border-border-subtle bg-bg/40 px-3 py-2 text-[12px]">
          <span className="text-ink-muted">Completeness · </span>
          <span className="text-ink-secondary">6 / 7 identified</span>
          <span className="mx-2 text-ink-faint">·</span>
          <span className="text-status-warning">Missing · Follow-up owner</span>
        </div>
        <div className="border border-border-subtle bg-bg/50 p-4 text-[13px] leading-relaxed text-ink-secondary">
          At 22:14 hours, during a scheduled patrol of the north perimeter of object
          NL-OBJ-042, Gate 3 was found unsecured. The gate was secured on location.
          Camera 4 was also observed to have a partially obstructed field of view due
          to vegetation. The object supervisor was informed for follow-up.
        </div>
        <span className="inline-block border border-gold/40 px-2 py-0.5 font-mono text-[9px] uppercase text-gold">
          AI-generated draft · not final
        </span>
      </div>
    );
  }
  if (id === "review") {
    return (
      <div className="space-y-4">
        <div className="border border-border-subtle bg-bg/50 p-4 text-[13px] leading-relaxed text-ink-secondary">
          … The object supervisor was informed for follow-up.{" "}
          <span className="bg-status-warning/15">
            Follow-up assigned to on-call supervisor.
          </span>
        </div>
        <ul className="space-y-1.5 text-[12px]">
          {[
            { t: "Follow-up owner not specified", w: true },
            { t: "No photo attached", w: true },
            { t: "Object instruction reference optional", w: false },
          ].map((x) => (
            <li
              key={x.t}
              className={cn(
                "border px-3 py-2",
                x.w
                  ? "border-status-warning/30 bg-status-warning/5 text-ink-secondary"
                  : "border-border-subtle text-ink-muted"
              )}
            >
              {x.t}
            </li>
          ))}
        </ul>
        <p className="font-mono text-[11px] text-ink-secondary">
          Reviewed by officer · Pending supervisor review
        </p>
      </div>
    );
  }
  if (id === "approve") {
    return (
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border border-border-subtle bg-bg/40 p-3">
            <p className="font-mono text-[9px] text-ink-faint">v2 · Officer correction</p>
            <p className="mt-2 text-[12px] text-ink-secondary">
              Follow-up owner added · ready where workflow requires approval.
            </p>
          </div>
          <div className="border border-border-subtle bg-bg/40 p-3">
            <p className="font-mono text-[9px] text-ink-faint">Supervisor</p>
            <p className="mt-1 text-[12px] text-ink-secondary">
              Comment: &ldquo;Clarify follow-up responsibility.&rdquo;
            </p>
            <p className="mt-2 font-mono text-[10px] text-status-warning">
              Revision requested → Revised → Approved
            </p>
          </div>
        </div>
        <div className="border border-status-success/30 bg-status-success/5 px-3 py-2 text-[12px] text-ink-secondary">
          Supervisor approved · 22:24 · authorized human decision
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <p className="text-[12px] text-ink-muted">
        AI involvement can be recorded as part of workflow history.
      </p>
      <ul className="border border-border-subtle divide-y divide-border-subtle text-[12px] text-ink-secondary">
        {[
          "22:16 · AI draft generated",
          "22:19 · Officer edited draft",
          "22:19 · Missing-context warning shown",
          "22:21 · Supervisor requested revision",
          "22:24 · Final report approved",
        ].map((e) => (
          <li key={e} className="px-3 py-2 font-mono text-[11px]">
            {e}
          </li>
        ))}
      </ul>
      <p className="text-[11px] text-ink-faint">
        Traceable workflow history · not claimed as full production audit coverage or
        immutable storage
      </p>
    </div>
  );
}

export function AILifecycleExplorer() {
  const [active, setActive] = useState<StageId>("input");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();

  const select = useCallback((id: StageId, i: number) => {
    setActive(id);
    refs.current[i]?.focus();
  }, []);

  function onKey(e: RKEvent<HTMLButtonElement>, i: number) {
    let n = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      n = (i + 1) % STAGES.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      n = (i - 1 + STAGES.length) % STAGES.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      n = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      n = STAGES.length - 1;
    } else return;
    select(STAGES[n].id, n);
  }

  return (
    <div className="border border-border">
      <div
        role="tablist"
        aria-label="AI report lifecycle"
        className="flex gap-0 overflow-x-auto border-b border-border"
      >
        {STAGES.map((s, i) => {
          const selected = active === s.id;
          return (
            <button
              key={s.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`ai-life-${s.id}`}
              aria-selected={selected}
              aria-controls={`ai-life-panel-${s.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(s.id, i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "flex shrink-0 flex-col gap-0.5 border-b-2 px-3 py-3 text-left transition-colors sm:px-4",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
                selected
                  ? "border-gold bg-surface text-ink"
                  : "border-transparent text-ink-muted hover:text-ink-secondary"
              )}
            >
              <span className="font-mono text-[9px] text-ink-faint">{s.index}</span>
              <span className="text-[12px] font-medium sm:text-[13px]">{s.label}</span>
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`ai-life-panel-${active}`}
        aria-labelledby={`ai-life-${active}`}
        className="bg-surface/15 p-5 md:p-6"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Content id={active} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

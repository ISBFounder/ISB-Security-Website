"use client";

import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent as RKEvent,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type StageId =
  | "notes"
  | "extraction"
  | "draft"
  | "review"
  | "approval"
  | "locked";

const STAGES: { id: StageId; label: string; index: string }[] = [
  { id: "notes", label: "Field Notes", index: "01" },
  { id: "extraction", label: "Extraction", index: "02" },
  { id: "draft", label: "Draft Report", index: "03" },
  { id: "review", label: "Human Review", index: "04" },
  { id: "approval", label: "Supervisor", index: "05" },
  { id: "locked", label: "Locked Record", index: "06" },
];

function FieldNotesView() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-ink-muted">
        <span>Officer · <span className="text-ink-secondary">K. Jansen</span></span>
        <span>Object · <span className="text-ink-secondary">NL-OBJ-042</span></span>
        <span>Time · <span className="text-ink-secondary">22:14</span></span>
        <span>Input · <span className="text-ink-secondary">Mobile field note</span></span>
      </div>
      <div className="border border-border-subtle bg-bg/50 p-4">
        <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
          Raw field notes
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-ink-secondary">
          &ldquo;22:14 north patrol. gate 3 open. secured gate. camera 4 partly
          blocked by vegetation. supervisor informed.&rdquo;
        </p>
      </div>
      <p className="font-mono text-[9px] text-ink-faint">
        Illustrative demonstration data
      </p>
    </div>
  );
}

function ExtractionView() {
  const fields = [
    ["Time", "22:14"],
    ["Location", "North perimeter"],
    ["Observation", "Gate 3 found unsecured"],
    ["Action taken", "Gate secured on location"],
    ["Secondary observation", "Camera 4 field of view partially obstructed"],
    ["Escalation", "Object supervisor informed"],
  ];
  return (
    <div className="space-y-4">
      <p className="text-[12px] text-ink-muted">
        Suggested extraction · needs review
      </p>
      <dl className="divide-y divide-border-subtle border border-border-subtle">
        {fields.map(([k, v]) => (
          <div key={k} className="flex gap-4 px-3 py-2.5 text-[13px]">
            <dt className="w-40 shrink-0 font-mono text-[10px] text-ink-faint">
              {k}
            </dt>
            <dd className="text-ink-secondary">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="border border-border-subtle bg-bg/40 px-3 py-2.5 text-[12px]">
        <span className="text-ink-muted">Required context · </span>
        <span className="text-ink-secondary">6 / 7 identified</span>
        <span className="mx-2 text-ink-faint">·</span>
        <span className="text-status-warning">Missing · Follow-up responsibility</span>
      </div>
    </div>
  );
}

function DraftReportView() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="border border-gold/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-gold">
          AI-generated draft
        </span>
        <span className="border border-border-subtle px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-ink-muted">
          Not final
        </span>
      </div>
      <div className="border border-border-subtle bg-bg/50 p-4">
        <p className="text-[14px] leading-relaxed text-ink-secondary">
          At 22:14 hours, during a scheduled patrol of the north perimeter of
          object NL-OBJ-042, Gate 3 was found unsecured. The gate was secured on
          location. Camera 4 was also observed to have a partially obstructed
          field of view due to vegetation. The object supervisor was informed for
          follow-up.
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {[
          ["Event time", "22:14"],
          ["Location", "NL-OBJ-042 · North perimeter · Gate 3"],
          ["Observation", "Gate found unsecured"],
          ["Action", "Gate secured on location"],
          ["Escalation", "Object supervisor informed"],
          ["Evidence", "None attached"],
        ].map(([k, v]) => (
          <div key={k} className="border border-border-subtle bg-bg/30 px-3 py-2">
            <p className="font-mono text-[9px] text-ink-faint">{k}</p>
            <p className="mt-0.5 text-[12px] text-ink-secondary">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HumanReviewView() {
  return (
    <div className="space-y-4">
      <div className="border border-border-subtle bg-bg/50 p-4">
        <p className="font-mono text-[9px] text-ink-faint">Officer review · editable draft</p>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">
          At 22:14 hours, during a scheduled patrol of the north perimeter of
          object NL-OBJ-042, Gate 3 was found unsecured. The gate was secured on
          location. Camera 4 was also observed to have a partially obstructed
          field of view due to vegetation. The object supervisor was informed for
          follow-up.{" "}
          <span className="bg-status-warning/15 text-ink">
            Follow-up assigned to on-call supervisor.
          </span>
        </p>
      </div>
      <div className="space-y-1.5">
        <p className="label">Review checklist</p>
        {[
          { t: "Follow-up owner not specified", s: "warning" as const },
          { t: "No photo attached", s: "warning" as const },
          { t: "Object instruction reference optional", s: "muted" as const },
        ].map((w) => (
          <div
            key={w.t}
            className={cn(
              "border px-3 py-2 text-[12px]",
              w.s === "warning"
                ? "border-status-warning/30 bg-status-warning/5 text-ink-secondary"
                : "border-border-subtle bg-bg/30 text-ink-muted"
            )}
          >
            {w.t}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 font-mono text-[11px]">
        <span className="border border-border-subtle px-2 py-1 text-ink-secondary">
          Reviewed by officer
        </span>
        <span className="border border-gold/30 bg-gold/5 px-2 py-1 text-gold">
          Pending supervisor review
        </span>
      </div>
    </div>
  );
}

function SupervisorApprovalView() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="border border-border-subtle bg-bg/40 p-3">
          <p className="font-mono text-[9px] text-ink-faint">Officer version · v2</p>
          <p className="mt-2 text-[12px] text-ink-secondary">
            Draft revised · follow-up owner added · ready for supervisor.
          </p>
        </div>
        <div className="border border-border-subtle bg-bg/40 p-3">
          <p className="font-mono text-[9px] text-ink-faint">Supervisor</p>
          <p className="mt-1 text-[12px] text-ink-secondary">Operations Supervisor</p>
          <p className="mt-2 text-[12px] text-ink-muted">
            Comment: &ldquo;Clarify who receives follow-up responsibility.&rdquo;
          </p>
          <p className="mt-2 font-mono text-[10px] text-status-warning">
            Status · Revision requested → then approved
          </p>
        </div>
      </div>
      <div className="border border-status-success/30 bg-status-success/5 px-3 py-2.5 text-[12px] text-ink-secondary">
        After correction · supervisor approved · timestamp 22:24
      </div>
    </div>
  );
}

function LockedRecordView() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <span className="border border-status-success/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-status-success">
          Approved
        </span>
        <span className="border border-border-subtle px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-ink-muted">
          Finalized operational record
        </span>
      </div>
      <dl className="divide-y divide-border-subtle border border-border-subtle text-[13px]">
        {[
          ["Report ID", "SR-2026-00482"],
          ["Object", "NL-OBJ-042"],
          ["Status", "Approved"],
          ["Review state", "Complete"],
          ["Audit", "Officer reviewed · Supervisor approved · Version locked"],
          ["Evidence", "1 attachment"],
        ].map(([k, v]) => (
          <div key={k} className="flex gap-4 px-3 py-2.5">
            <dt className="w-28 shrink-0 font-mono text-[10px] text-ink-faint">{k}</dt>
            <dd className="text-ink-secondary">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="text-[11px] text-ink-faint">
        Locked in workflow · not a claim of legal immutability
      </p>
    </div>
  );
}

function StageContent({ id }: { id: StageId }) {
  switch (id) {
    case "notes":
      return <FieldNotesView />;
    case "extraction":
      return <ExtractionView />;
    case "draft":
      return <DraftReportView />;
    case "review":
      return <HumanReviewView />;
    case "approval":
      return <SupervisorApprovalView />;
    case "locked":
      return <LockedRecordView />;
  }
}

export function AIReportAssistantShowcase() {
  const [active, setActive] = useState<StageId>("notes");
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
    <div className="space-y-6">
      {/* Human control rail — persistent */}
      <div className="flex flex-wrap items-center justify-center gap-2 border border-border bg-surface/30 px-4 py-3 font-mono text-[11px] text-ink-muted sm:gap-3">
        <span className="text-gold">AI assists</span>
        <span className="text-ink-faint" aria-hidden>
          ↓
        </span>
        <span className="text-ink-secondary">Officer reviews</span>
        <span className="text-ink-faint" aria-hidden>
          ↓
        </span>
        <span className="text-ink-secondary">Supervisor approves</span>
        <span className="ml-0 w-full text-center text-[10px] text-ink-faint sm:ml-2 sm:w-auto sm:text-left">
          Human responsibility remains central
        </span>
      </div>

      <div className="border border-border">
        {/* Workflow rail */}
        <div
          role="tablist"
          aria-label="AI report workflow stages"
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
                id={`ai-tab-${s.id}`}
                aria-selected={selected}
                aria-controls={`ai-panel-${s.id}`}
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

        <div className="grid gap-0 lg:grid-cols-[1fr_200px]">
          {/* Stage workspace */}
          <div
            role="tabpanel"
            id={`ai-panel-${active}`}
            aria-labelledby={`ai-tab-${active}`}
            className="bg-surface/15 p-5 md:p-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <StageContent id={active} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Revision history + scope */}
          <aside className="border-t border-border bg-bg/40 p-4 lg:border-l lg:border-t-0">
            <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
              Revision history
            </p>
            <ul className="mt-3 space-y-2 font-mono text-[11px]">
              {[
                ["v1", "22:16", "AI draft"],
                ["v2", "22:19", "Officer revision"],
                ["v3", "22:24", "Supervisor approved"],
              ].map(([v, t, s]) => (
                <li key={v} className="flex flex-col gap-0.5 border-b border-border-subtle pb-2 last:border-0">
                  <span className="text-ink-secondary">
                    {v} · {t}
                  </span>
                  <span className="text-ink-faint">{s}</span>
                </li>
              ))}
            </ul>

            <p className="mt-5 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
              Capability scope
            </p>
            <ul className="mt-2 space-y-1 text-[11px] text-ink-muted">
              <li>Structure · foundation</li>
              <li>Extraction · foundation</li>
              <li>Completeness checks · foundation</li>
              <li>Context suggestions · development</li>
              <li>Pattern analysis · future</li>
            </ul>
          </aside>
        </div>
      </div>

      {/* Limitations */}
      <div className="border border-border-subtle bg-surface/20 px-4 py-3">
        <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
          Limitations
        </p>
        <ul className="mt-2 space-y-1 text-[12px] text-ink-muted">
          <li>AI output may contain errors.</li>
          <li>AI-generated drafts require human review.</li>
          <li>Operational decisions remain with authorized personnel.</li>
          <li>AI does not replace escalation procedures.</li>
        </ul>
        <p className="mt-2 text-[11px] text-ink-faint">
          AI workflows are being designed around controlled platform access and
          operational data boundaries.
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

const SOURCES = [
  { id: "paper", label: "Paper reports", tag: "MANUAL" },
  { id: "excel", label: "Spreadsheet planning", tag: "LOCAL" },
  { id: "messaging", label: "Messaging", tag: "EXTERNAL" },
  { id: "email", label: "Email", tag: "EXTERNAL" },
  { id: "portals", label: "Customer portals", tag: "EXTERNAL" },
  { id: "folders", label: "Shared folders", tag: "LOCAL" },
  { id: "handovers", label: "Manual handovers", tag: "MANUAL" },
  { id: "phone", label: "Phone calls", tag: "MANUAL" },
  { id: "incident", label: "Separate incident systems", tag: "SOURCE" },
  { id: "reentry", label: "Repeated data entry", tag: "MANUAL" },
] as const;

const FRICTIONS = [
  { id: "duplicate", label: "Duplicate entry" },
  { id: "context", label: "Missing context" },
  { id: "delay", label: "Delayed escalation" },
  { id: "version", label: "Version conflicts" },
  { id: "coordination", label: "Manual coordination" },
  { id: "traceability", label: "Weak traceability" },
  { id: "admin", label: "Repeated administration" },
  { id: "audit", label: "Fragmented audit trail" },
] as const;

const DOMAINS = [
  { id: "reporting", label: "Reporting" },
  { id: "objects", label: "Objects" },
  { id: "people", label: "People" },
  { id: "patrols", label: "Patrols" },
  { id: "compliance", label: "Compliance" },
  { id: "intelligence", label: "Intelligence" },
] as const;

const PLATFORM_CAPS = [
  "Role-based access",
  "Audit trail",
  "Notifications",
  "Realtime foundations",
  "Offline foundations",
  "AI assistance",
] as const;

const OUTPUTS = [
  "Management oversight",
  "Supervisor review",
  "Client visibility",
  "Operational records",
  "Compliance evidence",
  "Incident follow-up",
] as const;

/** Source → friction points → platform domains */
const MAPPINGS: Record<string, { friction: string[]; domains: string[] }> = {
  paper: { friction: ["duplicate", "admin", "traceability"], domains: ["reporting"] },
  excel: { friction: ["version", "coordination", "duplicate"], domains: ["people", "patrols"] },
  messaging: { friction: ["traceability", "context", "delay"], domains: ["reporting", "compliance"] },
  email: { friction: ["delay", "version", "audit"], domains: ["reporting", "compliance"] },
  portals: { friction: ["context", "coordination"], domains: ["objects"] },
  folders: { friction: ["version", "traceability", "audit"], domains: ["reporting", "compliance"] },
  handovers: { friction: ["context", "delay", "admin"], domains: ["people", "patrols"] },
  phone: { friction: ["traceability", "context", "audit"], domains: ["reporting"] },
  incident: { friction: ["duplicate", "version", "coordination"], domains: ["reporting", "compliance"] },
  reentry: { friction: ["duplicate", "admin", "delay"], domains: ["reporting", "people"] },
};

function SourceNode({
  id,
  label,
  tag,
  active,
  dimmed,
  onActivate,
  onDeactivate,
}: {
  id: string;
  label: string;
  tag: string;
  active: boolean;
  dimmed: boolean;
  onActivate: (id: string) => void;
  onDeactivate: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "w-full border px-2.5 py-2 text-left transition-colors duration-150",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
        active
          ? "border-gold/50 bg-surface-elevated text-ink"
          : dimmed
            ? "border-border-subtle bg-bg/30 text-ink-faint"
            : "border-border bg-surface/40 text-ink-secondary hover:border-border-strong hover:text-ink"
      )}
      onMouseEnter={() => onActivate(id)}
      onMouseLeave={onDeactivate}
      onFocus={() => onActivate(id)}
      onBlur={onDeactivate}
      aria-pressed={active}
      aria-label={`${label}, ${tag}`}
    >
      <span className="flex items-center justify-between gap-2">
        <span className="text-[12px] font-medium leading-tight">{label}</span>
        <span className="shrink-0 font-mono text-[9px] tracking-wide text-ink-faint">
          {tag}
        </span>
      </span>
    </button>
  );
}

function FlowConnector({ direction = "h", active }: { direction?: "h" | "v"; active?: boolean }) {
  if (direction === "v") {
    return (
      <div className="flex justify-center py-1" aria-hidden>
        <span className="font-mono text-[11px] text-ink-faint">↓</span>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "hidden flex-col items-center justify-center gap-1 font-mono text-[10px] transition-colors duration-150 lg:flex",
        active ? "text-gold" : "text-ink-faint"
      )}
      aria-hidden
    >
      <span className="h-8 w-px bg-current opacity-40" />
      <span>→</span>
      <span className="h-8 w-px bg-current opacity-40" />
    </div>
  );
}

export function FragmentationArchitecture() {
  const [activeSource, setActiveSource] = useState<string | null>(null);

  const mapping = activeSource ? MAPPINGS[activeSource] : null;
  const activeFriction = new Set(mapping?.friction ?? []);
  const activeDomains = new Set(mapping?.domains ?? []);

  const activate = useCallback((id: string) => setActiveSource(id), []);
  const deactivate = useCallback(() => setActiveSource(null), []);

  return (
    <div
      role="region"
      aria-label="Architecture diagram: fragmented operational sources, friction layer, and ISB unified platform"
    >
      {/* Non-visual summary */}
      <p className="sr-only">
        Operational information in security organizations is commonly distributed
        across paper reports, spreadsheets, messaging, email, customer portals,
        shared folders and manual handovers. These handoffs create operational
        friction including duplicate entry, missing context, delayed escalation,
        version conflicts and weak traceability. ISB Security Platform provides a
        unified operational layer for reporting, objects, people, patrols,
        compliance and intelligence, producing controlled outputs such as
        management oversight, supervisor review, client visibility and compliance
        evidence.
      </p>

      {/* Desktop: 3-zone LTR · Mobile: stacked TTB */}
      <div className="grid items-stretch gap-0 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.1fr)_auto_minmax(0,1.2fr)]">
        {/* ── LEFT: Fragmented sources ── */}
        <div className="border border-border bg-surface/15 p-4 md:p-5">
          <div className="mb-1 flex items-baseline justify-between gap-2">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-secondary">
              Today
            </p>
            <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
              Commonly distributed
            </p>
          </div>
          <p className="mb-4 text-[13px] font-medium text-ink">
            Fragmented operational inputs
          </p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
            {SOURCES.map((s) => (
              <SourceNode
                key={s.id}
                id={s.id}
                label={s.label}
                tag={s.tag}
                active={activeSource === s.id}
                dimmed={activeSource !== null && activeSource !== s.id}
                onActivate={activate}
                onDeactivate={deactivate}
              />
            ))}
          </div>
        </div>

        <FlowConnector direction="h" active={!!activeSource} />
        <div className="lg:hidden">
          <FlowConnector direction="v" />
        </div>

        {/* ── CENTER: Friction layer ── */}
        <div className="border border-border border-t-0 bg-surface/30 p-4 md:p-5 lg:border-t">
          <div className="mb-1 flex items-baseline justify-between gap-2">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-secondary">
              Friction layer
            </p>
            <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
              Handoff · Delay
            </p>
          </div>
          <p className="mb-3 text-[13px] font-medium text-ink">
            Operational friction
          </p>

          {/* Architectural bottleneck indicator */}
          <div className="mb-4 border border-border-subtle bg-bg/50 px-3 py-2.5 font-mono text-[10px] leading-relaxed text-ink-muted">
            <p>INPUT STREAMS</p>
            <p className="text-ink-faint">↓ · multiple owners · multiple versions</p>
            <p
              className={cn(
                "transition-colors duration-150",
                activeSource ? "text-status-warning" : "text-ink-secondary"
              )}
            >
              FRICTION LAYER
            </p>
            <p className="text-ink-faint">↓ · information loss · delayed escalation</p>
            <p>OUTPUT DELAY</p>
          </div>

          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
            {FRICTIONS.map((f) => {
              const on = activeFriction.has(f.id);
              const dimmed = activeSource !== null && !on;
              return (
                <div
                  key={f.id}
                  className={cn(
                    "border px-2.5 py-2 text-[12px] transition-colors duration-150",
                    on
                      ? "border-status-warning/40 bg-status-warning/10 text-ink"
                      : dimmed
                        ? "border-border-subtle bg-bg/20 text-ink-faint"
                        : "border-border-subtle bg-bg/40 text-ink-muted"
                  )}
                >
                  {f.label}
                </div>
              );
            })}
          </div>
        </div>

        <FlowConnector direction="h" active={!!activeSource} />
        <div className="lg:hidden">
          <FlowConnector direction="v" />
        </div>

        {/* ── RIGHT: ISB platform + outputs ── */}
        <div className="flex flex-col gap-0 border border-border border-t-0 lg:border-t">
          <div
            className={cn(
              "flex-1 border-b border-border p-4 transition-colors duration-150 md:p-5",
              activeSource ? "border-gold/30 bg-gold/[0.04]" : "bg-surface/40"
            )}
          >
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-gold">
                ISB Security Platform
              </p>
              <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                Unified layer
              </p>
            </div>
            <p className="mb-4 text-[13px] font-medium text-ink">
              Unified operational layer
            </p>

            {/* Domains — single platform block */}
            <div className="mb-4 grid grid-cols-2 gap-1 border border-border-subtle bg-bg/40 p-1.5 sm:grid-cols-3">
              {DOMAINS.map((d) => {
                const on = activeDomains.has(d.id);
                const dimmed = activeSource !== null && !on;
                return (
                  <div
                    key={d.id}
                    className={cn(
                      "px-2 py-2 text-center text-[11px] font-medium transition-colors duration-150",
                      on
                        ? "bg-gold/15 text-ink"
                        : dimmed
                          ? "text-ink-faint"
                          : "text-ink-secondary"
                    )}
                  >
                    {d.label}
                  </div>
                );
              })}
            </div>

            <p className="mb-2 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
              Shared capabilities
            </p>
            <div className="flex flex-wrap gap-1">
              {PLATFORM_CAPS.map((c) => (
                <span
                  key={c}
                  className="border border-border-subtle bg-bg/50 px-2 py-1 font-mono text-[10px] text-ink-muted"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Controlled outputs */}
          <div className="bg-surface/15 p-4 md:p-5">
            <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-secondary">
              Controlled outputs
            </p>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
              {OUTPUTS.map((o) => (
                <div
                  key={o}
                  className="border border-border-subtle bg-bg/40 px-2.5 py-2 text-[12px] text-ink-muted"
                >
                  {o}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interaction hint */}
      <p className="mt-4 text-center font-mono text-[10px] text-ink-faint">
        Focus or hover a source to trace friction and platform domains
      </p>
    </div>
  );
}

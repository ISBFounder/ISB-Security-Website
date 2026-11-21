"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const SOURCE_IDS = [
  "paper",
  "excel",
  "messaging",
  "email",
  "portals",
  "folders",
  "handovers",
  "phone",
  "incident",
  "reentry",
] as const;

const FRICTION_IDS = [
  "duplicate",
  "context",
  "delay",
  "version",
  "coordination",
  "traceability",
  "admin",
  "audit",
] as const;

const DOMAIN_IDS = [
  "reporting",
  "objects",
  "people",
  "patrols",
  "compliance",
  "intelligence",
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
  const t = useTranslations("home");
  const [activeSource, setActiveSource] = useState<string | null>(null);
  const caps = t.raw("frag.caps") as string[];
  const outputs = t.raw("frag.outputs") as string[];

  const mapping = activeSource ? MAPPINGS[activeSource] : null;
  const activeFriction = new Set(mapping?.friction ?? []);
  const activeDomains = new Set(mapping?.domains ?? []);

  const activate = useCallback((id: string) => setActiveSource(id), []);
  const deactivate = useCallback(() => setActiveSource(null), []);

  return (
    <div role="region" aria-label={t("frag.aria")}>
      <p className="sr-only">{t("frag.summary")}</p>

      <div className="grid items-stretch gap-0 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.1fr)_auto_minmax(0,1.2fr)]">
        <div className="border border-border bg-surface/15 p-4 md:p-5">
          <div className="mb-1 flex items-baseline justify-between gap-2">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-secondary">
              {t("frag.today")}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
              {t("frag.distributed")}
            </p>
          </div>
          <p className="mb-4 text-[13px] font-medium text-ink">{t("frag.inputs")}</p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
            {SOURCE_IDS.map((id) => (
              <SourceNode
                key={id}
                id={id}
                label={t(`frag.sources.${id}.label`)}
                tag={t(`frag.sources.${id}.tag`)}
                active={activeSource === id}
                dimmed={activeSource !== null && activeSource !== id}
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

        <div className="border border-border border-t-0 bg-surface/30 p-4 md:p-5 lg:border-t">
          <div className="mb-1 flex items-baseline justify-between gap-2">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-secondary">
              {t("frag.frictionKicker")}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
              {t("frag.handoff")}
            </p>
          </div>
          <p className="mb-3 text-[13px] font-medium text-ink">{t("frag.frictionTitle")}</p>

          <div className="mb-4 border border-border-subtle bg-bg/50 px-3 py-2.5 font-mono text-[10px] leading-relaxed text-ink-muted">
            <p>{t("frag.inputStreams")}</p>
            <p className="text-ink-faint">{t("frag.owners")}</p>
            <p
              className={cn(
                "transition-colors duration-150",
                activeSource ? "text-status-warning" : "text-ink-secondary"
              )}
            >
              {t("frag.frictionLayer")}
            </p>
            <p className="text-ink-faint">{t("frag.loss")}</p>
            <p>{t("frag.outputDelay")}</p>
          </div>

          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
            {FRICTION_IDS.map((id) => {
              const on = activeFriction.has(id);
              const dimmed = activeSource !== null && !on;
              return (
                <div
                  key={id}
                  className={cn(
                    "border px-2.5 py-2 text-[12px] transition-colors duration-150",
                    on
                      ? "border-status-warning/40 bg-status-warning/10 text-ink"
                      : dimmed
                        ? "border-border-subtle bg-bg/20 text-ink-faint"
                        : "border-border-subtle bg-bg/40 text-ink-muted"
                  )}
                >
                  {t(`frag.frictions.${id}`)}
                </div>
              );
            })}
          </div>
        </div>

        <FlowConnector direction="h" active={!!activeSource} />
        <div className="lg:hidden">
          <FlowConnector direction="v" />
        </div>

        <div className="flex flex-col gap-0 border border-border border-t-0 lg:border-t">
          <div
            className={cn(
              "flex-1 border-b border-border p-4 transition-colors duration-150 md:p-5",
              activeSource ? "border-gold/30 bg-gold/[0.04]" : "bg-surface/40"
            )}
          >
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-gold">
                {t("frag.platform")}
              </p>
              <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                {t("frag.unifiedKicker")}
              </p>
            </div>
            <p className="mb-4 text-[13px] font-medium text-ink">{t("frag.unifiedTitle")}</p>

            <div className="mb-4 grid grid-cols-2 gap-1 border border-border-subtle bg-bg/40 p-1.5 sm:grid-cols-3">
              {DOMAIN_IDS.map((id) => {
                const on = activeDomains.has(id);
                const dimmed = activeSource !== null && !on;
                return (
                  <div
                    key={id}
                    className={cn(
                      "px-2 py-2 text-center text-[11px] font-medium transition-colors duration-150",
                      on
                        ? "bg-gold/15 text-ink"
                        : dimmed
                          ? "text-ink-faint"
                          : "text-ink-secondary"
                    )}
                  >
                    {t(`frag.domains.${id}`)}
                  </div>
                );
              })}
            </div>

            <p className="mb-2 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
              {t("frag.shared")}
            </p>
            <div className="flex flex-wrap gap-1">
              {caps.map((c) => (
                <span
                  key={c}
                  className="border border-border-subtle bg-bg/50 px-2 py-1 font-mono text-[10px] text-ink-muted"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-surface/15 p-4 md:p-5">
            <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-secondary">
              {t("frag.outputsTitle")}
            </p>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
              {outputs.map((o) => (
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

      <p className="mt-4 text-center font-mono text-[10px] text-ink-faint">{t("frag.hint")}</p>
    </div>
  );
}

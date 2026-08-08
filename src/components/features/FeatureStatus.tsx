import { cn } from "@/lib/utils";

export type FeatureStage =
  | "foundation"
  | "development"
  | "planned"
  | "future";

const LABELS: Record<FeatureStage, string> = {
  foundation: "Implemented foundation",
  development: "Active development",
  planned: "Planned",
  future: "Future direction",
};

const STYLES: Record<FeatureStage, string> = {
  foundation: "border-border-subtle text-ink-secondary",
  development: "border-gold/40 text-gold",
  planned: "border-border text-ink-muted",
  future: "border-dashed border-border text-ink-faint",
};

export function FeatureStatus({ stage }: { stage: FeatureStage }) {
  return (
    <span
      className={cn(
        "inline-block shrink-0 border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide",
        STYLES[stage]
      )}
    >
      {LABELS[stage]}
    </span>
  );
}

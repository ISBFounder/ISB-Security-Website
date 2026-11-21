"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export type FeatureStage =
  | "foundation"
  | "development"
  | "discovery"
  | "planned"
  | "future";

const STYLES: Record<FeatureStage, string> = {
  foundation: "border-border-subtle text-ink-secondary",
  development: "border-gold/40 text-gold",
  discovery: "border-border text-ink-muted",
  planned: "border-border text-ink-muted",
  future: "border-dashed border-border text-ink-faint",
};

export function FeatureStatus({ stage }: { stage: FeatureStage }) {
  const t = useTranslations("common");
  return (
    <span
      className={cn(
        "inline-block shrink-0 border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide",
        STYLES[stage]
      )}
    >
      {t(`status.${stage}`)}
    </span>
  );
}

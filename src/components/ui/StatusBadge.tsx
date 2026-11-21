"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { FeatureStatus } from "@/types";

const styles: Record<FeatureStatus, string> = {
  foundation: "bg-status-success/10 text-status-success border-status-success/25",
  development: "bg-gold/10 text-gold border-gold/25",
  discovery: "bg-surface text-ink-secondary border-border",
  planned: "bg-surface text-ink-secondary border-border",
  future: "bg-bg text-ink-muted border-border-subtle",
};

export function StatusBadge({ status }: { status: FeatureStatus }) {
  const t = useTranslations("common");
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center border px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide",
        styles[status]
      )}
    >
      {t(`statusShort.${status}`)}
    </span>
  );
}

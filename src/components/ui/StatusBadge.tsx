import { cn } from "@/lib/utils";
import type { FeatureStatus } from "@/types";

const config: Record<FeatureStatus, { label: string; className: string }> = {
  foundation: {
    label: "Foundation",
    className: "bg-status-success/10 text-status-success border-status-success/25",
  },
  development: {
    label: "In development",
    className: "bg-gold/10 text-gold border-gold/25",
  },
  planned: {
    label: "Planned",
    className: "bg-surface text-ink-secondary border-border",
  },
  future: {
    label: "Future direction",
    className: "bg-bg text-ink-muted border-border-subtle",
  },
};

export function StatusBadge({ status }: { status: FeatureStatus }) {
  const c = config[status];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center border px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide",
        c.className
      )}
    >
      {c.label}
    </span>
  );
}

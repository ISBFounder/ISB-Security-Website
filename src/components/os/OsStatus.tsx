import { cn } from "@/lib/utils";

export type OsMaturity =
  | "foundation"
  | "development"
  | "discovery"
  | "planned"
  | "future";

const LABEL: Record<OsMaturity, string> = {
  foundation: "Foundation established",
  development: "Active development",
  discovery: "Discovery / architecture",
  planned: "Planned",
  future: "Future / research",
};

export function OsStatus({
  status,
  className,
}: {
  status: OsMaturity;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[9px] uppercase tracking-wide text-ink-faint",
        className
      )}
    >
      {LABEL[status]}
    </span>
  );
}

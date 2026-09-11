import { cn } from "@/lib/utils";

export type OsMaturity =
  | "foundation"
  | "development"
  | "planned"
  | "future";

const LABEL: Record<OsMaturity, string> = {
  foundation: "Foundation",
  development: "Active development",
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

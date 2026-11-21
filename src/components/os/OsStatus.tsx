"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export type OsMaturity =
  | "foundation"
  | "development"
  | "discovery"
  | "planned"
  | "future";

export function OsStatus({
  status,
  className,
}: {
  status: OsMaturity;
  className?: string;
}) {
  const t = useTranslations("common");
  return (
    <span
      className={cn(
        "font-mono text-[9px] uppercase tracking-wide text-ink-faint",
        className
      )}
    >
      {t(`status.${status}`)}
    </span>
  );
}

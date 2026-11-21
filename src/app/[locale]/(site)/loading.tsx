"use client";

import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("chrome");

  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6"
      role="status"
      aria-live="polite"
      aria-label={t("loading")}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
        ISB Security Solutions
      </p>
      <div className="h-px w-32 overflow-hidden bg-border" aria-hidden>
        <div className="h-full w-1/2 animate-pulse bg-gold/60" />
      </div>
      <p className="text-[13px] text-ink-muted">{t("loading")}</p>
    </div>
  );
}

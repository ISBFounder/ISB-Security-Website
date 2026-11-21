"use client";

import { useTranslations } from "next-intl";

export function ArchitectureDiagram() {
  const t = useTranslations("home");
  const engines = t.raw("diagram.engines") as string[];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="border border-border bg-surface/40 p-6">
        <p className="label mb-4">{t("diagram.operational")}</p>
        <div className="font-mono text-[13px] leading-8 text-ink-secondary">
          <p className="text-gold">{t("diagram.org")}</p>
          <p className="pl-3">{t("diagram.customers")}</p>
          <p className="pl-6">{t("diagram.objects")}</p>
          <p className="pl-9">{t("diagram.buildings")}</p>
          <p className="pl-9">{t("diagram.posts")}</p>
        </div>
      </div>
      <div className="border border-border bg-surface/40 p-6">
        <p className="label mb-4">{t("diagram.identity")}</p>
        <div className="font-mono text-[13px] leading-8 text-ink-secondary">
          <p className="text-gold">{t("diagram.users")}</p>
          <p className="pl-3">{t("diagram.roles")}</p>
          <p className="pl-6">{t("diagram.permissions")}</p>
          <p className="pl-3">{t("diagram.teams")}</p>
          <p className="pl-3">{t("diagram.qualifications")}</p>
        </div>
      </div>
      <div className="border border-border bg-surface/40 p-6 lg:col-span-2">
        <p className="label mb-4">{t("diagram.enginesLabel")}</p>
        <div className="flex flex-wrap gap-2">
          {engines.map((e) => (
            <span
              key={e}
              className="border border-border bg-bg px-3 py-1.5 font-mono text-[11px] text-ink-secondary"
            >
              {e}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-muted">{t("diagram.note")}</p>
      </div>
    </div>
  );
}

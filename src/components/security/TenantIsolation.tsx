"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type Org = "A" | "B";

export function TenantIsolation() {
  const t = useTranslations("security");
  const [org, setOrg] = useState<Org>("A");
  const other: Org = org === "A" ? "B" : "A";
  const activeName = t("tenant.organization", { id: org });
  const otherName = t("tenant.organization", { id: other });
  const customer = org === "A" ? t("tenant.customerA") : t("tenant.customerB");
  const object = org === "A" ? t("tenant.objectA") : t("tenant.objectB");

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label={t("tenant.aria")}>
        {(["A", "B"] as const).map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={org === id}
            onClick={() => setOrg(id)}
            className={cn(
              "min-h-11 border px-3 py-1.5 text-[12px]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
              org === id
                ? "border-gold/40 bg-gold/10 text-ink"
                : "border-border-subtle text-ink-muted hover:text-ink-secondary"
            )}
          >
            {t("tenant.organization", { id })}
          </button>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="border border-border bg-surface/20 p-4">
          <p className="font-mono text-[10px] uppercase tracking-wide text-gold">
            {t("tenant.selected")}
          </p>
          <p className="mt-2 text-[14px] font-medium text-ink">{activeName}</p>
          <div className="mt-3 border-l border-border-subtle pl-3">
            <p className="text-[13px] text-ink-secondary">{customer}</p>
            <p className="mt-1 font-mono text-[11px] text-ink-muted">{object}</p>
          </div>
        </div>
        <div className="border border-border-subtle bg-bg/30 p-4 opacity-45">
          <p className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
            {t("tenant.other")}
          </p>
          <p className="mt-2 text-[14px] text-ink-muted">{otherName}</p>
          <p className="mt-3 text-[12px] text-ink-faint">
            {t("tenant.hidden", { org: activeName })}
          </p>
        </div>
      </div>
      <p className="mt-3 font-mono text-[11px] text-ink-faint">
        {t("tenant.boundary")}
      </p>
    </div>
  );
}

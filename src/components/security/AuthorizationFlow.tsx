"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type RouteId = "allowed" | "rejected";

type Step = { id: string; label: string; note: string };

export function AuthorizationFlow() {
  const t = useTranslations("security");
  const [route, setRoute] = useState<RouteId>("allowed");
  const steps = (
    route === "allowed" ? t.raw("flow.allowedSteps") : t.raw("flow.rejectedSteps")
  ) as Step[];

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {(
          [
            ["allowed", t("flow.allowed")],
            ["rejected", t("flow.rejected")],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={route === id}
            onClick={() => setRoute(id)}
            className={cn(
              "min-h-11 border px-3 py-1.5 text-[12px]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
              route === id
                ? "border-gold/40 bg-gold/10 text-ink"
                : "border-border-subtle text-ink-muted hover:text-ink-secondary"
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <ol className="border border-border">
        {steps.map((s, i) => {
          const blocked = s.id === "blocked";
          return (
          <li
            key={s.id}
            className={cn(
              "flex items-start justify-between gap-3 px-4 py-3",
              i < steps.length - 1 && "border-b border-border-subtle",
              blocked && "bg-bg/40 opacity-55"
            )}
          >
            <div>
              <p className={cn("text-[13px] font-medium", blocked ? "text-ink-muted" : "text-ink")}>
                {s.label}
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-ink-muted">{s.note}</p>
            </div>
            {i < steps.length - 1 && !blocked && !(route === "rejected" && i === steps.length - 2) && (
              <span className="font-mono text-[10px] text-ink-faint" aria-hidden>
                ↓
              </span>
            )}
            {blocked && (
              <span className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                {t("flow.closed")}
              </span>
            )}
          </li>
          );
        })}
      </ol>
      <p className="mt-3 text-[12px] text-ink-muted">
        {route === "allowed" ? t("flow.allowedNote") : t("flow.rejectedNote")}
      </p>
    </div>
  );
}

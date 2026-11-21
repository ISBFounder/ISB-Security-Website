"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type LayerId = "clients" | "platform" | "data";

const LAYER_IDS: LayerId[] = ["clients", "platform", "data"];

export function TechnologyArchitecture() {
  const t = useTranslations("technology");
  const [active, setActive] = useState<LayerId>("platform");
  const layers = LAYER_IDS.map((id) => ({
    id,
    label: t(`layers.${id}.label`),
    detail: t(`layers.${id}.detail`),
    items: t.raw(`layers.${id}.items`) as string[],
  }));
  const current = layers.find((l) => l.id === active)!;

  return (
    <div className="border border-border">
      <div
        role="tablist"
        aria-label={t("layers.aria")}
        className="flex border-b border-border"
      >
        {layers.map((l) => (
          <button
            key={l.id}
            type="button"
            role="tab"
            aria-selected={active === l.id}
            onClick={() => setActive(l.id)}
            className={cn(
              "flex-1 border-b-2 px-3 py-3 text-[12px] font-medium transition-colors sm:text-[13px]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
              active === l.id
                ? "border-gold text-ink"
                : "border-transparent text-ink-muted hover:text-ink-secondary"
            )}
          >
            {l.label}
          </button>
        ))}
      </div>
      <div className="bg-surface/15 p-5 md:p-6" role="tabpanel">
        <p className="text-[13px] text-ink-secondary">{current.detail}</p>
        <div className="mt-4 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
          {current.items.map((item) => (
            <div
              key={item}
              className="border border-border-subtle bg-bg/40 px-3 py-2 text-[12px] text-ink-secondary"
            >
              {item}
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-0 font-mono text-[11px] text-ink-faint" aria-hidden>
          {layers.map((l, i) => (
            <div key={l.id}>
              <div
                className={cn(
                  "border px-3 py-2",
                  active === l.id
                    ? "border-gold/40 bg-gold/5 text-ink-secondary"
                    : "border-border-subtle text-ink-faint"
                )}
              >
                {l.label}
              </div>
              {i < layers.length - 1 && (
                <div className="flex justify-center py-0.5">↓</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

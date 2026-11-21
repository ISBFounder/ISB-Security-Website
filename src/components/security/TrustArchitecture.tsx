"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type Layer = {
  id: string;
  label: string;
  purpose: string;
  control: string;
  maturity: string;
};

export function TrustArchitecture() {
  const t = useTranslations("security");
  const layers = t.raw("trust.layers") as Layer[];
  const [active, setActive] = useState<string>("tenant");
  const current = layers.find((l) => l.id === active) ?? layers[0];

  const activate = useCallback((id: string) => setActive(id), []);

  return (
    <div>
      <p className="sr-only">{t("trust.sr")}</p>
      <div className="border border-border bg-surface/20">
        {layers.map((layer, i) => {
          const selected = active === layer.id;
          return (
            <div key={layer.id}>
              <button
                type="button"
                className={cn(
                  "flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
                  selected ? "bg-gold/10 text-ink" : "text-ink-secondary hover:bg-surface/50 hover:text-ink"
                )}
                onClick={() => activate(layer.id)}
                onFocus={() => activate(layer.id)}
                aria-expanded={selected}
                aria-controls="trust-detail"
              >
                <span className="text-[13px] font-medium">{layer.label}</span>
                <span className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                  {layer.maturity}
                </span>
              </button>
              {i < layers.length - 1 && (
                <div className="flex justify-center border-t border-border-subtle py-0.5 font-mono text-[10px] text-ink-faint" aria-hidden>
                  ↓
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div
        id="trust-detail"
        className="mt-3 min-h-[5rem] border border-border-subtle bg-bg/40 px-4 py-3"
        aria-live="polite"
      >
        <p className="text-[13px] text-ink-secondary">{current.purpose}</p>
        <p className="mt-2 font-mono text-[11px] text-ink-muted">{current.control}</p>
        <p className="mt-1 font-mono text-[10px] text-ink-faint">{current.maturity}</p>
      </div>
    </div>
  );
}

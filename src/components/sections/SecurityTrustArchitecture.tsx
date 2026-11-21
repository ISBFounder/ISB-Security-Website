"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { osPanelTransition } from "@/lib/motion";
import { SITE } from "@/lib/constants";

type LayerId =
  | "identity"
  | "roles"
  | "tenant"
  | "data"
  | "actions"
  | "audit"
  | "storage";

const LAYER_IDS: LayerId[] = [
  "identity",
  "roles",
  "tenant",
  "data",
  "actions",
  "audit",
  "storage",
];

const MATURITY_IDS = ["design", "development", "validation", "future"] as const;
const STEP_IDS = ["architecture", "hardening", "validation", "assessment", "maturity"] as const;
const TENANT_IDS = ["A", "B"] as const;

export function SecurityTrustArchitecture() {
  const t = useTranslations("home");
  const [active, setActive] = useState<LayerId>("tenant");
  const [tenant, setTenant] = useState<(typeof TENANT_IDS)[number]>("A");
  const reduce = useReducedMotion();
  const principles = t.raw("trust.principles") as string[];

  const layers = LAYER_IDS.map((id) => ({
    id,
    label: t(`trust.layers.${id}.label`),
    purpose: t(`trust.layers.${id}.purpose`),
    controls: t(`trust.layers.${id}.controls`),
    maturity: t(`trust.layers.${id}.maturity`),
  }));
  const maturity = MATURITY_IDS.map((id) => ({
    id,
    stage: t(`trust.maturity.${id}.stage`),
    items: t(`trust.maturity.${id}.items`),
  }));

  const activate = useCallback((id: LayerId) => setActive(id), []);
  const current = layers.find((l) => l.id === active)!;

  return (
    <div>
      <p className="sr-only">{t("trust.summary")}</p>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <div>
            <p className="body max-w-prose">{t("trust.intro")}</p>
          </div>

          <div>
            <p className="label mb-3">{t("trust.maturityLabel")}</p>
            <div className="space-y-0 border border-border">
              {maturity.map((m, i) => (
                <div
                  key={m.id}
                  className={cn(
                    "px-4 py-3",
                    i < maturity.length - 1 && "border-b border-border-subtle"
                  )}
                >
                  <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                    {m.stage}
                  </p>
                  <p className="mt-1.5 text-[12px] text-ink-secondary">{m.items}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="label mb-3">{t("trust.architecture")}</p>
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
                      selected
                        ? "bg-gold/10 text-ink"
                        : "text-ink-secondary hover:bg-surface/50 hover:text-ink"
                    )}
                    onClick={() => activate(layer.id)}
                    onMouseEnter={() => activate(layer.id)}
                    onFocus={() => activate(layer.id)}
                    aria-pressed={selected}
                    aria-controls="trust-layer-detail"
                  >
                    <span className="text-[13px] font-medium">{layer.label}</span>
                    <span className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                      {layer.maturity.split(" · ")[0]}
                    </span>
                  </button>
                  {i < layers.length - 1 && (
                    <div
                      className="flex justify-center border-t border-border-subtle py-0.5 font-mono text-[10px] text-ink-faint"
                      aria-hidden
                    >
                      ↓
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div
            id="trust-layer-detail"
            className="mt-3 min-h-[5.5rem] border border-border-subtle bg-bg/40 px-4 py-3"
            aria-live="polite"
          >
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={osPanelTransition}
            >
              <p className="text-[13px] text-ink-secondary">{current.purpose}</p>
              <p className="mt-2 font-mono text-[11px] text-ink-muted">
                {current.controls}
              </p>
              <p className="mt-1 font-mono text-[10px] text-ink-faint">
                {current.maturity}
              </p>
            </motion.div>
          </div>

          <div className="mt-4 border border-border-subtle bg-bg/30 p-4">
            <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
              {t("trust.tenantKicker")}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {TENANT_IDS.map((id) => {
                const on = tenant === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTenant(id)}
                    onMouseEnter={() => setTenant(id)}
                    onFocus={() => setTenant(id)}
                    aria-pressed={on}
                    className={cn(
                      "border px-3 py-3 text-left font-mono text-[11px] transition-colors",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                      on
                        ? "border-border bg-surface text-ink-secondary"
                        : "border-border-subtle bg-bg/20 text-ink-faint"
                    )}
                  >
                    <p className={on ? "text-ink" : "text-ink-muted"}>{t(`trust.tenants.${id}.org`)}</p>
                    <p className="mt-1">{on ? t(`trust.tenants.${id}.path`) : t("trust.inactive")}</p>
                    {!on && (
                      <p className="mt-2 text-[10px] text-ink-faint">{t("trust.noPath")}</p>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-[11px] text-ink-faint">{t("trust.noPath")}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 border border-border bg-surface/20 px-4 py-4">
        <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
          {t("trust.principlesLabel")}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {principles.map((p) => (
            <span
              key={p}
              className="border border-border-subtle bg-bg/50 px-2.5 py-1.5 text-[12px] text-ink-secondary"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 border border-border-subtle bg-bg/30 px-4 py-4">
        <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
          {t("trust.complianceLabel")}
        </p>
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-ink-secondary">
          {STEP_IDS.map((id, i) => (
            <span key={id} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-ink-faint" aria-hidden>
                  →
                </span>
              )}
              <span className="border border-border-subtle bg-surface/40 px-2 py-1">
                {t(`trust.steps.${id}`)}
              </span>
            </span>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-ink-faint">{t("trust.directionOnly")}</p>
      </div>

      <div className="mt-4 border border-border-subtle px-4 py-3 text-[13px] text-ink-muted">
        <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
          {t("trust.disclosureLabel")}
        </p>
        <p className="mt-1.5">{t("trust.disclosure")}</p>
        <p className="mt-1">
          <a href={`mailto:${SITE.email}`} className="text-gold hover:text-gold-light">
            {SITE.email}
          </a>
        </p>
      </div>
    </div>
  );
}

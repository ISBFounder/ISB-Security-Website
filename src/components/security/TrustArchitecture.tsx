"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

const LAYERS = [
  {
    id: "identity",
    label: "Identity",
    purpose: "Authenticated user and organization context form the first access boundary.",
    control: "User identity · organization context · assignment context",
    maturity: "Design foundation",
  },
  {
    id: "role",
    label: "Role & Permission",
    purpose: "Designed around least-privilege access — what a user may view, create, approve or manage.",
    control: "Role scopes · officer / supervisor / customer / administrator",
    maturity: "Design foundation",
  },
  {
    id: "tenant",
    label: "Tenant Context",
    purpose: "Tenant-aware data separation between organizations and their customers.",
    control: "Organization · customer · authorized context only",
    maturity: "Design foundation",
  },
  {
    id: "object",
    label: "Object / Customer Context",
    purpose: "Operational data scoped to the objects and customers a role may access.",
    control: "Object hierarchy · customer scope · assignment linkage",
    maturity: "Design foundation",
  },
  {
    id: "data",
    label: "Data Access",
    purpose: "Architecture supports row-level security controls and server-side validation.",
    control: "Role + tenant + object context · API boundaries · coverage expanding",
    maturity: "Design foundation",
  },
  {
    id: "action",
    label: "Operational Action",
    purpose: "Sensitive actions occur only after identity, permission and context checks.",
    control: "Create/approve report · update instruction · assign · escalate",
    maturity: "Design foundation",
  },
  {
    id: "audit",
    label: "Audit Event",
    purpose: "Traceable operational actions — critical changes and approvals associated with users.",
    control: "Action logging · change history · approval association",
    maturity: "Design foundation",
  },
  {
    id: "storage",
    label: "Storage & Infrastructure",
    purpose: "Production infrastructure controls remain subject to deployment validation.",
    control: "Controlled storage · environment separation · access discipline",
    maturity: "Active hardening",
  },
] as const;

export function TrustArchitecture() {
  const [active, setActive] = useState<string>("tenant");
  const current = LAYERS.find((l) => l.id === active) ?? LAYERS[0];

  const activate = useCallback((id: string) => setActive(id), []);

  return (
    <div>
      <p className="sr-only">
        Trust architecture layers: Identity, Role and Permission, Tenant Context,
        Object and Customer Context, Data Access, Operational Action, Audit Event,
        Storage and Infrastructure. Designed around least-privilege access and
        tenant-aware separation. No certifications claimed.
      </p>
      <div className="border border-border bg-surface/20">
        {LAYERS.map((layer, i) => {
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
              {i < LAYERS.length - 1 && (
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

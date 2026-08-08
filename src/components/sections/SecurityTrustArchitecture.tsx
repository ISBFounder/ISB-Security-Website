"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

type LayerId =
  | "identity"
  | "roles"
  | "tenant"
  | "data"
  | "actions"
  | "audit"
  | "storage";

const LAYERS: {
  id: LayerId;
  label: string;
  purpose: string;
  controls: string;
  maturity: string;
}[] = [
  {
    id: "identity",
    label: "Identity",
    purpose:
      "Identity and organization context form the first access boundary.",
    controls: "Authenticated users · organization context · role · assignment context",
    maturity: "Design foundation",
  },
  {
    id: "roles",
    label: "Roles & Permissions",
    purpose:
      "Designed around least-privilege access — what a user may view, create, approve or manage.",
    controls: "Role scopes · supervisor vs officer vs customer context · function-specific access",
    maturity: "Design foundation",
  },
  {
    id: "tenant",
    label: "Tenant Boundaries",
    purpose:
      "Tenant-aware data boundaries separate organizations, customers and objects.",
    controls: "Company separation · customer separation · object separation · authorized context only",
    maturity: "Design foundation",
  },
  {
    id: "data",
    label: "Data Access",
    purpose:
      "Architecture supports context-aware data access and row-level data controls.",
    controls: "Role + tenant + object context · API boundaries · secure storage foundations",
    maturity: "Design foundation · coverage expanding",
  },
  {
    id: "actions",
    label: "Operational Actions",
    purpose:
      "Sensitive actions occur only after identity, permission and context checks.",
    controls:
      "Create/approve report · update instruction · assign officer · close escalation · change context",
    maturity: "Design foundation",
  },
  {
    id: "audit",
    label: "Audit Trail",
    purpose:
      "Traceable operational actions — critical changes and approvals associated with users.",
    controls: "Action logging · change history · approval association · record history",
    maturity: "Design foundation",
  },
  {
    id: "storage",
    label: "Storage & Infrastructure",
    purpose:
      "Production infrastructure controls remain subject to deployment validation.",
    controls:
      "Controlled storage · environment separation · access controls · backup direction · monitoring direction",
    maturity: "Active development",
  },
];

const PRINCIPLES = [
  "Least-privilege access",
  "Tenant-aware boundaries",
  "Traceable actions",
  "Controlled operational context",
  "Privacy-conscious design",
  "Secure development practices",
] as const;

const MATURITY = [
  {
    stage: "Design foundation",
    items: "RBAC model · Multi-tenant structure · Audit architecture · Data separation model",
  },
  {
    stage: "Active development",
    items: "Production hardening · Security monitoring · Recovery procedures · Operational controls",
  },
  {
    stage: "Planned validation",
    items: "External security testing · Compliance assessment · Backup/recovery testing · Production control validation",
  },
  {
    stage: "Future compliance direction",
    items: "ISO 27001 readiness direction · European security/privacy standards assessment",
  },
] as const;

export function SecurityTrustArchitecture() {
  const [active, setActive] = useState<LayerId | null>("tenant");

  const activate = useCallback((id: LayerId) => setActive(id), []);
  const clear = useCallback(() => setActive(null), []);

  const current = LAYERS.find((l) => l.id === active);

  return (
    <div>
      <p className="sr-only">
        ISB trust architecture layers from identity through roles and permissions,
        tenant boundaries, data access, operational actions, audit trail, to
        storage and infrastructure. Designed around least-privilege access,
        tenant-aware boundaries and traceable operational actions. Production
        controls remain subject to deployment validation. No certifications claimed.
      </p>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Editorial + maturity */}
        <div className="space-y-6">
          <div>
            <p className="body max-w-prose">
              ISB is being designed around identity, role-based access, tenant
              boundaries, traceability and controlled operational data flows.
              Production controls remain subject to deployment and infrastructure
              validation.
            </p>
          </div>

          <div>
            <p className="label mb-3">Maturity model</p>
            <div className="space-y-0 border border-border">
              {MATURITY.map((m, i) => (
                <div
                  key={m.stage}
                  className={cn(
                    "px-4 py-3",
                    i < MATURITY.length - 1 && "border-b border-border-subtle"
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

        {/* Layered architecture */}
        <div>
          <p className="label mb-3">Trust architecture</p>
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
                      selected
                        ? "bg-gold/10 text-ink"
                        : "text-ink-secondary hover:bg-surface/50 hover:text-ink"
                    )}
                    onMouseEnter={() => activate(layer.id)}
                    onMouseLeave={clear}
                    onFocus={() => activate(layer.id)}
                    onBlur={clear}
                    aria-expanded={selected}
                    aria-controls="trust-layer-detail"
                  >
                    <span className="text-[13px] font-medium">{layer.label}</span>
                    <span className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                      {layer.maturity.split(" · ")[0]}
                    </span>
                  </button>
                  {i < LAYERS.length - 1 && (
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

          {/* Layer detail */}
          <div
            id="trust-layer-detail"
            className="mt-3 min-h-[5.5rem] border border-border-subtle bg-bg/40 px-4 py-3"
            aria-live="polite"
          >
            {current ? (
              <>
                <p className="text-[13px] text-ink-secondary">{current.purpose}</p>
                <p className="mt-2 font-mono text-[11px] text-ink-muted">
                  {current.controls}
                </p>
                <p className="mt-1 font-mono text-[10px] text-ink-faint">
                  {current.maturity}
                </p>
              </>
            ) : (
              <p className="text-[12px] text-ink-faint">
                Focus or hover a layer for purpose, controls and maturity status.
              </p>
            )}
          </div>

          {/* Tenant visual */}
          <div className="mt-4 border border-border-subtle bg-bg/30 p-4">
            <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
              Tenant-aware boundaries · illustrative
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 font-mono text-[11px] text-ink-secondary">
              <div>
                <p className="text-gold">Organization A</p>
                <p className="pl-2">→ Customer A1 → Objects</p>
              </div>
              <div>
                <p className="text-gold">Organization B</p>
                <p className="pl-2">→ Customer B1 → Objects</p>
              </div>
            </div>
            <p className="mt-2 text-[11px] text-ink-faint">
              No crossing between tenant data without explicit authorized context
            </p>
          </div>
        </div>
      </div>

      {/* Principles rail */}
      <div className="mt-8 border border-border bg-surface/20 px-4 py-4">
        <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
          Trust principles
        </p>
        <div className="flex flex-wrap gap-1.5">
          {PRINCIPLES.map((p) => (
            <span
              key={p}
              className="border border-border-subtle bg-bg/50 px-2.5 py-1.5 text-[12px] text-ink-secondary"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Compliance roadmap */}
      <div className="mt-4 border border-border-subtle bg-bg/30 px-4 py-4">
        <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
          Compliance direction
        </p>
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-ink-secondary">
          {[
            "Architecture",
            "Hardening",
            "Validation",
            "External assessment",
            "Compliance maturity",
          ].map((step, i) => (
            <span key={step} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-ink-faint" aria-hidden>
                  →
                </span>
              )}
              <span className="border border-border-subtle bg-surface/40 px-2 py-1">
                {step}
              </span>
            </span>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-ink-faint">
          Direction only · no dates · no guaranteed certification
        </p>
      </div>

      {/* Responsible disclosure */}
      <div className="mt-4 border border-border-subtle px-4 py-3 text-[13px] text-ink-muted">
        <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
          Responsible disclosure
        </p>
        <p className="mt-1.5">
          Security researchers and organizations can report potential security
          issues directly to ISB Security Solutions.
        </p>
        <p className="mt-1">
          <a
            href="mailto:info@isbsecuritysolutions.nl"
            className="text-gold hover:text-gold-light"
          >
            info@isbsecuritysolutions.nl
          </a>
        </p>
      </div>
    </div>
  );
}

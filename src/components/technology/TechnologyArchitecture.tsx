"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type LayerId = "clients" | "platform" | "data";

const LAYERS: {
  id: LayerId;
  label: string;
  items: string[];
  detail: string;
}[] = [
  {
    id: "clients",
    label: "Client experience",
    items: [
      "Web application",
      "Mobile interfaces",
      "Customer access direction",
      "Administrative interfaces",
    ],
    detail:
      "User interfaces for officers, supervisors, administrators and future customer access. Interface layer only — business logic lives in platform services.",
  },
  {
    id: "platform",
    label: "Platform services",
    items: [
      "Authentication foundations",
      "Role and permission layer",
      "Reporting services",
      "Object services",
      "Personnel services",
      "Notification services",
      "Audit services",
      "AI assistance",
      "API layer",
    ],
    detail:
      "Shared operational services consumed by every domain. Permissions and tenant context apply before data access.",
  },
  {
    id: "data",
    label: "Data & infrastructure",
    items: [
      "Tenant-aware data layer",
      "Secure storage foundations",
      "Realtime foundations",
      "Offline synchronization direction",
      "Environment separation",
      "Logging / observability foundations",
    ],
    detail:
      "Operational data and infrastructure controls. Tenant and role context constrain what each client and service may read or write.",
  },
];

export function TechnologyArchitecture() {
  const [active, setActive] = useState<LayerId>("platform");
  const current = LAYERS.find((l) => l.id === active)!;

  return (
    <div className="border border-border">
      <div
        role="tablist"
        aria-label="Architecture layers"
        className="flex border-b border-border"
      >
        {LAYERS.map((l) => (
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
          {LAYERS.map((l, i) => (
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
              {i < LAYERS.length - 1 && (
                <div className="flex justify-center py-0.5">↓</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

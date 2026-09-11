"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Org = "A" | "B";

const TREE = {
  A: {
    org: "Organization A",
    customers: [{ name: "Customer A1", objects: ["Object A"] }],
  },
  B: {
    org: "Organization B",
    customers: [{ name: "Customer B1", objects: ["Object B"] }],
  },
} as const;

export function TenantIsolation() {
  const [org, setOrg] = useState<Org>("A");
  const active = TREE[org];
  const other: Org = org === "A" ? "B" : "A";

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Tenant organizations">
        {(["A", "B"] as const).map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={org === id}
            onClick={() => setOrg(id)}
            className={cn(
              "border px-3 py-1.5 text-[12px]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
              org === id
                ? "border-gold/40 bg-gold/10 text-ink"
                : "border-border-subtle text-ink-muted hover:text-ink-secondary"
            )}
          >
            Organization {id}
          </button>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="border border-border bg-surface/20 p-4">
          <p className="font-mono text-[10px] uppercase tracking-wide text-gold">
            Selected tenant
          </p>
          <p className="mt-2 text-[14px] font-medium text-ink">{active.org}</p>
          {active.customers.map((c) => (
            <div key={c.name} className="mt-3 border-l border-border-subtle pl-3">
              <p className="text-[13px] text-ink-secondary">{c.name}</p>
              {c.objects.map((o) => (
                <p key={o} className="mt-1 font-mono text-[11px] text-ink-muted">
                  {o}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="border border-border-subtle bg-bg/30 p-4 opacity-45">
          <p className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
            Other tenant · receded
          </p>
          <p className="mt-2 text-[14px] text-ink-muted">{TREE[other].org}</p>
          <p className="mt-3 text-[12px] text-ink-faint">
            Hierarchy not visible from {active.org}.
          </p>
        </div>
      </div>
      <p className="mt-3 font-mono text-[11px] text-ink-faint">
        No path across tenant boundary.
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type RouteId = "allowed" | "rejected";

const ALLOWED = [
  { label: "Officer", note: "Authenticated identity" },
  { label: "Assigned role", note: "Operations officer" },
  { label: "Tenant context", note: "Organization A" },
  { label: "Object context", note: "NL-OBJ-042" },
  { label: "Allowed action", note: "Submit report" },
  { label: "Audit event", note: "Action recorded" },
];

const REJECTED = [
  { label: "Officer", note: "Authenticated identity" },
  { label: "Assigned role", note: "Operations officer" },
  { label: "Different tenant", note: "Organization B" },
  { label: "No authorized path", note: "Boundary holds" },
];

export function AuthorizationFlow() {
  const [route, setRoute] = useState<RouteId>("allowed");
  const steps = route === "allowed" ? ALLOWED : REJECTED;

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {(
          [
            ["allowed", "Authorized path"],
            ["rejected", "Rejected path"],
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
          const blocked = route === "rejected" && s.label.startsWith("No authorized");
          return (
          <li
            key={s.label}
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
                Closed
              </span>
            )}
          </li>
          );
        })}
      </ol>
      <p className="mt-3 text-[12px] text-ink-muted">
        {route === "allowed"
          ? "Who can perform what, inside which organizational context, with what traceability."
          : "No path across tenant boundary."}
      </p>
    </div>
  );
}

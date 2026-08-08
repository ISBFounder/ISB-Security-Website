"use client";

import { useState, } from "react";
import { cn } from "@/lib/utils";

type ViewId = "organization" | "people" | "workflows" | "engines";

const VIEWS: { id: ViewId; label: string }[] = [
  { id: "organization", label: "Organization" },
  { id: "people", label: "People" },
  { id: "workflows", label: "Workflows" },
  { id: "engines", label: "Platform Engines" },
];

const ORG_TREE = [
  "Organization",
  "Customers",
  "Objects",
  "Buildings",
  "Floors",
  "Zones",
  "Rooms",
  "Posts",
  "Checkpoints",
  "Assets",
];

const PEOPLE_TREE = [
  "Users",
  "Roles",
  "Permissions",
  "Teams",
  "Qualifications",
  "Assignments",
];

const ENGINES = [
  "Reporting Engine",
  "Notification Engine",
  "Audit Layer",
  "Realtime Layer",
  "Offline Layer",
  "API Layer",
  "AI Assistance",
  "Secure Storage Foundations",
];

export function PlatformArchitecture() {
  const [view, setView] = useState<ViewId>("organization");

  return (
    <div className="border border-border">
      <div
        role="tablist"
        aria-label="Architecture views"
        className="flex gap-0 overflow-x-auto border-b border-border"
      >
        {VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            role="tab"
            aria-selected={view === v.id}
            onClick={() => setView(v.id)}
            className={cn(
              "shrink-0 border-b-2 px-4 py-3 text-[13px] font-medium transition-colors",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
              view === v.id
                ? "border-gold text-ink"
                : "border-transparent text-ink-muted hover:text-ink-secondary"
            )}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="bg-surface/15 p-5 md:p-6" role="tabpanel">
        {view === "organization" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="label mb-3">Location hierarchy</p>
              <ol className="border border-border-subtle bg-bg/40 p-4 font-mono text-[12px] leading-7 text-ink-secondary">
                {ORG_TREE.map((n, i) => (
                  <li key={n} style={{ paddingLeft: `${Math.min(i, 6) * 0.75}rem` }}>
                    {i > 0 && <span className="text-ink-faint">└ </span>}
                    <span className={i === 0 || i === 2 ? "text-gold" : ""}>{n}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="label mb-3">Why this structure</p>
              <p className="text-[13px] text-ink-secondary">
                Mirrors how security organizations and their clients actually work —
                from the company down to the checkpoint an officer verifies on patrol.
              </p>
              <ul className="mt-4 space-y-2 text-[12px] text-ink-muted">
                <li>Object · instructions, risks, contacts, documents</li>
                <li>Zone · access rules, patrol context</li>
                <li>Post · assignment instructions</li>
                <li>Checkpoint · verification points</li>
                <li>Asset · equipment information</li>
              </ul>
            </div>
          </div>
        )}

        {view === "people" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="label mb-3">Access model</p>
              <ol className="border border-border-subtle bg-bg/40 p-4 font-mono text-[12px] leading-7 text-ink-secondary">
                {PEOPLE_TREE.map((n, i) => (
                  <li key={n} style={{ paddingLeft: `${i * 0.75}rem` }}>
                    {i > 0 && <span className="text-ink-faint">└ </span>}
                    <span className={i === 0 || i === 1 ? "text-gold" : ""}>{n}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="label mb-3">Role examples</p>
              <div className="space-y-2 text-[12px]">
                {[
                  ["Officer", "Field reporting · assigned objects · limited visibility"],
                  ["Supervisor", "Review · approval · escalation · team oversight"],
                  ["Customer representative", "Scoped visibility · planned expansion"],
                  ["Administrator", "Organization configuration · user management"],
                ].map(([role, scope]) => (
                  <div key={role} className="border border-border-subtle bg-bg/30 px-3 py-2">
                    <p className="font-medium text-ink">{role}</p>
                    <p className="text-ink-muted">{scope}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === "workflows" && (
          <div>
            <p className="label mb-3">Operational intersection · illustrative</p>
            <ol className="border border-border-subtle bg-bg/40 p-4 text-[13px] text-ink-secondary">
              {[
                "Officer K. Jansen",
                "assigned to NL-OBJ-042",
                "performs Patrol Route North",
                "detects Checkpoint issue",
                "creates Specific Report",
                "supervisor reviews",
                "audit trail records",
              ].map((s, i) => (
                <li key={s} className="flex gap-3 py-1">
                  <span className="font-mono text-[10px] text-ink-faint">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <p className="mt-3 text-[11px] text-ink-faint">
              People and locations intersect through assignments, reports, patrols,
              tasks, escalations, approvals, notifications and audit events.
            </p>
          </div>
        )}

        {view === "engines" && (
          <div>
            <p className="label mb-3">Shared platform engines</p>
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
              {ENGINES.map((e) => (
                <div
                  key={e}
                  className="border border-border-subtle bg-bg/40 px-3 py-3 text-center text-[11px] text-ink-secondary"
                >
                  {e}
                </div>
              ))}
            </div>
            <p className="mt-4 text-[12px] text-ink-muted">
              Operational domains consume shared platform services — not isolated
              feature silos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

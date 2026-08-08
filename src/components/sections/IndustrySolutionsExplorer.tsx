"use client";

import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent as RKEvent,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type IndustryId =
  | "object"
  | "mobile"
  | "event"
  | "retail"
  | "corporate"
  | "healthcare"
  | "education"
  | "municipal"
  | "government";

type Relevance = "core" | "relevant" | "situational" | "future";

type Industry = {
  id: IndustryId;
  title: string;
  context: string;
  risks: string[];
  stakeholders: string[];
  capabilities: string[];
  reports: string[];
  controls: string[];
  scenario: string[];
  pillars: string[];
  matrix: Record<string, Relevance>;
};

const MATRIX_KEYS = [
  "Reporting",
  "Patrols",
  "Personnel",
  "Objects",
  "Escalation",
  "Compliance",
  "Intelligence",
] as const;

const REL_LABEL: Record<Relevance, string> = {
  core: "Core",
  relevant: "Relevant",
  situational: "Situational",
  future: "Future",
};

const REL_STYLE: Record<Relevance, string> = {
  core: "text-gold",
  relevant: "text-ink-secondary",
  situational: "text-ink-muted",
  future: "text-ink-faint",
};

const INDUSTRIES: Industry[] = [
  {
    id: "object",
    title: "Object Security",
    context:
      "Long-term fixed security assignments at commercial, industrial, institutional or public locations.",
    risks: [
      "Unauthorized access",
      "Alarm events",
      "Incidents",
      "Building security issues",
      "Missed patrol points",
      "Incomplete handovers",
      "Contractor or visitor activity",
    ],
    stakeholders: [
      "Security officers",
      "Supervisors",
      "Object managers",
      "Customer representatives",
      "Facility management",
    ],
    capabilities: [
      "Object Management",
      "Reporting",
      "Patrols",
      "Checkpoints",
      "Emergency Contacts",
      "Instructions",
      "Risks",
      "Escalations",
      "Personnel",
      "Audit",
    ],
    reports: ["Daily Report", "Specific Report", "Incident Report", "Damage Report"],
    controls: ["Scheduled patrols", "Checkpoint verification", "Escalation procedures", "Handover records"],
    scenario: [
      "Officer performs scheduled patrol",
      "Checkpoint issue detected",
      "Observation recorded",
      "Escalation procedure triggered",
      "Supervisor receives context",
      "Follow-up recorded",
      "Customer-visible operational record",
    ],
    pillars: ["Operations", "Objects", "Reporting", "Compliance"],
    matrix: {
      Reporting: "core",
      Patrols: "core",
      Personnel: "core",
      Objects: "core",
      Escalation: "core",
      Compliance: "core",
      Intelligence: "situational",
    },
  },
  {
    id: "mobile",
    title: "Mobile Patrol",
    context:
      "Officers moving between multiple customers and objects during a shift.",
    risks: [
      "Missed visits",
      "Route deviation",
      "Alarm response delay",
      "Incomplete object context",
      "Inefficient handover",
      "Fragmented customer instructions",
    ],
    stakeholders: ["Mobile officers", "Dispatch / control", "Supervisors", "Multiple customers"],
    capabilities: [
      "Mobile workflow",
      "Object context",
      "Patrol routes",
      "Checkpoints",
      "Notifications",
      "Tasks",
      "Escalations",
      "Reporting",
      "Realtime foundations",
      "Offline foundations",
    ],
    reports: ["Specific Report", "Incident Report", "Visit confirmation"],
    controls: ["Route assignment", "Object arrival", "Checkpoint confirmation", "Next-assignment continuity"],
    scenario: [
      "Shift begins",
      "Assigned route issued",
      "Object arrival",
      "Checkpoint confirmation",
      "Abnormality detected",
      "Report created",
      "Next assignment continues",
    ],
    pillars: ["Operations", "Objects", "Reporting", "People"],
    matrix: {
      Reporting: "core",
      Patrols: "core",
      Personnel: "core",
      Objects: "relevant",
      Escalation: "core",
      Compliance: "relevant",
      Intelligence: "situational",
    },
  },
  {
    id: "event",
    title: "Event Security",
    context:
      "Temporary high-density security operations with changing teams, zones and escalation structures.",
    risks: [
      "Crowd incidents",
      "Access violations",
      "Medical events",
      "Aggressive behaviour",
      "Missing persons",
      "Capacity pressure",
      "Temporary staffing complexity",
    ],
    stakeholders: [
      "Security officers",
      "Team leaders",
      "Event management",
      "Emergency services",
      "Venue operations",
    ],
    capabilities: [
      "Temporary objects/zones",
      "Team assignments",
      "Incident reporting",
      "Escalation",
      "Tasks",
      "Personnel",
      "Communication context",
      "Operational overview",
    ],
    reports: ["Incident Report", "Specific Report", "Shift summary"],
    controls: ["Zone response", "Team leader escalation", "Event command overview"],
    scenario: [
      "Incident in Zone C",
      "Officer records event",
      "Team leader notified",
      "Response assigned",
      "Action documented",
      "Event command receives overview",
    ],
    pillars: ["Operations", "People", "Reporting"],
    matrix: {
      Reporting: "core",
      Patrols: "situational",
      Personnel: "core",
      Objects: "situational",
      Escalation: "core",
      Compliance: "relevant",
      Intelligence: "future",
    },
  },
  {
    id: "retail",
    title: "Retail Security",
    context: "Customer-facing security across stores, retail parks and chains.",
    risks: [
      "Theft",
      "Aggression",
      "Fraud indicators",
      "Access incidents",
      "Repeat patterns",
      "Store-specific instructions",
      "Evidence handling",
    ],
    stakeholders: ["Store security", "Supervisors", "Store management", "Regional operations"],
    capabilities: [
      "Incident reports",
      "Store/object hierarchy",
      "Personnel",
      "Attachments",
      "Evidence context",
      "Customer visibility",
      "Pattern analysis direction",
      "Escalation",
    ],
    reports: ["Incident Report", "Specific Report", "Damage Report"],
    controls: ["Evidence attachment", "Supervisor review", "Customer record"],
    scenario: [
      "Retail incident",
      "Structured report",
      "Evidence attached",
      "Supervisor review",
      "Customer record",
      "Future pattern context",
    ],
    pillars: ["Reporting", "Objects", "Compliance", "Intelligence"],
    matrix: {
      Reporting: "core",
      Patrols: "situational",
      Personnel: "relevant",
      Objects: "core",
      Escalation: "core",
      Compliance: "core",
      Intelligence: "future",
    },
  },
  {
    id: "corporate",
    title: "Corporate Security",
    context: "Enterprise offices, headquarters, campuses and corporate facilities.",
    risks: [
      "Unauthorized access",
      "Visitor incidents",
      "Confidential areas",
      "Contractors",
      "Internal disruptions",
      "Building issues",
      "Executive events",
    ],
    stakeholders: ["Corporate security", "Facility management", "Reception", "Leadership support"],
    capabilities: [
      "Object hierarchy",
      "Visitor/incident context",
      "Patrols",
      "Risk notes",
      "Escalations",
      "Reporting",
      "Access roles",
      "Customer requirements",
    ],
    reports: ["Incident Report", "Daily Report", "Specific Report"],
    controls: ["Facility patrols", "Escalation chain", "Requirement tracking"],
    scenario: [
      "Facility observation",
      "Risk note or incident logged",
      "Supervisor notified",
      "Action assigned",
      "Record retained for oversight",
    ],
    pillars: ["Objects", "Operations", "Reporting", "Compliance"],
    matrix: {
      Reporting: "core",
      Patrols: "core",
      Personnel: "relevant",
      Objects: "core",
      Escalation: "core",
      Compliance: "core",
      Intelligence: "situational",
    },
  },
  {
    id: "healthcare",
    title: "Healthcare Security",
    context:
      "Hospitals, clinics and healthcare environments where security interacts with staff, patients and visitors.",
    risks: [
      "Aggression",
      "Medical-area access issues",
      "Vulnerable persons",
      "Emergency department incidents",
      "Visitor conflicts",
      "Property damage",
    ],
    stakeholders: [
      "Security",
      "Hospital operations",
      "Clinical management",
      "Facilities",
      "Emergency coordination",
    ],
    capabilities: [
      "Incident reporting",
      "Escalation",
      "Object/zone context",
      "Personnel",
      "Evidence",
      "Emergency contacts",
      "Risk context",
    ],
    reports: ["Incident Report", "Specific Report", "Damage Report"],
    controls: ["Zone context", "Rapid escalation", "Evidence retention"],
    scenario: [
      "Incident in clinical zone",
      "Structured report opened",
      "Escalation to supervisor",
      "Evidence attached",
      "Operational follow-up recorded",
    ],
    pillars: ["Reporting", "Operations", "Objects", "Compliance"],
    matrix: {
      Reporting: "core",
      Patrols: "situational",
      Personnel: "core",
      Objects: "core",
      Escalation: "core",
      Compliance: "core",
      Intelligence: "situational",
    },
  },
  {
    id: "education",
    title: "Education Security",
    context: "Schools, colleges, universities and campuses.",
    risks: [
      "Unauthorized access",
      "Aggression",
      "Student/visitor incidents",
      "Vandalism",
      "Event security",
      "Campus patrol issues",
    ],
    stakeholders: ["Campus security", "Facilities", "School/college administration"],
    capabilities: [
      "Campus object structure",
      "Zones",
      "Patrols",
      "Incident reports",
      "Escalations",
      "Personnel",
      "Object instructions",
    ],
    reports: ["Incident Report", "Specific Report", "Daily Report"],
    controls: ["Campus hierarchy", "Zone patrols", "Escalation to administration"],
    scenario: [
      "Campus observation",
      "Zone-level report",
      "Supervisor review",
      "Follow-up instruction updated",
    ],
    pillars: ["Objects", "Operations", "Reporting"],
    matrix: {
      Reporting: "core",
      Patrols: "relevant",
      Personnel: "relevant",
      Objects: "core",
      Escalation: "core",
      Compliance: "relevant",
      Intelligence: "situational",
    },
  },
  {
    id: "municipal",
    title: "Municipal Security",
    context: "Municipal buildings and public-facing government locations.",
    risks: [
      "Aggression",
      "Public-order incidents inside facilities",
      "Access control issues",
      "Sensitive meetings",
      "Protest-related pressure",
      "Facility incidents",
    ],
    stakeholders: ["Municipal security", "Facility managers", "Public administration"],
    capabilities: [
      "Multiple municipal objects",
      "Reporting",
      "Escalation",
      "Object instructions",
      "Personnel",
      "Audit",
      "Role-based access",
      "Customer visibility",
    ],
    reports: ["Incident Report", "Specific Report", "Daily Report"],
    controls: ["Multi-site structure", "Audit trail", "Role-scoped access"],
    scenario: [
      "Incident at municipal facility",
      "Report filed with object context",
      "Escalation path followed",
      "Audit-ready record retained",
    ],
    pillars: ["Reporting", "Objects", "Compliance", "Operations"],
    matrix: {
      Reporting: "core",
      Patrols: "relevant",
      Personnel: "core",
      Objects: "core",
      Escalation: "core",
      Compliance: "core",
      Intelligence: "situational",
    },
  },
  {
    id: "government",
    title: "Government Contractors",
    context:
      "Security providers delivering contracted services to public-sector organizations.",
    risks: [
      "Strict contractual requirements",
      "Documentation quality",
      "Multiple sites",
      "Compliance evidence",
      "Qualification requirements",
      "Auditability",
      "Escalation procedures",
    ],
    stakeholders: [
      "Contracted security provider",
      "Public-sector client",
      "Supervisors",
      "Compliance officers",
    ],
    capabilities: [
      "Multi-customer structure",
      "Object hierarchy",
      "Personnel qualifications",
      "Reports",
      "Audit",
      "Requirements",
      "Evidence",
      "Role-based access",
      "Customer context",
    ],
    reports: ["Incident Report", "Specific Report", "Compliance evidence packs"],
    controls: ["Requirement tracking", "Qualification checks", "Evidence → audit chain"],
    scenario: [
      "Contract requirement",
      "Object instruction",
      "Officer assignment",
      "Operational action",
      "Evidence captured",
      "Supervisor review",
      "Audit trail",
    ],
    pillars: ["Compliance", "Objects", "People", "Reporting"],
    matrix: {
      Reporting: "core",
      Patrols: "relevant",
      Personnel: "core",
      Objects: "core",
      Escalation: "core",
      Compliance: "core",
      Intelligence: "situational",
    },
  },
];

const FOUNDATION = [
  "Multi-tenant",
  "RBAC",
  "Audit",
  "Notifications",
  "Object hierarchy",
  "Reporting",
  "Mobile foundations",
  "AI assistance",
] as const;

function IndustryVisual({ id }: { id: IndustryId }) {
  if (id === "object") {
    return (
      <ol className="border border-border-subtle bg-bg/40 p-3 text-[12px]">
        {["Patrol start", "Checkpoint issue", "Report + escalate", "Supervisor context", "Customer-visible record"].map(
          (s, i) => (
            <li key={s} className="flex gap-2 py-1 text-ink-secondary">
              <span className="font-mono text-[10px] text-ink-faint">{i + 1}</span>
              {s}
            </li>
          )
        )}
      </ol>
    );
  }
  if (id === "mobile") {
    return (
      <div className="border border-border-subtle bg-bg/40 p-3 font-mono text-[11px] text-ink-secondary">
        <p>Route · Object A → Object B → Object C</p>
        <p className="mt-1 text-ink-faint">14:00 depart · 14:22 arrive · CP confirm · next assignment</p>
        <p className="mt-2 text-gold">Multi-object shift continuity</p>
      </div>
    );
  }
  if (id === "event") {
    return (
      <div className="border border-border-subtle bg-bg/40 p-3 text-[12px] text-ink-secondary">
        <p className="font-mono text-[10px] text-ink-faint">Zone response</p>
        <p className="mt-1">Zone C incident → Team leader → Response unit → Event command overview</p>
        <p className="mt-2 text-[11px] text-ink-faint">
          Does not replace radio or emergency services
        </p>
      </div>
    );
  }
  if (id === "retail") {
    return (
      <ol className="border border-border-subtle bg-bg/40 p-3 text-[12px] text-ink-secondary">
        {["Incident", "Structured report", "Evidence attached", "Supervisor review", "Customer record"].map(
          (s, i) => (
            <li key={s} className="flex gap-2 py-1">
              <span className="font-mono text-[10px] text-ink-faint">{i + 1}</span>
              {s}
            </li>
          )
        )}
      </ol>
    );
  }
  if (id === "corporate") {
    return (
      <div className="border border-border-subtle bg-bg/40 p-3 font-mono text-[11px] leading-6 text-ink-secondary">
        <p>Facility → Risk note / incident</p>
        <p>→ Supervisor escalation</p>
        <p>→ Action assigned</p>
        <p className="text-gold">→ Oversight record</p>
      </div>
    );
  }
  if (id === "healthcare") {
    return (
      <div className="border border-border-subtle bg-bg/40 p-3 text-[12px] text-ink-secondary">
        <p>Clinical zone · incident → structured report → escalation → evidence</p>
        <p className="mt-2 text-[11px] text-ink-faint">
          No medical-data processing · no patient records
        </p>
      </div>
    );
  }
  if (id === "education") {
    return (
      <div className="border border-border-subtle bg-bg/40 p-3 font-mono text-[11px] leading-6 text-ink-secondary">
        <p className="text-gold">Campus</p>
        <p className="pl-2">└ Buildings · Zones · Patrols</p>
        <p className="pl-4">└ Incident → Escalation → Instruction update</p>
      </div>
    );
  }
  if (id === "municipal") {
    return (
      <div className="border border-border-subtle bg-bg/40 p-3 text-[12px] text-ink-secondary">
        <p className="font-mono text-[10px] text-ink-faint">Multi-site structure</p>
        <p className="mt-1">Facility A · Facility B · Facility C → shared audit model</p>
      </div>
    );
  }
  // government
  return (
    <ol className="border border-border-subtle bg-bg/40 p-3 text-[12px] text-ink-secondary">
      {[
        "Contract requirement",
        "Object instruction",
        "Officer assignment",
        "Operational action",
        "Evidence captured",
        "Supervisor review",
        "Audit trail",
      ].map((s, i) => (
        <li key={s} className="flex gap-2 py-1">
          <span className="font-mono text-[10px] text-ink-faint">{i + 1}</span>
          {s}
        </li>
      ))}
    </ol>
  );
}

export function IndustrySolutionsExplorer() {
  const [active, setActive] = useState<IndustryId>("object");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const current = INDUSTRIES.find((i) => i.id === active)!;

  const select = useCallback((id: IndustryId, index: number) => {
    setActive(id);
    refs.current[index]?.focus();
  }, []);

  function onKey(e: RKEvent<HTMLButtonElement>, index: number) {
    let n = index;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      n = (index + 1) % INDUSTRIES.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      n = (index - 1 + INDUSTRIES.length) % INDUSTRIES.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      n = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      n = INDUSTRIES.length - 1;
    } else return;
    select(INDUSTRIES[n].id, n);
  }

  return (
    <div>
      <div className="border border-border">
        <div className="grid lg:grid-cols-[minmax(0,0.28fr)_minmax(0,0.72fr)]">
          {/* Industry rail */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Industry solutions"
            className="flex gap-0 overflow-x-auto border-b border-border lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r"
          >
            {INDUSTRIES.map((ind, i) => {
              const selected = active === ind.id;
              return (
                <button
                  key={ind.id}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`ind-tab-${ind.id}`}
                  aria-selected={selected}
                  aria-controls={`ind-panel-${ind.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(ind.id, i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cn(
                    "shrink-0 px-4 py-3 text-left text-[13px] font-medium transition-colors",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
                    selected
                      ? "border-b-2 border-gold bg-surface text-ink lg:border-b-0 lg:border-l-2"
                      : "border-b-2 border-transparent text-ink-muted hover:text-ink-secondary lg:border-l-2 lg:border-transparent"
                  )}
                >
                  {ind.title}
                </button>
              );
            })}
          </div>

          {/* Workspace */}
          <div
            role="tabpanel"
            id={`ind-panel-${current.id}`}
            aria-labelledby={`ind-tab-${current.id}`}
            className="bg-surface/15 p-5 md:p-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={reduce ? false : { opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-6"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                    Operational environment
                  </p>
                  <h3 className="heading-md mt-1">{current.title}</h3>
                  <p className="body mt-2 max-w-2xl">{current.context}</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <p className="label mb-2">Primary operational risks</p>
                    <ul className="space-y-1">
                      {current.risks.map((r) => (
                        <li
                          key={r}
                          className="border-b border-border-subtle py-1.5 text-[12px] text-ink-secondary last:border-0"
                        >
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="label mb-2">Typical stakeholders</p>
                    <ul className="space-y-1">
                      {current.stakeholders.map((s) => (
                        <li
                          key={s}
                          className="border-b border-border-subtle py-1.5 text-[12px] text-ink-secondary last:border-0"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <p className="label mb-3">Example scenario</p>
                    <ol className="border border-border-subtle bg-bg/40 p-3">
                      {current.scenario.map((step, i) => (
                        <li key={step} className="flex gap-3 text-[12px]">
                          <div className="flex w-4 flex-col items-center" aria-hidden>
                            <span
                              className={cn(
                                "mt-1.5 h-1.5 w-1.5",
                                i === 0 || i === current.scenario.length - 1
                                  ? "bg-gold"
                                  : "bg-ink-faint"
                              )}
                            />
                            {i < current.scenario.length - 1 && (
                              <span className="w-px flex-1 bg-border-subtle" />
                            )}
                          </div>
                          <span className="pb-2.5 text-ink-secondary last:pb-0">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <p className="label mb-3">Operational visualization</p>
                    <IndustryVisual id={current.id} />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="label mb-2">Relevant ISB capabilities</p>
                    <div className="flex flex-wrap gap-1.5">
                      {current.capabilities.map((c) => (
                        <span
                          key={c}
                          className="border border-border-subtle bg-bg/50 px-2 py-1 text-[11px] text-ink-secondary"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="label mb-2">Typical reports & controls</p>
                    <p className="text-[12px] text-ink-secondary">
                      Reports: {current.reports.join(" · ")}
                    </p>
                    <p className="mt-1 text-[12px] text-ink-muted">
                      Controls: {current.controls.join(" · ")}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="label mb-2">Related platform pillars</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {current.pillars.map((p, i) => (
                      <span key={p} className="flex items-center gap-2">
                        {i > 0 && (
                          <span className="font-mono text-[10px] text-ink-faint" aria-hidden>
                            —
                          </span>
                        )}
                        <span className="border border-border-subtle bg-bg/40 px-2.5 py-1.5 text-[12px] text-ink-secondary">
                          {p}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Relevance matrix */}
                <div>
                  <p className="label mb-3">Capability relevance</p>
                  <div className="overflow-x-auto border border-border-subtle">
                    <table className="w-full min-w-[480px] text-left text-[11px]">
                      <thead>
                        <tr className="border-b border-border-subtle bg-surface/40 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                          {MATRIX_KEYS.map((k) => (
                            <th key={k} className="px-2 py-2 font-medium">
                              {k}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {MATRIX_KEYS.map((k) => {
                            const r = current.matrix[k];
                            return (
                              <td key={k} className={cn("px-2 py-2", REL_STYLE[r])}>
                                {REL_LABEL[r]}
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Shared foundation */}
      <div className="border border-t-0 border-border bg-bg-secondary/50 px-4 py-3 md:px-5">
        <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
          Shared ISB platform foundation
        </p>
        <div className="flex flex-wrap gap-1.5">
          {FOUNDATION.map((f) => (
            <span
              key={f}
              className="border border-border-subtle bg-surface/40 px-2 py-1 font-mono text-[10px] text-ink-muted"
            >
              {f}
            </span>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-ink-faint">
          Different environments · different workflows · same platform foundation
        </p>
      </div>
    </div>
  );
}

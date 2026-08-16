"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type KeyboardEvent as RKEvent,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type EnvId =
  | "object"
  | "mobile"
  | "event"
  | "retail"
  | "corporate"
  | "healthcare"
  | "education"
  | "municipal"
  | "government";

type Env = {
  id: EnvId;
  title: string;
  context: string;
  stakeholders: string[];
  reports: string[];
  risks: string[];
  capabilities: string[];
  workflow: string[];
  domains: string[];
  controls: string[];
  decisions: string[];
  stage?: string;
  challenges: string[];
  change: string;
};

const ENVS: Env[] = [
  {
    id: "object",
    title: "Object Security",
    context:
      "Long-term fixed security assignments at commercial, industrial, institutional or public locations. Officers work within a defined site hierarchy with recurring patrols, instructions and handovers.",
    stakeholders: [
      "Security officers",
      "Supervisors",
      "Object managers",
      "Customer representatives",
      "Facility management",
    ],
    reports: ["Daily Report", "Specific Report", "Incident Report", "Damage Report"],
    risks: [
      "Unauthorized access",
      "Alarm events",
      "Missed patrol points",
      "Incomplete handovers",
      "Contractor or visitor activity",
    ],
    capabilities: [
      "Object Management",
      "Reporting",
      "Patrols",
      "Checkpoints",
      "Instructions",
      "Risks",
      "Escalations",
      "Personnel",
      "Audit",
    ],
    workflow: [
      "Officer",
      "Assignment",
      "Patrol",
      "Observation",
      "Specific Report",
      "Supervisor Review",
      "Customer Visibility (planned)",
      "Audit History",
    ],
    domains: ["Operations", "Objects", "Reporting", "Compliance"],
    controls: [
      "Scheduled patrols",
      "Checkpoint verification",
      "Escalation procedures",
      "Handover records",
    ],
    decisions: [
      "Escalate or contain",
      "Supervisor approval of report",
      "Update object instruction",
    ],
    challenges: [
      "Paper or messaging-based patrol notes",
      "Handovers lose context between shifts",
      "Customer instructions stored separately from reports",
      "Repeated data entry across tools",
    ],
    change:
      "ISB keeps object hierarchy, instructions, reports and audit trail in one operational context so handovers and reviews start from shared information.",
  },
  {
    id: "mobile",
    title: "Mobile Patrol",
    context:
      "Officers move between multiple customers and objects during a shift. Route continuity, object context and rapid reporting matter more than a single fixed post.",
    stakeholders: [
      "Mobile officers",
      "Dispatch / control",
      "Supervisors",
      "Multiple customers",
    ],
    reports: ["Specific Report", "Incident Report", "Visit confirmation"],
    risks: [
      "Missed visits",
      "Route deviation",
      "Alarm response delay",
      "Incomplete object context",
      "Fragmented customer instructions",
    ],
    capabilities: [
      "Mobile workflow",
      "Object context",
      "Patrol routes",
      "Checkpoints",
      "Notifications",
      "Tasks",
      "Reporting",
      "Realtime foundations",
      "Offline foundations",
    ],
    workflow: [
      "Shift begins",
      "Assigned route",
      "Object arrival",
      "Checkpoint confirmation",
      "Abnormality detected",
      "Report created",
      "Next assignment continues",
    ],
    domains: ["Operations", "Objects", "Reporting", "People"],
    controls: [
      "Route assignment",
      "Object arrival",
      "Checkpoint confirmation",
      "Next-assignment continuity",
    ],
    decisions: [
      "Prioritise alarm vs planned visit",
      "Escalate missed checkpoint",
      "Adjust remaining route",
    ],
    stage: "Realtime and offline · architecture direction",
    challenges: [
      "Object instructions scattered across phones and folders",
      "Missed visits hard to evidence",
      "Handover between mobile officers incomplete",
      "Customer-specific requirements not on the device",
    ],
    change:
      "ISB is designed so route, object context and reporting share one workflow — reducing re-entry when moving between sites.",
  },
  {
    id: "event",
    title: "Event Security",
    context:
      "Temporary high-density operations with changing teams, zones and escalation structures. Incident capture and command overview matter under time pressure.",
    stakeholders: [
      "Security officers",
      "Team leaders",
      "Event management",
      "Emergency services",
      "Venue operations",
    ],
    reports: ["Incident Report", "Specific Report", "Shift summary"],
    risks: [
      "Crowd incidents",
      "Access violations",
      "Medical events",
      "Aggressive behaviour",
      "Temporary staffing complexity",
    ],
    capabilities: [
      "Temporary objects/zones",
      "Team assignments",
      "Incident reporting",
      "Escalation",
      "Tasks",
      "Personnel",
      "Operational overview",
    ],
    workflow: [
      "Incident in Zone C",
      "Officer records event",
      "Team leader notified",
      "Response assigned",
      "Action documented",
      "Event command overview",
    ],
    domains: ["Operations", "People", "Reporting"],
    controls: ["Zone response", "Team leader escalation", "Command overview"],
    decisions: [
      "Escalate to emergency services",
      "Reallocate team capacity",
      "Close or escalate incident",
    ],
    challenges: [
      "Radio and paper notes lose structure after the event",
      "Zone context not linked to written reports",
      "Temporary staff lack shared object/zone map",
      "Post-event reporting is slow and incomplete",
    ],
    change:
      "ISB supports structured incident capture and escalation within temporary zone context. It does not replace radio or emergency services.",
  },
  {
    id: "retail",
    title: "Retail Security",
    context:
      "Customer-facing security across stores, retail parks and chains. Evidence handling and store-specific instructions are central.",
    stakeholders: [
      "Store security",
      "Supervisors",
      "Store management",
      "Regional operations",
    ],
    reports: ["Incident Report", "Specific Report", "Damage Report"],
    risks: [
      "Theft",
      "Aggression",
      "Access incidents",
      "Repeat patterns",
      "Evidence handling",
    ],
    capabilities: [
      "Incident reports",
      "Store/object hierarchy",
      "Personnel",
      "Attachments",
      "Evidence context",
      "Customer visibility",
      "Escalation",
    ],
    workflow: [
      "Retail incident",
      "Structured report",
      "Evidence attached",
      "Supervisor review",
      "Customer record",
      "Future pattern context",
    ],
    domains: ["Reporting", "Objects", "Compliance", "Intelligence"],
    controls: ["Evidence attachment", "Supervisor review", "Customer record"],
    decisions: [
      "Involve police or store management",
      "Retain evidence for follow-up",
      "Escalate repeat pattern",
    ],
    stage: "Pattern analysis · future direction",
    challenges: [
      "Evidence stored outside the report",
      "Store instructions not visible to temporary staff",
      "Repeat incidents hard to connect",
      "Customer reporting delayed",
    ],
    change:
      "ISB links incident, evidence and store object context so review and customer-facing records start from one structured source.",
  },
  {
    id: "corporate",
    title: "Corporate Security",
    context:
      "Enterprise offices, headquarters, campuses and corporate facilities. Access incidents, contractors and facility issues dominate the operational picture.",
    stakeholders: [
      "Corporate security",
      "Facility management",
      "Reception",
      "Leadership support",
    ],
    reports: ["Incident Report", "Daily Report", "Specific Report"],
    risks: [
      "Unauthorized access",
      "Visitor incidents",
      "Confidential areas",
      "Contractors",
      "Building issues",
    ],
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
    workflow: [
      "Facility observation",
      "Risk note or incident logged",
      "Supervisor notified",
      "Action assigned",
      "Record retained for oversight",
    ],
    domains: ["Objects", "Operations", "Reporting", "Compliance"],
    controls: ["Facility patrols", "Escalation chain", "Requirement tracking"],
    decisions: [
      "Restrict area access",
      "Escalate to facilities or leadership",
      "Update risk note",
    ],
    challenges: [
      "Visitor and contractor incidents logged inconsistently",
      "Confidential-area instructions siloed",
      "Facility issues not linked to security records",
    ],
    change:
      "ISB is designed so facility hierarchy, risk notes and incident reports share the same object context for supervisors and oversight.",
  },
  {
    id: "healthcare",
    title: "Healthcare Security",
    context:
      "Hospitals, clinics and healthcare environments where security interacts with staff, patients and visitors. Zone context and rapid escalation are critical.",
    stakeholders: [
      "Security",
      "Hospital operations",
      "Clinical management",
      "Facilities",
      "Emergency coordination",
    ],
    reports: ["Incident Report", "Specific Report", "Damage Report"],
    risks: [
      "Aggression",
      "Medical-area access issues",
      "Vulnerable persons",
      "Emergency department incidents",
      "Visitor conflicts",
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
    workflow: [
      "Incident in clinical zone",
      "Structured report opened",
      "Escalation to supervisor",
      "Evidence attached",
      "Operational follow-up recorded",
    ],
    domains: ["Reporting", "Operations", "Objects", "Compliance"],
    controls: ["Zone context", "Rapid escalation", "Evidence retention"],
    decisions: [
      "Escalate to clinical or emergency coordination",
      "Secure zone",
      "Document without accessing medical records",
    ],
    challenges: [
      "Zone context missing from written reports",
      "Escalation paths differ by department",
      "Evidence and follow-up tracked separately",
    ],
    change:
      "ISB supports structured incident and escalation workflows with zone context. It does not process medical data or patient records.",
  },
  {
    id: "education",
    title: "Educational Security",
    context:
      "Schools, colleges, universities and campuses. Campus structure, patrols and incident reporting form the operational core.",
    stakeholders: [
      "Campus security",
      "Facilities",
      "School/college administration",
    ],
    reports: ["Incident Report", "Specific Report", "Daily Report"],
    risks: [
      "Unauthorized access",
      "Aggression",
      "Student/visitor incidents",
      "Vandalism",
      "Campus patrol issues",
    ],
    capabilities: [
      "Campus object structure",
      "Zones",
      "Patrols",
      "Incident reports",
      "Escalations",
      "Personnel",
      "Object instructions",
    ],
    workflow: [
      "Campus observation",
      "Zone-level report",
      "Supervisor review",
      "Follow-up instruction updated",
    ],
    domains: ["Objects", "Operations", "Reporting"],
    controls: ["Campus hierarchy", "Zone patrols", "Escalation to administration"],
    decisions: [
      "Involve administration",
      "Adjust patrol coverage",
      "Update campus instruction",
    ],
    challenges: [
      "Campus maps and instructions out of sync with reports",
      "Temporary event security lacks shared structure",
      "Incident follow-up slow across departments",
    ],
    change:
      "ISB links campus hierarchy, patrols and incident records so follow-up starts from a shared operational context.",
  },
  {
    id: "municipal",
    title: "Municipal Security",
    context:
      "Municipal buildings and public-facing government locations. Multi-site structure, auditability and role-scoped access are central.",
    stakeholders: [
      "Municipal security",
      "Facility managers",
      "Public administration",
    ],
    reports: ["Incident Report", "Specific Report", "Daily Report"],
    risks: [
      "Aggression",
      "Access control issues",
      "Sensitive meetings",
      "Facility incidents",
      "Public-facing pressure",
    ],
    capabilities: [
      "Multiple municipal objects",
      "Reporting",
      "Escalation",
      "Object instructions",
      "Personnel",
      "Audit",
      "Role-based access",
    ],
    workflow: [
      "Incident at municipal facility",
      "Report filed with object context",
      "Escalation path followed",
      "Audit-ready record retained",
    ],
    domains: ["Reporting", "Objects", "Compliance", "Operations"],
    controls: ["Multi-site structure", "Audit trail", "Role-scoped access"],
    decisions: [
      "Escalate within municipal hierarchy",
      "Restrict facility access",
      "Retain evidence for oversight",
    ],
    challenges: [
      "Multiple buildings, inconsistent reporting formats",
      "Audit requests hard to fulfil from scattered notes",
      "Role visibility not aligned to site responsibility",
    ],
    change:
      "ISB is designed for multi-site municipal structure with shared reporting and audit context. It does not imply police powers.",
  },
  {
    id: "government",
    title: "Government Contractors",
    context:
      "Security providers delivering contracted services to public-sector organizations. Documentation quality, qualifications and auditability dominate contractual expectations.",
    stakeholders: [
      "Contracted security provider",
      "Public-sector client",
      "Supervisors",
      "Compliance officers",
    ],
    reports: [
      "Incident Report",
      "Specific Report",
      "Compliance evidence packs",
    ],
    risks: [
      "Strict contractual requirements",
      "Documentation quality",
      "Multiple sites",
      "Qualification requirements",
      "Auditability",
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
    ],
    workflow: [
      "Contract requirement",
      "Object instruction",
      "Officer assignment",
      "Operational action",
      "Evidence captured",
      "Supervisor review",
      "Audit trail",
    ],
    domains: ["Compliance", "Objects", "People", "Reporting"],
    controls: [
      "Requirement tracking",
      "Qualification checks",
      "Evidence → audit chain",
    ],
    decisions: [
      "Accept or escalate contractual non-conformance",
      "Assign qualified personnel",
      "Release evidence pack to client",
    ],
    challenges: [
      "Requirements live in contracts, not in field tools",
      "Evidence assembled manually after the fact",
      "Qualification checks disconnected from assignments",
    ],
    change:
      "ISB is designed so requirement, assignment, action and evidence can share one audit-oriented chain. No government accreditation claimed.",
  },
];

export function EnvironmentExplorer() {
  const [active, setActive] = useState<EnvId>("object");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const current = ENVS.find((e) => e.id === active)!;
  useEffect(() => {
  const hash = window.location.hash.replace("#", "");

  const map: Record<string, EnvId> = {
    "object-security": "object",
    "mobile-patrol": "mobile",
    "event-security": "event",
    retail: "retail",
    corporate: "corporate",
    healthcare: "healthcare",
    education: "education",
    government: "government",
    "security-companies": "object",
  };

  const target = map[hash];

  if (target) {
    setActive(target);
  }
}, []);

  const select = useCallback((id: EnvId, i: number) => {
    setActive(id);
    refs.current[i]?.focus();
  }, []);

  function onKey(e: RKEvent<HTMLButtonElement>, i: number) {
    let n = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      n = (i + 1) % ENVS.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      n = (i - 1 + ENVS.length) % ENVS.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      n = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      n = ENVS.length - 1;
    } else return;
    select(ENVS[n].id, n);
  }

  return (
    <div className="overflow-hidden border border-border">
      <div className="grid lg:grid-cols-[minmax(0,0.28fr)_minmax(0,0.72fr)]">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Operational environments"
          className="flex gap-0 overflow-x-auto border-b border-border lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r"
        >
          {ENVS.map((env, i) => {
            const selected = active === env.id;
            return (
              <button
                key={env.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`sol-tab-${env.id}`}
                aria-selected={selected}
                aria-controls={`sol-panel-${env.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(env.id, i)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "shrink-0 px-4 py-3 text-left text-[13px] font-medium transition-colors",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
                  selected
                    ? "border-b-2 border-gold bg-surface text-ink lg:border-b-0 lg:border-l-2"
                    : "border-b-2 border-transparent text-ink-muted hover:text-ink-secondary lg:border-l-2 lg:border-transparent"
                )}
              >
                {env.title}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`sol-panel-${current.id}`}
          aria-labelledby={`sol-tab-${current.id}`}
          className="min-w-0 overflow-x-auto bg-surface/15 p-4 sm:p-5 md:p-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-6"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                    Operational environment
                  </p>
                  {current.stage && (
                    <span className="border border-border-subtle px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-ink-muted">
                      {current.stage}
                    </span>
                  )}
                </div>
                <h3 className="heading-md mt-1">{current.title}</h3>
                <p className="body mt-2 max-w-2xl">{current.context}</p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="min-w-0">
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
                <div className="min-w-0">
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
              </div>

              <div className="min-w-0">
                <p className="label mb-3">Illustrative operational workflow</p>
                <ol className="border border-border-subtle bg-bg/40 p-3">
                  {current.workflow.map((step, i) => (
                    <li key={step} className="flex gap-3 text-[12px]">
                      <div className="flex w-4 flex-col items-center" aria-hidden>
                        <span
                          className={cn(
                            "mt-1.5 h-1.5 w-1.5",
                            i === 0 || i === current.workflow.length - 1
                              ? "bg-gold"
                              : "bg-ink-faint"
                          )}
                        />
                        {i < current.workflow.length - 1 && (
                          <span className="w-px flex-1 bg-border-subtle" />
                        )}
                      </div>
                      <span className="pb-2.5 text-ink-secondary last:pb-0">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="min-w-0">
                  <p className="label mb-2">Typical reports</p>
                  <p className="text-[12px] text-ink-secondary">
                    {current.reports.join(" · ")}
                  </p>
                  <p className="label mb-2 mt-4">Operational controls</p>
                  <p className="text-[12px] text-ink-secondary">
                    {current.controls.join(" · ")}
                  </p>
                </div>
                <div className="min-w-0">
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
                  <p className="label mb-2 mt-4">Platform domains</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {current.domains.map((d, i) => (
                      <span key={d} className="flex items-center gap-2">
                        {i > 0 && (
                          <span className="font-mono text-[10px] text-ink-faint" aria-hidden>
                            —
                          </span>
                        )}
                        <span className="border border-border-subtle bg-bg/40 px-2 py-1 text-[12px] text-ink-secondary">
                          {d}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="min-w-0">
                <p className="label mb-2">Human decision points</p>
                <ul className="space-y-1">
                  {current.decisions.map((d) => (
                    <li key={d} className="text-[12px] text-ink-secondary">
                      · {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 border-t border-border-subtle pt-4 lg:grid-cols-2">
                <div className="min-w-0">
                  <p className="label mb-2">Fragmented reality</p>
                  <ul className="space-y-1.5">
                    {current.challenges.map((c) => (
                      <li key={c} className="text-[12px] text-ink-muted">
                        · {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="min-w-0">
                  <p className="label mb-2">How ISB changes the flow</p>
                  <p className="text-[13px] text-ink-secondary">{current.change}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

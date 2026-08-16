"use client";

import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent as RKEvent,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Id =
  | "object"
  | "mobile"
  | "event"
  | "retail"
  | "corporate"
  | "healthcare"
  | "education"
  | "municipal"
  | "government";

type Profile = {
  id: Id;
  title: string;
  profile: string;
  operating: string;
  location: string;
  workforce: string;
  objectModel: string[];
  reporting: string;
  controls: string[];
  escalation: string;
  domains: string[];
  config: string[];
  architecture: string[];
  note?: string;
};

const PROFILES: Profile[] = [
  {
    id: "object",
    title: "Object Security",
    profile:
      "Long-term fixed security assignments at commercial, industrial or institutional sites.",
    operating: "Fixed assignment",
    location: "Single or multiple long-term objects",
    workforce: "Scheduled officers and supervisors",
    objectModel: [
      "Customer → Object → Building → Floor → Zone → Post → Checkpoint",
    ],
    reporting: "Daily, Specific, Incident, Damage",
    controls: ["Instructions", "Risks", "Contacts", "Routes", "Reporting"],
    escalation: "Object supervisor and customer escalation paths",
    domains: ["Reporting", "Objects", "Personnel", "Patrols", "Compliance"],
    config: [
      "Object instructions and risks",
      "Patrol routes and checkpoints",
      "Role-scoped object access",
    ],
    architecture: [
      "Officer",
      "Assignment",
      "Patrol",
      "Observation",
      "Report",
      "Supervisor review",
      "Audit",
    ],
  },
  {
    id: "mobile",
    title: "Mobile Patrol",
    profile:
      "Officers move between multiple customers and objects during a shift.",
    operating: "Multi-object mobile shift",
    location: "Distributed customer sites",
    workforce: "Mobile officers, dispatch / control",
    objectModel: ["Route → Object sequence → Checkpoints per object"],
    reporting: "Specific, Incident, Visit confirmation",
    controls: ["Route assignment", "Object arrival", "Checkpoint confirmation"],
    escalation: "Dispatch and supervisor prioritisation under time pressure",
    domains: [
      "Objects",
      "Patrols",
      "Reporting",
      "Notifications",
      "Offline direction",
      "Realtime direction",
    ],
    config: [
      "Multi-object routes",
      "Object context on device",
      "Next-assignment continuity",
    ],
    architecture: [
      "Shift begins",
      "Assigned route",
      "Object arrival",
      "Checkpoint",
      "Report",
      "Next object",
    ],
    note: "Offline and realtime capabilities are architecture direction / planned — not claimed as fully released.",
  },
  {
    id: "event",
    title: "Event Security",
    profile:
      "Temporary high-density operations with changing teams, zones and escalation structures.",
    operating: "Temporary / high-density",
    location: "Venue, zones, entrances",
    workforce: "Temporary teams and team leaders",
    objectModel: ["Event → Zones → Entrances / posts"],
    reporting: "Incident, Specific, Shift summary",
    controls: ["Zone response", "Team assignments", "Incident capture"],
    escalation: "Team leader → event command → emergency services when required",
    domains: ["Personnel", "Incidents", "Escalation", "Zones", "Reporting"],
    config: [
      "Temporary objects and zones",
      "Team assignments",
      "Incident workflows",
    ],
    architecture: [
      "Incident in zone",
      "Officer records",
      "Team leader notified",
      "Response assigned",
      "Documented outcome",
    ],
    note: "Does not replace radio or emergency services.",
  },
  {
    id: "retail",
    title: "Retail Security",
    profile: "Customer-facing security across stores, retail parks and chains.",
    operating: "Store / chain / customer-facing",
    location: "Store hierarchy, multi-location chains",
    workforce: "Store security, supervisors, regional operations",
    objectModel: ["Chain → Store → Zones / stock areas"],
    reporting: "Incident, Specific, Damage with evidence",
    controls: ["Evidence attachment", "Incident categories", "Customer reporting"],
    escalation: "Store management and regional escalation",
    domains: [
      "Reporting",
      "Evidence context",
      "Objects",
      "Escalation",
      "Customer visibility",
      "Future pattern analysis",
    ],
    config: [
      "Store hierarchy",
      "Incident categories",
      "Evidence and customer-facing records",
    ],
    architecture: [
      "Retail incident",
      "Structured report",
      "Evidence attached",
      "Supervisor review",
      "Customer record",
    ],
    note: "Pattern analysis is future direction.",
  },
  {
    id: "corporate",
    title: "Corporate Security",
    profile: "Enterprise offices, headquarters, campuses and corporate facilities.",
    operating: "Offices / campuses / headquarters",
    location: "Facility structure, sensitive zones",
    workforce: "Corporate security, facilities, reception support",
    objectModel: ["Campus → Building → Floor → Zone → Room"],
    reporting: "Incident, Daily, Specific",
    controls: ["Facility patrols", "Risk notes", "Instruction updates"],
    escalation: "Facilities, leadership support, restricted-area response",
    domains: [
      "Objects",
      "Personnel",
      "Reporting",
      "Patrols",
      "Risk context",
      "Escalation",
    ],
    config: [
      "Facility structure",
      "Contractor/visitor context",
      "Sensitive zone instructions",
    ],
    architecture: [
      "Facility observation",
      "Risk note or incident",
      "Supervisor notified",
      "Action assigned",
      "Record retained",
    ],
    note: "No access-control system integrations claimed.",
  },
  {
    id: "healthcare",
    title: "Healthcare Security",
    profile:
      "Hospitals, clinics and healthcare environments where security interacts with staff, patients and visitors.",
    operating: "Hospital / clinic / healthcare facility",
    location: "Public zones and restricted operational areas",
    workforce: "Security, hospital operations, facilities",
    objectModel: ["Campus → Building → Department zones → Restricted areas"],
    reporting: "Incident, Specific, Damage",
    controls: ["Zone context", "Rapid escalation", "Emergency contacts"],
    escalation: "Clinical or emergency coordination where required",
    domains: [
      "Incident reporting",
      "Zones",
      "Escalation",
      "Personnel",
      "Risk context",
    ],
    config: [
      "Public vs restricted zones",
      "Emergency contacts",
      "Incident processes",
    ],
    architecture: [
      "Incident in clinical zone",
      "Structured report",
      "Escalation",
      "Evidence",
      "Follow-up recorded",
    ],
    note: "ISB does not require access to patient medical records for these security workflows. No healthcare certification claimed.",
  },
  {
    id: "education",
    title: "Educational Security",
    profile: "Schools, colleges, universities and campuses.",
    operating: "School / college / campus",
    location: "Campus structure, event spaces",
    workforce: "Campus security, facilities, administration",
    objectModel: ["Campus → Buildings → Zones → Event spaces"],
    reporting: "Incident, Specific, Daily",
    controls: ["Campus hierarchy", "Zone patrols", "Object instructions"],
    escalation: "Administration and facilities",
    domains: [
      "Objects",
      "Zones",
      "Patrols",
      "Incident reporting",
      "Personnel",
      "Escalation",
    ],
    config: [
      "Campus structure",
      "Events and visitor context",
      "Object instructions",
    ],
    architecture: [
      "Campus observation",
      "Zone-level report",
      "Supervisor review",
      "Instruction update",
    ],
    note: "Privacy language remains careful; no unnecessary personal data claims.",
  },
  {
    id: "municipal",
    title: "Municipal Security",
    profile:
      "Municipal buildings and public-facing government locations across multiple sites.",
    operating: "Multiple public buildings / public-facing locations",
    location: "Municipal object portfolio",
    workforce: "Municipal security, facility managers",
    objectModel: ["Municipality → Buildings → Public / sensitive rooms"],
    reporting: "Incident, Specific, Daily",
    controls: ["Multi-site structure", "Audit trail", "Role-scoped access"],
    escalation: "Municipal hierarchy and facility ownership",
    domains: [
      "Reporting",
      "Objects",
      "RBAC",
      "Audit",
      "Escalation",
      "Personnel",
    ],
    config: [
      "Municipal objects",
      "Public areas and sensitive rooms",
      "Object-specific instructions",
    ],
    architecture: [
      "Incident at facility",
      "Report with object context",
      "Escalation path",
      "Audit-ready record",
    ],
    note: "Does not imply police or enforcement powers.",
  },
  {
    id: "government",
    title: "Government Contractors",
    profile:
      "Security providers delivering contracted services to public-sector organizations.",
    operating: "Contracted security across public-sector environments",
    location: "Multiple contracted sites",
    workforce: "Contracted provider staff, compliance officers",
    objectModel: [
      "Provider → Public-sector customer → Objects → Requirements",
    ],
    reporting: "Incident, Specific, Compliance evidence packs",
    controls: [
      "Requirement tracking",
      "Qualification checks",
      "Evidence → audit chain",
    ],
    escalation: "Contractual non-conformance and client oversight",
    domains: [
      "Multi-tenant",
      "Customer context",
      "Objects",
      "Personnel qualifications",
      "Audit",
      "Reporting",
      "Compliance",
    ],
    config: [
      "Contract requirements",
      "Qualification requirements",
      "Evidence and approvals",
    ],
    architecture: [
      "Contract requirement",
      "Object instruction",
      "Assignment",
      "Action",
      "Evidence",
      "Review",
      "Audit trail",
    ],
    note: "No government accreditation claimed.",
  },
];

export function IndustryExplorer() {
  const [active, setActive] = useState<Id>("object");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const current = PROFILES.find((p) => p.id === active)!;

  const select = useCallback((id: Id, i: number) => {
    setActive(id);
    refs.current[i]?.focus();
  }, []);

  function onKey(e: RKEvent<HTMLButtonElement>, i: number) {
    let n = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      n = (i + 1) % PROFILES.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      n = (i - 1 + PROFILES.length) % PROFILES.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      n = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      n = PROFILES.length - 1;
    } else return;
    select(PROFILES[n].id, n);
  }

  return (
    <div className="overflow-hidden border border-border">
      <div className="grid lg:grid-cols-[minmax(0,0.28fr)_minmax(0,0.72fr)]">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Industries"
          className="flex gap-0 overflow-x-auto border-b border-border lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r"
        >
          {PROFILES.map((p, i) => {
            const selected = active === p.id;
            return (
              <button
                key={p.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`ind-tab-${p.id}`}
                aria-selected={selected}
                aria-controls={`ind-panel-${p.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(p.id, i)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "shrink-0 px-4 py-3 text-left text-[13px] font-medium transition-colors",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
                  selected
                    ? "border-b-2 border-gold bg-surface text-ink lg:border-b-0 lg:border-l-2"
                    : "border-b-2 border-transparent text-ink-muted hover:text-ink-secondary lg:border-l-2 lg:border-transparent"
                )}
              >
                {p.title}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`ind-panel-${current.id}`}
          aria-labelledby={`ind-tab-${current.id}`}
          className="min-w-0 overflow-x-auto bg-surface/15 p-4 sm:p-5 md:p-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-5"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                  Operational profile
                </p>
                <h3 className="heading-md mt-1">{current.title}</h3>
                <p className="body mt-2">{current.profile}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 text-[12px]">
                <div className="border border-border-subtle bg-bg/40 p-3">
                  <p className="font-mono text-[9px] text-ink-faint">Operating model</p>
                  <p className="mt-1 text-ink-secondary">{current.operating}</p>
                </div>
                <div className="border border-border-subtle bg-bg/40 p-3">
                  <p className="font-mono text-[9px] text-ink-faint">Location</p>
                  <p className="mt-1 text-ink-secondary">{current.location}</p>
                </div>
                <div className="border border-border-subtle bg-bg/40 p-3">
                  <p className="font-mono text-[9px] text-ink-faint">Workforce</p>
                  <p className="mt-1 text-ink-secondary">{current.workforce}</p>
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <div className="min-w-0">
                  <p className="label mb-2">Object structure</p>
                  <p className="font-mono text-[12px] text-ink-secondary break-words">
                    {current.objectModel.join(" ")}
                  </p>
                  <p className="label mb-2 mt-4">Reporting mix</p>
                  <p className="text-[12px] text-ink-secondary">{current.reporting}</p>
                  <p className="label mb-2 mt-4">Escalation</p>
                  <p className="text-[12px] text-ink-secondary">{current.escalation}</p>
                </div>
                <div className="min-w-0">
                  <p className="label mb-2">Relevant platform domains</p>
                  <div className="flex flex-wrap gap-1.5">
                    {current.domains.map((d) => (
                      <span
                        key={d}
                        className="border border-border-subtle bg-bg/50 px-2 py-1 text-[11px] text-ink-secondary"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                  <p className="label mb-2 mt-4">Configuration emphasis</p>
                  <ul className="space-y-1 text-[12px] text-ink-secondary">
                    {current.config.map((c) => (
                      <li key={c}>· {c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="min-w-0">
                <p className="label mb-2">Architecture pattern</p>
                <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-ink-secondary">
                  {current.architecture.map((a, i) => (
                    <li key={a} className="flex items-center gap-2">
                      {i > 0 && (
                        <span className="text-ink-faint" aria-hidden>
                          →
                        </span>
                      )}
                      <span className="border border-border-subtle bg-bg/40 px-2 py-1">
                        {a}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {current.note && (
                <p className="text-[12px] text-ink-faint">{current.note}</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

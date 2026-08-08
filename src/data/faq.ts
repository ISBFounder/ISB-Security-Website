export type FAQCategoryId =
  | "platform"
  | "availability"
  | "operations"
  | "ai"
  | "security"
  | "technology"
  | "commercial";

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: FAQCategoryId;
};

export const FAQ_CATEGORIES: { id: FAQCategoryId; label: string }[] = [
  { id: "platform", label: "Platform" },
  { id: "availability", label: "Availability & Development" },
  { id: "operations", label: "Operations" },
  { id: "ai", label: "AI" },
  { id: "security", label: "Security & Data" },
  { id: "technology", label: "Technology" },
  { id: "commercial", label: "Commercial & Engagement" },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "what-is-platform",
    category: "platform",
    question: "What is ISB Security Platform?",
    answer:
      "ISB Security Platform is a multi-tenant operational software system designed for professional security organizations. It connects reporting, objects, personnel, operations, governance and AI-assisted workflows through one shared organizational, access and audit context.",
  },
  {
    id: "who-designed-for",
    category: "platform",
    question: "Who is the platform designed for?",
    answer:
      "Private security companies, mobile patrol providers, object and event security, retail, corporate, healthcare, education, municipal and government-contractor security operations. Buyers include operations managers, security coordinators, IT stakeholders and procurement teams evaluating operational software.",
  },
  {
    id: "problems-solved",
    category: "platform",
    question: "What problems is ISB intended to solve?",
    answer:
      "Fragmented security operations where reporting, object instructions, planning, messaging, personnel context and audit information live in separate tools or outside systems. The result is repeated administration, weak handovers, missing context and low traceability. ISB is designed to bring these into one controlled operational context.",
  },
  {
    id: "one-app-or-modules",
    category: "platform",
    question: "Is ISB one application or a collection of separate modules?",
    answer:
      "ISB is one platform with modular capability domains. Domains such as reporting, objects, personnel and operations share the same identity, permission, tenant, object and audit foundations. Modules expand without becoming isolated products.",
  },
  {
    id: "multi-customer-objects",
    category: "platform",
    question: "Can ISB support multiple customers and objects?",
    answer:
      "Yes. The architecture is multi-tenant and tenant-aware. An organization can manage multiple customers and objects while keeping operational context and access scoped. Cross-tenant data access without authorized context is not part of the design model.",
  },
  {
    id: "org-customer-object",
    category: "platform",
    question:
      "How is the platform structured around organizations, customers and objects?",
    answer:
      "Organization → Customers → Objects, with further location hierarchy (buildings, floors, zones, rooms, posts, checkpoints and assets). Users, roles, reports and operational actions attach to this structure so permissions and records remain context-aware.",
  },
  {
    id: "company-vs-platform",
    category: "platform",
    question:
      "What is the difference between ISB Security Solutions and ISB Security Platform?",
    answer:
      "ISB Security Solutions is the company. ISB Security Platform is the product — the operational software system the company is building for professional security organizations.",
  },
  {
    id: "commercially-available",
    category: "availability",
    question: "Is ISB Security Platform commercially available?",
    answer:
      "The platform is under active development. It is not presented as commercially production-available. Organizations can request a demonstration and discuss pilot or early engagement options.",
  },
  {
    id: "what-exists",
    category: "availability",
    question: "What parts of the platform currently exist?",
    answer:
      "Current foundation includes multi-tenant and access foundations, object/location hierarchy foundations, audit foundations, the Specific Report workflow, and the AI-assisted Specific Report MVP. Broader modules are in active development or planned.",
  },
  {
    id: "active-development",
    category: "availability",
    question: "What is currently in active development?",
    answer:
      "Broader reporting workflows, notifications, escalation and supervisor workflows, deeper object and personnel context, mobile-oriented field usability and operational overview. See the Roadmap for the full staged view.",
  },
  {
    id: "implemented-foundation",
    category: "availability",
    question: 'What does "Implemented Foundation" mean?',
    answer:
      "Core capability or architecture exists as part of the current development foundation. It is not automatically a claim that the capability is production-complete for every deployment scenario.",
  },
  {
    id: "planned-meaning",
    category: "availability",
    question: 'What does "Planned" mean?',
    answer:
      "The capability is part of the intended platform direction but is not yet committed to release timing. Placement on the roadmap is not a contractual delivery promise.",
  },
  {
    id: "future-direction",
    category: "availability",
    question: 'What does "Future Direction" mean?',
    answer:
      "Long-term product direction subject to research, validation and prioritization. Future direction items are not committed delivery and should not be treated as near-term availability.",
  },
  {
    id: "roadmap-dates",
    category: "availability",
    question: "Does the roadmap contain release dates?",
    answer:
      "No. The roadmap intentionally avoids quarter labels and artificial deadlines. Stages describe maturity, not a delivery calendar.",
  },
  {
    id: "roadmap-change",
    category: "availability",
    question: "Can roadmap priorities change?",
    answer:
      "Yes. Priorities may change based on technical dependencies, validation outcomes, operational requirements and security considerations. The roadmap is current development direction, not a fixed schedule.",
  },
  {
    id: "multiple-disciplines",
    category: "operations",
    question: "Can ISB support multiple security disciplines?",
    answer:
      "Yes. The platform is designed around shared foundations with environment-specific workflows — including object security, mobile patrol, events, retail, corporate, healthcare, education, municipal and government-contractor contexts.",
  },
  {
    id: "location-hierarchy",
    category: "operations",
    question:
      "Can the platform model buildings, floors, zones and checkpoints?",
    answer:
      "Yes. Object hierarchy foundations include buildings, floors, zones, rooms, posts, checkpoints and assets so operational context can attach at the appropriate level.",
  },
  {
    id: "field-use",
    category: "operations",
    question: "Can officers use ISB in the field?",
    answer:
      "Interfaces are designed with field use in mind. Mobile-oriented workflows and field usability are part of active development. Native mobile apps are not claimed unless released.",
  },
  {
    id: "mobile-patrol",
    category: "operations",
    question: "Does ISB support mobile patrol operations?",
    answer:
      "Mobile patrol is a supported operational environment in the product model. Route continuity, object context and rapid reporting are design goals. Broader patrol workflow expansion is planned or in development depending on the specific capability.",
  },
  {
    id: "offline",
    category: "operations",
    question: "Does ISB support offline use?",
    answer:
      "Offline-capable field workflows are an architecture direction and planned expansion item. They are not presented as fully released. The intended model is local workflow, reconnect, controlled synchronization, conflict handling and audit history.",
  },
  {
    id: "realtime",
    category: "operations",
    question: "Does ISB support realtime updates?",
    answer:
      "Realtime foundations are being designed to support synchronized operational state for authorized users (for example incident status, review state, assignments). Guaranteed zero-latency or millisecond SLAs are not claimed.",
  },
  {
    id: "customer-access",
    category: "operations",
    question:
      "Can customers receive access to their own operational information?",
    answer:
      "Scoped customer visibility and customer portals are planned expansion. They depend on tenant and permission boundaries. Current focus remains the operator-side operational platform.",
  },
  {
    id: "qualifications-assignments",
    category: "operations",
    question: "Can ISB support personnel qualifications and assignments?",
    answer:
      "Assignments are part of the foundation model linking people to objects and operational context. Qualifications, certifications and availability are in active development. Scheduling foundations are planned.",
  },
  {
    id: "ai-reporting-how",
    category: "ai",
    question: "How does AI-assisted reporting work?",
    answer:
      "Field notes can be structured into a draft Specific Report. Suggested extraction and language clarity support are available under the MVP. A human must review the draft. Where the workflow requires approval, a supervisor decides. AI does not finalize the official record alone.",
  },
  {
    id: "ai-automatic",
    category: "ai",
    question: "Does AI write reports automatically?",
    answer:
      "AI can generate a draft from field input. The draft is not an official operational record until human review (and approval where required). Completeness suggestions are guidance, not legal validation.",
  },
  {
    id: "ai-replace-officer",
    category: "ai",
    question: "Does AI replace the security officer?",
    answer:
      "No. AI assists with structure, clarity and extraction. Operational judgment remains with authorized personnel.",
  },
  {
    id: "ai-approve",
    category: "ai",
    question: "Can AI approve a report?",
    answer:
      "No. Approval is a human responsibility where the workflow requires it. AI cannot approve or finalize reports on its own.",
  },
  {
    id: "ai-responsibility",
    category: "ai",
    question: "Who remains responsible for the final report?",
    answer:
      "Authorized users — typically the reviewing officer and, where required, the supervisor. Human accountability is central to the AI operating model.",
  },
  {
    id: "ai-decisions",
    category: "ai",
    question: "Does AI make operational decisions?",
    answer:
      "No. AI does not make final operational decisions, replace escalation procedures, replace supervisors or determine legal compliance.",
  },
  {
    id: "ai-today",
    category: "ai",
    question: "What AI capability exists today?",
    answer:
      "The AI-assisted Specific Report MVP: structured drafting, language clarity support, basic information extraction and a mandatory human review workflow.",
  },
  {
    id: "ai-future",
    category: "ai",
    question: "What AI capabilities are future direction?",
    answer:
      "Operational insights, pattern detection, risk signals, recommendations, Talent & Operations Intelligence and the Team Compatibility Engine. These are staged as planned or future direction and are not current production claims.",
  },
  {
    id: "toi-tce",
    category: "ai",
    question:
      "What are Talent & Operations Intelligence and the Team Compatibility Engine?",
    answer:
      "Future decision-support directions for role-fit insight, training recommendations and team composition support under human review. They are not automated hiring systems, personality diagnosis tools or systems that make employment decisions without human judgment.",
  },
  {
    id: "data-separation",
    category: "security",
    question: "How is data separated between organizations?",
    answer:
      "Through tenant-aware data boundaries and context-scoped access. Shared platform services sit above organization separation. This is not a claim of complete cryptographic isolation guaranteed in every scenario.",
  },
  {
    id: "rbac",
    category: "security",
    question: "Does ISB support role-based access?",
    answer:
      "Yes. The platform is designed around least-privilege role and permission scopes for roles such as officer, supervisor, customer representative (planned expansion) and administrator.",
  },
  {
    id: "audit",
    category: "security",
    question: "How are actions audited?",
    answer:
      "Critical operational actions are designed to be logged and associated with users — for example report creation, review, approval and key configuration changes. Traceable operational actions are the goal; legal immutability is not claimed.",
  },
  {
    id: "iso",
    category: "security",
    question: "Is ISB certified to ISO 27001?",
    answer:
      "No. ISO 27001 readiness is a future compliance direction. No certification is currently claimed or promised.",
  },
  {
    id: "pentest",
    category: "security",
    question: "Has ISB completed external penetration testing?",
    answer:
      "External security testing is part of planned validation. It is not presented as a completed claim on this site.",
  },
  {
    id: "privacy",
    category: "security",
    question: "How does ISB approach privacy?",
    answer:
      "Design aims to collect operationally relevant data, limit access by role and context, separate organizational data and review retention. The product is designed with European privacy requirements in mind. Full GDPR compliance certification is not claimed.",
  },
  {
    id: "backups",
    category: "security",
    question: "How will backups and recovery be handled?",
    answer:
      "Backups, recovery procedures and restore testing are planned validation items. Specific RPO/RTO figures and backup frequencies are not published as tested claims.",
  },
  {
    id: "disclosure",
    category: "security",
    question: "Where can security issues be reported?",
    answer:
      "Security researchers, customers and organizations can report potential issues to info@isbsecuritysolutions.nl. No separate bug bounty or response SLA is claimed beyond direct contact.",
  },
  {
    id: "saas",
    category: "technology",
    question: "Is ISB a multi-tenant SaaS platform?",
    answer:
      "Yes. ISB is designed as a multi-tenant SaaS model with tenant-aware data boundaries and shared platform services.",
  },
  {
    id: "api",
    category: "technology",
    question: "Does ISB have API capabilities?",
    answer:
      "API foundations and a controlled external access boundary are part of the architecture direction. Broader API integration is planned. Specific third-party integrations are not claimed unless implemented.",
  },
  {
    id: "integrations",
    category: "technology",
    question: "Can ISB integrate with other systems?",
    answer:
      "Integration is a planned direction through controlled API boundaries that respect tenant and permission controls. No inventory of live integrations is claimed on this site.",
  },
  {
    id: "offline-arch",
    category: "technology",
    question: "How does offline synchronization fit into the architecture?",
    answer:
      "As a planned expansion: local workflow, temporary offline state, reconnect, controlled synchronization, conflict handling and audit history. Not claimed as fully released.",
  },
  {
    id: "mobile-first",
    category: "technology",
    question: "Is ISB mobile-first?",
    answer:
      "The architecture is intended to support mobile-first field use. Mobile workflow foundations are in active development. Native apps are not claimed unless released.",
  },
  {
    id: "realtime-tech",
    category: "technology",
    question: "How does ISB approach realtime data?",
    answer:
      "Realtime foundations are being designed so authorized users can receive synchronized operational state. Event → platform → authorized users → updated state is the conceptual model. No latency SLA is claimed.",
  },
  {
    id: "modular",
    category: "technology",
    question: "Does the platform use modular architecture?",
    answer:
      "Yes. Capability domains consume shared foundation services (identity, permissions, audit, notifications, data context, API, storage). New modules are not intended to require rebuilding the core. Microservices are not claimed unless that is the actual implementation style.",
  },
  {
    id: "request-demo",
    category: "commercial",
    question: "How can an organization request a demonstration?",
    answer:
      "Use the Request Demo form on the website. Provide operational context so the conversation can focus on relevant environments and current platform maturity.",
  },
  {
    id: "pilot",
    category: "commercial",
    question: "Can an organization discuss a future pilot?",
    answer:
      "Yes. Pilot conversations are welcome. Pilot acceptance is not guaranteed; fit, readiness and capacity determine whether a pilot proceeds.",
  },
  {
    id: "partners",
    category: "commercial",
    question: "Can ISB work with strategic partners?",
    answer:
      "Technology, industry and strategic collaboration conversations can be started via Contact. No formal partnership program is claimed on this site.",
  },
  {
    id: "who-contact",
    category: "commercial",
    question: "Who should contact ISB?",
    answer:
      "Security organizations evaluating the platform, pilot partners, strategic stakeholders and parties with general company or platform enquiries. Contact: info@isbsecuritysolutions.nl.",
  },
  {
    id: "dutch-only",
    category: "commercial",
    question: "Is ISB only intended for Dutch organizations?",
    answer:
      "ISB is based in Tilburg, The Netherlands, with an initial focus on the European security industry. It is not limited exclusively to Dutch organizations.",
  },
  {
    id: "international",
    category: "commercial",
    question: "Is international expansion planned?",
    answer:
      "International scalability is part of the long-term direction. Current focus remains European security operations. International offices or market presence are not claimed.",
  },
];

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
      "The ISB Security Platform is in active development. ISB Security Solutions is building a unified platform for professional security operations, reporting, personnel planning and site management. It has not been announced as commercially available or production-validated, and no public release date has been established.",
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
      "ISB is one platform with modular capability domains. Reporting, objects, personnel and operations are in active development on shared identity, permission and audit foundations. Modules are not separate products, and not every module is available.",
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
      "The development platform includes customer and object hierarchy management. Objects and locations are in active development. The intended structure runs from organization and customer to object and finer locations. It is not presented as a completed production hierarchy.",
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
      "No. The platform has not been announced as commercially available or production-validated. No public release date has been established. Organizations can request a demonstration. A demonstration is not a production release.",
  },
  {
    id: "what-exists",
    category: "availability",
    question: "What parts of the platform currently exist?",
    answer:
      "Foundation established: authentication and role-based access, company-scoped multi-tenant data, scheduling and assignment authority, attendance and finalized worked time, audit and events, bounded financial, billing and payroll-data foundations, an integration outbox, and selected offline reporting and patrol workflows. These are technical foundations, not commercial availability. Security operations, patrols, reporting and recovery, incidents, personnel and workforce management, objects and locations, AI-assisted report drafting, selected mobile workflows, service requests and contracts, document workspaces and client-facing reporting are in active development.",
  },
  {
    id: "active-development",
    category: "availability",
    question: "What is currently in active development?",
    answer:
      "Security operations, patrols, reporting and recovery, incident workflows, personnel and workforce management, objects and locations, AI-assisted report drafting, selected mobile and offline workflows, service requests and contracts, document workspaces and client-facing reporting workflows. Payroll is not a released product. Bounded financial, billing and payroll-data foundations exist and do not make ISB a payroll system.",
  },
  {
    id: "implemented-foundation",
    category: "availability",
    question: 'What does "Foundation established" mean?',
    answer:
      "A technical foundation exists in the development platform. It is not a claim of commercial availability, production validation or completeness for every deployment.",
  },
  {
    id: "discovery-architecture",
    category: "availability",
    question: 'What does "Discovery / architecture" mean?',
    answer:
      "An authority or design question is under study and is not an available capability. This category covers immutable evidence custody, definitive document publication authority, personnel qualification authority, and privacy retention and legal-hold governance.",
  },
  {
    id: "planned-meaning",
    category: "availability",
    question: 'What does "Planned" mean?',
    answer:
      "The capability is part of the intended platform direction. No public release date has been established. Placement on the roadmap is not a contractual delivery promise.",
  },
  {
    id: "future-direction",
    category: "availability",
    question: 'What does "Future / research" mean?',
    answer:
      "Research direction subject to validation and prioritization. Wearable integrations and predictive AI risk analysis are in this category. They are not committed delivery and not near-term availability.",
  },
  {
    id: "roadmap-dates",
    category: "availability",
    question: "Does the roadmap contain release dates?",
    answer:
      "No. No public release date has been established. The public horizons are Now, Next and Later. They describe direction, not a delivery calendar.",
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
      "Objects and locations are in active development, including the customer and object hierarchy. The model is intended to cover buildings, floors, zones, rooms, posts and checkpoints. It is not a completed production hierarchy. Interactive site maps are planned.",
  },
  {
    id: "field-use",
    category: "operations",
    question: "Can officers use ISB in the field?",
    answer:
      "Selected mobile workflows are in active development. Native mobile apps are not claimed.",
  },
  {
    id: "mobile-patrol",
    category: "operations",
    question: "Does ISB support mobile patrol operations?",
    answer:
      "Patrols are in active development. Selected offline reporting and patrol workflows are part of the technical foundation. Not every patrol capability, and not every module, works offline.",
  },
  {
    id: "offline",
    category: "operations",
    question: "Does ISB support offline use?",
    answer:
      "Selected offline reporting and patrol workflows form part of the technical foundation. Selected mobile and offline workflows remain in active development. Not every module works offline.",
  },
  {
    id: "realtime",
    category: "operations",
    question: "Does ISB support realtime updates?",
    answer:
      "No realtime service level is claimed. Synchronized operational state is not presented as a guaranteed live service.",
  },
  {
    id: "customer-access",
    category: "operations",
    question:
      "Can customers receive access to their own operational information?",
    answer:
      "Client-facing reporting workflows are in active development. They are not a released customer-portal product. Access remains company-scoped.",
  },
  {
    id: "qualifications-assignments",
    category: "operations",
    question: "Can ISB support personnel qualifications and assignments?",
    answer:
      "Scheduling and assignment authority are established foundations. Personnel and workforce management is in active development. Personnel qualification authority is in discovery and is not an available qualification system. Payroll is not a released product.",
  },
  {
    id: "payroll-discovery",
    category: "operations",
    question: "Does ISB include payroll?",
    answer:
      "No. Payroll is not a released ISB product. Bounded financial, billing and payroll-data foundations exist in the development platform. They do not make ISB a payroll system, and no payroll integration is announced as available.",
  },
  {
    id: "ai-reporting-how",
    category: "ai",
    question: "How does AI-assisted reporting work?",
    answer:
      "AI-assisted report drafting is in active development. A draft is not an official record. A human must review it, and a supervisor decides where approval is required. AI does not finalize records or make autonomous operational decisions.",
  },
  {
    id: "ai-automatic",
    category: "ai",
    question: "Does AI write reports automatically?",
    answer:
      "AI-assisted drafting can propose a draft from field input while that workflow is in development. The draft is not an official operational record until human review, and approval where required. AI does not make autonomous operational decisions.",
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
      "AI-assisted report drafting remains under development. It is not a completed assistant. Human review is required, and AI does not make the operational decision.",
  },
  {
    id: "ai-future",
    category: "ai",
    question: "What AI capabilities are future research?",
    answer:
      "Predictive AI risk analysis is future research. Connected analytics is planned. Neither is an autonomous decision system, and neither is available now.",
  },
  {
    id: "toi-tce",
    category: "ai",
    question:
      "What are Talent & Operations Intelligence and the Team Compatibility Engine?",
    answer:
      "Those names are not part of the current published platform direction. Predictive AI risk analysis is future research under human control. It is not an automated hiring system and it does not make employment or operational decisions.",
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
      "Yes. Authentication and role-based access foundations exist, and data handling is company-scoped. Client-facing reporting workflows are in active development. This is not a claim that every role is production-validated.",
  },
  {
    id: "audit",
    category: "security",
    question: "How are actions audited?",
    answer:
      "Audit and event foundations exist for critical actions. Immutable evidence custody is in discovery and is not claimed as legally immutable storage.",
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
      "The product is being designed with European privacy requirements in mind. Privacy retention and legal-hold governance are in discovery. No GDPR certification is claimed.",
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
      "An integration outbox is part of the technical foundation. Enterprise connectors are planned. Specific third-party integrations are not claimed as available.",
  },
  {
    id: "integrations",
    category: "technology",
    question: "Can ISB integrate with other systems?",
    answer:
      "Enterprise connectors and alarm-provider integrations are planned. An integration outbox foundation exists. No inventory of live third-party integrations is claimed.",
  },
  {
    id: "offline-arch",
    category: "technology",
    question: "How does offline synchronization fit into the architecture?",
    answer:
      "Selected offline reporting and patrol workflows are part of the technical foundation. Broader offline synchronization is not claimed, and not every module works offline.",
  },
  {
    id: "mobile-first",
    category: "technology",
    question: "Is ISB mobile-first?",
    answer:
      "Selected mobile and offline workflows are in active development. Native apps are not claimed.",
  },
  {
    id: "realtime-tech",
    category: "technology",
    question: "How does ISB approach realtime data?",
    answer:
      "No latency or realtime service level is claimed. Synchronized operational state is not presented as a guaranteed live service.",
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

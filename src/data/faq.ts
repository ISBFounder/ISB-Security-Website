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

export const FAQ_CATEGORY_IDS = [
  "platform",
  "availability",
  "operations",
  "ai",
  "security",
  "technology",
  "commercial",
] as const satisfies readonly FAQCategoryId[];

export const FAQ_ENTRIES: { id: string; category: FAQCategoryId }[] = [
  { id: "what-is-platform", category: "platform" },
  { id: "who-designed-for", category: "platform" },
  { id: "problems-solved", category: "platform" },
  { id: "one-app-or-modules", category: "platform" },
  { id: "multi-customer-objects", category: "platform" },
  { id: "org-customer-object", category: "platform" },
  { id: "company-vs-platform", category: "platform" },
  { id: "commercially-available", category: "availability" },
  { id: "what-exists", category: "availability" },
  { id: "active-development", category: "availability" },
  { id: "implemented-foundation", category: "availability" },
  { id: "discovery-architecture", category: "availability" },
  { id: "planned-meaning", category: "availability" },
  { id: "future-direction", category: "availability" },
  { id: "roadmap-dates", category: "availability" },
  { id: "roadmap-change", category: "availability" },
  { id: "multiple-disciplines", category: "operations" },
  { id: "location-hierarchy", category: "operations" },
  { id: "field-use", category: "operations" },
  { id: "mobile-patrol", category: "operations" },
  { id: "offline", category: "operations" },
  { id: "realtime", category: "operations" },
  { id: "customer-access", category: "operations" },
  { id: "qualifications-assignments", category: "operations" },
  { id: "payroll-discovery", category: "operations" },
  { id: "ai-reporting-how", category: "ai" },
  { id: "ai-automatic", category: "ai" },
  { id: "ai-replace-officer", category: "ai" },
  { id: "ai-approve", category: "ai" },
  { id: "ai-responsibility", category: "ai" },
  { id: "ai-decisions", category: "ai" },
  { id: "ai-today", category: "ai" },
  { id: "ai-future", category: "ai" },
  { id: "toi-tce", category: "ai" },
  { id: "data-separation", category: "security" },
  { id: "rbac", category: "security" },
  { id: "audit", category: "security" },
  { id: "iso", category: "security" },
  { id: "pentest", category: "security" },
  { id: "privacy", category: "security" },
  { id: "backups", category: "security" },
  { id: "disclosure", category: "security" },
  { id: "saas", category: "technology" },
  { id: "api", category: "technology" },
  { id: "integrations", category: "technology" },
  { id: "offline-arch", category: "technology" },
  { id: "mobile-first", category: "technology" },
  { id: "realtime-tech", category: "technology" },
  { id: "modular", category: "technology" },
  { id: "request-demo", category: "commercial" },
  { id: "pilot", category: "commercial" },
  { id: "partners", category: "commercial" },
  { id: "who-contact", category: "commercial" },
  { id: "dutch-only", category: "commercial" },
  { id: "international", category: "commercial" },
];

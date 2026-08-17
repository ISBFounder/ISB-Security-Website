export const SITE = {
  name: "ISB Security Solutions",
  product: "ISB Security Platform",
  url: "https://isbsecuritysolutions.nl",
  email: "info@isbsecuritysolutions.nl",
  location: "Tilburg, The Netherlands",
  kvk: "42099496",
  mission:
    "Transform the European security industry through one intelligent operational platform.",
  vision:
    "Replace paper reporting, spreadsheets, disconnected messaging tools and fragmented operational systems with one secure, modular and AI-assisted security operations ecosystem.",
} as const;

/** Controlled legal policy date — do not auto-update on every build */
export const LEGAL_LAST_UPDATED = "8 August 2026";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export const NAV = {
  platform: [
    { label: "Platform Overview", href: "/platform", description: "Architecture and operational model" },
    { label: "Features", href: "/features", description: "Capability catalogue by status" },
    { label: "Technology", href: "/technology", description: "Technical foundations" },
    { label: "Security", href: "/security", description: "Access, separation and audit" },
    { label: "AI", href: "/ai", description: "Assisted reporting under human control" },
    { label: "Roadmap", href: "/roadmap", description: "Foundation through future direction" },
  ] as const satisfies readonly NavLink[],
  solutions: [
    { label: "Private Security Companies", href: "/solutions#security-companies", description: "Multi-client operational control" },
    { label: "Object Security", href: "/solutions#object-security", description: "Site hierarchy and escalation" },
    { label: "Mobile Patrol", href: "/solutions#mobile-patrol", description: "Field reporting and checkpoints" },
    { label: "Event Security", href: "/solutions#event-security", description: "Temporary deployments" },
    { label: "Retail Security", href: "/solutions#retail", description: "Multi-location consistency" },
    { label: "Corporate Security", href: "/solutions#corporate", description: "Enterprise auditability" },
    { label: "Healthcare Security", href: "/solutions#healthcare", description: "Sensitive environments" },
    { label: "Education Security", href: "/solutions#education", description: "Campus and facilities" },
    { label: "Municipal Security", href: "/solutions#government", description: "Public-sector accountability" },
    { label: "Government Contractors", href: "/solutions#government", description: "Governance-ready operations" },
  ] as const satisfies readonly NavLink[],
  company: [
    { label: "About ISB", href: "/about", description: "Mission and operating context" },
    { label: "Freelance Security", href: "/freelance-security", description: "Independent security assignments" },
    { label: "Roadmap", href: "/roadmap", description: "Product direction" },
    { label: "FAQ", href: "/faq", description: "Common questions" },
    { label: "Contact", href: "/contact", description: "General enquiries" },
  ] as const satisfies readonly NavLink[],
  /** Top-level direct links (no dropdown) */
  direct: [
    { label: "Industries", href: "/industries" },
    { label: "Technology", href: "/technology" },
    { label: "Security", href: "/security" },
    { label: "AI", href: "/ai" },
  ] as const satisfies readonly NavLink[],
  /** Legacy main list kept for Footer if needed */
  main: [
    { label: "Platform", href: "/platform" },
    { label: "Solutions", href: "/solutions" },
    { label: "Features", href: "/features" },
    { label: "Industries", href: "/industries" },
    { label: "Technology", href: "/technology" },
    { label: "Security", href: "/security" },
    { label: "AI", href: "/ai" },
    { label: "About", href: "/about" },
  ] as const,
} as const;

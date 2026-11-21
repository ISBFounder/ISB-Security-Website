export const SITE = {
  name: "ISB Security Solutions",
  product: "ISB Security Platform",
  url: "https://www.isbsecuritysolutions.nl",
  email: "info@isbsecuritysolutions.nl",
  location: "Tilburg, The Netherlands",
  kvk: "42099496",
  mission:
    "Build a unified Security Operations Platform for professional security organizations.",
  vision:
    "Replace fragmented reporting software, rostering tools, personnel systems, incident tools, messaging, compliance administration and spreadsheets with one multi-tenant Security OS.",
} as const;

/** Controlled legal policy date — do not auto-update on every build */
export const LEGAL_LAST_UPDATED = "8 August 2026";

export type NavLink = {
  id: string;
  href: string;
};

export const NAV = {
  platform: [
    { id: "overview", href: "/platform" },
    { id: "features", href: "/features" },
    { id: "technology", href: "/technology" },
    { id: "security", href: "/security" },
    { id: "ai", href: "/ai" },
    { id: "roadmap", href: "/roadmap" },
  ] as const satisfies readonly NavLink[],
  solutions: [
    { id: "companies", href: "/solutions#security-companies" },
    { id: "object", href: "/solutions#object-security" },
    { id: "patrol", href: "/solutions#mobile-patrol" },
    { id: "event", href: "/solutions#event-security" },
    { id: "retail", href: "/solutions#retail" },
    { id: "corporate", href: "/solutions#corporate" },
    { id: "healthcare", href: "/solutions#healthcare" },
    { id: "education", href: "/solutions#education" },
    { id: "municipal", href: "/solutions#government" },
    { id: "contractors", href: "/solutions#government" },
  ] as const satisfies readonly NavLink[],
  company: [
    { id: "about", href: "/about" },
    { id: "freelance", href: "/freelance-security" },
    { id: "roadmap", href: "/roadmap" },
    { id: "faq", href: "/faq" },
    { id: "contact", href: "/contact" },
  ] as const satisfies readonly NavLink[],
  direct: [
    { id: "industries", href: "/industries" },
    { id: "technology", href: "/technology" },
    { id: "security", href: "/security" },
    { id: "ai", href: "/ai" },
  ] as const satisfies readonly NavLink[],
} as const;

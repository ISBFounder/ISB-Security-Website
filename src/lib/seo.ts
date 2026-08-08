import { SITE } from "@/lib/constants";

export const DEFAULT_DESCRIPTION =
  "ISB Security Solutions develops ISB Security Platform, a modular security operations platform for reporting, objects, personnel, operational workflows, compliance and AI-assisted reporting.";

export function absoluteUrl(path: string = "/"): string {
  if (path.startsWith("http")) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${p === "/" ? "" : p}`;
}

export function routeMetadata(opts: {
  title: string;
  description: string;
  path: string;
}) {
  const url = absoluteUrl(opts.path);
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${opts.title} | ${SITE.name}`,
      description: opts.description,
      url,
      siteName: SITE.name,
      type: "website" as const,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${opts.title} | ${SITE.name}`,
      description: opts.description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tilburg",
      addressCountry: "NL",
    },
    identifier: {
      "@type": "PropertyValue",
      name: "KVK",
      value: SITE.kvk,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.product,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Modular security operations platform for professional security organizations — reporting, objects, personnel, operational workflows, compliance and AI-assisted reporting under human control. Platform under active development.",
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageJsonLd(
  items: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

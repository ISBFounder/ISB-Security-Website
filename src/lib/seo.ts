import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const DEFAULT_DESCRIPTION =
  "ISB Security Solutions is building the ISB Security Platform for professional security operations, reporting, personnel planning and site management. The platform is in active development.";

export function absoluteUrl(path: string = "/"): string {
  if (path.startsWith("http")) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${p === "/" ? "" : p}`;
}

export function routeMetadata(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(opts.path);
  const socialTitle = `${opts.title} | ${SITE.name}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description: opts.description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
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
    logo: absoluteUrl("/logo.jpg"),
    image: absoluteUrl("/logo.jpg"),
    identifier: {
      "@type": "PropertyValue",
      name: "KVK",
      value: SITE.kvk,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "enquiries",
      email: SITE.email,
      areaServed: "NL",
      availableLanguage: ["English"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: "en",
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
    url: absoluteUrl("/platform"),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "The ISB Security Platform is in active development for professional security operations, reporting, personnel planning and site management. It has not been announced as commercially available or production-validated. AI-assisted reporting does not make autonomous operational decisions.",
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

import type { Metadata } from "next";
import { absoluteLocaleUrl } from "@/i18n/paths";
import type { Locale } from "@/i18n/routing";
import { SITE } from "@/lib/constants";

export const DEFAULT_DESCRIPTION =
  "ISB Security Solutions is building the ISB Security Platform for professional security operations, reporting, personnel planning and site management. The platform is in active development.";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  nl: "nl_NL",
};

export function absoluteUrl(path: string = "/"): string {
  if (path.startsWith("http")) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${p === "/" ? "" : p}`;
}

export function routeMetadata(opts: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  ogDescription?: string;
  twitterDescription?: string;
}): Metadata {
  const url = absoluteLocaleUrl(opts.locale, opts.path);
  const socialTitle = opts.absoluteTitle
    ? opts.title
    : `${opts.title} | ${SITE.name}`;
  const ogDescription = opts.ogDescription ?? opts.description;
  const twitterDescription = opts.twitterDescription ?? opts.description;
  const languages = {
    en: absoluteLocaleUrl("en", opts.path),
    nl: absoluteLocaleUrl("nl", opts.path),
    "x-default": absoluteLocaleUrl("en", opts.path),
  };
  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description: opts.description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: socialTitle,
      description: ogDescription,
      url,
      siteName: SITE.name,
      type: "website",
      locale: OG_LOCALE[opts.locale],
      alternateLocale: opts.locale === "nl" ? ["en_US"] : ["nl_NL"],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: twitterDescription,
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
      availableLanguage: ["English", "Dutch"],
    },
  };
}

export function websiteJsonLd(opts: { locale: Locale; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: opts.locale,
    description: opts.description,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
}

export function softwareApplicationJsonLd(opts: {
  locale: Locale;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.product,
    url: absoluteLocaleUrl(opts.locale, "/platform"),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: opts.locale,
    description: opts.description,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
}

export function breadcrumbJsonLd(
  locale: Locale,
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteLocaleUrl(locale, item.path),
    })),
  };
}

export function faqPageJsonLd(
  items: { question: string; answer: string }[],
  locale?: Locale
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(locale ? { inLanguage: locale } : {}),
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

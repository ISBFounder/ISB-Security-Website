import type { MetadataRoute } from "next";
import { absoluteLocaleUrl } from "@/i18n/paths";
import { routing, type Locale } from "@/i18n/routing";

const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/platform", priority: 0.9 },
  { path: "/features", priority: 0.85 },
  { path: "/solutions", priority: 0.85 },
  { path: "/industries", priority: 0.8 },
  { path: "/technology", priority: 0.8 },
  { path: "/security", priority: 0.8 },
  { path: "/ai", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/freelance-security", priority: 0.7 },
  { path: "/roadmap", priority: 0.7 },
  { path: "/faq", priority: 0.65 },
  { path: "/contact", priority: 0.7 },
  { path: "/request-demo", priority: 0.75 },
  { path: "/privacy", priority: 0.35 },
  { path: "/terms", priority: 0.35 },
  { path: "/cookies", priority: 0.3 },
];

/** Public content revision reflected by this sitemap. Not regenerated per request. */
const LAST_MODIFIED = new Date("2026-11-21T00:00:00.000Z");

function languages(path: string): Record<string, string> {
  return {
    en: absoluteLocaleUrl("en", path),
    nl: absoluteLocaleUrl("nl", path),
    "x-default": absoluteLocaleUrl("en", path),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of routing.locales) {
    for (const route of routes) {
      entries.push({
        url: absoluteLocaleUrl(locale as Locale, route.path),
        lastModified: LAST_MODIFIED,
        priority: route.priority,
        alternates: { languages: languages(route.path) },
      });
    }
  }
  return entries;
}

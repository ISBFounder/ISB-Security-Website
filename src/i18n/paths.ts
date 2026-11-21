import { SITE } from "@/lib/constants";
import type { Locale } from "./routing";

export const PUBLIC_PATHS = [
  "/",
  "/platform",
  "/features",
  "/solutions",
  "/industries",
  "/technology",
  "/security",
  "/ai",
  "/about",
  "/freelance-security",
  "/roadmap",
  "/faq",
  "/contact",
  "/request-demo",
  "/privacy",
  "/terms",
  "/cookies",
] as const;

export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return normalized;
  return normalized === "/" ? "/nl" : `/nl${normalized}`;
}

export function absoluteLocaleUrl(locale: Locale, path: string): string {
  const localized = localePath(locale, path);
  return localized === "/" ? SITE.url : `${SITE.url}${localized}`;
}

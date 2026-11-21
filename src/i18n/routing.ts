import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "nl"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // URL decides the locale. Accept-Language and the preference cookie must not redirect.
  localeDetection: false,
  // The cookie is set only by the language control, not by this middleware.
  localeCookie: false,
});

export type Locale = (typeof routing.locales)[number];

export const LOCALE_COOKIE = "isb_locale";
export const LOCALE_SUGGEST_COOKIE = "isb_locale_suggest";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

export function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

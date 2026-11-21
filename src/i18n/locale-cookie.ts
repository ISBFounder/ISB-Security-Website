import {
  isLocale,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_SUGGEST_COOKIE,
  type Locale,
} from "./routing";

function secureAttribute(): string {
  return window.location.protocol === "https:" ? "; Secure" : "";
}

export function readCookie(name: string): string | null {
  const prefix = `${name}=`;
  const row = document.cookie
    .split("; ")
    .find((part) => part.startsWith(prefix));
  if (!row) return null;
  return decodeURIComponent(row.slice(prefix.length));
}

/** Explicit visitor choice only. Middleware must not write this cookie. */
export function writeLocaleCookie(locale: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax${secureAttribute()}`;
}

/** Session cookie. A later visit may suggest again. */
export function writeSuggestDismissed(): void {
  document.cookie = `${LOCALE_SUGGEST_COOKIE}=1; Path=/; SameSite=Lax${secureAttribute()}`;
}

export function readSavedLocale(): Locale | null {
  const value = readCookie(LOCALE_COOKIE);
  return value && isLocale(value) ? value : null;
}

/** First official locale in the browser list. Not a redirect. */
export function preferredOfficialLocale(
  languages: readonly string[]
): Locale | null {
  for (const tag of languages) {
    const base = tag.toLowerCase().split("-")[0];
    if (base === "nl" || base === "en") return base;
  }
  return null;
}

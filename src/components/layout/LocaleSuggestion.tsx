"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  preferredOfficialLocale,
  readCookie,
  readSavedLocale,
  writeLocaleCookie,
  writeSuggestDismissed,
} from "@/i18n/locale-cookie";
import { isLocale, LOCALE_SUGGEST_COOKIE, type Locale } from "@/i18n/routing";

const COPY: Record<
  Locale,
  { suggest: string; saved: string; dismiss: string }
> = {
  nl: {
    suggest: "Deze site is ook beschikbaar in het Nederlands.",
    saved: "U heeft eerder Nederlands gekozen.",
    dismiss: "Niet nu",
  },
  en: {
    suggest: "This site is also available in English.",
    saved: "You previously chose English.",
    dismiss: "Not now",
  },
};

const NAMES: Record<Locale, string> = {
  nl: "Nederlands",
  en: "English",
};

type Offer = { locale: Locale; saved: boolean };

export function LocaleSuggestion() {
  const pageLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [offer, setOffer] = useState<Offer | null>(null);

  useEffect(() => {
    if (!isLocale(pageLocale)) return;
    if (readCookie(LOCALE_SUGGEST_COOKIE)) return;
    const saved = readSavedLocale();
    if (saved) {
      if (saved !== pageLocale) setOffer({ locale: saved, saved: true });
      return;
    }
    const languages =
      navigator.languages && navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language];
    const preferred = preferredOfficialLocale(languages);
    if (preferred && preferred !== pageLocale) {
      setOffer({ locale: preferred, saved: false });
    }
  }, [pageLocale]);

  if (!offer) return null;

  const copy = COPY[offer.locale];

  function accept() {
    writeLocaleCookie(offer!.locale);
    const search = window.location.search;
    const hash = window.location.hash;
    router.replace(`${pathname}${search}${hash}`, { locale: offer!.locale });
    setOffer(null);
  }

  function dismiss() {
    writeSuggestDismissed();
    setOffer(null);
  }

  return (
    <div className="border-b border-border bg-bg-secondary/80" lang={offer.locale}>
      <div className="container-site flex flex-wrap items-center justify-between gap-3 py-3">
        <p className="text-[13px] text-ink-secondary">
          {offer.saved ? copy.saved : copy.suggest}
        </p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="min-h-11 text-[13px] font-medium text-gold hover:text-gold-light lg:min-h-0"
            onClick={accept}
          >
            {NAMES[offer.locale]}
          </button>
          <button
            type="button"
            className="min-h-11 text-[13px] text-ink-muted hover:text-ink lg:min-h-0"
            onClick={dismiss}
          >
            {copy.dismiss}
          </button>
        </div>
      </div>
    </div>
  );
}

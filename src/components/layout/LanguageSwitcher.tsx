"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { writeLocaleCookie } from "@/i18n/locale-cookie";
import { isLocale, routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const NAMES: Record<Locale, string> = {
  nl: "Nederlands",
  en: "English",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const current: Locale = isLocale(locale) ? locale : "en";
  const t = useTranslations("chrome");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Partial<Record<Locale, HTMLButtonElement | null>>>({});
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    optionRefs.current[current]?.focus();
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, current]);

  function choose(next: Locale) {
    setOpen(false);
    if (next === current) {
      buttonRef.current?.focus();
      return;
    }
    writeLocaleCookie(next);
    const search = window.location.search;
    const hash = window.location.hash;
    router.replace(`${pathname}${search}${hash}`, { locale: next });
  }

  function onOptionKey(event: ReactKeyboardEvent<HTMLButtonElement>, code: Locale) {
    const index = routing.locales.indexOf(code);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const delta = event.key === "ArrowDown" ? 1 : -1;
      const next = routing.locales[(index + delta + routing.locales.length) % routing.locales.length];
      optionRefs.current[next]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      optionRefs.current[routing.locales[0]]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      optionRefs.current[routing.locales[routing.locales.length - 1]]?.focus();
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex min-h-11 items-center gap-1 px-2 py-2 text-[13px] font-medium text-ink-secondary transition-colors hover:text-ink lg:min-h-0 lg:px-2.5"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={t("languageMenu", { language: NAMES[current] })}
        onClick={() => setOpen((value) => !value)}
      >
        <span lang={current}>{NAMES[current]}</span>
        <ChevronDown
          className={cn("h-3.5 w-3.5 opacity-50 transition-transform duration-150", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={t("language")}
          className="absolute right-0 top-full z-[70] mt-1 min-w-[10.5rem] border border-border bg-bg-secondary py-1 shadow-elevated"
        >
          {routing.locales.map((code) => {
            const selected = code === current;
            return (
              <li key={code} role="presentation">
                <button
                  ref={(element) => {
                    optionRefs.current[code] = element;
                  }}
                  type="button"
                  role="option"
                  lang={code}
                  aria-selected={selected}
                  className={cn(
                    "flex min-h-11 w-full items-center px-3 text-left text-[13px] font-medium",
                    selected ? "text-gold" : "text-ink-secondary hover:bg-surface hover:text-ink"
                  )}
                  onClick={() => choose(code)}
                  onKeyDown={(event) => onOptionKey(event, code)}
                >
                  {NAMES[code]}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

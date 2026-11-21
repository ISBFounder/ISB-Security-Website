"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type KeyboardEvent as RKEvent,
} from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { NavigationLink } from "./NavigationLink";
import { MegaMenuPanel, type MegaItem } from "./MegaMenuPanel";

type MenuId = "platform" | "solutions" | "company" | null;

const MENU_IDS = ["platform", "solutions", "company"] as const;

export function DesktopNavigation() {
  const [open, setOpen] = useState<MenuId>(null);
  const pathname = usePathname();
  const t = useTranslations("chrome");
  const navRef = useRef<HTMLElement>(null);
  const triggers = useRef<Partial<Record<NonNullable<MenuId>, HTMLButtonElement | null>>>({});

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      const target = e.target as Node;
      const inNav = navRef.current?.contains(target);
      const inPanel = (target as Element).closest?.("[data-mega-panel]");
      if (!inNav && !inPanel) close();
    }
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        const id = open;
        close();
        if (id) triggers.current[id]?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  function toggle(id: NonNullable<MenuId>) {
    setOpen((prev) => (prev === id ? null : id));
  }

  function onTriggerKey(e: RKEvent<HTMLButtonElement>, id: NonNullable<MenuId>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(id);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(id);
    }
  }

  function itemsFor(menu: (typeof MENU_IDS)[number]): MegaItem[] {
    return NAV[menu].map((item) => ({
      id: item.id,
      href: item.href,
      label: t(`nav.${menu}.${item.id}`),
      description: t(`nav.${menu}.${item.id}Desc`),
    }));
  }

  return (
    <>
      <nav ref={navRef} className="hidden items-center gap-0.5 lg:flex" aria-label={t("primaryNav")}>
        {MENU_IDS.map((id) => {
          const isOpen = open === id;
          const panelId = `mega-${id}`;
          return (
            <button
              key={id}
              ref={(el) => {
                triggers.current[id] = el;
              }}
              type="button"
              className={cn(
                "inline-flex items-center gap-1 px-2.5 py-2 text-[13px] font-medium transition-colors",
                isOpen ? "text-ink" : "text-ink-secondary hover:text-ink"
              )}
              aria-expanded={isOpen}
              aria-haspopup="true"
              aria-controls={panelId}
              onClick={() => toggle(id)}
              onKeyDown={(e) => onTriggerKey(e, id)}
            >
              {t(`nav.${id}.label`)}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 opacity-50 transition-transform duration-150",
                  isOpen && "rotate-180"
                )}
                aria-hidden
              />
            </button>
          );
        })}

        {NAV.direct.map((item) => (
          <NavigationLink key={item.id} href={item.href}>
            {t(`nav.direct.${item.id}`)}
          </NavigationLink>
        ))}
      </nav>

      <AnimatePresence>
        {MENU_IDS.map(
          (id) =>
            open === id && (
              <div key={id} data-mega-panel>
                <MegaMenuPanel
                  id={`mega-${id}`}
                  title={t(`nav.${id}.label`)}
                  summary={t(`nav.${id}.summary`)}
                  items={itemsFor(id)}
                  featured={{
                    title: t(`nav.${id}.featuredTitle`),
                    description: t(`nav.${id}.featuredBody`),
                    href: id === "company" ? "/roadmap" : `/${id === "platform" ? "platform" : "solutions"}`,
                  }}
                  onNavigate={close}
                />
              </div>
            )
        )}
      </AnimatePresence>
    </>
  );
}

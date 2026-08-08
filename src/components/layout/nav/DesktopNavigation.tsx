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
import { NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { NavigationLink } from "./NavigationLink";
import { MegaMenuPanel } from "./MegaMenuPanel";

type MenuId = "platform" | "solutions" | "company" | null;

const MENUS: {
  id: NonNullable<MenuId>;
  label: string;
  summary: string;
  items: typeof NAV.platform | typeof NAV.solutions | typeof NAV.company;
  featured?: { title: string; description: string; href: string };
}[] = [
  {
    id: "platform",
    label: "Platform",
    summary:
      "Architecture, capabilities and product direction for operational control.",
    items: NAV.platform,
    featured: {
      title: "ISB Security Platform",
      description: "Platform development active. Explore the operational model.",
      href: "/platform",
    },
  },
  {
    id: "solutions",
    label: "Solutions",
    summary: "How the platform maps to professional security environments.",
    items: NAV.solutions,
    featured: {
      title: "Sector fit",
      description:
        "Modular relevance across private, institutional and public-sector operations.",
      href: "/solutions",
    },
  },
  {
    id: "company",
    label: "Company",
    summary: "About ISB, product direction and how to get in touch.",
    items: NAV.company,
    featured: {
      title: "Product direction",
      description:
        "Transparent roadmap from foundation through future intelligence.",
      href: "/roadmap",
    },
  },
];

export function DesktopNavigation() {
  const [open, setOpen] = useState<MenuId>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const triggers = useRef<Partial<Record<NonNullable<MenuId>, HTMLButtonElement | null>>>({});

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      const t = e.target as Node;
      const inNav = navRef.current?.contains(t);
      const inPanel = (t as Element).closest?.("[data-mega-panel]");
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

  return (
    <>
      <nav ref={navRef} className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
        {MENUS.map((menu) => {
          const isOpen = open === menu.id;
          const panelId = `mega-${menu.id}`;
          return (
            <button
              key={menu.id}
              ref={(el) => {
                triggers.current[menu.id] = el;
              }}
              type="button"
              className={cn(
                "inline-flex items-center gap-1 px-2.5 py-2 text-[13px] font-medium transition-colors",
                isOpen ? "text-ink" : "text-ink-secondary hover:text-ink"
              )}
              aria-expanded={isOpen}
              aria-haspopup="true"
              aria-controls={panelId}
              onClick={() => toggle(menu.id)}
              onKeyDown={(e) => onTriggerKey(e, menu.id)}
            >
              {menu.label}
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
          <NavigationLink key={item.href} href={item.href}>
            {item.label}
          </NavigationLink>
        ))}
      </nav>

      <AnimatePresence>
        {MENUS.map(
          (menu) =>
            open === menu.id && (
              <div key={menu.id} data-mega-panel>
                <MegaMenuPanel
                  id={`mega-${menu.id}`}
                  title={menu.label}
                  summary={menu.summary}
                  items={menu.items}
                  featured={menu.featured}
                  onNavigate={close}
                />
              </div>
            )
        )}
      </AnimatePresence>
    </>
  );
}

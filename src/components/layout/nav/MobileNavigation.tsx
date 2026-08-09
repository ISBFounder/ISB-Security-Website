"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { NAV } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { NavigationLink } from "./NavigationLink";
import { MobileDisclosure } from "./MobileDisclosure";

type Props = {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

export function MobileNavigation({ open, onClose, triggerRef }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Focus trap + initial focus
  useEffect(() => {
    if (!open || !panelRef.current) return;

    const panel = panelRef.current;
    const focusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter(
        (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
      );

    const list = focusables();
    list[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    panel.addEventListener("keydown", onKey);
    return () => panel.removeEventListener("keydown", onKey);
  }, [open, onClose, triggerRef]);

  // Body scroll lock (iOS-friendly)
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevWidth = document.body.style.width;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.top = prevTop;
      document.body.style.width = prevWidth;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  return (
    <motion.div
      ref={panelRef}
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Main navigation"
      initial={reduce ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -6 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed inset-x-0 bottom-0 top-14 z-[55] overflow-y-auto overscroll-contain border-t border-border-subtle bg-bg lg:hidden"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div className="container-site space-y-1 py-4 pb-10">
        <MobileDisclosure title="Platform" defaultOpen>
          {NAV.platform.map((item) => (
            <NavigationLink
              key={item.href}
              href={item.href}
              variant="mobile"
              onNavigate={onClose}
            >
              {item.label}
            </NavigationLink>
          ))}
        </MobileDisclosure>

        <MobileDisclosure title="Solutions">
          {NAV.solutions.map((item) => (
            <NavigationLink
              key={item.href + item.label}
              href={item.href}
              variant="mobile"
              onNavigate={onClose}
            >
              {item.label}
            </NavigationLink>
          ))}
        </MobileDisclosure>

        <MobileDisclosure title="Company">
          {NAV.company.map((item) => (
            <NavigationLink
              key={item.href}
              href={item.href}
              variant="mobile"
              onNavigate={onClose}
            >
              {item.label}
            </NavigationLink>
          ))}
        </MobileDisclosure>

        {NAV.direct.map((item) => (
          <NavigationLink
            key={item.href}
            href={item.href}
            variant="mobile"
            onNavigate={onClose}
          >
            {item.label}
          </NavigationLink>
        ))}

        <div className="mt-6 space-y-3 border-t border-border-subtle pt-6">
          <NavigationLink href="/contact" variant="mobile" onNavigate={onClose}>
            Contact
          </NavigationLink>
          <Button href="/request-demo" className="w-full" onClick={onClose}>
            Request Demo
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

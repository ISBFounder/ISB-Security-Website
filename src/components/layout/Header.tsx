"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { DesktopNavigation } from "./nav/DesktopNavigation";
import { MobileNavigation } from "./nav/MobileNavigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMobile();
        menuBtnRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, closeMobile]);

  function toggleMobile() {
    setMobileOpen((v) => {
      if (v) {
        requestAnimationFrame(() => menuBtnRef.current?.focus());
      }
      return !v;
    });
  }

  const mobilePanel =
    mounted &&
    createPortal(
      <AnimatePresence mode="wait">
        {mobileOpen ? (
          <MobileNavigation
            key="mobile-nav"
            open={mobileOpen}
            onClose={closeMobile}
            triggerRef={menuBtnRef}
          />
        ) : null}
      </AnimatePresence>,
      document.body
    );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,border-color] duration-[280ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
          scrolled ? "glass-nav-scrolled" : "glass-nav"
        )}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <div
          className={cn(
            "container-site flex items-center justify-between transition-[height] duration-[280ms]",
            scrolled ? "h-12 lg:h-14" : "h-14 lg:h-16"
          )}
        >
          <Logo size="sm" />

          <DesktopNavigation />

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/contact"
              className="px-2.5 py-2 text-[13px] font-medium text-ink-secondary transition-colors hover:text-ink"
            >
              Contact
            </Link>
            <Button href="/request-demo" size="sm">
              Request Demo
            </Button>
          </div>

          <button
            ref={menuBtnRef}
            type="button"
            className="relative z-[60] flex h-11 w-11 items-center justify-center text-ink-secondary hover:text-ink lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={toggleMobile}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </header>

      {mobilePanel}
    </>
  );
}

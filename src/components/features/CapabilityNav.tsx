"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const CATS = [
  { id: "reporting", label: "Reporting" },
  { id: "organizations", label: "Organizations" },
  { id: "objects", label: "Objects" },
  { id: "personnel", label: "Personnel" },
  { id: "operations", label: "Operations" },
  { id: "security", label: "Security" },
  { id: "intelligence", label: "Intelligence" },
] as const;

export function CapabilityNav() {
  const [active, setActive] = useState("reporting");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    CATS.forEach((c) => {
      const el = document.getElementById(c.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(c.id);
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      aria-label="Capability categories"
      className="sticky top-16 z-20 -mx-5 border-b border-border bg-bg/95 px-5 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:top-16"
    >
      <div className="container-site flex gap-0 overflow-x-auto">
        {CATS.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className={cn(
              "shrink-0 border-b-2 px-3 py-3 text-[12px] font-medium transition-colors sm:px-4 sm:text-[13px]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
              active === c.id
                ? "border-gold text-ink"
                : "border-transparent text-ink-muted hover:text-ink-secondary"
            )}
          >
            {c.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

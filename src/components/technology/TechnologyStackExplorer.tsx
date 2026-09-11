"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { osPanelTransition } from "@/lib/motion";

type LayerId = "experience" | "domain" | "services" | "foundation";

const LAYERS: {
  id: LayerId;
  index: string;
  title: string;
  purpose: string;
  items: string[];
}[] = [
  {
    id: "experience",
    index: "01",
    title: "Experience layer",
    purpose: "Operational workspaces officers and supervisors actually use.",
    items: ["Command", "Reporting", "Objects", "Personnel", "Mobile field notes"],
  },
  {
    id: "domain",
    index: "02",
    title: "Domain layer",
    purpose: "Operational domains over one shared context — not separate products.",
    items: [
      "Operations",
      "Reporting",
      "People",
      "Objects",
      "Compliance",
      "Intelligence",
    ],
  },
  {
    id: "services",
    index: "03",
    title: "Platform services",
    purpose: "Shared services every domain inherits.",
    items: [
      "Identity",
      "Authorization",
      "Audit",
      "Notifications",
      "Storage foundations",
      "API foundations",
    ],
  },
  {
    id: "foundation",
    index: "04",
    title: "Data / security foundation",
    purpose: "Tenant isolation, controlled access and integrity concepts.",
    items: [
      "Tenant-aware boundaries",
      "Row-level access direction",
      "Environment separation",
      "Secure storage foundations",
    ],
  },
];

export function TechnologyStackExplorer() {
  const [active, setActive] = useState<LayerId>("domain");
  const reduce = useReducedMotion();
  const current = LAYERS.find((l) => l.id === active)!;

  return (
    <div>
      <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
        Experience depends on domain · domain depends on services · services rest on foundation
      </p>
      <div className="relative space-y-0">
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 left-[7px] top-3 w-px bg-border"
        />
        {LAYERS.map((layer, idx) => {
          const selected = active === layer.id;
          const isFoundation = layer.id === "foundation";
          return (
            <button
              key={layer.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(layer.id)}
              className={cn(
                "relative w-full px-4 py-3 text-left transition-[background-color,border-color,box-shadow] duration-150",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
                idx > 0 && "-mt-px",
                selected
                  ? "surface-3 text-ink os-selected z-[1]"
                  : isFoundation
                    ? "border border-border bg-surface/40 text-ink-secondary hover:text-ink"
                    : "border border-border-subtle bg-bg/30 text-ink-secondary hover:text-ink"
              )}
              style={{ marginLeft: `${idx * 16}px`, width: `calc(100% - ${idx * 16}px)` }}
            >
              <span className="font-mono text-[9px] text-ink-faint">
                {layer.index}
              </span>
              <span className="ml-2 text-[13px] font-medium">{layer.title}</span>
              <span className="mt-0.5 block text-[11px] text-ink-faint">{layer.purpose}</span>
            </button>
          );
        })}
      </div>
      <motion.div
        key={current.id}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={osPanelTransition}
        className="mt-3 border border-border bg-bg/40 px-4 py-4"
        aria-live="polite"
      >
        <p className="text-[13px] text-ink-secondary">{current.purpose}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {current.items.map((item) => (
            <span
              key={item}
              className="border border-border-subtle bg-surface/40 px-2.5 py-1 text-[12px] text-ink-secondary"
            >
              {item}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-ink-faint">
          Many domains. One engine. Domains do not recreate the stack beneath them.
        </p>
      </motion.div>
    </div>
  );
}

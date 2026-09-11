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
      <div className="space-y-1">
        {LAYERS.map((layer) => {
          const selected = active === layer.id;
          return (
            <button
              key={layer.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(layer.id)}
              onFocus={() => setActive(layer.id)}
              className={cn(
                "w-full border px-4 py-3 text-left transition-colors",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
                selected
                  ? "border-gold/30 bg-gold/10 text-ink"
                  : "border-border-subtle bg-surface/20 text-ink-secondary hover:text-ink"
              )}
            >
              <span className="font-mono text-[9px] text-ink-faint">
                {layer.index}
              </span>
              <span className="ml-2 text-[13px] font-medium">{layer.title}</span>
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

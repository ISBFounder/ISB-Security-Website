"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Props = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function MobileDisclosure({ title, children, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const reduce = useReducedMotion();
  const panelId = `mobile-disc-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="border-b border-border-subtle">
      <button
        type="button"
        className="flex min-h-[48px] w-full items-center justify-between px-1 py-3 text-left text-[15px] font-medium text-ink"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-ink-muted transition-transform duration-150",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="border-l border-border pb-3 pl-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

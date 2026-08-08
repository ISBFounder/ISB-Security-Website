"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { NavigationLink } from "./NavigationLink";
import type { NavLink } from "@/lib/constants";

type Props = {
  id: string;
  title: string;
  summary: string;
  items: readonly NavLink[];
  onNavigate: () => void;
  featured?: { title: string; description: string; href: string };
};

export function MegaMenuPanel({
  id,
  title,
  summary,
  items,
  onNavigate,
  featured,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      id={id}
      role="region"
      aria-label={title}
      initial={reduce ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: 2 }}
      transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed inset-x-0 top-14 z-40 border-b border-border bg-bg-secondary shadow-elevated lg:top-16"
    >
      <div className="container-site py-6 lg:py-7">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr_220px]">
          <div>
            <p className="label">{title}</p>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">
              {summary}
            </p>
          </div>

          <div
            className={
              items.length > 6
                ? "grid gap-x-6 gap-y-0.5 sm:grid-cols-2"
                : "grid max-w-md gap-y-0.5"
            }
          >
            {items.map((item) => (
              <NavigationLink
                key={item.href + item.label}
                href={item.href}
                variant="mega"
                description={item.description}
                onNavigate={onNavigate}
              >
                {item.label}
              </NavigationLink>
            ))}
          </div>

          {featured ? (
            <div className="border border-border bg-surface/60 p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                Featured
              </p>
              <p className="mt-2 text-[13px] font-medium text-ink">
                {featured.title}
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
                {featured.description}
              </p>
              <Link
                href={featured.href}
                onClick={onNavigate}
                className="mt-3 inline-block text-[12px] font-medium text-gold hover:text-gold-light"
              >
                {featured.href === "/roadmap" ? "View roadmap" : "Learn more"} →
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

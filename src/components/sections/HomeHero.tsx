"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ProductInterface } from "@/components/visuals/ProductInterface";

const CREDIBILITY = [
  "Built for multi-customer security operations",
  "Modular multi-tenant architecture",
  "AI-assisted reporting foundation",
  "Developed from operational security experience",
  "European security industry focus",
] as const;

export function HomeHero() {
  const reduce = useReducedMotion();

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay, ease: [0.25, 0.1, 0.25, 1] },
        };

  return (
    <section className="relative overflow-hidden pb-12 pt-14 md:pb-16 md:pt-20 lg:pt-24">
      {/* Architectural background — restrained */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,#14171B_0%,transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #A1A7AF 1px, transparent 1px), linear-gradient(to bottom, #A1A7AF 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-border-subtle" />
      </div>

      <div className="container-site relative">
        {/* Asymmetric editorial band */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <motion.div className="lg:col-span-7" {...fade(0)}>
            <div className="mb-5 inline-flex items-center gap-2 border border-border bg-surface/60 px-3 py-1 font-mono text-[11px] text-ink-secondary">
              <span className="h-1.5 w-1.5 bg-gold" aria-hidden />
              Platform development active
            </div>

            <h1 className="display-xl">
              One operational system
              <span className="mt-1 block text-ink">
                for the <span className="text-gold">security industry</span>
              </span>
            </h1>

            <p className="body-lg mt-6 max-w-xl">
              ISB Security Platform brings reporting, objects, personnel, patrols,
              compliance and AI-assisted workflows together in one operational
              ecosystem built specifically for professional security organizations.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/request-demo" size="lg">
                Request a Demonstration
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/platform" variant="secondary" size="lg">
                Explore the Platform
              </Button>
            </div>
            <p className="mt-4">
              <Link
                href="/platform"
                className="text-[13px] font-medium text-ink-muted transition-colors hover:text-gold"
              >
                View platform architecture →
              </Link>
            </p>
          </motion.div>

          {/* Metadata column */}
          <motion.div
            className="flex flex-col justify-end lg:col-span-5"
            {...fade(0.08)}
          >
            <div className="border border-border bg-surface/30 p-5 lg:ml-auto lg:max-w-sm">
              <p className="label mb-4">Institutional scope</p>
              <ul className="space-y-2.5 font-mono text-[11px] leading-relaxed text-ink-muted">
                {CREDIBILITY.map((line) => (
                  <li key={line} className="flex gap-2 border-b border-border-subtle pb-2.5 last:border-0 last:pb-0">
                    <span className="mt-1.5 h-1 w-1 shrink-0 bg-gold/70" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Flagship product scene */}
        <motion.div className="mt-12 md:mt-14 lg:mt-16" {...fade(0.14)}>
          <ProductInterface />
        </motion.div>
      </div>
    </section>
  );
}

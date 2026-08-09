import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About ISB Security Solutions",
  description:
    "ISB Security Solutions builds an enterprise security operations platform with an established foundation and expanding capabilities — operational origin, modular strategy and European focus.",
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title: `About ISB Security Solutions | ${SITE.name}`,
    description:
      "Enterprise security operations platform with an established foundation and expanding capabilities for professional security organizations.",
    url: `${SITE.url}/about`,
  },
  twitter: {
    card: "summary_large_image",
    title: `About ISB Security Solutions | ${SITE.name}`,
    description:
      "Enterprise security operations platform with an established foundation and expanding capabilities.",
  },
};

const PRINCIPLES = [
  {
    name: "Innovation",
    text: "Capability expands through modular architecture, not decorative features.",
  },
  {
    name: "Reliability",
    text: "Operational software must behave predictably under daily use.",
  },
  {
    name: "Security",
    text: "Access and accountability must be considered at architecture level.",
  },
  {
    name: "Efficiency",
    text: "Technology should reduce repeated administrative work.",
  },
  {
    name: "Trust",
    text: "Boundaries, access and traceability create confidence in operational records.",
  },
  {
    name: "Professionalism",
    text: "Product language and design reflect the seriousness of security operations.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      {/* Hero */}
      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="label">About ISB</p>
            <h1 className="heading-xl mt-3">
              Enterprise security operations platform with an established foundation.
            </h1>
            <p className="body-lg mt-6 max-w-2xl">
              ISB Security Solutions builds an enterprise security operations
              platform with an established operational foundation and continuously
              expanding capabilities — conceived from the reality that critical
              security work is still too often spread across paper, spreadsheets,
              messaging tools and disconnected systems.
            </p>
          </div>
        </div>
      </section>

      {/* Why ISB exists */}
      <section className="section divider">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="label">Why ISB exists</p>
              <h2 className="heading-md mt-3">
                Operational work still depends on fragmented tools.
              </h2>
              <p className="body mt-4">
                Reporting, planning, object instructions, customer requirements,
                personnel context, incident follow-up, audit information,
                communication, documents and escalation procedures are frequently
                handled in separate systems — or outside systems entirely.
              </p>
            </div>
            <div>
              <p className="label">Consequence</p>
              <ul className="mt-3 space-y-2 text-[14px] text-ink-secondary">
                {[
                  "Repeated administration",
                  "Missing context at handovers",
                  "Version conflicts",
                  "Low traceability",
                  "Unnecessary operational friction",
                ].map((c) => (
                  <li
                    key={c}
                    className="flex gap-2 border-b border-border-subtle py-2 last:border-0"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 bg-gold/70" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Operational origin */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Operational origin"
            title="Conceived from direct exposure to professional security environments."
            description="ISB was conceived from direct exposure to operational security environments where officers, supervisors and customers often work across separate tools and information sources. Product design is shaped by that operational reality — not abstract software trends."
          />
        </div>
      </section>

      {/* Why generic software falls short */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Why generic software falls short"
            title="Tools not designed around security operations require constant adaptation."
          />
          <p className="mt-6 max-w-2xl text-[14px] text-ink-secondary">
            Generic business tools do not inherently model object hierarchy, patrol
            context, incident workflow, escalation paths, role-specific operational
            access, customer and object separation, reporting lifecycle, audit
            context or qualification-linked assignment. Adapting them for security
            work often recreates the same fragmentation they were meant to solve.
          </p>
        </div>
      </section>

      {/* ISB approach */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="The ISB approach"
            title="One platform. Shared context. Modular expansion."
          />
          <div className="mt-8 border border-border bg-surface/30 p-5 font-mono text-[12px] leading-7 text-ink-secondary">
            <p className="text-gold">One platform</p>
            <p>Different operational domains</p>
            <p>Shared organizational context</p>
            <p>Shared object context</p>
            <p>Shared user context</p>
            <p>Shared access model</p>
            <p>Shared audit foundation</p>
            <p>Modular expansion</p>
          </div>
          <p className="mt-4 max-w-2xl text-[13px] text-ink-muted">
            An architectural company principle: domains expand without rebuilding
            identity, permissions, tenant isolation, document security and audit foundations.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section divider">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="border border-border bg-surface/30 p-6">
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                Mission
              </p>
              <p className="mt-3 text-[18px] font-semibold leading-snug text-ink">
                Transform the European security industry through one intelligent
                operational platform.
              </p>
              <p className="mt-4 text-[13px] text-ink-secondary">
                Operationally, that means replacing fragmented reporting, object
                information, personnel context and audit trails with one coherent
                system designed for how security organizations actually work.
              </p>
            </div>
            <div className="border border-border bg-surface/30 p-6">
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                Vision
              </p>
              <p className="mt-3 text-[18px] font-semibold leading-snug text-ink">
                Replace fragmented operational systems with a secure, modular and
                AI-assisted ecosystem capable of supporting the broader security
                workflow.
              </p>
              <p className="mt-4 text-[13px] text-ink-secondary">
                The long-term goal is not a single-purpose tool, but a platform that
                can grow across operational domains without losing shared context.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Company principles"
            title="Practical standards for product and company behaviour."
          />
          <div className="mt-10 space-y-0 border-t border-border">
            {PRINCIPLES.map((p) => (
              <div
                key={p.name}
                className="grid gap-2 border-b border-border-subtle py-4 sm:grid-cols-[140px_1fr]"
              >
                <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-gold">
                  {p.name}
                </p>
                <p className="text-[14px] text-ink-secondary">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modular strategy */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Modular strategy"
            title="Established foundation. Active expansion. Future intelligence."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="border border-border bg-surface/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                Established foundation
              </p>
              <p className="mt-3 text-[13px] text-ink-secondary">
                Multi-tenant architecture · Authentication · RBAC · RLS · Tenant
                isolation · Object hierarchy · Document lifecycle · Reporting
                foundation · Auditability
              </p>
            </div>
            <div className="border border-border bg-surface/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                Active expansion
              </p>
              <p className="mt-3 text-[13px] text-ink-secondary">
                Workforce operations · Scheduling expansion · Service requests ·
                Dispatch capabilities · Compliance engine — Phase 2.2 in active
                development
              </p>
            </div>
            <div className="border border-border bg-surface/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                Future intelligence
              </p>
              <p className="mt-3 text-[13px] text-ink-secondary">
                AI intelligence layer · Talent intelligence · Team compatibility —
                planned expansion on structured operational data. Not autonomous
                decision systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Development philosophy */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Product development philosophy"
            title="Operational use before decorative features."
          />
          <ul className="mt-8 max-w-2xl space-y-2 text-[14px] text-ink-secondary">
            {[
              "Operational use before decorative features",
              "Human accountability in AI-assisted workflows",
              "Staged development with clear maturity labels",
              "Validation before public claims",
              "Modular architecture for expansion without rewrite",
              "Enterprise scalability as a design direction",
              "Responsible AI under human control",
            ].map((x) => (
              <li
                key={x}
                className="flex gap-2 border-b border-border-subtle py-2 last:border-0"
              >
                <span className="mt-2 h-1 w-1 shrink-0 bg-gold/70" aria-hidden />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* European context */}
      <section className="section divider">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="label">European context</p>
              <h2 className="heading-md mt-3">
                Based in the Netherlands. Focused on European security operations.
              </h2>
              <p className="body mt-4">
                ISB Security Solutions is based in Tilburg, The Netherlands. The
                initial focus is the European security industry. European privacy and
                operational context influence design decisions. Future international
                expansion is part of the long-term direction.
              </p>
              <p className="mt-4 text-[13px] text-ink-muted">
                No claim of European market presence, EU approval, cross-border
                customers or international offices unless verified.
              </p>
            </div>
            <div>
              <p className="label">Long-term direction</p>
              <h2 className="heading-md mt-3">From security operations platform to broader ecosystem.</h2>
              <div className="mt-4 space-y-3 font-mono text-[12px] text-ink-secondary">
                <p>
                  <span className="text-gold">Today</span> · security operations
                  platform
                </p>
                <p>
                  <span className="text-gold">Long term</span> · broader modular
                  operational ecosystem
                </p>
                <p>
                  <span className="text-gold">Future</span> · international scalability
                  and adjacent sectors
                </p>
              </div>
              <p className="mt-4 text-[12px] text-ink-faint">
                No confidential roadmap details, valuation or acquisition goals
                published here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company information */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Company information"
            title="ISB Security Solutions"
          />
          <div className="mt-8 max-w-lg border border-border bg-surface/30 p-6 font-mono text-[13px] leading-relaxed text-ink-secondary">
            <p className="text-ink">{SITE.name}</p>
            <p className="mt-3">{SITE.location}</p>
            <p>KVK {SITE.kvk}</p>
            <p className="mt-3">
              <a
                href={`mailto:${SITE.email}`}
                className="text-gold hover:text-gold-light"
              >
                {SITE.email}
              </a>
            </p>
            <p>
              <a
                href={SITE.url}
                className="text-gold hover:text-gold-light"
                target="_blank"
                rel="noopener noreferrer"
              >
                isbsecuritysolutions.nl
              </a>
            </p>
            <p className="mt-3 text-ink-muted">
              Enterprise Security Operations Software
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section divider">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">
              Explore an enterprise security operations platform with an
              established foundation and expanding capabilities.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/platform">
                Explore Platform
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/roadmap" variant="secondary">
                View Roadmap
              </Button>
              <Button href="/contact" variant="secondary">
                Contact ISB
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

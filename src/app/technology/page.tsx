import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { TechnologyArchitecture } from "@/components/technology/TechnologyArchitecture";
import { SITE } from "@/lib/constants";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Technology Architecture",
  description:
    "Technical foundation of ISB Security Platform — multi-tenant architecture, client and platform layers, realtime and offline direction, APIs and environment separation.",
  alternates: { canonical: `${SITE.url}/technology` },
  openGraph: {
    title: `Technology Architecture | ${SITE.name}`,
    description:
      "Technical foundation of ISB Security Platform — multi-tenant architecture, client and platform layers, realtime and offline direction, APIs and environment separation.",
    url: `${SITE.url}/technology`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Technology Architecture | ${SITE.name}`,
    description:
      "Technical foundation of ISB Security Platform — multi-tenant architecture, client and platform layers, realtime and offline direction, APIs and environment separation.",
  },
};

export default function TechnologyPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Technology", path: "/technology" },
        ])}
      />
      {/* Hero */}
      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="label">Technology</p>
            <h1 className="heading-xl mt-3">
              Technology designed around operational continuity.
            </h1>
            <p className="body-lg mt-6 max-w-2xl">
              ISB combines a multi-tenant SaaS model, modular platform services,
              controlled data boundaries and mobile-oriented workflows into one
              operational architecture.
            </p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {[
                "Multi-tenant",
                "Modular",
                "API foundations",
                "Realtime foundations",
                "Offline direction",
                "Auditability",
              ].map((t) => (
                <span
                  key={t}
                  className="border border-border-subtle bg-surface/40 px-2.5 py-1 font-mono text-[10px] text-ink-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* High-level architecture */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="High-level architecture"
            title="Clients, platform services, data and infrastructure."
            description="Three layers. Clear boundaries. Shared services above tenant-aware data."
          />
          <div className="mt-10">
            <TechnologyArchitecture />
          </div>
        </div>
      </section>

      {/* Client / platform / infrastructure model */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="System boundaries"
            title="Interface, logic, data, infrastructure."
          />
          <div className="mt-10 grid gap-0 border border-border md:grid-cols-4">
            {[
              {
                t: "User interface",
                d: "Web and mobile experiences for operational roles.",
              },
              {
                t: "Platform logic",
                d: "Shared services for reporting, objects, personnel, audit and AI.",
              },
              {
                t: "Operational data",
                d: "Tenant-aware records constrained by role and context.",
              },
              {
                t: "Infrastructure controls",
                d: "Environment separation, storage and observability foundations.",
              },
            ].map((b, i) => (
              <div
                key={b.t}
                className={`p-5 ${i < 3 ? "border-b border-border md:border-b-0 md:border-r" : ""}`}
              >
                <p className="text-[13px] font-semibold text-ink">{b.t}</p>
                <p className="mt-2 text-[12px] text-ink-muted">{b.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[11px] text-ink-faint">
            {["Clients", "Platform boundary", "Shared services", "Data boundary", "Infrastructure"].map(
              (s, i) => (
                <span key={s} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>→</span>}
                  <span className="border border-border-subtle px-2 py-1">{s}</span>
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Multi-tenant data */}
      <section className="section divider">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="label">Multi-tenant data architecture</p>
              <h2 className="heading-md mt-3">Tenant-aware data boundaries</h2>
              <p className="body mt-4">
                Shared platform services sit above tenant-aware data. Organization,
                customer, object and role context constrain access. Architecture
                supports row-level access controls — coverage expands with the
                platform.
              </p>
              <ul className="mt-5 space-y-2 text-[13px] text-ink-secondary">
                <li>Tenant context · organization separation</li>
                <li>Customer context · scoped visibility</li>
                <li>Object context · site-level operational data</li>
                <li>Role context · least-privilege actions</li>
              </ul>
            </div>
            <div className="border border-border bg-surface/30 p-5 font-mono text-[12px] leading-7 text-ink-secondary">
              <p className="text-gold">Shared platform services</p>
              <p className="mt-3">Organization A</p>
              <p className="pl-3">→ Customer A1 → Object A1</p>
              <p className="pl-6">Users · Roles · Reports</p>
              <p className="mt-2">Organization B</p>
              <p className="pl-3">→ Customer B1 → Object B1</p>
              <p className="pl-6">Users · Roles · Reports</p>
              <p className="mt-3 text-[11px] text-ink-faint">
                No cross-tenant data without authorized context
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Realtime */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Realtime foundations"
            title="Synchronized operational state for authorized users."
            description="Realtime foundations are being designed to support synchronized operational state across authorized users. No guaranteed zero-latency or millisecond SLAs."
          />
          <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[12px] text-ink-secondary">
            {["Event", "Platform", "Authorized users", "Updated operational state"].map(
              (s, i) => (
                <span key={s} className="flex items-center gap-2">
                  {i > 0 && <span className="text-ink-faint" aria-hidden>→</span>}
                  <span className="border border-border bg-surface/40 px-3 py-2">{s}</span>
                </span>
              )
            )}
          </div>
          <p className="mt-4 text-[13px] text-ink-muted">
            Relevant for incident status, supervisor review, assignment updates,
            notification state and object context changes.
          </p>
        </div>
      </section>

      {/* Offline */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Offline-capable workflows"
            title="Field work does not always have reliable connectivity."
            description="Basements, industrial sites, remote locations, poor reception and temporary event environments. Offline capability is planned / active development — not claimed as fully released."
          />
          <div className="mt-8 border border-border-subtle bg-bg/40 p-4 font-mono text-[12px] leading-7 text-ink-secondary">
            <p>Local workflow → temporary offline state → reconnect</p>
            <p>→ controlled synchronization → conflict handling → audit history</p>
          </div>
        </div>
      </section>

      {/* API */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="API & integration architecture"
            title="Controlled boundaries. No bypass of tenant or permission controls."
          />
          <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[12px] text-ink-secondary">
            {[
              "External System",
              "Controlled API Boundary",
              "ISB Services",
              "Authorized Data Context",
            ].map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                {i > 0 && <span className="text-ink-faint" aria-hidden>↓</span>}
                <span className="border border-border bg-surface/40 px-3 py-2">{s}</span>
              </span>
            ))}
          </div>
          <ul className="mt-6 space-y-2 text-[13px] text-ink-secondary">
            <li>Internal platform services</li>
            <li>Controlled external access</li>
            <li>Future system integrations direction</li>
            <li>Standardized data exchange direction</li>
            <li>Authentication boundaries and auditability</li>
          </ul>
          <p className="mt-4 text-[12px] text-ink-faint">
            No third-party integrations claimed unless implemented.
          </p>
        </div>
      </section>

      {/* Environment separation */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Environment separation"
            title="Development, validation, production."
          />
          <div className="mt-8 grid gap-0 border border-border md:grid-cols-3">
            {[
              {
                t: "Development",
                d: "Feature work and local validation. Configuration separated from production.",
              },
              {
                t: "Testing / Validation",
                d: "Pre-release verification. Controlled deployments before production.",
              },
              {
                t: "Production",
                d: "Live operational environment. Access discipline and secrets separation.",
              },
            ].map((e, i) => (
              <div
                key={e.t}
                className={`p-5 ${i < 2 ? "border-b border-border md:border-b-0 md:border-r" : ""}`}
              >
                <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                  {e.t}
                </p>
                <p className="mt-2 text-[13px] text-ink-secondary">{e.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12px] text-ink-faint">
            No environment URLs, admin systems or secret material disclosed. CI/CD
            maturity described only where implemented.
          </p>
        </div>
      </section>

      {/* Observability */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Observability & reliability"
            title="Observability foundations and production monitoring direction."
            description="Application logging, error monitoring, operational metrics, service health, audit monitoring and deployment visibility. No claimed 24/7 SOC or invented uptime percentages."
          />
          <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[12px] text-ink-secondary">
            {["Application events", "Logs", "Metrics", "Alerts", "Human review"].map(
              (s, i) => (
                <span key={s} className="flex items-center gap-2">
                  {i > 0 && <span className="text-ink-faint" aria-hidden>→</span>}
                  <span className="border border-border bg-surface/40 px-3 py-2">{s}</span>
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Mobile-first */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Mobile-first architecture"
            title="Officers work away from desks."
            description="Mobile-first interface direction and mobile workflow foundations. Native apps are not claimed unless released."
          />
          <div className="mt-8 border border-border-subtle bg-bg/40 p-4 font-mono text-[12px] leading-7 text-ink-secondary">
            <p>
              Officer device → assignment → object context → reporting → evidence →
              patrol → synchronization
            </p>
          </div>
        </div>
      </section>

      {/* Modular */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Modular architecture"
            title="Domains consume shared foundation services."
            description="New modules do not require rebuilding identity, permissions, audit, notifications, data context, API or storage. Not a claim of microservices."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div>
              <p className="label mb-2">Capability domains</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Reporting",
                  "Objects",
                  "Personnel",
                  "Operations",
                  "Compliance",
                  "AI",
                  "Intelligence",
                  "Customer Context",
                ].map((d) => (
                  <span
                    key={d}
                    className="border border-border-subtle bg-bg/50 px-2.5 py-1.5 text-[12px] text-ink-secondary"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="label mb-2">Shared foundation</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Identity",
                  "Permissions",
                  "Audit",
                  "Notifications",
                  "Data context",
                  "API",
                  "Storage",
                ].map((d) => (
                  <span
                    key={d}
                    className="border border-gold/30 bg-gold/5 px-2.5 py-1.5 text-[12px] text-ink-secondary"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Deployment strategy"
            title="Current development model and future production deployment."
            description="Environment separation and scalable cloud infrastructure direction. No claim of global regions, active-active failover, sovereign cloud or government cloud unless verified."
          />
        </div>
      </section>

      {/* Security cross-link */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="label">Security boundary</p>
              <p className="mt-2 max-w-xl text-[14px] text-ink-secondary">
                Detailed trust architecture — identity, roles, tenant boundaries,
                audit and maturity — is covered on the Security & Trust page.
              </p>
            </div>
            <Link
              href="/security"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-secondary transition-colors hover:text-gold"
            >
              Explore Security & Trust
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Maturity */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Development maturity"
            title="Foundation, active work, planned and future direction."
          />
          <div className="mt-10 grid gap-0 border border-border md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                stage: "Foundation",
                items:
                  "Next.js application architecture · multi-tenant foundations · role/access foundations · object context · reporting workflow · audit foundations",
              },
              {
                stage: "Active development",
                items:
                  "Modular services · mobile workflows · notifications · broader operational domains",
              },
              {
                stage: "Planned",
                items:
                  "Offline synchronization · broader API integration · advanced observability · production hardening",
              },
              {
                stage: "Future direction",
                items:
                  "Larger-scale integration framework · deeper intelligence services · advanced deployment options",
              },
            ].map((m, i) => (
              <div
                key={m.stage}
                className={`p-5 ${
                  i < 3 ? "border-b border-border md:border-r lg:border-b-0" : ""
                } ${i === 1 ? "md:border-r-0 lg:border-r" : ""}`}
              >
                <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                  {m.stage}
                </p>
                <p className="mt-3 text-[12px] text-ink-secondary">{m.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">
              Evaluate the platform architecture in the context of your operation.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/platform" variant="secondary">
                Explore Platform
              </Button>
              <Button href="/security" variant="secondary">
                Security & Trust
              </Button>
              <Button href="/request-demo">
                Request Demo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

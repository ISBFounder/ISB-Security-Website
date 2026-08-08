import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { IndustryExplorer } from "@/components/industries/IndustryExplorer";
import { SITE } from "@/lib/constants";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Security Software by Operational Environment",
  description:
    "How ISB Security Platform is designed to adapt across object security, mobile patrol, events, retail, corporate, healthcare, education, municipal and government contractor operations.",
  alternates: { canonical: `${SITE.url}/industries` },
  openGraph: {
    title: `Security Software by Operational Environment | ${SITE.name}`,
    description:
      "How ISB Security Platform is designed to adapt across object security, mobile patrol, events, retail, corporate, healthcare, education, municipal and government contractor operations.",
    url: `${SITE.url}/industries`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Security Software by Operational Environment | ${SITE.name}`,
    description:
      "How ISB Security Platform is designed to adapt across object security, mobile patrol, events, retail, corporate, healthcare, education, municipal and government contractor operations.",
  },
};

const LANDSCAPE_ROWS = [
  {
    industry: "Object Security",
    dims: ["Fixed", "Site hierarchy", "Scheduled", "Medium", "High", "Core", "Medium", "Situational", "Medium", "Medium"],
  },
  {
    industry: "Mobile Patrol",
    dims: ["Mobile", "Distributed sites", "Mobile", "Medium", "High", "Core", "Medium", "Limited", "Variable", "High"],
  },
  {
    industry: "Event Security",
    dims: ["Temporary", "Zones / venue", "Teams", "High", "High", "Situational", "High", "Limited", "Variable", "High"],
  },
  {
    industry: "Retail",
    dims: ["Store / chain", "Store hierarchy", "Store teams", "High", "High", "Situational", "Medium", "Relevant", "Medium", "Medium"],
  },
  {
    industry: "Corporate",
    dims: ["Facility", "Campus / HQ", "Corporate", "Medium", "Medium", "Core", "Medium", "Situational", "Medium", "Medium"],
  },
  {
    industry: "Healthcare",
    dims: ["Facility", "Clinical zones", "Security + ops", "High", "High", "Situational", "High", "Limited", "High", "Medium"],
  },
  {
    industry: "Education",
    dims: ["Campus", "Campus structure", "Campus security", "Medium", "Medium", "Core", "Medium", "Limited", "Medium", "Medium"],
  },
  {
    industry: "Municipal",
    dims: ["Multi-site public", "Public buildings", "Municipal", "Medium", "High", "Situational", "Medium", "Limited", "High", "Medium"],
  },
  {
    industry: "Gov. Contractors",
    dims: ["Contracted", "Multi-customer", "Provider staff", "Variable", "High", "Situational", "Medium", "Relevant", "High", "Variable"],
  },
] as const;

const LANDSCAPE_COLS = [
  "Operating model",
  "Location model",
  "Workforce",
  "Incident profile",
  "Reporting intensity",
  "Patrol relevance",
  "Escalation complexity",
  "Customer visibility",
  "Compliance pressure",
  "Mobile dependency",
] as const;

type Rel = "Core" | "Relevant" | "Situational" | "Future";

const MATRIX: { industry: string; cells: Rel[] }[] = [
  {
    industry: "Object Security",
    cells: ["Core", "Core", "Core", "Core", "Relevant", "Core", "Situational", "Relevant", "Future"],
  },
  {
    industry: "Mobile Patrol",
    cells: ["Core", "Core", "Relevant", "Core", "Relevant", "Situational", "Situational", "Relevant", "Future"],
  },
  {
    industry: "Event Security",
    cells: ["Core", "Relevant", "Core", "Situational", "Core", "Situational", "Situational", "Relevant", "Future"],
  },
  {
    industry: "Retail",
    cells: ["Core", "Core", "Relevant", "Situational", "Relevant", "Relevant", "Relevant", "Relevant", "Future"],
  },
  {
    industry: "Corporate",
    cells: ["Core", "Core", "Core", "Core", "Relevant", "Relevant", "Situational", "Relevant", "Future"],
  },
  {
    industry: "Healthcare",
    cells: ["Core", "Core", "Core", "Situational", "Core", "Relevant", "Situational", "Relevant", "Future"],
  },
  {
    industry: "Education",
    cells: ["Core", "Core", "Core", "Core", "Relevant", "Relevant", "Situational", "Relevant", "Future"],
  },
  {
    industry: "Municipal",
    cells: ["Core", "Core", "Core", "Situational", "Core", "Core", "Situational", "Relevant", "Future"],
  },
  {
    industry: "Gov. Contractors",
    cells: ["Core", "Core", "Core", "Situational", "Relevant", "Core", "Core", "Relevant", "Future"],
  },
];

const MATRIX_COLS = [
  "Reporting",
  "Objects",
  "Personnel",
  "Patrols",
  "Escalation",
  "Compliance",
  "Customer Context",
  "AI Assistance",
  "Intelligence",
] as const;

export default function IndustriesPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />
      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="label">Industries</p>
            <h1 className="heading-xl mt-3">
              Designed for different security environments.
            </h1>
            <p className="body-lg mt-6 max-w-2xl">
              Security disciplines differ in risk profile, staffing model, object
              structure, reporting requirements and escalation procedures. ISB is
              designed to adapt while preserving one shared platform foundation.
            </p>
            <p className="mt-4 text-[13px] text-ink-muted">
              Industry examples describe intended operational fit and development
              direction. They do not imply current customers in every sector.
            </p>
          </div>
        </div>
      </section>

      {/* Landscape */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Industry landscape"
            title="How operational environments differ."
            description="Illustrative operational characteristics — not scientific scores or rankings."
          />
          <div className="mt-10 overflow-x-auto border border-border">
            <table className="w-full min-w-[900px] text-left text-[11px]">
              <thead>
                <tr className="border-b border-border bg-surface/40 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                  <th className="px-3 py-3 font-medium">Industry</th>
                  {LANDSCAPE_COLS.map((c) => (
                    <th key={c} className="px-2 py-3 font-medium">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-ink-secondary">
                {LANDSCAPE_ROWS.map((row) => (
                  <tr
                    key={row.industry}
                    className="border-b border-border-subtle last:border-0"
                  >
                    <td className="px-3 py-2.5 font-medium text-ink">
                      {row.industry}
                    </td>
                    {row.dims.map((d, i) => (
                      <td key={i} className="px-2 py-2.5">
                        {d}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Capability matrix */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Capability matrix"
            title="Platform domain relevance by industry."
            description="Core · Relevant · Situational · Future — qualitative relevance, not percentage scores."
          />
          <div className="mt-10 overflow-x-auto border border-border">
            <table className="w-full min-w-[720px] text-left text-[12px]">
              <thead>
                <tr className="border-b border-border bg-surface/40 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                  <th className="px-3 py-3 font-medium">Industry</th>
                  {MATRIX_COLS.map((c) => (
                    <th key={c} className="px-2 py-3 font-medium">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((row) => (
                  <tr
                    key={row.industry}
                    className="border-b border-border-subtle last:border-0"
                  >
                    <td className="px-3 py-2.5 font-medium text-ink">
                      {row.industry}
                    </td>
                    {row.cells.map((cell, i) => (
                      <td key={i} className="px-2 py-2.5 text-ink-secondary">
                        <span
                          className={
                            cell === "Core"
                              ? "text-ink"
                              : cell === "Future"
                                ? "text-ink-faint"
                                : "text-ink-secondary"
                          }
                        >
                          {cell}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11px] text-ink-faint">
            Labels indicate relative relevance for configuration discussion — not
            product availability guarantees.
          </p>
        </div>
      </section>

      {/* Explorer */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Industry explorer"
            title="Sector profile, structure and configuration."
            description="Architectural and comparative view — detailed workflows live on Solutions."
          />
          <div className="mt-10">
            <IndustryExplorer />
          </div>
        </div>
      </section>

      {/* Cross-industry foundation */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Cross-industry foundation"
            title="Different configurations. One platform architecture."
          />
          <div className="mt-8 flex flex-wrap gap-1.5">
            {[
              "Identity",
              "Role-based access",
              "Tenant context",
              "Object hierarchy",
              "Reporting engine",
              "Audit",
              "Notifications",
              "AI assistance",
              "Data context",
            ].map((f) => (
              <span
                key={f}
                className="border border-border-subtle bg-bg/50 px-2.5 py-1.5 text-[12px] text-ink-secondary"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Operational variation */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Operational variation model"
            title="Adapt through configuration — not separate products."
          />
          <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[12px] text-ink-secondary">
            {["Shared core", "Configuration", "Industry workflow"].map(
              (s, i) => (
                <span key={s} className="flex items-center gap-2">
                  {i > 0 && (
                    <span className="text-ink-faint" aria-hidden>
                      ↓
                    </span>
                  )}
                  <span className="border border-border bg-surface/40 px-3 py-2">
                    {s}
                  </span>
                </span>
              )
            )}
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div>
              <p className="label mb-2">Varies by organization</p>
              <ul className="space-y-1 text-[13px] text-ink-secondary">
                {[
                  "Report types",
                  "Object structures",
                  "Roles",
                  "Patrol routes",
                  "Escalation procedures",
                  "Customer requirements",
                ].map((x) => (
                  <li key={x}>· {x}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label mb-2">Shared across industries</p>
              <ul className="space-y-1 text-[13px] text-ink-secondary">
                {[
                  "Identity",
                  "Access model",
                  "Audit foundation",
                  "Reporting foundation",
                  "Organizational context",
                  "Platform services",
                ].map((x) => (
                  <li key={x}>· {x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Provider context */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Provider context"
            title="One security company may operate across several industries."
          />
          <div className="mt-8 border border-border bg-surface/30 p-5 font-mono text-[12px] leading-7 text-ink-secondary">
            <p className="text-gold">Security Provider (ISB organizational context)</p>
            <p className="pl-3">├ Object Security</p>
            <p className="pl-3">├ Mobile Patrol</p>
            <p className="pl-3">├ Events</p>
            <p className="pl-3">└ Corporate Assignments</p>
          </div>
          <p className="mt-4 max-w-2xl text-[13px] text-ink-muted">
            Multi-discipline providers keep one organizational context while
            configuring objects, roles and workflows per service line.
          </p>
        </div>
      </section>

      {/* Configuration */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Configuration considerations"
            title="What may vary per deployment."
            description="Configuration requirements depend on the operational model. Instant deployment is not promised."
          />
          <div className="mt-8 flex flex-wrap gap-1.5">
            {[
              "Number of customers",
              "Number of objects",
              "Role structure",
              "Report requirements",
              "Qualification requirements",
              "Patrol model",
              "Escalation procedures",
              "Customer access",
              "Integration needs",
            ].map((c) => (
              <span
                key={c}
                className="border border-border-subtle bg-surface/40 px-2.5 py-1.5 text-[12px] text-ink-secondary"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">
              Explore how ISB could be configured around your operational
              environment.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/solutions" variant="secondary">
                Explore Solutions
              </Button>
              <Button href="/request-demo">
                Request Demo
                <ArrowRight className="h-4 w-4" aria-hidden />
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

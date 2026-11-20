import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Product Roadmap",
  description:
    "ISB Security Platform roadmap: now, next and later. No public release date. The platform is in active development and is not commercially available.",
  alternates: { canonical: `${SITE.url}/roadmap` },
  openGraph: {
    title: `Product Roadmap | ${SITE.name}`,
    description:
      "ISB Security Platform roadmap: now, next and later. No public release date. The platform is in active development and is not commercially available.",
    url: `${SITE.url}/roadmap`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Product Roadmap | ${SITE.name}`,
    description:
      "ISB Security Platform roadmap: now, next and later. No public release date. Not commercially available.",
  },
};

const STAGES = [
  {
    index: "Now",
    label: "Refine and validate",
    emphasis: "active" as const,
    layer: "Active development",
    groups: [
      {
        title: "Current focus",
        items: [
          "Operational workflows",
          "Reporting and recovery",
          "Workforce and personnel planning",
          "Object management",
          "Selected offline workflows",
        ],
      },
      {
        title: "In active development",
        items: [
          "Security operations",
          "Patrols",
          "Incident workflows",
          "Personnel and workforce management",
          "Objects and locations",
          "AI-assisted report drafting",
          "Selected mobile and offline workflows",
          "Service requests and contracts",
          "Document workspaces",
          "Client-facing reporting workflows",
        ],
      },
    ],
  },
  {
    index: "Next",
    label: "Integrate and validate",
    emphasis: "planned" as const,
    layer: "No release date",
    groups: [
      {
        title: "Required next work",
        items: [
          "Current integration work",
          "Recovery work",
          "Environment validation",
          "Authority validation",
        ],
      },
      {
        title: "Discovery / architecture",
        items: [
          "Immutable evidence custody",
          "Definitive document publication authority",
          "Personnel qualification authority",
          "Privacy retention and legal-hold governance",
        ],
      },
    ],
  },
  {
    index: "Later",
    label: "Expand and research",
    emphasis: "planned" as const,
    layer: "Not committed delivery",
    groups: [
      {
        title: "Planned",
        items: [
          "Connected analytics",
          "Visitor management",
          "Duty journal and handovers",
          "Alarm-provider integrations",
          "Interactive site maps",
          "Case management",
          "Work orders",
          "Voice transcription",
          "Centralized exports",
          "Enterprise connectors",
        ],
      },
      {
        title: "Future / research",
        items: [
          "Wearable integrations",
          "Predictive AI risk analysis",
        ],
      },
    ],
  },
] as const;

const DEPENDENCIES = [
  { capability: "AI-assisted reporting", depends: "Reporting workflows in active development" },
  { capability: "Connected analytics", depends: "Consistent operational data" },
  { capability: "Predictive AI research", depends: "Validated data and human review" },
  { capability: "Enterprise connectors", depends: "Integration outbox foundations" },
  { capability: "Client-facing reporting", depends: "Company-scoped access boundaries" },
] as const;

const PRIORITIES = [
  "Operational value",
  "Security impact",
  "Platform dependency",
  "User workflow",
  "Technical maturity",
  "Validation requirements",
  "Scalability",
] as const;

export default function RoadmapPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Roadmap", path: "/roadmap" },
        ])}
      />
      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="label">Roadmap</p>
            <h1 className="heading-xl mt-3">ISB Security Platform: Active Development</h1>
            <p className="body-lg mt-6 max-w-2xl">
              Now: refine and validate operational, reporting, workforce, planning,
              object-management and selected offline workflows. Next: complete current
              integration and recovery work, and the required environment and authority
              validation. Later: expand connected operational capabilities, external
              integrations and advanced AI research.
            </p>
            <div className="mt-6 border border-border-subtle bg-surface/30 px-4 py-3 text-[13px] text-ink-muted">
              The platform has not been announced as commercially available or
              production-validated. No public release date has been established.
              Priorities may change. Stage placement is not a delivery commitment.
            </div>
          </div>
        </div>
      </section>

      <section className="section divider !pt-8">
        <div className="container-site">
          <p className="label mb-4">Architecture progression</p>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[12px] text-ink-secondary">
            {["Now", "Next", "Later"].map(
              (layer, i) => (
                <span key={layer} className="flex items-center gap-2">
                  {i > 0 && <span className="text-ink-faint" aria-hidden>↓</span>}
                  <span className="border border-border bg-surface/40 px-3 py-2">{layer}</span>
                </span>
              )
            )}
          </div>
          <p className="mt-3 text-[12px] text-ink-faint">
            Technical foundations already include role-based access, company-scoped data, scheduling and assignment authority, attendance and worked time, audit and events, bounded billing and payroll data, an integration outbox, and selected offline reporting and patrol workflows. Those foundations are not commercial availability.
          </p>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader align="left" eyebrow="Product roadmap" title="Operational layers. One connected direction." />
          <div className="mt-10 grid gap-px border border-border bg-border-subtle md:grid-cols-3">
            {STAGES.map((stage) => (
              <div
                key={stage.index}
                className="bg-bg p-5"
              >
                <div className="flex items-baseline gap-2">
                  <span
                    className={`font-mono text-[11px] ${
                      stage.emphasis === "active"
                        ? "text-gold"
                        : "text-ink-muted"
                    }`}
                  >
                    {stage.index}
                  </span>
                  <h2
                    className={`text-[14px] font-semibold ${
                      stage.emphasis === "active"
                        ? "text-gold"
                        : "text-ink-secondary"
                    }`}
                  >
                    {stage.label}
                  </h2>
                </div>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-ink-faint">{stage.layer}</p>
                <div className="mt-5 space-y-4">
                  {stage.groups.map((g) => (
                    <div key={g.title}>
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-wide text-ink-muted">{g.title}</p>
                      <ul className="mt-1.5 space-y-1">
                        {g.items.map((item) => (
                          <li key={item} className="text-[12px] leading-snug text-ink-secondary">{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader align="left" eyebrow="Status definitions" title="How maturity labels are used." />
          <div className="mt-8 grid gap-px border border-border bg-border-subtle sm:grid-cols-2">
            {[
              { t: "Foundation established", d: "Technical foundations exist in the development platform. This is not commercial availability or production validation." },
              { t: "Active development", d: "Work is actively progressing and is not production-validated. Progress is not equal across all items." },
              { t: "Discovery / architecture", d: "Authority and design questions are under study. They are not available capabilities." },
              { t: "Planned", d: "Part of the intended platform direction. No release date is authorized." },
              { t: "Future / research", d: "Research direction subject to validation and prioritization. Not committed delivery." },
            ].map((s) => (
              <div key={s.t} className="bg-bg p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-gold">{s.t}</p>
                <p className="mt-2 text-[13px] text-ink-secondary">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader align="left" eyebrow="Capability dependencies" title="Later capabilities build on earlier foundations." description="Deliberate architecture — not random feature development." />
          <div className="mt-8 max-w-2xl space-y-0 border-t border-border">
            {DEPENDENCIES.map((dep) => (
              <div key={dep.capability} className="grid gap-1 border-b border-border-subtle py-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4">
                <p className="text-[13px] font-medium text-ink">{dep.capability}</p>
                <p className="font-mono text-[10px] text-ink-faint sm:text-center">depends on</p>
                <p className="text-[13px] text-ink-secondary">{dep.depends}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Boundaries"
            title="What this roadmap does not claim."
            description="Development categories are not commercial availability labels. AI does not make autonomous operational decisions."
          />
          <div className="mt-8 flex flex-wrap gap-1.5">
            {[
              "No release date",
              "Not commercially available",
              "Not production-validated",
              "No certification claimed",
              "Not every module works offline",
              "AI does not decide",
            ].map((p) => (
              <span key={p} className="border border-border-subtle bg-bg/50 px-2.5 py-1.5 text-[12px] text-ink-secondary">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader align="left" eyebrow="How roadmap priorities are evaluated" title="Operational and technical criteria." />
          <div className="mt-8 flex flex-wrap gap-1.5">
            {PRIORITIES.map((p) => (
              <span key={p} className="border border-border-subtle bg-bg/50 px-2.5 py-1.5 text-[12px] text-ink-secondary">{p}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <div className="max-w-2xl border border-border bg-surface/30 p-6">
            <p className="label">Roadmap policy</p>
            <p className="mt-3 text-[14px] text-ink-secondary">
              The roadmap represents current development direction rather than a contractual delivery schedule.
              No release dates, delivery commitments or commercial availability claims are implied by stage placement.
            </p>
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">Discuss how the platform direction aligns with your operational requirements.</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/request-demo">Request Demo <ArrowRight className="h-4 w-4" aria-hidden /></Button>
              <Button href="/platform" variant="secondary">Explore Platform</Button>
              <Button href="/contact" variant="secondary">Contact ISB</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

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
    "ISB Security Platform product direction — completed platform foundation, operational object hierarchy, active workforce operations and planned AI intelligence.",
  alternates: { canonical: `${SITE.url}/roadmap` },
  openGraph: {
    title: `Product Roadmap | ${SITE.name}`,
    description:
      "ISB Security Platform product direction — completed platform foundation, operational object hierarchy, active workforce operations and planned AI intelligence.",
    url: `${SITE.url}/roadmap`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Product Roadmap | ${SITE.name}`,
    description:
      "ISB Security Platform product direction — completed platform foundation, operational object hierarchy, active workforce operations and planned AI intelligence.",
  },
};

const STAGES = [
  {
    index: "01",
    label: "Platform Foundation",
    emphasis: "current" as const,
    layer: "Completed",
    groups: [
      {
        title: "Core platform",
        items: [
          "Multi-tenant SaaS architecture",
          "Authentication",
          "RBAC",
          "Row Level Security",
          "Tenant isolation",
          "Company and customer separation",
          "Audit framework",
          "Secure storage model",
        ],
      },
      {
        title: "Reporting foundation",
        items: [
          "Specific Report workflow",
          "Structured reporting foundation",
          "Review and approval foundations",
          "Report history foundations",
        ],
      },
    ],
  },
  {
    index: "02.1",
    label: "Operational Object Hierarchy",
    emphasis: "current" as const,
    layer: "Completed",
    groups: [
      {
        title: "Hierarchy",
        items: [
          "Company → Customer → Object hierarchy",
          "Building, floor, zone, room, post, checkpoint structure",
          "Object management",
          "Building, zone and post configuration",
        ],
      },
      {
        title: "Operational object context",
        items: [
          "Instructions",
          "Risks",
          "Qualifications",
          "Escalations",
          "Patrol requirements",
          "Contacts and resources",
        ],
      },
      {
        title: "Document lifecycle",
        items: [
          "Upload, progress and retry handling",
          "Replacement workflow and version history",
          "Active version tracking",
          "Archive and restore",
          "Signed downloads and expiry handling",
          "Classification controls",
        ],
      },
      {
        title: "Security & audit",
        items: [
          "Persona-based authorization",
          "Object-based permissions",
          "Customer isolation and dispatcher scope control",
          "Entity-scoped audit history",
          "Actor tracking and correlation IDs",
        ],
      },
    ],
  },
  {
    index: "02.2",
    label: "Workforce Operations",
    emphasis: "active" as const,
    layer: "Active development",
    groups: [
      {
        title: "Workforce foundation completed",
        items: [
          "Canonical shift lifecycle",
          "Assignment lifecycle",
          "Shift reconciliation",
          "Workforce notifications foundation",
        ],
      },
      {
        title: "Current expansion",
        items: [
          "Service contracts",
          "Service requests",
          "Scheduling expansion",
          "Availability",
          "Compliance engine",
          "Matching engine",
          "Dispatch system",
          "Persona workspaces",
        ],
      },
    ],
  },
  {
    index: "03",
    label: "AI Intelligence Layer",
    emphasis: "planned" as const,
    layer: "Planned",
    groups: [
      {
        title: "Intelligence direction",
        items: [
          "AI reporting assistant expansion",
          "Risk detection",
          "Operational recommendations",
          "Talent intelligence",
          "Team compatibility engine",
        ],
      },
    ],
  },
] as const;

const DEPENDENCIES = [
  {
    capability: "AI reporting",
    depends: "Structured report workflows",
  },
  {
    capability: "Operational intelligence",
    depends: "Consistent operational data",
  },
  {
    capability: "Team intelligence",
    depends: "Personnel and assignment context",
  },
  {
    capability: "Workforce expansion",
    depends: "Platform foundation and object hierarchy",
  },
  {
    capability: "Customer portals",
    depends: "Tenant and permission boundaries",
  },
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
            <h1 className="heading-xl mt-3">
              Building the platform in operational layers.
            </h1>
            <p className="body-lg mt-6 max-w-2xl">
              ISB Security Platform is developed in operational layers. Platform foundation
              and the operational object hierarchy are completed. Workforce operations
              are in active development. AI intelligence remains planned.
            </p>
            <div className="mt-6 border border-border-subtle bg-surface/30 px-4 py-3 text-[13px] text-ink-muted">
              The roadmap represents current development direction rather than a
              contractual delivery schedule. Priorities may change based on
              technical dependencies, validation outcomes, operational requirements
              and security considerations.
            </div>
          </div>
        </div>
      </section>

      <section className="section divider !pt-8">
        <div className="container-site">
          <p className="label mb-4">Architecture progression</p>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[12px] text-ink-secondary">
            {[
              "Platform foundation",
              "Object hierarchy",
              "Workforce operations",
              "AI intelligence",
            ].map((layer, i) => (
              <span key={layer} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="text-ink-faint" aria-hidden>
                    ↓
                  </span>
                )}
                <span className="border border-border bg-surface/40 px-3 py-2">
                  {layer}
                </span>
              </span>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-ink-faint">
            Future intelligence depends on structured operational data established
            in earlier stages.
          </p>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Product roadmap"
            title="Four phases. One connected direction."
          />

          <div className="mt-10 grid gap-0 border border-border md:grid-cols-2 xl:grid-cols-4">
            {STAGES.map((stage, i) => (
              <div
                key={stage.index}
                className={`p-5 ${
                  i < STAGES.length - 1
                    ? "border-b border-border md:border-b xl:border-b-0 xl:border-r"
                    : ""
                } ${i % 2 === 0 ? "md:border-r" : "md:border-r-0"} ${
                  i < 2 ? "md:border-b xl:border-b-0" : ""
                }`}
              >
                <div className="flex items-baseline gap-2">
                  <span
                    className={`font-mono text-[11px] ${
                      stage.emphasis === "current"
                        ? "text-ink"
                        : stage.emphasis === "active"
                          ? "text-gold"
                          : stage.emphasis === "planned"
                            ? "text-ink-muted"
                            : "text-ink-faint"
                    }`}
                  >
                    {stage.index}
                  </span>
                  <h2
                    className={`text-[14px] font-semibold ${
                      stage.emphasis === "current"
                        ? "text-ink"
                        : stage.emphasis === "active"
                          ? "text-gold"
                          : stage.emphasis === "planned"
                            ? "text-ink-secondary"
                            : "text-ink-muted"
                    }`}
                  >
                    {stage.label}
                  </h2>
                </div>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                  {stage.layer}
                </p>

                <div className="mt-5 space-y-4">
                  {stage.groups.map((g) => (
                    <div key={g.title}>
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
                        {g.title}
                      </p>
                      <ul className="mt-1.5 space-y-1">
                        {g.items.map((item) => (
                          <li
                            key={item}
                            className={`text-[12px] leading-snug ${
                              stage.emphasis === "future"
                                ? "text-ink-faint"
                                : "text-ink-secondary"
                            }`}
                          >
                            {item}
                          </li>
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
          <SectionHeader
            align="left"
            eyebrow="Status definitions"
            title="How maturity labels are used."
          />
          <div className="mt-8 grid gap-0 border border-border sm:grid-cols-2">
            {[
              {
                t: "Implemented foundation",
                d: "Capability or architecture is implemented as part of the current platform foundation.",
              },
              {
                t: "Active development",
                d: "Work is actively progressing but may not yet be ready for production use. Progress is not equal across all items.",
              },
              {
                t: "Planned",
                d: "Part of the intended platform direction but not yet committed to release timing.",
              },
              {
                t: "Future direction",
                d: "Long-term product direction subject to research, validation and prioritization. Not committed delivery.",
              },
            ].map((s, i) => (
              <div
                key={s.t}
                className={`p-5 ${i < 3 ? "border-b border-border" : ""} ${
                  i % 2 === 0 ? "sm:border-r" : ""
                } ${i < 2 ? "sm:border-b" : "sm:border-b-0"}`}
              >
                <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                  {s.t}
                </p>
                <p className="mt-2 text-[13px] text-ink-secondary">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Capability dependencies"
            title="Later capabilities build on earlier foundations."
            description="Deliberate architecture — not random feature development."
          />
          <div className="mt-8 max-w-2xl space-y-0 border-t border-border">
            {DEPENDENCIES.map((dep) => (
              <div
                key={dep.capability}
                className="grid gap-1 border-b border-border-subtle py-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4"
              >
                <p className="text-[13px] font-medium text-ink">{dep.capability}</p>
                <p className="font-mono text-[10px] text-ink-faint sm:text-center">
                  depends on
                </p>
                <p className="text-[13px] text-ink-secondary">{dep.depends}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="How roadmap priorities are evaluated"
            title="Operational and technical criteria."
          />
          <div className="mt-8 flex flex-wrap gap-1.5">
            {PRIORITIES.map((p) => (
              <span
                key={p}
                className="border border-border-subtle bg-bg/50 px-2.5 py-1.5 text-[12px] text-ink-secondary"
              >
                {p}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[12px] text-ink-faint">
            No customer-voting system is claimed unless implemented.
          </p>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Product maturity model"
            title="How capabilities should progress."
            description="A product maturity model — not a claim that every current feature has passed all stages."
          />
          <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[11px] text-ink-secondary">
            {[
              "Concept",
              "Architecture",
              "Implementation",
              "Internal validation",
              "Operational validation",
              "Production readiness",
            ].map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="text-ink-faint" aria-hidden>
                    ↓
                  </span>
                )}
                <span className="border border-border bg-surface/40 px-2.5 py-1.5">
                  {s}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <div className="max-w-2xl border border-border bg-surface/30 p-6">
            <p className="label">Roadmap policy</p>
            <p className="mt-3 text-[14px] text-ink-secondary">
              The roadmap represents current development direction rather than a
              contractual delivery schedule. Priorities may change based on
              technical dependencies, validation outcomes, operational requirements
              and security considerations. No release dates, delivery commitments
              or commercial availability claims are implied by stage placement.
            </p>
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">
              Discuss how the platform direction aligns with your operational
              requirements.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/request-demo">
                Request Demo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/platform" variant="secondary">
                Explore Platform
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

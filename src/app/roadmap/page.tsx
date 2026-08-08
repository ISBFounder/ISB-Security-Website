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
    "ISB Security Platform product direction — current foundation, active development, planned expansion and future direction without artificial deadlines.",
  alternates: { canonical: `${SITE.url}/roadmap` },
  openGraph: {
    title: `Product Roadmap | ${SITE.name}`,
    description:
      "ISB Security Platform product direction — current foundation, active development, planned expansion and future direction without artificial deadlines.",
    url: `${SITE.url}/roadmap`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Product Roadmap | ${SITE.name}`,
    description:
      "ISB Security Platform product direction — current foundation, active development, planned expansion and future direction without artificial deadlines.",
  },
};

const STAGES = [
  {
    index: "01",
    label: "Current Foundation",
    emphasis: "current" as const,
    layer: "Foundation",
    groups: [
      {
        title: "Platform core",
        items: [
          "Multi-tenant architecture foundations",
          "Organization context",
          "User context",
          "Role and permission foundations",
          "Audit foundations",
          "Object/location hierarchy foundations",
        ],
      },
      {
        title: "Reporting",
        items: [
          "Specific Report workflow",
          "Structured reporting foundation",
          "AI-assisted Specific Report MVP",
          "Review workflow foundations",
          "Report history foundations",
        ],
      },
      {
        title: "Data / operations",
        items: [
          "Tenant-aware data context",
          "Access foundations",
          "Secure storage foundations",
        ],
      },
    ],
  },
  {
    index: "02",
    label: "Active Development",
    emphasis: "active" as const,
    layer: "Operational depth",
    groups: [
      {
        title: "Reporting expansion",
        items: [
          "Broader report workflows",
          "Incident reports",
          "Damage reports",
          "Accident reports",
          "Daily reporting",
        ],
      },
      {
        title: "Operations",
        items: [
          "Notifications",
          "Operational tasks",
          "Escalation workflows",
          "Supervisor workflows",
        ],
      },
      {
        title: "Objects",
        items: [
          "Deeper object context",
          "Instructions",
          "Risks",
          "Contacts",
          "Resources",
          "Documents",
        ],
      },
      {
        title: "Personnel",
        items: [
          "Personnel context",
          "Qualifications",
          "Certifications",
          "Assignments",
          "Availability",
        ],
      },
      {
        title: "Mobile & dashboards",
        items: [
          "Mobile-oriented workflows",
          "Field usability",
          "Operational overview",
          "Management context",
        ],
      },
    ],
  },
  {
    index: "03",
    label: "Planned Expansion",
    emphasis: "planned" as const,
    layer: "Connectivity & scale",
    groups: [
      {
        title: "Operations",
        items: [
          "Scheduling",
          "Patrol workflow expansion",
          "Checkpoint verification",
          "Workflow automation direction",
        ],
      },
      {
        title: "Customer access",
        items: ["Customer portals", "Scoped customer visibility"],
      },
      {
        title: "Connectivity",
        items: [
          "Offline-capable workflows",
          "Realtime synchronization expansion",
        ],
      },
      {
        title: "Integration & analytics",
        items: [
          "API integration framework",
          "External system connectivity direction",
          "Broader operational analytics",
        ],
      },
    ],
  },
  {
    index: "04",
    label: "Future Direction",
    emphasis: "future" as const,
    layer: "Intelligence & expansion",
    groups: [
      {
        title: "Intelligence",
        items: [
          "Operational pattern analysis",
          "Risk signals",
          "Recommendations",
          "Deeper operational insights",
        ],
      },
      {
        title: "Workforce intelligence",
        items: [
          "Talent & Operations Intelligence",
          "Development recommendations",
          "Role-fit decision support",
        ],
      },
      {
        title: "Team intelligence",
        items: [
          "Team Compatibility Engine",
          "Team composition support",
          "Complementary strengths analysis",
        ],
      },
      {
        title: "Platform expansion",
        items: [
          "Modular expansion into adjacent operational sectors",
          "International scalability direction",
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
    capability: "Offline workflows",
    depends: "Stable synchronization foundations",
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
      {/* Hero */}
      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="label">Roadmap</p>
            <h1 className="heading-xl mt-3">
              Product direction, without artificial deadlines.
            </h1>
            <p className="body-lg mt-6 max-w-2xl">
              ISB Security Platform is developed in stages. The roadmap reflects
              current product direction and may evolve as development, validation
              and operational requirements change.
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

      {/* Layer progression */}
      <section className="section divider !pt-8">
        <div className="container-site">
          <p className="label mb-4">Architecture progression</p>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[12px] text-ink-secondary">
            {[
              "Foundation",
              "Operational depth",
              "Connectivity & scale",
              "Intelligence & expansion",
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

      {/* Connected roadmap track */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Product roadmap"
            title="Four maturity stages. One connected direction."
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

      {/* Status definitions */}
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
                d: "Core capability or architecture exists as part of the current development foundation. Not a claim of production-complete status unless verified.",
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

      {/* Dependencies */}
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

      {/* Prioritization */}
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

      {/* Product maturity model */}
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

      {/* Roadmap policy */}
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

      {/* CTA */}
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

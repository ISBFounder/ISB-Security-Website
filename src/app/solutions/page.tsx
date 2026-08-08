import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { EnvironmentExplorer } from "@/components/solutions/EnvironmentExplorer";
import { SITE } from "@/lib/constants";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Security Operations Solutions",
  description:
    "Operational workflows and solution scenarios for object security, mobile patrol, events, retail, corporate, healthcare and public-sector environments.",
  alternates: { canonical: `${SITE.url}/solutions` },
  openGraph: {
    title: `Security Operations Solutions | ${SITE.name}`,
    description:
      "Operational workflows and solution scenarios for object security, mobile patrol, events, retail, corporate, healthcare and public-sector environments.",
    url: `${SITE.url}/solutions`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Security Operations Solutions | ${SITE.name}`,
    description:
      "Operational workflows and solution scenarios for object security, mobile patrol, events, retail, corporate, healthcare and public-sector environments.",
  },
};

export default function SolutionsPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
        ])}
      />
      {/* Hero */}
      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="label">Solutions</p>
            <h1 className="heading-xl mt-3">
              Solutions designed around real security operations.
            </h1>
            <p className="body-lg mt-6 max-w-2xl">
              Every operational environment has different requirements, risks and
              stakeholders — while sharing one platform foundation for reporting,
              objects, personnel and audit.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/request-demo">
                Request Demo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/platform" variant="secondary">
                Explore Platform
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Environment explorer */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Operational environments"
            title="Select an environment to explore the operational model."
            description="Each workspace shows context, risks, stakeholders, workflow, controls and how ISB changes the flow — not a feature list."
          />
          <div className="mt-10">
            <EnvironmentExplorer />
          </div>
        </div>
      </section>

      {/* Stakeholder matrix */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Stakeholder matrix"
            title="Different roles. Different visibility."
            description="Illustrative responsibilities and platform relevance — not a claim of every module released for every role."
          />
          <div className="mt-10 overflow-x-auto border border-border">
            <table className="w-full min-w-[640px] text-left text-[12px]">
              <thead>
                <tr className="border-b border-border bg-surface/40 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Operational responsibilities</th>
                  <th className="px-4 py-3 font-medium">Relevant modules</th>
                  <th className="px-4 py-3 font-medium">Information visibility</th>
                </tr>
              </thead>
              <tbody className="text-ink-secondary">
                {[
                  [
                    "Officer",
                    "Field reporting, patrols, checkpoint confirmation",
                    "Reporting · Objects · Operations",
                    "Assigned objects and own reports",
                  ],
                  [
                    "Supervisor",
                    "Review, approval, escalation, team oversight",
                    "Reporting · Operations · Personnel",
                    "Team scope and pending reviews",
                  ],
                  [
                    "Planner",
                    "Assignments, routes, coverage planning",
                    "Personnel · Objects · Operations",
                    "Sites and personnel availability",
                  ],
                  [
                    "Operations Manager",
                    "Multi-site oversight, escalation ownership",
                    "Operations · Reporting · Compliance",
                    "Organization operational overview",
                  ],
                  [
                    "Customer",
                    "Scoped visibility into contracted sites",
                    "Reporting · Objects (planned portal)",
                    "Contracted objects and agreed records",
                  ],
                  [
                    "Management",
                    "Accountability, contractual evidence",
                    "Compliance · Reporting · Audit",
                    "Aggregated operational evidence",
                  ],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-border-subtle last:border-0">
                    <td className="px-4 py-3 font-medium text-ink">{row[0]}</td>
                    <td className="px-4 py-3">{row[1]}</td>
                    <td className="px-4 py-3">{row[2]}</td>
                    <td className="px-4 py-3">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Platform relationship */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Platform relationship"
            title="Operational domains share one foundation."
          />
          <div className="mt-10 flex flex-wrap items-center gap-2 font-mono text-[12px] text-ink-secondary">
            {[
              "Reporting",
              "Objects",
              "Personnel",
              "Compliance",
              "Audit",
              "AI Assistance",
              "Management Insight",
            ].map((d, i) => (
              <span key={d} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="text-ink-faint" aria-hidden>
                    ↓
                  </span>
                )}
                <span className="border border-border bg-surface/40 px-3 py-2">
                  {d}
                </span>
              </span>
            ))}
          </div>
          <p className="mt-4 max-w-2xl text-[13px] text-ink-muted">
            Environments differ in risk and workflow. The platform domains remain
            connected so reports, objects, people and audit context do not fragment
            again.
          </p>
        </div>
      </section>

      {/* Implementation considerations */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Implementation considerations"
            title="From current process to structured operations."
            description="Engagement topics — not delivery commitments or fixed timelines."
          />
          <div className="mt-10 grid gap-0 border border-border sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "Current operational processes",
                d: "Map how reporting, handovers and object instructions work today.",
              },
              {
                t: "Migration planning",
                d: "Identify which workflows move first without disrupting field operations.",
              },
              {
                t: "Configuration",
                d: "Organizations, customers, objects, roles and requirements.",
              },
              {
                t: "Training",
                d: "Officers, supervisors and planners on structured reporting and review.",
              },
              {
                t: "Pilot deployment",
                d: "Limited operational scope to validate fit before wider rollout.",
              },
              {
                t: "Future expansion",
                d: "Additional modules and environments as maturity and need grow.",
              },
            ].map((item, i) => (
              <div
                key={item.t}
                className={`p-5 ${
                  i < 5 ? "border-b border-border sm:border-r" : ""
                } ${i % 2 === 1 ? "sm:border-r-0 lg:border-r" : ""} ${
                  i >= 3 ? "lg:border-b-0" : ""
                }`}
              >
                <p className="text-[13px] font-semibold text-ink">{item.t}</p>
                <p className="mt-2 text-[12px] text-ink-muted">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section divider">
        <div className="container-site">
          <div className="border border-border bg-surface/40 p-8 md:p-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="heading-lg">
                Discuss how ISB maps to your operation.
              </h2>
              <p className="body mt-4">
                Request a demonstration or contact ISB to explore operational fit
                for your environment.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
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
        </div>
      </section>
    </>
  );
}

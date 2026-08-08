import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { AILifecycleExplorer } from "@/components/ai/AILifecycleExplorer";
import { SITE } from "@/lib/constants";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI-Assisted Security Operations",
  description:
    "AI-assisted reporting for security operations — structured drafts under human review and supervisor approval, with clear maturity stages and no autonomous decisions.",
  alternates: { canonical: `${SITE.url}/ai` },
  openGraph: {
    title: `AI-Assisted Security Operations | ${SITE.name}`,
    description:
      "AI-assisted reporting for security operations — structured drafts under human review and supervisor approval, with clear maturity stages and no autonomous decisions.",
    url: `${SITE.url}/ai`,
  },
  twitter: {
    card: "summary_large_image",
    title: `AI-Assisted Security Operations | ${SITE.name}`,
    description:
      "AI-assisted reporting for security operations — structured drafts under human review and supervisor approval, with clear maturity stages and no autonomous decisions.",
  },
};

export default function AIPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "AI", path: "/ai" },
        ])}
      />
      {/* Hero */}
      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="label">AI</p>
            <h1 className="heading-xl mt-3">
              AI that assists the operation. Not the operator.
            </h1>
            <p className="body-lg mt-6 max-w-2xl">
              ISB AI is designed to reduce administrative friction, improve report
              structure and support operational understanding while keeping
              responsibility with authorized personnel.
            </p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {[
                "MVP foundation",
                "Active development",
                "Planned intelligence",
                "Future direction",
              ].map((s) => (
                <span
                  key={s}
                  className="border border-border-subtle bg-surface/40 px-2.5 py-1 font-mono text-[10px] text-ink-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Operating principle */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="AI operating principle"
            title="Assistance inside a controlled workflow."
          />
          <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[12px] text-ink-secondary">
            {[
              "Operational input",
              "AI assistance",
              "Human review",
              "Authorized approval",
              "Auditable record",
            ].map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                {i > 0 && <span className="text-ink-faint" aria-hidden>↓</span>}
                <span className="border border-border bg-surface/40 px-3 py-2">{s}</span>
              </span>
            ))}
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="label mb-2">AI may assist with</p>
              <ul className="space-y-1.5 text-[13px] text-ink-secondary">
                {[
                  "Structure",
                  "Language clarity",
                  "Information extraction",
                  "Completeness suggestions",
                  "Future operational analysis",
                ].map((x) => (
                  <li key={x}>· {x}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label mb-2">AI does not</p>
              <ul className="space-y-1.5 text-[13px] text-ink-muted">
                {[
                  "Make final operational decisions",
                  "Approve reports",
                  "Replace escalation procedures",
                  "Replace supervisors",
                  "Determine legal compliance",
                ].map((x) => (
                  <li key={x}>· {x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Report Assistant workflow */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Report Assistant workflow"
            title="Specific Report · MVP foundation."
            description="Field notes through finalized record. Illustrative demonstration data only."
          />
          <div className="mt-10">
            <AILifecycleExplorer />
          </div>
        </div>
      </section>

      {/* Human control */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Human control model"
            title="AI cannot finalize the operational record by itself."
          />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 border border-border bg-surface/30 px-4 py-4 font-mono text-[12px] text-ink-muted sm:gap-3">
            <span className="text-gold">AI assists</span>
            <span className="text-ink-faint" aria-hidden>↓</span>
            <span className="text-ink-secondary">Officer reviews</span>
            <span className="text-ink-faint" aria-hidden>↓</span>
            <span className="text-ink-secondary">Supervisor approves</span>
            <span className="text-ink-faint" aria-hidden>↓</span>
            <span className="text-ink-secondary">Record finalized</span>
          </div>
          <ul className="mx-auto mt-6 max-w-xl space-y-2 text-[13px] text-ink-secondary">
            <li>Authorized users retain responsibility</li>
            <li>Revision history preserves review context</li>
            <li>Where the workflow requires approval, supervisor decision is human</li>
            <li>Future AI recommendations remain advisory</li>
          </ul>
        </div>
      </section>

      {/* Data handling */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Data handling principles"
            title="AI access follows platform permissions."
          />
          <ul className="mt-6 max-w-2xl space-y-2 text-[13px] text-ink-secondary">
            <li>Operational context remains scoped</li>
            <li>Only relevant data should be included</li>
            <li>Sensitive data handling requires deployment controls</li>
            <li>
              AI processing architecture must be validated before production release
            </li>
            <li>
              No claim of zero retention, private model, EU-only inference, isolated
              model or encrypted inference unless verified
            </li>
          </ul>
          <Link
            href="/security"
            className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-ink-secondary transition-colors hover:text-gold"
          >
            Security & Trust
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* Maturity */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="AI capability maturity"
            title="MVP foundation through future direction."
          />
          <div className="mt-10 grid gap-0 border border-border md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                stage: "Implemented foundation / MVP",
                items:
                  "AI-assisted Specific Report · structured drafting · language clarity · basic extraction · human review workflow",
              },
              {
                stage: "Active development",
                items:
                  "Richer context suggestions · broader report support · consistency checks · improved workflow integration",
              },
              {
                stage: "Planned",
                items:
                  "Operational insights · pattern detection · risk signals · broader context analysis",
              },
              {
                stage: "Future direction",
                items:
                  "Recommendations · Talent & Operations Intelligence · Team Compatibility Engine · predictive operational support",
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

      {/* Insights / patterns / risk */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Planned intelligence"
            title="Insights, patterns and review signals — future analysis direction."
            description="Not production availability. No autonomous threat prediction or quantitative risk scores."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="border border-border bg-surface/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                Operational insights
              </p>
              <p className="mt-2 text-[12px] text-ink-secondary">
                Operational data → structured context → trend detection → human
                interpretation. Recurring incidents, object issues, report
                consistency, patrol anomalies, qualification trends.
              </p>
            </div>
            <div className="border border-border bg-surface/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                Pattern analysis
              </p>
              <p className="mt-2 text-[12px] text-ink-secondary">
                Repeated incidents at the same object, recurring missed checkpoints,
                escalation types, object-risk themes. Future analysis direction.
              </p>
            </div>
            <div className="border border-border bg-surface/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                Risk signals
              </p>
              <p className="mt-2 text-[12px] text-ink-secondary">
                Repeated pattern + operational deviation + object risk context →
                review signal for human prioritization. No fake percentage scores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Future recommendations"
            title="Advisory only. Human assessment required."
          />
          <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[12px] text-ink-secondary">
            {["Recommendation", "Authorized human assessment", "Decision"].map(
              (s, i) => (
                <span key={s} className="flex items-center gap-2">
                  {i > 0 && <span className="text-ink-faint" aria-hidden>→</span>}
                  <span className="border border-border bg-surface/40 px-3 py-2">{s}</span>
                </span>
              )
            )}
          </div>
          <p className="mt-4 text-[13px] text-ink-muted">
            Future systems may suggest follow-up actions, workflow attention,
            training needs or operational review areas. No automatic execution.
          </p>
        </div>
      </section>

      {/* TOI + Team Compatibility */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="label">Future direction</p>
              <h2 className="heading-md mt-2">Talent & Operations Intelligence</h2>
              <p className="body mt-3">
                Decision-support direction for role-fit insights, training
                recommendations, development progression and operational performance
                context. Human review required. Not automated hiring, discriminatory
                profiling or psychological diagnosis.
              </p>
            </div>
            <div>
              <p className="label">Future direction</p>
              <h2 className="heading-md mt-2">Team Compatibility Engine</h2>
              <p className="body mt-3">
                Team composition support, complementary strengths and staffing
                recommendations under human review. Not automatic rejection,
                personality diagnosis, protected-attribute profiling or employment
                decisions without human judgment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Limitations */}
      <section className="section divider">
        <div className="container-site">
          <div className="max-w-2xl border border-border bg-surface/30 p-6">
            <p className="label">AI limitations</p>
            <ul className="mt-4 space-y-2 text-[13px] text-ink-secondary">
              <li>AI output may be incorrect</li>
              <li>Context may be incomplete</li>
              <li>Human review remains mandatory</li>
              <li>AI does not replace escalation procedures</li>
              <li>AI does not provide legal advice</li>
              <li>AI does not replace security judgment</li>
              <li>Future models require validation before deployment</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Responsible AI */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <p className="label">Responsible AI principles</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {[
              "Human accountability",
              "Controlled access",
              "Traceable assistance",
              "Purpose limitation",
              "Operational relevance",
              "Validation before deployment",
            ].map((p) => (
              <span
                key={p}
                className="border border-border-subtle bg-bg/50 px-2.5 py-1.5 text-[12px] text-ink-secondary"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section divider">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">
              Evaluate how AI-assisted reporting could fit your operational
              workflow.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/request-demo">
                Request Demo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/security" variant="secondary">
                Explore Security
              </Button>
              <Button href="/platform" variant="secondary">
                Explore Platform
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

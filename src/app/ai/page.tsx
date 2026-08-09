import type { Metadata } from "next";
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
    "AI-assisted reporting for security operations — built on structured operational data and secure workflows, under human review and supervisor approval. No autonomous decisions.",
  alternates: { canonical: `${SITE.url}/ai` },
  openGraph: {
    title: `AI-Assisted Security Operations | ${SITE.name}`,
    description:
      "AI-assisted reporting for security operations — built on structured operational data and secure workflows under human review. No autonomous decisions.",
    url: `${SITE.url}/ai`,
  },
  twitter: {
    card: "summary_large_image",
    title: `AI-Assisted Security Operations | ${SITE.name}`,
    description:
      "AI-assisted reporting for security operations — structured drafts under human review. No autonomous decisions.",
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

      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="label">AI</p>
            <h1 className="heading-xl mt-3">
              AI that assists the operation. Not the operator.
            </h1>
            <p className="body-lg mt-6 max-w-2xl">
              AI capabilities are built on top of structured operational data, secure
              workflows and validated platform context. ISB AI is designed to reduce
              administrative friction and improve report structure while keeping
              responsibility with authorized personnel — not autonomous decisions.
            </p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {["MVP foundation", "Active development", "Planned intelligence", "Future direction"].map((s) => (
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

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="AI operating principle"
            title="Assistance inside a controlled workflow."
          />
          <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[12px] text-ink-secondary">
            {["Field notes", "Structured extraction", "AI draft", "Human review", "Supervisor approval", "Locked record"].map(
              (s, i) => (
                <span key={s} className="flex items-center gap-2">
                  {i > 0 && <span className="text-ink-faint" aria-hidden>→</span>}
                  <span className="border border-border bg-surface/40 px-2.5 py-1.5">{s}</span>
                </span>
              )
            )}
          </div>
          <p className="mt-4 max-w-2xl text-[13px] text-ink-muted">
            AI assists with structure, clarity and completeness. The officer and supervisor remain
            responsible for the final operational record.
          </p>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Report assistant"
            title="Specific Report assistant · built on structured operational data."
            description="The demonstrable AI workflow turns field notes into structured draft reports for human review. Expansion beyond this foundation remains under development."
          />
          <div className="mt-10">
            <AILifecycleExplorer />
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Human control"
            title="AI drafts. Humans decide."
          />
          <div className="mt-8 grid gap-0 border border-border sm:grid-cols-2">
            {[
              { t: "Officer review", d: "The officer reviews and corrects AI-assisted structure before submission." },
              { t: "Supervisor approval", d: "Final operational acceptance remains with authorized supervisors." },
              { t: "No autonomous decisions", d: "AI does not approve reports, classify incidents autonomously or replace escalation procedures." },
              { t: "Traceable activity", d: "AI assistance is intended to remain visible within the operational record and review path." },
            ].map((item, i) => (
              <div key={item.t} className={`p-5 ${i < 3 ? "border-b border-border" : ""} ${i % 2 === 0 ? "sm:border-r" : ""} ${i < 2 ? "sm:border-b" : "sm:border-b-0"}`}>
                <p className="font-mono text-[10px] uppercase tracking-wider text-gold">{item.t}</p>
                <p className="mt-2 text-[13px] text-ink-secondary">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Capability maturity"
            title="MVP foundation through future direction."
          />
          <div className="mt-8 grid gap-0 border border-border md:grid-cols-3">
            {[
              { stage: "Implemented foundation / MVP", items: "Specific Report AI assistant · structured extraction support · human review required" },
              { stage: "Active development", items: "Broader report-type assistance · improved review UX · audit visibility of AI activity" },
              { stage: "Planned / future", items: "Risk signals · operational recommendations · talent intelligence · team compatibility — not live decision systems" },
            ].map((m, i) => (
              <div key={m.stage} className={`p-5 ${i < 2 ? "border-b border-border md:border-b-0 md:border-r" : ""}`}>
                <p className="font-mono text-[10px] uppercase tracking-wider text-gold">{m.stage}</p>
                <p className="mt-3 text-[13px] text-ink-secondary">{m.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">Evaluate how AI-assisted reporting could fit your operational workflow.</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/request-demo">Request Demo <ArrowRight className="h-4 w-4" aria-hidden /></Button>
              <Button href="/security" variant="secondary">Explore Security</Button>
              <Button href="/platform" variant="secondary">Explore Platform</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

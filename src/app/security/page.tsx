import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { TrustArchitecture } from "@/components/security/TrustArchitecture";
import { SITE } from "@/lib/constants";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Security & Trust",
  description:
    "How ISB Security Platform is designed around identity, role-based access, tenant boundaries, auditability, privacy and responsible disclosure.",
  alternates: { canonical: `${SITE.url}/security` },
  openGraph: {
    title: `Security & Trust | ${SITE.name}`,
    description:
      "How ISB Security Platform is designed around identity, role-based access, tenant boundaries, auditability, privacy and responsible disclosure.",
    url: `${SITE.url}/security`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Security & Trust | ${SITE.name}`,
    description:
      "How ISB Security Platform is designed around identity, role-based access, tenant boundaries, auditability, privacy and responsible disclosure.",
  },
};

export default function SecurityPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Security", path: "/security" },
        ])}
      />
      {/* Hero */}
      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="label">Security & Trust</p>
            <h1 className="heading-xl mt-3">
              Security architecture built around control and accountability.
            </h1>
            <p className="body-lg mt-6 max-w-2xl">
              ISB Security Platform is being designed around controlled identity,
              role-based access, tenant-aware data boundaries, traceable actions
              and disciplined production controls.
            </p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {[
                "Design foundation",
                "Active hardening",
                "Planned validation",
                "Future compliance direction",
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

      {/* Philosophy */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Security philosophy"
            title="Boundaries, access and traceability."
          />
          <ul className="mt-8 max-w-2xl space-y-2.5 text-[14px] text-ink-secondary">
            {[
              "Least-privilege access",
              "Explicit organizational context",
              "Tenant-aware separation",
              "Controlled operational actions",
              "Traceable changes",
              "Privacy-conscious data handling",
              "Secure development practices",
            ].map((p) => (
              <li key={p} className="flex gap-2 border-b border-border-subtle py-2 last:border-0">
                <span className="mt-2 h-1 w-1 shrink-0 bg-gold/70" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Trust architecture */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Trust architecture"
            title="How access narrows through context."
            description="Each layer constrains the next. Select a layer for purpose, control and maturity."
          />
          <div className="mt-10 max-w-2xl">
            <TrustArchitecture />
          </div>
        </div>
      </section>

      {/* Identity & access */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Identity & access"
            title="Authenticated context before operational action."
            description="Authenticated user context, organization context, role context, assignment context and permission scope. Designed around least-privilege access. SSO and MFA are not claimed unless implemented."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                role: "Officer",
                scope: "Create reports · access assigned objects · complete operational tasks",
              },
              {
                role: "Supervisor",
                scope: "Review reports · manage escalations · oversee operational activity",
              },
              {
                role: "Customer representative",
                scope: "Scoped visibility · planned expansion",
              },
              {
                role: "Administrator",
                scope: "Configuration and administrative control",
              },
            ].map((r) => (
              <div key={r.role} className="border border-border bg-surface/30 p-4">
                <p className="text-[14px] font-semibold text-ink">{r.role}</p>
                <p className="mt-2 text-[12px] text-ink-muted">{r.scope}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tenant separation */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="label">Tenant separation</p>
              <h2 className="heading-md mt-3">Tenant-aware data separation</h2>
              <p className="body mt-4">
                Shared platform services sit above organization boundaries. No
                cross-tenant data access without authorized context. Not a claim of
                complete isolation guaranteed.
              </p>
            </div>
            <div className="border border-border bg-surface/30 p-5 font-mono text-[12px] leading-7 text-ink-secondary">
              <p className="text-gold">Shared platform services</p>
              <p className="mt-2">Organization A</p>
              <p className="pl-3">→ Customers → Objects → Users / Reports</p>
              <p className="mt-2">Organization B</p>
              <p className="pl-3">→ Customers → Objects → Users / Reports</p>
            </div>
          </div>
        </div>
      </section>

      {/* Data access */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Data access controls"
            title="Context before data."
            description="Tenant context, role context, object/customer context, row-level access foundations, server-side validation and controlled API access. Architecture supports row-level security controls — coverage expands with the platform."
          />
        </div>
      </section>

      {/* Auditability */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Auditability"
            title="Traceable operational actions."
            description="Report creation, review, approvals, object instruction changes, assignments, qualifications, escalations and administrative changes. Not a claim of legal immutability."
          />
          <div className="mt-8 max-w-md border border-border-subtle bg-bg/40 p-4 font-mono text-[12px] text-ink-secondary">
            <p className="text-[9px] uppercase tracking-wide text-ink-faint">
              Illustrative audit chain
            </p>
            <ul className="mt-3 space-y-1.5">
              <li>22:14 · Report created</li>
              <li>22:19 · Officer revised</li>
              <li>22:24 · Supervisor approved</li>
              <li>22:25 · Record finalized</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Secure development */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Secure development practices"
            title="Development direction for controlled change."
          />
          <div className="mt-8 flex flex-wrap gap-1.5">
            {[
              "Code review",
              "Environment separation",
              "Dependency management",
              "Server-side validation",
              "Secrets separation",
              "Deployment review",
              "Logging",
              "Testing",
              "Change control",
            ].map((p) => (
              <span
                key={p}
                className="border border-border-subtle bg-surface/40 px-2.5 py-1.5 text-[12px] text-ink-secondary"
              >
                {p}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[12px] text-ink-faint">
            Maturity varies by practice. Processes are not claimed as fully mature
            unless implemented.
          </p>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Infrastructure controls"
            title="Production access, environment separation, storage controls."
            description="Direction around production access controls, secure secrets handling, service monitoring and controlled deployment. No infrastructure credentials, endpoints, IP ranges, topology or admin URLs disclosed. No claim of 24/7 SOC, multi-region failover or sovereign cloud."
          />
        </div>
      </section>

      {/* Data integrity & recovery */}
      <section className="section divider">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="label">Data integrity</p>
              <h2 className="heading-md mt-3">Preserving operational record history</h2>
              <p className="body mt-4">
                Validation, version history, change records, review states and
                controlled finalization. Not legal immutability.
              </p>
            </div>
            <div>
              <p className="label">Recovery direction</p>
              <h2 className="heading-md mt-3">Backups, restore and continuity</h2>
              <p className="body mt-4">
                Future direction for backups, recovery procedures, restore testing
                and operational continuity.{" "}
                <span className="text-ink-muted">Planned validation.</span> No
                tested RPO/RTO figures claimed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Privacy by design"
            title="Designed with European privacy requirements in mind."
            description="Collect only operationally relevant data. Limit access by role and context. Separate organizational data. Review retention requirements. Minimize unnecessary personal data. Not a claim of full GDPR compliance certification. Legal review remains part of the maturity path."
          />
        </div>
      </section>

      {/* AI data handling */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="AI security & data handling"
            title="AI is assistive. Human review remains required."
          />
          <ul className="mt-6 max-w-2xl space-y-2 text-[13px] text-ink-secondary">
            <li>Input access follows platform permissions</li>
            <li>AI output must be treated as draft until reviewed</li>
            <li>Data handling controls are part of deployment design</li>
            <li>
              No claim of zero retention, private model, EU-only inference or no
              model training unless verified
            </li>
          </ul>
          <Link
            href="/ai"
            className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-ink-secondary transition-colors hover:text-gold"
          >
            Explore AI approach
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* Incident response */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Incident response direction"
            title="Operational security response model."
            description="Direction for detection, assessment, containment, investigation, recovery and review. Not a claim of 24/7 response or response SLAs."
          />
          <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[11px] text-ink-secondary">
            {[
              "Detection",
              "Assessment",
              "Containment",
              "Investigation",
              "Recovery",
              "Review",
            ].map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                {i > 0 && <span className="text-ink-faint" aria-hidden>→</span>}
                <span className="border border-border bg-surface/40 px-2.5 py-1.5">
                  {s}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance roadmap */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Compliance roadmap"
            title="Architecture to assessment — direction only."
            description="No certification claimed. No certification promised."
          />
          <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[11px] text-ink-secondary">
            {[
              "Architecture foundation",
              "Production hardening",
              "Internal validation",
              "External security testing",
              "Compliance assessment",
              "Future certification direction",
            ].map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                {i > 0 && <span className="text-ink-faint" aria-hidden>↓</span>}
                <span className="border border-border bg-surface/40 px-2.5 py-1.5">
                  {s}
                </span>
              </span>
            ))}
          </div>
          <p className="mt-4 text-[12px] text-ink-muted">
            Potential future areas: ISO 27001 readiness · GDPR governance ·
            relevant Dutch / European requirements · sector-specific assessment.
          </p>
        </div>
      </section>

      {/* Maturity model */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Security maturity model"
            title="What is foundation, active, planned and future."
          />
          <div className="mt-10 grid gap-0 border border-border md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                stage: "Foundation",
                items:
                  "RBAC architecture · tenant model · audit foundations · data context · server validation foundations",
              },
              {
                stage: "Active development",
                items:
                  "Production hardening · broader access coverage · observability · operational security controls",
              },
              {
                stage: "Planned validation",
                items:
                  "External testing · recovery testing · access review · infrastructure validation",
              },
              {
                stage: "Future direction",
                items:
                  "Compliance maturity · external assessments · certification readiness",
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

      {/* Responsible disclosure */}
      <section className="section divider">
        <div className="container-site">
          <div className="max-w-2xl border border-border bg-surface/30 p-6">
            <p className="label">Responsible disclosure</p>
            <p className="mt-3 text-[14px] text-ink-secondary">
              Security researchers, customers and organizations can report
              potential security issues directly to ISB Security Solutions.
            </p>
            <p className="mt-3">
              <a
                href={`mailto:${SITE.email}`}
                className="text-gold hover:text-gold-light"
              >
                {SITE.email}
              </a>
            </p>
            <p className="mt-3 text-[12px] text-ink-faint">
              No dedicated security mailbox, bug bounty or response SLA is claimed
              beyond direct contact.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Security FAQ"
            title="Direct answers to common review questions."
          />
          <div className="mt-8 max-w-2xl space-y-0 border-t border-border">
            {[
              {
                q: "Is ISB certified?",
                a: "No. Compliance and certification are a future direction, not a current claim.",
              },
              {
                q: "How is tenant data separated?",
                a: "Through tenant-aware data boundaries and context-scoped access. Not a guarantee of complete isolation.",
              },
              {
                q: "Does ISB support role-based access?",
                a: "Yes. The platform is designed around least-privilege role and permission scopes.",
              },
              {
                q: "How are actions audited?",
                a: "Critical operational actions are designed to be logged and associated with users. Traceable — not claimed immutable.",
              },
              {
                q: "Is AI autonomous?",
                a: "No. AI assists draft structure. Human review remains mandatory before official records.",
              },
              {
                q: "Has external testing been completed?",
                a: "External security testing is part of planned validation, not a completed claim.",
              },
            ].map((item) => (
              <div key={item.q} className="border-b border-border-subtle py-4">
                <p className="text-[14px] font-medium text-ink">{item.q}</p>
                <p className="mt-1.5 text-[13px] text-ink-secondary">{item.a}</p>
              </div>
            ))}
          </div>
          <Link
            href="/faq"
            className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-ink-secondary transition-colors hover:text-gold"
          >
            Full FAQ
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="section divider">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">
              Evaluate ISB Security Platform in the context of your security and
              governance requirements.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/request-demo">
                Request Demo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/technology" variant="secondary">
                Explore Technology
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

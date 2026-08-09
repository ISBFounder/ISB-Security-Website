import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { PlatformArchitecture } from "@/components/platform/PlatformArchitecture";
import { SITE } from "@/lib/constants";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Security Operations Platform",
  description:
    "ISB Security Platform — enterprise security operations platform with an established multi-tenant foundation, operational object hierarchy and expanding workforce capabilities.",
  alternates: { canonical: `${SITE.url}/platform` },
  openGraph: {
    title: `Security Operations Platform | ${SITE.name}`,
    description:
      "Enterprise security operations platform with an established operational foundation and continuously expanding capabilities.",
    url: `${SITE.url}/platform`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Security Operations Platform | ${SITE.name}`,
    description:
      "Enterprise security operations platform with an established operational foundation and continuously expanding capabilities.",
  },
};

export default function PlatformPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform" },
        ])}
      />

      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="label">Platform</p>
            <h1 className="heading-xl mt-3">
              Enterprise security operations platform with an established operational foundation.
            </h1>
            <p className="body-lg mt-6 max-w-2xl">
              ISB Security Platform is an enterprise security operations platform with an
              established operational foundation and continuously expanding capabilities —
              connecting organizations, customers, objects, personnel and operational workflows.
            </p>
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Architecture model"
            title="Structured from organization to checkpoint."
            description="Explore how location hierarchy, people and access, workflows and shared engines form one operating model."
          />
          <div className="mt-10">
            <PlatformArchitecture />
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="label">Multi-tenant structure</p>
              <h2 className="heading-md mt-3">Tenant-aware platform boundaries</h2>
              <p className="body mt-4">
                Organizations and their customers remain separated. Service providers can manage
                multiple customers; customers receive scoped visibility; objects carry their own
                requirements; permissions stay context-aware.
              </p>
              <ul className="mt-5 space-y-2 text-[13px] text-ink-secondary">
                <li>Service providers managing multiple customers</li>
                <li>Customers receiving scoped visibility</li>
                <li>Different objects using different requirements</li>
                <li>Permissions remaining context-aware</li>
              </ul>
            </div>
            <div className="border border-border bg-surface/30 p-5 font-mono text-[12px] leading-7 text-ink-secondary">
              <p className="text-gold">ISB Platform</p>
              <p className="pl-3">Organization A</p>
              <p className="pl-6">Customer A1</p>
              <p className="pl-9">Object A1 · Object A2</p>
              <p className="pl-6">Customer A2</p>
              <p className="pl-9">Object A3</p>
              <p className="mt-2 pl-3">Organization B</p>
              <p className="pl-6">Customer B1</p>
              <p className="pl-9">Object B1</p>
              <p className="mt-3 text-[11px] text-ink-faint">
                No cross-tenant data without explicit authorized context
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Object hierarchy"
            title="Operational context at every level."
            description="Each level of the hierarchy can carry instructions, risks, contacts and verification points relevant to how the site is secured."
          />
          <div className="mt-10 overflow-x-auto border border-border">
            <table className="w-full min-w-[560px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-border bg-surface/40 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                  <th className="px-4 py-3 font-medium">Level</th>
                  <th className="px-4 py-3 font-medium">Operational context</th>
                </tr>
              </thead>
              <tbody className="text-ink-secondary">
                {[
                  ["Customer", "Commercial relationship · visibility scope"],
                  ["Object", "Instructions · risks · contacts · documents"],
                  ["Building / Floor / Zone", "Access rules · patrol context"],
                  ["Room / Post", "Assignment instructions"],
                  ["Checkpoint", "Verification points"],
                  ["Asset", "Equipment information"],
                ].map(([level, ctx]) => (
                  <tr key={level} className="border-b border-border-subtle last:border-0">
                    <td className="px-4 py-3 font-medium text-ink">{level}</td>
                    <td className="px-4 py-3">{ctx}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="People & access"
            title="Different users. Same operation. Different scope."
            description="Designed around least-privilege access. User, role, permission, qualification, team and assignment determine what each person may see and do."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { role: "Officer", scope: "Field reporting on assigned objects. Limited organizational visibility." },
              { role: "Supervisor", scope: "Review, approval, escalation and team oversight within scope." },
              { role: "Customer representative", scope: "Scoped visibility into relevant objects and records. Expansion planned." },
              { role: "Administrator", scope: "Organization configuration, users and structural setup." },
            ].map((r) => (
              <div key={r.role} className="border border-border bg-surface/30 p-4">
                <p className="text-[14px] font-semibold text-ink">{r.role}</p>
                <p className="mt-2 text-[12px] text-ink-muted">{r.scope}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Platform engines"
            title="Shared services. Not isolated modules."
            description="Operational domains consume shared platform services for reporting, notifications, audit, realtime, offline, API and AI assistance."
          />
          <div className="mt-10 space-y-0 border border-border">
            {[
              {
                title: "Reporting Engine",
                text: "Specific Report workflow with review, approval, attachments and history is implemented foundation. Broader report types expand from this baseline.",
              },
              {
                title: "Notification Engine",
                text: "Workflow notifications, escalation notices, review requests and operational reminders. Configurable rules are a future direction.",
              },
              {
                title: "Audit Layer",
                text: "Critical actions, approvals, changes and operational history for traceability. Traceable operational actions — not a claim of legal immutability.",
              },
              {
                title: "Realtime & Offline",
                text: "Architecture supports realtime synchronization and offline-capable field workflows as expansion direction on the completed platform foundation.",
              },
              {
                title: "API Foundations",
                text: "Modular integration direction, controlled external access and future interoperability. No unverified integration claims.",
              },
            ].map((e, i, arr) => (
              <div
                key={e.title}
                className={`grid gap-2 px-5 py-4 sm:grid-cols-[200px_1fr] ${
                  i < arr.length - 1 ? "border-b border-border-subtle" : ""
                }`}
              >
                <p className="text-[13px] font-semibold text-ink">{e.title}</p>
                <p className="text-[13px] text-ink-secondary">{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Modular architecture"
            title="Same core. Different operational depth."
            description="Organizations may use different operational modules while sharing the same platform architecture. Not pricing tiers — deployment fit."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="border border-border bg-surface/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-gold">Example · smaller provider</p>
              <p className="mt-3 text-[13px] text-ink-secondary">Reporting · Objects · Personnel</p>
            </div>
            <div className="border border-border bg-surface/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-gold">Example · larger provider</p>
              <p className="mt-3 text-[13px] text-ink-secondary">
                Reporting · Objects · Personnel · Patrols · Scheduling · Customer visibility · Compliance · Intelligence
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Current platform foundation"
            title="What is already established."
            description="ISB Security Platform is not only an architecture concept. The operational foundation below is implemented and forms the base for workforce expansion and future intelligence."
          />
          <div className="mt-10 grid gap-0 border border-border sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Multi-tenant architecture", d: "Authentication, RBAC, row-level security, tenant isolation and company/customer separation." },
              { t: "Operational object hierarchy", d: "Company → Customer → Object through building, floor, zone, room, post and checkpoint — with instructions, risks, escalations and patrol requirements." },
              { t: "Secure document lifecycle", d: "Upload, versioning, archive/restore, signed downloads, classification controls and expiry handling." },
              { t: "Reporting foundation", d: "Structured Specific Report workflow with review, approval and history on shared operational context." },
              { t: "Workforce foundation", d: "Canonical shift lifecycle, assignment lifecycle, shift reconciliation and workforce notifications foundation — expanding in Phase 2.2." },
              { t: "Auditability", d: "Entity-scoped audit history, actor tracking, correlation IDs, changed-field summaries and operational event logging." },
            ].map((item, i) => (
              <div
                key={item.t}
                className={`p-5 border-border ${i < 5 ? "border-b" : ""} ${i % 2 === 0 ? "sm:border-r" : ""} ${i % 3 !== 2 ? "lg:border-r" : "lg:border-r-0"} ${i < 3 ? "lg:border-b" : "lg:border-b-0"}`}
              >
                <p className="font-mono text-[10px] uppercase tracking-wider text-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-[14px] font-semibold text-ink">{item.t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Development maturity"
            title="Established foundation. Active expansion. Planned intelligence."
          />
          <div className="mt-10 grid gap-0 border border-border md:grid-cols-3">
            {[
              {
                stage: "Implemented foundation",
                items:
                  "Multi-tenant SaaS · Authentication · RBAC · RLS · Tenant isolation · Operational object hierarchy · Document lifecycle · Reporting foundation · Audit framework · Secure storage",
              },
              {
                stage: "Active development",
                items:
                  "Workforce operations · Scheduling expansion · Service requests · Dispatch · Compliance engine · Matching engine · Persona workspaces",
              },
              {
                stage: "Planned",
                items:
                  "AI intelligence layer · Risk detection · Operational recommendations · Talent intelligence · Team compatibility",
              },
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
            <h2 className="heading-lg">Explore how ISB could map to your operation.</h2>
            <p className="body mt-4">
              Discuss platform foundation, operational fit and development direction with the ISB team.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/request-demo">
                Request Demo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/contact" variant="secondary">Contact ISB</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

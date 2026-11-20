import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { FeatureRow } from "@/components/features/FeatureRow";
import { FeatureStatus } from "@/components/features/FeatureStatus";
import { CapabilityNav } from "@/components/features/CapabilityNav";
import { SITE } from "@/lib/constants";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Security Operations Capabilities",
  description:
    "Capability catalogue for ISB Security Platform — reporting, objects, personnel, operations, security governance and intelligence by development stage.",
  alternates: { canonical: `${SITE.url}/features` },
  openGraph: {
    title: `Security Operations Capabilities | ${SITE.name}`,
    description:
      "Capability catalogue for ISB Security Platform — reporting, objects, personnel, operations, security governance and intelligence by development stage.",
    url: `${SITE.url}/features`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Security Operations Capabilities | ${SITE.name}`,
    description:
      "Capability catalogue for ISB Security Platform — reporting, objects, personnel, operations, security governance and intelligence by development stage.",
  },
};

export default function FeaturesPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
        ])}
      />
      <section className="section !pb-8">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="label">Features</p>
            <h1 className="heading-xl mt-3">
              Operational capability, structured by domain.
            </h1>
            <p className="body-lg mt-6 max-w-2xl">
              ISB Security Platform is built as a modular operational system.
              Capabilities are grouped by domain but share the same organizational,
              object, access and audit context.
            </p>
            <p className="mt-4 text-[13px] text-ink-muted">
              Development maturity labels, not commercial availability: Foundation established ·
              Active development · Discovery / architecture · Planned · Future / research.
            </p>
          </div>
        </div>
      </section>

      <CapabilityNav />

      <section id="reporting" className="section scroll-mt-28">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="label">Reporting</p>
              <h2 className="heading-md mt-2">Structured operational documentation</h2>
              <p className="body mt-3">
                Reporting and recovery are in active development. AI-assisted drafting
                requires human review and does not make operational decisions.
              </p>
              <div className="mt-6 border border-border-subtle bg-bg/40 p-4">
                <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                  Report lifecycle
                </p>
                <ol className="mt-3 space-y-1.5 text-[12px] text-ink-secondary">
                  {[
                    "Observation",
                    "Draft",
                    "AI assistance",
                    "Officer review",
                    "Supervisor review",
                    "Finalized record",
                    "History",
                  ].map((s, i) => (
                    <li key={s} className="flex gap-2">
                      <span className="font-mono text-[10px] text-ink-faint">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="border-t border-border">
              <FeatureRow name="Specific Report" purpose="Targeted operational reports with structured fields." stage="development" workflow="Observation → human review" connected="Objects, Personnel" />
              <FeatureRow name="AI-Assisted Specific Report" purpose="Draft structuring from field input under mandatory human review." stage="development" note="Does not decide" />
              <FeatureRow name="Daily Reports" purpose="Shift and daily operational summaries." stage="development" />
              <FeatureRow name="Incident Reports" purpose="Categorized incident registration with context." stage="development" />
              <FeatureRow name="Damage Reports" purpose="Damage registration with evidence support." stage="development" />
              <FeatureRow name="Accident Reports" purpose="Accident documentation workflows." stage="planned" />
              <FeatureRow name="Attachments & Photos" purpose="Files attached to reports. Not immutable evidence custody." stage="development" />
              <FeatureRow name="Voice Notes" purpose="Voice transcription for later processing." stage="planned" />
              <FeatureRow name="Digital Signatures" purpose="Formal acknowledgment support." stage="planned" />
              <FeatureRow name="Review & Approval" purpose="Supervisory review before finalization." stage="development" />
              <FeatureRow name="Report History" purpose="Version and change visibility." stage="development" />
            </div>
          </div>
        </div>
      </section>

      <section id="organizations" className="section divider scroll-mt-28 bg-bg-secondary/40">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="label">Organizations & Customers</p>
              <h2 className="heading-md mt-2">Multi-customer operational structure</h2>
              <p className="body mt-3">
                One security provider may manage several customers while maintaining
                separate operational context.
              </p>
              <div className="mt-6 border border-border bg-surface/30 p-4 font-mono text-[12px] leading-7 text-ink-secondary">
                <p className="text-gold">Organization</p>
                <p className="pl-3">→ Customer</p>
                <p className="pl-6">→ Objects</p>
                <p className="pl-9">→ Requirements</p>
                <p className="pl-9">→ Operational context</p>
              </div>
            </div>
            <div className="border-t border-border">
              <FeatureRow name="Company Management" purpose="Organization-level configuration." stage="foundation" />
              <FeatureRow name="Customer Management" purpose="Customer and object hierarchy management." stage="development" />
              <FeatureRow name="Multi-Tenant Structure" purpose="Company-scoped data boundaries between organizations." stage="foundation" />
              <FeatureRow name="Client-facing reporting" purpose="Client-facing reporting workflows. Not a released portal product." stage="development" />
              <FeatureRow name="Contact Management" purpose="Operational and emergency contacts." stage="development" />
              <FeatureRow name="Service requests and contracts" purpose="Service requirements linked to sites." stage="development" />
            </div>
          </div>
        </div>
      </section>

      <section id="objects" className="section divider scroll-mt-28">
        <div className="container-site">
          <p className="label">Objects & Locations</p>
          <h2 className="heading-md mt-2">Hierarchical site model</h2>
          <p className="body mt-3 max-w-2xl">
            Objects and locations are in active development. Document publication
            authority is in discovery, not an available publishing control.
          </p>
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="border border-border-subtle bg-bg/40 p-4 font-mono text-[12px] leading-7 text-ink-secondary">
              <p className="text-gold">Customer</p>
              <p className="pl-2">└ Object · instructions · risks · contacts · documents</p>
              <p className="pl-4">└ Building / Floor / Zone · access · patrol context</p>
              <p className="pl-6">└ Room / Post · assignment instructions</p>
              <p className="pl-8">└ Checkpoint · verification</p>
              <p className="pl-8">└ Asset · equipment</p>
            </div>
            <div className="border-t border-border">
              <FeatureRow name="Objects & Buildings" purpose="Site and building structure." stage="development" />
              <FeatureRow name="Floors, Zones, Rooms" purpose="Fine-grained location hierarchy." stage="development" />
              <FeatureRow name="Posts & Checkpoints" purpose="Patrol and inspection points." stage="development" />
              <FeatureRow name="Assets" purpose="Equipment and resource registration." stage="development" />
              <FeatureRow name="Emergency Contacts" purpose="Object-level emergency context." stage="development" />
              <FeatureRow name="Document workspaces" purpose="Object-linked documentation. Publication authority is in discovery." stage="development" />
              <FeatureRow name="Object History" purpose="Historical operational context per object." stage="development" />
              <FeatureRow name="Requirements & Risks" purpose="Site-specific instructions and risk notes." stage="development" />
              <FeatureRow name="Escalation Procedures" purpose="Object-linked escalation paths." stage="development" />
              <FeatureRow name="Patrol Routes" purpose="Route definitions across checkpoints." stage="development" />
              <FeatureRow name="Interactive site maps" purpose="Map-based site context." stage="planned" />
            </div>
          </div>
        </div>
      </section>

      <section id="personnel" className="section divider scroll-mt-28 bg-bg-secondary/40">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="label">Personnel</p>
              <h2 className="heading-md mt-2">People bound to operational context</h2>
              <p className="body mt-3">
                Scheduling and assignment authority are established foundations.
                Personnel management is in active development. Qualification authority
                is in discovery.
              </p>
              <div className="mt-6 border border-border-subtle bg-bg/40 p-4 text-[12px] text-ink-secondary">
                <p className="font-mono text-[9px] uppercase text-ink-faint">Assignment model</p>
                <ol className="mt-2 space-y-1">
                  {["Officer", "Qualification", "Role", "Assignment", "Shift", "Operational activity", "Audit record"].map(
                    (s, i) => (
                      <li key={s} className="flex gap-2">
                        <span className="font-mono text-[10px] text-ink-faint">{i + 1}</span>
                        {s}
                      </li>
                    )
                  )}
                </ol>
              </div>
            </div>
            <div className="border-t border-border">
              <FeatureRow name="User Management" purpose="Account and identity foundations." stage="foundation" />
              <FeatureRow name="Personnel Records" purpose="Operational personnel context." stage="development" />
              <FeatureRow name="Roles & Permissions" purpose="Least-privilege access scopes." stage="foundation" />
              <FeatureRow name="Qualifications & Certifications" purpose="Personnel qualification authority. Not an available qualification system." stage="discovery" />
              <FeatureRow name="Attendance and worked time" purpose="Attendance and finalized worked-time foundations." stage="foundation" />
              <FeatureRow name="Scheduling and assignment authority" purpose="Shift planning and assignment authority." stage="foundation" />
              <FeatureRow name="Team Management" purpose="Team structure for operational coordination." stage="development" />
              <FeatureRow name="Assignments" purpose="Link personnel to objects and shifts." stage="foundation" />
            </div>
          </div>
        </div>
      </section>

      <section id="operations" className="section divider scroll-mt-28">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="label">Operations</p>
              <h2 className="heading-md mt-2">Day-to-day operational control</h2>
              <p className="body mt-3">
                Security operations, patrols and incident workflows are in active
                development. Selected offline reporting and patrol workflows are part
                of the technical foundation. Not every module works offline. No
                realtime service level is claimed.
              </p>
              <div className="mt-6 border border-border-subtle bg-bg/40 p-4 text-[12px] text-ink-secondary">
                <p className="font-mono text-[9px] uppercase text-ink-faint">Operational flow</p>
                <ol className="mt-2 space-y-1">
                  {["Assignment", "Patrol", "Checkpoint", "Issue", "Escalation", "Notification", "Supervisor action", "Recorded outcome"].map(
                    (s, i) => (
                      <li key={s} className="flex gap-2">
                        <span className="font-mono text-[10px] text-ink-faint">{i + 1}</span>
                        {s}
                      </li>
                    )
                  )}
                </ol>
              </div>
            </div>
            <div className="border-t border-border">
              <FeatureRow name="Notifications" purpose="Workflow and escalation notices." stage="development" />
              <FeatureRow name="Tasks" purpose="Operational task assignment and tracking." stage="development" />
              <FeatureRow name="Patrols" purpose="Patrol execution against routes and objects." stage="development" />
              <FeatureRow name="Checkpoint Verification" purpose="Confirm or exception at checkpoints." stage="planned" note="Not claimed as released" />
              <FeatureRow name="Escalations" purpose="Structured escalation handling." stage="development" />
              <FeatureRow name="Duty journal and handovers" purpose="Shift handover records." stage="planned" />
              <FeatureRow name="Work orders" purpose="Work-order handling." stage="planned" />
              <FeatureRow name="Case management" purpose="Longer-running operational cases." stage="planned" />
              <FeatureRow name="Realtime Updates" purpose="Live operational status." stage="planned" note="No latency guarantee" />
              <FeatureRow name="Selected offline workflows" purpose="Selected offline reporting and patrol workflows. Not every module." stage="foundation" />
              <FeatureRow name="Selected mobile workflows" purpose="Selected mobile workflows in active development." stage="development" />
            </div>
          </div>
        </div>
      </section>

      <section id="security" className="section divider scroll-mt-28 bg-bg-secondary/40">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="label">Security & Governance</p>
              <h2 className="heading-md mt-2">Access, separation and traceability</h2>
              <p className="body mt-3">
                Designed around identity, role, tenant and action context. Architecture
                supports row-level data controls where relevant.
              </p>
              <div className="mt-6 border border-border-subtle bg-bg/40 p-4 font-mono text-[12px] leading-7 text-ink-secondary">
                <p>Identity → Role → Tenant → Data scope → Action → Audit</p>
              </div>
            </div>
            <div className="border-t border-border">
              <FeatureRow name="Role-Based Access Control" purpose="Permission scopes by operational role." stage="foundation" />
              <FeatureRow name="Company-scoped data" purpose="Company-scoped data and multi-tenant boundaries." stage="foundation" />
              <FeatureRow name="Audit and events" purpose="Traceable critical actions and approvals." stage="foundation" />
              <FeatureRow name="Bounded billing and payroll data" purpose="Bounded financial, billing and payroll-data foundations. Not a payroll product." stage="foundation" />
              <FeatureRow name="Integration outbox" purpose="Bounded outbound integration foundations." stage="foundation" />
              <FeatureRow name="Authentication" purpose="Authenticated user access model." stage="foundation" />
              <FeatureRow name="Enterprise connectors" purpose="External system connectors." stage="planned" />
              <FeatureRow name="Alarm-provider integrations" purpose="Connections to alarm providers." stage="planned" />
              <FeatureRow name="Centralized exports" purpose="Controlled export of operational records." stage="planned" />
              <FeatureRow name="Immutable evidence custody" purpose="Custody model for operational evidence." stage="discovery" />
              <FeatureRow name="Document publication authority" purpose="Who may publish the definitive document." stage="discovery" />
              <FeatureRow name="Privacy retention and legal hold" purpose="Retention and legal-hold governance." stage="discovery" />
            </div>
          </div>
        </div>
      </section>

      <section id="intelligence" className="section divider scroll-mt-28">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="label">Intelligence</p>
              <h2 className="heading-md mt-2">Assisted insight. Human decisions.</h2>
              <p className="body mt-3">
                AI-assisted report drafting is in active development. Connected analytics
                is planned. Predictive AI risk analysis is future research. AI does not
                make autonomous operational decisions.
              </p>
              <div className="mt-6 border border-border-subtle bg-bg/40 p-4 text-[12px] text-ink-secondary">
                <p className="font-mono text-[9px] uppercase text-ink-faint">Intelligence chain</p>
                <ol className="mt-2 space-y-1">
                  {["Operational data", "Structured context", "Patterns", "Human interpretation", "Future recommendation layer"].map(
                    (s, i) => (
                      <li key={s} className="flex gap-2">
                        <span className="font-mono text-[10px] text-ink-faint">{i + 1}</span>
                        {s}
                      </li>
                    )
                  )}
                </ol>
              </div>
            </div>
            <div className="border-t border-border">
              <FeatureRow name="AI Reporting" purpose="AI-assisted report drafting under human review." stage="development" note="Does not decide" />
              <FeatureRow name="Connected analytics" purpose="Connected views over operational data." stage="planned" />
              <FeatureRow name="Predictive AI risk analysis" purpose="Risk analysis research for human review. Not an autonomous decision system." stage="future" />
              <FeatureRow name="Wearable integrations" purpose="Wearable device research." stage="future" />
            </div>
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Status model"
            title="How capability stages are labeled"
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(
              [
                ["foundation", "Foundation established — technical foundations in the development platform. Not commercial availability."],
                ["development", "Active development — work in progress. Not production-validated."],
                ["discovery", "Discovery / architecture — authority and design questions. Not an available capability."],
                ["planned", "Planned — intended later capability. No release date."],
                ["future", "Future / research — research direction, not delivery."],
              ] as const
            ).map(([stage, text]) => (
              <div key={stage} className="border border-border bg-surface/30 p-4">
                <FeatureStatus stage={stage} />
                <p className="mt-2 text-[12px] text-ink-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">
              Explore how these capabilities map to your operation.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
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
    </>
  );
}

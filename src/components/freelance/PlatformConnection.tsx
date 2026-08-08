import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SITE } from "@/lib/constants";

export function PlatformConnection() {
  return (
    <section className="section divider">
      <div className="container-site">
        <SectionHeader
          align="left"
          eyebrow="Relationship with ISB Security Platform"
          title="Operational experience informs product thinking."
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-[15px] leading-relaxed text-ink-secondary">
            <p>
              Practical security work provides direct insight into reporting
              workflows, object instructions, handovers, incidents, personnel
              workflows, field usability, communication and operational friction.
              That insight contributes to the long-term design of{" "}
              <Link
                href="/platform"
                className="text-gold hover:text-gold-light"
              >
                ISB Security Platform
              </Link>
              .
            </p>
            <p>
              Operational experience informs product thinking at a workflow
              level. Client-specific and confidential operational information
              remains separate and is not transferred into software development.
            </p>
            <p>
              The two activities remain distinct: freelance assignments are
              operational services delivered through security companies; the
              platform is software under active development by {SITE.name}.
            </p>
          </div>
          <div className="border border-border bg-surface/30 p-5 font-mono text-[12px] leading-7 text-ink-secondary">
            <p className="text-gold">
              Two activities · one professional background
            </p>
            <p className="mt-2">ISB Security Solutions</p>
            <p className="pl-3">└ ISB Security Platform (software product)</p>
            <p className="mt-2">Independent freelance security work</p>
            <p className="pl-3">
              └ Assignments via established security companies
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { TechnologyArchitecture } from "@/components/technology/TechnologyArchitecture";
import { TechnologyStackExplorer } from "@/components/technology/TechnologyStackExplorer";
import { OsContinuity } from "@/components/os/OsContinuity";
import { SITE } from "@/lib/constants";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Technology Architecture",
  description:
    "Technical foundation of ISB Security Platform — multi-tenant architecture, shared services and tenant-aware data boundaries.",
  alternates: { canonical: `${SITE.url}/technology` },
};

export default function TechnologyPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Technology", path: "/technology" },
        ])}
      />
      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <OsContinuity
              steps={[
                { label: "Home", href: "/" },
                { label: "Platform", href: "/platform" },
                { label: "Technology" },
                { label: "Security", href: "/security" },
              ]}
            />
            <p className="label mt-3">Technology</p>
            <h1 className="heading-xl mt-3">
              Technology designed around operational continuity.
            </h1>
            <p className="body-lg mt-6 max-w-2xl">
              ISB is one platform with shared services — not a set of separate applications.
            </p>
          </div>
        </div>
      </section>

      <section className="section divider os-layer">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Shared engine"
            title="Experience, domains, services and foundation."
            description="Many operational surfaces. One engine underneath. Domains do not recreate identity, audit or storage."
          />
          <div className="mt-10 max-w-2xl">
            <TechnologyStackExplorer />
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="High-level architecture"
            title="Clients, platform services, data and infrastructure."
            description="Three layers. Clear boundaries. Shared services above tenant-aware data."
          />
          <div className="mt-10">
            <TechnologyArchitecture />
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-[14px] text-ink-secondary">
              Trust architecture — identity, roles, tenant boundaries and audit — continues on Security.
            </p>
            <Link href="/security" className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-secondary hover:text-gold">
              Explore Security & Trust
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

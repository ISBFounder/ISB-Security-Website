import type { Metadata } from "next";
import Link from "next/link";
import { DemoRequestForm } from "@/components/forms/DemoRequestForm";
import { SITE } from "@/lib/constants";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Request an ISB Platform Demonstration",
  description:
    "Request an ISB Security Platform demonstration. Share operational context so the conversation can focus on relevant modules and development direction.",
  alternates: { canonical: `${SITE.url}/request-demo` },
  openGraph: {
    title: `Request an ISB Platform Demonstration | ${SITE.name}`,
    description:
      "Request an ISB Security Platform demonstration. Share operational context so the conversation can focus on relevant modules and development direction.",
    url: `${SITE.url}/request-demo`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Request an ISB Platform Demonstration | ${SITE.name}`,
    description:
      "Request an ISB Security Platform demonstration. Share operational context so the conversation can focus on relevant modules and development direction.",
  },
};

export default function RequestDemoPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Request Demo", path: "/request-demo" },
        ])}
      />
      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="label">Request Demo</p>
            <h1 className="heading-xl mt-3">
              Request an ISB platform demonstration.
            </h1>
            <p className="body-lg mt-6 max-w-2xl">
              Tell us about your organization, current operational model and the
              challenges you want to improve. ISB will use this context to
              structure a relevant platform conversation.
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
              Platform development active
            </p>
          </div>
        </div>
      </section>

      <section className="section divider !pt-0">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <DemoRequestForm />
            </div>
            <aside className="space-y-6 lg:pt-2">
              <div className="border border-border bg-surface/30 p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                  What a demonstration can cover
                </p>
                <ul className="mt-3 space-y-1.5 text-[13px] text-ink-secondary">
                  {[
                    "Reporting foundations and Specific Report workflow",
                    "Object and location structure",
                    "Operational workflow direction",
                    "AI-assisted reporting under human review",
                    "Security and access architecture",
                    "Roadmap and product maturity",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-gold/70" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[12px] text-ink-faint">
                  Not every module is production-complete. Capability availability
                  is discussed honestly against the current foundation and roadmap.
                </p>
              </div>
              <div className="border border-border-subtle px-5 py-4 text-[13px] text-ink-muted">
                <p>
                  For security, technical or governance-specific evaluations,
                  include the relevant context so the discussion can focus on the
                  appropriate platform area.
                </p>
                <p className="mt-3">
                  Prefer a short enquiry first?{" "}
                  <Link
                    href="/contact"
                    className="text-gold hover:text-gold-light"
                  >
                    Contact ISB
                  </Link>
                </p>
              </div>
              <p className="text-[12px] text-ink-faint">
                Submitted information is used to evaluate and respond to the
                request.{" "}
                <Link href="/privacy" className="text-gold hover:text-gold-light">
                  Privacy Policy
                </Link>
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

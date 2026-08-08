import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact ISB Security Solutions",
  description:
    "Contact ISB Security Solutions for platform, pilot, partnership, security or general enquiries. Tilburg, The Netherlands.",
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: `Contact ISB Security Solutions | ${SITE.name}`,
    description:
      "Contact ISB Security Solutions for platform, pilot, partnership, security or general enquiries. Tilburg, The Netherlands.",
    url: `${SITE.url}/contact`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact ISB Security Solutions | ${SITE.name}`,
    description:
      "Contact ISB Security Solutions for platform, pilot, partnership, security or general enquiries. Tilburg, The Netherlands.",
  },
};

const ENGAGEMENT = [
  {
    title: "Platform",
    copy: "Request a demonstration of the current development direction.",
    href: "/request-demo",
    label: "Request Demo",
  },
  {
    title: "Pilot",
    copy: "Discuss future operational validation opportunities.",
    href: "/contact?intent=pilot",
    label: "Pilot conversation",
  },
  {
    title: "Partnership",
    copy: "Strategic or technology collaboration conversations.",
    href: "/contact?intent=partnership",
    label: "Partnership enquiry",
  },
  {
    title: "Security",
    copy: "Responsible disclosure of potential security issues.",
    href: "/contact?intent=security",
    label: "Security disclosure",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="label">Contact</p>
            <h1 className="heading-xl mt-3">Start the right conversation.</h1>
            <p className="body-lg mt-6 max-w-2xl">
              Use the form below for platform, pilot, partnership, company or
              general enquiries. Messages are routed to ISB Security Solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="section divider !pt-0">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="heading-md">Send a message</h2>
              <p className="mt-2 text-[13px] text-ink-muted">
                ISB reviews incoming enquiries and responds where follow-up is
                appropriate. No specific response time is promised.
              </p>
              <div className="mt-8">
                <Suspense
                  fallback={
                    <p className="text-sm text-ink-muted">Loading form…</p>
                  }
                >
                  <ContactForm />
                </Suspense>
              </div>
            </div>

            <aside className="space-y-8">
              <div className="border border-border bg-surface/30 p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                  Company
                </p>
                <p className="mt-3 text-[15px] font-semibold text-ink">
                  {SITE.name}
                </p>
                <div className="mt-4 space-y-1.5 font-mono text-[12px] leading-relaxed text-ink-secondary">
                  <p>{SITE.location}</p>
                  <p>KVK {SITE.kvk}</p>
                  <p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-gold hover:text-gold-light"
                    >
                      {SITE.email}
                    </a>
                  </p>
                  <p>
                    <a
                      href={SITE.url}
                      className="text-gold hover:text-gold-light"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      isbsecuritysolutions.nl
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <p className="label mb-3">Engagement routes</p>
                <ul className="space-y-0 border-t border-border">
                  {ENGAGEMENT.map((e) => (
                    <li
                      key={e.title}
                      className="border-b border-border-subtle py-3"
                    >
                      <p className="text-[13px] font-medium text-ink">{e.title}</p>
                      <p className="mt-0.5 text-[12px] text-ink-muted">{e.copy}</p>
                      <Link
                        href={e.href}
                        className="mt-1.5 inline-flex items-center gap-1 text-[12px] font-medium text-ink-secondary hover:text-gold"
                      >
                        {e.label}
                        <ArrowRight className="h-3 w-3" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-[12px] text-ink-faint">
                Information submitted through this form is used to respond to
                your enquiry.{" "}
                <Link href="/privacy" className="text-gold hover:text-gold-light">
                  Privacy Policy
                </Link>
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">Prefer a structured demonstration?</h2>
            <p className="body mt-3">
              Use the dedicated demo request if you want to explore how the
              current platform direction maps to your operation.
            </p>
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

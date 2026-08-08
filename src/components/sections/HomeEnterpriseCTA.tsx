import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

const PATHS = [
  {
    title: "Request a Demonstration",
    copy: "Explore the platform and discuss how the current development direction applies to your operation.",
    href: "/request-demo",
    primary: true,
  },
  {
    title: "Discuss a Pilot",
    copy: "Discuss early operational validation and future pilot opportunities.",
    href: "/contact?intent=pilot",
    primary: false,
  },
  {
    title: "Strategic Partnership",
    copy: "For technology, industry and strategic collaboration conversations.",
    href: "/contact?intent=partnership",
    primary: false,
  },
  {
    title: "General Contact",
    copy: "Contact ISB Security Solutions for general company or platform enquiries.",
    href: "/contact",
    primary: false,
  },
] as const;

export function HomeEnterpriseCTA() {
  return (
    <section className="section">
      <div className="container-site">
        <div className="border border-border bg-surface/40 p-6 md:p-10 lg:p-12">
          <div className="max-w-2xl">
            <p className="label">Engage with ISB</p>
            <h2 className="heading-lg mt-3">
              Start the conversation around your operation.
            </h2>
            <p className="body mt-4">
              ISB is currently in active development. We welcome conversations
              with security organizations, pilot partners and strategic industry
              stakeholders interested in the platform.
            </p>
          </div>

          <div className="mt-10 grid gap-0 border border-border sm:grid-cols-2">
            {PATHS.map((path, i) => (
              <div
                key={path.title}
                className={`flex flex-col border-border p-5 ${
                  i % 2 === 0 ? "sm:border-r" : ""
                } ${i < 2 ? "border-b" : ""} ${i === 2 ? "border-b sm:border-b-0" : ""}`}
              >
                <h3 className="text-[15px] font-semibold text-ink">{path.title}</h3>
                <p className="mt-2 flex-1 text-[13px] text-ink-muted">{path.copy}</p>
                <div className="mt-4">
                  {path.primary ? (
                    <Button href={path.href} size="sm">
                      {path.title}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Button>
                  ) : (
                    <Link
                      href={path.href}
                      className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-secondary transition-colors hover:text-gold"
                    >
                      {path.title}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-border-subtle pt-5 font-mono text-[11px] leading-relaxed text-ink-faint">
            <p>{SITE.name}</p>
            <p>{SITE.location}</p>
            <p>KVK {SITE.kvk}</p>
            <p>
              <a
                href={`mailto:${SITE.email}`}
                className="hover:text-gold"
              >
                {SITE.email}
              </a>
              {" · "}
              <a
                href={SITE.url}
                className="hover:text-gold"
                target="_blank"
                rel="noopener noreferrer"
              >
                isbsecuritysolutions.nl
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

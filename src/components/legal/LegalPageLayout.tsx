import Link from "next/link";
import { LEGAL_LAST_UPDATED } from "@/lib/constants";

const LEGAL_NAV = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/cookies", label: "Cookie Policy" },
] as const;

type Props = {
  title: string;
  children: React.ReactNode;
  current: "/privacy" | "/terms" | "/cookies";
};

export function LegalPageLayout({ title, children, current }: Props) {
  return (
    <section className="section">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[200px_minmax(0,1fr)]">
          <aside className="lg:pt-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
              Legal
            </p>
            <nav
              aria-label="Legal documents"
              className="mt-3 flex gap-0 overflow-x-auto border border-border lg:flex-col lg:overflow-visible"
            >
              {LEGAL_NAV.map((item) => {
                const active = current === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`shrink-0 border-b-2 px-3 py-2.5 text-[13px] font-medium transition-colors lg:border-b-0 lg:border-l-2 ${
                      active
                        ? "border-gold bg-surface text-ink"
                        : "border-transparent text-ink-muted hover:text-ink-secondary"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          <article className="mx-auto w-full max-w-[42rem]">
            <header className="border-b border-border pb-6">
              <p className="label">Legal</p>
              <h1 className="heading-xl mt-3 !text-[2rem] md:!text-[2.5rem]">
                {title}
              </h1>
              <p className="mt-3 font-mono text-[11px] text-ink-faint">
                Last updated: {LEGAL_LAST_UPDATED}
              </p>
            </header>
            <div className="legal-prose mt-10 space-y-10 text-[15px] leading-[1.7] text-ink-secondary">
              {children}
            </div>
            <footer className="mt-14 border-t border-border pt-6 text-[13px] text-ink-muted">
              <p>
                Contact ISB Security Solutions:{" "}
                <a
                  href="mailto:info@isbsecuritysolutions.nl"
                  className="text-gold hover:text-gold-light"
                >
                  info@isbsecuritysolutions.nl
                </a>
              </p>
              <nav
                aria-label="Other legal documents"
                className="mt-3 flex flex-wrap gap-4"
              >
                {LEGAL_NAV.filter((n) => n.href !== current).map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    className="text-ink-secondary hover:text-gold"
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}

export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-[17px] font-semibold text-ink">
        <span className="mr-2 font-mono text-[12px] text-ink-faint">
          {number}
        </span>
        {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

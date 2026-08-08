import Link from "next/link";
import { Logo } from "./Logo";
import { SITE, NAV } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg">
      <div className="container-site py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo size="sm" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
              {SITE.mission}
            </p>
            <div className="mt-6 space-y-1 font-mono text-[12px] text-ink-muted">
              <p>{SITE.name}</p>
              <p>{SITE.location}</p>
              <p>KVK {SITE.kvk}</p>
              <a href={`mailto:${SITE.email}`} className="block text-ink-secondary hover:text-gold">
                {SITE.email}
              </a>
              <a href={SITE.url} className="block text-ink-secondary hover:text-gold">
                isbsecuritysolutions.nl
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-faint">Platform</h3>
            <ul className="mt-4 space-y-2">
              {NAV.platform.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-ink-muted hover:text-ink">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-faint">Solutions</h3>
            <ul className="mt-4 space-y-2">
              {NAV.solutions.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-ink-muted hover:text-ink">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-faint">Company</h3>
            <ul className="mt-4 space-y-2">
              {NAV.company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-ink-muted hover:text-ink">{item.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/request-demo" className="text-sm text-ink-muted hover:text-ink">Request Demo</Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-faint">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/privacy" className="text-sm text-ink-muted hover:text-ink">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-ink-muted hover:text-ink">Terms of Use</Link></li>
              <li><Link href="/cookies" className="text-sm text-ink-muted hover:text-ink">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-ink-faint">Enterprise Security Operations Software</p>
        </div>
      </div>
    </footer>
  );
}

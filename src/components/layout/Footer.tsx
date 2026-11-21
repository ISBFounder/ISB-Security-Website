import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { SITE, NAV } from "@/lib/constants";

export async function Footer() {
  const t = await getTranslations("chrome");

  return (
    <footer className="border-t border-border-subtle bg-bg">
      <div className="container-site py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo size="sm" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
              {t("footerMission")}
            </p>
            <div className="mt-6 space-y-1 font-mono text-[12px] text-ink-muted">
              <p>{SITE.name}</p>
              <p>{t("footerLocation")}</p>
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
            <h2 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-faint">{t("footerPlatform")}</h2>
            <ul className="mt-4 space-y-2">
              {NAV.platform.map((item) => (
                <li key={item.id}>
                  <Link href={item.href} className="text-sm text-ink-muted hover:text-ink">{t(`nav.platform.${item.id}`)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-faint">{t("footerSolutions")}</h2>
            <ul className="mt-4 space-y-2">
              {NAV.solutions.map((item) => (
                <li key={item.id}>
                  <Link href={item.href} className="text-sm text-ink-muted hover:text-ink">{t(`nav.solutions.${item.id}`)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-faint">{t("footerCompany")}</h2>
            <ul className="mt-4 space-y-2">
              {NAV.company.map((item) => (
                <li key={item.id}>
                  <Link href={item.href} className="text-sm text-ink-muted hover:text-ink">{t(`nav.company.${item.id}`)}</Link>
                </li>
              ))}
              <li>
                <Link href="/industries" className="text-sm text-ink-muted hover:text-ink">{t("industries")}</Link>
              </li>
              <li>
                <Link href="/request-demo" className="text-sm text-ink-muted hover:text-ink">{t("requestDemo")}</Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-faint">{t("footerLegal")}</h2>
            <ul className="mt-4 space-y-2">
              <li><Link href="/privacy" className="text-sm text-ink-muted hover:text-ink">{t("privacy")}</Link></li>
              <li><Link href="/terms" className="text-sm text-ink-muted hover:text-ink">{t("terms")}</Link></li>
              <li><Link href="/cookies" className="text-sm text-ink-muted hover:text-ink">{t("cookies")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} {SITE.name}. {t("footerRights")}
          </p>
          <p className="text-xs text-ink-faint">{t("footerTagline")}</p>
        </div>
      </div>
    </footer>
  );
}

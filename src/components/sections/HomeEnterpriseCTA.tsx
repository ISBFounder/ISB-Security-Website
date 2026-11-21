import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

const PATHS = [
  { id: "demo", href: "/request-demo", primary: true },
  { id: "pilot", href: "/contact?intent=pilot", primary: false },
  { id: "partnership", href: "/contact?intent=partnership", primary: false },
  { id: "contact", href: "/contact", primary: false },
] as const;

export async function HomeEnterpriseCTA() {
  const t = await getTranslations("home");

  return (
    <section className="section">
      <div className="container-site">
        <div className="border border-border bg-surface/40 p-6 md:p-10 lg:p-12">
          <div className="max-w-2xl">
            <p className="label">{t("cta.eyebrow")}</p>
            <h2 className="heading-lg mt-3">{t("cta.title")}</h2>
            <p className="body mt-4">{t("cta.body")}</p>
          </div>

          <div className="mt-10 grid gap-0 border border-border sm:grid-cols-2">
            {PATHS.map((path, i) => {
              const title = t(`cta.paths.${path.id}.title`);
              return (
                <div
                  key={path.id}
                  className={`flex flex-col border-border p-5 ${
                    i % 2 === 0 ? "sm:border-r" : ""
                  } ${i < 2 ? "border-b" : ""} ${i === 2 ? "border-b sm:border-b-0" : ""}`}
                >
                  <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
                  <p className="mt-2 flex-1 text-[13px] text-ink-muted">
                    {t(`cta.paths.${path.id}.copy`)}
                  </p>
                  <div className="mt-4">
                    {path.primary ? (
                      <Button href={path.href} size="sm">
                        {title}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Button>
                    ) : (
                      <Link
                        href={path.href}
                        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-secondary transition-colors hover:text-gold"
                      >
                        {title}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 border-t border-border-subtle pt-5 font-mono text-[11px] leading-relaxed text-ink-faint">
            <p>{SITE.name}</p>
            <p>{t("cta.location")}</p>
            <p>KVK {SITE.kvk}</p>
            <p>
              <a href={`mailto:${SITE.email}`} className="hover:text-gold">
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

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DemoRequestForm } from "@/components/forms/DemoRequestForm";
import { StructuredData } from "@/components/seo/StructuredData";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/routing";
import { breadcrumbJsonLd, routeMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const COVER = [
  "reporting",
  "objects",
  "personnel",
  "ai",
  "access",
  "roadmap",
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "demo" });
  return routeMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/request-demo",
  });
}

export default async function RequestDemoPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "demo" });

  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd(locale, [
          { name: t("breadcrumbHome"), path: "/" },
          { name: t("breadcrumbCurrent"), path: "/request-demo" },
        ])}
      />
      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="label">{t("eyebrow")}</p>
            <h1 className="heading-xl mt-3">{t("title")}</h1>
            <p className="body-lg mt-6 max-w-2xl">{t("intro")}</p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
              {t("status")}
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
                  {t("coverTitle")}
                </p>
                <ul className="mt-3 space-y-1.5 text-[13px] text-ink-secondary">
                  {COVER.map((id) => (
                    <li key={id} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-gold/70" aria-hidden />
                      {t(`cover.${id}`)}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[12px] text-ink-faint">{t("coverNote")}</p>
              </div>
              <div className="border border-border-subtle px-5 py-4 text-[13px] text-ink-muted">
                <p>{t("evalNote")}</p>
                <p className="mt-3">
                  {t("preferBefore")}
                  <Link
                    href="/contact"
                    className="text-gold hover:text-gold-light"
                  >
                    {t("contactLink")}
                  </Link>
                </p>
              </div>
              <p className="text-[12px] text-ink-faint">
                {t("privacyBefore")}
                <Link href="/privacy" className="text-gold hover:text-gold-light">
                  {t("privacyLink")}
                </Link>
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

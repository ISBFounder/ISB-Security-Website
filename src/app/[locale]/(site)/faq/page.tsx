import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { FAQ_ENTRIES, type FAQItem } from "@/data/faq";
import { StructuredData } from "@/components/seo/StructuredData";
import { isLocale } from "@/i18n/routing";
import { faqPageJsonLd, breadcrumbJsonLd, routeMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "faq" });
  return routeMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/faq",
  });
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const items: FAQItem[] = FAQ_ENTRIES.map((entry) => ({
    id: entry.id,
    category: entry.category,
    question: t(`items.${entry.id}.question`),
    answer: t(`items.${entry.id}.answer`),
  }));

  return (
    <>
      <StructuredData
        data={[
          faqPageJsonLd(
            items.map((item) => ({
              question: item.question,
              answer: item.answer,
            })),
            locale
          ),
          breadcrumbJsonLd(locale, [
            { name: t("breadcrumbHome"), path: "/" },
            { name: t("breadcrumb"), path: "/faq" },
          ]),
        ]}
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
          <FAQAccordion items={items} />
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">{t("ctaTitle")}</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/request-demo">
                {t("ctaDemo")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/contact" variant="secondary">
                {t("ctaContact")}
              </Button>
              <Button href="/platform" variant="secondary">
                {t("ctaPlatform")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

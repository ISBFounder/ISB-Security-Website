import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export async function FreelanceCTA() {
  const t = await getTranslations("freelance");

  return (
    <>
      <section className="section divider">
        <div className="container-site">
          <div className="max-w-2xl">
            <SectionHeader
              align="left"
              eyebrow={t("availabilityEyebrow")}
              title={t("availabilityTitle")}
            />
            <p className="mt-6 text-[15px] leading-relaxed text-ink-secondary">
              {t("availabilityBody")}
            </p>
            <div className="mt-6">
              <Button href="/contact?intent=general" variant="secondary">
                {t("discussAvailability")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">{t("ctaTitle")}</h2>
            <p className="body mt-4">{t("ctaBody")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/contact?intent=general">
                {t("discussCollaboration")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/contact" variant="secondary">
                {t("contactIsb")}
              </Button>
            </div>
            <p className="mt-6 text-[12px] text-ink-faint">
              {t.rich("ctaDemo", {
                demo: (chunks) => (
                  <Link
                    href="/request-demo"
                    className="text-gold hover:text-gold-light"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

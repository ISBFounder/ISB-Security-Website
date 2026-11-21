import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";

export async function FreelanceHero() {
  const t = await getTranslations("freelance");

  return (
    <section className="section !pb-10">
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="label">{t("heroEyebrow")}</p>
          <h1 className="heading-xl mt-3">{t("heroTitle")}</h1>
          <p className="body-lg mt-6 max-w-2xl">{t("heroIntro")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact?intent=general">
              {t("discussCollaboration")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href="/contact" variant="secondary">
              {t("contactIsb")}
            </Button>
          </div>
          <p className="mt-6 max-w-2xl text-[13px] text-ink-muted">
            {t("heroNote")}
          </p>
        </div>
      </div>
    </section>
  );
}

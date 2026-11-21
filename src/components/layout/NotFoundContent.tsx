import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

export async function NotFoundContent() {
  const t = await getTranslations("common");

  return (
    <section className="section">
      <div className="container-site">
        <div className="mx-auto max-w-xl">
          <p className="label">{t("notFoundEyebrow")}</p>
          <h1 className="heading-xl mt-3">{t("notFoundTitle")}</h1>
          <p className="body-lg mt-6">{t("notFoundBody")}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/">
              {t("returnHome")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href="/platform" variant="secondary">
              {t("explorePlatform")}
            </Button>
            <Button href="/contact" variant="secondary">
              {t("contactIsb")}
            </Button>
          </div>
          <nav className="mt-12 border-t border-border pt-6" aria-label={t("helpfulLinks")}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-ink-muted">
              <li>
                <Link href="/solutions" className="hover:text-gold">
                  {t("solutions")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gold">
                  {t("faq")}
                </Link>
              </li>
              <li>
                <Link href="/request-demo" className="hover:text-gold">
                  {t("requestDemo")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}

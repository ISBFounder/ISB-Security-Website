"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("common");

  useEffect(() => {
    if (error?.digest) {
      console.error("[page-error]", error.digest);
    }
  }, [error]);

  return (
    <section className="section">
      <div className="container-site">
        <div className="mx-auto max-w-xl">
          <p className="label">{t("errorEyebrow")}</p>
          <h1 className="heading-xl mt-3">{t("errorTitle")}</h1>
          <p className="body mt-6">{t("errorBody")}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button type="button" onClick={() => reset()}>
              {t("tryAgain")}
            </Button>
            <Button href="/" variant="secondary">
              {t("returnHome")}
            </Button>
            <Button href="/contact" variant="secondary">
              {t("contactIsb")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

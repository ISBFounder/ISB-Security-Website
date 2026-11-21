import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FreelanceHero } from "@/components/freelance/FreelanceHero";
import { ProfessionalProfile } from "@/components/freelance/ProfessionalProfile";
import { FreelanceSpecializations } from "@/components/freelance/FreelanceSpecializations";
import { WorkingStyle } from "@/components/freelance/WorkingStyle";
import { CollaborationModel } from "@/components/freelance/CollaborationModel";
import { PlatformConnection } from "@/components/freelance/PlatformConnection";
import { Qualifications } from "@/components/freelance/Qualifications";
import { FreelanceCTA } from "@/components/freelance/FreelanceCTA";
import { StructuredData } from "@/components/seo/StructuredData";
import { isLocale } from "@/i18n/routing";
import { breadcrumbJsonLd, routeMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "freelance" });
  return routeMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/freelance-security",
  });
}

export default async function FreelanceSecurityPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  setRequestLocale(locale);
  const t = await getTranslations("freelance");

  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd(locale, [
          { name: t("breadcrumbHome"), path: "/" },
          { name: t("breadcrumb"), path: "/freelance-security" },
        ])}
      />
      <FreelanceHero />
      <ProfessionalProfile />
      <FreelanceSpecializations />
      <WorkingStyle />
      <CollaborationModel />
      <PlatformConnection />
      <Qualifications />
      <FreelanceCTA />
    </>
  );
}

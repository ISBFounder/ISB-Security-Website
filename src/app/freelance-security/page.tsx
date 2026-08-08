import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd } from "@/lib/seo";
import { FreelanceHero } from "@/components/freelance/FreelanceHero";
import { ProfessionalProfile } from "@/components/freelance/ProfessionalProfile";
import { FreelanceSpecializations } from "@/components/freelance/FreelanceSpecializations";
import { WorkingStyle } from "@/components/freelance/WorkingStyle";
import { CollaborationModel } from "@/components/freelance/CollaborationModel";
import { PlatformConnection } from "@/components/freelance/PlatformConnection";
import { Qualifications } from "@/components/freelance/Qualifications";
import { FreelanceCTA } from "@/components/freelance/FreelanceCTA";

export const metadata: Metadata = {
  title: "Freelance Security Professional",
  description:
    "Freelance security services for hospitality, events and operational assignments through established security organizations, provided by the security professional behind ISB Security Solutions.",
  alternates: { canonical: `${SITE.url}/freelance-security` },
  openGraph: {
    title: `Freelance Security Professional | ${SITE.name}`,
    description:
      "Freelance security services for hospitality, events and operational assignments through established security organizations.",
    url: `${SITE.url}/freelance-security`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Freelance Security Professional | ${SITE.name}`,
    description:
      "Freelance security services for hospitality, events and operational assignments through established security organizations.",
  },
};

export default function FreelanceSecurityPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Freelance Security", path: "/freelance-security" },
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

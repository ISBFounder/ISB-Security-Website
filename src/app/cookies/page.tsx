import type { Metadata } from "next";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie Policy for the ISB Security Solutions corporate website — essential technology, no advertising or marketing cookies.",
  alternates: { canonical: `${SITE.url}/cookies` },
  openGraph: {
    title: `Cookie Policy | ${SITE.name}`,
    description:
      "Cookie Policy for the ISB Security Solutions corporate website — essential technology, no advertising or marketing cookies.",
    url: `${SITE.url}/cookies`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Cookie Policy | ${SITE.name}`,
    description:
      "Cookie Policy for the ISB Security Solutions corporate website — essential technology, no advertising or marketing cookies.",
  },
};

export default function CookiesPage() {
  return (
    <LegalPageLayout title="Cookie Policy" current="/cookies">
      {/* Source note: If analytics or marketing technology is introduced later, reassess consent requirements and update this policy before deployment. */}
      <p>
        This Cookie Policy explains how the public corporate website of{" "}
        {SITE.name} approaches cookies and similar technologies.
      </p>

      <LegalSection id="what" number="01" title="What cookies are">
        <p>
          Cookies are small text files that a website may store on your device.
          Similar technologies can include local storage or session mechanisms
          used by browsers and hosting platforms.
        </p>
      </LegalSection>

      <LegalSection
        id="approach"
        number="02"
        title="Current ISB website approach"
      >
        <p>
          The corporate website is designed to operate without advertising or
          marketing cookies. At the time reflected by this policy, the website
          does not intentionally deploy non-essential analytics or advertising
          cookies.
        </p>
        <p>
          This policy does not claim that the site uses “zero cookies” in all
          technical circumstances, because hosting platforms and browsers may use
          strictly necessary mechanisms for security or session integrity.
        </p>
      </LegalSection>

      <LegalSection
        id="necessary"
        number="03"
        title="Strictly necessary technology"
      >
        <p>
          Strictly necessary technology may be used to operate the website
          securely and reliably — for example, infrastructure required by the
          hosting environment or protections related to form submission integrity.
        </p>
      </LegalSection>

      <LegalSection id="forms" number="04" title="Form security">
        <p>
          Contact and demonstration forms use server-side validation, honeypot
          fields (not intended for human users), and rate limiting when configured.
          These measures are intended to reduce abuse. They are not advertising
          technologies.
        </p>
      </LegalSection>

      <LegalSection id="analytics" number="05" title="Analytics">
        <p>
          At the time reflected by this policy, the website does not intentionally
          deploy non-essential analytics cookies. If analytics technology is
          introduced in the future, this policy will be reviewed and updated, and
          consent requirements will be reassessed before deployment.
        </p>
      </LegalSection>

      <LegalSection id="marketing" number="06" title="Marketing">
        <p>
          No advertising or behavioural marketing cookies are intentionally used
          on the current corporate website.
        </p>
      </LegalSection>

      <LegalSection id="third-party" number="07" title="Third-party services">
        <p>
          Form delivery and rate-limiting services (such as Resend and Upstash,
          when configured) primarily process server-side form and request data.
          They are not used to place advertising cookies on this site.
        </p>
      </LegalSection>

      <LegalSection id="browser" number="08" title="Browser controls">
        <p>
          You can control cookies and site data through your browser settings,
          including blocking or deleting cookies. Restricting strictly necessary
          technology may affect website functionality.
        </p>
      </LegalSection>

      <LegalSection id="changes" number="09" title="Future changes">
        <p>
          If the website later introduces analytics, marketing, or other
          non-essential technologies, ISB will update this policy and reassess
          whether a consent mechanism is required under applicable law before
          those technologies are used.
        </p>
      </LegalSection>

      <LegalSection id="contact" number="10" title="Contact">
        <p>
          Questions about this Cookie Policy may be sent to{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-gold hover:text-gold-light"
          >
            {SITE.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

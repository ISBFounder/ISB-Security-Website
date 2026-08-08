import type { Metadata } from "next";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Website Terms of Use",
  description:
    "Website Terms of Use for the public corporate website of ISB Security Solutions. These terms do not constitute a SaaS subscription agreement.",
  alternates: { canonical: `${SITE.url}/terms` },
  openGraph: {
    title: `Website Terms of Use | ${SITE.name}`,
    description:
      "Website Terms of Use for the public corporate website of ISB Security Solutions. These terms do not constitute a SaaS subscription agreement.",
    url: `${SITE.url}/terms`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Website Terms of Use | ${SITE.name}`,
    description:
      "Website Terms of Use for the public corporate website of ISB Security Solutions. These terms do not constitute a SaaS subscription agreement.",
  },
};

export default function TermsPage() {
  return (
    <LegalPageLayout title="Website Terms of Use" current="/terms">
      {/* LEGAL REVIEW: Confirm liability language and governing law with counsel before production launch. */}
      <p>
        These Website Terms of Use govern access to and use of the public
        corporate website of {SITE.name} at{" "}
        <a href={SITE.url} className="text-gold hover:text-gold-light">
          {SITE.url}
        </a>
        .
      </p>
      <p>
        <strong className="text-ink">
          These terms apply to the public website only.
        </strong>{" "}
        They are not the SaaS customer agreement for ISB Security Platform, not a
        subscription contract, and not an operational services or contractor
        agreement.
      </p>

      <LegalSection id="about" number="01" title="About these terms">
        <p>
          By using this website you agree to these terms. If you do not agree, do
          not use the website. Additional terms may apply to separate commercial
          arrangements, if and when those are entered into in writing.
        </p>
      </LegalSection>

      <LegalSection id="purpose" number="02" title="Website purpose">
        <p>
          This website provides information about {SITE.name}, the ISB Security
          Platform product direction, and ways to contact the company for
          demonstrations, pilot discussions, partnerships, and general enquiries.
        </p>
      </LegalSection>

      <LegalSection
        id="development"
        number="03"
        title="Development-stage information"
      >
        <p>
          ISB Security Platform is under active development. Website descriptions
          may include current foundation capabilities, active development work,
          planned capabilities, and future direction. Status labels such as
          “Implemented foundation”, “Active development”, “Planned”, and “Future
          direction” are used to communicate maturity, not to create delivery
          deadlines.
        </p>
      </LegalSection>

      <LegalSection
        id="non-binding"
        number="04"
        title="No contractual product commitment"
      >
        <p>
          Roadmap items, feature descriptions, architecture diagrams, and industry
          examples describe product direction and intended fit. They are not
          binding delivery commitments, warranties of commercial availability, or
          guarantees that any particular capability will be released on a given
          date.
        </p>
      </LegalSection>

      <LegalSection id="acceptable" number="05" title="Acceptable use">
        <p>You may not use this website to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Attempt unauthorised access to systems or data</li>
          <li>Damage, disrupt, or overload the website or related services</li>
          <li>Use malicious automation or abuse forms</li>
          <li>Introduce malware or harmful code</li>
          <li>Use the site for unlawful purposes</li>
          <li>
            Extract protected content at unreasonable scale without permission
          </li>
        </ul>
        <p>Normal browsing and legitimate form submissions are permitted.</p>
      </LegalSection>

      <LegalSection id="ip" number="06" title="Intellectual property">
        <p>
          Unless otherwise indicated, {SITE.name} owns or controls the rights in
          the ISB name and branding, original website design and copy, platform
          concepts as presented, interface designs, software, and documentation
          made available on this site. You may not copy, modify, or redistribute
          protected materials without prior written permission, except as allowed
          by mandatory law.
        </p>
        <p>
          These terms do not claim ownership of generic security industry concepts
          or third-party trademarks.
        </p>
      </LegalSection>

      <LegalSection id="content" number="07" title="Website content">
        <p>
          Content is provided for general information. While we aim for accuracy,
          information may change as the product and company evolve. Content is not
          professional advice (legal, security, technical, or otherwise).
        </p>
      </LegalSection>

      <LegalSection
        id="demos"
        number="08"
        title="Demonstrations and pilot discussions"
      >
        <p>
          Submitting a demonstration or contact request does not guarantee
          acceptance, scheduling, commercial availability, pilot participation, or
          a future contract. A demonstration or discussion does not itself create a
          binding commercial agreement.
        </p>
      </LegalSection>

      <LegalSection id="links" number="09" title="Third-party links">
        <p>
          Links to third-party websites are provided for convenience. ISB is not
          responsible for third-party content or practices.
        </p>
      </LegalSection>

      <LegalSection id="security" number="10" title="Security">
        <p>
          Users must not attempt to compromise the security of the website.
          Security issues may be reported to{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-gold hover:text-gold-light"
          >
            {SITE.email}
          </a>
          . No bug bounty or response SLA is claimed solely by these terms.
        </p>
      </LegalSection>

      <LegalSection id="availability" number="11" title="Availability">
        <p>
          The public website is provided on an “as available” basis. ISB does not
          guarantee uninterrupted or error-free availability and does not offer an
          uptime service level for this corporate site.
        </p>
      </LegalSection>

      <LegalSection id="liability" number="12" title="Liability limitations">
        {/* LEGAL REVIEW: Confirm liability language with counsel before production launch. */}
        <p>
          To the extent permitted by applicable law, {SITE.name} is not liable for
          indirect, incidental, or consequential damages arising from use of this
          website or reliance on its content. Nothing in these terms excludes or
          limits liability that cannot be excluded or limited under mandatory law.
        </p>
      </LegalSection>

      <LegalSection id="changes" number="13" title="Changes">
        <p>
          We may update these terms when the website or company practices change.
          The “Last updated” date will be revised when material changes are
          published. Continued use after publication constitutes acceptance of the
          updated terms where permitted by law.
        </p>
      </LegalSection>

      <LegalSection id="governing" number="14" title="Governing context">
        {/* LEGAL REVIEW: Confirm governing law and forum with counsel before production launch. */}
        <p>
          {SITE.name} is established in the Netherlands. These terms are intended
          to operate within applicable Dutch law, subject to mandatory provisions
          of law that cannot be waived. Specific court jurisdiction clauses may be
          defined in a future legal review.
        </p>
      </LegalSection>

      <LegalSection id="contact" number="15" title="Contact">
        <p>
          {SITE.name}
          <br />
          {SITE.location}
          <br />
          KVK {SITE.kvk}
          <br />
          <a
            href={`mailto:${SITE.email}`}
            className="text-gold hover:text-gold-light"
          >
            {SITE.email}
          </a>
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

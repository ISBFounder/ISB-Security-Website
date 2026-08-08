import type { Metadata } from "next";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy of ISB Security Solutions — how personal information submitted through the corporate website is handled.",
  alternates: { canonical: `${SITE.url}/privacy` },
  openGraph: {
    title: `Privacy Policy | ${SITE.name}`,
    description:
      "Privacy Policy of ISB Security Solutions — how personal information submitted through the corporate website is handled.",
    url: `${SITE.url}/privacy`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Privacy Policy | ${SITE.name}`,
    description:
      "Privacy Policy of ISB Security Solutions — how personal information submitted through the corporate website is handled.",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" current="/privacy">
      {/* LEGAL REVIEW: Confirm legal bases, retention schedule, and international transfer safeguards before production launch. */}
      <p>
        ISB Security Solutions values controlled and transparent handling of
        information submitted through its corporate website. This policy describes
        how personal information may be processed when you use{" "}
        <a href={SITE.url} className="text-gold hover:text-gold-light">
          {SITE.url}
        </a>
        , including the contact and demonstration request forms.
      </p>

      <LegalSection id="about" number="01" title="About this policy">
        <p>
          This policy applies to the public corporate website of ISB Security
          Solutions. It does not govern a customer portal, SaaS product login, or
          offline operational services, which are not provided through this public
          website.
        </p>
      </LegalSection>

      <LegalSection id="controller" number="02" title="Who is responsible">
        <p>
          The organisation responsible for processing personal information
          submitted through this website is:
        </p>
        <p>
          {SITE.name}
          <br />
          {SITE.location}
          <br />
          Chamber of Commerce (KVK): {SITE.kvk}
          <br />
          Email:{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-gold hover:text-gold-light"
          >
            {SITE.email}
          </a>
        </p>
      </LegalSection>

      <LegalSection id="collect" number="03" title="Information we may collect">
        <p>
          We process information that you choose to submit through website forms,
          and limited technical information necessary to operate and protect the
          website.
        </p>
      </LegalSection>

      <LegalSection id="contact-form" number="04" title="Contact form information">
        <p>When you use the contact form, we may process:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Name</li>
          <li>Company</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Subject</li>
          <li>Message content</li>
          <li>Enquiry type</li>
        </ul>
      </LegalSection>

      <LegalSection
        id="demo-form"
        number="05"
        title="Demonstration request information"
      >
        <p>When you submit a demonstration request, we may process:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Company name</li>
          <li>Contact person and job title</li>
          <li>Business email and phone number</li>
          <li>Company size and security workforce size</li>
          <li>Country and optional website</li>
          <li>Operational sectors</li>
          <li>Current software and reporting methods</li>
          <li>Operational context (objects, customers, planning, mobile workforce)</li>
          <li>Operational challenges</li>
          <li>Conversation interest and evaluation timeline</li>
          <li>Optional free-text message</li>
        </ul>
      </LegalSection>

      <LegalSection
        id="technical"
        number="06"
        title="Technical and anti-abuse data"
      >
        <p>
          Limited technical request information may be processed to protect forms
          against abuse and excessive submissions. This may include measures used
          for rate limiting and spam prevention (including a honeypot field that
          is not intended for human users).
        </p>
        <p>
          We do not intentionally perform behavioural profiling or broad device
          fingerprinting through this corporate website. Raw IP addresses are used
          where necessary for rate-limiting and security of form endpoints and are
          not presented as a marketing data source.
        </p>
      </LegalSection>

      <LegalSection id="purposes" number="07" title="Purposes of processing">
        <p>Personal information submitted through the website may be used to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Respond to enquiries</li>
          <li>Evaluate demonstration requests</li>
          <li>Prepare relevant platform conversations</li>
          <li>Process pilot or partnership enquiries</li>
          <li>Respond to responsible-disclosure messages</li>
          <li>Protect the website and forms against abuse</li>
          <li>Maintain operational security of the website</li>
        </ul>
        <p>
          We do not use form submissions for advertising campaigns or unsolicited
          marketing unless a separate, explicit basis exists.
        </p>
      </LegalSection>

      <LegalSection id="legal-basis" number="08" title="Legal basis">
        {/* LEGAL REVIEW: Confirm final GDPR legal bases with counsel before launch. */}
        <p>
          Depending on the context, processing may rely on legitimate interests in
          responding to professional enquiries and securing the website; steps
          taken at your request prior to a potential business relationship; and,
          where applicable, consent indicated through form consent wording.
        </p>
        <p>
          The exact legal basis may vary by enquiry type and applicable law. If
          you have questions about the basis for a specific processing activity,
          contact us using the details below.
        </p>
      </LegalSection>

      <LegalSection id="providers" number="09" title="Service providers">
        <p>
          To operate the website forms, ISB may use service providers that process
          limited data necessary to deliver their service:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong className="text-ink">Resend</strong> — email delivery of form
            submissions to ISB
          </li>
          <li>
            <strong className="text-ink">Upstash</strong> — rate limiting / abuse
            prevention when configured in the production environment
          </li>
        </ul>
        <p>
          Hosting and infrastructure providers used to publish the website may
          process technical request data as part of normal web hosting operations.
        </p>
      </LegalSection>

      <LegalSection
        id="international"
        number="10"
        title="International data processing considerations"
      >
        {/* LEGAL REVIEW: Confirm transfer mechanisms (e.g. SCCs) based on final production configuration. */}
        <p>
          Service providers may process data in more than one jurisdiction.
          Appropriate safeguards for cross-border processing should be evaluated
          based on the final production configuration. This policy does not claim
          that all processing is limited to the European Union, nor that specific
          transfer mechanisms are already configured, unless separately verified.
        </p>
      </LegalSection>

      <LegalSection id="retention" number="11" title="Retention">
        {/* LEGAL REVIEW: Define final retention schedule before production launch. */}
        <p>
          Information is retained only as long as reasonably necessary for the
          purpose for which it was submitted, for applicable legal obligations,
          for security needs, or for legitimate business records related to the
          enquiry. Exact retention periods may be defined in internal schedules as
          the organisation matures its processes.
        </p>
      </LegalSection>

      <LegalSection id="security" number="12" title="Data security">
        <p>
          ISB applies security measures appropriate to a public corporate website,
          including server-side validation of forms, controlled email delivery,
          abuse prevention, and access discipline around production configuration.
          Production security controls for related systems remain under ongoing
          development. No website can guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection id="cookies" number="13" title="Cookies">
        <p>
          Information about cookies and similar technologies is described in the{" "}
          <a href="/cookies" className="text-gold hover:text-gold-light">
            Cookie Policy
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="rights" number="14" title="Your rights">
        <p>
          Depending on applicable law (including the GDPR where it applies), you
          may have rights to access, correct, delete, or restrict processing of
          your personal data; to object to certain processing; to data portability
          where applicable; to withdraw consent where processing is based on
          consent; and to lodge a complaint with a competent supervisory
          authority.
        </p>
        <p>
          Not every right applies in every circumstance. To exercise rights in
          relation to this website, contact{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-gold hover:text-gold-light"
          >
            {SITE.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="children" number="15" title="Children">
        <p>
          This corporate website is aimed at professional and business users. It
          is not intentionally directed at children.
        </p>
      </LegalSection>

      <LegalSection id="links" number="16" title="External links">
        <p>
          The website may link to external sites. ISB is not responsible for the
          privacy practices of third-party websites.
        </p>
      </LegalSection>

      <LegalSection id="changes" number="17" title="Changes to this policy">
        <p>
          We may update this policy when the website, forms, or processing
          activities change. The “Last updated” date at the top of this page will
          be revised when material changes are published.
        </p>
      </LegalSection>

      <LegalSection id="contact" number="18" title="Contact">
        <p>
          For privacy questions related to this website, contact:
          <br />
          {SITE.name}
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

import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import localFont from "next/font/local";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocaleSuggestion } from "@/components/layout/LocaleSuggestion";
import { StructuredData } from "@/components/seo/StructuredData";
import { loadMessages } from "@/i18n/load-messages";
import { routing } from "@/i18n/routing";
import { SITE } from "@/lib/constants";
import {
  organizationJsonLd,
  softwareApplicationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

const fontDisplay = localFont({
  src: "../../fonts/plus-jakarta-sans-latin.woff2",
  weight: "500 700",
  display: "swap",
  variable: "--font-display",
});

const fontSans = localFont({
  src: "../../fonts/ibm-plex-sans-latin.woff2",
  weight: "400 600",
  display: "swap",
  variable: "--font-sans",
});

const fontMono = localFont({
  src: [
    {
      path: "../../fonts/ibm-plex-mono-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/ibm-plex-mono-500.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-mono",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070809",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: t("title"),
      template: `%s | ${SITE.name}`,
    },
    description: t("description"),
    keywords: [
      "Security Operations Platform",
      "Security Management Software",
      "Incident Reporting Software",
      "Security Company Software",
      "AI-Assisted Security Reporting",
      "European Security Software",
      "Operational Security Platform",
      "Enterprise Security Operations Software",
    ],
    authors: [{ name: SITE.name }],
    openGraph: {
      type: "website",
      locale: locale === "nl" ? "nl_NL" : "en_US",
      alternateLocale: locale === "nl" ? ["en_US"] : ["nl_NL"],
      siteName: SITE.name,
      title: t("title"),
      description: t("ogDescription"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("twitterDescription"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await loadMessages(locale);
  const t = await getTranslations({ locale, namespace: "meta" });

  return (
    <html lang={locale} className="dark">
      <body
        className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StructuredData
            data={[
              organizationJsonLd(),
              websiteJsonLd({
                locale,
                description: t("description"),
              }),
              softwareApplicationJsonLd({
                locale,
                description: t("softwareDescription"),
              }),
            ]}
          />
          <Header />
          <main id="main-content" className="min-h-screen pt-14 lg:pt-16">
            <LocaleSuggestion />
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

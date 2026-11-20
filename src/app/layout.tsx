import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/lib/constants";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  organizationJsonLd,
  websiteJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/seo";

/** Display — major headings, hero, editorial statements */
const fontDisplay = localFont({
  src: "../fonts/plus-jakarta-sans-latin.woff2",
  weight: "500 700",
  display: "swap",
  variable: "--font-display",
});

/** Body / UI — navigation, forms, tables, interface */
const fontSans = localFont({
  src: "../fonts/ibm-plex-sans-latin.woff2",
  weight: "400 600",
  display: "swap",
  variable: "--font-sans",
});

/** Mono — technical labels, status, IDs, architecture metadata */
const fontMono = localFont({
  src: [
    {
      path: "../fonts/ibm-plex-mono-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ibm-plex-mono-500.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Enterprise Security Operations Software`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "ISB Security Solutions is building the ISB Security Platform for professional security operations, reporting, personnel planning and site management. The platform is in active development.",
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
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Enterprise Security Operations Software`,
    description:
      "The ISB Security Platform is in active development for professional security operations, reporting, personnel planning and site management.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Enterprise Security Operations Software`,
    description:
      "Modular security operations platform under active development for professional security organizations.",
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
  alternates: { canonical: SITE.url },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070809",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <StructuredData
          data={[
            organizationJsonLd(),
            websiteJsonLd(),
            softwareApplicationJsonLd(),
          ]}
        />
        <Header />
        <main id="main-content" className="min-h-screen pt-14 lg:pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

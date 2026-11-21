import type { Locale } from "./routing";
import enChrome from "@/messages/en/chrome.json";
import nlChrome from "@/messages/nl/chrome.json";
import enCommon from "@/messages/en/common.json";
import nlCommon from "@/messages/nl/common.json";
import enMeta from "@/messages/en/meta.json";
import nlMeta from "@/messages/nl/meta.json";
import enHome from "@/messages/en/home.json";
import nlHome from "@/messages/nl/home.json";
import enPlatform from "@/messages/en/platform.json";
import nlPlatform from "@/messages/nl/platform.json";
import enFeatures from "@/messages/en/features.json";
import nlFeatures from "@/messages/nl/features.json";
import enSolutions from "@/messages/en/solutions.json";
import nlSolutions from "@/messages/nl/solutions.json";
import enIndustries from "@/messages/en/industries.json";
import nlIndustries from "@/messages/nl/industries.json";
import enTechnology from "@/messages/en/technology.json";
import nlTechnology from "@/messages/nl/technology.json";
import enSecurity from "@/messages/en/security.json";
import nlSecurity from "@/messages/nl/security.json";
import enAi from "@/messages/en/ai.json";
import nlAi from "@/messages/nl/ai.json";
import enAbout from "@/messages/en/about.json";
import nlAbout from "@/messages/nl/about.json";
import enFreelance from "@/messages/en/freelance.json";
import nlFreelance from "@/messages/nl/freelance.json";
import enRoadmap from "@/messages/en/roadmap.json";
import nlRoadmap from "@/messages/nl/roadmap.json";
import enFaq from "@/messages/en/faq.json";
import nlFaq from "@/messages/nl/faq.json";
import enContact from "@/messages/en/contact.json";
import nlContact from "@/messages/nl/contact.json";
import enDemo from "@/messages/en/demo.json";
import nlDemo from "@/messages/nl/demo.json";
import enLegal from "@/messages/en/legal.json";
import nlLegal from "@/messages/nl/legal.json";
import enForms from "@/messages/en/forms.json";
import nlForms from "@/messages/nl/forms.json";

const catalogs = {
  en: {
    chrome: enChrome,
    common: enCommon,
    meta: enMeta,
    home: enHome,
    platform: enPlatform,
    features: enFeatures,
    solutions: enSolutions,
    industries: enIndustries,
    technology: enTechnology,
    security: enSecurity,
    ai: enAi,
    about: enAbout,
    freelance: enFreelance,
    roadmap: enRoadmap,
    faq: enFaq,
    contact: enContact,
    demo: enDemo,
    legal: enLegal,
    forms: enForms,
  },
  nl: {
    chrome: nlChrome,
    common: nlCommon,
    meta: nlMeta,
    home: nlHome,
    platform: nlPlatform,
    features: nlFeatures,
    solutions: nlSolutions,
    industries: nlIndustries,
    technology: nlTechnology,
    security: nlSecurity,
    ai: nlAi,
    about: nlAbout,
    freelance: nlFreelance,
    roadmap: nlRoadmap,
    faq: nlFaq,
    contact: nlContact,
    demo: nlDemo,
    legal: nlLegal,
    forms: nlForms,
  },
} as const;

export async function loadMessages(locale: Locale) {
  return catalogs[locale];
}

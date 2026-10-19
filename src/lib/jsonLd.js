// Schema.org JSON-LD builders (client report 18.10.2026, prilog 1 "Upute").
// Rendered server-side via <JsonLd /> so the data is in the initial HTML.
import { SITE_URL, langPath } from "./i18n";

const ORG_ID = `${SITE_URL}/#organization`;

const SAME_AS = [
  "https://www.instagram.com/di__plan/",
  "https://www.facebook.com/DIplan0",
  "https://www.linkedin.com/company/di-plan/",
];

const AREA_SERVED = { hr: "Hrvatska", en: "Croatia", de: "Kroatien" };

// Breadcrumb labels for the fixed sections, per language.
const CRUMB_LABELS = {
  home: { hr: "Početna", en: "Home", de: "Startseite" },
  "about-us": { hr: "O nama", en: "About us", de: "Über uns" },
  service: { hr: "Usluge", en: "Services", de: "Leistungen" },
  project: { hr: "Projekti", en: "Projects", de: "Projekte" },
  news: { hr: "Novosti", en: "News", de: "Neuigkeiten" },
  contact: { hr: "Kontakt", en: "Contact", de: "Kontakt" },
  "terms-and-conditions": {
    hr: "Uvjeti korištenja",
    en: "Terms of Use",
    de: "Nutzungsbedingungen",
  },
  "cookie-policy": {
    hr: "Pravila kolačića",
    en: "Cookie Policy",
    de: "Cookie-Richtlinie",
  },
  "privacy-policy": {
    hr: "Pravila privatnosti",
    en: "Privacy Policy",
    de: "Datenschutzerklärung",
  },
};

export function crumbLabel(key, lang) {
  return CRUMB_LABELS[key]?.[lang] || CRUMB_LABELS[key]?.hr || key;
}

export function organizationJsonLd(lang = "hr") {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: "DI plan d.o.o.",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    email: "upiti@di-plan.hr",
    taxID: "74012772861",
    identifier: {
      "@type": "PropertyValue",
      name: "MB",
      value: "05323991",
    },
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Zagrebačka cesta 143A",
        postalCode: "10000",
        addressLocality: "Zagreb",
        addressCountry: "HR",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Mosna ulica 14",
        addressLocality: "Koprivnica",
        addressCountry: "HR",
      },
    ],
    areaServed: AREA_SERVED[lang] || AREA_SERVED.hr,
    parentOrganization: { "@type": "Organization", name: "DOMinvest" },
    sameAs: SAME_AS,
  };
}

export function websiteJsonLd(lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DI plan",
    url: `${SITE_URL}${langPath(lang, "/")}`,
    inLanguage: lang,
  };
}

// crumbs: [{ name, path }] — home is prepended automatically.
export function breadcrumbJsonLd(lang, crumbs) {
  const items = [{ name: crumbLabel("home", lang), path: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${langPath(lang, item.path)}`,
    })),
  };
}

export function serviceJsonLd({ name, lang }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    provider: { "@id": ORG_ID },
    areaServed: AREA_SERVED[lang] || AREA_SERVED.hr,
  };
}

export function blogPostingJsonLd({ blog, lang, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.Title,
    ...(blog.excerpt ? { description: blog.excerpt } : {}),
    ...(blog.coverImage?.url ? { image: blog.coverImage.url } : {}),
    datePublished: blog.dateOfChoice || blog.publishedAt,
    ...(blog.updatedAt ? { dateModified: blog.updatedAt } : {}),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: `${SITE_URL}${langPath(lang, path)}`,
    inLanguage: lang,
  };
}

export function creativeWorkJsonLd({ project, lang, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    ...(project.excerpt ? { description: project.excerpt } : {}),
    ...(project.coverImage?.url ? { image: project.coverImage.url } : {}),
    ...(project.location ? { locationCreated: { "@type": "Place", name: project.location } } : {}),
    creator: { "@id": ORG_ID },
    url: `${SITE_URL}${langPath(lang, path)}`,
    inLanguage: lang,
  };
}

export function faqJsonLd(faqs) {
  const valid = (faqs || []).filter(
    (f) => f?.question && f?.answer && f.answer !== "NaN"
  );
  if (!valid.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: valid.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

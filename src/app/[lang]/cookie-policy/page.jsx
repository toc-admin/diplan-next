import { notFound } from "next/navigation";
import LegalPageClient from "../../../components/LegalPageClient";
import JsonLd from "../../../components/JsonLd";
import { breadcrumbJsonLd, crumbLabel } from "../../../lib/jsonLd";
import { strapiFetch } from "../../../lib/strapi";
import { buildMetadata } from "../../../lib/seo";

async function getEntry(lang) {
  return strapiFetch("cookie-policy", { lang, tags: ["cookie-policy"] });
}

// No SEO fields exist in Strapi for legal pages (client report v4, item 8)
const DESCRIPTIONS = {
  hr: "Pravila kolačića web-stranice di-plan.hr: koje kolačiće koristimo, čemu služe i kako možete upravljati postavkama.",
  en: "Cookie policy for di-plan.hr: which cookies we use, what they are for and how you can manage your settings.",
  de: "Cookie-Richtlinie von di-plan.hr: welche Cookies wir verwenden, wozu sie dienen und wie Sie Ihre Einstellungen verwalten.",
};

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const entry = await getEntry(lang);
  return buildMetadata({
    lang,
    path: "/cookie-policy",
    fallbackTitle: entry?.name ? `${entry.name} | DI plan` : "DI plan",
    fallbackDescription: DESCRIPTIONS[lang] || DESCRIPTIONS.hr,
  });
}

export default async function CookiePolicyPage({ params }) {
  const { lang } = await params;
  const entry = await getEntry(lang);
  if (!entry?.content) notFound();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(lang, [{ name: crumbLabel("cookie-policy", lang), path: "/cookie-policy" }])} />
      <LegalPageClient title={entry.name} content={entry.content} />
    </>
  );
}

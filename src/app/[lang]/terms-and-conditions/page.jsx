import { notFound } from "next/navigation";
import LegalPageClient from "../../../components/LegalPageClient";
import JsonLd from "../../../components/JsonLd";
import { breadcrumbJsonLd, crumbLabel } from "../../../lib/jsonLd";
import { strapiFetch } from "../../../lib/strapi";
import { buildMetadata } from "../../../lib/seo";

async function getEntry(lang) {
  return strapiFetch("t-and-c", { lang, tags: ["t-and-c"] });
}

// No SEO fields exist in Strapi for legal pages (client report v4, item 8)
const DESCRIPTIONS = {
  hr: "Uvjeti korištenja web-stranice di-plan.hr tvrtke DI plan d.o.o. iz Zagreba.",
  en: "Terms and conditions of use for di-plan.hr, the website of DI plan d.o.o., Zagreb.",
  de: "Nutzungsbedingungen für di-plan.hr, die Website der DI plan d.o.o., Zagreb.",
};

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const entry = await getEntry(lang);
  return buildMetadata({
    lang,
    path: "/terms-and-conditions",
    fallbackTitle: entry?.name ? `${entry.name} | DI plan` : "DI plan",
    fallbackDescription: DESCRIPTIONS[lang] || DESCRIPTIONS.hr,
  });
}

export default async function TermsPage({ params }) {
  const { lang } = await params;
  const entry = await getEntry(lang);
  if (!entry?.content) notFound();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(lang, [{ name: crumbLabel("terms-and-conditions", lang), path: "/terms-and-conditions" }])} />
      <LegalPageClient title={entry.name} content={entry.content} />
    </>
  );
}

import { notFound } from "next/navigation";
import LegalPageClient from "../../../components/LegalPageClient";
import JsonLd from "../../../components/JsonLd";
import { breadcrumbJsonLd, crumbLabel } from "../../../lib/jsonLd";
import { strapiFetch } from "../../../lib/strapi";
import { buildMetadata } from "../../../lib/seo";

async function getEntry(lang) {
  return strapiFetch("privacy-policy", { lang, tags: ["privacy-policy"] });
}

// No SEO fields exist in Strapi for legal pages (client report v4, item 8)
const DESCRIPTIONS = {
  hr: "Pravila privatnosti DI plan d.o.o.: koje osobne podatke prikupljamo putem web-stranice di-plan.hr, u koje svrhe i koja su vaša prava.",
  en: "Privacy policy of DI plan d.o.o.: what personal data we collect through di-plan.hr, for what purposes and what your rights are.",
  de: "Datenschutzerklärung der DI plan d.o.o.: welche personenbezogenen Daten wir über di-plan.hr erheben, zu welchen Zwecken und welche Rechte Sie haben.",
};

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const entry = await getEntry(lang);
  return buildMetadata({
    lang,
    path: "/privacy-policy",
    fallbackTitle: entry?.name ? `${entry.name} | DI plan` : "DI plan",
    fallbackDescription: DESCRIPTIONS[lang] || DESCRIPTIONS.hr,
  });
}

export default async function PrivacyPolicyPage({ params }) {
  const { lang } = await params;
  const entry = await getEntry(lang);
  if (!entry?.content) notFound();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(lang, [{ name: crumbLabel("privacy-policy", lang), path: "/privacy-policy" }])} />
      <LegalPageClient title={entry.name} content={entry.content} />
    </>
  );
}

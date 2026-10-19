import { notFound } from "next/navigation";
import LegalPageClient from "../../../components/LegalPageClient";
import JsonLd from "../../../components/JsonLd";
import { breadcrumbJsonLd, crumbLabel } from "../../../lib/jsonLd";
import { strapiFetch } from "../../../lib/strapi";
import { buildMetadata } from "../../../lib/seo";

async function getEntry(lang) {
  return strapiFetch("privacy-policy", { lang, tags: ["privacy-policy"] });
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const entry = await getEntry(lang);
  return buildMetadata({
    lang,
    path: "/privacy-policy",
    fallbackTitle: entry?.name ? `${entry.name} | DI plan` : "DI plan",
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

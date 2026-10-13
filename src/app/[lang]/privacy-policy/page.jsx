import { notFound } from "next/navigation";
import LegalPageClient from "../../../components/LegalPageClient";
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
  return <LegalPageClient title={entry.name} content={entry.content} />;
}

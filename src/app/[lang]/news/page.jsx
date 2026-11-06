import BlogPageClient from "../../../components/BlogPageClient";
import JsonLd from "../../../components/JsonLd";
import { breadcrumbJsonLd, crumbLabel } from "../../../lib/jsonLd";
import { strapiFetch } from "../../../lib/strapi";
import { buildMetadata } from "../../../lib/seo";

const LIST_TITLES = {
  hr: "Novosti | DI plan",
  en: "News | DI plan",
  de: "Aktuelles | DI plan",
};

// No SEO fields exist in Strapi for the list page (client report v4, item 8)
const LIST_DESCRIPTIONS = {
  hr: "Novosti i stručni članci DI plana o arhitekturi, statici, stručnom nadzoru i energetskoj obnovi zgrada.",
  en: "News and expert articles from DI plan on architecture, structural engineering, construction supervision and energy renovation.",
  de: "Aktuelles und Fachbeiträge von DI plan zu Architektur, Tragwerksplanung, Bauüberwachung und energetischer Sanierung.",
};

async function getBlogs(lang) {
  return strapiFetch("blogs", {
    lang,
    params: { populate: "*", sort: "createdAt:desc" },
    tags: ["blog"],
  });
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return buildMetadata({
    lang,
    path: "/news",
    fallbackTitle: LIST_TITLES[lang] || LIST_TITLES.hr,
    fallbackDescription: LIST_DESCRIPTIONS[lang] || LIST_DESCRIPTIONS.hr,
  });
}

export default async function BlogPage({ params }) {
  const { lang } = await params;
  const blogs = await getBlogs(lang);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(lang, [{ name: crumbLabel("news", lang), path: "/news" }])} />
      <BlogPageClient blogs={blogs || []} />
    </>
  );
}

import BlogPageClient from "../../../components/BlogPageClient";
import { strapiFetch } from "../../../lib/strapi";
import { buildMetadata } from "../../../lib/seo";

const LIST_TITLES = {
  hr: "Novosti | DI plan",
  en: "News | DI plan",
  de: "Nachrichten | DI plan",
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
  });
}

export default async function BlogPage({ params }) {
  const { lang } = await params;
  const blogs = await getBlogs(lang);

  return <BlogPageClient blogs={blogs || []} />;
}

import { notFound } from "next/navigation";
import BlogDetailsClient from "../../../../components/BlogDetailsClient";
import { strapiFindBySlug } from "../../../../lib/strapi";
import { buildMetadata } from "../../../../lib/seo";

async function getBlog(lang, slug) {
  return strapiFindBySlug("blogs", slug, { lang, params: { populate: "*" } });
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const blog = await getBlog(lang, slug);
  if (!blog) return {};

  return buildMetadata({
    seo: blog.blogSeo,
    lang,
    path: `/news/${slug}`,
    fallbackTitle: blog.Title,
    fallbackDescription: blog.excerpt,
    image: blog.coverImage?.url,
  });
}

export default async function BlogDetailsPage({ params }) {
  const { lang, slug } = await params;
  const blog = await getBlog(lang, slug);

  // Unknown slugs must return a real 404 status (SEO requirement T4).
  if (!blog) notFound();

  return <BlogDetailsClient blog={blog} />;
}

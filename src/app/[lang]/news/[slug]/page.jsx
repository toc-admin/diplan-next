import { notFound } from "next/navigation";
import BlogDetailsClient from "../../../../components/BlogDetailsClient";
import { strapiFindBySlug } from "../../../../lib/strapi";
import { buildMetadata } from "../../../../lib/seo";
import JsonLd from "../../../../components/JsonLd";
import { blogPostingJsonLd, breadcrumbJsonLd, crumbLabel } from "../../../../lib/jsonLd";

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

  return (
    <>
      <JsonLd
        data={[
          blogPostingJsonLd({ blog, lang, path: `/news/${slug}` }),
          breadcrumbJsonLd(lang, [
            { name: crumbLabel("news", lang), path: "/news" },
            { name: blog.Title, path: `/news/${slug}` },
          ]),
        ]}
      />
      <BlogDetailsClient blog={blog} />
    </>
  );
}

"use client";

import BlogPost from "./BlogPost";
import { useLocale } from "../config/localeContext";

// Blogs arrive server-rendered via props (SEO requirement T1).
const BlogPageClient = ({ blogs }) => {
  const { locale } = useLocale();

  return (
    <div className="px-4 py-32 flex flex-col items-center justify-center bg-white">
      <h1 className="text-[60px] font-medium text-brand-color text-left mb-8">
        {locale === "hr-HR"
          ? "Novosti"
          : locale === "en"
          ? "News"
          : "Nachricht"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs?.map((blog, index) => (
          <BlogPost
            key={blog.id || index}
            image={blog.coverImage?.url}
            name={blog.Title}
            shortDescription={blog.excerpt}
            id={blog.id}
            slug={blog.slug}
            author={blog.authorName}
            date={blog.dateOfChoice}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogPageClient;

"use client";

import BlogPost from "../components/BlogPost";

// Blogs are fetched server-side and passed in, so the markup is in the
// initial HTML response (SEO requirement T1).
const MarketInsights = ({ blogs }) => {
  return (
    <div className="flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44">
      <div className="w-full max-w-[1400px] bg-white py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
};

export default MarketInsights;

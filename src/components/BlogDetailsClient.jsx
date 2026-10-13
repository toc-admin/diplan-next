"use client";

import ReactMarkdown from "react-markdown";

// Blog data arrives server-rendered via props (SEO requirement T1).
const BlogDetailsClient = ({ blog }) => {
  // dateOfChoice is an ISO date string (YYYY-MM-DD); format without Date to
  // avoid any server/client timezone drift.
  const [year, month, day] = (blog?.dateOfChoice || "").split("-");
  const formattedDate = year ? `${day}.${month}.${year}` : "";

  return (
    <div className="px-4 py-32 bg-white flex flex-col items-center justify-center">
      <h1 className="text-brand-color font-medium lg:text-[60px] text-[30px] max-w-[800px] text-center text-pretty leading-none pt-12 pb-4 w-full">
        {blog.Title}
      </h1>
      <p className="text-brand-color text-xl font-normal max-w-[700px] text-center tracking-wide leading-relaxed">
        {blog.excerpt}
      </p>
      <div className="flex items-center justify-center gap-16 pt-4 pb-16">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-brand-color text-sm font-bold uppercase">Date</p>
          <p className="text-gray-600 text-sm font-semibold">
            {formattedDate}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-brand-color text-sm font-bold uppercase">
            Author
          </p>
          <p className="text-gray-600 text-sm font-semibold">
            {blog.authorName}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-brand-color text-sm font-bold uppercase">
            Read Time
          </p>
          <p className="text-gray-600 text-sm font-semibold">
            {blog.readTime} Minutes
          </p>
        </div>
      </div>
      <img
        src={blog?.coverImage?.url}
        alt={blog.Title}
        className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] 2xl:h-[800px] object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] lg:rounded-[70px] xl:rounded-[80px] max-w-[1400px]"
      />
      <div className="text-gray-600 text-lg leading-relaxed mb-6 mt-24 max-w-[800px]">
        <ReactMarkdown
          components={{
            // CMS markdown "#" renders as h2 — the page's single h1 is the
            // article title (T3: one h1 per page)
            h1: ({ node, ...props }) => (
              <h2
                className="text-3xl md:text-4xl font-bold text-dark-text mt-8 mb-4"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="text-2xl md:text-3xl font-bold text-dark-text mt-7 mb-3"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                className="text-xl md:text-2xl font-bold text-dark-text mt-6 mb-3"
                {...props}
              />
            ),
            h4: ({ node, ...props }) => (
              <h4
                className="text-lg md:text-xl font-semibold text-dark-text mt-5 mb-2"
                {...props}
              />
            ),
            h5: ({ node, ...props }) => (
              <h5
                className="text-base md:text-lg font-semibold text-dark-text mt-4 mb-2"
                {...props}
              />
            ),
            h6: ({ node, ...props }) => (
              <h6
                className="text-base font-semibold text-dark-text mt-4 mb-2"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p className="mb-4 leading-relaxed" {...props} />
            ),
            strong: ({ node, ...props }) => (
              <strong className="font-bold text-dark-text" {...props} />
            ),
            em: ({ node, ...props }) => <em className="italic" {...props} />,
            ul: ({ node, ...props }) => (
              <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="leading-relaxed" {...props} />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="border-l-4 border-gray-300 pl-4 py-2 mb-4 italic text-gray-600"
                {...props}
              />
            ),
            a: ({ node, ...props }) => (
              <a
                className="text-blue-600 hover:text-blue-800 underline"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),
            code: ({ node, ...props }) => (
              <code
                className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono"
                {...props}
              />
            ),
            pre: ({ node, ...props }) => (
              <pre
                className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4"
                {...props}
              />
            ),
            hr: ({ node, ...props }) => (
              <hr className="my-8 border-t border-gray-300" {...props} />
            ),
            img: ({ node, ...props }) => (
              <img className="max-w-full h-auto rounded-lg my-4" {...props} />
            ),
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto mb-4">
                <table
                  className="min-w-full border-collapse border border-gray-300"
                  {...props}
                />
              </div>
            ),
            thead: ({ node, ...props }) => (
              <thead className="bg-gray-100" {...props} />
            ),
            th: ({ node, ...props }) => (
              <th
                className="border border-gray-300 px-4 py-2 text-left font-semibold"
                {...props}
              />
            ),
            td: ({ node, ...props }) => (
              <td className="border border-gray-300 px-4 py-2" {...props} />
            ),
          }}
        >
          {blog?.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogDetailsClient;

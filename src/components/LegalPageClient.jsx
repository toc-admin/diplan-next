"use client";

import ReactMarkdown from "react-markdown";

// Shared renderer for CMS-driven legal pages (privacy policy, cookie policy,
// terms). Content lives in Strapi as markdown; the client edits it there.
const LegalPageClient = ({ title, content }) => {
  return (
    <div className="flex items-center justify-center px-4 sm:px-6 md:px-12">
      <div className="w-full max-w-[900px] pt-40 pb-24">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-tight text-brand-color">
          {title}
        </h1>
        <div className="mt-10 text-light-text leading-relaxed">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h2 className="text-2xl md:text-3xl font-bold text-brand-color mt-8 mb-3" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-2xl md:text-3xl font-bold text-brand-color mt-8 mb-3" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-xl md:text-2xl font-semibold text-brand-color mt-6 mb-2" {...props} />
              ),
              p: ({ node, ...props }) => <p className="mb-4" {...props} />,
              ul: ({ node, ...props }) => <ul className="mb-4 list-disc pl-6" {...props} />,
              ol: ({ node, ...props }) => <ol className="mb-4 list-decimal pl-6" {...props} />,
              a: ({ node, ...props }) => (
                <a className="text-brand-color underline underline-offset-2" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default LegalPageClient;

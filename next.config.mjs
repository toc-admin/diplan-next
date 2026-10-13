/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Strapi Cloud media
      { protocol: "https", hostname: "*.strapiapp.com" },
      { protocol: "https", hostname: "*.media.strapiapp.com" },
      // Legacy S3 bucket used by some older entries
      {
        protocol: "https",
        hostname: "diplan-strapi-aws-s3-images-bucket.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
  async redirects() {
    return [
      // www → apex (T5); Vercel handles the domain-level variant too,
      // this covers it at the framework level as a belt-and-braces rule.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.di-plan.hr" }],
        destination: "https://di-plan.hr/:path*",
        permanent: true,
      },
      // Old sitemap URLs that never matched real routes
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/services", destination: "/service", permanent: true },
      { source: "/projects", destination: "/project", permanent: true },
      { source: "/blog", destination: "/news", permanent: true },
      { source: "/blog/:slug", destination: "/news/:slug", permanent: true },
    ];
  },
};

export default nextConfig;

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
      // The -1 slug was a separate project (structural engineering of the
      // same building), not a duplicate — in Strapi it now lives under a
      // descriptive slug, and the old address 301s there (report v4, item 2)
      {
        source: "/project/stambena-zgrada-dakovacka-1",
        destination: "/project/statika-stambene-zgrade-dakovacka",
        permanent: true,
      },
      {
        source: "/en/project/stambena-zgrada-dakovacka-1",
        destination: "/en/project/dakovacka-residential-building-structural-engineering",
        permanent: true,
      },
      {
        source: "/de/project/stambena-zgrada-dakovacka-1",
        destination: "/de/project/wohngebaeude-dakovacka-tragwerksplanung",
        permanent: true,
      },
      // The architecture project: EN lives under a translated slug, DE
      // shares the Croatian one
      {
        source: "/en/project/stambena-zgrada-dakovacka",
        destination: "/en/project/residential-building-dakovacka",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

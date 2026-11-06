import { strapiFetch } from "../../lib/strapi";
import { LANGS, langPath, SITE_URL } from "../../lib/i18n";

// The metadata sitemap.js file was baked in at build time on Vercel, so
// entries published after a deploy never appeared (client report v4, item 1).
// A dynamic route handler regenerates the sitemap on every request, straight
// from Strapi — only published entries come back from the public API, so
// drafts are excluded by construction.
export const dynamic = "force-dynamic";

const STATIC_ROUTES = ["/", "/about-us", "/service", "/project", "/news", "/contact"];

const PAGE_SIZE = 100;

// All published slugs of a collection in one language, across all pages.
async function slugs(collection, lang) {
  const all = [];
  try {
    for (let page = 1; ; page++) {
      const data = await strapiFetch(collection, {
        lang,
        params: {
          "fields[0]": "slug",
          "fields[1]": "updatedAt",
          "pagination[page]": String(page),
          "pagination[pageSize]": String(PAGE_SIZE),
        },
        tags: [collection],
      });
      const entries = data || [];
      all.push(...entries.filter((e) => e.slug));
      if (entries.length < PAGE_SIZE) break;
    }
  } catch {
    // A failing collection shouldn't take down the whole sitemap.
  }
  return all;
}

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&apos;");

function urlTag({ url, lastModified, changeFrequency, priority }) {
  return [
    "  <url>",
    `    <loc>${esc(url)}</loc>`,
    lastModified ? `    <lastmod>${esc(lastModified)}</lastmod>` : null,
    changeFrequency ? `    <changefreq>${changeFrequency}</changefreq>` : null,
    priority != null ? `    <priority>${priority}</priority>` : null,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function GET() {
  const entries = [];

  for (const lang of LANGS) {
    for (const route of STATIC_ROUTES) {
      entries.push({
        url: `${SITE_URL}${langPath(lang, route)}`,
        changeFrequency: route === "/" ? "weekly" : "monthly",
        priority: route === "/" ? 1 : 0.8,
      });
    }

    const [projects, blogs, services] = await Promise.all([
      slugs("projects", lang),
      slugs("blogs", lang),
      slugs("service-single-pages", lang),
    ]);

    for (const p of projects) {
      entries.push({
        url: `${SITE_URL}${langPath(lang, `/project/${p.slug}`)}`,
        lastModified: p.updatedAt,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
    for (const b of blogs) {
      entries.push({
        url: `${SITE_URL}${langPath(lang, `/news/${b.slug}`)}`,
        lastModified: b.updatedAt,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    for (const s of services) {
      entries.push({
        url: `${SITE_URL}${langPath(lang, `/service/${s.slug}`)}`,
        lastModified: s.updatedAt,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries.map(urlTag).join("\n") +
    `\n</urlset>\n`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}

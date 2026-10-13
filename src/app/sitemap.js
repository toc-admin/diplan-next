import { strapiFetch } from "../lib/strapi";
import { LANGS, langPath, SITE_URL } from "../lib/i18n";

// Generated automatically from Strapi content (T6): always reachable (200),
// always in sync with published entries, no hand-maintained URL list.
export const revalidate = 3600;

const STATIC_ROUTES = ["/", "/about-us", "/service", "/project", "/news", "/contact"];

async function slugs(collection, lang) {
  try {
    const data = await strapiFetch(collection, {
      lang,
      params: {
        "fields[0]": "slug",
        "fields[1]": "updatedAt",
        "pagination[pageSize]": "100",
      },
      tags: [collection],
    });
    return (data || []).filter((e) => e.slug);
  } catch {
    return [];
  }
}

export default async function sitemap() {
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

  return entries;
}

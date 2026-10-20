import { strapiLocale, STRAPI_TO_LANG } from "./i18n";

export const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "https://respected-serenity-d00e15ae56.strapiapp.com";

/**
 * Server-side Strapi fetch with ISR tags. All responses are cached and
 * invalidated together via the "strapi" tag from the revalidate webhook.
 *
 * @param {string} path - API path without /api prefix, e.g. "homepage"
 * @param {object} opts
 * @param {string} opts.lang - URL language ("hr" | "en" | "de")
 * @param {object} opts.params - extra query params (populate, filters...)
 * @param {string[]} opts.tags - extra cache tags
 */
export async function strapiFetch(path, { lang, params = {}, tags = [] } = {}) {
  const url = new URL(`/api/${path}`, STRAPI_URL);
  if (lang) url.searchParams.set("locale", strapiLocale(lang));
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const res = await fetch(url, {
    next: { tags: ["strapi", ...tags] },
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Strapi request failed (${res.status}): ${url.pathname}${url.search}`);
  }

  const json = await res.json();
  return json.data;
}

/** Fetch a collection entry by slug; returns null when not found. */
export async function strapiFindBySlug(collection, slug, { lang, params = {} } = {}) {
  const data = await strapiFetch(collection, {
    lang,
    params: {
      "filters[slug][$eq]": slug,
      ...params,
    },
    tags: [collection],
  });
  return Array.isArray(data) && data.length > 0 ? data[0] : null;
}

// Query params that pull localized slugs alongside an entry, for collections
// fetched with bracket populate (mixing populate=* with brackets 500s in Strapi).
export const LOCALIZATIONS_PARAMS = {
  "populate[localizations][fields][0]": "slug",
  "populate[localizations][fields][1]": "locale",
};

/**
 * Per-language public paths for a localized entry, built from its own slug
 * plus Strapi `localizations`. Languages without a translation stay null, so
 * hreflang can be omitted and the language switcher can fall back home.
 * Example: { hr: "/project/x", en: "/project/y", de: null }
 */
export function localizedPaths(entry, base) {
  const paths = { hr: null, en: null, de: null };
  if (!entry) return paths;
  const add = (locale, slug) => {
    const lang = STRAPI_TO_LANG[locale];
    if (lang && slug) paths[lang] = `/${base}/${slug}`;
  };
  add(entry.locale, entry.slug);
  for (const loc of entry.localizations || []) add(loc.locale, loc.slug);
  return paths;
}

/** Best Strapi image format URL at or above the given width, falling back to original. */
export function strapiImage(media, preferred = ["large", "medium", "small"]) {
  if (!media) return null;
  for (const f of preferred) {
    if (media.formats?.[f]?.url) return media.formats[f].url;
  }
  return media.url || null;
}

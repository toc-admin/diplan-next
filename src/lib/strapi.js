import { strapiLocale } from "./i18n";

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

/** Best Strapi image format URL at or above the given width, falling back to original. */
export function strapiImage(media, preferred = ["large", "medium", "small"]) {
  if (!media) return null;
  for (const f of preferred) {
    if (media.formats?.[f]?.url) return media.formats[f].url;
  }
  return media.url || null;
}

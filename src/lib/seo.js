import { LANGS, SITE_URL, langPath, languageAlternates } from "./i18n";

const SITE_NAME = "DI plan";

// hreflang entries built from real per-language paths ({hr, en, de}, null =
// no translation). With fewer than two live versions hreflang is pointless,
// so it is omitted entirely.
function alternatesFromPaths(paths) {
  const languages = {};
  for (const l of LANGS) {
    if (paths[l]) languages[l] = `${SITE_URL}${langPath(l, paths[l])}`;
  }
  if (Object.keys(languages).length < 2) return null;
  if (languages.hr) languages["x-default"] = languages.hr;
  return languages;
}

/**
 * Builds Next metadata from a Strapi SeoComponent with sensible fallbacks,
 * including canonical URL, hreflang alternates and Open Graph tags (T2).
 * Pass `localizedPaths` (from lib/strapi localizedPaths()) on pages whose
 * slug differs per language; static routes keep the same path everywhere.
 */
export function buildMetadata({ seo, lang, path, fallbackTitle, fallbackDescription, image, localizedPaths }) {
  const title = seo?.metaTitle || fallbackTitle || SITE_NAME;
  const description = seo?.metaDescription || fallbackDescription || undefined;

  // shareImage is "Multiple Media" in Strapi, so it may be an array.
  const share = Array.isArray(seo?.shareImage) ? seo.shareImage[0] : seo?.shareImage;
  const ogImage = share?.url || image || undefined;

  const canonical = `${SITE_URL}${langPath(lang, path)}`;
  const languages = localizedPaths
    ? alternatesFromPaths(localizedPaths)
    : languageAlternates(path);

  return {
    title,
    description,
    alternates: {
      canonical,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

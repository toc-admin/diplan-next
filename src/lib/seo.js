import { SITE_URL, langPath, languageAlternates } from "./i18n";

const SITE_NAME = "DI plan";

/**
 * Builds Next metadata from a Strapi SeoComponent with sensible fallbacks,
 * including canonical URL, hreflang alternates and Open Graph tags (T2).
 */
export function buildMetadata({ seo, lang, path, fallbackTitle, fallbackDescription, image }) {
  const title = seo?.metaTitle || fallbackTitle || SITE_NAME;
  const description = seo?.metaDescription || fallbackDescription || undefined;

  // shareImage is "Multiple Media" in Strapi, so it may be an array.
  const share = Array.isArray(seo?.shareImage) ? seo.shareImage[0] : seo?.shareImage;
  const ogImage = share?.url || image || undefined;

  const canonical = `${SITE_URL}${langPath(lang, path)}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(path),
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

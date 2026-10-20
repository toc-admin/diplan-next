// URL language segments and their Strapi locale codes.
// Croatian lives at the root (no prefix); en/de are prefixed.
export const LANGS = ["hr", "en", "de"];
export const DEFAULT_LANG = "hr";

export const STRAPI_LOCALES = {
  hr: "hr-HR",
  en: "en",
  de: "de-DE",
};

export const STRAPI_TO_LANG = Object.fromEntries(
  Object.entries(STRAPI_LOCALES).map(([lang, code]) => [code, lang])
);

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://di-plan.hr";

export function isValidLang(lang) {
  return LANGS.includes(lang);
}

export function strapiLocale(lang) {
  return STRAPI_LOCALES[lang] || STRAPI_LOCALES[DEFAULT_LANG];
}

// Public path for a route in a given language: hr stays unprefixed.
export function langPath(lang, path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === DEFAULT_LANG) return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

// hreflang alternates for a route (same path across languages).
export function languageAlternates(path = "/") {
  return {
    "hr": `${SITE_URL}${langPath("hr", path)}`,
    "en": `${SITE_URL}${langPath("en", path)}`,
    "de": `${SITE_URL}${langPath("de", path)}`,
    "x-default": `${SITE_URL}${langPath("hr", path)}`,
  };
}

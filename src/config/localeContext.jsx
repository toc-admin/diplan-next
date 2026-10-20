"use client";

// Locale now derives from the URL ([lang] segment) instead of localStorage,
// so server and client always agree and every language has its own address.
// The context keeps the old shape ({ locale, setLocale } with Strapi codes
// like "hr-HR") so existing components keep working unchanged.
import { createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { STRAPI_LOCALES, STRAPI_TO_LANG, DEFAULT_LANG, langPath } from "../lib/i18n";

const LocaleContext = createContext({ locale: "hr-HR", lang: DEFAULT_LANG, setLocale: () => {} });

export const LocaleProvider = ({ lang, children }) => {
  const router = useRouter();

  const setLocale = (strapiCode) => {
    const nextLang = STRAPI_TO_LANG[strapiCode] || DEFAULT_LANG;
    // The page's hreflang alternates are the source of truth for where this
    // content lives in other languages (slugs differ per locale). A page
    // without an alternate has no translation, so fall back to that
    // language's homepage instead of a 404.
    const link = document.querySelector(
      `link[rel="alternate"][hreflang="${nextLang}"]`
    );
    if (link) {
      const url = new URL(link.getAttribute("href"), window.location.origin);
      router.push(url.pathname);
      return;
    }
    router.push(langPath(nextLang, "/"));
  };

  return (
    <LocaleContext.Provider value={{ locale: STRAPI_LOCALES[lang] || "hr-HR", lang, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);

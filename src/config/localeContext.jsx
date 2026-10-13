"use client";

// Locale now derives from the URL ([lang] segment) instead of localStorage,
// so server and client always agree and every language has its own address.
// The context keeps the old shape ({ locale, setLocale } with Strapi codes
// like "hr-HR") so existing components keep working unchanged.
import { createContext, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { STRAPI_LOCALES, DEFAULT_LANG, langPath } from "../lib/i18n";

const LocaleContext = createContext({ locale: "hr-HR", lang: DEFAULT_LANG, setLocale: () => {} });

const STRAPI_TO_LANG = Object.fromEntries(
  Object.entries(STRAPI_LOCALES).map(([lang, code]) => [code, lang])
);

export const LocaleProvider = ({ lang, children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = (strapiCode) => {
    const nextLang = STRAPI_TO_LANG[strapiCode] || DEFAULT_LANG;
    // Strip the current lang prefix to get the bare route, then re-prefix.
    const bare = pathname.replace(/^\/(en|de)(?=\/|$)/, "") || "/";
    router.push(langPath(nextLang, bare));
  };

  return (
    <LocaleContext.Provider value={{ locale: STRAPI_LOCALES[lang] || "hr-HR", lang, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);

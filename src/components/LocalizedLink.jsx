"use client";

// Drop-in replacement for react-router's <Link to=...>: prefixes internal
// hrefs with the active language segment (/en, /de; Croatian stays bare).
import NextLink from "next/link";
import { useLocale } from "../config/localeContext";
import { langPath } from "../lib/i18n";

const Link = ({ to, href, children, ...rest }) => {
  const { lang } = useLocale();
  const target = to ?? href ?? "/";
  const localized = typeof target === "string" && target.startsWith("/")
    ? langPath(lang, target)
    : target;

  // react-router's state prop has no Next equivalent; drop it silently.
  const { state: _state, ...props } = rest;

  return (
    <NextLink href={localized} {...props}>
      {children}
    </NextLink>
  );
};

export { Link };
export default Link;

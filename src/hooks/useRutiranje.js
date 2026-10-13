// src/hooks/useRoutes.js
import { useLocale } from "../context/LocaleContext";
import ROUTES_MAP from "../config/routes";

export const useRutiranje = () => {
  const { locale } = useLocale();
  return ROUTES_MAP[locale] || ROUTES_MAP["hr-HR"]; // fallback to hr-HR
};

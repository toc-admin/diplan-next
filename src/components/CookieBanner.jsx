"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "../config/localeContext";
import { DEFAULT_PREFS, getConsent, saveConsent, applyConsentToGTM } from "../utils/consent";

const TEXT = {
  "hr-HR": {
    title: ["Vaša privatnost,", "vaš izbor."],
    body: "Kolačiće koristimo za osnovne funkcije stranice te — uz vašu privolu — za analitiku i marketing.",
    acceptAll: "Prihvati sve",
    rejectAll: "Odbij sve",
    preferences: "Postavke",
    prefsTitle: "Postavke kolačića",
    save: "Spremi postavke",
    back: "Natrag",
    alwaysOn: "Uvijek uključeno",
    groups: {
      necessary: ["Nužni", "Potrebni za osnovni rad stranice."],
      analytics: ["Analitika", "Pomažu nam razumjeti kako koristite stranicu (GA4)."],
      marketing: ["Marketing", "Oglašavanje i remarketing (Google Ads, Meta)."],
    },
  },
  en: {
    title: ["Your privacy,", "your choice."],
    body: "We use cookies for core site features and — with your consent — for analytics and marketing.",
    acceptAll: "Accept all",
    rejectAll: "Reject all",
    preferences: "Preferences",
    prefsTitle: "Cookie preferences",
    save: "Save preferences",
    back: "Back",
    alwaysOn: "Always on",
    groups: {
      necessary: ["Necessary", "Required for the site to work."],
      analytics: ["Analytics", "Help us understand how the site is used (GA4)."],
      marketing: ["Marketing", "Advertising and remarketing (Google Ads, Meta)."],
    },
  },
  "de-DE": {
    title: ["Ihre Privatsphäre,", "Ihre Wahl."],
    body: "Wir verwenden Cookies für Grundfunktionen der Website und — mit Ihrer Einwilligung — für Analyse und Marketing.",
    acceptAll: "Alle akzeptieren",
    rejectAll: "Alle ablehnen",
    preferences: "Einstellungen",
    prefsTitle: "Cookie-Einstellungen",
    save: "Einstellungen speichern",
    back: "Zurück",
    alwaysOn: "Immer aktiv",
    groups: {
      necessary: ["Notwendig", "Erforderlich für den Betrieb der Website."],
      analytics: ["Analyse", "Helfen uns zu verstehen, wie die Website genutzt wird (GA4)."],
      marketing: ["Marketing", "Werbung und Remarketing (Google Ads, Meta)."],
    },
  },
};

const Toggle = ({ checked, disabled, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    disabled={disabled}
    onClick={() => onChange?.(!checked)}
    className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-color ${
      checked ? "bg-cta-color" : "bg-dark-text/15"
    } ${disabled ? "opacity-60 cursor-default" : "cursor-pointer"}`}
  >
    <span
      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${
        checked ? "left-6" : "left-1"
      }`}
    />
  </button>
);

const CookieBanner = () => {
  const { locale } = useLocale();
  const t = TEXT[locale] || TEXT["hr-HR"];

  const [visible, setVisible] = useState(false);
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [showPrefs, setShowPrefs] = useState(false);

  useEffect(() => {
    const stored = getConsent();
    if (!stored) {
      setVisible(true);
    } else {
      // Re-apply the saved choice to GTM on every load (was App.jsx's
      // initConsentFromStorage in the old SPA).
      applyConsentToGTM(stored);
    }
    // Expose a global to reopen preferences from footer link
    window.showCookiePreferences = () => {
      setPrefs(getConsent() || DEFAULT_PREFS);
      setShowPrefs(true);
      setVisible(true);
    };
  }, []);

  const close = (next) => {
    saveConsent(next);
    applyConsentToGTM(next);
    setVisible(false);
    setShowPrefs(false);
  };

  const acceptAll = () => close({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () => close({ necessary: true, analytics: false, marketing: false });
  const savePreferences = () => close(prefs);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 48, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          role="dialog"
          aria-label={t.prefsTitle}
          className="fixed inset-x-0 bottom-4 z-[9999] px-4"
        >
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[24px] bg-white shadow-[0_24px_64px_-16px_rgba(10,50,100,0.45)] ring-1 ring-brand-color/10">
            {!showPrefs ? (
              <div className="flex flex-col gap-5 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
                <div className="max-w-md">
                  <p className="text-xl font-black uppercase leading-tight text-brand-color">
                    {t.title[0]}{" "}
                    <span className="italic font-normal">{t.title[1]}</span>
                  </p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-light-text/80">
                    {t.body}
                  </p>
                </div>
                <div className="flex w-full flex-col gap-2 md:w-auto md:shrink-0 md:items-end">
                  <button
                    onClick={acceptAll}
                    className="w-full rounded-full bg-cta-color px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03] md:w-auto"
                  >
                    {t.acceptAll}
                  </button>
                  <button
                    onClick={rejectAll}
                    className="w-full rounded-full border-1 border-solid border-brand-color/30 px-6 py-3 text-sm font-semibold text-brand-color transition-colors duration-200 hover:bg-brand-color/5 md:w-auto"
                  >
                    {t.rejectAll}
                  </button>
                  <button
                    onClick={() => setShowPrefs(true)}
                    className="w-full px-2 py-1 text-sm font-semibold text-brand-color/70 underline underline-offset-4 transition-colors hover:text-brand-color md:w-auto"
                  >
                    {t.preferences}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 sm:p-8">
                <p className="text-xl font-black uppercase leading-tight text-brand-color">
                  {t.prefsTitle}
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  {["necessary", "analytics", "marketing"].map((key) => (
                    <div
                      key={key}
                      className="flex items-center justify-between gap-4 rounded-2xl bg-card-bg p-4"
                    >
                      <div>
                        <p className="font-semibold text-brand-color">
                          {t.groups[key][0]}
                          {key === "necessary" && (
                            <span className="ml-2 rounded-full bg-brand-color/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-color/80">
                              {t.alwaysOn}
                            </span>
                          )}
                        </p>
                        <p className="mt-0.5 text-sm text-light-text/70">{t.groups[key][1]}</p>
                      </div>
                      <Toggle
                        label={t.groups[key][0]}
                        checked={key === "necessary" ? true : prefs[key]}
                        disabled={key === "necessary"}
                        onChange={(v) => setPrefs({ ...prefs, [key]: v })}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <button
                    onClick={() => setShowPrefs(false)}
                    className="rounded-full border-1 border-solid border-brand-color/30 px-6 py-3 text-sm font-semibold text-brand-color transition-colors duration-200 hover:bg-brand-color/5"
                  >
                    {t.back}
                  </button>
                  <button
                    onClick={savePreferences}
                    className="rounded-full bg-cta-color px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03]"
                  >
                    {t.save}
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;

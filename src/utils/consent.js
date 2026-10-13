export const DEFAULT_PREFS = { necessary: true, analytics: false, marketing: false };

export const getConsent = () => {
  try {
    return JSON.parse(localStorage.getItem("cookieConsent")) || null;
  } catch {
    return null;
  }
};

export const saveConsent = (prefs) => {
  localStorage.setItem("cookieConsent", JSON.stringify(prefs));
};

export const applyConsentToGTM = (prefs) => {
  const payload = {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage:       prefs.marketing ? "granted" : "denied",
    ad_user_data:     prefs.marketing ? "granted" : "denied",
    ad_personalization: prefs.marketing ? "granted" : "denied",
  };

  // Prefer gtag() if available (we defined a stub in index.html)
  if (window.gtag) {
    window.gtag("consent", "update", payload);
  } else {
    // Fallback – GTM will read from dataLayer too
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "consent_update", ...payload });
  }
};

// Call this once on app load to re-apply stored consent
export const initConsentFromStorage = () => {
  const prefs = getConsent();
  if (prefs) applyConsentToGTM(prefs);
};

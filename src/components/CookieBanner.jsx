import { useEffect, useState } from "react";
import { DEFAULT_PREFS, getConsent, saveConsent, applyConsentToGTM } from "../utils/consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [showPrefs, setShowPrefs] = useState(false);

  useEffect(() => {
    const stored = getConsent();
    if (!stored) {
      setVisible(true);
    }
    // Expose a global to reopen preferences from footer link
    window.showCookiePreferences = () => {
      setPrefs(getConsent() || DEFAULT_PREFS);
      setShowPrefs(true);
      setVisible(true);
    };
  }, []);

  const acceptAll = () => {
    const next = { necessary: true, analytics: true, marketing: true };
    saveConsent(next);
    applyConsentToGTM(next);
    setVisible(false);
  };

  const rejectAll = () => {
    const next = { necessary: true, analytics: false, marketing: false };
    saveConsent(next);
    applyConsentToGTM(next);
    setVisible(false);
  };

  const savePreferences = () => {
    saveConsent(prefs);
    applyConsentToGTM(prefs);
    setVisible(false);
    setShowPrefs(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 md:bottom-0 bottom-60 z-[9999] mx-4">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-2xl">
        {!showPrefs ? (
          <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-base text-dark-text max-w-md">
              We use cookies for basic functionality, analytics and marketing. You can accept, reject, or set preferences.
            </p>
            <div className="flex md:flex-row flex-col items-center justify-center gap-2 w-full">
              <button onClick={() => setShowPrefs(true)} className="rounded-lg text-sm border px-4 py-2">
                Preferences
              </button>
              <button onClick={rejectAll} className="rounded-lg text-sm border px-4 py-2">
                Reject all
              </button>
              <button onClick={acceptAll} className="rounded-lg text-sm bg-green-600 px-4 py-2 text-white">
                Accept all
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Cookie Preferences</h3>
            <div className="grid gap-3">
              <label className="flex items-center justify-between rounded-xl border border-dark-text/20 p-3">
                <div>
                  <div className="font-medium">Necessary</div>
                  <div className="text-sm text-neutral-500">Always on – required for basic site features.</div>
                </div>
                <input type="checkbox" checked readOnly className="h-4 w-4" />
              </label>

              <label className="flex items-center justify-between rounded-xl border border-dark-text/20 p-3">
                <div>
                  <div className="font-medium">Analytics</div>
                  <div className="text-sm text-neutral-500">Helps us improve the site (GA4).</div>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={prefs.analytics}
                  onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                />
              </label>

              <label className="flex items-center justify-between rounded-xl border border-dark-text/20 p-3">
                <div>
                  <div className="font-medium">Marketing</div>
                  <div className="text-sm text-neutral-500">Ads & remarketing (Google Ads, Meta Pixel).</div>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={prefs.marketing}
                  onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })}
                />
              </label>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowPrefs(false)} className="rounded-lg border px-4 py-2">
                Back
              </button>
              <button onClick={savePreferences} className="rounded-lg bg-black px-4 py-2 text-white dark:bg-white dark:text-black">
                Save preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;

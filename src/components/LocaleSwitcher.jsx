import { useState } from "react";
import { useLocale } from "../config/localeContext";
import { motion, AnimatePresence } from "framer-motion";

const locales = [
  { code: "en", label: "EN" },
  { code: "hr-HR", label: "HR" },
  { code: "de-DE", label: "DE" },
];

function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);

  // Find the label for the current locale
  const currentLabel = locales.find((l) => l.code === locale)?.label;

  const handleSelect = (code) => {
    setLocale(code);
    setOpen(false);
  };

  return (
    <div style={{ zIndex: 9999}} className="relative flex items-center">
      {/* Main circular button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-cta-color text-white font-bold flex items-center justify-center shadow-lg hover:scale-105 transition"
      >
        {currentLabel.toUpperCase()}
      </button>

      {/* Fan out locales */}
      <AnimatePresence>
        {open &&
          locales
            .filter((l) => l.code !== locale)
            .map((l, i) => (
              <motion.button
                key={l.code}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: (i + 1) * 60, opacity: 1 }}
                exit={{ y: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => handleSelect(l.code)}
                className="absolute right-0 w-12 h-12 rounded-full bg-white border text-black shadow-md flex items-center justify-center hover:bg-gray-100"
                style={{ bottom: 0 }}
              >
                {l.label}
              </motion.button>
            ))}
      </AnimatePresence>
    </div>
  );
}

export default LocaleSwitcher;

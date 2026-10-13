"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "./LocalizedLink";
import { ROUTES } from "../config/routes";
import { useLocale } from "../config/localeContext";

const menuVars = {
  initial: { y: "100%" },
  animate: {
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    y: "100%",
    transition: { delay: 0.25, duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};

const containerVars = {
  initial: {
    transition: { staggerChildren: 0.06, staggerDirection: -1 },
  },
  open: {
    transition: { delayChildren: 0.15, staggerChildren: 0.06, staggerDirection: 1 },
  },
};

const linkVars = {
  initial: {
    y: "60%",
    opacity: 0,
    transition: { duration: 0.3, ease: [0.37, 0, 0.63, 1] },
  },
  open: {
    y: 0,
    opacity: 1,
    transition: { ease: [0, 0.55, 0.45, 1], duration: 0.55 },
  },
};

const TEXT = {
  "hr-HR": {
    links: [
      ["Naslovna", ROUTES.HOME],
      ["O nama", ROUTES.ABOUT_US],
      ["Projekti", ROUTES.PROJECT],
      ["Usluge", ROUTES.SERVICE],
      ["Novosti", ROUTES.BLOG],
      ["Kontakt", ROUTES.CONTACT],
    ],
    cta: "Započni svoj projekt",
  },
  en: {
    links: [
      ["Home", ROUTES.HOME],
      ["About us", ROUTES.ABOUT_US],
      ["Projects", ROUTES.PROJECT],
      ["Services", ROUTES.SERVICE],
      ["News", ROUTES.BLOG],
      ["Contact", ROUTES.CONTACT],
    ],
    cta: "Start your project",
  },
  "de-DE": {
    links: [
      ["Startseite", ROUTES.HOME],
      ["Über uns", ROUTES.ABOUT_US],
      ["Projekte", ROUTES.PROJECT],
      ["Leistungen", ROUTES.SERVICE],
      ["Nachrichten", ROUTES.BLOG],
      ["Kontakt", ROUTES.CONTACT],
    ],
    cta: "Starte dein Projekt",
  },
};

const MobileMenu = ({ closeMenu }) => {
  const { locale } = useLocale();
  const t = TEXT[locale] || TEXT["hr-HR"];

  // Lock page scroll while the menu is open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      variants={menuVars}
      initial="initial"
      animate="animate"
      exit="exit"
      role="dialog"
      aria-label="Izbornik"
      style={{ zIndex: 998 }}
      className="fixed inset-0 bg-brand-color flex flex-col"
    >
      {/* dekorativni "arhitektonski" raster u pozadini */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.nav
        variants={containerVars}
        initial="initial"
        animate="open"
        exit="initial"
        className="relative flex flex-col justify-center flex-1 gap-1 px-8 pt-28 pb-4"
      >
        {t.links.map(([title, href], i) => (
          <div key={href} className="overflow-hidden">
            <motion.div variants={linkVars} className="flex items-baseline gap-4">
              <span className="text-white/30 text-sm font-semibold tabular-nums w-7 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Link
                onClick={closeMenu}
                to={href}
                className="text-white text-4xl sm:text-5xl font-black uppercase leading-[1.35] tracking-tight hover:text-cta-color transition-colors"
              >
                {title}
              </Link>
            </motion.div>
          </div>
        ))}
      </motion.nav>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.45, duration: 0.4 } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        className="relative px-8 pb-10 flex flex-col gap-5"
      >
        <div className="flex items-center justify-between pr-24">
          <a href="mailto:upiti@di-plan.hr" className="text-white/70 text-sm font-semibold">
            upiti@di-plan.hr
          </a>
          <div className="flex gap-4 text-white/70 text-sm font-semibold">
            <a href="https://www.instagram.com/di__plan/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://www.linkedin.com/company/di-plan/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
        <Link onClick={closeMenu} to={ROUTES.CONTACT} className="w-full">
          <span className="flex items-center justify-center bg-cta-color text-white rounded-full px-6 py-4 font-semibold text-lg">
            {t.cta}
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;

"use client";

import { useState } from "react";
import DiPlanLogo from "../assets/logo/DiPlanLogo";
import { ROUTES } from "../config/routes";
import Link from "./LocalizedLink";
import { Spiral as Hamburger } from "hamburger-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "../config/localeContext";
import LocaleSwitcher from "./LocaleSwitcher";
const NavBar = ({ scrollY, isOpen, setOpen, location }) => {
  const locale = useLocale();
  const [isServicesShown, setIsServicesShown] = useState(false);

  // Check for dynamic routes (location is the bare path without lang prefix)
  const isProjectDetailPage = /^\/project\/.+/.test(location);
  const isServiceDetailPage = /^\/service\/.+/.test(location);

  const serviceSlug = {
    "arhitektonsko-projektiranje": {
      "hr-HR": "arhitektura",
      "en": "architecture",
      "de-DE": "architektur",
    },
    "statika-i-inzenjerstvo": {
      "hr-HR": "statika-i-inzenjerstvo",
      "en": "structural-engineering",
      "de-DE": "statik",
    },
    "energetska-rjesenja": {
      "hr-HR": "energetska-rjesenja",
      "en": "energy-solutions",
      "de-DE": "energetische-loesungen",
    },
    "strucni-nadzor": {
      "hr-HR": "strucni-nadzor",
      "en": "professional-supervision",
      "de-DE": "fachliche-bauaufsicht",
    },
  };

  // Should show solid background (after scrolling past hero)
  const shouldShowSolidBg = () => {
    if (location === "/") {
      return scrollY > 700;
    }
    if (location.startsWith("/about-us")) {
      return true;
    }
    if (location.startsWith("/project") && !isProjectDetailPage) {
      return true;
    }
    if (isProjectDetailPage) {
      return scrollY > 800;
    }
    if (location.startsWith("/service")) {
      return scrollY > 900;
    }
    if (location.startsWith("/contact")) {
      return scrollY > 900;
    }
    if (location.startsWith("/news")) {
      return true;
    }
    return true;
  };

  // Decide text color based on route
  const getTextColor = () => {
    if (location === "/") {
      return scrollY > 700 ? "text-brand-color" : "text-white";
    }
    // Example: on about page
    if (location.startsWith("/about-us")) {
      return "text-brand-color";
    }
    // Example: on project page
    if (location.startsWith("/project") && !isProjectDetailPage) {
      return "text-brand-color";
    }
    // Example: on project page
    if (isProjectDetailPage) {
      return scrollY > 800 ? "text-brand-color" : "text-white";;
    }
    // Example: on service page
    if (location.startsWith("/service")) {
      return scrollY > 900 ? "text-brand-color" : "text-white";
    }
    // Example: on contact page
    if (location.startsWith("/contact")) {
      return scrollY > 900 ? "text-brand-color" : "text-white";
    }
    // Example: on contact page
    if (location.startsWith("/news")) {
      return "text-brand-color";
    }
    return "text-brand-color"; // default
  };

  // Decide text color based on route
  const getLogoColor = () => {
    if (location === "/") {
      return scrollY > 700 ? "#0A3264" : "white";
    }
    // Example: on about page
    if (location.startsWith("/about-us")) {
      return "#0A3264";
    }
    // Example: on project page
    if (location.startsWith("/project") && !isProjectDetailPage) {
      return "#0A3264";
    }
    if (isProjectDetailPage) {
      return scrollY > 800 ? "#0A3264" : "white"; // or whatever color you want
    }
    // Example: on service page
    if (location.startsWith("/service")) {
      return scrollY > 900 ? "#0A3264" : "white";
    }
    // Example: on contact page
    if (location.startsWith("/contact")) {
      return scrollY > 900 ? "#0A3264" : "white";
    }
    // Example: on contact page
    if (location.startsWith("/news")) {
      return "#0A3264";
    }
    return "#0A3264"; // default
  };

  const textColorClass = getTextColor();
  const logoColorClass = getLogoColor();
  const showSolidBg = shouldShowSolidBg();

  return (
    <header
      style={{ zIndex: 999 }}
      className="fixed top-6 w-full flex justify-center px-4"
    >
      <motion.nav
        initial={{ y: -500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        className={`flex items-center justify-between w-full max-w-[1365px] px-3 py-3 transition-all duration-300 ${showSolidBg ? 'header-box' : 'glass-card'}`}
      >
        {/* Logo */}
        <div className="flex items-center pl-8">
          <Link to={ROUTES.HOME} aria-label="DI plan — naslovna">
            <DiPlanLogo width={152} height={48} color={logoColorClass} />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center justify-center gap-10 font-semibold text-sm">
          <Link to={ROUTES.HOME}>
            <span className={`nav-button ${textColorClass}`}>
              {locale.locale === "hr-HR" && "Naslovna"}
              {locale.locale === "en" && "Home"}
              {locale.locale === "de-DE" && "Startseite"}
            </span>
          </Link>

          <Link to={ROUTES.ABOUT_US}>
            <span className={`nav-button ${textColorClass}`}>
              {locale.locale === "hr-HR" && "O nama"}
              {locale.locale === "en" && "About us"}
              {locale.locale === "de-DE" && "Über uns"}
            </span>
          </Link>

          <Link to={ROUTES.PROJECT}>
            <span className={`nav-button ${textColorClass}`}>
              {locale.locale === "hr-HR" && "Projekti"}
              {locale.locale === "en" && "Projects"}
              {locale.locale === "de-DE" && "Projekte"}
            </span>
          </Link>

          {/* Usluge with dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsServicesShown(true)}
            onMouseLeave={() => setIsServicesShown(false)}
          >
            <Link to={ROUTES.SERVICE}>
              <span className={`nav-button ${textColorClass}`}>
                {locale.locale === "hr-HR" && "Usluge"}
                {locale.locale === "en" && "Services"}
                {locale.locale === "de-DE" && "Leistungen"}
              </span>
            </Link>

            <AnimatePresence>
              {isServicesShown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, maxHeight: 0 }}
                  animate={{ opacity: 1, y: 0, maxHeight: 500 }}
                  exit={{ opacity: 0, y: 10, maxHeight: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg z-50 overflow-hidden min-w-[220px]"
                >
                  <div className="flex flex-col">
                    <Link
                      to={`${ROUTES.SERVICE}/${serviceSlug["arhitektonsko-projektiranje"][locale.locale]}`}
                      className="px-5 py-3 text-sm text-dark-text hover:bg-gray-100"
                    >
                      {locale.locale === "hr-HR" && "Arhitektura"}
                      {locale.locale === "en" && "Architecture"}
                      {locale.locale === "de-DE" && "Architektur"}
                    </Link>
                    <Link
                      to={`${ROUTES.SERVICE}/${serviceSlug["statika-i-inzenjerstvo"][locale.locale]}`}
                      className="px-5 py-3 text-sm text-dark-text hover:bg-gray-100"
                    >
                      {locale.locale === "hr-HR" && "Statika"}
                      {locale.locale === "en" && "Structural Engineering"}
                      {locale.locale === "de-DE" && "Statik"}
                    </Link>
                    <Link
                      to={`${ROUTES.SERVICE}/${serviceSlug["energetska-rjesenja"][locale.locale]}`}
                      className="px-5 py-3 text-sm text-dark-text hover:bg-gray-100"
                    >
                      {locale.locale === "hr-HR" && "Energetska rješenja"}
                      {locale.locale === "en" && "Energy Solutions"}
                      {locale.locale === "de-DE" && "Energetische Lösungen"}
                    </Link>
                    <Link
                      to={`${ROUTES.SERVICE}/${serviceSlug["strucni-nadzor"][locale.locale]}`}
                      className="px-5 py-3 text-sm text-dark-text hover:bg-gray-100"
                    >
                      {locale.locale === "hr-HR" && "Stručni nadzor"}
                      {locale.locale === "en" && "Professional Supervision"}
                      {locale.locale === "de-DE" && "Fachliche Bauaufsicht"}
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to={ROUTES.CONTACT}>
            <span className={`nav-button ${textColorClass}`}>
              {locale.locale === "hr-HR" && "Kontakt"}
              {locale.locale === "en" && "Contact"}
              {locale.locale === "de-DE" && "Kontakt"}
            </span>
          </Link>

          <Link to={ROUTES.BLOG}>
            <span className={`nav-button ${textColorClass}`}>
            {locale.locale === "hr-HR" && "Novosti"}
              {locale.locale === "en" && "News"}
              {locale.locale === "de-DE" && "Nachricht"}
            </span>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4">
          {/* hidden klasa mora biti na samom Linku — inače prazan <a> ostaje
              u DOM-u na mobitelu i pada a11y "discernible text" provjeru */}
          <Link to={ROUTES.CONTACT} className="xl:flex hidden">
            <span className="bg-cta-color text-white rounded-full px-6 py-4 font-semibold flex">
              {locale.locale === "hr-HR" && "Započni svoj projekt"}
              {locale.locale === "en" && "Start your project"}
              {locale.locale === "de-DE" && "Starte dein Projekt"}
            </span>
          </Link>
          <LocaleSwitcher />
          {/* Mobile Hamburger */}
          <div className="lg:hidden flex">
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              direction="right"
              label={isOpen ? "Zatvori izbornik" : "Otvori izbornik"}
              color={scrollY > 2000 || location !== "/" ? "#000000" : "#FFFFFF"}
            />
          </div>
        </div>
      </motion.nav>
    </header>
  );
};

export default NavBar;
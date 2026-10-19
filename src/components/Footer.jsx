"use client";

import Link from "./LocalizedLink";
import LogoFooter from "../assets/logo/DiPlanLogo";
import { ROUTES } from "../config/routes";
import { useLocale } from "../config/localeContext";
import leftBottom from "../assets/helpers/leftBottom.svg";
import rightBottom from "../assets/helpers/rightBottom.svg";

const Footer = ({ show }) => {
  const locale = useLocale();

  const menuItems = [
    { key: "home", route: ROUTES.HOME },
    { key: "about", route: ROUTES.ABOUT_US },
    { key: "services", route: ROUTES.SERVICE },
    { key: "contact", route: ROUTES.CONTACT },
    { key: "blog", route: ROUTES.BLOG },
  ];

  const menuLabels = {
    "hr-HR": {
      menu: "Izbornik",
      home: "Početna",
      about: "O nama",
      services: "Usluge",
      contact: "Kontakt",
      blog: "Blog",
    },
    en: {
      menu: "Menu",
      home: "Home",
      about: "About Us",
      services: "Services",
      contact: "Contact",
      blog: "Blog",
    },
    "de-DE": {
      menu: "Menü",
      home: "Startseite",
      about: "Über uns",
      services: "Dienstleistungen",
      contact: "Kontakt",
      blog: "Blog",
    },
  };

  const legalLabels = {
    "hr-HR": {
      terms: "Uvjeti korištenja",
      cookies: "Pravila kolačića",
      privacy: "Pravila privatnosti",
      cookieSettings: "Postavke kolačića",
    },
    en: {
      terms: "Terms & Conditions",
      cookies: "Cookie Policy",
      privacy: "Privacy Policy",
      cookieSettings: "Cookie settings",
    },
    "de-DE": {
      terms: "Nutzungsbedingungen",
      cookies: "Cookie-Richtlinie",
      privacy: "Datenschutzerklärung",
      cookieSettings: "Cookie-Einstellungen",
    },
  };

  return (
    <>
      <div className="flex items-end justify-between -mt-32">
        <img className="w-10 sm:w-10 md:w-10 lg:w-12 xl:w-20 2xl:w-20 h-10 sm:h-10 md:h-10 lg:h-12 xl:h-20 2xl:h-20" src={leftBottom.src} alt="" aria-hidden="true" />
        <img className="w-10 sm:w-10 md:w-10 lg:w-12 xl:w-20 2xl:w-20 h-10 sm:h-10 md:h-10 lg:h-12 xl:h-20 2xl:h-20" src={rightBottom.src} alt="" aria-hidden="true" />
      </div>
      <div className="bg-brand-color pb-20 pt-32 md:px-44 px-4 flex flex-col items-center justify-between">
        <div className="w-full max-w-[1400px] flex flex-col items-start justify-between">
          <LogoFooter color={"white"} width={304} height={96} />
          <div className="flex md:flex-row flex-col gap-12 items-start justify-between w-full pt-12">
            <div className="flex flex-col gap-6">
              <h3 className="font-bold text-white text-4xl max-w-[400px]">
                {locale.locale === "hr-HR" && (
                  <>
                    Kreiramo{" "}
                    <span className="italic font-normal">vrijednost</span>{" "}
                    prostoru.
                  </>
                )}
                {locale.locale === "en" && (
                  <>
                    We create <span className="italic font-normal">value</span> in
                    space.
                  </>
                )}
                {locale.locale === "de-DE" && (
                  <>
                    Wir schaffen <span className="italic font-normal">Wert</span>{" "}
                    im Raum.
                  </>
                )}
              </h3>
              <p className="font-medium text-white max-w-[500px] text-sm">
                {locale.locale === "hr-HR"
                  ? "DI plan je multidisciplinarni ured iz Zagreba specijaliziran za idejna rješenja, glavne projekte, stručni nadzor i energetsku obnovu višestambenih zgrada. Naš tim pruža potpunu podršku u svim fazama - od prvih ideja i savjetovanja do realizacije i završetka projekta. Vjerujemo u partnerstvo i dugoročnu vrijednost. Svaki prostor oblikujemo tako da bude funkcionalan, energetski učinkovit i prilagođen stvarnim potrebama korisnika. Radimo na području cijele Hrvatske i gradimo rješenja koja traju"
                  : locale.locale === "en"
                  ? "DI plan is a multidisciplinary office from Zagreb specialized in conceptual solutions, main projects, professional supervision and energy renovation of multi-residential buildings. Our team provides complete support in all phases - from initial ideas and consulting to implementation and project completion. We believe in partnership and long-term value. We design every space to be functional, energy-efficient and adapted to the real needs of users. We work throughout Croatia and build solutions that last."
                  : "DI plan ist ein multidisziplinäres Büro aus Zagreb, spezialisiert auf konzeptionelle Lösungen, Hauptprojekte, fachliche Überwachung und energetische Sanierung von Mehrfamilienhäusern. Unser Team bietet vollständige Unterstützung in allen Phasen - von ersten Ideen und Beratung bis zur Umsetzung und Projektabschluss. Wir glauben an Partnerschaft und langfristigen Wert. Jeden Raum gestalten wir so, dass er funktional, energieeffizient und an die realen Bedürfnisse der Nutzer angepasst ist. Wir arbeiten in ganz Kroatien und entwickeln Lösungen, die Bestand haben."}
              </p>
            </div>
            <div className="flex flex-col gap-2 items-start justify-start">
              <h3 className="text-white font-bold text-xl">
                {menuLabels[locale.locale].menu}
              </h3>
              {menuItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.route}
                  className="text-card-bg/70 font-semibold clash"
                >
                  {menuLabels[locale.locale][item.key]}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2 items-start justify-start">
              <h3 className="text-white font-bold text-xl">
                {locale.locale === "hr-HR" && "Prati nas"}
                {locale.locale === "en" && "Follow us"}
                {locale.locale === "de-DE" && "Folgt uns"}
              </h3>
              <a
                href="https://www.instagram.com/di__plan/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-card-bg/70 font-semibold"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/DIplan0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-card-bg/70 font-semibold"
              >
                Facebook
              </a>
              <a
                href="https://www.linkedin.com/company/di-plan/?originalSubdomain=hr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-card-bg/70 font-semibold"
              >
                LinkedIn
              </a>
            </div>
            <div className="flex flex-col gap-2 items-start justify-start">
              <h3 className="text-white font-bold text-xl">
                {locale.locale === "hr-HR" && "Javi nam se"}
                {locale.locale === "en" && "Get in touch"}
                {locale.locale === "de-DE" && "Kontaktieren Sie uns"}
              </h3>
              <a href="mailto:upiti@di-plan.hr" className="text-card-bg/70 font-semibold">
                Email: upiti@di-plan.hr
              </a>
              <p className="text-card-bg/70 font-semibold clash">
                Zagrebačka cesta 143A, Zagreb
              </p>
              <p className="text-card-bg/70 font-semibold clash">
                Mosna ulica 14, Koprivnica
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-brand-color md:px-44 px-4 flex pb-12 items-center justify-center">
        <div className="flex items-center justify-between w-full max-w-[1400px] gap-12 pt-4">
          <p className="text-white/80 text-sm">
            © {new Date().getFullYear()} DI-PLAN d.o.o. Sva prava pridržana. Izrada:{" "}
            <a href="https://www.ninefold.eu" target="_blank" rel="noopener">
              Ninefold
            </a>
          </p>
          <div className="flex flex-wrap items-center justify-end gap-4">
            <Link href="/terms-and-conditions" className="text-white/80 text-sm hover:text-white transition-colors">
              {legalLabels[locale.locale].terms}
            </Link>
            <Link href="/cookie-policy" className="text-white/80 text-sm hover:text-white transition-colors">
              {legalLabels[locale.locale].cookies}
            </Link>
            <Link href="/privacy-policy" className="text-white/80 text-sm hover:text-white transition-colors">
              {legalLabels[locale.locale].privacy}
            </Link>
            <button
              onClick={() => window.showCookiePreferences?.()}
              className="text-white/80 text-sm hover:text-white transition-colors underline underline-offset-2"
            >
              {legalLabels[locale.locale].cookieSettings}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ROUTES } from "../config/routes"
import { useLocale } from "../config/localeContext";

const menuVars = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: [0.12, 0, 0.39, 0],
    },
  },
  exit: {
    scaleY: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
const containerVars = {
  initial: {
    transition: {
      staggerChildren: 0.09,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.09,
      staggerDirection: 1,
    },
  },
};

const MobileMenu = ({ closeMenu }) => {

  const locale = useLocale();

  const navLinks = [
    { title: (locale.locale === "hr-HR" ? "Naslovna" : locale.locale === "en" ? "Home" : "Startseite"), href: ROUTES.HOME },
    { title: (locale.locale === "hr-HR" ? "O nama" : locale.locale === "en" ? "About Us" : "Über uns"), href: ROUTES.ABOUT_US },
    { title: (locale.locale === "hr-HR" ? "Projekti" : locale.locale === "en" ? "Projects" : "Projekte"), href: ROUTES.PROJECT },
    { title: (locale.locale === "hr-HR" ? "Usluge" : locale.locale === "en" ? "Services" : "Leistungen"), href: ROUTES.SERVICE },
    { title: (locale.locale === "hr-HR" ? "Kontakt" : locale.locale === "en" ? "Contact" : "Kontakt"), href: ROUTES.CONTACT },
    { title: (locale.locale === "hr-HR" ? "Novosti" : locale.locale === "en" ? "News" : "Nachricht"), href: ROUTES.BLOG },
  ];

  return (
    <motion.div
        variants={menuVars}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ zIndex: 9999}}
        className="fixed left-0 bottom-0 h-[70%] w-full rounded-t-[40px] header-box origin-bottom dark:bg-background p-10 padding-x py-6 z-100"
      >
        <div className="flex h-full flex-col">
          <div className="flex justify-between">
          </div>
          <motion.div
            variants={containerVars}
            initial="initial"
            animate="open"
            exit="initial"
            className="flex flex-col h-full justify-center font-clashdisplay items-center gap-4 "
          >
            {navLinks.map((link, index) => {
              return (
                <div key={index} className="overflow-hidden">
                  <MobileNavLink
                    title={link.title}
                    href={link.href}
                    closeMobMenu={closeMenu}
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
  )
}

export default MobileMenu

const MobileNavLink = ({ title, href, closeMobMenu }) => {
  return (
    <motion.div
      variants={mobileLinkVars}
      className="md:text-8xl text-4xl uppercase text-text-dark clash dark:text-text font-black"
    >
      <Link onClick={closeMobMenu}  to={href}>{title}</Link>
    </motion.div>
  );
};

const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};

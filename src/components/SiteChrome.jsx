"use client";

// Client shell around the fixed navigation: owns the mobile-menu state and a
// bucketed scroll position (updates at most every 50px, not every frame).
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import NavBar from "./NavBar";
import MobileMenu from "./MobileMenu";

const BUCKET = 50;

const SiteChrome = () => {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Bare route without the language prefix, matching the old location prop.
  const location = pathname.replace(/^\/(en|de)(?=\/|$)/, "") || "/";

  useEffect(() => {
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const bucketed = Math.floor(window.scrollY / BUCKET) * BUCKET;
        setScrollY((prev) => (prev === bucketed ? prev : bucketed));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <NavBar scrollY={scrollY} isOpen={isOpen} setOpen={setOpen} location={location} />
      {isOpen && (
        <AnimatePresence>
          <MobileMenu closeMenu={() => setOpen(false)} />
        </AnimatePresence>
      )}
    </>
  );
};

export default SiteChrome;

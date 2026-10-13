"use client";

// Lenis smooth scrolling, initialised once. Unlike the old App.jsx this keeps
// scroll position out of React state entirely — no re-renders while scrolling.
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

const SmoothScroll = () => {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothTouch: false,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Jump to top on route change (Next preserves scroll for client nav by default
  // only on back/forward; this mirrors the old ScrollToTop behaviour with Lenis).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default SmoothScroll;

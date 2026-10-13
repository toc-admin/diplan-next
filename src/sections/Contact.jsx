"use client";

import Link from "../components/LocalizedLink";
import MixedTitle from "../components/MixedTitle";
import { ROUTES } from "../config/routes";

const Contact = ({ content, to, number }) => {
  const isAnchorLink = to?.startsWith("#");

  const handleAnchorClick = (e) => {
    if (isAnchorLink) {
      e.preventDefault();
      const element = document.querySelector(to);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="py-32 flex flex-col gap-6 items-center justify-center w-full md:px-32 px-6 bg-white rounded-b-[40px] sm:rounded-b-[50px] md:rounded-b-[60px] lg:rounded-b-[70px] xl:rounded-b-[80px] text-center">
      <MixedTitle
        number={number}
        text={content?.finalCtaText}
        stil="
          text-brand-color font-bold
          text-3xl sm:text-4xl md:text-6xl lg:text-7xl
          max-w-[800px] leading-snug
        "
      />
      <p className="text-brand-color/70 font-medium text-base sm:text-lg md:text-xl max-w-[600px]">
        {content?.finalCtaSubtitle}
      </p>
      {isAnchorLink ? (
        <a href={to} onClick={handleAnchorClick}>
          <button
            className="
              bg-cta-color
              px-6 sm:px-8 py-3 sm:py-4
              font-bold text-white rounded-full
              text-base sm:text-lg tracking-wider mt-4
            "
          >
            {content?.finalCtaButton}
          </button>
        </a>
      ) : (
        <Link to={to}>
          <span
            className="
              bg-cta-color
              px-6 sm:px-8 py-3 sm:py-4
              font-bold text-white rounded-full
              text-base sm:text-lg tracking-wider mt-4
            "
          >
            {content?.finalCtaButton}
          </span>
        </Link>
      )}
    </div>
  );
};

export default Contact;
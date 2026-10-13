"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "../components/LocalizedLink";
import { ROUTES } from "../config/routes";

const OurNumbers = ({ id, content }) => {
  // Create a ref to track the motion div
  const ref = useRef(null);
  // Detect if the element is in view
  const isInView = useInView(ref, { once: true }); // Animation triggers once, threshold = 20% in view

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44">
      <div
        className="py-8 sm:py-12 md:py-16 flex flex-col lg:flex-row max-w-[1400px] items-start justify-between w-full bg-white gap-8 lg:gap-12"
        id={id}
      >
        {/* Left Section */}
        <div className="flex flex-col items-start justify-start gap-3 sm:gap-4 w-full lg:w-auto lg:max-w-[400px]">
          <h3 className="text-brand-color text-[36px] sm:text-[36px] md:text-[39px] lg:text-[42px] xl:text-[45px] 2xl:text-[48px] font-semibold max-w-full lg:max-w-[400px] leading-tight">
            {content?.numbersTitle}
          </h3>
          <p className="text-brand-color text-sm sm:text-base md:text-lg max-w-full lg:max-w-[400px] leading-6 sm:leading-7 tracking-wide">
            {content?.numbersSubtitle}
          </p>
          <Link to={ROUTES.CONTACT} className="mt-2">
            <span className="learn-more-dark">
              <span className="circle" aria-hidden="true">
                <span className="icon arrow dark"></span>
              </span>
              <span className="button-text-dark">{content?.numbersCta}</span>
            </span>
          </Link>
        </div>

        {/* Right Section - Stats Grid */}
        <div className="flex flex-col items-start justify-start gap-4 sm:gap-6 md:gap-8 w-full lg:flex-1">
          {/* First Row */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-stretch justify-between w-full">
            <div className="bg-card-bg rounded-[15px] sm:rounded-[20px] w-full sm:w-[calc(50%-16px)] h-[220px] sm:h-[250px] md:h-[280px] lg:h-[299px] p-4 sm:p-6 md:p-8 flex flex-col items-start justify-between">
              <div className="flex flex-col gap-2 items-start justify-start">
                <h4 className="text-brand-color font-black text-5xl">
                  {content?.statOne}+
                </h4>
                <p className="text-brand-color font-bold text-sm uppercase">
                  {content?.statOneSubtitle}
                </p>
              </div>
              <p className="text-brand-color font-normal text-md sm:text-base md:text-lg leading-relaxed">
                {content?.statOneText}
              </p>
            </div>
            
            <div className="bg-card-bg rounded-[15px] sm:rounded-[20px] w-full sm:w-[calc(50%-16px)] h-[220px] sm:h-[250px] md:h-[280px] lg:h-[299px] p-4 sm:p-6 md:p-8 flex flex-col items-start justify-between">
              <div className="flex flex-col gap-2 items-start justify-start">
                <h4 className="text-brand-color font-black text-5xl">
                  {content?.statTwo}+
                </h4>
                <p className="text-brand-color font-bold text-xs sm:text-sm uppercase">
                  {content?.statTwoSubtitle}
                </p>
              </div>
              <p className="text-brand-color font-normal text-md sm:text-base md:text-lg leading-relaxed">
                {content?.statTwoText}
              </p>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-stretch justify-between w-full">
            <div className="bg-card-bg rounded-[15px] sm:rounded-[20px] w-full sm:w-[calc(50%-16px)] h-[220px] sm:h-[250px] md:h-[280px] lg:h-[299px] p-4 sm:p-6 md:p-8 flex flex-col items-start justify-between">
              <div className="flex flex-col gap-2 items-start justify-start">
                <h4 className="text-brand-color font-black text-5xl">
                  {content?.statThree}%
                </h4>
                <p className="text-brand-color font-bold text-xs sm:text-sm uppercase">
                  {content?.statThreeSubtitle}
                </p>
              </div>
              <p className="text-brand-color font-normal text-md sm:text-base md:text-lg leading-relaxed">
                {content?.statThreeText}
              </p>
            </div>
            
            <div className="bg-card-bg rounded-[15px] sm:rounded-[20px] w-full sm:w-[calc(50%-16px)] h-[220px] sm:h-[250px] md:h-[280px] lg:h-[299px] p-4 sm:p-6 md:p-8 flex flex-col items-start justify-between">
              <div className="flex flex-col gap-2 items-start justify-start">
                <h4 className="text-brand-color font-black text-5xl">
                  {content?.statFour}
                </h4>
                <p className="text-brand-color font-bold text-xs sm:text-sm uppercase">
                  {content?.statFourSubtitle}
                </p>
              </div>
              <p className="text-brand-color font-normal text-md sm:text-base md:text-lg leading-relaxed">
                {content?.statFourText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurNumbers;
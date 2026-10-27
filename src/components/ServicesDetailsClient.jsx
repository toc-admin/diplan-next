"use client";

import Image from "next/image";
import { useLocale } from "../config/localeContext";
import MixedTitleLong from "./MixedTitleLong";
import Contact from "../sections/Contact";
import { motion } from "framer-motion";
import heroImg from "../assets/images/servicesImage.webp";
import FaqComponent from "./FaqComponent";
import Button from "./Button";
import { ROUTES } from "../config/routes";
import OurProjects from "../sections/OurProjects";

const ServicesDetailsClient = ({ service, initialProjects }) => {
  const { locale } = useLocale();

  return (
    <>
      {/* HERO SECTION */}
      <motion.div className="relative flex flex-col items-center justify-center h-screen md:py-56 py-16">
        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 overflow-hidden"
        >
          <Image
            src={service?.coverImage?.url || heroImg}
            alt={service?.coverImage?.alternativeText || service?.heroTitle || ""}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 90%),
                              linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%)`,
            }}
          />
        </motion.div>

        {/* H1 Animation & Subtext */}
        <div className="relative z-10 flex flex-col md:gap-4 gap-4 items-start justify-end h-full max-w-[1400px] w-full px-4 pb-32 sm:pb-32 md:pb-6 lg:pb-0 xl:pb-0 2xl:pb-0">
          <MixedTitleLong
            text={service?.heroTitle}
            stil={
              "font-bold text-[35px] sm:text-[55px] md:text-[60px] lg:text-[65px] xl:text-[70px] 2xl:text-[75px] text-left uppercase max-w-[1150px] leading-tight text-white"
            }
          />
          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[18px] sm:text-[20px] md:text-[20px] lg:text-[22px] xl:text-[22px] 2xl:text-[24px] text-left text-white font-semibold tracking-wider md:leading-relaxed leading-5 max-w-[862px] whitespace-pre-wrap pb-4"
          >
            {service?.heroSubtitle}
          </motion.p>
          <Button to={ROUTES.CONTACT} text={service?.heroButton} />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[101px] bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] lg:rounded-t-[70px] xl:rounded-t-[80px] z-20 transform translate-y-0.5" />
      </motion.div>

      {/* INCLUDED SECTION */}
      <div className="flex w-full bg-white items-center justify-center mb-48 mt-0 sm:mt-0 md:mt-16 lg:mt-16 xl:mt-16 2xl:mt-16">
        <div className="flex md:flex-row flex-col max-w-[1200px] w-full items-start justify-between px-4 gap-16">
          <h3 className="font-semibold text-brand-color uppercase text-base w-full max-w-[260px]">
            {service?.includedTitle}?
          </h3>
          <p className="max-w-[600px] text-pretty whitespace-pre-wrap text-gray-600 font-medium text-xl">
            {service?.includedText}
          </p>
        </div>
      </div>

      {/* KEY BENEFITS SECTION */}
      <div className="w-full bg-white flex flex-col items-center justify-center">
        <h3 className="text-gray-600 uppercase font-semibold text-sm">
          {locale === "hr-HR"
            ? "Ključne prednosti"
            : locale === "en"
            ? "Key Benefits"
            : "entscheidende Vorteile"
          }
        </h3>
        <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-16 py-16 px-4">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Hardcoded first item */}
            <div className="flex flex-col items-start justify-start gap-8 row-span-1">
              <h2 className="text-[35px] sm:text-[45px] md:text-[48px] lg:text-[56px] xl:text-[60px] 2xl:text-[64px] font-medium max-w-[640px] text-brand-color leading-none">
                {service?.whyTitle}
              </h2>
              <p className="md:mb-12 mb-6 max-w-[618px] font-medium text-[16px] sm:text-[16px] md:text-[18px] lg:text-[18px] xl:text-[20px] 2xl:text-[20px] text-gray-600 leading-relaxed tracking-wider whitespace-pre-wrap text-pretty">
                {service?.whyText}
              </p>
            </div>

            {/* Map through dynamic services */}
            {service?.serviceBenefits?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-start gap-8 row-span-2"
              >
                {/* w-full: fill image has no intrinsic width, so inside this
                    items-start flex column the card would collapse to 0px */}
                <div className="relative w-full max-w-[640px] max-h-[860px] rounded-[40px] overflow-hidden shadow-lg aspect-4/5">
                  {item.benefitImage?.url && (
                    <Image
                      src={item.benefitImage.url}
                      alt={item.benefitImage.alternativeText || item.benefitTitle || 'Benefit image'}
                      fill
                      sizes="(max-width: 768px) 100vw, 640px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="md:w-full w-full flex flex-col gap-4 px-4 max-w-[640px] mb-8">
                  <h3 className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] xl:text-[35px] 2xl:text-[35px] text-brand-color font-medium leading-snug pt-4">
                    {item.benefitTitle}
                  </h3>
                  <p className="text-gray-600 font-normal text-md sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl">
                    {item.benefitText}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROCESS SECTION */}
      {service?.ourProcess?.length > 0 ? <div className="flex w-full bg-white items-center justify-center mb-48 mt-16">
        <div className="flex lg:flex-row flex-col max-w-[1300px] w-full lg:items-start items-center justify-between px-4 gap-16">
          <h3 className="font-semibold text-brand-color lg:text-left text-center uppercase text-base w-full max-w-[230px]">
            {service?.procesTitle}?
          </h3>
          <div className="space-y-8 w-full max-w-[600px]">
            {service?.ourProcess?.map((item, index) => (
              <div key={item.id} className="flex items-start justify-between gap-16">
                {/* Number */}
                <div className="flex-shrink-0">
                  <span className="text-2xl font-bold text-brand-color italic">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 max-w-[900px] border-b-1 border-dark-text/20 pb-8">
                  <h3 className="text-brand-color font-bold text-xl mb-4 leading-tight">
                    {item.step}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> : null}

      {/* OUR PROJECTS SECTION */}
      <OurProjects
        content={service}
        id="about"
        filter={service?.whichService}
        initialProjects={initialProjects}
      />

      {/* FAQ SECTION */}
      <div className="pb-32">
        <FaqComponent title={service?.faqTitle} faqs={service?.faq} />
      </div>

      {/* CONTACT SECTION */}
      <Contact content={service} to={ROUTES.CONTACT} number={5} />
    </>
  );
};

export default ServicesDetailsClient;

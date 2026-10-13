"use client";

import { useLocale } from "../config/localeContext";
import MixedTitleLong from "./MixedTitleLong";
import Contact from "../sections/Contact";
import { motion } from "framer-motion";
import heroImg from "../assets/images/servicesImage.webp";
import FaqComponent from "./FaqComponent";
import Link from "./LocalizedLink";
import { ROUTES } from "../config/routes";

const ServicesPageClient = ({ content }) => {
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
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 90%),
                            linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%),
                            url(${heroImg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* H1 Animation & Subtext */}
        <div className="relative z-10 flex flex-col gap-4 items-start justify-end h-full max-w-[1400px] w-full px-4 pb-32 sm:pb-32 md:pb-6 lg:pb-0 xl:pb-0 2xl:pb-0">
          <MixedTitleLong
            text={content?.heroTitle}
            stil={
              "font-bold text-[30px] sm:text-[35px] md:text-[50px] lg:text-[55px] xl:text-[60px] 2xl:text-[75px] text-left uppercase max-w-[1150px] leading-tight text-white"
            }
          />
          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[18px] sm:text-[20px] md:text-[20px] lg:text-[22px] xl:text-[22px] 2xl:text-[24px] text-left text-white font-semibold tracking-wider md:leading-relaxed leading-5 max-w-[862px] whitespace-pre-wrap"
          >
            {content?.heroSubtitle}
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[101px] bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] lg:rounded-t-[70px] xl:rounded-t-[80px] z-20 transform translate-y-0.5" />
      </motion.div>

      <div className="w-full bg-white flex items-center justify-center pt-0 sm:pt-0 md:pt-0 lg:pt-0 xl:pt-24 2xl:pt-24 pb-48">
        <div className="flex flex-wrap gap-8 items-center justify-center max-w-[1400px] px-4">
          <div className="bg-card-bg rounded-[20px] w-full sm:w-full md:w-[410px] lg:w-[410px] xl:w-[410px] 2xl:w-[410px] h-[299px] p-8 flex flex-col items-start justify-between">
            <h4 className="text-brand-color font-black text-5xl">
              {content?.statOne}+
            </h4>
            <p className="text-brand-color font-bold text-sm uppercase -mt-12">
              {content?.statOneSubtitle}
            </p>
            <p className="text-gray-600 font-normal text-lg">
              {content?.statOneText}
            </p>
          </div>
          <div className="bg-card-bg rounded-[20px] w-full sm:w-full md:w-[410px] lg:w-[410px] xl:w-[410px] 2xl:w-[410px] h-[299px] p-8 flex flex-col items-start justify-between">
            <h4 className="text-brand-color font-black text-5xl">
              {content?.statTwo}+
            </h4>
            <p className="text-brand-color font-bold text-sm uppercase -mt-12">
              {content?.statTwoSubtitle}
            </p>
            <p className="text-gray-600 font-normal text-lg">
              {content?.statTwoText}
            </p>
          </div>
          <div className="bg-card-bg rounded-[20px] w-full sm:w-full md:w-[410px] lg:w-[410px] xl:w-[410px] 2xl:w-[410px] h-[299px] p-8 flex flex-col items-start justify-between">
            <h4 className="text-brand-color font-black text-5xl">
              {content?.statThree}%
            </h4>
            <p className="text-brand-color font-bold text-sm uppercase -mt-12">
              {content?.statThreeSubtitle}
            </p>
            <p className="text-gray-600 font-normal text-lg">
              {content?.statThreeText}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-white flex flex-col items-center justify-center">
        <h3 className="text-gray-600 uppercase font-semibold text-sm">
          {locale === "hr-HR"
            ? "Naše Usluge"
            : locale === "en"
            ? "Our Services"
            : "Unsere Leistungen"}
        </h3>

        <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-16 py-16 px-4">
          <div className="grid md:grid-cols-2 md:gap-16 gap-8">
            {/* Hardcoded first item */}
            <div className="flex flex-col items-start justify-start gap-8 row-span-1">
            <h2 className="text-[35px] sm:text-[45px] md:text-[48px] lg:text-[56px] xl:text-[60px] 2xl:text-[64px] font-medium max-w-[640px] text-brand-color leading-none">{content?.servicesTitle}</h2>
          <p className="md:mb-12 mb-6 max-w-[618px] font-medium text-[16px] sm:text-[16px] md:text-[18px] lg:text-[18px] xl:text-[20px] 2xl:text-[20px] text-gray-600 leading-relaxed tracking-wider whitespace-pre-wrap text-pretty">
            {content?.servicesSubtitle}
          </p>
            </div>

            {/* Map through dynamic services */}
            {content?.service?.map((item) => (
              <div key={item.id} className="flex flex-col items-start gap-8 row-span-2">
                <div className="max-w-[640px] max-h-[860px] rounded-[40px] overflow-hidden shadow-lg aspect-4/5">
                  {item.serviceImage?.url && (
                    <Link to={ROUTES.SERVICE + "/" + item.slugOfService}>
                    <img
                      src={`${item.serviceImage.formats?.medium?.url || item.serviceImage.url}`}
                      alt={item.serviceImage.alternativeText || item.title}
                      className="w-full h-full object-cover"
                    />
                    </Link>
                  )}
                </div>
                <div className="md:w-full w-full flex flex-col gap-4 px-4 max-w-[640px] mb-8">
                  <h3 className="text-[35px] sm:text-[52px] md:text-[52px] lg:text-[56px] xl:text-[60px] 2xl:text-[64px] text-brand-color font-bold leading-none pt-4">{item.title}</h3>
                  <p className="text-gray-600 font-normal text-[16px] sm:text-[16px] md:text-[18px] lg:text-[18px] xl:text-[20px] 2xl:text-[20px]">{item.subtitle}</p>
                  <p className="font-semibol text-[16px] sm:text-[16px] md:text-[18px] lg:text-[18px] xl:text-[20px] 2xl:text-[20px] text-brand-color mt-2">{item.benefits}</p>
                  <ul className="list-disc list-inside text-gray-600 text-[16px] sm:text-[16px] md:text-[18px] lg:text-[18px] xl:text-[20px] 2xl:text-[20px] font-normal gap-2">
                    <li>{item.benefitOne}</li>
                    <li>{item.benefitTwo}</li>
                    <li>{item.benefitThree}</li>
                    <li>{item.benefitFour}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pb-32">
      <FaqComponent title={content?.faqTitle} faqs={content?.faq} />
      </div>

      <Contact content={content} to={ROUTES.CONTACT} number={4} />
    </>
  );
};

export default ServicesPageClient;

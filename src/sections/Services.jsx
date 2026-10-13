"use client";

import MixedTitle from "../components/MixedTitle";
import { useLocale } from "../config/localeContext";
import Link from "../components/LocalizedLink";
import { ROUTES } from "../config/routes";

// Services are fetched server-side and passed in (SEO requirement T1).
const Services = ({ id, content, services = [] }) => {
  const { locale } = useLocale();

  const renderCard = (service, type) => {
    if (!service) return null;

    if (type === "image") {
      return (
        <div className="w-[377px] h-[401px] rounded-[20px] overflow-hidden flex items-center justify-center group">
          <img
            className="w-[377px] h-[401px] object-cover transition-transform duration-300 group-hover:scale-105"
            src={service.coverImage?.url}
            alt={service.heroTitle}
          />
        </div>
      );
    }

    return (
      <div className="w-[377px] h-[401px] rounded-[20px] overflow-hidden flex flex-col items-start justify-between bg-card-bg p-8">
        <h3 className="text-brand-color font-bold text-3xl">
          {service.heroTitle}
        </h3>
        <p className="text-brand-color font-medium text-lg">
          {service.heroSubtitle}
        </p>
        <Link to={ROUTES.SERVICE + "/" + service.slug}>
          <span className="font-medium text-brand-color text-lg nav-button">
            {locale === "hr-HR"
              ? "Saznaj više"
              : locale === "en"
              ? "Learn More"
              : "Erfahren Sie meh"}
          </span>
        </Link>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center md:px-6 px-4">
    <div
      className="py-16 flex flex-col items-start justify-center w-full bg-white max-w-[1400px]"
      id={id}
    >
      {/* Header */}
      <div className="flex flex-col gap-3 items-center justify-center w-full">
        <div className="border-1 border-brand-color rounded-full px-6 py-2">
          <h3 className="text-brand-color">
            {locale === "hr-HR"
              ? "Naše Usluge"
              : locale === "en"
              ? "Our Services"
              : "Unsere Leistungen"}
          </h3>
        </div>
        <MixedTitle
          number={1}
          text={content?.servicesTitle}
          stil={
            "font-bold text-[45px] sm:text-[48px] md:text-[51px] lg:text-[54px] xl:text-[57px] 2xl:text-[60px] text-center text-brand-color"
          }
        />
        <p className="font-medium text-xl text-center pretty tracking-wide leading-7 max-w-[650px] text-light-text">
          {content?.servicesSubtitle}
        </p>
      </div>


      {/* Services Rows */}
      {services.length > 0 && (
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-x-8 gap-y-8 mt-12 max-w-[1400px]">
        {/* Service 0 */}
        <div className="col-span-1 flex items-center justify-center">
          {renderCard(services[0], "image")}
        </div>
        <div className="col-span-1 flex items-center justify-center">
          {renderCard(services[0], "text")}
        </div>

        {/* Service 1 */}
        <div className="col-span-1 flex items-center justify-center">
          {renderCard(services[1], "image")}
        </div>
        <div className="col-span-1 flex items-center justify-center">
          {renderCard(services[1], "text")}
        </div>

        {/* Service 2 */}
        <div className="col-span-1 flex items-center justify-center">
          {renderCard(services[2], "text")}
        </div>
        <div className="col-span-1 flex items-center justify-center">
          {renderCard(services[2], "image")}
        </div>

        {/* Service 3 */}
        <div className="col-span-1 flex items-center justify-center">
          {renderCard(services[3], "text")}
        </div>
        <div className="col-span-1 flex items-center justify-center">
          {renderCard(services[3], "image")}
        </div>
      </div>
      )}
    </div>
    </div>
  );
};

export default Services;
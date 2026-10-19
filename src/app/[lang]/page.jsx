import HeroSection from "../../sections/HeroSection";
import OurProjects from "../../sections/OurProjects";
import Services from "../../sections/Services";
import Contact from "../../sections/Contact";
import OurNumbers from "../../sections/OurNumbers";
import MarketInsights from "../../sections/MarketInsights";
import Reviews from "../../sections/Reviews";
import { ROUTES } from "../../config/routes";
import { strapiFetch } from "../../lib/strapi";
import { buildMetadata } from "../../lib/seo";
import JsonLd from "../../components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "../../lib/jsonLd";

async function getHomepage(lang) {
  return strapiFetch("homepage", { lang, params: { populate: "*" }, tags: ["homepage"] });
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const content = await getHomepage(lang);
  return buildMetadata({
    seo: content?.homePageSeo,
    lang,
    path: "/",
    fallbackTitle: "DI plan | Arhitektura, stručni nadzor, statika i energetska rješenja",
  });
}

export default async function HomePage({ params }) {
  const { lang } = await params;

  const [content, services, projects, blogs] = await Promise.all([
    getHomepage(lang),
    strapiFetch("service-single-pages", {
      lang,
      params: { populate: "*", sort: "createdAt:asc" },
      tags: ["service-single-page"],
    }),
    strapiFetch("projects", {
      lang,
      params: {
        populate: "*",
        sort: "sortirniBroj:asc",
        "pagination[page]": "1",
        "pagination[pageSize]": "6",
      },
      tags: ["project"],
    }),
    strapiFetch("blogs", {
      lang,
      params: { populate: "*", "pagination[limit]": "3", sort: "createdAt:desc" },
      tags: ["blog"],
    }),
  ]);

  return (
    <>
      <JsonLd data={[organizationJsonLd(lang), websiteJsonLd(lang)]} />
      <HeroSection content={content} />
      <Services content={content} services={services || []} />
      <OurNumbers content={content} />
      <OurProjects content={content} id="about" filter="all" initialProjects={projects || []} />
      <Reviews content={content} />
      <MarketInsights blogs={blogs || []} />
      <Contact content={content} to={ROUTES.CONTACT} number={6} />
    </>
  );
}

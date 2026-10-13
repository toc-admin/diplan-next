import { notFound } from "next/navigation";
import { strapiFetch, strapiFindBySlug } from "../../../../lib/strapi";
import { buildMetadata } from "../../../../lib/seo";
import ServicesDetailsClient from "../../../../components/ServicesDetailsClient";

const DETAIL_PARAMS = {
  "populate[coverImage]": "true",
  "populate[serviceBenefits][populate]": "benefitImage",
  "populate[ourProcess]": "true",
  "populate[faq]": "true",
  "populate[serviceSingleSeo][populate]": "*",
};

async function getService(lang, slug) {
  return strapiFindBySlug("service-single-pages", slug, {
    lang,
    params: DETAIL_PARAMS,
  });
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const service = await getService(lang, slug);
  if (!service) return {};
  return buildMetadata({
    seo: service.serviceSingleSeo,
    lang,
    path: `/service/${slug}`,
    fallbackTitle: service.heroTitle,
    fallbackDescription: service.heroSubtitle,
    image: service.coverImage?.url,
  });
}

export default async function ServiceDetailsPage({ params }) {
  const { lang, slug } = await params;
  const service = await getService(lang, slug);
  if (!service) notFound();

  // Related projects for this service, server-rendered (T1).
  const projectParams = {
    populate: "*",
    sort: "sortirniBroj:asc",
    "pagination[page]": "1",
    "pagination[pageSize]": "6",
  };
  if (service.whichService) {
    projectParams["filters[whichService][$eq]"] = service.whichService;
  }
  const projects = await strapiFetch("projects", {
    lang,
    params: projectParams,
    tags: ["project"],
  });

  return <ServicesDetailsClient service={service} initialProjects={projects || []} />;
}

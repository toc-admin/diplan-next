import { strapiFetch } from "../../../lib/strapi";
import { buildMetadata } from "../../../lib/seo";
import ServicesPageClient from "../../../components/ServicesPageClient";

async function getContent(lang) {
  return strapiFetch("services-page", {
    lang,
    params: {
      "populate[service][populate]": "serviceImage",
      "populate[faq]": "true",
      "populate[servicesPageSeo][populate]": "*",
    },
    tags: ["services-page"],
  });
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const content = await getContent(lang);
  return buildMetadata({
    seo: content?.servicesPageSeo,
    lang,
    path: "/service",
    fallbackTitle: content?.heroTitle,
    fallbackDescription: content?.heroSubtitle,
  });
}

export default async function ServicesPage({ params }) {
  const { lang } = await params;
  const content = await getContent(lang);

  return <ServicesPageClient content={content} />;
}

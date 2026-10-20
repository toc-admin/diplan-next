import { strapiFetch, LOCALIZATIONS_PARAMS } from "../../../lib/strapi";
import { buildMetadata } from "../../../lib/seo";
import ServicesPageClient from "../../../components/ServicesPageClient";
import JsonLd from "../../../components/JsonLd";
import { breadcrumbJsonLd, crumbLabel } from "../../../lib/jsonLd";

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

// The CMS `slugOfService` card fields hold whatever slug an editor typed —
// on EN/DE pages often the Croatian (or an outdated) slug, which 404s.
// Translate each one into the real slug of this language using the service
// pages' own localization links; a longest-common-prefix pass catches stale
// values like "structural-engineering" → "structural-engineering-1".
async function resolveServiceLinks(content, lang) {
  if (!content?.service?.length) return content;

  const pages = await strapiFetch("service-single-pages", {
    lang,
    params: { "fields[0]": "slug", ...LOCALIZATIONS_PARAMS },
    tags: ["service-single-page"],
  });
  if (!pages?.length) return content;

  const toLocal = {};
  for (const page of pages) {
    toLocal[page.slug] = page.slug;
    for (const loc of page.localizations || []) toLocal[loc.slug] = page.slug;
  }

  const resolve = (raw) => {
    if (!raw || toLocal[raw]) return toLocal[raw] || raw;
    let best = raw;
    let bestLen = 4; // require a meaningful shared prefix
    for (const [known, local] of Object.entries(toLocal)) {
      let i = 0;
      while (i < known.length && i < raw.length && known[i] === raw[i]) i++;
      if (i > bestLen) {
        bestLen = i;
        best = local;
      }
    }
    return best;
  };

  return {
    ...content,
    service: content.service.map((item) => ({
      ...item,
      slugOfService: resolve(item.slugOfService),
    })),
  };
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
  const content = await resolveServiceLinks(await getContent(lang), lang);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(lang, [{ name: crumbLabel("service", lang), path: "/service" }])} />
      <ServicesPageClient content={content} />
    </>
  );
}

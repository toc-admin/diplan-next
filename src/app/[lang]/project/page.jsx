import ProjectsPageClient from "../../../components/ProjectsPageClient";
import Contact from "../../../sections/Contact";
import { ROUTES } from "../../../config/routes";
import { strapiFetch, STRAPI_URL } from "../../../lib/strapi";
import { strapiLocale } from "../../../lib/i18n";
import { buildMetadata } from "../../../lib/seo";
import JsonLd from "../../../components/JsonLd";
import { breadcrumbJsonLd, crumbLabel } from "../../../lib/jsonLd";

const PAGE_SIZE = 6;

async function getPageContent(lang) {
  return strapiFetch("projects-page", {
    lang,
    params: { populate: "*" },
    tags: ["projects-page"],
  });
}

// Local fetch that keeps Strapi's pagination meta (strapiFetch strips it).
async function getProjects(lang) {
  const url = new URL("/api/projects", STRAPI_URL);
  url.searchParams.set("locale", strapiLocale(lang));
  url.searchParams.set("populate", "*");
  url.searchParams.set("sort", "sortirniBroj:asc");
  url.searchParams.set("pagination[page]", "1");
  url.searchParams.set("pagination[pageSize]", String(PAGE_SIZE));

  const res = await fetch(url, { next: { tags: ["strapi", "project"] } });
  if (!res.ok) throw new Error(`Strapi request failed (${res.status}): /api/projects`);
  const json = await res.json();
  return { projects: json.data || [], pagination: json.meta?.pagination || null };
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const content = await getPageContent(lang);
  return buildMetadata({
    seo: content?.projectsSeo,
    lang,
    path: "/project",
    fallbackTitle: content?.heroTitle,
    fallbackDescription: content?.heroSubtitle,
  });
}

export default async function ProjectsPage({ params }) {
  const { lang } = await params;
  const [content, { projects, pagination }] = await Promise.all([
    getPageContent(lang),
    getProjects(lang),
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(lang, [{ name: crumbLabel("project", lang), path: "/project" }])} />
      <ProjectsPageClient
        content={content}
        initialProjects={projects}
        initialPagination={pagination}
        pageSize={PAGE_SIZE}
      />
      <Contact content={content} to={ROUTES.CONTACT} number={4} />
    </>
  );
}

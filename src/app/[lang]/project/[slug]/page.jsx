import { notFound } from "next/navigation";
import ProjectDetailsClient from "../../../../components/ProjectDetailsClient";
import Contact from "../../../../sections/Contact";
import { ROUTES } from "../../../../config/routes";
import { strapiFetch, strapiFindBySlug, localizedPaths } from "../../../../lib/strapi";
import { buildMetadata } from "../../../../lib/seo";
import JsonLd from "../../../../components/JsonLd";
import { creativeWorkJsonLd, breadcrumbJsonLd, crumbLabel } from "../../../../lib/jsonLd";

async function getProject(lang, slug) {
  return strapiFindBySlug("projects", slug, {
    lang,
    params: { populate: "*" },
  });
}

// Service page sharing the project's whichService, for the "more about this
// service" link (client report v4, item 7). Slug comes from Strapi, not code.
async function getRelatedService(lang, whichService) {
  if (!whichService) return null;
  try {
    const data = await strapiFetch("service-single-pages", {
      lang,
      params: {
        "filters[whichService][$eq]": whichService,
        "fields[0]": "slug",
        "fields[1]": "heroTitle",
      },
      tags: ["service-single-page"],
    });
    return data?.[0] || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const project = await getProject(lang, slug);
  if (!project) return {};

  return buildMetadata({
    seo: project.projectSeo,
    lang,
    path: `/project/${slug}`,
    fallbackTitle: project.title,
    fallbackDescription: project.excerpt,
    image: project.coverImage?.url,
    localizedPaths: localizedPaths(project, "project"),
  });
}

export default async function ProjectDetailsPage({ params }) {
  const { lang, slug } = await params;

  const [project, content] = await Promise.all([
    getProject(lang, slug),
    strapiFetch("projects-page", {
      lang,
      params: { populate: "*" },
      tags: ["projects-page"],
    }),
  ]);

  // Real 404 status for unknown slugs (SEO requirement T4)
  if (!project) notFound();

  const relatedService = await getRelatedService(lang, project.whichService);

  return (
    <>
      <JsonLd
        data={[
          creativeWorkJsonLd({ project, lang, path: `/project/${slug}` }),
          breadcrumbJsonLd(lang, [
            { name: crumbLabel("project", lang), path: "/project" },
            { name: project.title, path: `/project/${slug}` },
          ]),
        ]}
      />
      <ProjectDetailsClient project={project} relatedService={relatedService} />
      <Contact content={content} to={ROUTES.CONTACT} number={4} />
    </>
  );
}

"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import MixedTitleLong from "./MixedTitleLong";
import { useLocale } from "../config/localeContext";
import { STRAPI_URL } from "../lib/strapi";

// Initial projects arrive server-rendered via props (SEO requirement T1);
// the client only fetches again for filter changes and "load more".
const ProjectsPageClient = ({ content, initialProjects, initialPagination, pageSize }) => {
  const { locale } = useLocale();
  const [projects, setProjects] = useState(initialProjects);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPagination?.page || 1);
  const [hasMore, setHasMore] = useState(
    initialPagination ? initialPagination.page < initialPagination.pageCount : false
  );
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter categories based on the whichService field
  const filterCategories = [
    { key: "all", label: { "hr-HR": "Svi Projekti", en: "All Projects", "de-DE": "Alle Projekte" } },
    { key: "ARHITEKTURA", label: { "hr-HR": "Arhitektura", en: "Architecture", "de-DE": "Architektur" } },
    { key: "STATIKA", label: { "hr-HR": "Statika", en: "Structural Engineering", "de-DE": "Statik" } },
    { key: "ENERGETSKA", label: { "hr-HR": "Energetska Efikasnost", en: "Energy Efficiency", "de-DE": "Energieeffizienz" } },
    { key: "NADZOR", label: { "hr-HR": "Nadzor", en: "Supervision", "de-DE": "Überwachung" } },
  ];

  const fetchProjects = async (page = 1, filter = "all", append = false) => {
    let url = `${STRAPI_URL}/api/projects?locale=${locale}&populate=*&sort=sortirniBroj:asc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    if (filter !== "all") {
      url += `&filters[whichService][$eq]=${filter}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    const json = await res.json();
    const newProjects = json.data || [];
    const pagination = json.meta?.pagination;

    setProjects((prev) => (append ? [...prev, ...newProjects] : newProjects));
    if (pagination) setHasMore(pagination.page < pagination.pageCount);
  };

  const handleFilterChange = async (filterKey) => {
    setActiveFilter(filterKey);
    setCurrentPage(1);
    setLoading(true);
    try {
      await fetchProjects(1, filterKey, false);
    } catch (err) {
      console.error("Error changing filter:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProjects = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    try {
      await fetchProjects(nextPage, activeFilter, true);
      setCurrentPage(nextPage);
    } catch (err) {
      console.error("Error loading more projects:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return (
      <div className="px-11 pt-32 flex flex-col items-center justify-center bg-white min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-color"></div>
        <p className="mt-4 text-gray-600">
          {locale === "hr-HR" ? "Učitavanje projekata..." : locale === "en" ? "Loading projects..." : "Projekte laden..."}
        </p>
      </div>
    );
  }

  return (
    <div className="px-11 pt-32 flex flex-col items-center justify-center bg-white">
      <MixedTitleLong
        text={content?.heroTitle}
        stil={
          "font-bold text-brand-color text-[35px] sm:text-[43px] md:text-[51px] lg:text-[54px] xl:text-[57px] 2xl:text-[60px] text-center uppercase max-w-[1020px] leading-tight mt-16"
        }
      />
      <p className="font-medium text-[16px] sm:text-[18px] md:text-[19px] lg:text-[19px] xl:text-[20px] 2xl:text-[20px] text-gray-600 text-center max-w-[1000px] pt-8 pb-16 leading-relaxed tracking-wider">
        {content?.heroSubtitle}
      </p>

      {/* Filter Controls */}
      <div className="w-full mb-16">
        <div className="flex flex-wrap justify-start gap-4 mb-8">
          {filterCategories.map((category) => (
            <button
              key={category.key}
              onClick={() => handleFilterChange(category.key)}
              className={`px-6 py-2 text-sm font-medium uppercase rounded-full tracking-wider transition-all duration-300 border-2 ${
                activeFilter === category.key
                  ? "bg-cta-color text-white border-cta-color"
                  : "bg-transparent text-brand-color border-cta-color hover:bg-cta-color hover:text-white"
              }`}
            >
              {category.label[locale]}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-11 pb-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={`${project.id}-${index}`}
              image={project.coverImage?.url}
              name={project.title}
              location={project.location}
              shortDescription={project.excerpt}
              id={project.id}
              slug={project.slug}
              content={content}
            />
          ))}
        </div>
      ) : (
        <div className="pb-32 text-center">
          <p className="text-gray-600 text-lg">
            {locale === "hr-HR"
              ? "Nema projekata za odabrani filter."
              : locale === "en"
              ? "No projects found for the selected filter."
              : "Keine Projekte für den ausgewählten Filter gefunden."}
          </p>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="pb-32 flex flex-col items-center">
          <button
            onClick={loadMoreProjects}
            disabled={loadingMore}
            className="px-8 py-4 bg-cta-color text-white rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingMore ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {locale === "hr-HR" ? "Učitavanje..." : locale === "en" ? "Loading..." : "Laden..."}
              </span>
            ) : locale === "hr-HR" ? (
              "Prikaži više projekata"
            ) : locale === "en" ? (
              "Show more projects"
            ) : (
              "Weitere Projekte anzeigen"
            )}
          </button>

          <p className="text-gray-600 text-sm mt-4">
            {locale === "hr-HR"
              ? `Prikazano ${projects.length} projekata`
              : locale === "en"
              ? `Showing ${projects.length} projects`
              : `${projects.length} Projekte angezeigt`}
          </p>
        </div>
      )}

      {/* Show message when no more projects */}
      {!hasMore && projects.length > 0 && (
        <div className="pb-32 pt-6 text-center">
          <p className="text-gray-600 text-lg">
            {locale === "hr-HR"
              ? "Pogledali ste sve projekte!"
              : locale === "en"
              ? "You've seen all projects!"
              : "Sie haben alle Projekte gesehen!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectsPageClient;

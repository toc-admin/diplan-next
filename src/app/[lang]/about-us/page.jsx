import AboutPageClient from "../../../components/AboutPageClient";
import Contact from "../../../sections/Contact";
import { strapiFetch, STRAPI_URL } from "../../../lib/strapi";
import { buildMetadata } from "../../../lib/seo";
import JsonLd from "../../../components/JsonLd";
import { breadcrumbJsonLd, crumbLabel } from "../../../lib/jsonLd";

async function getAbout(lang) {
  return strapiFetch("about", { lang, params: { populate: "*" }, tags: ["about"] });
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const content = await getAbout(lang);
  return buildMetadata({
    seo: content?.aboutSeo,
    lang,
    path: "/about-us",
    fallbackTitle: "O nama | DI plan",
    fallbackDescription: content?.heroSubtitle,
  });
}

function memberImageUrl(memberImage) {
  if (!memberImage) return null;
  // Original, not a Strapi format: next/image resizes per device from the source
  const url = memberImage.url;
  return url?.startsWith("/") ? `${STRAPI_URL}${url}` : url;
}

function isPlaceholder(member) {
  return (
    !member.memberImage ||
    member.memberImage.name?.toLowerCase().includes("bez slike") ||
    member.memberImage.url?.toLowerCase().includes("bez_slike")
  );
}

export default async function AboutPage({ params }) {
  const { lang } = await params;

  const [content, teamRaw] = await Promise.all([
    getAbout(lang),
    strapiFetch("team-members", {
      lang,
      params: { populate: "*", "pagination[pageSize]": "100" },
      tags: ["team-member"],
    }),
  ]);

  // Members with real photos first, placeholders last (same rule as before).
  const team = (teamRaw || [])
    .sort((a, b) => {
      const aPlaceholder = isPlaceholder(a);
      const bPlaceholder = isPlaceholder(b);
      if (!aPlaceholder && bPlaceholder) return -1;
      if (aPlaceholder && !bPlaceholder) return 1;
      return 0;
    })
    .map((member) => ({ ...member, imageUrl: memberImageUrl(member.memberImage) }));

  const images = content?.images?.map((img) => img.url) || [];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(lang, [{ name: crumbLabel("about-us", lang), path: "/about-us" }])} />
      <AboutPageClient content={content} team={team} images={images} />
      <Contact content={content} to={"https://dominvest-grupa.hr/karijera/"} number={5} />
    </>
  );
}

import { strapiFetch } from "../../lib/strapi";
import { SITE_URL } from "../../lib/i18n";

// llms.txt: a concise, markdown-formatted map of the site for AI agents
// (https://llmstxt.org). Generated from Strapi so it stays current; cached
// under the same "strapi" tag as the pages and revalidated by the webhook.
export const revalidate = 3600;

export async function GET() {
  const [services, projects, blogs] = await Promise.all([
    strapiFetch("service-single-pages", {
      lang: "hr",
      params: { "fields[0]": "slug", "fields[1]": "heroTitle", sort: "createdAt:asc" },
      tags: ["service-single-page"],
    }).catch(() => []),
    strapiFetch("projects", {
      lang: "hr",
      params: { "fields[0]": "slug", "fields[1]": "title", "fields[2]": "excerpt", sort: "sortirniBroj:asc", "pagination[pageSize]": "100" },
      tags: ["project"],
    }).catch(() => []),
    strapiFetch("blogs", {
      lang: "hr",
      params: { "fields[0]": "slug", "fields[1]": "Title", sort: "createdAt:desc", "pagination[pageSize]": "20" },
      tags: ["blog"],
    }).catch(() => []),
  ]);

  const lines = [
    "# DI plan",
    "",
    "> DI plan d.o.o. je multidisciplinarni inženjersko-arhitektonski ured iz Zagreba (dio DOMinvest grupe). Objedinjuje arhitektonsko projektiranje, statiku i inženjerstvo, stručni nadzor i energetska rješenja — od idejnog rješenja do realizacije. Radi na području cijele Hrvatske.",
    "",
    "Stranica je dostupna na hrvatskom (zadano), engleskom (/en) i njemačkom (/de).",
    `Kontakt: upiti@di-plan.hr · Zagrebačka cesta 143A, Zagreb · ${SITE_URL}/contact`,
    "",
    "## Glavne stranice",
    "",
    `- [Naslovna](${SITE_URL}/): pregled ureda, usluga i istaknutih projekata`,
    `- [O nama](${SITE_URL}/about-us): tim, pristup radu i vrijednosti`,
    `- [Usluge](${SITE_URL}/service): pregled svih usluga`,
    `- [Projekti](${SITE_URL}/project): realizirani i aktualni projekti`,
    `- [Novosti](${SITE_URL}/news): članci i obavijesti`,
    `- [Kontakt](${SITE_URL}/contact): upiti i kontakt forma`,
    "",
    "## Usluge",
    "",
    ...(services || []).map((s) => `- [${s.heroTitle}](${SITE_URL}/service/${s.slug})`),
    "",
    "## Projekti",
    "",
    ...(projects || []).map((p) => `- [${p.title}](${SITE_URL}/project/${p.slug})${p.excerpt ? `: ${p.excerpt.slice(0, 120)}` : ""}`),
    "",
    "## Novosti",
    "",
    ...(blogs || []).map((b) => `- [${b.Title}](${SITE_URL}/news/${b.slug})`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

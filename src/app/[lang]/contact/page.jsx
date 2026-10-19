import ContactPageClient from "../../../components/ContactPageClient";
import Contact from "../../../sections/Contact";
import { strapiFetch } from "../../../lib/strapi";
import { buildMetadata } from "../../../lib/seo";
import JsonLd from "../../../components/JsonLd";
import {
  organizationJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  crumbLabel,
} from "../../../lib/jsonLd";

async function getContact(lang) {
  return strapiFetch("contact", { lang, params: { populate: "*" }, tags: ["contact"] });
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const content = await getContact(lang);
  return buildMetadata({
    seo: content?.contactSeo,
    lang,
    path: "/contact",
    fallbackTitle: "Kontakt | DI plan",
    fallbackDescription: content?.heroSubtitle,
  });
}

export default async function ContactPage({ params }) {
  const { lang } = await params;
  const content = await getContact(lang);

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(lang),
          breadcrumbJsonLd(lang, [{ name: crumbLabel("contact", lang), path: "/contact" }]),
          faqJsonLd(content?.contactFaq),
        ]}
      />
      <ContactPageClient content={content} />
      <Contact content={content} to="#contact-form" number={4} />
    </>
  );
}

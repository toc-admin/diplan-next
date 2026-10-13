import ContactPageClient from "../../../components/ContactPageClient";
import Contact from "../../../sections/Contact";
import { strapiFetch } from "../../../lib/strapi";
import { buildMetadata } from "../../../lib/seo";

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
      <ContactPageClient content={content} />
      <Contact content={content} to="#contact-form" number={4} />
    </>
  );
}

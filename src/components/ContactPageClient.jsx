"use client";

import { motion } from "framer-motion";
import heroImg from "../assets/images/contactImage.webp";
import ContactForm from "./ContactForm";
import FaqComponent from "./FaqComponent";

// Markup preserved 1:1 from the old ContactPage; content arrives server-fetched.
const ContactPageClient = ({ content }) => {
  return (
    <>
      <motion.div className="relative flex lg:flex-row flex-col lg:items-start items-center justify-between gap-12 sm:gap-14 md:gap-24 lg:gap-24 xl:gap-32 2xl:gap-56 px-4 sm:px-8 md:px-16 lg:px-8 xl:px-20 2xl:px-44 h-auto md:py-56 py-32">
        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 rounded-b-[40px] sm:rounded-b-[50px] md:rounded-b-[60px] lg:rounded-b-[70px] xl:rounded-b-[80px]"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 90%),
                            linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%),
                            url(${heroImg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="flex flex-col gap-6 z-50">
          <h1 className="text-white font-semibold text-5xl sm:text-8xl md:text-8xl lg:text-8xl xl:text-8xl 2xl:text-8xl uppercase">
            {content?.heroTitle}
          </h1>
          <p className="text-white font-medium text-xl max-w-[480px]">{content?.heroSubtitle}</p>
          <a
            href="mailto:upiti@di-plan.hr"
            className="text-white font-medium text-xl max-w-[480px] underline"
          >
            upiti@di-plan.hr
          </a>
        </div>
        <div id="contact-form" className="bg-card-bg rounded-[40px] p-12 z-50">
          <ContactForm />
        </div>
      </motion.div>
      <div className="bg-white py-44">
        <FaqComponent title={content?.faqTitle} faqs={content?.contactFaq} />
      </div>
    </>
  );
};

export default ContactPageClient;

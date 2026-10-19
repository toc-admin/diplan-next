"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useLocale } from "../config/localeContext";
import { STRAPI_URL } from "../lib/strapi";
import MixedTitleLong from "./MixedTitleLong";
import { motion } from "framer-motion";

// The HTTP response is already a real 404 (T4); the decorative CMS content
// for this page loads client-side like it did before.
const NotFoundClient = () => {
  const { locale } = useLocale();
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(
          `${STRAPI_URL}/api/not-found?locale=${locale}&populate=*`
        );
        const json = await res.json();
        setContent(json.data);
      } catch (err) {
        console.error("Error fetching not-found page:", err);
      }
    };

    fetchContent();
  }, [locale]);

  return (
    <motion.div className="relative flex flex-col items-center justify-start md:px-12 px-6 h-screen md:py-44 py-32">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0 rounded-b-[80px] overflow-hidden"
        style={{ backgroundColor: "#0A3264" }}
      >
        {content?.coverImage?.url && (
          <Image
            src={content.coverImage.url}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 90%),
                            linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%)`,
          }}
        />
      </motion.div>

      {/* H1 Animation & Subtext */}
      <div className="relative z-10 flex flex-col md:gap-8 gap-4 items-start justify-end h-full md:mt-0 mt-32 w-full">
        <MixedTitleLong
          text={content?.heroTitle}
          stil={
            "font-bold md:text-[50px] text-[32px] text-left uppercase max-w-[900px] leading-tight text-white"
          }
        />
        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
          className="md:text-xl text-sm text-center text-white font-medium tracking-wider md:leading-7 leading-5 max-w-[600px]"
        >
          {content?.heroSubtitle}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default NotFoundClient;

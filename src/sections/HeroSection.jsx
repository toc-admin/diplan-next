import { motion } from "framer-motion";
import heroImg from "../assets/images/hero-image.webp";
import Button from "../components/Button";
import { ROUTES } from "../config/routes";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

const containerVars = {
  initial: {
    transition: {
      staggerChildren: 0.09,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.09,
      staggerDirection: 1,
    },
  },
};

const h1Vars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 1,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 1.2,
    },
  },
};

const HeroSection = ({ id, content }) => {
  // split heroMainText by new lines, fallback to default
  const h1Rows = content?.heroMainText
    ? content.heroMainText.split("\n")
    : ["MULTIDISCIPLINARNI", "PRISTUP", "REALNA RJEŠENJA."];

  return (
    <motion.div
      id={id}
      className="relative flex flex-col items-center justify-start px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 gap-64 sm:gap-64 md:gap-64 lg:gap-64 py-12 sm:py-16 md:py-24 lg:py-32 xl:py-56"
    >
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 70%), 
                            linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%), 
                            url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute bottom-0 left-0 w-full h-[60px] sm:h-[70px] md:h-[80px] lg:h-[90px] xl:h-[101px] bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] lg:rounded-t-[70px] xl:rounded-t-[80px] z-20 transform translate-y-0.5" />
      
      {/* H1 Animation & Subtext */}
      <div className="relative z-10 flex flex-col gap-4 sm:gap-6 md:gap-8 items-center justify-start h-full mt-32 sm:mt-32 md:mt-32 lg:mt-32 xl:mt-0">
        <motion.div
          variants={containerVars}
          initial="initial"
          animate="open"
          exit="initial"
          className="flex flex-col"
        >
          {h1Rows.map((row, index) => (
            <div key={index} className="overflow-hidden">
              <motion.div
                variants={h1Vars}
                className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-[100px] uppercase font-black leading-none text-white text-center whitespace-pre-wrap"
              >
                {row.split(" ").map((word, i) => (
                  <span key={i}>
                    <span className={i === 2 ? "italic font-normal" : ""}>
                      {word}
                    </span>
                    {i === 0 || i === 1 ? <br /> : i < row.split(" ").length - 1 ? " " : ""}
                  </span>
                ))}
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-center text-white font-semibold tracking-wider leading-5 sm:leading-6 md:leading-7 max-w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] px-2"
        >
          {content?.heroSubText}
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-2 sm:mt-4"
        >
          <Button to={ROUTES.CONTACT} text={content?.heroCtaText} />
        </motion.div>
      </div>

      {/* Additional section */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-32 w-full pb-16 sm:pb-20 md:pb-24 lg:pb-32 xl:pb-0 px-2 sm:px-4 max-w-[1400px]">
        <div className="flex flex-col items-start justify-start gap-6 sm:gap-8 md:gap-12 lg:gap-16 w-full lg:w-auto">
          <h2 className="font-medium text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px] 2xl:text-[60px] text-white max-w-full lg:max-w-[500px] leading-snug tracking-wide text-left">
            {content?.secondaryHeroTitle}
          </h2>
          <div className="w-full flex justify-start">
            <Link to={ROUTES.ABOUT_US}>
            <button className="learn-more">
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">{content?.secondaryHeroCta}</span>
            </button>
            </Link>
          </div>
        </div>
        <p
          className="text-white font-semibold text-sm sm:text-md md:text-base lg:text-2xl max-w-full sm:max-w-[600px] md:max-w-[700px] lg:max-w-[810px] leading-relaxed text-left"
          dangerouslySetInnerHTML={{
            __html: content?.secondaryHeroText.replace(/\n/g, "<br />"),
          }}
        />
      </div>
    </motion.div>
  );
};

export default HeroSection;
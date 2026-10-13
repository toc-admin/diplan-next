import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/mousewheel";
import { ROUTES } from "../config/routes";
import { useLocale } from "../config/localeContext";
import MixedTitle from "../components/MixedTitle";
import axios from "axios";
import { useState, useEffect } from "react";
import constantsExport from "../config/constants";
import { Link } from "react-router-dom";

const API_PATH = constantsExport.API_PATH;
const IMG_PATH = constantsExport.IMG_PATH;

const OurProjects = ({ id, content, filter }) => {
  const { locale } = useLocale();
  const [projects, setProjects] = useState(null);
  const [filterica, setFilterica] = useState(filter);
  const [loading, setLoading] = useState(true);

  // Update filterica when filter prop changes
  useEffect(() => {
    setFilterica(filter);
  }, [filter]);

  useEffect(() => {
    const fetchProjects = async (page = 1, append = false) => {
      try {
        let url = `${API_PATH}/api/projects?locale=${locale}&populate=*&sort=sortirniBroj:asc&pagination[page]=${page}&pagination[pageSize]=6`;
        
        // Add filter to API call if not 'all'
        if (filterica !== 'all') {
          url += `&filters[whichService][$eq]=${filterica}`;
        }
        
        const res = await axios.get(url);
        const newProjects = res.data.data;
        
        if (append) {
          // Append to existing projects (load more)
          setProjects(prevProjects => [...prevProjects, ...newProjects]);
        } else {
          // Replace projects (new filter or initial load)
          setProjects(newProjects);
        }
        
      } catch (err) {
        console.error("Error fetching projects:", err);
        throw err;
      }
    };

    fetchProjects();
  }, [locale, filterica]);

  return (
    <div className="flex items-center justify-center">
    <div className="flex flex-col gap-3 sm:gap-4 items-center justify-center pb-16 sm:pb-20 md:pb-24 lg:pb-32 max-w-[1750px] bg-white w-full">
      {/* Header Section */}
      {projects && projects.length > 0 ? <div className="border-1 border-brand-color rounded-full px-4 sm:px-6 py-1 sm:py-2">
        <h3 className="text-sm sm:text-base text-brand-color">
          {locale === "hr-HR"
            ? "Naši Projekti"
            : locale === "en"
            ? "Our Projects"
            : "Unsere Projekte"}
        </h3>
      </div> : null}
      
      {projects && projects.length > 0 ? <MixedTitle
        number={1} 
        text={content?.projectsTitle} 
        stil={"font-bold text-[35px] sm:text-[48px] md:text-[48px] lg:text-[48px] xl:text-[57px] 2xl:text-[60px] text-center leading-tight text-brand-color"} 
      /> : null}
      
      {projects && projects.length > 0 ? <p className="font-medium text-sm sm:text-base md:text-lg lg:text-xl text-center pretty tracking-wide leading-5 sm:leading-6 md:leading-7 max-w-[90%] sm:max-w-[550px] md:max-w-[650px] text-brand-color px-2">
        {content?.projectsSubtitle}
      </p> : null}

      {/* Swiper Container */}
      <div className="w-full pl-4 sm:pl-6 md:pl-12 lg:pl-24 xl:pl-44 pt-8 sm:pt-10 md:pt-12">
        <Swiper
          speed={500}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1.1}
          spaceBetween={12}
          navigation={{
            enabled: typeof window !== 'undefined' && window.innerWidth >= 768
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true
          }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            480: {
              slidesPerView: 1.1,
              spaceBetween: 12,
            },
            640: {
              slidesPerView: 1.2,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 1.3,
              spaceBetween: 32,
            },
            1024: {
              slidesPerView: 1.3,
              spaceBetween: 48,
            },
            1280: {
              slidesPerView: 1.3,
              spaceBetween: 64,
            }
          }}
        >
          {projects?.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[750px] rounded-lg sm:rounded-xl overflow-hidden shadow-lg group">
                <Link to={`/project/${project.slug}`} state={{ content: content }}>
                  <img
                    src={project.coverImage.url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-text/100 via-dark-text/50 to-transparent p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col justify-end h-full">
                    <h3 className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl max-w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-wide max-w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] pt-2 sm:pt-3 md:pt-4 leading-relaxed">
                      {project.excerpt}
                    </p>
                    <p className="text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2">
                      {project.location}
                    </p>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
    </div>
  );
};

export default OurProjects;
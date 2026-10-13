import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import rev from "../assets/images/revs.png";
import MixedTitle from "../components/MixedTitle";

const Reviews = ({ id, content }) => {
  return (
    <div className="flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44">
      <div
        className="py-8 sm:py-12 md:py-16 flex flex-col xl:flex-row items-start justify-between w-full max-w-[1400px] bg-white gap-8 xl:gap-12"
        id={id}
      >
        {/* Left Section */}
        <div className="flex flex-col items-start justify-start gap-3 sm:gap-4 w-full xl:w-auto xl:max-w-[400px]">
          <MixedTitle
            number={2} 
            text={content?.revTitle} 
            stil={"text-brand-color text-[45px] sm:text-[48px] md:text-[51px] lg:text-[54px] xl:text-[57px] 2xl:text-[60px] font-semibold max-w-full xl:max-w-[300px] leading-tight"} 
          />
          <p className="text-brand-color text-base sm:text-lg md:text-xl lg:text-2xl max-w-full xl:max-w-[400px] leading-7 sm:leading-8 md:leading-9 tracking-wide">
            {content?.revSubtitle}
          </p>
          <p className="text-brand-color text-sm sm:text-base md:text-lg max-w-full xl:max-w-[400px] leading-7 sm:leading-8 md:leading-9 tracking-wide">
            {content?.revNumOfUsers}
          </p>
          <img src={rev} className="w-auto h-auto max-w-[200px] sm:max-w-[250px] md:max-w-full" alt="Reviews" />
          <p className="text-light-text text-xs sm:text-sm max-w-full xl:max-w-[400px] leading-6 sm:leading-7 md:leading-9 tracking-wide -mt-2 sm:-mt-3 md:-mt-4">
            Based on 146 reviews
          </p>
        </div>

        {/* Right Section - Reviews Slider */}
        <div className="flex items-end justify-center w-full xl:w-1/2 relative">
          <div className="w-full">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={{
                enabled: true,
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              pagination={{ 
                clickable: true,
                dynamicBullets: true
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 32,
                },
                1280: {
                  slidesPerView: 1,
                  spaceBetween: 32,
                }
              }}
              className="reviews-swiper"
            >
              {content?.reviewZone?.map((review, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-card-bg rounded-[15px] sm:rounded-[20px] min-h-[280px] h-[450px] p-4 sm:p-6 md:p-8 flex flex-col items-start justify-between gap-6">
                    <p className="text-brand-color font-bold text-sm sm:text-base md:text-lg leading-relaxed flex-1">
                      {review.reviewText}
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 bg-brand-color rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {review.name?.charAt(0) || "?"}
                      </div>
                      <div className="flex flex-col">
                        <p className="text-brand-color font-bold text-sm sm:text-base md:text-lg">
                          {review.name}
                        </p>
                        {review.position && (
                          <p className="text-light-text font-normal text-xs sm:text-sm md:text-base tracking-wide">
                            {review.position}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation */}
            <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-brand-color hover:bg-brand-color hover:text-white transition-all duration-300 group">
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-brand-color hover:bg-brand-color hover:text-white transition-all duration-300 group">
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .reviews-swiper .swiper-pagination {
          position: relative;
          margin-top: 2rem;
        }
        
        .reviews-swiper .swiper-pagination-bullet {
          background-color: var(--brand-color);
          opacity: 0.3;
        }
        
        .reviews-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Reviews;
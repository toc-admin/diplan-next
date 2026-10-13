"use client";

import Link from "./LocalizedLink";

const BlogPost = (props) => {
  const handleClick = () => {
    // You can implement navigation logic here
    console.log(`Navigate to /news/${props.slug}`);
  };

  return (
    <div className="flex flex-col gap-4 items-start justify-start">
      <Link to={`/news/${props.slug}`}>
      <div onClick={handleClick} className="relative group cursor-pointer">
        <div className="relative overflow-hidden rounded-[40px] aspect-4/5 max-h-[500px]">
          <img
            alt={props.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={props.image}
          />

          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-text via-dark-text/70 to-transparent"></div>

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            {/* Title */}
            <h1 className="font-bold text-white text-xl mb-2 leading-tight">
              {props.name || "Desgin In The Age Of AI: How to adapt lazily."}
            </h1>

            {/* Description */}
            <p className="text-sm text-gray-200 mb-4 line-clamp-2">
              {props.shortDescription}
            </p>

          </div>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default BlogPost;
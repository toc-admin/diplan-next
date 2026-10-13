import Button from "../components/Button";
import BlogPost from "../components/BlogPost";
import { ROUTES } from "../config/routes";
import axios from "axios";
import { useState, useEffect } from "react";
import constantsExport from "../config/constants";
import { useLocale } from "../config/localeContext";

const API_PATH = constantsExport.API_PATH;

const MarketInsights = () => {
  const { locale } = useLocale();
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(
          `${API_PATH}/api/blogs?locale=${locale}&populate=*&pagination[limit]=3&sort=createdAt:desc`
        );
        setBlogs(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      }
    };

    fetchContent();
  }, [locale]);

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44">
      <div className="w-full max-w-[1400px] bg-white py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogs?.map((blog, index) => (
            <BlogPost
              key={blog.id || index}
              image={blog.coverImage.url}
              name={blog.Title}
              shortDescription={blog.excerpt}
              id={blog.id}
              slug={blog.slug}
              author={blog.authorName}
              date={blog.dateOfChoice}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;
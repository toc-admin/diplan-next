import { Link } from "react-router-dom";

const ProjectCard = (props) => {
  return (
    <Link to={`/project/${props.slug}`} state={{ content: props.content }}>
      <div className="relative w-full h-[450px] rounded-xl overflow-hidden shadow-lg group">
        <img
          src={props.image}
          alt={props.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-text/100 via-dark-text/50 to-transparent p-8 flex flex-col justify-end h-full">
          <h3 className="text-white font-bold text-[26px] sm:text-[28px] md:text-[30px] lg:text-[32px] xl:text-[34px] 2xl:text-[36px] max-w-[800px]">
            {props.name}
          </h3>
          <p className="text-white/90 text-[16px] sm:text-[16px] md:text-[17px] lg:text-[17px] xl:text-[18px] 2xl:text-[18px] tracking-wide font-medium max-w-[800px] pt-4">
            {props.shortDescription}
          </p>
          <p className="text-gray-300 text-xs mt-1">{props.location}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;

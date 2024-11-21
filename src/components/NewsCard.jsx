import React from "react";
import { Link } from "react-router-dom";
import { getImgUrl } from "../utils/getImage";

const NewsCard = ({ props: { id, title, image, description } }) => {
  return (
    <div className=" rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4">
        <div>
          <Link to={`/news/${id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {title?.length > 30 ? `${title?.slice(0, 30)}...` : title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {description?.length > 100
              ? `${description?.slice(0, 100)}...`
              : description}
          </p>
        </div>
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
          <Link to={`/news/${id}`}>
            <img
              src={image}
              alt={title}
              className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;

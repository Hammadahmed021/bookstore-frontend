import React from "react";
import { useFetchAllCategoriesQuery } from "../store/features/categories/categoryApi";
import { getImgUrl } from "../utils/getImage";
import { Link } from "react-router-dom";

const Categories = () => {
  const { data: categories } = useFetchAllCategoriesQuery();

  return (
    <>
      <div className="py-16">
        <h2 className="text-3xl font-semibold mb-6">All Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
  {categories?.data?.map((item) => (
    <div className="group relative p-2 rounded-lg shadow-lg border hover:shadow-2xl transition-all duration-300 bg-white overflow-hidden transform hover:scale-105">
      <img
        className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity duration-300"
        src={getImgUrl(item?.image)}
        alt={item?.title}
      />
      <div className="p-4">
        <Link to={`/category/${item?._id}`}>
          <h4 className="font-semibold text-xl text-gray-800 hover:text-blue-500 transition-colors duration-200">
            {item?.title}
          </h4>
        </Link>
      </div>
    </div>
  ))}
</div>

      </div>
    </>
  );
};

export default Categories;

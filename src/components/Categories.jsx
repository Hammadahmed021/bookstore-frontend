import React from "react";
import { useFetchAllCategoriesQuery } from "../store/features/categories/categoryApi";
import { getImgUrl } from "../utils/getImage";
import { Link } from "react-router-dom";

const Categories = () => {
  const { data: categories } = useFetchAllCategoriesQuery();

  return (
    <>
      <div className="py-10">
        <h2 className="text-3xl font-semibold mb-6">All Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories?.data?.map((item) => (
            <div className="p-2 rounded-lg shadow-lg border hover:shadow-xl transition-shadow duration-300 bg-white">
            <img
              className="w-full h-32 object-cover rounded-t-lg"
              src={getImgUrl(item?.image)}
              alt={item?.title}
            />
            <div className="p-2">
              <Link to={`/category/${item?._id}`}>
                <h4 className="font-semibold text-lg text-gray-800 hover:text-blue-500 transition-colors">
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

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
            <div className="p-2 rounded-lg shadow-lg border">
              <img
                className="w-full h-32 object-contain"
                src={getImgUrl(item?.image)}
                alt={item?.title}
              />
              <Link to={`/category/${item?._id}`}>
              <h4 className="my-4 font-semibold text-xl">{item?.title}</h4>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;

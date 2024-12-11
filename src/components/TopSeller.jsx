import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import SwiperComponent from "./SwiperComponent";
import { useFetchAllBooksQuery } from "../store/features/books/booksApi";
import { useFetchAllCategoriesQuery } from "../store/features/categories/categoryApi";

const TopSeller = () => {
  const [selectCategory, setSelectCategory] = useState("Choose a genre");

  const { data: books = [] } = useFetchAllBooksQuery();
    const { data: categories } = useFetchAllCategoriesQuery();


    const filterBooks =
    selectCategory === "Choose a genre"
      ? books
      : books.filter((item) => {
          const selectedCategory = categories?.data?.find(
            (category) => category.title === selectCategory
          );
          return item.category === selectedCategory?._id;
        });
      
  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">TopSeller</h2>
      {/* category filter */}
      <select
        onChange={(e) => setSelectCategory(e.target.value)}
        name="category"
        id="category"
        className="bg-gray-100 rounded-md outline-none p-1 mb-10"
      >
        {categories?.data?.map((category) => (
          <option key={category?._id} value={category.title}>
            {category.title}
          </option>
        ))}
      </select>

      <SwiperComponent
        data={filterBooks}
        renderSlide={(book) => <BookCard props={book} />}
      />
    </div>
  );
};

export default TopSeller;

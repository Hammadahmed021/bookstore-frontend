import React, { useEffect, useState } from "react";
import { booksData } from "../utils/localDB";
import BookCard from "./BookCard";
import SwiperComponent from "./SwiperComponent";
import { useFetchAllBooksQuery } from "../store/features/books/booksApi";

const TopSeller = () => {
  // const [books, setBooks] = useState(null);
  const [selectCategory, setSelectCategory] = useState("Choose a genre");
  // useEffect(() => {
  //   setBooks(booksData);
  // }, []);
  const { data: books = [] } = useFetchAllBooksQuery()
  
  const categoryOptions = [
    "Choose a genre",
    "Business",
    "Fiction",
    "Horror",
    "Adventure",
  ];
  const filterBooks =
    selectCategory === "Choose a genre"
      ? books
      : books.filter((item) => item.category === selectCategory.toLowerCase());

      console.log(books, 'books');
      

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
        {categoryOptions?.map((category, index) => (
          <option key={index} value={category}>
            {category}
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

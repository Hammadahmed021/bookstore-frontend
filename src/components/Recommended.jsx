import React, { useEffect, useState } from "react";
import { booksData } from "../utils/localDB";
import BookCard from "./BookCard";
import SwiperComponent from "./SwiperComponent";
import { useFetchAllBooksQuery } from "../store/features/books/booksApi";

const Recommended = () => {
  const [books, setBooks] = useState(null);
  const { data = [] } = useFetchAllBooksQuery()
  useEffect(() => {
    if (data.length > 0) {
      const filterBooks = data.filter((item) => item.trending);
      setBooks(filterBooks)
    }
  }, [data]);
  console.log(books, 'books');


  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Recommended for you </h2>
      {/* category filter */}

      <SwiperComponent
        data={books}
        renderSlide={(book) => <BookCard props={book} />}
      />
    </div>
  );
};

export default Recommended;

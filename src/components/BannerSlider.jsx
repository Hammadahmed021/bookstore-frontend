import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import book1 from '../assets/books/book-1.png';
import book2 from '../assets/books/book-2.png';
import book3 from '../assets/books/book-3.png';
import book4 from '../assets/books/book-4.png';

const FancySlider = () => {
  const books = [
    {
      id: 1,
      title: "I Want a Better Catastrophe",
      image: book1,
    },
    {
      id: 2,
      title: "Mentor Sponsor",
      image: book2,
    },
    {
      id: 3,
      title: "Time to Come",
      image: book3,
    },
    {
      id: 4,
      title: "Another Book",
      image: book4,
    },
  ];

  return (
    <div className="w-full h-[400px] flex justify-center items-center">
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 1000, // Adjusted delay for smoother transition (2 seconds)
          disableOnInteraction: false,
        }}
    
        speed={1000} // Adjusted speed for smoother transition
        modules={[Autoplay]}
        className="w-full h-full"
      >
        {books.map((book, index) => (
          <SwiperSlide
            key={book.id}
            className="group relative flex justify-center items-center p-2 border rounded-lg"
          >
            <img
              src={book.image}
              alt={book.title}
              className={`transform transition-all duration-500`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FancySlider;

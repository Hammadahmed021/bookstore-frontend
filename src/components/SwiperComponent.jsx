import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SwiperComponent = ({ data = [], renderSlide }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      navigation={true}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 50,
        },
        1180: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {data?.length > 0 ? (
        data.map((item, index) => (
          <SwiperSlide key={index}>{renderSlide(item, index)}</SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <div className="text-start text-gray-500">No items to display</div>
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default SwiperComponent;

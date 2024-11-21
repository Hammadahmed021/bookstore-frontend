import React, { useEffect, useState } from "react";
import SwiperComponent from "./SwiperComponent";
import NewsCard from "./NewsCard";
import { newsData } from "../utils/localDB";

const News = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    setNews(newsData);
  }, []);

  return (
    <div className="py-10 mb-10">
      <h2 className="text-3xl font-semibold mb-6">News</h2>

      <SwiperComponent
        data={news}
        renderSlide={(book) => <NewsCard props={book} />}
      />
    </div>
  );
};

export default News;

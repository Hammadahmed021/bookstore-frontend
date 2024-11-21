import React from "react";
import { Banner, News, Recommended, TopSeller } from "../components";

const Home = () => {
  return (
    <>
    <Banner />
    <TopSeller />
    <Recommended />
    <News />
    </>
  );
};

export default Home;

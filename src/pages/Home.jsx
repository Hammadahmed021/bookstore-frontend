import React from "react";
import { Banner, News, Recommended, TopSeller, Categories  } from "../components";

const Home = () => {
  return (
    <>
    <Banner />
    <TopSeller />
    <Recommended />
    <Categories />
    {/* <News /> */}
    </>
  );
};

export default Home;

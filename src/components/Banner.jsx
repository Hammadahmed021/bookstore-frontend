import React from "react";
import banner from "../assets/banner.png";
import Button from "./Button";
import FancySlider from "./BannerSlider";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse py-8 sm:py-16 gap-10 items-center justify-between">
      <div className="md:w-1/2 w-full flex justify-center md:justify-end">
        {/* <img src={banner} alt="" /> */}
        <FancySlider />
      </div>
      <div className="md:w-1/2 w-full">
        <h1 className="text-2xl md:text-5xl font-medium mb-7">
          Get the best books in town
        </h1>
        <p className="mb-10">
          It's time to update your reading list with some of the latest and
          greatest releases in the literary world. From heart-pumping thrillers
          to captivating memoirs, this week's new releases offer something for
          everyone
        </p>
        <Button icon={false} text={"Subscribe"} onClick={() => {}} />
      </div>
    </div>
  );
};

export default Banner;

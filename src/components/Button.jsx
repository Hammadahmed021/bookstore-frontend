import React from "react";
import { HiShoppingCart } from "react-icons/hi2";

const Button = ({ onClick, text, icon }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="rounded-lg bg-primary text-white px-6 py-2"
      >
        {icon ? (
          <span className="flex gap-2 items-center">
            <HiShoppingCart className="size-6"/>
            <p className="capitalize">{text}</p>
          </span>
        ) : (
          <p className="capitalize">{text}</p>
        )}
      </button>
    </>
  );
};

export default Button;

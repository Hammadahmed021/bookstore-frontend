import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import Button from "./Button";
import { getImgUrl } from "../utils/getImage";
import { Link } from "react-router-dom";
import { addToCart } from "../store/features/cart/cartSlice";
import { useDispatch } from "react-redux";

const BookCard = ({
  props: { _id, title, coverImage, description, oldPrice, newPrice, category },
}) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const product = {
      _id,
      title,
      oldPrice,
      newPrice,
      coverImage,
      quantity: 1,
      category,
    };
    dispatch(addToCart(product));
  };
  return (
    <div className=" rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4">
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md max-w-44">
          <Link to={`/book/${_id}`}>
            <img
              src={getImgUrl(coverImage)} // This will now use the correct URL from the backend
              alt={title}
              className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />

          </Link>
        </div>

        <div>
          <Link to={`/book/${_id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {title?.length > 25 ? `${title?.slice(0, 25)}...` : title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {description?.length > 80
              ? `${description?.slice(0, 80)}...`
              : description}
          </p>
          <p className="font-medium mb-5">
            ${newPrice}{" "}
            <span className="line-through font-normal ml-2">${oldPrice}</span>
          </p>
          {/* <button className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
            <FiShoppingCart className="" />
            <span>Add to Cart</span>
          </button> */}
          <Button icon={true} text={"Add to cart"} onClick={handleAddToCart} />
        </div>
      </div>
    </div>
  );
};

export default BookCard;

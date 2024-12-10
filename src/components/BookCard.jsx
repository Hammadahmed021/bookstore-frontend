import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Button from "./Button";
import { getImgUrl } from "../utils/getImage";
import { Link } from "react-router-dom";
import { addToCart } from "../store/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFetchAllCategoriesQuery } from "../store/features/categories/categoryApi";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "../store/features/wishlist/wishlistApi";
import WishlistButton from "./WishlistButton";

const BookCard = ({
  props: { _id, title, coverImage, description, oldPrice, newPrice, category },
  isFavorite = false,
}) => {
  const { data: allCategories } = useFetchAllCategoriesQuery();
  const [addToWishlist] = useAddToWishlistMutation();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.user);

  const getCategory = allCategories?.data?.filter(
    (item) => item?._id == category
  );
  const getCategoryName = getCategory?.map((item) => {
    return item?.title;
  });

  const handleAddToCart = () => {
    const product = {
      _id,
      title,
      oldPrice,
      newPrice,
      coverImage,
      quantity: 1,
      getCategoryName,
    };
    dispatch(addToCart(product));
  };

  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="relative flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
        <div className="relative h-52 sm:h-72 sm:flex-shrink-0 border rounded-md w-full sm:max-w-44">
          <Link to={`/book/${_id}`}>
            <img
              src={getImgUrl(coverImage)}
              alt={title}
              className="h-52 sm:h-72 w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>
        {auth && (
          <span className="w-8 h-8 p-1 bg-white border rounded-full absolute top-2 right-2 flex items-baseline justify-center">
            <WishlistButton bookId={_id} />
          </span>
        )}
        <div className="relative">
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
          <Button icon={true} text={"Add to cart"} onClick={handleAddToCart} />
        </div>
      </div>
    </div>
  );
};

export default BookCard;

import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useFetchBookByIdQuery } from "../store/features/books/booksApi";
import { getImgUrl } from "../utils/getImage";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCartItemQuantity } from "../store/features/cart/cartSlice";

const BookSingle = () => {
  const { id } = useParams();
  const { data: book, isLoading, error } = useFetchBookByIdQuery(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItem = cartItems.find((item) => item._id === id);

  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);

  if (isLoading) return <p>Loading book details...</p>;
  if (error) return <p>Failed to load book details. Please try again later.</p>;
  if (!book) return <p>Book not found.</p>;

  const { _id, title, coverImage, description, oldPrice, newPrice, category } = book;

  const totalPrice = newPrice * quantity;

  // Handle Quantity Change
  const handleQuantityChange = (type) => {
    const updatedQuantity = type === "increment" ? quantity + 1 : quantity - 1;

    if (updatedQuantity > 0) {
      setQuantity(updatedQuantity);
      dispatch(updateCartItemQuantity({ id: _id, quantity: updatedQuantity }));
    }
  };

  // Add to Cart
  const handleAddToCart = () => {
    const product = {
      _id,
      title,
      oldPrice,
      newPrice,
      coverImage,
      quantity,
      category,
    };
    dispatch(addToCart(product));
  };

  // Navigate to Cart
  const handleNavigateToCart = () => {
    navigate("/cart"); // Adjust path if needed
  };

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img
            src={getImgUrl(coverImage)}
            alt={title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            {/* Product Title */}
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{title}</h1>
            <p className="text-lg text-gray-500 mb-2">
              <b>Category:</b> <span className="font-medium">{category}</span>
            </p>
            <p className="text-base text-gray-700 mb-6">{description}</p>

            {/* Price Display */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-lg font-medium">Price:</span>
              <span className="text-lg font-semibold text-blue-600">${newPrice}</span>
              {oldPrice && (
                <span className="text-lg text-gray-500 line-through">${oldPrice}</span>
              )}
            </div>

            {/* Quantity and Total Price */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  className="px-4 py-2 text-lg bg-gray-200 hover:bg-gray-300 rounded-lg focus:outline-none transition"
                >
                  -
                </button>
                <span className="text-xl font-semibold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increment")}
                  className="px-4 py-2 text-lg bg-gray-200 hover:bg-gray-300 rounded-lg focus:outline-none transition"
                >
                  +
                </button>
              </div>

            </div>
          </div>

          {/* Add to Cart / View Cart Button */}
          <div className="my-3">
            {cartItem ? (
              <Button
                text="View Cart"
                onClick={handleNavigateToCart}
                className="w-full px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition duration-200"
              />
            ) : (
              <Button
                text="Add to Cart"
                icon={true}
                onClick={handleAddToCart}
                className="w-full px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
              />
            )}
          </div>

          {/* Total  */}
          <p className="text-lg font-medium mt-4 flex gap-4">
            Total: <span className="text-blue-600 font-semibold">${totalPrice.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>

  );
};

export default BookSingle;

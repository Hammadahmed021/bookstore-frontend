import React from "react";
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "../store/features/wishlist/wishlistApi";
import { getImgUrl } from "../utils/getImage";
import { Link } from "react-router-dom";
import { addToCart } from "../store/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import { useFetchAllCategoriesQuery } from "../store/features/categories/categoryApi";

const WishlistPage = () => {
  const { data: wishlist, isLoading, error } = useGetWishlistQuery();
  const [removeWishlist] = useRemoveFromWishlistMutation();
  const { data: allCategories } = useFetchAllCategoriesQuery();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleRemoveFromWishlist = async (_id) => {
    try {
      await removeWishlist(_id).unwrap();
      alert("Book removed from wishlist");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };
  const handleAddToCart = (book) => {
    // Destructure the relevant properties from the book object
    const {
      _id,
      title,
      oldPrice,
      newPrice,
      coverImage,
      description,
      category,
      trending,
    } = book;

    const getCategory = allCategories?.data?.filter(
      (item) => item?._id == category
    );
    const getCategoryName = getCategory?.map((item) => {
      return item?.title;
    });

    // Construct the product object to add to the cart
    const product = {
      _id,
      title,
      oldPrice,
      newPrice,
      coverImage,
      quantity: 1, // Default quantity is 1 when adding to the cart
      getCategoryName,
      trending,
      description, // You can include additional properties as needed
    };

    // Check if the item is already in the cart by matching the book's _id
    const checkingId = cartItems.some((item) => item._id === _id);

    if (!checkingId) {
      // If the item is not in the cart, add it to the cart with all relevant details
      dispatch(addToCart(product));

      // Now check if the item is in the wishlist and remove it if it is
      removeWishlist(_id).unwrap(); // Remove from wishlist if it exists
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="text-gray-500 text-sm">
        {`${error?.data?.message}. Please `}
        <Link className="underline" to={"/login"}>
          login
        </Link>
        {" to see your favorites."}
      </div>
    );

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-6 font-primary">
      <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>
      {wishlist?.favorites?.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md border">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Book
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Price
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Action
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Buy
                </th>
              </tr>
            </thead>
            <tbody>
              {wishlist.favorites.map(({ book }) => (
                <tr key={book._id} className="border-b">
                  <td className="px-4 py-2 flex items-center">
                    <img
                      src={getImgUrl(book.coverImage)}
                      alt={book.title}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <span className="text-gray-800">{book.title}</span>
                  </td>
                  <td className="px-4 py-2 text-gray-600">${book.newPrice}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleRemoveFromWishlist(book._id)}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      Remove
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <Button
                      icon={true}
                      text={"Add to cart"}
                      onClick={() => handleAddToCart(book)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;

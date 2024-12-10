import React from "react";
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "../store/features/wishlist/wishlistApi";
import { getImgUrl } from "../utils/getImage";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const { data: wishlist, isLoading, error } = useGetWishlistQuery();
  const [removeWishlist] = useRemoveFromWishlistMutation();
  const { data: getAllWishlist } = useGetWishlistQuery();
  console.log(getAllWishlist, "data fav");

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="text-gray-500 text-sm">
        {`${error?.data?.message}. Please `}
        <Link className="underline" to={"/login"}>login</Link>
        {" to see your favorites."}
      </div>
    );
  const handleRemoveFromWishlist = async (_id) => {
    try {
      await removeWishlist(_id).unwrap();
      alert("Book removed from wishlist");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };
  return (
    <div className="wishlist-page">
      <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>
      {wishlist?.favorites?.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-items">
          {wishlist.favorites.map(({ book }) => (
            <div key={book._id} className="wishlist-item">
              <img
                src={getImgUrl(book.coverImage)}
                alt={book.title}
                className="w-20 h-20"
              />
              <div>
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p>${book.newPrice}</p>
              </div>
              <span onClick={() => handleRemoveFromWishlist(book._id)}>X</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;

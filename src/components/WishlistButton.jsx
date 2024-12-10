import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useAddToWishlistMutation, useGetWishlistQuery, useRemoveFromWishlistMutation } from '../store/features/wishlist/wishlistApi';


const WishlistButton = ({ bookId }) => {
  const { data: wishlist, isLoading } = useGetWishlistQuery();
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const isFavorite = wishlist?.favorites?.some((item) => item.book._id === bookId);

  const handleToggleWishlist = async () => {
    console.log('Book ID:', bookId); // Ensure this logs a valid ID
    try {
      if (isFavorite) {
        await removeFromWishlist(bookId).unwrap();
        alert('Book removed from wishlist');
      } else {
        await addToWishlist(bookId).unwrap();
        alert('Book added to wishlist');
      }
    } catch (error) {
      alert(error?.data?.message || 'Something went wrong');
      console.error('Error updating wishlist:', error);
    }
  };
  

  if (isLoading) return null; // Show nothing while loading

  return (
    <div
      className="absolute items-center justify-center cursor-pointer text-red-500"
      onClick={handleToggleWishlist}
    >
      {isFavorite ? <AiFillHeart size={22} /> : <AiOutlineHeart size={22} />}
    </div>
  );
};

export default WishlistButton;

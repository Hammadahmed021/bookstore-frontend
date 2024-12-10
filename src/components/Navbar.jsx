import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiMiniBars3BottomLeft, HiOutlineHeart } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { HiOutlineUser, HiShoppingCart } from "react-icons/hi";
import avatar from "../assets/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import {
  useLogoutUserMutation,
  useVerifyUserQuery,
} from "../store/features/users/usersApi";
import { clearAuth, setAuth } from "../store/features/users/userSlice";

const DropDownNavigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Orders",
    path: "/order",
  },
  {
    name: "Cart Page",
    path: "/cart",
  },
  {
    name: "Checkout",
    path: "/checkout",
  },
];

const Navbar = () => {
  const [logoutUser] = useLogoutUserMutation();
  const { data, error, isLoading } = useVerifyUserQuery();
  const dispatch = useDispatch();

  const [isDropdown, setIsDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const checkUser = useSelector((state) => state.auth.user);

  const toggleDropdown = () => {
    setIsDropdown((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const response = await logoutUser().unwrap();
      console.log(response.message, 'text');
      dispatch(clearAuth()); // Clear Redux auth state
      setCurrentUser(null); // Clear local state
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (data?.user) {
      setCurrentUser(data.user);
    } else {
      setCurrentUser(null);
    }
  }, [data?.user, checkUser]);  // Add checkUser to dependencies to sync the state when it changes

  useEffect(() => {
    if (checkUser) {
      setCurrentUser(checkUser); // Sync currentUser with Redux state if it's available
    } else {
      setCurrentUser(null); // Clear local state when user is logged out
    }
  }, [checkUser]);
  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6 font-primary">
      <nav className="flex justify-between items-center">
        {/* left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <HiMiniBars3BottomLeft className="size-6" color="#222" />
          </Link>

          {/* search bar  */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <CiSearch className="absolute inline-block left-3 inset-y-2" />
            <input
              type="text"
              placeholder="search here..."
              className="bg-[#f0f0f0] py-1 w-full focus:outline-none px-6 md:px-8 rounded-md"
            />
          </div>
        </div>
        <div className="relative flex items-center gap-3">
          {currentUser || checkUser ? (
            <>
              <button onClick={toggleDropdown} className="flex gap-2">
                <img
                  src={avatar}
                  alt=""
                  className="size-7 rounded-full ring-2 ring-secondary"
                />
                <p>{currentUser?.name || checkUser?.name}</p>
              </button>
              {isDropdown && (
                <>
                  <div className="absolute right-0 mt-2 top-8 p-1 border w-full rounded-lg shadow-lg bg-white z-10">
                    <ul className="text-xs sm:text-sm">
                      {DropDownNavigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.path}
                            className="block cursor-pointer duration-200 hover:bg-gray-100 p-1"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <span
                          className="block cursor-pointer duration-200 hover:bg-gray-100 p-1"
                          onClick={handleLogout}
                        >
                          Logout
                        </span>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </>
          ) : (
            <Link to={"/login"}>
              <HiOutlineUser className="size-6" color="#222" />
            </Link>
          )}

          <Link className="hidden sm:block" to={"/wishlist"}>
            <HiOutlineHeart className="size-6" color="#222" />
          </Link>
          <Link
            to={"/cart"}
            className="bg-primary p-1 rounded-md flex items-center py-2 sm:px-4"
          >
            <HiShoppingCart color="#222" />
            {cartItems.length > 0 && <sup>{cartItems?.length}</sup>}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

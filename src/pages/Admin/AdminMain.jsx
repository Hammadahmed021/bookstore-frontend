import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  useLogoutUserMutation,
  useVerifyUserQuery,
} from "../../store/features/users/usersApi";
import { clearAuth } from "../../store/features/users/userSlice";
import { useDispatch } from "react-redux";
import { FaSpinner } from "react-icons/fa"; // Optional: Using FontAwesome spinner for loader

const AdminMain = () => {
  const [ logoutUser ] = useLogoutUserMutation();
  const { data, error, isLoading } = useVerifyUserQuery();
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingLogout, setLoadingLogout] = useState(false); // Track loading state
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setLoadingLogout(true); // Start loading
    try {
      const response = await logoutUser().unwrap();
      console.log(response.message);
      dispatch(clearAuth()); // Clear Redux auth state
      setCurrentUser(null); // Clear local state
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoadingLogout(false); // End loading
    }
  };

  useEffect(() => {
    if (data?.user) {
      setCurrentUser(data.user);
    } else {
      setCurrentUser(null);
    }
  }, [data?.user]);

  console.log(currentUser, "currentUser");

  return (
    <div className="flex flex-col min-h-screen p-6">
      <div className="flex items-center justify-end border-b pb-4 mb-6">
        <span>
          {currentUser && (
            <div className="flex gap-6 items-center">
              <p className="capitalize">Welcome <span className="font-semibold">{currentUser?.name}</span></p>
              <button
                onClick={handleLogout}
                disabled={loadingLogout} // Disable button while loading
                className="text-secondary flex items-center gap-2"
              >
                {loadingLogout ? (
                  <>
                    <FaSpinner className="animate-spin" /> Logging out...
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          )}
        </span>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminMain;

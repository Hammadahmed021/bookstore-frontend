import { Outlet } from "react-router-dom";
import { Footer, Navbar, Sidebar } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { useVerifyUserQuery } from "./store/features/users/usersApi";
import { clearAuth } from "./store/features/users/userSlice";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { Dashboard } from "./pages";
import { BASE_URL } from "./utils/getBaseUrl";



export default function App() {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.auth.user?.role); // Assuming role is stored in Redux
  const { data, error, isLoading } = useVerifyUserQuery();

  console.log(BASE_URL(), 'BASE_URL');
  
  useEffect(() => {
    // Only proceed when the query is not loading
    if (!isLoading) {
      const token = Cookies.get("token");

      if (!token || error || (data && !data.success)) {
        // If token is invalid or there's an error, clear Redux and cookies
        Cookies.remove("token");
        dispatch(clearAuth());
      }
    }
  }, [data, error, isLoading, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while verifying
  }

  return (
    <>
      <>
        {userRole === "admin" ? (
          <>
            <div className="min-h-screen font-primary flex">
              <Sidebar />
              <main className="flex-1 p-6">
                <Outlet />
              </main>
            </div>

          </>
        ) : (
          <>
            <Navbar />
            <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
              <Outlet />
            </main>
            <Footer />
          </>
        )}
      </>

    </>
  );
}

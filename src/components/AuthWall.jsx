import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthWall = ({ children, authentication = true, requiredRole = null }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.user?.role); // Assuming role is stored in Redux

  console.log(userRole, 'userRole');
  

  useEffect(() => {
    if (authentication && !authStatus) {
      // If authentication is required and user is not logged in, redirect to login
      navigate("/login");
    } else if (!authentication && authStatus) {
      // If authentication is not required and user is logged in, redirect to /admin or /dashboard
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else if (requiredRole && userRole !== requiredRole) {
      // Redirect users who don't have the correct role (for example, non-admins to /login)
      navigate("/login");
    }

    setLoader(false);
  }, [authentication, authStatus, userRole, requiredRole, navigate]);

  return loader ? <h2>loading...</h2> : <>{children}</>;
};

export default AuthWall;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthWall = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (authentication && !authStatus) {
      // If authentication is required and user is not logged in, redirect to login
      navigate("/login");
    } else if (!authentication && authStatus) {
      // If authentication is not required and user is logged in, redirect to home
      navigate("/dashboard");
    }

    setLoader(false);
  }, [authentication, authStatus, navigate]);

  return loader ? <h2>loading...</h2> : <>{children}</>;
};

export default AuthWall;

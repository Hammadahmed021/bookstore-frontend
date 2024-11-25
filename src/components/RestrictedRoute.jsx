import { useVerifyUserQuery } from "../store/features/users/usersApi";
import { Navigate } from "react-router-dom";

const RestrictedRoute = ({ children }) => {
  const { data, isLoading } = useVerifyUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data?.success) {
    // Redirect to home if the user is already logged in
    return <Navigate to="/" replace />;
  }

  // If not authenticated, render the children components
  return <>{children}</>;
};

export default RestrictedRoute;

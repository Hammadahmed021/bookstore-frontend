import { useVerifyUserQuery } from "../store/features/users/usersApi";
import { Navigate } from "react-router-dom";

const AuthWall = ({ children }) => {
  const { data, error, isLoading } = useVerifyUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data?.success) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the children components
  return <>{children}</>;
};

export default AuthWall;

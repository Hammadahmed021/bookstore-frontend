import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components";
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "../store/features/users/usersApi";
import Button from "../components/Button";
import { setAuth } from "../store/features/users/userSlice";
import { showErrorToast, showSuccessToast } from "../utils/toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoadingLogin, setIsLoadingLogin] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const onSubmit = async (data) => {
    try {
      setIsLoadingLogin(true)
      const response = await loginUser(data).unwrap(); // Unwrap to get the response or error
      console.log(response, "Response from login"); // Check the structure of the response

      // Ensure that the response has the 'name' property
      const isAdmin = response.name === "admin"; // Strictly check for admin
      const userRole = isAdmin ? "admin" : "user"; // Assign the correct role

      console.log(userRole, 'userRole>>>'); // Debugging the userRole

      if (response) {
        // Dispatch the role along with the user data and token
        dispatch(setAuth({ user: response, token: response.token, role: userRole }));
        setIsLoadingLogin(false)
      }

      showSuccessToast("User login successfully");
    } catch (error) {
      showErrorToast("something went wrong")
      console.error("Login failed", error); // Handle login error properly
    } finally{
      setIsLoadingLogin(false)
    }

  };
  const   handleGoogleSignIn = () => { };

  return (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto bg-white border shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Please Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Email Address"
              register={register}
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }}
              errors={errors}
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              register={register}
              validation={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
              errors={errors}
            />
          </div>
          <div className="block text-end text-sm mb-4">
            <Link to={'/forgot-password'}>forgot password?</Link>
          </div>

          {/* <p className="text-red-500 text-xs italic mb-3">Message</p> */}

          <div className="flex flex-wrap space-y-2.5 items-center justify-between">
            <button 
              className="bg-primary border rounded-lg w-full text-white px-6 py-2  hover:bg-opacity-80 flex items-center justify-center"

              disabled={isSubmitting || isLoadingLogin}
            >
              {isLoadingLogin || isSubmitting ? (
                <div className="loader spinner-border animate-spin border-white border-4 rounded-full w-4 h-4 mr-2"></div>
              ) : null}
              {isLoadingLogin || isSubmitting ? "Login..." : "Login"}
            </button>
          </div>
        </form>
        <p className="block text-center font-medium mt-4 text-sm">
          Don't have an account?
          <Link to="/register" className="text-blue-500 hover:text-blue-800">
            {" "}
            Register
          </Link>
        </p>
        <div className="mt-4">
          <button
            className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            onClick={handleGoogleSignIn}
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Button from "../components/Button";
import { useGoogleAuthMutation, useRegisterUserMutation } from "../store/features/users/usersApi";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/features/users/userSlice";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { SignUpWithGoogle } from "../firebase";

const Register = () => {
  const dispatch = useDispatch();
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false)


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [registerUser, { isLoading, isError, error: apiError }] =
    useRegisterUserMutation();
  const [googleAuth] = useGoogleAuthMutation();


  const onSubmit = async (data) => {

    try {
      const response = await registerUser(data).unwrap(); // The unwrap will allow you to catch the response or error
      console.log(response, 'response >><<<<<<<');

      const isAdmin = response.name === "admin"; // Strictly check for admin
      const userRole = isAdmin ? "admin" : "user"; // Assign the correct role
      if (response) {
        // Dispatch the role along with the user data and token
        dispatch(setAuth({ user: response, token: response.token, role: userRole }));
      }
      showSuccessToast("User registered successfully");
    } catch (error) {
      showErrorToast(error);
      console.error("Registration failed", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoadingGoogle(true); // Start loading state
      // Get the ID token from Firebase
      const idToken = await SignUpWithGoogle();

      // Use React Query to call the backend with the ID token
      const userData = await googleAuth(idToken).unwrap(); // Unwrap to get the response or error

      console.log("User logged in successfully:", userData); // Check the structure of the response

      if (userData) {

        // Dispatch the role along with the user data and token
        dispatch(setAuth({ user: { ...userData, loginType: 'google' }, token: userData.token }));

        showSuccessToast("User registered successfully");
      }
    } catch (error) {
      showErrorToast(error?.message);
      console.error("Google sign-in failed", error); // Handle login error properly
    } finally {
      setIsLoadingGoogle(false); // Reset loading state
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto bg-white border shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Please Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <Input
              id="name"
              type="name"
              placeholder="Enter your name"
              register={register}
              validation={{
                required: "name is required",
              }}
              errors={errors}
            />
          </div>
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
          <div className="mb-6">
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

          {/* <p className="text-red-500 text-xs italic mb-3">Message</p> */}

          <div className="flex flex-wrap space-y-2.5 items-center justify-between">
            <button
              className="bg-primary border rounded-lg w-full text-white px-6 py-2  hover:bg-opacity-80 flex items-center justify-center"

              disabled={isSubmitting || isLoading}
            >
              {isLoading || isSubmitting ? (
                <div className="loader spinner-border animate-spin border-white border-4 rounded-full w-4 h-4 mr-2"></div>
              ) : null}
              {isLoading || isSubmitting ? "Registering..." : "Register"}
            </button>

          </div>
        </form>
        <p className="block text-center font-medium mt-4 text-sm">
          Already have an account?
          <Link to="/login" className="text-blue-500 hover:text-blue-800">
            {" "}
            Login
          </Link>
        </p>
        <div className="mt-4">
          <button
            className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            onClick={handleGoogleSignIn}
            disabled={isLoadingGoogle}
          >
            {isLoadingGoogle ? (
              <div className="loader spinner-border animate-spin border-white border-4 rounded-full w-4 h-4 mr-2"></div>
            ) : (
              <FaGoogle className="mr-2" />
            )}
            {isLoadingGoogle ? "Signing up..." : "Sign up with Google"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

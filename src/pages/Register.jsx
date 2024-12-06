import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Button from "../components/Button";
import { useRegisterUserMutation } from "../store/features/users/usersApi";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/features/users/userSlice";
import { showErrorToast, showSuccessToast } from "../utils/toast";

const Register = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [registerUser, { isLoading, isError, error: apiError }] =
    useRegisterUserMutation();

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
  const handleGoogleSignIn = () => {};

  return (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            <Button text={"Register"} />
          </div>
        </form>
        <p className="inline-block align-baseline font-medium mt-4 text-sm">
          Already have an account? Please
          <Link to="/login" className="text-blue-500 hover:text-blue-800">
            {" "}
            Login
          </Link>
        </p>
        <div className="mt-4">
          <button
            className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

export default Register;

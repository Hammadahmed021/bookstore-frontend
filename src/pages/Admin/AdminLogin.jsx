import React from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components";
import { useDispatch } from "react-redux";
import { useAdminLoginMutation } from "../../store/features/users/usersApi";
import Button from "../../components/Button";
import { setAuth } from "../../store/features/users/userSlice";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loginAdmin, { isLoading, error }] = useAdminLoginMutation();

  const onSubmit = async (data) => {
    try {
      const response = await loginAdmin(data).unwrap(); // The unwrap will allow you to catch the response or error
      if (response) {
        dispatch(setAuth({ user: response, token: response.token }));
        navigate('/admin/orders')
      }
      console.log(response, "User login successfully");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };
  const handleGoogleSignIn = () => {};

  return (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Login as admin</h2>
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
            <Button text={"Login"} />
          </div>
        </form>
      
      </div>
    </div>
  );
};

export default AdminLogin;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  getBaseURL } from "../../../utils/getBaseUrl";
import Cookies from "js-cookie";
import {
  getFirebaseTokenForLogin,
  getFirebaseTokenForRegister,
} from "../../../utils/helperFunctions";
import { deleteUser } from "firebase/auth";



const BASE_URL = getBaseURL(); // Call the function to get the URL
// Base query setup for API calls
const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}api/user`, // Your auth endpoint
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("token"); // Retrieve the token from cookies
    if (token) {
      headers.set("Authorization", `Bearer ${token}`); // Set Bearer token
    }
    return headers;
  },
});

// Auth API using Redux Toolkit Query
const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({

    // Get all users
    fetchAllUsers: builder.query({
      query: () => `/all`, // Endpoint to get all orders
      providesTags: ["Auth"],
    }),

    // Register User Mutation
    registerUser: builder.mutation({
      async queryFn(newUser, _queryApi, _extraOptions, baseQueryFn) {
        let user = null;
        try {
          // Generate Firebase Token and create user in Firebase
          const { token, createdUser } = await getFirebaseTokenForRegister(newUser);
          user = createdUser;

          // Save the Firebase token in cookies
          Cookies.set("token", token, { expires: 7 }); // Set cookie for 7 days

          // Backend expects token as part of the payload
          const payload = {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            role: "user",
            idToken: token, // Ensure the ID token is passed correctly
          };

          // Step 1: Call the backend API to register the user
          const result = await baseQueryFn({
            url: "/register",
            method: "POST",
            body: payload,
          });

          if (result.error) throw result.error;

          // Return the result along with token and user
          return { data: { ...result.data, token: token, user: user } };
        } catch (error) {

          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
    }),

    // Login User Mutation
    loginUser: builder.mutation({
      async queryFn(userCredentials, _queryApi, _extraOptions, baseQueryFn) {
        try {
          // Generate Firebase Token
          const { token, user } = await getFirebaseTokenForLogin(
            userCredentials
          );

          // Save the Firebase token in cookies
          Cookies.set("token", token, { expires: 7 }); // Set cookie for 7 days

          // Backend expects token as part of the payload
          const payload = {
            email: userCredentials.email,
            password: userCredentials.password,
            idToken: token, // Ensure the ID token is passed correctly
          };

          // Call the backend API
          const result = await baseQueryFn({
            url: "/login",
            method: "POST",
            body: payload,
          });

          if (result.error) throw result.error;

          // Add Firebase token to the result for consistency
          return { data: { ...result.data, token: token, user: user } };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
    }),

    // Verify User Query
    verifyUser: builder.query({
      query: () => "/verify", // Endpoint to verify user status based on the stored token
    }),

    // Logout user mutation
    logoutUser: builder.mutation({
      async queryFn(_arg, _queryApi, _extraOptions, baseQueryFn) {
        try {
          // Call the backend API to log the user out
          const result = await baseQueryFn({
            url: "/logout",
            method: "POST",
          });

          if (result.error) throw result.error;

          // Clear the token from cookies
          Cookies.remove("token");

          // Return success response
          return {
            data: { success: true, message: "Logged out successfully" },
          };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
    }),

    // Admin Login Mutation
    adminLogin: builder.mutation({
      async queryFn(userCredentials, _queryApi, _extraOptions, baseQueryFn) {
        try {
          // Generate Firebase Token
          const { token, user } = await getFirebaseTokenForLogin(
            userCredentials
          );

          // Save the Firebase token in cookies
          Cookies.set("token", token, { expires: 7 }); // Set cookie for 7 days

          // Backend expects token as part of the payload
          const payload = {
            email: userCredentials.email,
            password: userCredentials.password,
            idToken: token, // Ensure the ID token is passed correctly
          };

          // Call the backend API
          const result = await baseQueryFn({
            url: "/admin-login",
            method: "POST",
            body: payload,
          });

          if (result.error) throw result.error;

          // Add Firebase token to the result for consistency
          return { data: { ...result.data, token: token, user: user } };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
    }),

    // Forgot password mutation
    forgotPassword: builder.mutation({
      async queryFn(email, _queryApi, _extraOptions, baseQueryFn) {
        try {
          const payload = { email };

          // Call backend API to send reset email
          const result = await baseQueryFn({
            url: "/forgot-password", // Your backend endpoint
            method: "POST",
            body: payload,
          });

          if (result.error) throw result.error;

          return { data: result.data }; // Return the success message or response from backend
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
    }),

    // Set new password mutation
    setNewPassword: builder.mutation({
      async queryFn({ idToken, newPassword }, _queryApi, _extraOptions, baseQueryFn) {
        try {
          const payload = { idToken, newPassword };

          // Call backend API to set the new password
          const result = await baseQueryFn({
            url: "/new-password", // Your backend endpoint
            method: "POST",
            body: payload,
          });

          if (result.error) throw result.error;

          return { data: result.data }; // Return success message after password reset
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useAdminLoginMutation,
  useVerifyUserQuery,
  useLogoutUserMutation,
  useFetchAllUsersQuery,
  useSetNewPasswordMutation,
  useForgotPasswordMutation
} = authApi;

export default authApi;

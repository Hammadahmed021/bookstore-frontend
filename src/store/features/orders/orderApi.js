import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../utils/getBaseUrl"; // Assuming you have a utility to fetch the base URL
import Cookies from "js-cookie";

// Base query for API calls with token authentication
const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL()}api/order`, // Your API endpoint for orders
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Define the ordersApi using createApi
const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery,
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    // Fetch all orders
    fetchAllOrders: builder.query({
      query: () => `/all`, // Endpoint to get all orders
      providesTags: ["Orders"],
    }),

    // Fetch a specific order by ID
    fetchOrderById: builder.query({
      query: (id) => `/${id}`, // Endpoint to get order by ID
      providesTags: (result, error, id) => [{ type: "Orders", id }],
    }),

    // Create a new order
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/create-order", // Endpoint to create a new order
        method: "POST",
        body: newOrder, // Send the new order in the request body
      }),
      invalidatesTags: ["Orders"], // Invalidate the cache for orders after creation
    }),

    // Create a new guest order
    createGuestOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/guest-order", // Endpoint to create a new order
        method: "POST",
        body: newOrder, // Send the new order in the request body
      }),
      invalidatesTags: ["Orders"], // Invalidate the cache for orders after creation
    }),

    // Delete an order
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`, // Endpoint to delete an order by ID
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"], // Invalidate the cache for orders after deletion
    }),

     // Fetch orders by user ID
     fetchOrdersByUserId: builder.query({
      query: (userId) => `/user/${userId}`, // Endpoint to get orders by user ID
      providesTags: (result, error, userId) => [{ type: "Orders", userId }],
    }),
  }),
});

export const {
  useFetchAllOrdersQuery,
  useCreateOrderMutation,
  useCreateGuestOrderMutation,
  useFetchOrderByIdQuery,
  useFetchOrdersByUserIdQuery, // New hook for fetching orders by user ID
  //   useDeleteOrderMutation,
} = ordersApi;

export default ordersApi;

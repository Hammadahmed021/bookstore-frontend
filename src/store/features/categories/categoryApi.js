import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  getBaseURL } from "../../../utils/getBaseUrl";
import Cookies from "js-cookie";



const BASE_URL = getBaseURL(); // Call the function to get the URL


const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}api/category`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery,
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    fetchAllCategories: builder.query({
      query: () => `/get-all`,
      providesTags: ["Categories"],
    }),
    fetchCategoryById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Categories", id }],
    }),
    addCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/create",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...rest }) => {
        const formData = new FormData();
        if (rest.title) formData.append("title", rest.title);
        if (rest.image) formData.append("image", rest.image);
    
        return {
          url: `/update/${id}`, // Ensure this matches your backend route
          method: "POST",
          body: formData, // Using FormData for potential file upload
        };
      },
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useFetchAllCategoriesQuery,
  useFetchCategoryByIdQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;

export default categoriesApi;

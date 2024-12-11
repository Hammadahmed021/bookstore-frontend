import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utils/getBaseUrl";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";


const BASE_URL = getBaseURL(); // Call the function to get the URL


const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}api/book`,
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = Cookies.get("token");
    if (token) {
      // const decoded = jwtDecode(token);
      Headers.set("Authorization", `Bearer ${token}`);
    }
    return Headers;
  },
});

const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery,
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    fetchAllBooks: builder.query({
      query: () => `/get-all`,
      providesTags: ["Books"],
    }),
    fetchBookById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Books", id }],
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: "/create",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, formData }) => {
        return {
          url: `/update/${id}`, // Ensure this matches your backend route
          method: "PUT",
          body: formData, // Using FormData directly          
        };
      },
      invalidatesTags: ["Books"],
    }),
    
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useFetchAllBooksQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useFetchBookByIdQuery,
  useUpdateBookMutation,
} = booksApi;
export default booksApi;

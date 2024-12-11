import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { BASE_URL } from '../../../utils/getBaseUrl';
import {  getBaseURL } from "../../../utils/getBaseUrl";

import Cookies from 'js-cookie';

const BASE_URL = getBaseURL(); // Call the function to get the URL


const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}api/favorites`,
  prepareHeaders: (headers) => {
    const token = Cookies.get('token'); // Retrieve the token from cookies
    if (token) {
      headers.set('Authorization', `Bearer ${token}`); // Set Bearer token
    }
    return headers;
  },
});

export const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery,
  tagTypes: ['Wishlist'],
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => '/',
      providesTags: ['Wishlist'],
    }),
    addToWishlist: builder.mutation({
      query: (bookId) => ({
        url: '/add',
        method: 'POST',
        body: { bookId },
      }),
      invalidatesTags: ['Wishlist'],
    }),
    removeFromWishlist: builder.mutation({
      query: (bookId) => ({
        url: '/remove',
        method: 'DELETE',
        body: { bookId },
      }),
      invalidatesTags: ['Wishlist'],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;

export default wishlistApi;

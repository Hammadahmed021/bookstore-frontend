import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage as storage
import rootReducer from "./rootReducer";
import booksApi from "./features/books/booksApi";
import authApi from "./features/users/usersApi";
import ordersApi from "./features/orders/orderApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth"], // Only persist the cart slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist compatibility
    }).concat(booksApi.middleware, authApi.middleware, ordersApi.middleware), // Add API middleware
});


export const persistor = persistStore(store);

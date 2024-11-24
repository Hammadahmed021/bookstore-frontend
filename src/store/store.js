import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage as storage
import rootReducer from "./rootReducer";
import booksApi from "./features/books/booksApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // Only persist the cart slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist compatibility
    }).concat(booksApi.middleware), // Add API middleware
});


export const persistor = persistStore(store);

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer"; // Ensure rootReducer combines all necessary reducers
import { authApi } from "@/features/api/authApi";

export const appStore = configureStore({
  reducer: rootReducer, // Use the rootReducer to combine all reducers
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware), // Add middleware for RTK Query
});

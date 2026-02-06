import { configureStore } from "@reduxjs/toolkit";

// Import your slices here later
// import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    // auth: authReducer,
  },
});

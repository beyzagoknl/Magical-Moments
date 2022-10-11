import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import memoryReducer from "../features/memories/memorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    memories: memoryReducer,
  },
});

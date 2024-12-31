// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice/todoSlice";
import userReducer from "./userSlice/userSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

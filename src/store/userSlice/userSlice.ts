// src/store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userId: string | null;
}

const initialState: UserState = {
  userId: localStorage.getItem("id"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
      if (action.payload) {
        localStorage.setItem("id", action.payload);
      } else {
        localStorage.removeItem("id");
      }
    },
  },
});

export const { setUserId } = userSlice.actions;
export default userSlice.reducer;

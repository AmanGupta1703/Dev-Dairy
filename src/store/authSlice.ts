import { createSlice } from "@reduxjs/toolkit";

type TUser = {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  email: string;
};

type TInitialState = {
  status: boolean;
  userData: null | TUser;
};

const initialState: TInitialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.status = true;
      state.userData = action.payload.userData;
    },

    logout(state) {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

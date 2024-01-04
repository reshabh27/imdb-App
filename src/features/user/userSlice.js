import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

const initialState = {
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = {
        ...action.payload.user,
        token: action.payload.accessToken,
      };
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Welcome to the E-commerce website", {
        position: "top-center",
        autoClose: 2000,
      });
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.error("you have logged out", {
        position: "top-center",
        autoClose: 2000,
      });
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;

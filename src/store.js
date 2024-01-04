import { configureStore } from "@reduxjs/toolkit";

import movieListReducer from "./features/movieList/movieListSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    movieListState: movieListReducer,
    userState: userReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice";
import allMovieReducer from "./features/allMovies/allMoviesSlice"

export const store = configureStore({
  reducer: {
    userState: userReducer,
    allMovieState: allMovieReducer,
  },
});


import { configureStore } from "@reduxjs/toolkit";

import favMovieListReducer from "./features/favMovieList/favMovieListSlice";
import userReducer from "./features/user/userSlice";
import allMovieReducer from "./features/allMovies/allMoviesSlice"

export const store = configureStore({
  reducer: {
    favMovieListState: favMovieListReducer,
    userState: userReducer,
    allMovieState: allMovieReducer,
  },
});


// Dispatch the fetchInitialMovies action to fetch initial movies when the app starts
// store.dispatch(fetchInitialMovies());
import { createSlice, current } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

const defaultState = {
  favoriteMoviesList: [],
  numItemsInList: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("favMovies")) || defaultState;
};

const movieListSlice = createSlice({
  name: "moviesArray",
  initialState: getCartFromLocalStorage(),
  reducers: {
    // for users including admin
    addToFavorite:(state,action ) => {
      
    }
  },
});

export const { addItem, clearCart, removeItem, editItem, removeAllItem } = movieListSlice.actions;

export default movieListSlice.reducer;
 
import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

const defaultState = {
  favoriteMoviesList: [],
  numItemsInList: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("favMovies")) || defaultState;
};

const favMovieListSlice = createSlice({
  name: "favMoviesArray",
  initialState: getCartFromLocalStorage(),
  reducers: {
    // for users including admin
    addToFavorite:(state,action ) => {
      // console.log(action.payload);
      state.favoriteMoviesList.push(action.payload);
      state.numItemsInList = state.numItemsInList+1;
    },
    removeFromFavorites:(state,action) => {
       const { id } = action.payload;

       // Find the index of the movie with the provided id
       const indexToRemove = state.favoriteMoviesList.findIndex(
         (movie) => movie.id === id
       );

       // If the movie with the provided id is found, remove it from the favoriteMoviesList
       if (indexToRemove !== -1) {
         state.favoriteMoviesList.splice(indexToRemove, 1);
         state.numItemsInList = state.favoriteMoviesList.length;
       }
    },
    setInitialFavList:(state,action) => {
      state.favoriteMoviesList = action.payload;
      state.numItemsInList = state.favoriteMoviesList?.length +1 ;
    }
  },
});

export const { addToFavorite, removeFromFavorites, setInitialFavList } = favMovieListSlice.actions;

export default favMovieListSlice.reducer;
 
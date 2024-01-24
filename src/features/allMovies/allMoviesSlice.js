import { createSlice} from "@reduxjs/toolkit";

const defaultState = {
  allMoviesList: [],
  numItemsInList: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("allMovies")) || defaultState;
};

const allMovieSlice = createSlice({
  name: "allMoviesArray",
  initialState: getCartFromLocalStorage(),
  reducers: {
    // for users including admin
    addToAllMovies: (state, action) => {
      state.allMoviesList.push(action.payload);
      state.numItemsInList = state.allMoviesList.length;
      localStorage.setItem("allMovies", JSON.stringify(state));
    },
    removeFromAllMovies: (state, action) => {},
    setAllMovies: (state, action) => {
      // console.log(action.payload);
      // Set the initial movie list from the action payload
      state.allMoviesList = action.payload;
      state.numItemsInList = action.payload.length;

      // Update local storage
      localStorage.setItem("allMovies", JSON.stringify(state));
    },
    updateMovieInAllMovies: (state, action) => {
      const updatedMovie = action.payload;

      // Find the index of the movie to be updated
      const index = state.allMoviesList.findIndex(
        (movie) => movie.id === updatedMovie.id
      );

      // If the movie is found, update it
      if (index !== -1) {
        state.allMoviesList[index] = updatedMovie;
        localStorage.setItem("allMovies", JSON.stringify(state));
      }
    },
  },
});

export const { addToAllMovies, removeFromAllMovies,setAllMovies, updateMovieInAllMovies } = allMovieSlice.actions;

export default allMovieSlice.reducer;



import { createSlice} from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

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
      // console.log(action.payload);
      state.allMoviesList.push(action.payload);
      state.numItemsInList = state.numItemsInList +1;
      localStorage.setItem("allMovies", JSON.stringify(state));
    },
    removeFromAllMovies: (state, action) => {
      
    },
    setAllMovies: (state, action) => {
      // Set the initial movie list from the action payload
      // console.log(action.payload);
      state.allMoviesList = action.payload;
      state.numItemsInList = action.payload.length;
  
      // Update local storage
      localStorage.setItem("allMovies", JSON.stringify(state));
    },
  },
});

export const { addToAllMovies, removeFromAllMovies,setAllMovies } = allMovieSlice.actions;

export default allMovieSlice.reducer;



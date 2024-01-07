import { createSlice } from "@reduxjs/toolkit";

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("userIMDB")) || null;
};

const initialState = {
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = { ...action.payload.user};
      state.user = user;
      localStorage.setItem("userIMDB", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("userIMDB");
      localStorage.removeItem("allMovies");
    },
    setFavForUser : (state,action) => {
       const movieToAdd = action.payload;

         // Add the new movie to the favorite movies array
         state.user.favMovie.push(movieToAdd);

         localStorage.setItem("userIMDB", JSON.stringify(state.user));
    },
    removeFavForUser : (state,action) => {
      const movieToRemove = action.payload;

      // Check if the user is logged in and has favorite movies
      if (state.user && state.user.favMovie) {
        // Filter out the movie to be removed from the favorite movies
        const updatedFavMovies = state.user.favMovie.filter(
          (favMovie) => favMovie.id !== movieToRemove.id
        );

        // Update the favorite movies in the user state
        state.user.favMovie = updatedFavMovies;
        
        localStorage.setItem("userIMDB", JSON.stringify(state.user));
      }
    },
  },
});

export const { loginUser, logoutUser, setFavForUser, removeFavForUser } = userSlice.actions;

export default userSlice.reducer;

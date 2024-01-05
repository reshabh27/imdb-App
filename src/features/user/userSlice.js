import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

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
    //   toast.success("Welcome to the E-commerce website", {
    //     position: "top-center",
    //     autoClose: 2000,
    //   });
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("userIMDB");
      localStorage.removeItem("allMovies");
    //   toast.error("you have logged out", {
    //     position: "top-center",
    //     autoClose: 2000,
    //   });
    },
    setFavForUser : (state,action) => {
       const movieToAdd = action.payload;

         // Add the new movie to the favorite movies array
         state.user.favMovie.push(movieToAdd);

         // You may want to update localStorage as well
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
        
        // You may want to update localStorage as well
        localStorage.setItem("userIMDB", JSON.stringify(state.user));
      }
    },
  },
});

export const { loginUser, logoutUser, setFavForUser, removeFavForUser } = userSlice.actions;

export default userSlice.reducer;

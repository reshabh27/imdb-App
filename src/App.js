
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { store } from "./store";

import HomeLayout from './pages/HomeLayout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Landing from './pages/Landing';

import { loader as addMoviesLoader } from "./pages/AddMovies";

import { action as signUpAction } from "./pages/SignUp";
import { action as loginAction } from "./pages/Login";
import Favorite from './pages/Favorite';
import AddMovies from './pages/AddMovies';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "favorite",
        element: <Favorite />,
      },
      {
        path: "addMovies",
        element: <AddMovies />,
        loader: addMoviesLoader(store),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction(store),
  },
  {
    path: "/signup",
    element: <SignUp />,
    action: signUpAction,
  },
]);


function App() {

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

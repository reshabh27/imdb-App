
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { store } from "./store";

import HomeLayout from './pages/HomeLayout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Landing from './pages/Landing';

// import { loader as loginLoader } from "./pages/Login";
// import { loader as signUpLoader } from "./pages/SignUp";

import { action as signUpAction } from "./pages/SignUp";
import { action as loginAction } from "./pages/Login";
import Favorite from './pages/Favorite';
import AddMovies from './pages/AddMovies';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    // errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'favorite',
        element: <Favorite />
      },
      {
        path:'addMovies',
        element: <AddMovies />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
    // loader: loginLoader,
    action: loginAction(store),
    // errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    // loader: signUpLoader,
    action: signUpAction,
    // errorElement: <Error />,
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

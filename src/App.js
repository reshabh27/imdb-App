
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from './pages/HomeLayout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Landing from './pages/Landing';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    // errorElement: <Error />,
    children:[
      {
        index:true,
        element: <Landing />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
    // errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SignUp />,
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

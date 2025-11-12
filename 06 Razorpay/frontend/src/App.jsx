import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";


const router = createBrowserRouter([
  { path: "/", element: <><Navbar /><Home /></> },
  { path: "/signup", element: <><SignUp /></> },
  { path: "/login", element: <><Login /></> }
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;

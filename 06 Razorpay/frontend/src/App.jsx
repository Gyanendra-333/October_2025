import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import Footer from "./components/Footer";


const router = createBrowserRouter([
  { path: "/", element: <><Navbar /><Home /><Footer /></> },
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

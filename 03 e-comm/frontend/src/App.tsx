import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Cart from "./pages/cart/Cart"
import Search from "./pages/search/Search"


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
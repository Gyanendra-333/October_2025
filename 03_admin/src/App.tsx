import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./components/Loader";

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Transaction = lazy(() => import("./pages/transaction/Transaction"));
const Customers = lazy(() => import("./pages/customers/Customers"));
const Products = lazy(() => import("./pages/products/Products"));



const App = () => {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/admin/loader" element={<Loader />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/products" element={<Products />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App;
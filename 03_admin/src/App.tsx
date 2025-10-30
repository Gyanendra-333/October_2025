import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
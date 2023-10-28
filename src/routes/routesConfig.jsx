import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CustomerPage from "../pages/CustomerPage";
import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";
import AuthenticationPage from "../pages/Login";
import Users from "../pages/Users";

function Routers() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AuthenticationPage />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/customers" element={<Customers />}></Route>
          <Route path="/customer" element={<CustomerPage />}></Route>
          <Route path="/users" element={<Users />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default Routers;

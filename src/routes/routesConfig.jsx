/* eslint-disable no-unused-vars */
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CustomerPage from "../pages/CustomerPage";
import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";
import AuthenticationPage from "../pages/Login";
import Users from "../pages/Users";
import RequireAuth from "../components/RequireAuth";


function Routers() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AuthenticationPage />}/>
          <Route element={<RequireAuth allowedRoles={'admin' || 'manager'}/>}>
            <Route path="/dashboard" element={<Dashboard />}/>
          {/* </Route>
          <Route element={<RequireAuth allowedRoles={'admin'}/>}> */}
            <Route path="/customers" element={<Customers />}/>
            <Route path="/customer" element={<CustomerPage />}/>
            <Route path="/users" element={<Users />}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default Routers;

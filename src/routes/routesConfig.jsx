import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CustomerPage from "../pages/CustomerPage";
import Customers from "../pages/Customers";
import AuthenticationPage from "../pages/Login";
import Users from "../pages/Users";

function Routers() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<AuthenticationPage />}></Route>
          <Route exact path="customers" element={<Customers />}></Route>
          <Route exact path="/customer" element={<CustomerPage />}></Route>
          <Route exact path="/users" element={<Users />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default Routers;

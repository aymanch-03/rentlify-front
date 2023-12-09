import { Route, Routes } from "react-router-dom";
import AuthCustomer from "../pages/AuthCustomer";
import AuthenticationPage from "../pages/Login";
import RegisterCustomer from "../pages/RegisterCustomer";
import DashboardRoutes from "./DashboardRoutes";
import MainRoutes from "./MainRoutes";

function Routers() {
  return (
    <div className="App w-full absolute">
      <Routes>
        <Route path="/auth/login" element={<AuthenticationPage />} />
        <Route path="/office/*" element={<DashboardRoutes />} />
        <Route path="/login" element={<AuthCustomer />} />
        <Route path="/register" element={<RegisterCustomer />} />
        <Route path="/*" element={<MainRoutes />} />
      </Routes>
    </div>
  );
}

export default Routers;

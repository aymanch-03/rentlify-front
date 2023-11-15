import { Route, Routes } from "react-router-dom";
import AuthenticationPage from "../pages/Login";
import DashboardRoutes from "./DashboardRoutes";
import MainRoutes from "./MainRoutes";

function Routers() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth/login" element={<AuthenticationPage />} />
        <Route path="/office/*" element={<DashboardRoutes />} />
        <Route path="/*" element={<MainRoutes />} />
      </Routes>
    </div>
  );
}

export default Routers;

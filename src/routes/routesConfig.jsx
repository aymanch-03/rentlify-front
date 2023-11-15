import { Route, Routes } from "react-router-dom";
import AuthenticationPage from "../pages/Login";
import DashboardRoutes from "./DashboardRoutes";

function Routers() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth/login" element={<AuthenticationPage />} />
        <Route path="/*" element={<DashboardRoutes />} />
      </Routes>
    </div>
  );
}

export default Routers;

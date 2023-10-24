import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

function DashboardRoutes() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
    </Routes>
  );
}

export default DashboardRoutes;

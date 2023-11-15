import { Route, Routes } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import MainLayout from "../layouts/MainLayout";
import LandingPage from "../pages/LandingPage";

const DashboardRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </MainLayout>
  );
};

export default DashboardRoutes;

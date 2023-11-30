import { Route, Routes } from "react-router-dom";
import RequireCustomerAuth from "../components/AuthCustomer/RequireCustomerAuth";
import MainLayout from "../layouts/MainLayout";
// import BookingPage from "../pages/BookingPage";
import FilterPage from "../pages/FilterPage";
import LandingPage from "../pages/LandingPage";

const DashboardRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<RequireCustomerAuth />}>
          <Route path="/discover" element={<FilterPage />} />
        </Route>
      </Routes>
    </MainLayout>
  );
};

export default DashboardRoutes;

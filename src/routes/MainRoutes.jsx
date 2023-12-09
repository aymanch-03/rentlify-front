import { Route, Routes } from "react-router-dom";
import RequireCustomerAuth from "../components/AuthCustomer/RequireCustomerAuth";
import MainLayout from "../layouts/MainLayout";
// import BookingPage from "../pages/BookingPage";
import OrderPage from "../components/ProductPage/orderPage";
import FilterPage from "../pages/FilterPage";
import LandingPage from "../pages/LandingPage";
import ProductPage from "../pages/ProductsFront";

const DashboardRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<RequireCustomerAuth />}>
          <Route path="/discover" element={<FilterPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
        </Route>
      </Routes>
    </MainLayout>
  );
};

export default DashboardRoutes;

import { Route, Routes } from "react-router-dom";
import RequireCustomerAuth from "../components/AuthCustomer/RequireCustomerAuth";
import MainLayout from "../layouts/MainLayout";
// import BookingPage from "../pages/BookingPage";
import { default as FilterPage } from "../pages/FilterPage";
import { default as LandingPage } from "../pages/LandingPage";
import ProductPage from "../pages/ProductFront";
import OrderPage from "../pages/orderFront";

const DashboardRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<RequireCustomerAuth />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/discover/listings/:id" element={<ProductPage />} />
          <Route path="/discover/listings" element={<FilterPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
        </Route>
      </Routes>
    </MainLayout>
  );
};

export default DashboardRoutes;

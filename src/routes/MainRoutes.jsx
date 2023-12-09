import { Route, Routes } from "react-router-dom";
import RequireCustomerAuth from "../components/AuthCustomer/RequireCustomerAuth";
import MainLayout from "../layouts/MainLayout";
// import BookingPage from "../pages/BookingPage";
import OrderPage from "../components/ProductPage/orderPage";
import {
  default as FilterPage,
  default as FilterPage,
} from "../pages/FilterPage";
import {
  default as LandingPage,
  default as LandingPage,
} from "../pages/LandingPage";
import ProductPage from "../pages/ProductFront";
import ProductPage from "../pages/ProductsFront";
import OrderPage from "../pages/orderFront";

const DashboardRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<RequireCustomerAuth />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/discover" element={<FilterPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
        </Route>
      </Routes>
    </MainLayout>
  );
};

export default DashboardRoutes;

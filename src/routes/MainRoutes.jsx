import { Route, Routes } from "react-router-dom";
import RequireCustomerAuth from "../components/AuthCustomer/RequireCustomerAuth";
import MainLayout from "../layouts/MainLayout";
import FilterPage from "../pages/FilterPage";
import LandingPage from "../pages/LandingPage";
import ProductPage from "../pages/ProductFront";
import OrderPage from "../pages/orderFront";

const DashboardRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        {/* <Route element={<RequireCustomerAuth />}>
          <Route path="/discover" element={<FilterPage />} />
        </Route> */}

      </Routes>
    </MainLayout>
  );
};

export default DashboardRoutes;

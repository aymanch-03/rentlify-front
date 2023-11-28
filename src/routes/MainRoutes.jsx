import { Route, Routes } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import MainLayout from "../layouts/MainLayout";
import LandingPage from "../pages/LandingPage";
import ProductPage from "../pages/ProductsFront";
import OrderPage from "../components/ProductPage/orderPage";

const DashboardRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
      </Routes>
    </MainLayout>
  );
};

export default DashboardRoutes;

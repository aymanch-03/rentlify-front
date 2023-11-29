import { Route, Routes } from "react-router-dom";
import RequireCustomerAuth from "../components/AuthCustomer/RequireCustomerAuth";
import MainLayout from "../layouts/MainLayout";
import BookingPage from "../pages/BookingPage";
import LandingPage from "../pages/LandingPage";
import ProductPage from "../pages/ProductsFront";
import OrderPage from "../components/ProductPage/orderPage";

const DashboardRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
<<<<<<< HEAD
        <Route path="/product" element={<ProductPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
=======
        <Route element={<RequireCustomerAuth />}>
          <Route path="/discover" element={<BookingPage />} />
        </Route>
>>>>>>> 44f71d319ba5b71b675eee146a4c6fc4af1f1d9e
      </Routes>
    </MainLayout>
  );
};

export default DashboardRoutes;

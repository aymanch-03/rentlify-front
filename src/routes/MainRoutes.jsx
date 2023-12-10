import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import RequireCustomerAuth from "../components/AuthCustomer/RequireCustomerAuth";
import MainLayout from "../layouts/MainLayout";
// import BookingPage from "../pages/BookingPage";
import { Icon } from "@iconify/react";
import RequireOwnListing from "../components/RequireOwnListing";
import AddListing from "../pages/AddListing";
import CustomerProfile from "../pages/CustomerProfile";
import { default as FilterPage } from "../pages/FilterPage";
import { default as LandingPage } from "../pages/LandingPage";
import ProductPage from "../pages/ProductFront";
import UpdateProducts from "../pages/UpdateProducts";
import OrderPage from "../pages/orderFront";
const DashboardRoutes = () => {
  const location = useLocation();
  const id = location.pathname.split("/").pop();

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<RequireCustomerAuth />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/discover/listings/:id" element={<ProductPage />} />
          <Route path="/discover/listings" element={<FilterPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/hosting" element={<CustomerProfile />} />
          <Route element={<RequireOwnListing listing_id={id} />}>
            <Route
              path="/hosting/listing/update/:id"
              element={<UpdateProducts />}
            />
          </Route>
          <Route
            path="/hosting/listing/add-listing"
            element={
              <AddListing
                containerStyles={"max-w-7xl py-6 px-4 lg:px-8 mx-auto"}
                pathToNavigate={"/hosting"}
              />
            }
          />
        </Route>
      </Routes>
    </MainLayout>
  );
};

export default DashboardRoutes;

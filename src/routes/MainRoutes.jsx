import { Route, Routes, useLocation } from "react-router-dom";
import RequireCustomerAuth from "../components/AuthCustomer/RequireCustomerAuth";
import MainLayout from "../layouts/MainLayout";
// import BookingPage from "../pages/BookingPage";
import RequireOwnListing from "../components/RequireOwnListing";
import PaymentSuccess from "../components/payment/success";
import AddListing from "../pages/AddListing";
import CustomerProfile from "../pages/CustomerProfile";
import { default as FilterPage } from "../pages/FilterPage";
import { default as LandingPage } from "../pages/LandingPage";
import ListingPage from "../pages/ListingPage";
import ProfileDetails from "../pages/ProfileDetails";
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
          <Route path="/discover/listings" element={<FilterPage />} />
          <Route path="/discover/listings/:id" element={<ListingPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/hosting" element={<CustomerProfile />} />
          <Route path="/profile" element={<ProfileDetails />} />
          <Route path="/completion" element={<PaymentSuccess />} />
          <Route element={<RequireOwnListing listing_id={id} />}>
            <Route
              path="/hosting/listing/update/:id"
              element={
                <UpdateProducts
                  containerStyles={"max-w-7xl py-6 px-4 lg:px-8 mx-auto"}
                  pathToNavigate={"/hosting"}
                />
              }
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

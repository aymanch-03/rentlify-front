import { Route, Routes } from "react-router-dom";
import OfficeListingDetails from "../components/ProductPage/OfficeListingDetails";
import RequireAuth from "../components/RequireAuth";
import UserProfile from "../components/Users/userProfile";
import OfficeLayout from "../layouts/OfficeLayout";
import AddListing from "../pages/AddListing";
import CategoriesPage from "../pages/Categories";
import CustomerDetails from "../pages/CustomerDetails";
import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";
import Listings from "../pages/Listings";
import OrderPage from "../pages/Order";
import Profile from "../pages/Profile";
import UpdateProducts from "../pages/UpdateProducts";
import Users from "../pages/Users";
import Subcategories from "../pages/subcategories";
import OrderDetails from "../components/order/orderDetails";

const DashboardRoutes = () => {
  return (
    <OfficeLayout>
      <Routes>
        <Route element={<RequireAuth allowedRoles={["admin", "manager"]} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<CustomerDetails />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserProfile />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/subcategories" element={<Subcategories />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<OfficeListingDetails />} />
          <Route
            path="/listings/update-listing/:id"
            element={
              <UpdateProducts
                containerStyles="container space-y-8 sm:p-8 p-4"
                pathToNavigate={"/office/listings"}
              />
            }
          />
          <Route
            path="/listings/add-listing"
            element={
              <AddListing
                containerStyles="container space-y-8 sm:p-8 p-4"
                pathToNavigate={"/office/listings"}
              />
            }
          />
        </Route>
      </Routes>
    </OfficeLayout>
  );
};

export default DashboardRoutes;

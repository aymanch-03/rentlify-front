import { Route, Routes } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import UserProfile from "../components/Users/userProfile";
import OfficeLayout from "../layouts/OfficeLayout";
import CustomerPage from "../pages/CustomerPage";
import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";
import OrderPage from "../pages/Order";
import Profile from "../pages/Profile";
import Users from "../pages/Users";

const DashboardRoutes = () => {
  return (
    <OfficeLayout>
      <Routes>
        <Route element={<RequireAuth allowedRoles={["admin", "manager"]} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customer" element={<CustomerPage />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserProfile />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </OfficeLayout>
  );
};

export default DashboardRoutes;

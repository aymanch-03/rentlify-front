import { Route, Routes } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import Layout from "../layouts/Layout";
import CustomerPage from "../pages/CustomerPage";
import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";
import OrderPage from "../pages/Order";
import Users from "../pages/Users";

const DashboardRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route element={<RequireAuth allowedRoles={["admin", "manager"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="orders" element={<OrderPage />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default DashboardRoutes;

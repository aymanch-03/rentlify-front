import { Route, Routes } from "react-router-dom";
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
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="orders" element={<OrderPage />} />
        <Route path="customer" element={<CustomerPage />} />
        <Route path="users" element={<Users />} />
      </Routes>
    </Layout>
  );
};

export default DashboardRoutes;

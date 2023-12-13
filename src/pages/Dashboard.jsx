/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpandedStats from "../components/Dashboard/ExpandedStats";
import Stats from "../components/Dashboard/Stats";
import { useSidebar } from "../context/SidebarProvider";
import { listCustomers } from "../redux/reducers/customerSlice";
import { listOrders } from "../redux/reducers/orderSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const { sidebar } = useSidebar();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([dispatch(listCustomers()), dispatch(listOrders())]);
      // Additional logic after fetching customers and orders
    };

    fetchData();
  }, [dispatch]);

  const customers = useSelector((state) => state.customers?.data || []);
  const orders = useSelector((state) => state.orders?.data || []);
  const shippedOrders = orders.filter(
    (order) => order?.status === "Paid" || order?.status === "Closed"
  );

  const totalRevenue = shippedOrders.reduce(
    (total, order) => total + (order?.order_item.total_with_fees || 0),
    0
  );
  const totalProfit = totalRevenue / 10;

  const stats = [
    {
      name: "Total Revenue",
      value: `${new Intl.NumberFormat("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(totalRevenue)} MAD`,
      change: "solar:arrow-up-linear",
      changeType: "positive",
    },
    {
      name: "Total Profit",
      value: `${new Intl.NumberFormat("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(totalProfit)} MAD`,
      change: "solar:arrow-up-linear",
      changeType: "positive",
    },
    {
      name: "Total Customers",
      value: customers.length,
      change: "solar:arrow-down-linear",
      changeType: "negative",
    },
    {
      name: "Total Reservations",
      value: orders.length,
      change: "solar:arrow-up-linear",
      changeType: "positive",
    },
  ];
  return (
    <>
      <Stats stats={stats} classNames={classNames} />
      <ExpandedStats
        orders={orders}
        customers={customers}
        totalProfit={totalProfit.toFixed(0)}
      />
    </>
  );
}

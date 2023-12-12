/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpandedStats from "../components/Dashboard/ExpandedStats";
import Stats from "../components/Dashboard/Stats";
import { useSidebar } from "../context/SidebarProvider";
import Layout from "../layouts/OfficeLayout";
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

  console.log(shippedOrders);

  const totalRevenue = shippedOrders.reduce(
    (total, order) => total + (order?.order_item.total_with_fees || 0),
    0
  );
  const totalProfit = totalRevenue / 10;

  const stats = [
    {
      name: "Total Revenue",
      value: `${totalRevenue} MAD`,
      change: "+4.75%",
      changeType: "positive",
    },
    {
      name: "Total Profit",
      value: `${totalProfit.toFixed(0)} MAD`,
      change: "+2.02%",
      changeType: "positive",
    },
    {
      name: "Total Customers",
      value: customers.length,
      change: "+1.39%",
      changeType: "positive",
    },
    {
      name: "Total Orders",
      value: orders.length,
      change: "-10.18%",
      changeType: "negative",
    },
  ];
  return (
    <>
      <Stats stats={stats} classNames={classNames} />
      <ExpandedStats orders={orders} totalProfit={totalProfit.toFixed(0)} />
    </>
  );
}

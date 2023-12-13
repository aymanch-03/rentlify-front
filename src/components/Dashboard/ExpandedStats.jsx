/* eslint-disable react/prop-types */
/* eslint-disable no-prototype-builtins */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataFormatted } from "../../lib/helpers";
import { listOrders } from "../../redux/reducers/orderSlice";
import CustAndOrderSkeleton from "../ui/CustAndOrderSkeleton";
import ChartsSkeleton from "../ui/chartsSkeleton";
import CostChart from "./DataCharts/CostChart";
import CustomersAndOrders from "./DataCharts/CustomersAndOrders";
import OrderChart from "./DataCharts/OrderChart";
import RecentOrders from "./RecentOrders";

const ExpandedStats = ({ orders, customers, totalProfit }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.orders.loading);

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch, isLoading]);
  const dataByDay = {};
  const data7Days = [];
  const data14Days = [];
  const labels = [];
  const today = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  getDataFormatted(
    orders,
    "orders",
    dataByDay,
    data7Days,
    data14Days,
    labels,
    today,
    daysOfWeek
  );

  const totalData7Days = data7Days.reduce((a, b) => a + b, 0);
  const totalData14Days = data14Days.reduce((a, b) => a + b, 0);

  const percentageIncrease =
    ((totalData7Days - totalData14Days) / totalData14Days) * 100;

  const ordersData = data7Days.reverse();
  const chartLabels = labels.reverse();
  return (
    <>
      <div className="border-b border-gray-900/10 relative">
        <section className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-4 lg:px-2 xl:px-0 isolate">
          {isLoading ? (
            <ChartsSkeleton />
          ) : (
            <OrderChart
              dbData={ordersData}
              totalOrders={totalData7Days}
              dates={chartLabels}
              percentage={percentageIncrease.toFixed(2)}
            />
          )}
          {isLoading ? (
            <ChartsSkeleton
              className={"md:border-l border-t md:border-t-0 border-gray-900/5"}
            />
          ) : (
            <CostChart
              dbData={ordersData}
              dates={chartLabels}
              totalProfit={totalProfit}
            />
          )}
          {/* <CostChart dbData={orderData7Days} dates={labels.reverse()} /> */}
        </section>
      </div>
      <div className="border-b border-gray-900/10 relative">
        <section className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-3 lg:px-2 xl:px-0  isolate">
          <RecentOrders />
          {isLoading ? (
            <CustAndOrderSkeleton />
          ) : (
            <CustomersAndOrders orders={orders} customers={customers} />
          )}
        </section>
      </div>
    </>
  );
};

export default ExpandedStats;

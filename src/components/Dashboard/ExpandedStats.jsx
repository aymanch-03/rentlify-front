/* eslint-disable no-prototype-builtins */
import axios from "axios";
import { useEffect, useState } from "react";
import { getDataFormatted } from "../../lib/chartData";
import ChartsSkeleton from "../ui/chartsSkeleton";
import CostChart from "./DataCharts/CostChart";
import CustomersAndOrders from "./DataCharts/CustomersAndOrders";
import OrderChart from "./DataCharts/OrderChart";
import RecentOrders from "./RecentOrders";

const ExpandedStats = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:5000/v1/orders")
      .then((response) => {
        const { data } = response.data;
        setOrders(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

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
              percentage={percentageIncrease}
            />
          )}
          {/* {isLoading ? (
            <ChartsSkeleton
              className={"md:border-l border-t md:border-t-0 border-gray-900/5"}
            />
          ) : (
            <CostChart dbData={ordersData} dates={chartLabels} />
          )} */}
          {/* <CostChart dbData={orderData7Days} dates={labels.reverse()} /> */}
        </section>
      </div>
      <div className="border-b border-gray-900/10 relative">
        <section className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-3 lg:px-2 xl:px-0  isolate">
          <RecentOrders />
          <CustomersAndOrders />
        </section>
      </div>
    </>
  );
};

export default ExpandedStats;

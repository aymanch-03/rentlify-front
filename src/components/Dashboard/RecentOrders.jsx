import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecentOrdersSkeleton from "../ui/recentOrdersSkeleton";
import OrdersTable from "./DataCharts/OrdersTable";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:5000/v1/orders", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "auth token",
        },
      })
      .then((response) => {
        const { data } = response.data;
        setOrders(data.slice(0, 4));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="col-span-2 flex flex-col gap-5 px-4 py-10 sm:px-6 xl:px-8">
      {isLoading ? (
        <RecentOrdersSkeleton />
      ) : (
        <>
          <div className="flex flex-col justify-between whitespace-nowrap">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-6 text-gray-500">
                Recent Orders
              </p>
              <Link
                to="/orders"
                className="text-sm font-medium leading-6 text-blue-500 hover:text-blue-600 cursor-pointer hover:underline transition-all"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="grid">
            <OrdersTable orders={orders} />
          </div>
        </>
      )}
    </div>
  );
};

export default RecentOrders;

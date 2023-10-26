import axios from "axios";
import { useEffect, useState } from "react";
import getColumns from "../components/ui/columns";
import DataTable from "../components/ui/data-table";
import UserNav from "../components/ui/user-nav";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/v1/orders")
      .then((response) => {
        const { data } = response.data;
        setOrders(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(orders);
  const columns = getColumns({
    keyOne: "_id",
    keyOneTitle: "Order ID",
    keyTwo: "customer_id",
    keyTwoTitle: "Customer ID",
    keyThree: "status",
    keyThreeTitle: "Order status",
    keyFour: "createdAt",
    keyFive: "cart_total_price",
    keyFiveTitle: "Total price",
    option: "orders",
  });
  return (
    <div className="container h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            {"Here's"} a list of your orders!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
      <div className="">
        <DataTable data={orders} columns={columns} />
      </div>
    </div>
  );
};

export default OrderPage;

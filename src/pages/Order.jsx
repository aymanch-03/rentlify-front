import axios from "axios";
import { useEffect, useState } from "react";
import getColumns from "../components/ui/columns";
import DataTable from "../components/ui/data-table";

const OrderPage = () => {
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
  const columns = getColumns({
    keyOne: "_id",
    keyOneTitle: "Order ID",
    keyTwo: "customer_id",
    keyTwoTitle: "Customer email",
    keyThree: "status",
    keyThreeTitle: "Order status",
    keyFour: "createdAt",
    keyFive: "cart_total_price",
    keyFiveTitle: "Total price",
    option: "orders",
  });

  return (
    <>
      <div className="container h-full flex-1 flex-col space-y-8 sm:p-8 p-4 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              {"Here's"} a list of your orders!
            </p>
          </div>
        </div>

        <DataTable data={orders} columns={columns} isLoading={isLoading} />
      </div>
    </>
  );
};

export default OrderPage;

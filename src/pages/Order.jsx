// import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import getColumns from "../components/ui/columns";
import DataTable from "../components/ui/data-table";
import UserNav from "../components/ui/user-nav";
import {ListOrders} from "../redux/reducers/orderReducer";

const OrderPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders.data);
  const isloading = useSelector((state) => state.orders.loading);
  console.log(orders);

  useEffect(() => {
    dispatch(ListOrders());
  }, [dispatch]);
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
    <div className="container h-full flex-1 flex-col space-y-8 sm:p-8 p-4 flex">
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

      <DataTable data={orders} columns={columns} isLoading={isloading} />
    </div>
  );
};

export default OrderPage;

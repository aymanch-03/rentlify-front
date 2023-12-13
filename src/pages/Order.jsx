import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getColumns from "../components/ui/columns";
import DataTable from "../components/ui/data-table";
import { listOrders } from "../redux/reducers/orderSlice";

const OrderPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.data);
  const isLoading = useSelector((state) => state.orders.isLoading);
  const [orderId, setOrderId] = useState("");

  const getOrderId = (row) => {
    const order = row.original._id;
    setOrderId(order);
  };
  const columns = getColumns({
    keyOne: "_id",
    keyOneTitle: "Reservation ID",
    keyTwo: "customer_id",
    keyTwoTitle: "Customer email",
    keyThree: "status",
    keyThreeTitle: "Reservation Status",
    keyFour: "createdAt",
    keyFourTitle: "Created At",
    keyFive: "order_item",
    keyFiveTitle: "Total price",
    option: "orders",
    onUserHover: getOrderId,
    path: `${orderId}`,
  });
  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  return (
    <>
      <div className="container h-full flex-1 flex-col space-y-8 sm:p-8 p-4 flex3">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Reservations Management
            </h2>
            <p className="text-muted-foreground">
              {"Here's"} a list of all reservations!
            </p>
          </div>
        </div>

        <DataTable
          data={orders}
          columns={columns}
          isLoading={isLoading}
          option="orders"
        />
      </div>
    </>
  );
};

export default OrderPage;

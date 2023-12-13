/* eslint-disable react/prop-types */
import { orderStatuses } from "../../../data/data";
import { Badge } from "../../ui/badge";

const OrdersTable = ({ orders }) => {
  const getStatus = (order) => {
    const status = orderStatuses.find(
      (status) => status.value === order.status
    );
    if (!status) {
      return null;
    }
    return (
      <div className="flex w-[100px] items-center">
        {status.icon && (
          <status.icon className={`mr-2 h-4 w-4 ${status.color}`} />
        )}
        <Badge
          variant="outline"
          className={`font-medium ${status.badgeStyles}`}
        >
          {status.label}
        </Badge>
      </div>
    );
  };
  return (
    <div className="relative overflow-x-auto rounded-sm border">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase border-b border-gray-900/10">
          <tr className="">
            <th scope="col" className="font-semibold px-6 py-3">
              Reservation ID
            </th>
            <th scope="col" className="font-semibold px-6 py-3">
              Customer
            </th>
            <th scope="col" className="font-semibold px-6 py-3">
              Status
            </th>
            <th scope="col" className="font-semibold px-6 py-3">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={index}
              >
                <td className="px-6 py-4">
                  <Badge variant={"outline"} className={"font-medium"}>
                    {order._id}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={"outline"} className={"font-medium"}>
                    {order.customer_id._id}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  {getStatus(order)}
                  {/* <Badge variant={"outline"}>{order.status}</Badge> */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="font-medium text-black/90">{`${new Intl.NumberFormat(
                    "de-DE",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  ).format(order.order_item.total_with_fees)} MAD`}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;

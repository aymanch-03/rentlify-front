import { Link } from "react-router-dom";
import OrdersTable from "./DataCharts/OrdersTable";

const RecentOrders = () => {
  return (
    <div className="col-span-2 flex flex-col gap-5 px-4 py-10 sm:px-6 xl:px-8">
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
        <OrdersTable />
      </div>
    </div>
  );
};

export default RecentOrders;

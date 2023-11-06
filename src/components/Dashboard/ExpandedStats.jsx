import CostChart from "./DataCharts/CostChart";
import CustomersAndOrders from "./DataCharts/CustomersAndOrders";
import OrderChart from "./DataCharts/OrderChart";
import RecentOrders from "./RecentOrders";

const ExpandedStats = () => {
  return (
    <>
      <div className="border-b border-gray-900/10 relative">
        <section className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-4 lg:px-2 xl:px-0 isolate">
          <OrderChart />
          <CostChart />
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

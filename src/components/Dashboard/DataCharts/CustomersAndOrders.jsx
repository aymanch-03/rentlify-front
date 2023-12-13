/* eslint-disable react/prop-types */
import BarChart from "../BarChart";
function createChartOptions(backgroundColor) {
  return {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false,
    },
    spanGaps: false,
    tension: 0.3,
    fill: true,
    backgroundColor: backgroundColor,
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            family: "'Poppins', sans-serif",
            weight: "100",
          },
        },
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: true,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };
}
const CustomersAndOrders = ({ orders, customers }) => {
  const orderChartOptions = createChartOptions("rgba(0, 119, 182, 0.9)");
  const customerChartOptions = createChartOptions("rgba(6, 214, 160,0.9)");

  const ordersData = {
    labels: Array.from({ length: 24 }, (_, i) => i + 1),
    datasets: [
      {
        data: Array.from(
          { length: 24 },
          (_, i) =>
            orders.filter((order) => {
              const orderDate = new Date(order.createdAt);
              const startOfCurrentHour = new Date();
              startOfCurrentHour.setSeconds(0, 0);
              startOfCurrentHour.setMinutes(
                startOfCurrentHour.getMinutes() - i * 60
              );
              const endOfCurrentHour = new Date(startOfCurrentHour);
              endOfCurrentHour.setMinutes(endOfCurrentHour.getMinutes() + 60);
              return (
                orderDate >= startOfCurrentHour && orderDate < endOfCurrentHour
              );
            }).length
        ),
        borderColor: "rgba(6, 214, 160,1)",
        borderWidth: 0,
        barPercentage: 0.93,
        categoryPercentage: 0.93,
        minBarLength: 1,
      },
    ],
  };

  // Calculate customers per hour
  const customersData = {
    labels: Array.from({ length: 24 }, (_, i) => i + 1),
    datasets: [
      {
        data: Array.from(
          { length: 24 },
          (_, i) =>
            customers.filter((customer) => {
              const customerDate = new Date(customer.createdAt);
              const startOfCurrentHour = new Date();
              startOfCurrentHour.setSeconds(0, 0);
              startOfCurrentHour.setMinutes(
                startOfCurrentHour.getMinutes() - i * 60
              );
              const endOfCurrentHour = new Date(startOfCurrentHour);
              endOfCurrentHour.setMinutes(endOfCurrentHour.getMinutes() + 60);
              return (
                customerDate >= startOfCurrentHour &&
                customerDate < endOfCurrentHour
              );
            }).length
        ),
        borderColor: "rgba(6, 214, 160,1)",
        borderWidth: 0,
        barPercentage: 0.93,
        categoryPercentage: 0.93,
        minBarLength: 1,
      },
    ],
  };

  return (
    <div className="col-span-1 md:border-l border-t md:border-t-0 border-gray-900/5 px-4 py-10 sm:px-6 xl:px-8">
      <div className="flex flex-col justify-between whitespace-nowrap">
        <div>
          <p className="text-sm font-medium leading-6 text-gray-500">
            Customers in last 24 hours
          </p>
          <span className="text-xs font-normal leading-6 text-gray-400">
            Customers per hour
          </span>
        </div>
      </div>
      <div className="grid mt-2">
        <BarChart
          options={customerChartOptions}
          data={customersData}
          className={"!h-[80px]"}
        />
      </div>
      <div className="flex flex-col justify-between whitespace-nowrap mt-6">
        <div>
          <p className="text-sm font-medium leading-6 text-gray-500">
            Orders in last 24 hours
          </p>
          <span className="text-xs font-normal leading-6 text-gray-400">
            Orders per hour
          </span>
        </div>
      </div>
      <div className="grid mt-2">
        <BarChart
          options={orderChartOptions}
          data={ordersData}
          className={"!h-[80px]"}
        />
      </div>
    </div>
  );
};

export default CustomersAndOrders;

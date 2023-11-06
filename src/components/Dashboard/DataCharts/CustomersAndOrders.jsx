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
          display: false,
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
const CustomersAndOrders = () => {
  const orderChartOptions = createChartOptions("rgba(0, 119, 182, 0.9)");
  const customerChartOptions = createChartOptions("rgba(6, 214, 160,0.9)");
  const ordersData = {
    labels: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ],

    datasets: [
      {
        data: [
          1, 8, 4, 10, 4, 7, 7, 1, 3, 5, 2, 2, 7, 7, 4, 5, 4, 7, 2, 1, 2, 7, 4,
          6, 5, 7, 6, 2, 5, 6,
        ],
        borderColor: "rgba(6, 214, 160,1)",
        borderWidth: 0,
        barPercentage: 0.93,
        categoryPercentage: 0.93,
        minBarLength: 1,
      },
    ],
  };
  const customersData = {
    labels: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ],

    datasets: [
      {
        data: [
          3, 8, 4, 10, 4, 4, 4, 1, 3, 5, 2, 2, 7, 7, 4, 5, 10, 7, 2, 1, 2, 7,
          10, 6, 5, 7, 6, 9, 5, 6,
        ],
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
            Customers in last 30 minutes
          </p>
          <span className="text-xs font-normal leading-6 text-gray-400">
            Customers per minute
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
            Orders in last 30 minutes
          </p>
          <span className="text-xs font-normal leading-6 text-gray-400">
            Orders per minute
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

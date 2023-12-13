import { Icons } from "../../ui/icons";
import LineChart from "../LineChart";

// eslint-disable-next-line react/prop-types
const OrderChart = ({ dbData, totalOrders, dates, percentage, isLoading }) => {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false,
    },
    tension: 0.3,
    fill: true,

    backgroundColor: (context) => {
      const gradientColor = [
        "rgba(6, 214, 160,0.7)",
        "rgba(6, 214, 160,0.4)",
        "#fff",
      ];
      const { chartArea, ctx } = context.chart;
      if (!context.chart.chartArea) {
        return;
      }

      const gradientBg = ctx.createLinearGradient(
        0,
        chartArea.top,
        0,
        chartArea.bottom
      );
      gradientBg.addColorStop(0, gradientColor[0]);
      gradientBg.addColorStop(0.2, gradientColor[1]);
      gradientBg.addColorStop(1, gradientColor[2]);
      return gradientBg;
    },

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
        // display: false,
        display: true,
        ticks: {
          font: {
            size: 10,
            family: "'Poppins', sans-serif",
          },
        },
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
  const data = {
    labels: dates,

    datasets: [
      {
        data: dbData,
        borderColor: "rgba(6, 214, 160,1)",
        borderWidth: 3,
      },
    ],
  };
  return (
    <div className="col-span-2 grid grid-cols-3 px-4 py-10 sm:px-6 xl:px-8">
      <div className="col-span-1 flex flex-col justify-between whitespace-nowrap">
        <div>
          <p className="text-sm font-medium leading-6 text-gray-500">
            Total Reservations
          </p>
          <p className="text-xs font-normal leading-6 text-gray-400">
            Last 7 days
          </p>
        </div>
        <div>
          <p className="text-3xl font-medium leading-10 tracking-tight text-gray-900">
            {isLoading ? (
              <Icons.spinner className="mr-2 h-6 w-6 animate-spin" />
            ) : (
              totalOrders
            )}
          </p>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              <span
                className={`text-xs font-medium ${
                  percentage >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {percentage >= 0 && !isLoading
                  ? `+${percentage}%`
                  : `${percentage}%`}
              </span>
              <span className="text-xs font-normal leading-6 text-gray-400 pl-1">
                vs last 7 days
              </span>
            </>
          )}
        </div>
      </div>
      <div className="col-span-2 grid">
        <LineChart
          className={"justify-self-end"}
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default OrderChart;

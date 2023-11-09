/* eslint-disable react/prop-types */
import "chart.js/auto";
import { useRef } from "react";
import { Line } from "react-chartjs-2";

function LineChart({ className, data, options }) {
  const ref = useRef();

  return <Line ref={ref} data={data} options={options} className={className} />;
}

export default LineChart;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "chart.js/auto"; // ADD THIS
import { useRef, useState } from "react";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

function LineChart({ className, data, options }) {
  const ref = useRef();

  return <Line ref={ref} data={data} options={options} className={className} />;
}

export default LineChart;

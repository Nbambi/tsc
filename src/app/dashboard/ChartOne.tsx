"use client";

import React from "react";
import { Chart } from "primereact/chart";

export default function ChartOne() {
  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#000",
          font: {
            size: 10,
            weight: "normal",
          },
        },
        grid: {
          color: "transparent",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#000",
          font: {
            size: 10,
            weight: "normal",
          },
        },
        grid: {
          color: "#EFEFEF",
        },
      },
    },
  };

  const chartData = {
    labels: ["05/30", "05/31", "06/01", "06/02", "06/03", "06/04", "06/05"],
    datasets: [
      {
        data: [25, 15, 18, 38, 20, 37, 24],
        backgroundColor: "#883cae",
        borderColor: "#883cae",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Chart type="bar" data={chartData} options={chartOptions} />
      <span className="chart-panel-info purple">Today&apos;s Order</span>
    </>
  );
}

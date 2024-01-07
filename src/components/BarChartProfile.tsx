import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { PullRequestContributionsByRepository } from "@/types/github";

Chart.register(CategoryScale);

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
};

function BarDiagram({
  data,
}: {
  data: PullRequestContributionsByRepository[];
}) {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Most Contributed Repositories",
        font: {
          size: 20,
          weight: "bold",
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: 14,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
          font: {
            size: 14,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    responsiveAnimationDuration: 0,
  };

  const chartData: ChartData = {
    labels: [],
    datasets: [
      {
        label: "Total Contributions",
        data: [],
        backgroundColor: "grey",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  data?.forEach((item) => {
    chartData.labels.push(item.repository.name);
    chartData.datasets[0].data.push(item.contributions.totalCount);
  });

  return (
    <div className="chart-container" style={{ width: "80%", height: "400px" }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default BarDiagram;

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: number[];
  labels: string[];
}

const PieChart: React.FC<PieChartProps> = ({ data, labels }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Status dos Agendamentos",
        data: data,
        backgroundColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw} agendamentos`;
          },
        },
      },
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          color: "rgb(255, 99, 132)",
          font: {
            size: 16,
            family: "Poppins",
          },
          padding: 20,
          usePointStyle: true,
        },
      },
    },
    cutout: "50%",
  };

  return (
    <div className="mt-5">
      <Pie
        data={chartData}
        options={options}
        height={undefined}
        width={undefined}
      />
    </div>
  );
};

export default PieChart;

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
        borderColor: "#999",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            let value = tooltipItem.raw || 0;
            return `${
              tooltipItem.label
            }: ${value.toLocaleString()} agendamentos`;
          },
        },
      },
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          color: "#333",
          font: { size: 14, family: "Poppins" },
          padding: 20,
          usePointStyle: true,
          generateLabels: function (chart: any) {
            let data = chart.data.datasets[0].data;
            return chart.data.labels!.map((label: any, i: any) => ({
              text: `${label}: ${data[i]}`,
              fillStyle: chart.data.datasets[0].backgroundColor[i],
              hidden: false,
              index: i,
            }));
          },
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: number[];
  labels: string[];
}

const PieChart: React.FC<PieChartProps> = ({
  data = [1],
  labels = ["Sem dados"],
}) => {
  const total = data.reduce((acc, val) => acc + val, 0) || 1;

  const chartData = {
    labels: labels.length > 0 ? labels : ["Sem dados"],
    datasets: [
      {
        label: "Status dos Agendamentos",
        data: data.length > 0 ? data : [1],
        backgroundColor: [
          "rgb(31, 73, 241)",
          "rgb(248, 231, 42)",
          "rgb(241, 80, 80)",
          "rgb(120, 120, 120)",
          "rgb(13, 139, 8)",
        ],
        borderColor: "#999",
        borderWidth: 1,
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
            let percentage = ((value / total) * 100).toFixed(1);
            return `${tooltipItem.label}: ${value} agendamentos (${percentage}%)`;
          },
        },
      },
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          color: "#333",
          font: { size: 12, family: "Poppins" },
          padding: 20,
          usePointStyle: true,
          generateLabels: function (chart: any) {
            let data = chart.data.datasets[0].data;
            return chart.data.labels!.map((label: any, i: any) => {
              let percentage = ((data[i] / total) * 100).toFixed(1);
              return {
                text: `${label}: ${data[i]} (${percentage}%)`,
                fillStyle: chart.data.datasets[0].backgroundColor[i],
                hidden: false,
                index: i,
              };
            });
          },
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;

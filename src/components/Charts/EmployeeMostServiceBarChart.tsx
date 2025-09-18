import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface EmployeeMostServiceBarChartProps {
  labels: string[];
  data: number[];
}

const EmployeeMostServiceBarChart: React.FC<EmployeeMostServiceBarChartProps> = ({ labels, data }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Quantidade de Serviços",
        data: data,
        backgroundColor: "#129ff0",
        borderColor: "#129ff0",
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
            return `Qtd. de Serviços: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "Funcionários",
        },
      },
      y: {
        title: {
          display: true,
          text: "Qtd. de Serviços",
        },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default EmployeeMostServiceBarChart;

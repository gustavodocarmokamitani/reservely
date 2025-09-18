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
import { formatCurrencyBRL } from "../../services/system/globalService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface EmployeePerformanceBarChartProps {
  labels: string[];
  data: number[];
}

const EmployeePerformanceBarChart: React.FC<EmployeePerformanceBarChartProps> = ({ labels, data }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Receita Total (R$)",
        data: data,
        backgroundColor: "#4baf2c",
        borderColor: "#4baf2c",
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
            return `Receita: R$: ${formatCurrencyBRL(tooltipItem.raw)}`;
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
          text: "Receita (R$)",
        },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default EmployeePerformanceBarChart;

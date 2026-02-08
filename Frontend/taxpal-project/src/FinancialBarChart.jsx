import {Chart as ChartJS,BarElement,CategoryScale,LinearScale,Tooltip,Legend} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);
const FinancialBarChart = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.label),
    datasets: [
      {
        label: "Income",
        data: data.map(d => d.income),
        backgroundColor: "#22c55e",
        barThickness: 14
      },
      {
        label: "Expenses",
        data: data.map(d => d.expense),
        backgroundColor: "#ef4444",
        barThickness: 9
      }
    ]
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 12 }
        },
        categoryPercentage:0.2, 
        barPercentage: 0.8  
      },
      y: {
        grid: {
          color: "#e5e7eb"
        },
        ticks: {
          font: { size: 12 }
        }
      }
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          font: { size: 12 }
        }
      }
    }
  };
  return (
    <div style={{ height: "220px", width: "100%" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default FinancialBarChart;
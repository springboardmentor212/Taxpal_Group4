import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./FinancialPieChart.css";
ChartJS.register(ArcElement, Tooltip, Legend);
const ExpensePieChart = ({ transactions }) => {
  const categoryTotals = {};
  transactions.forEach((t) => {
    if (t.type === "Expense") {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + Number(t.amount);
    }
  });
  const labels = Object.keys(categoryTotals);
  const values = Object.values(categoryTotals);
  if (labels.length === 0) {
    return (
      <div className="expenses-empty">
        <p>No expense data</p>
      </div>
    );
  }
  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#3b82f6",
          "#22c55e",
          "#facc15",
          "#f97316",
          "#a855f7",
          "#ef4444",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
            const value = ctx.raw;
            const percent = ((value / total) * 100).toFixed(1);
            return `${ctx.label}: ${percent}%`;
          },
        },
      },
    },
  };
  return (
    <div className="pie-chart-wrapper">
      <Pie data={chartData} options={options} />
    </div>
  );
};
export default ExpensePieChart;
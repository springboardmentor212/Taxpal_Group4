import { Line } from "react-chartjs-2";
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Tooltip,Legend} from "chart.js";
import "./IncomeExpenseChart.css";
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Tooltip,Legend);
function IncomeExpenseChart({ transactions, month }) {
  const filtered = transactions.filter((t) => t.date.startsWith(month));
  const groupedData = {};
  filtered.forEach((t) => {
    if (!groupedData[t.date]) {
        groupedData[t.date] = { income: 0, expense: 0 };
    }
    if (t.type === "Income") {
        groupedData[t.date].income += t.amount;
    }
    else {
        groupedData[t.date].expense += t.amount;
    }
  });
  const labels = Object.keys(groupedData).sort();
  const incomeData = labels.map((d) => groupedData[d].income);
  const expenseData = labels.map((d) => groupedData[d].expense);
  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        borderColor: "green",
        backgroundColor: "rgba(0,128,0,0.2)",
        tension: 0.4
      },
      {
        label: "Expense",
        data: expenseData,
        borderColor: "red",
        backgroundColor: "rgba(255,0,0,0.2)",
        tension: 0.4
      }
    ]
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  if (filtered.length === 0) {
    return <p className="no-chart-data">No chart data available for this month.</p>;
  }
  return (
    <div className="income-expense-chart-container">
      <h3>Income vs Expense</h3>
      <Line data={data} options={options} />
    </div>
  );
}
export default IncomeExpenseChart;
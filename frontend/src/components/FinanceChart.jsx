import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const barData = [
  { month: "Jan", income: 5000, expense: 2500 },
  { month: "Feb", income: 4200, expense: 2200 },
  { month: "Mar", income: 6500, expense: 3000 },
  { month: "Apr", income: 5800, expense: 2800 },
  { month: "May", income: 7200, expense: 3500 },
];

const pieData = [
  { name: "Savings", value: 4250 },
  { name: "Expenses", value: 3000 },
  { name: "Tax", value: 750 },
];

const COLORS = ["#6366F1", "#EC4899", "#22C55E"];

const FinanceChart = () => {
  return (
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* BAR CHART */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
        <h3 className="text-xl font-bold mb-4">
          Income vs Expenses
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="income" fill="#6366F1" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expense" fill="#EC4899" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PIE CHART */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-xl font-bold mb-4">
          Expense Breakdown
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex justify-center gap-4 mt-4 text-sm">
          {pieData.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: COLORS[i] }}
              />
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinanceChart;

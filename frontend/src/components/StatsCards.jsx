const stats = [
  {
    title: "Total Income",
    value: "₹4,80,000",
    sub: "+12% this month",
  },
  {
    title: "Total Expenses",
    value: "₹2,10,000",
    sub: "-5% this month",
  },
  {
    title: "Estimated Tax",
    value: "₹68,000",
    sub: "FY 2025",
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition"
        >
          <p className="text-sm text-slate-500">{item.title}</p>
          <h2 className="text-3xl font-extrabold mt-2 text-slate-900">
            {item.value}
          </h2>
          <p className="text-sm mt-1 text-indigo-600">{item.sub}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;

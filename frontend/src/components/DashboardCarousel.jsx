import { useState } from "react";
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

/* ================= DATA ================= */

const barData = [
  { name: "Jan", income: 5000, expenses: 2000 },
  { name: "Feb", income: 4200, expenses: 1800 },
  { name: "Mar", income: 6100, expenses: 2500 },
  { name: "Apr", income: 5600, expenses: 2300 },
  { name: "May", income: 7200, expenses: 3000 },
];

const pieData = [
  { name: "Savings", value: 4250 },
  { name: "Tax", value: 750 },
];

const COLORS = ["#6366f1", "#ec4899"];
const slides = ["charts", "ai", "reports"];

/* ================= COMPONENT ================= */

const DashboardCarousel = () => {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 relative">

        {/* LEFT ARROW */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100"
        >
          ‹
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100"
        >
          ›
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-12 min-h-[460px]">

          {/* ================= CHARTS ================= */}
          {slides[index] === "charts" && (
            <>
              <h3 className="text-3xl font-extrabold mb-2">
                Charts & Analytics
              </h3>
              <p className="text-slate-500 mb-10">
                Visual insights into income, expenses & savings
              </p>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="bg-slate-50 rounded-2xl p-6">
                  <p className="font-semibold mb-4">Monthly Overview</p>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={barData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="income" fill="#6366f1" radius={[6,6,0,0]} />
                      <Bar dataKey="expenses" fill="#22c55e" radius={[6,6,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 flex flex-col items-center">
                  <p className="font-semibold mb-4">Savings Split</p>
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label
                      >
                        {pieData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {/* ================= AI ================= */}
          {slides[index] === "ai" && (
            <>
              <h3 className="text-3xl font-extrabold mb-2">
                AI Assistance
              </h3>
              <p className="text-slate-500 mb-10">
                Smart tax-saving tips powered by AI
              </p>

              <div className="max-w-xl mx-auto space-y-4">
                <div className="bg-indigo-50 p-5 rounded-xl">
                  🤖 <b>Save ₹12,000</b> by investing in 80C
                </div>
                <div className="bg-indigo-50 p-5 rounded-xl">
                  📊 Expenses increased 8% this month
                </div>
                <div className="bg-indigo-50 p-5 rounded-xl">
                  💡 Consider ELSS funds for tax efficiency
                </div>
              </div>
            </>
          )}

          {/* ================= REPORTS ================= */}
          {slides[index] === "reports" && (
            <>
              <h3 className="text-3xl font-extrabold mb-2">
                Reports & Exports
              </h3>
              <p className="text-slate-500 mb-10">
                Download reports or export financial data
              </p>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="bg-indigo-50 p-6 rounded-2xl flex justify-between items-center">
                  <div>
                    <p className="font-semibold">📄 Tax Summary (PDF)</p>
                    <p className="text-sm text-slate-500">Professional report</p>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
                    Download
                  </button>
                </div>

                <div className="bg-emerald-50 p-6 rounded-2xl flex justify-between items-center">
                  <div>
                    <p className="font-semibold">📊 Financial Data (CSV)</p>
                    <p className="text-sm text-slate-500">Raw data export</p>
                  </div>
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg">
                    Export
                  </button>
                </div>
              </div>
            </>
          )}

          {/* DOTS (CLICKABLE) */}
          <div className="flex justify-center gap-2 mt-10">
            {slides.map((_, i) => (
              <span
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  index === i ? "bg-indigo-600 scale-110" : "bg-slate-300"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default DashboardCarousel;

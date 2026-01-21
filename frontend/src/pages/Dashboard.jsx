import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCards from "../components/StatsCards";
import FinanceChart from "../components/FinanceChart";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <main className="p-6">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Overview of your finances
          </p>

          <StatsCards />
          <FinanceChart /> {/* 🔥 REAL CHARTS */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

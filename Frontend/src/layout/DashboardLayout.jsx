import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
  <div className="max-w-6xl mx-auto">{children}</div>
</main>

    </div>
  );
};

export default DashboardLayout;

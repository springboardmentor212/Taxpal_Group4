const Sidebar = () => {
  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-white border-r px-6 py-6">
      <h1 className="text-xl font-bold mb-8">TaxPal</h1>

      <nav className="space-y-4 text-gray-700">
        <p className="cursor-pointer">Dashboard</p>
        <p className="cursor-pointer">Transactions</p>
        <p className="cursor-pointer">Budgets</p>
        <p className="font-semibold text-blue-600 cursor-pointer">
          Tax Estimator
        </p>
        <p className="cursor-pointer">Reports</p>
      </nav>

      <div className="absolute bottom-6 left-6 text-sm">
        <p className="font-medium">User</p>
        <p className="text-gray-500">user@gmail.com</p>
      </div>
    </div>
  );
};

export default Sidebar;

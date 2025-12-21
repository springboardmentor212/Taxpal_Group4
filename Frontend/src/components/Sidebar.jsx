import { LayoutGrid, Wallet, FileText, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6">
        <h1 className="text-2xl font-bold text-gray-900">TaxPal</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 px-3 text-gray-600">
        <NavItem icon={<LayoutGrid size={18} />} label="Dashboard" />
        <NavItem icon={<Wallet size={18} />} label="Transactions" />
        <NavItem
          icon={<FileText size={18} />}
          label="Budgets"
          active
        />
        <NavItem icon={<Settings size={18} />} label="Reports" />
      </nav>

      {/* User */}
      <div className="mt-auto px-6 py-4 border-t text-sm text-gray-500">
        <div className="font-medium text-gray-800">User</div>
        <div className="text-xs">user@example.com</div>
      </div>
    </aside>
  );
};

const NavItem = ({ icon, label, active }) => {
  return (
    <button
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition
        ${
          active
            ? "bg-blue-50 text-blue-700 font-semibold"
            : "hover:bg-gray-50 hover:text-gray-900"
        }`}
    >
      {icon}
      {label}
    </button>
  );
};

export default Sidebar;

import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `block px-4 py-3 rounded-lg font-medium ${
      pathname === path
        ? "bg-indigo-600 text-white"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <aside className="w-64 bg-white border-r p-6 hidden md:block">
      <h2 className="text-xl font-extrabold mb-8">
        Tax<span className="text-indigo-600">Pal</span>
      </h2>

      <nav className="space-y-2">
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          Dashboard
        </Link>
        <Link to="/settings" className={linkClass("/settings")}>
          Settings
        </Link>
        <Link to="/login" className="block px-4 py-3 text-red-500">
          Logout
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;

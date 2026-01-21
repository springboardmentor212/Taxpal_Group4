import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
            T
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Tax<span className="text-indigo-600">Pal</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-indigo-600 transition">
            Features
          </a>
          <a href="#pricing" className="hover:text-indigo-600 transition">
            Pricing
          </a>
          <a href="#resources" className="hover:text-indigo-600 transition">
            Resources
          </a>
          <a href="#security" className="hover:text-indigo-600 transition">
            Security
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition"
          >
            Sign in
          </Link>

          <Link
            to="/signup"
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Navbar;

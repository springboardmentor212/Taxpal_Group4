const Topbar = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <h1 className="font-semibold text-slate-800">
        Welcome back 👋
      </h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-600">User</span>
        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
          U
        </div>
      </div>
    </header>
  );
};

export default Topbar;

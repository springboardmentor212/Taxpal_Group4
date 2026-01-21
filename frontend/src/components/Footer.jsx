const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="text-sm text-slate-500">
            © 2025 <span className="font-semibold text-slate-700">TaxPal</span>.
            All Rights Reserved.
          </div>

          {/* Right */}
          <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <a
              href="#"
              className="hover:text-indigo-600 transition"
            >
              Instagram
            </a>
            <a
              href="#"
              className="hover:text-indigo-600 transition"
            >
              X (Twitter)
            </a>
            <a
              href="#"
              className="hover:text-indigo-600 transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

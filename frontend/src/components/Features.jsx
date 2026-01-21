const features = [
  {
    title: "Real-time Visualizations",
    desc: "Dynamic charts that update instantly as you add income or expenses.",
    icon: "📊",
  },
  {
    title: "Budget Planning",
    desc: "Set monthly limits and track spending health visually.",
    icon: "💰",
  },
  {
    title: "AI Financial Guidance",
    desc: "Smart chatbot assistance for tax and finance questions.",
    icon: "🤖",
  },
  {
    title: "2025 Tax Slabs",
    desc: "Always updated with the latest government tax rules.",
    icon: "📑",
  },
  {
    title: "PDF Reports",
    desc: "Download clean, professional financial reports.",
    icon: "⬇️",
  },
  {
    title: "Secure Authentication",
    desc: "Google & GitHub login with JWT-based sessions.",
    icon: "🔐",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Everything you need in one place
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Designed to simplify finance, budgeting, and tax estimation for
            freelancers and individuals.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 p-8 hover:shadow-lg transition bg-slate-50"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {f.title}
              </h3>
              <p className="text-slate-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

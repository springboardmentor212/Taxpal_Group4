import DashboardCarousel from "../components/DashboardCarousel";
import CountUp from "../components/CountUp";

const LandingPage = () => {
  return (
    <div className="bg-slate-50">

      {/* ================= HERO SECTION ================= */}
      <section className="pt-28 pb-32 text-center px-6">
        <span className="inline-block mb-4 px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 font-medium">
          Want to estimate your tax in minutes?
        </span>

        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
          Tax estimation <br />
          <span className="text-indigo-600">made simple.</span>
        </h1>

        <p className="max-w-2xl mx-auto mt-6 text-lg text-slate-600">
          Built for freelancers and individuals to track income, manage
          expenses, and estimate taxes easily.
        </p>

        <div className="flex justify-center gap-4 mt-10">
          <a
            href="/signup"
            className="px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold hover:scale-105 transition"
          >
            Get Started
          </a>

          <a
            href="#dashboard"
            className="px-8 py-4 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
          >
            View Dashboard
          </a>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            Everything you need in one place
          </h2>

          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            Designed to simplify finance, budgeting, and tax estimation for
            freelancers and individuals.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              { title: "Real-time Visualizations", desc: "Dynamic charts that update instantly as you add income or expenses.", icon: "📊" },
              { title: "Budget Planning", desc: "Set monthly limits and track spending health visually.", icon: "💰" },
              { title: "AI Financial Guidance", desc: "Smart chatbot assistance for tax and finance questions.", icon: "🤖" },
              { title: "2025 Tax Slabs", desc: "Always updated with the latest government tax rules.", icon: "📄" },
              { title: "PDF Reports", desc: "Download clean, professional financial reports.", icon: "⬇️" },
              { title: "Secure Authentication", desc: "Google & GitHub login with JWT-based sessions.", icon: "🔒" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl p-8 text-left hover:-translate-y-1 hover:shadow-xl transition"
              >
                <div className="text-3xl">{item.icon}</div>
                <h3 className="mt-4 font-semibold text-lg">{item.title}</h3>
                <p className="mt-2 text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DASHBOARD PREVIEW ================= */}
      <section id="dashboard" className="py-24 bg-slate-50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900">
            Experience the Dashboard
          </h2>
          <p className="text-slate-600 mt-4">
            See how complex tax data becomes simple, clear, and actionable.
          </p>
        </div>

        <DashboardCarousel />
      </section>

      {/* ================= STATS (AUTO COUNT) ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">

          <div>
            <h3 className="text-5xl font-extrabold text-indigo-600">
              <CountUp end={10000} suffix="+" />
            </h3>
            <p className="mt-2 text-slate-600">Active Users</p>
          </div>

          <div>
            <h3 className="text-5xl font-extrabold text-teal-600">
              <CountUp end={5} suffix="+" />
            </h3>
            <p className="mt-2 text-slate-600">
              Cr Financial Data Analyzed
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-extrabold text-pink-600">
              <CountUp end={99} suffix="%" />
            </h3>
            <p className="mt-2 text-slate-600">Security Score</p>
          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-700 to-purple-700 text-white p-16 text-center shadow-xl">
            <h2 className="text-4xl font-extrabold">
              Ready to master your taxes?
            </h2>
            <p className="mt-4 text-indigo-100">
              Join thousands of users who have simplified their financial life
              with TaxPal.
            </p>

            <div className="flex justify-center gap-4 mt-10">
              <a
                href="/login"
                className="px-8 py-4 rounded-full bg-white text-indigo-700 font-semibold"
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="px-8 py-4 rounded-full bg-indigo-500 text-white font-semibold"
              >
                Create Free Account
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-8 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} TaxPal. All rights reserved.
      </footer>

    </div>
  );
};

export default LandingPage;

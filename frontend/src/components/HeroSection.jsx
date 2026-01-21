import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold">
          Want to estimate your tax in minutes?
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
          Tax estimation <br />
          <span className="text-indigo-600">made simple.</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-12">
          Built for freelancers and individuals to track income, manage
          expenses, and estimate taxes easily.
        </p>

        {/* CTA BUTTON (FIXED) */}
        <button
          onClick={() => navigate("/login")}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-indigo-600 text-white text-lg font-semibold hover:bg-indigo-700 transition"
        >
          Continue →
        </button>

      </div>
    </section>
  );
};

export default HeroSection;

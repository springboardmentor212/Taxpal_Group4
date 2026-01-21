import { useNavigate } from "react-router-dom";

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-700 text-white px-10 py-20 text-center shadow-2xl">

          {/* Glow effects */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/30 rounded-full blur-[120px]" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-400/20 rounded-full blur-[120px]" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Ready to master your taxes?
            </h2>

            <p className="text-slate-200 max-w-xl mx-auto mb-10 text-lg">
              Join thousands of users who have simplified their financial life
              with TaxPal.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-lg hover:scale-105 transition"
              >
                Sign In
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="px-8 py-4 rounded-full bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 hover:scale-105 transition"
              >
                Create Free Account
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

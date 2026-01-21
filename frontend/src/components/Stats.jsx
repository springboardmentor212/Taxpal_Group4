import { useEffect, useRef, useState } from "react";

const StatItem = ({ value, label, color }) => {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = value;
          const duration = 1200;
          const step = Math.max(1, Math.floor(end / (duration / 16)));

          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);

          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className={`text-5xl font-extrabold ${color}`}>
        {count.toLocaleString()}
        {label.includes("%") ? "%" : "+"}
      </div>
      <div className="mt-2 text-slate-600 font-medium">{label}</div>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="py-24 bg-white border-t border-b">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        <StatItem
          value={10000}
          label="Active Users"
          color="text-indigo-600"
        />
        <StatItem
          value={5}
          label="Cr Financial Data Analyzed"
          color="text-cyan-600"
        />
        <StatItem
          value={99}
          label="% Security Score"
          color="text-fuchsia-600"
        />
      </div>

      <p className="mt-10 text-center text-xs text-slate-400">
        Numbers animate on scroll
      </p>
    </section>
  );
};

export default Stats;

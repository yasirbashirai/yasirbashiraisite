import { useEffect, useRef, useState } from "react";
import Section from "./Section";

const stats = [
  { target: 800, suffix: "+", label: "Projects Completed" },
  { target: 5, suffix: "", label: "Years of Experience" },
  { target: 98, suffix: "%", label: "Client Satisfaction Rate" },
  { target: 10, suffix: "×", label: "Faster Than Traditional Agencies" },
];

const CountUp = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          const tick = () => {
            current += step;
            if (current >= target) {
              setCount(target);
            } else {
              setCount(Math.floor(current));
              requestAnimationFrame(tick);
            }
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-heading font-extrabold text-5xl md:text-6xl gradient-text">
      {count}{suffix}
    </span>
  );
};

const StatsSection = () => (
  <Section id="stats" className="py-12 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="glass-card p-6 md:p-8 text-center flex flex-col items-center gap-3">
            <CountUp target={s.target} suffix={s.suffix} />
            <span className="text-foreground/80 text-sm md:text-base font-medium">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

export default StatsSection;

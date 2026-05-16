import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Section from "./Section";

const items = [
  { icon: "📉", label: "Revenue Rollercoaster", desc: "$5K month then $1K month" },
  { icon: "🙏", label: "Living on Referrals", desc: "Praying clients magically appear" },
  { icon: "📭", label: "Zero Outreach Game", desc: "No prospecting system at all" },
  { icon: "📦", label: "Trapped in Delivery", desc: "No time to work ON the business" },
  { icon: "💸", label: "Can't Afford SDRs", desc: "Tools + salaries too expensive" },
  { icon: "📧", label: "Generic Messages Ignored", desc: "0.5% reply rate (ouch!)" },
];

const stressData: Record<number, { emoji: string; face: string; message: string }> = {
  0: { emoji: "😎", face: "Chill", message: "You're Chill — But let's keep it that way" },
  1: { emoji: "🙂", face: "Okay", message: "Looking okay — But there's room to improve" },
  2: { emoji: "😐", face: "Hmm", message: "Mild Stress — Time to build systems" },
  3: { emoji: "😟", face: "Worried", message: "Getting Serious — You need automation" },
  4: { emoji: "😰", face: "Stressed", message: "High Stress — Action Needed NOW!" },
  5: { emoji: "🤯", face: "Overwhelmed", message: "CRITICAL — Your business is bleeding!" },
  6: { emoji: "🚨", face: "DANGER", message: "🚨 DANGER — Book a call RIGHT NOW!" },
};

const RealityCheck = () => {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const count = checked.size;
  const pct = Math.round((count / 6) * 100);

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const barColor = count <= 1 ? "hsl(152, 69%, 46%)" : count <= 3 ? "hsl(38, 92%, 50%)" : "hsl(0, 72%, 51%)";
  const stress = stressData[count] || stressData[0];

  return (
    <Section id="reality-check" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground text-center mb-3">
          ⚡ Brutal Honesty Time
        </h2>
        <p className="text-muted-foreground text-center mb-10">
          Check every box that describes your reality. No sugar-coating. 😤
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`glass-card p-4 text-left cursor-pointer transition-all ${
                checked.has(i) ? "!border-primary !bg-primary/10" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                  checked.has(i) ? "border-primary bg-primary" : "border-muted-foreground"
                }`}>
                  {checked.has(i) && <span className="text-xs text-primary-foreground">✓</span>}
                </span>
                <div>
                  <span className="font-heading font-bold text-foreground">{item.icon} {item.label}</span>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Stress Meter with emoji */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-heading font-bold text-foreground">Your Agency Stress Level:</span>
            <span className="font-heading font-bold text-foreground">{pct}%</span>
          </div>
          <div className="w-full h-4 rounded-full bg-muted overflow-hidden mb-4 relative">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: barColor }}
            />
            {/* Emoji indicator on bar */}
            <span
              className="absolute top-1/2 -translate-y-1/2 text-xl transition-all duration-500"
              style={{ left: `${Math.max(pct - 3, 2)}%` }}
            >
              {stress.emoji}
            </span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl transition-all duration-300" style={{ transform: count >= 4 ? "scale(1.3)" : "scale(1)" }}>
              {stress.emoji}
            </span>
            <div className="text-center">
              <p className="font-heading font-bold text-foreground text-lg">{stress.face}</p>
              <p className="text-sm text-muted-foreground">{stress.message}</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="https://cal.com/yasir-bashir-bp4wob/30min" target="_blank" rel="noopener noreferrer" className="btn-gradient text-base">
            Fix This With a Free AI Audit <ArrowRight className="w-4 h-4 btn-icon" />
          </a>
        </div>
      </div>
    </Section>
  );
};

export default RealityCheck;

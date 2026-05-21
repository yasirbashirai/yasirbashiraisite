import { useState } from "react";
import { Lock, Unlock, ChevronDown } from "lucide-react";
import Section from "./Section";

const struggles = [
  "No consistent lead flow, feast or famine every month",
  "Manual follow-ups eating hours of your day",
  "AI tools bought but nothing connected or working",
  "Team dependent on you for every single decision",
  "Missed leads because of slow response times",
  "No clarity on what marketing is actually working",
];

const solutions = [
  "AI Lead Engine, automated funnel captures leads 24/7",
  "CRM automation follows up instantly, forever",
  "n8n/Make workflows connecting all your tools",
  "SOPs + automations that run without you",
  "AI chatbot responds in seconds, qualifies & books",
  "Analytics dashboard showing real ROI per channel",
];

const StrugglesVsSolutions = () => {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <Section id="struggles" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Animated arrow pointing down */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 rounded-full bg-white border border-primary/20 flex items-center justify-center shadow-soft" style={{ animation: "bounce-arrow 1.5s ease-in-out infinite" }}>
            <ChevronDown className="w-6 h-6 text-primary" />
          </div>
        </div>

        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground text-center mb-3 leading-tight">
          The Problems Holding You Back
        </h2>
        <p className="text-foreground/70 text-center mb-10 text-lg">
          (And The Systems That Fix Them)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Struggles, primary gradient background */}
          <div
            className="relative rounded-3xl p-6 md:p-8 grain-bg overflow-hidden shadow-card-hover"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 100%)",
            }}
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gold-light/25 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <h3 className="font-heading font-bold text-xl text-white mb-6">❌ What&apos;s Keeping You Stuck</h3>
              <ul className="space-y-3.5">
                {struggles.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/90 text-base leading-relaxed">
                    <span className="text-gold-light font-bold mt-0.5 shrink-0">{i + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Solutions, white card */}
          <div className="relative rounded-3xl p-6 md:p-8 bg-white border border-primary/15 shadow-card grain-bg">
            <h3 className="font-heading font-bold text-xl text-primary mb-6">✅ The Systems That Fix This</h3>
            <div className={`transition-all duration-500 ${unlocked ? "" : "blur-md select-none"}`}>
              <ul className="space-y-3.5">
                {solutions.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/85 text-base leading-relaxed">
                    <span className="text-primary font-bold mt-0.5 shrink-0">{i + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {!unlocked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 rounded-3xl">
                <Lock className="w-12 h-12 text-primary mb-4" />
                <button
                  onClick={() => setUnlocked(true)}
                  className="hero-cta-primary cursor-pointer"
                >
                  <span className="hero-cta-inner">🔓 Unlock My Solutions</span>
                </button>
              </div>
            )}
            {unlocked && (
              <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
                <Unlock className="w-4 h-4" /> Solutions unlocked!
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default StrugglesVsSolutions;

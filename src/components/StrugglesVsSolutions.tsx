import { useState } from "react";
import { Lock, Unlock, ChevronDown } from "lucide-react";
import Section from "./Section";

const struggles = [
  "No consistent lead flow — feast or famine every month",
  "Manual follow-ups eating hours of your day",
  "AI tools bought but nothing connected or working",
  "Team dependent on you for every single decision",
  "Missed leads because of slow response times",
  "No clarity on what marketing is actually working",
];

const solutions = [
  "AI Lead Engine — automated funnel captures leads 24/7",
  "CRM automation follows up instantly, forever",
  "n8n/Make workflows connecting all your tools",
  "SOPs + automations that run without you",
  "AI chatbot responds in seconds, qualifies & books",
  "Analytics dashboard showing real ROI per channel",
];

const StrugglesVsSolutions = () => {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <Section id="struggles" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Animated arrow pointing down */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center" style={{ animation: "bounce-arrow 1.5s ease-in-out infinite" }}>
            <ChevronDown className="w-6 h-6 text-primary" />
          </div>
        </div>

        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground text-center mb-4">
          The Problems Holding You Back
        </h2>
        <p className="text-muted-foreground text-center mb-12">
          (And The Systems That Fix Them)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Struggles */}
          <div className="glass-card p-6 md:p-8">
            <h3 className="font-heading font-bold text-lg text-destructive mb-6">❌ What's Keeping You Stuck</h3>
            <ul className="space-y-4">
              {struggles.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-destructive mt-0.5 shrink-0">{i + 1}.</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="glass-card p-6 md:p-8 relative">
            <h3 className="font-heading font-bold text-lg text-success mb-6">✅ The Systems That Fix This</h3>
            <div className={`transition-all duration-500 ${unlocked ? "" : "blur-md select-none"}`}>
              <ul className="space-y-4">
                {solutions.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-success mt-0.5 shrink-0">{i + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {!unlocked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <Lock className="w-12 h-12 text-primary mb-4" />
                <button onClick={() => setUnlocked(true)} className="btn-glass text-base cursor-pointer">
                  🔓 Unlock My Solutions
                </button>
              </div>
            )}
            {unlocked && (
              <div className="mt-4 flex items-center gap-2 text-success text-sm">
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

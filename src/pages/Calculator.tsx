import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, ArrowLeft, Calculator, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const fmt = (n: number, prefix = "$") =>
  prefix + Math.round(n).toLocaleString("en-US");
const fmtDec = (n: number) => n.toFixed(1);

interface SliderDef {
  key: string;
  label: string;
  emoji: string;
  min: number;
  max: number;
  step: number;
  defaultVal: number;
  prefix?: string;
  suffix?: string;
  helper?: string;
  group: string;
}

const sliders: SliderDef[] = [
  { key: "monthlyRevenue", label: "Current monthly revenue", emoji: "💰", min: 500, max: 100000, step: 500, defaultVal: 5000, prefix: "$", suffix: " / month", group: "BUSINESS BASICS", helper: "Your average monthly revenue right now" },
  { key: "teamSize", label: "Number of employees or team members", emoji: "👥", min: 1, max: 50, step: 1, defaultVal: 3, group: "BUSINESS BASICS", helper: "Include yourself, freelancers, VAs" },
  { key: "hourlyCost", label: "Average hourly cost per person", emoji: "⏱️", min: 5, max: 150, step: 5, defaultVal: 15, prefix: "$", suffix: "/hr", group: "BUSINESS BASICS", helper: "Include salary, tools, benefits" },
  { key: "manualHours", label: "Hours/week on manual repetitive tasks", emoji: "🔄", min: 0, max: 80, step: 1, defaultVal: 20, suffix: " hrs/week", group: "TIME LEAK AUDIT", helper: "Data entry, copy-paste, follow-ups, scheduling, reporting" },
  { key: "leadChaseHours", label: "Hours/week chasing leads & following up", emoji: "📞", min: 0, max: 40, step: 1, defaultVal: 10, suffix: " hrs/week", group: "TIME LEAK AUDIT" },
  { key: "missedLeadHours", label: "Hours/week lost to slow responses & missed leads", emoji: "😓", min: 0, max: 30, step: 1, defaultVal: 8, suffix: " hrs/week", group: "TIME LEAK AUDIT" },
  { key: "monthlyLeads", label: "Leads or inquiries you receive per month", emoji: "📥", min: 0, max: 500, step: 5, defaultVal: 30, group: "LEAD & REVENUE LEAKS" },
  { key: "conversionRate", label: "What % of leads become paying clients?", emoji: "🎯", min: 1, max: 80, step: 1, defaultVal: 15, suffix: "%", group: "LEAD & REVENUE LEAKS" },
  { key: "avgClientValue", label: "Average value per client", emoji: "💵", min: 100, max: 10000, step: 100, defaultVal: 500, prefix: "$", group: "LEAD & REVENUE LEAKS" },
  { key: "responseRate", label: "% of leads you respond to within 1 hour", emoji: "⚡", min: 0, max: 100, step: 1, defaultVal: 20, suffix: "%", group: "LEAD & REVENUE LEAKS", helper: "78% of clients go with whoever responds FIRST" },
  { key: "toolSpend", label: "Monthly software & tools spend", emoji: "🛠️", min: 0, max: 5000, step: 50, defaultVal: 300, prefix: "$", group: "OPERATIONAL OVERHEAD" },
  { key: "adSpend", label: "Monthly marketing & ad budget", emoji: "📢", min: 0, max: 20000, step: 100, defaultVal: 500, prefix: "$", group: "OPERATIONAL OVERHEAD" },
  { key: "contentHours", label: "Hours/week creating content manually", emoji: "📱", min: 0, max: 30, step: 1, defaultVal: 8, suffix: " hrs/week", group: "OPERATIONAL OVERHEAD" },
];

const defaultState: Record<string, number> = {};
sliders.forEach((s) => (defaultState[s.key] = s.defaultVal));

function calculate(s: Record<string, number>) {
  const weeklyManualCost = (s.manualHours + s.leadChaseHours) * s.teamSize * s.hourlyCost;
  const monthlyLeadLoss = s.monthlyLeads * (1 - s.responseRate / 100) * 0.3 * s.avgClientValue;
  const leadsLostPerMonth = Math.round(s.monthlyLeads * (1 - s.responseRate / 100) * 0.3);
  const hoursWastedPerYear = (s.manualHours + s.leadChaseHours + s.contentHours) * 52;
  const annualLoss = weeklyManualCost * 52 + monthlyLeadLoss * 12;

  const hoursSavedPerMonth = (s.manualHours + s.leadChaseHours + s.contentHours) * 4 * 0.85;
  const additionalMonthlyRevenue = s.monthlyLeads * 0.4 * (s.conversionRate / 100) * s.avgClientValue;
  const adEfficiencyGain = s.adSpend * 0.35;
  const teamProductivityHours = (s.manualHours + s.leadChaseHours) * s.teamSize * 0.8 * 4;
  const annualGain = (additionalMonthlyRevenue + adEfficiencyGain + hoursSavedPerMonth * s.hourlyCost) * 12;

  const totalInvestmentYear1 = 1497 + 497 * 12;
  const roi = Math.round(((annualGain - 497 * 12 - 1497) / totalInvestmentYear1) * 100);
  const breakEvenWeeks = annualGain > 0 ? parseFloat((1497 / (annualGain / 52)).toFixed(1)) : 999;
  const fiveYearValue = Math.round(annualGain * 5 - totalInvestmentYear1);
  const lossPerSecond = annualLoss / 365 / 24 / 3600;

  return {
    weeklyManualCost, monthlyLeadLoss, leadsLostPerMonth,
    hoursWastedPerYear, annualLoss, hoursSavedPerMonth,
    additionalMonthlyRevenue, adEfficiencyGain, teamProductivityHours,
    annualGain, roi, breakEvenWeeks, fiveYearValue, lossPerSecond,
  };
}

const AnimNum = ({ value, prefix = "$", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const [display, setDisplay] = useState(value);
  const raf = useRef<number>(0);
  const prev = useRef(value);

  useEffect(() => {
    const start = prev.current;
    const startTime = performance.now();
    const dur = 500;
    const animate = (t: number) => {
      const p = Math.min((t - startTime) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(start + (value - start) * eased);
      if (p < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    prev.current = value;
    return () => cancelAnimationFrame(raf.current);
  }, [value]);

  return <>{prefix}{Math.round(display).toLocaleString("en-US")}{suffix}</>;
};

const CalcSlider = ({ def, value, onChange }: { def: SliderDef; value: number; onChange: (v: number) => void }) => {
  const pct = ((value - def.min) / (def.max - def.min)) * 100;
  const displayVal = (def.prefix || "") + value.toLocaleString("en-US") + (def.suffix || "");

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-foreground font-medium">
          <span className="mr-1.5">{def.emoji}</span>{def.label}
        </label>
        <span className="text-sm font-heading font-bold text-primary min-w-[80px] text-right">{displayVal}</span>
      </div>
      <input
        type="range"
        min={def.min}
        max={def.max}
        step={def.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="calc-slider w-full"
        style={{
          background: `linear-gradient(to right, hsl(var(--primary)) ${pct}%, hsl(var(--secondary)) ${pct}%)`,
        }}
      />
      {def.helper && <p className="text-xs text-muted-foreground mt-1">{def.helper}</p>}
    </div>
  );
};

const Metric = ({ label, tooltip, children, color = "text-foreground" }: { label: string; tooltip: string; children: React.ReactNode; color?: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="flex items-center justify-between py-2 border-b border-border/40 cursor-help">
        <span className="text-sm text-foreground/75">{label}</span>
        <span className={`font-heading font-bold text-base ${color}`}>{children}</span>
      </div>
    </TooltipTrigger>
    <TooltipContent side="left" className="max-w-[250px] text-xs">{tooltip}</TooltipContent>
  </Tooltip>
);

const CalculatorPage = () => {
  const [state, setState] = useState<Record<string, number>>({ ...defaultState });
  const [ticker, setTicker] = useState(0);
  const [copied, setCopied] = useState(false);
  const tickerRef = useRef<ReturnType<typeof setInterval>>();

  const results = calculate(state);

  const update = useCallback((key: string, val: number) => {
    setState((p) => ({ ...p, [key]: val }));
    setTicker(0);
  }, []);

  useEffect(() => {
    clearInterval(tickerRef.current);
    tickerRef.current = setInterval(() => {
      setTicker((p) => p + results.lossPerSecond / 10);
    }, 100);
    return () => clearInterval(tickerRef.current);
  }, [results.lossPerSecond]);

  const share = () => {
    const text = `My AI ROI Results:\n💸 Annual Loss Without AI: ${fmt(results.annualLoss)}\n🚀 Projected Annual Gain: ${fmt(results.annualGain)}\n📈 First-Year ROI: ${results.roi}%\n⏱️ Break-even: ${fmtDec(results.breakEvenWeeks)} weeks\n\nCalculate yours, yasirbashir.com/calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const groups: Record<string, SliderDef[]> = {};
  sliders.forEach((s) => {
    if (!groups[s.group]) groups[s.group] = [];
    groups[s.group].push(s);
  });

  const roiPct = Math.min(Math.max(results.roi, 0), 1000);
  const roiBarWidth = Math.min((roiPct / 1000) * 100, 100);

  return (
    <div className="min-h-screen relative bg-background">
      <div className="grid-background" aria-hidden="true" />
      <Navbar />

      <main className="relative z-10 pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="glass-pill text-sm font-heading font-bold uppercase tracking-widest text-primary mb-4 inline-flex">
              <Calculator className="w-4 h-4" /> Free ROI Calculator
            </span>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 mb-4 leading-tight">
              Find out exactly how much<br />
              your business is{" "}
              <span className="font-serif-italic gradient-text">losing without AI.</span>
            </h1>
            <p className="text-foreground/75 text-base md:text-lg max-w-2xl mx-auto">
              Drop in your real numbers. Watch your ROI calculate in real time. No fluff, just data.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT: Inputs */}
            <div className="lg:col-span-7 rounded-3xl bg-card border border-border shadow-card p-6 md:p-8 grain-bg">
              <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-1">
                📊 Your current business reality
              </h2>
              <p className="text-sm text-foreground/70 mb-6">Drag the sliders to match your situation</p>

              {Object.entries(groups).map(([groupName, fields]) => (
                <div key={groupName} className="mb-6">
                  <p className="text-xs font-heading font-bold uppercase tracking-widest text-primary mb-4 border-b border-primary/15 pb-2">
                    {groupName}
                  </p>
                  {fields.map((f) => (
                    <CalcSlider key={f.key} def={f} value={state[f.key]} onChange={(v) => update(f.key, v)} />
                  ))}
                </div>
              ))}
            </div>

            {/* RIGHT: Results */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="rounded-3xl bg-card border border-border shadow-card p-6 sticky top-24 grain-bg">
                <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-1">
                  ⚡ Your AI-powered results
                </h2>
                <p className="text-sm text-foreground/70 mb-5">Updates in real time as you adjust.</p>

                {/* LOSSES */}
                <div className="rounded-xl border border-destructive/25 bg-destructive/[0.06] p-4 mb-4">
                  <h3 className="text-sm font-heading font-bold text-destructive mb-3">❌ What you&apos;re losing right now</h3>
                  <Metric label="💸 Revenue lost to manual work weekly" tooltip="(Manual + lead chase hrs) × team × hourly cost" color="text-destructive">
                    <AnimNum value={results.weeklyManualCost} />/wk
                  </Metric>
                  <Metric label="📉 Revenue lost from slow response" tooltip="Leads × (1 - response rate) × 30% × avg client value" color="text-destructive">
                    <AnimNum value={results.monthlyLeadLoss} />/mo
                  </Metric>
                  <Metric label="🚫 Qualified leads lost monthly" tooltip="Leads × (1 - response rate) × 30%" color="text-warning">
                    <AnimNum value={results.leadsLostPerMonth} prefix="" suffix=" leads" />
                  </Metric>
                  <Metric label="⌛ Hours wasted per year" tooltip="(Manual + lead chase + content hrs) × 52 weeks" color="text-warning">
                    <AnimNum value={results.hoursWastedPerYear} prefix="" suffix=" hrs" />
                  </Metric>
                  <div className="mt-3 pt-3 border-t border-destructive/20 text-center">
                    <p className="text-xs text-foreground/65 mb-1">🔥 Total annual revenue loss</p>
                    <p className="font-heading font-extrabold text-2xl md:text-3xl text-destructive animate-pulse">
                      <AnimNum value={results.annualLoss} />/yr
                    </p>
                  </div>
                </div>

                {/* GAINS */}
                <div className="rounded-xl border border-success/25 bg-success/[0.06] p-4 mb-4">
                  <h3 className="text-sm font-heading font-bold text-success mb-3">✅ With Yasir&apos;s AI systems</h3>
                  <Metric label="⏱️ Hours saved per month" tooltip="(Manual + lead chase + content) × 4 weeks × 85%" color="text-success">
                    <AnimNum value={results.hoursSavedPerMonth} prefix="" suffix=" hrs" />
                  </Metric>
                  <Metric label="📈 Revenue from instant AI response" tooltip="Leads × 40% capture × conversion × client value" color="text-success">
                    <AnimNum value={results.additionalMonthlyRevenue} />/mo
                  </Metric>
                  <Metric label="🎯 Better ROI from ad spend" tooltip="Ad spend × 35% efficiency improvement" color="text-success">
                    <AnimNum value={results.adEfficiencyGain} />/mo
                  </Metric>
                  <Metric label="👥 Team hours freed monthly" tooltip="(Manual + lead chase) × team × 80% × 4 weeks" color="text-success">
                    <AnimNum value={results.teamProductivityHours} prefix="" suffix=" hrs" />
                  </Metric>
                  <div className="mt-3 pt-3 border-t border-success/20 text-center">
                    <p className="text-xs text-foreground/65 mb-1">🚀 Projected additional annual revenue</p>
                    <p className="font-heading font-extrabold text-2xl md:text-3xl text-success">
                      <AnimNum value={results.annualGain} />/yr
                    </p>
                  </div>
                </div>

                {/* ROI SUMMARY — primary tint */}
                <div className="rounded-xl border border-primary/25 bg-primary/[0.06] p-4 mb-4">
                  <h3 className="text-sm font-heading font-bold text-primary mb-3">📊 Your AI automation ROI</h3>
                  <div className="grid grid-cols-3 gap-3 text-center mb-4">
                    <div>
                      <p className="text-xs text-foreground/65">Break-even</p>
                      <p className="font-heading font-bold text-foreground">{fmtDec(results.breakEvenWeeks)} wks</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/65">Year-1 ROI</p>
                      <p className="font-heading font-bold text-primary">{results.roi}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/65">5-Year Value</p>
                      <p className="font-heading font-bold text-foreground">{fmt(results.fiveYearValue)}</p>
                    </div>
                  </div>
                  <div className="relative h-3 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${roiBarWidth}%`,
                        background:
                          "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 50%, hsl(var(--success)) 100%)",
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-foreground/60 mt-1">
                    <span>Break Even</span><span>2×</span><span>5×</span><span>10×</span>
                  </div>
                </div>

                {/* TICKER */}
                <div className="rounded-xl border border-destructive/30 bg-destructive/[0.06] p-4 text-center mb-5">
                  <p className="text-xs text-foreground/70 mb-1">⚠️ While you read this, your business has lost:</p>
                  <p className="font-heading font-extrabold text-2xl text-destructive" style={{ textShadow: `0 0 ${Math.min(ticker * 2, 30)}px rgba(239,68,68,0.5)` }}>
                    ${ticker.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-foreground/60 mt-1">Based on your numbers above</p>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <p className="text-sm text-foreground/75 mb-4">
                    You&apos;re leaving <span className="font-bold text-destructive">{fmt(results.annualLoss)}</span> on the table every year. Let&apos;s fix that.
                  </p>
                  <a
                    href="https://cal.com/yasir-bashir-bp4wob/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-cta-primary inline-block w-full mb-3"
                  >
                    <span className="hero-cta-inner justify-center w-full">
                      🔥 Book my free audit
                      <ArrowRight className="w-4 h-4 btn-icon" />
                    </span>
                  </a>
                  <button
                    onClick={share}
                    className="inline-flex items-center justify-center gap-2 w-full bg-secondary border border-border text-foreground font-heading font-bold text-sm rounded-full px-5 py-2.5 hover:bg-primary hover:text-white transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Share my results"}
                  </button>
                  <p className="text-[10px] text-foreground/60 mt-3">✓ No commitment &nbsp; ✓ 30 minutes &nbsp; ✓ 100% free</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back link */}
          <div className="text-center mt-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-card border border-border text-foreground font-heading font-bold text-sm rounded-full px-5 py-2.5 hover:bg-primary hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CalculatorPage;

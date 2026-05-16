import { useState, useEffect } from "react";
import { ArrowRight, Play, Calendar, Sparkles } from "lucide-react";

const clientAvatars = [
  { initials: "JR", color: "from-pink-500 to-purple-600" },
  { initials: "SM", color: "from-blue-500 to-cyan-500" },
  { initials: "AK", color: "from-green-500 to-emerald-500" },
  { initials: "MT", color: "from-orange-500 to-red-500" },
  { initials: "LP", color: "from-violet-500 to-indigo-500" },
];

const flippingWords = [
  "Systems",
  "Web Apps",
  "N8n Automations",
  "AI-CRM Systems",
  "Vibe Code",
];

const offers = [
  {
    icon: "🤖",
    title: "AI Automation Systems",
    pain: "Drowning in manual tasks that eat your time and revenue daily",
    solution: "We install done-for-you automation that runs your ops 24/7",
    cta1: "Book Free Audit",
    cta2: "See How It Works",
  },
  {
    icon: "🎯",
    title: "Lead & Booking Engine",
    pain: "Inconsistent leads, missed follow-ups, lost clients every week",
    solution: "AI-powered funnel + CRM that captures, nurtures & books automatically",
    cta1: "Get My Engine",
    cta2: "View Demo",
  },
  {
    icon: "⚡",
    title: "Web Apps & MVPs",
    pain: "Your idea is stuck — no tech team, too expensive, too slow",
    solution: "Launch your web app or MVP in days using AI-powered vibe coding",
    cta1: "Start My App",
    cta2: "View Projects",
  },
];

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % flippingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-16 overflow-hidden">
      {/* Center hero shine — primary color */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full bg-primary/[0.08] blur-[120px] animate-hero-shine" />
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] sm:w-[500px] sm:h-[300px] rounded-full bg-primary/[0.12] blur-[80px]" />
      </div>

      {/* Floating background icons */}
      <div className="floating-icons" aria-hidden="true">
        {["🤖", "⚙️", "🧠", "💡", "📊", "🔗", "🚀", "💬", "📧", "🎯"].map((icon, i) => (
          <span key={i} className={`floating-icon floating-icon-${i}`}>{icon}</span>
        ))}
      </div>

      {/* Client avatars + review badge */}
      <div className="glass-pill mb-8 animate-fade-in relative z-10 py-2 px-4 gap-3">
        <div className="flex -space-x-2">
          {clientAvatars.map((a) => (
            <div
              key={a.initials}
              className={`w-8 h-8 rounded-full bg-gradient-to-br ${a.color} flex items-center justify-center text-xs font-bold text-white border-2 border-background`}
            >
              {a.initials}
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <span className="text-foreground text-sm font-heading font-bold flex items-center gap-1">
            What Clients Say About Us <ArrowRight className="w-3 h-3" />
          </span>
          <span className="text-xs text-muted-foreground">
            ⭐⭐⭐⭐⭐ based on 800+ reviews
          </span>
        </div>
      </div>

      {/* Main headline — LinkedIn banner style */}
      <div className="relative z-10 text-center max-w-5xl mb-6">
        {/* "Helping Businesses" tilted badge */}
        <div className="flex justify-center mb-2">
          <span className="inline-block -rotate-3 text-sm sm:text-base md:text-lg font-heading font-semibold text-primary bg-primary/10 border border-primary/30 px-4 py-1 rounded-full">
            Helping Businesses
          </span>
        </div>

        {/* "Build" */}
        <h1 className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground leading-none -mb-2 sm:-mb-3">
          Build
        </h1>

        {/* "AI Systems" */}
        <div className="flex items-baseline justify-center gap-3 sm:gap-4">
          <span className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl gradient-text">
            AI
          </span>
          <span className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground">
            Systems
          </span>
        </div>

        {/* White glow line */}
        <div className="flex justify-center mt-2 mb-1">
          <div className="h-[2px] w-48 sm:w-64 md:w-80 bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
        </div>

        {/* Service list with icons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4">
          {[
            { icon: "⚡", label: "Web Apps" },
            { icon: "🔄", label: "N8n Automations" },
            { icon: "🎯", label: "AI-CRM Systems" },
            { icon: "🧩", label: "Vibe Code" },
          ].map((s) => (
            <span key={s.label} className="glass-pill text-xs sm:text-sm font-heading font-semibold">
              <span>{s.icon}</span> {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Subheadline */}
      <p className="text-muted-foreground text-base md:text-lg lg:text-xl text-center max-w-3xl mb-10 relative z-10 leading-relaxed">
        I'm Yasir Bashir — AI Automation Engineer &amp; Growth Strategist.
        In 5 years, I've helped 800+ businesses automate their growth,
        eliminate manual work, and scale with AI systems that never sleep.
      </p>

      {/* Two main CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-14 relative z-10">
        <a href="https://cal.com/yasir-bashir-bp4wob/30min" target="_blank" rel="noopener noreferrer" className="btn-gradient text-base group">
          <Calendar className="w-5 h-5 group-hover:animate-bounce" />
          Book a Free AI Audit
          <ArrowRight className="w-4 h-4 btn-icon" />
        </a>
        <a href="#vsl" className="btn-glass text-base group">
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          See How It Works
          <Play className="w-4 h-4 btn-icon" />
        </a>
      </div>

      {/* 3 Offer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl relative z-10">
        {offers.map((o) => (
          <div key={o.title} className="glass-card p-6 flex flex-col">
            <span className="text-4xl mb-4">{o.icon}</span>
            <h3 className="font-heading font-bold text-xl text-foreground mb-3">{o.title}</h3>
            <p className="text-sm text-destructive mb-2 leading-relaxed">❌ {o.pain}</p>
            <p className="text-sm text-success mb-5 leading-relaxed">✅ {o.solution}</p>
            <div className="flex flex-wrap gap-3 mt-auto">
              <a href="https://cal.com/yasir-bashir-bp4wob/30min" target="_blank" rel="noopener noreferrer" className="btn-glass text-xs">
                {o.cta1} <ArrowRight className="w-3 h-3 btn-icon" />
              </a>
              <a href="#vsl" className="btn-glass text-xs" style={{ background: "transparent", borderColor: "rgba(255,255,255,0.15)" }}>
                <Play className="w-3 h-3" /> {o.cta2}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;

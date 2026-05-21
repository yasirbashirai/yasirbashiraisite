import { ArrowRight, Calendar } from "lucide-react";

const servicePills = [
  { icon: "⚡", label: "Web Apps" },
  { icon: "🔄", label: "N8n Automations" },
  { icon: "🎯", label: "AI-CRM Systems" },
  { icon: "🧩", label: "Vibe Code" },
];

const offers = [
  {
    icon: "🌐",
    title: "Premium Websites",
    pain: "A pretty site that nobody books from is just a brochure.",
    solution: "Conversion-engineered sites that turn visitors into booked calls.",
  },
  {
    icon: "🎯",
    title: "Lead & Booking Engines",
    pain: "Inconsistent leads. Missed follow-ups. Lost clients every week.",
    solution: "AI funnel + CRM that captures, nurtures and books on autopilot.",
  },
  {
    icon: "⚡",
    title: "AI Growth Systems",
    pain: "Manual ops eat your hours while revenue stalls.",
    solution: "Custom AI + automations that run your business while you sleep.",
  },
];

const Hero = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-10 md:pt-28 md:pb-16 overflow-hidden">
    {/* Local hero glow */}
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] md:w-[820px] md:h-[820px] rounded-full bg-primary-light/[0.12] blur-[120px] animate-hero-shine" />
      <div className="absolute top-[28%] right-[8%] w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full bg-cream/80 blur-[110px]" />
      <div className="absolute bottom-[10%] left-[10%] w-[240px] h-[240px] md:w-[360px] md:h-[360px] rounded-full bg-gold-light/[0.18] blur-[110px]" />
    </div>

    {/* Floating icons cluster */}
    <div className="floating-icons" aria-hidden="true">
      {["🤖", "⚙️", "🧠", "💡", "📊", "🔗", "🚀", "💬", "📧", "🎯"].map((icon, i) => (
        <span key={i} className={`floating-icon floating-icon-${i}`}>{icon}</span>
      ))}
    </div>

    {/* AI-first status pill */}
    <div className="relative z-10 mb-3 inline-flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-heading font-bold text-primary">
      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      AI-First · 2026
    </div>

    {/* Helping Businesses tilted badge */}
    <div className="relative z-10 mb-4 md:mb-5">
      <span className="inline-block -rotate-3 text-sm md:text-lg font-heading font-semibold text-primary bg-primary-soft border border-primary/30 px-4 md:px-5 py-1 md:py-1.5 rounded-full shadow-soft">
        ✨ Helping Businesses
      </span>
    </div>

    {/* Main headline */}
    <div className="relative z-10 text-center max-w-5xl">
      <h1 className="font-heading font-extrabold text-[2.25rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] xl:leading-[1.02] text-ink tracking-tight">
        Build Premium Websites
        <br className="hidden sm:block" />
        <span className="inline-flex items-baseline gap-2 sm:gap-3 flex-wrap justify-center mt-1">
          <span>&amp;</span>
          <span className="font-serif-italic gradient-text">AI Growth</span>
          <span>Systems</span>
        </span>
      </h1>

      {/* Glow line under headline */}
      <div className="flex justify-center mt-4 md:mt-5 mb-1">
        <div className="h-[2px] w-40 sm:w-72 md:w-96 bg-gradient-to-r from-transparent via-primary/60 to-transparent rounded-full shadow-[0_0_14px_hsla(167,57%,50%,0.4)]" />
      </div>

      {/* Service pills row, compact on mobile so all 4 fit */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mt-4 md:mt-6 relative z-10">
        {servicePills.map((s) => (
          <span
            key={s.label}
            className="inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-2 rounded-full bg-white border border-primary/25 text-[11px] sm:text-base font-heading font-semibold text-foreground shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 transition whitespace-nowrap"
          >
            <span className="text-sm sm:text-lg">{s.icon}</span> {s.label}
          </span>
        ))}
      </div>

      {/* Sub-headline */}
      <p className="text-foreground/85 text-base md:text-xl text-center max-w-3xl mx-auto mt-5 md:mt-7 leading-relaxed px-2">
        I build conversion-engineered sites and AI automation systems for founders &amp; agencies who want their business to <span className="font-serif-italic text-primary">actually convert</span>.
      </p>
    </div>

    {/* Primary CTA */}
    <div className="flex flex-wrap items-center justify-center gap-4 mt-6 md:mt-9 mb-8 md:mb-12 relative z-10">
      <a
        href="https://cal.com/yasir-bashir-bp4wob/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="hero-cta-primary"
      >
        <span className="hero-cta-inner">
          <Calendar className="w-5 h-5" />
          Schedule a 1:1 call
          <ArrowRight className="w-4 h-4 btn-icon" />
        </span>
      </a>
    </div>

    {/* 3 offer cards, alternating primary / cream / primary */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 w-full max-w-6xl relative z-10">
      {offers.map((o, i) => {
        const isPrimary = i % 2 === 0;
        return (
          <div
            key={o.title}
            className="relative rounded-3xl p-5 md:p-6 flex flex-col grain-bg border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden text-center md:text-left"
            style={
              isPrimary
                ? {
                    background:
                      "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 100%)",
                    borderColor: "transparent",
                    color: "white",
                  }
                : {
                    backgroundColor: "hsl(var(--secondary))",
                    borderColor: "hsla(167, 54%, 34%, 0.20)",
                  }
            }
          >
            <div
              className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl ${
                isPrimary ? "bg-gold-light/30" : "bg-primary/10"
              }`}
            />

            <div
              className={`icon-box icon-box-lg mb-4 text-3xl mx-auto md:mx-0 ${
                isPrimary ? "!bg-white/20 !border-white/30" : ""
              }`}
            >
              <span style={isPrimary ? { color: "white" } : undefined}>{o.icon}</span>
            </div>

            <h3 className={`font-heading font-bold text-xl md:text-2xl mb-4 ${isPrimary ? "text-white" : "text-foreground"}`}>
              {o.title}
            </h3>

            {/* Before */}
            <div className="mb-3">
              <span
                className={`inline-flex items-center gap-1.5 text-[11px] font-heading font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2 ${
                  isPrimary ? "bg-white/20 text-white" : "bg-destructive/15 text-destructive"
                }`}
              >
                ❌ Before
              </span>
              <p className={`text-base leading-relaxed mt-1 ${isPrimary ? "text-white/90" : "text-foreground/75"}`}>
                {o.pain}
              </p>
            </div>

            {/* After */}
            <div>
              <span
                className={`inline-flex items-center gap-1.5 text-[11px] font-heading font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2 ${
                  isPrimary ? "bg-gold-light/30 text-white" : "bg-primary/15 text-primary"
                }`}
              >
                ✅ After
              </span>
              <p className={`text-base leading-relaxed font-medium mt-1 ${isPrimary ? "text-white" : "text-foreground"}`}>
                {o.solution}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

export default Hero;

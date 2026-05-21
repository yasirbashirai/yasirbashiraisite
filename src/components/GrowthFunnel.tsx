import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, RefObject } from "react";
import Section from "./Section";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Tier = {
  num: string;
  name: string;
  headline: string;
  description: string;
  metric: string;
  side: "left" | "right";
  width: number;
  variant: "primary" | "cream";
};

const tiers: Tier[] = [
  {
    num: "01",
    name: "ATTRACT",
    headline: "Bring the right eyes in.",
    description: "SEO, ads &amp; content hooks engineered to attract qualified buyers.",
    metric: "10× qualified traffic",
    side: "left",
    width: 92,
    variant: "primary",
  },
  {
    num: "02",
    name: "ENGAGE",
    headline: "Hold attention. Build trust.",
    description: "Strategic copy, sharp visuals &amp; UX that earn the next scroll.",
    metric: "2× longer time on page",
    side: "right",
    width: 72,
    variant: "cream",
  },
  {
    num: "03",
    name: "CONVERT",
    headline: "Visitors → booked calls.",
    description: "High-intent CTAs, AI chat &amp; instant booking. One-click commitment.",
    metric: "3× higher booking rate",
    side: "left",
    width: 52,
    variant: "primary",
  },
  {
    num: "04",
    name: "SCALE",
    headline: "Compound on autopilot.",
    description: "Email + SMS nurture &amp; upsells. Clients become your growth channel.",
    metric: "40% revenue from repeats",
    side: "right",
    width: 34,
    variant: "cream",
  },
];

const trapezoidClip = "polygon(0% 0%, 100% 0%, 88% 100%, 12% 100%)";

// Track scroll progress through a section (0 → 100 as user scrolls past it)
const useScrollProgress = (ref: RefObject<HTMLDivElement>) => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight;
      const total = winH + rect.height;
      const traveled = winH - rect.top;
      const p = Math.max(0, Math.min(100, (traveled / total) * 100));
      setPct(p);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);
  return pct;
};

const TierRow = ({ tier, index }: { tier: Tier; index: number }) => {
  const { ref, isVisible } = useScrollReveal(0.2);
  const isLeft = tier.side === "left";
  const cascadeDelay = `${index * 140}ms`;

  return (
    <div ref={ref} className="relative">
      {/* Desktop: 3-col grid */}
      <div className="hidden md:grid grid-cols-12 gap-4 items-center -mb-1 last:mb-0">
        <div className="col-span-3">
          {isLeft && (
            <div
              className={`text-right transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
              style={{ transitionDelay: cascadeDelay }}
            >
              <SideCard tier={tier} align="right" />
            </div>
          )}
        </div>

        <div className="col-span-6 flex justify-center">
          <div
            className={`relative transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
            }`}
            style={{ width: `${tier.width}%`, transitionDelay: cascadeDelay }}
          >
            <Trapezoid tier={tier} />
          </div>
        </div>

        <div className="col-span-3">
          {!isLeft && (
            <div
              className={`text-left transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
              style={{ transitionDelay: cascadeDelay }}
            >
              <SideCard tier={tier} align="left" />
            </div>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div
        className={`md:hidden mb-3 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: cascadeDelay }}
      >
        <div className="mb-3 flex justify-center" style={{ width: "100%" }}>
          <div style={{ width: `${Math.max(tier.width, 70)}%` }}>
            <Trapezoid tier={tier} />
          </div>
        </div>
        <SideCard tier={tier} align="left" />
      </div>
    </div>
  );
};

const Trapezoid = ({ tier }: { tier: Tier }) => {
  const isPrimary = tier.variant === "primary";
  return (
    <div
      className="relative overflow-hidden flex items-center justify-center min-h-[78px] md:min-h-[92px] transition-all duration-300 hover:-translate-y-0.5"
      style={{
        clipPath: trapezoidClip,
        background: isPrimary
          ? "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 100%)"
          : "hsl(var(--secondary))",
        boxShadow: isPrimary
          ? "0 14px 36px -12px hsla(167, 57%, 50%, 0.45)"
          : "0 10px 30px -12px hsla(167, 54%, 34%, 0.18)",
      }}
    >
      <div className="absolute inset-0 grain-bg opacity-50 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 py-3">
        <div
          className={`text-[10px] md:text-xs font-heading font-bold tracking-widest leading-none mb-1 ${
            isPrimary ? "text-white/85" : "text-primary/80"
          }`}
        >
          STAGE {tier.num}
        </div>
        <div
          className={`font-heading font-extrabold text-2xl md:text-3xl lg:text-4xl tracking-tight leading-none ${
            isPrimary ? "text-white" : "text-foreground"
          }`}
        >
          {tier.name}
        </div>
      </div>
    </div>
  );
};

const SideCard = ({ tier, align }: { tier: Tier; align: "left" | "right" }) => (
  <div className="relative rounded-xl p-4 bg-white border border-primary/15 shadow-soft">
    <h4 className="font-heading font-bold text-base text-foreground leading-snug mb-1.5">
      {tier.headline}
    </h4>
    <p
      className="text-sm text-foreground/75 leading-relaxed mb-2.5"
      dangerouslySetInnerHTML={{ __html: tier.description }}
    />
    <div className={`flex ${align === "right" ? "justify-end" : ""}`}>
      <span className="inline-flex items-center gap-1 text-xs font-heading font-bold text-primary bg-primary-soft px-2.5 py-1 rounded-full border border-primary/20">
        ✓ {tier.metric}
      </span>
    </div>
  </div>
);

const GrowthFunnel = () => {
  const funnelRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(funnelRef);

  return (
    <Section id="growth-system" className="py-16 px-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary-light/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-cream/40 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="glass-pill text-sm font-heading font-bold uppercase tracking-widest text-primary mb-4">
            🔻 The Growth System
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground mt-4 mb-3 leading-tight">
            Our proven <span className="font-serif-italic gradient-text">growth funnel</span>, attention → revenue.
          </h2>
          <p className="text-foreground/75 text-base md:text-lg">
            4 stages baked into every site we ship. Each one compounds the next.
          </p>
        </div>

        {/* The funnel, with scroll-traveling background line */}
        <div ref={funnelRef} className="relative">
          {/* Static background line */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[3px] rounded-full bg-primary/15 pointer-events-none"
            aria-hidden="true"
          />
          {/* Animated fill line, travels with scroll */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 w-[3px] rounded-full pointer-events-none transition-[height] duration-150 ease-out"
            style={{
              height: `calc(${progress}% - 1rem)`,
              maxHeight: "calc(100% - 2rem)",
              background:
                "linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 50%, hsl(var(--primary)) 100%)",
              boxShadow: "0 0 14px hsla(167, 57%, 50%, 0.55)",
            }}
            aria-hidden="true"
          />

          {tiers.map((t, i) => (
            <TierRow key={t.num} tier={t} index={i} />
          ))}
        </div>

        {/* Gold finale chip */}
        <div className="flex justify-center mt-8">
          <div className="gold-border-rounded px-5 py-2.5 inline-flex items-center gap-2 text-sm md:text-base font-heading font-bold text-foreground bg-white shadow-gold-glow">
            <span className="text-gold">★</span>
            Predictable, compounding revenue
            <span className="text-gold">★</span>
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="https://cal.com/yasir-bashir-bp4wob/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta-primary inline-block"
          >
            <span className="hero-cta-inner">
              Plug me into your funnel <ArrowRight className="w-4 h-4 btn-icon" />
            </span>
          </a>
        </div>
      </div>
    </Section>
  );
};

export default GrowthFunnel;

import { ArrowRight } from "lucide-react";
import Section from "./Section";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    num: "01",
    icon: "🔍",
    title: "Strategy & Discovery",
    tagline: "Video call, business audit & competitor scan.",
    variant: "primary" as const,
  },
  {
    num: "02",
    icon: "🎨",
    title: "Design Foundation",
    tagline: "Wireframes, copy direction & UX architecture.",
    variant: "white" as const,
  },
  {
    num: "03",
    icon: "⚙️",
    title: "Build & Launch",
    tagline: "Mobile-first build, on-page SEO, fast load.",
    variant: "primary" as const,
  },
  {
    num: "04",
    icon: "🤖",
    title: "AI Automation",
    tagline: "CRM, chatbot, follow-ups, payments wired in.",
    variant: "white" as const,
  },
  {
    num: "05",
    icon: "🚀",
    title: "Growth & Scaling",
    tagline: "A/B tests, SEO, ads, monthly optimisation.",
    variant: "primary" as const,
    isFinale: true,
  },
];

type Step = typeof steps[number];

const StepCard = ({ step, index }: { step: Step; index: number }) => {
  const { ref, isVisible } = useScrollReveal(0.2);
  const isOdd = index % 2 === 0;
  const isPrimary = step.variant === "primary";
  const cascadeDelay = `${index * 110}ms`;

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transitionDelay: cascadeDelay,
        transform: isVisible
          ? `translateY(${isOdd ? "0" : "2.5rem"})`
          : `translateY(${isOdd ? "1rem" : "3.5rem"})`,
      }}
    >
      <div
        className={`relative rounded-2xl p-5 md:p-6 grain-bg border transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
          isPrimary
            ? "border-transparent shadow-card-hover"
            : "border-primary/15 shadow-card bg-white"
        }`}
        style={
          isPrimary
            ? {
                background:
                  "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 100%)",
                color: "white",
              }
            : undefined
        }
      >
        {step.isFinale && (
          <>
            <div className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-widest bg-gold-light text-foreground shadow-gold-glow z-10">
              FINALE
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gold-light/30 blur-2xl pointer-events-none" />
          </>
        )}
        {isPrimary && !step.isFinale && (
          <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gold-light/25 blur-2xl pointer-events-none" />
        )}

        <div className="flex items-center gap-3 mb-3 relative z-10">
          <div
            className={`icon-box icon-box-sm text-xl shrink-0 ${
              isPrimary ? "!bg-white/20 !border-white/30" : ""
            }`}
          >
            <span style={isPrimary ? { color: "white" } : undefined}>{step.icon}</span>
          </div>
          <span
            className={`font-heading font-extrabold text-2xl md:text-3xl tracking-tight leading-none ${
              isPrimary ? "text-white/90" : "gradient-text"
            }`}
          >
            {step.num}
          </span>
        </div>
        <h3
          className={`font-heading font-bold text-base md:text-lg leading-snug mb-1.5 relative z-10 ${
            isPrimary ? "text-white" : "text-foreground"
          }`}
        >
          {step.title}
        </h3>
        <p
          className={`text-sm leading-relaxed relative z-10 ${
            isPrimary ? "text-white/85" : "text-foreground/70"
          }`}
        >
          {step.tagline}
        </p>
      </div>
    </div>
  );
};

const Blueprint = () => (
  <Section id="process" className="py-14 md:py-16 px-4 relative">
    <div className="max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
        <span className="glass-pill text-sm font-heading font-bold uppercase tracking-widest text-primary mb-4">
          The Process
        </span>
        <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground mt-4 mb-3 leading-tight">
          A <span className="font-serif-italic gradient-text">5-step climb</span> from idea to compounding growth.
        </h2>
        <p className="text-foreground/75 text-base md:text-lg">
          The same playbook we&apos;ve run across 800+ projects.
        </p>
      </div>

      {/* Desktop horizontal zigzag, fits in one view */}
      <div className="hidden md:block relative">
        <div className="grid grid-cols-5 gap-4 lg:gap-6 items-start">
          {steps.map((s, i) => (
            <StepCard key={s.num} step={s} index={i} />
          ))}
        </div>
      </div>

      {/* Mobile: stacked */}
      <div className="md:hidden space-y-3">
        {steps.map((s, i) => (
          <StepCard key={s.num} step={s} index={i} />
        ))}
      </div>

      <div className="text-center mt-10 md:mt-14">
        <a
          href="https://cal.com/yasir-bashir-bp4wob/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-cta-primary inline-block"
        >
          <span className="hero-cta-inner">
            Start at Step 1 <ArrowRight className="w-4 h-4 btn-icon" />
          </span>
        </a>
      </div>
    </div>
  </Section>
);

export default Blueprint;

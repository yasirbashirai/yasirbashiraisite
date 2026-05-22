import { ArrowRight, Check, Sparkles } from "lucide-react";
import Section from "./Section";
import AiSparkle from "./AiSparkle";
import { pricing as cmsPricing } from "@/lib/cms";

const FALLBACK = [
  {
    name: "AI Starter System",
    tagline: "Everything you need to start booking calls on autopilot.",
    setup: "$1,497",
    monthly: "$497",
    features: [
      "Conversion-engineered landing page",
      "AI chatbot (Web + WhatsApp)",
      "CRM + pipeline setup",
      "7-day automated follow-up flow",
      "Booking + payment integration",
      "Analytics dashboard",
      "30-day post-launch support",
    ],
    cta: "Start with Starter",
    highlight: false,
  },
  {
    name: "Full Growth Engine",
    tagline: "The complete client-acquisition system, done for you, end to end.",
    setup: "$2,997",
    monthly: "$997",
    features: [
      "Everything in Starter, plus:",
      "Multi-page custom website or web app",
      "Content + social automation system",
      "Email + SMS nurture sequences",
      "Full RevOps + reporting stack",
      "Priority support &amp; monthly strategy call",
      "30-day ROI guarantee",
    ],
    cta: "Book a strategy call",
    highlight: true,
  },
];

const packages =
  cmsPricing.length > 0
    ? cmsPricing.map((p) => ({
        name: p.name,
        tagline: p.tagline,
        setup: p.setup_price,
        monthly: p.monthly_price,
        features: p.features,
        cta: p.cta_text,
        highlight: p.is_highlight,
      }))
    : FALLBACK;

const Pricing = () => (
  <Section id="pricing" className="py-16 px-4 bg-gradient-to-b from-white via-cream/30 to-white">
    <div className="max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="glass-pill text-xs font-heading font-bold uppercase tracking-widest text-primary mb-4">
          Investment
        </span>
        <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground mt-5 mb-4 leading-tight">
          Two ways to <span className="font-serif-italic gradient-text">grow with me</span>.<br className="hidden sm:block" />
          Zero hidden fees.
        </h2>
        <p className="text-muted-foreground text-base md:text-lg">
          Transparent, outcome-driven pricing. Setup fee + monthly retainer, cancel any time after 90 days.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 lg:gap-8 mb-10">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`relative flex flex-col p-8 lg:p-10 rounded-3xl transition-all duration-300 ${
              pkg.highlight
                ? "gold-border-rounded shadow-card-hover scale-100 md:scale-[1.03]"
                : "glass-card"
            }`}
            style={
              pkg.highlight
                ? {
                    background:
                      "linear-gradient(160deg, hsl(var(--primary)) 0%, hsl(var(--primary-dark)) 100%)",
                    color: "white",
                  }
                : undefined
            }
          >
            {pkg.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <div className="gold-border-rounded px-4 py-1.5 inline-flex items-center gap-1.5 text-xs font-heading font-extrabold uppercase tracking-widest bg-white shadow-gold-glow">
                  <AiSparkle size={14} className="text-gold" />
                  <span className="text-foreground">Most Popular</span>
                </div>
              </div>
            )}

            <div className="mb-2">
              <span
                className={`inline-flex items-center gap-1.5 text-[11px] font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                  pkg.highlight
                    ? "bg-white/15 text-white"
                    : "bg-primary-soft text-primary"
                }`}
              >
                {pkg.highlight ? <Sparkles className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                {pkg.highlight ? "Best Outcome" : "Quick Launch"}
              </span>
            </div>

            <h3
              className={`font-heading font-extrabold text-3xl md:text-4xl mb-2 ${
                pkg.highlight ? "text-white" : "text-foreground"
              }`}
            >
              {pkg.name}
            </h3>
            <p
              className={`text-sm md:text-base leading-relaxed mb-6 ${
                pkg.highlight ? "text-white/80" : "text-muted-foreground"
              }`}
            >
              {pkg.tagline}
            </p>

            {/* Price */}
            <div
              className={`flex items-baseline gap-2 mb-1 ${
                pkg.highlight ? "" : ""
              }`}
            >
              <span
                className={`font-heading font-extrabold text-5xl md:text-6xl tracking-tight ${
                  pkg.highlight ? "text-white" : "gradient-text"
                }`}
              >
                {pkg.setup}
              </span>
              <span
                className={`text-sm font-medium ${
                  pkg.highlight ? "text-white/70" : "text-muted-foreground"
                }`}
              >
                one-time
              </span>
            </div>
            <div
              className={`flex items-center gap-2 mb-7 text-sm ${
                pkg.highlight ? "text-white/70" : "text-muted-foreground"
              }`}
            >
              <span className="font-heading font-bold">+ {pkg.monthly}/mo</span>
              <span>retainer (90-day min)</span>
            </div>

            <div
              className={`h-px w-full mb-6 ${
                pkg.highlight ? "bg-white/20" : "bg-border"
              }`}
            />

            <ul className="space-y-3 mb-8 flex-1">
              {pkg.features.map((f) => (
                <li
                  key={f}
                  className={`flex items-start gap-3 text-sm leading-relaxed ${
                    pkg.highlight ? "text-white/90" : "text-foreground"
                  }`}
                >
                  <span
                    className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      pkg.highlight ? "bg-white/15" : "bg-primary-soft"
                    }`}
                  >
                    <Check
                      className={`w-3 h-3 ${
                        pkg.highlight ? "text-white" : "text-primary"
                      }`}
                    />
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: f }} />
                </li>
              ))}
            </ul>

            <a
              href="https://cal.com/yasir-bashir-bp4wob/30min"
              target="_blank"
              rel="noopener noreferrer"
              className={
                pkg.highlight
                  ? "inline-flex items-center justify-center gap-2 bg-white text-primary font-heading font-bold text-sm rounded-full px-6 py-3.5 hover:scale-[1.02] transition shadow-gold-glow"
                  : "btn-primary justify-center"
              }
            >
              {pkg.cta} <ArrowRight className="w-4 h-4 btn-icon" />
            </a>
          </div>
        ))}
      </div>

      <p className="text-center text-muted-foreground text-sm">
        Not sure which fits? <a href="https://cal.com/yasir-bashir-bp4wob/30min" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">Book a free 1:1 audit call</a>, I&apos;ll tell you the smallest spend that will move your number.
      </p>
    </div>
  </Section>
);

export default Pricing;

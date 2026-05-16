import { ArrowRight, Check } from "lucide-react";
import Section from "./Section";

const packages = [
  {
    name: "AI Starter System",
    badge: "Most Popular",
    setup: "$1,497",
    monthly: "$497/month",
    features: [
      "Lead capture funnel",
      "AI chatbot (Web + WhatsApp)",
      "CRM setup + pipeline",
      "7-day automated follow-up",
      "Booking system integration",
      "Analytics dashboard",
      "30-day support",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Full Growth Engine",
    badge: "Best Results",
    setup: "$2,997",
    monthly: "$997/month",
    features: [
      "Everything in Starter, plus:",
      "Custom web app or landing pages",
      "Content automation system",
      "Social media automation",
      "YouTube + email automation",
      "Full RevOps system",
      "Priority support + monthly strategy call",
      "ROI guarantee",
    ],
    cta: "Book Strategy Call",
    highlight: true,
  },
];

const Pricing = () => (
  <Section id="pricing" className="py-20 px-4">
    <div className="max-w-5xl mx-auto">
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground text-center mb-3">
        Simple, Transparent Pricing
      </h2>
      <p className="text-muted-foreground text-center mb-14">No Hidden Fees. No Surprises.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`glass-card p-8 flex flex-col ${
              pkg.highlight ? "ring-2 ring-primary" : ""
            }`}
            style={pkg.highlight ? { animation: "pulse-glow 3s ease-in-out infinite" } : undefined}
          >
            <div className={`inline-block self-start px-3 py-1 rounded-full text-xs font-heading font-bold mb-4 ${
              pkg.highlight ? "gradient-bg text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {pkg.badge}
            </div>

            <h3 className="font-heading font-extrabold text-2xl text-foreground mb-2">{pkg.name}</h3>
            <div className="mb-6">
              <span className="font-heading font-extrabold text-4xl gradient-text">{pkg.setup}</span>
              <span className="text-muted-foreground text-sm ml-2">one-time</span>
              <p className="text-muted-foreground text-sm mt-1">+ {pkg.monthly} retainer</p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a href="https://cal.com/yasir-bashir-bp4wob/30min" target="_blank" rel="noopener noreferrer" className={pkg.highlight ? "btn-gradient justify-center" : "btn-glass justify-center"}>
              {pkg.cta} <ArrowRight className="w-4 h-4 btn-icon" />
            </a>
          </div>
        ))}
      </div>

      <p className="text-center text-muted-foreground text-sm">
        Not sure which plan? <a href="https://cal.com/yasir-bashir-bp4wob/30min" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Book a FREE 30-min AI Audit call</a> and I'll tell you exactly what you need.
      </p>
    </div>
  </Section>
);

export default Pricing;

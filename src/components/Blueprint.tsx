import { ArrowRight, ArrowDown } from "lucide-react";
import Section from "./Section";

const steps = [
  {
    num: "01",
    icon: "🎨",
    title: "DESIGN",
    desc: "We start by mapping your complete business system. Understanding your offer, your audience, and where the gaps are costing you money. No guessing — just clarity.",
    details: ["Business System Mapping", "Revenue Gap Analysis", "Audience Deep-Dive", "Growth Blueprint"],
  },
  {
    num: "02",
    icon: "🔨",
    title: "BUILD",
    desc: "We build your complete tech stack — website, funnels, CRM, automations, chatbots. Everything connected. Everything tested. Built to convert from day one.",
    details: ["Website & Funnels", "CRM & Pipelines", "AI Chatbots", "Payment Systems"],
  },
  {
    num: "03",
    icon: "⚙️",
    title: "AUTOMATE",
    desc: "We automate your lead generation, follow-ups, content, bookings, and operations. Your business starts running 24/7 without you doing the manual work.",
    details: ["Lead Automation", "Follow-up Sequences", "Content Systems", "Booking Automation"],
  },
  {
    num: "04",
    icon: "🚀",
    title: "SCALE",
    desc: "With systems running, we optimize, expand, and scale. More leads, more bookings, more revenue — with less of your time. Growth becomes predictable.",
    details: ["Performance Optimization", "Revenue Scaling", "Multi-Channel Expansion", "ROI Tracking"],
  },
];

const Blueprint = () => (
  <Section id="process" className="py-20 px-4">
    <div className="max-w-4xl mx-auto">
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground text-center mb-3">
        My Proven 4-Step Blueprint <span className="gradient-text">For Business Growth</span>
      </h2>
      <p className="text-muted-foreground text-center mb-14">
        800+ businesses transformed using this exact system
      </p>

      {/* Vertical timeline */}
      <div className="relative">
        {/* Center line */}
        <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 gradient-bg opacity-30" />

        {steps.map((s, i) => (
          <div key={s.num} className="relative mb-8 last:mb-0">
            {/* Connector arrow */}
            {i < steps.length - 1 && (
              <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 bottom-0 translate-y-full z-10 text-primary">
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </div>
            )}

            <div className={`flex flex-col md:flex-row items-start gap-4 md:gap-8 ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}>
              {/* Number node */}
              <div className="flex items-center gap-4 md:w-1/2 md:justify-end relative z-10">
                {i % 2 === 0 && (
                  <div className="hidden md:block flex-1" />
                )}
                <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center font-heading font-extrabold text-lg text-primary-foreground shrink-0 shadow-lg shadow-primary/30">
                  {s.num}
                </div>
                {i % 2 === 1 && (
                  <div className="hidden md:block flex-1" />
                )}
              </div>

              {/* Content card */}
              <div className="glass-card p-6 md:w-1/2 ml-14 md:ml-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{s.icon}</span>
                  <h3 className="font-heading font-extrabold text-2xl text-foreground">{s.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.details.map((d) => (
                    <span key={d} className="glass-pill text-xs py-1 px-3">{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a href="https://cal.com/yasir-bashir-bp4wob/30min" target="_blank" rel="noopener noreferrer" className="btn-gradient text-base">
          Start My Blueprint <ArrowRight className="w-4 h-4 btn-icon" />
        </a>
      </div>
    </div>
  </Section>
);

export default Blueprint;

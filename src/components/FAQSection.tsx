import { useState } from "react";
import { ChevronDown, Zap, HelpCircle, ArrowRight } from "lucide-react";
import Section from "./Section";

const faqs = [
  {
    icon: "⚡",
    q: "How fast can you deliver results?",
    a: "Most clients see their first automation live within 3–5 business days. Full systems are typically deployed in 1–2 weeks depending on complexity.",
  },
  {
    icon: "🧠",
    q: "Do I need technical knowledge to use your systems?",
    a: "Zero technical knowledge needed. I build everything and train you (or your team) on how to use it. If anything breaks, I fix it.",
  },
  {
    icon: "🏆",
    q: "What makes you different from other automation agencies?",
    a: "I've completed 800+ projects personally. I don't outsource. You get direct access to me, not a team of juniors. And every system comes with an ROI guarantee.",
  },
  {
    icon: "🎯",
    q: "Which businesses do you work best with?",
    a: "Service-based businesses generating $1K–$50K/month who are ready to stop doing things manually and start scaling with systems. Moving companies, clinics, agencies, coaches, e-commerce brands.",
  },
  {
    icon: "🛡️",
    q: "What if the system doesn't work for my business?",
    a: "I guarantee results for clients who implement the systems I build. If it doesn't perform as agreed, I fix it — free of charge, no questions asked.",
  },
  {
    icon: "🚀",
    q: "How do I get started?",
    a: "Book a free 30-minute AI Audit call. I'll analyze your business, identify the biggest automation opportunities, and give you a clear plan — even if you don't work with me after.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="faq" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="glass-pill mx-auto mb-6">
            <HelpCircle className="w-4 h-4 text-primary" /> Got Questions?
          </div>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-foreground mb-4">
            Everything You Need to Know
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Before you book your free audit, here are the answers to the most common questions
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`glass-card overflow-hidden transition-all duration-300 ${
                  isOpen ? "ring-1 ring-primary/40" : ""
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 p-5 md:p-6 text-left cursor-pointer group"
                >
                  <span className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-lg shrink-0">
                    {faq.icon}
                  </span>
                  <span className="font-heading font-bold text-foreground text-base md:text-lg flex-1 group-hover:text-primary transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6 pl-[4.75rem]">
                    <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a href="https://cal.com/yasir-bashir-bp4wob/30min" target="_blank" rel="noopener noreferrer" className="btn-gradient text-base">
            <Zap className="w-4 h-4" />
            Book a Free Call — I'll Answer Everything
            <ArrowRight className="w-4 h-4 btn-icon" />
          </a>
        </div>
      </div>
    </Section>
  );
};

export default FAQSection;

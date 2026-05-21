import { ArrowRight, Calculator, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "./Section";

const CalculatorCTA = () => (
  <Section className="py-20 px-4">
    <div className="max-w-6xl mx-auto">
      {/* Gold border wrap */}
      <div className="relative p-[2.5px] rounded-[2rem] bg-gold-gradient shadow-gold-glow">
        <div
          className="relative overflow-hidden rounded-[1.9rem] p-8 md:p-12 lg:p-14"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 100%)",
          }}
        >
          {/* Decorative glow */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gold-light/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <Star className="absolute top-6 right-10 w-4 h-4 text-gold-light/70 fill-current" />
          <Star className="absolute bottom-8 left-12 w-3 h-3 text-gold-light/60 fill-current" />

          {/* Grain */}
          <div className="absolute inset-0 grain-bg opacity-40 pointer-events-none" />

          <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 text-primary text-sm font-heading font-bold uppercase tracking-widest mb-5 shadow-soft">
                <Sparkles className="w-3.5 h-3.5" />
                Free tool · 60 seconds
              </div>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight">
                How much is manual work<br className="hidden sm:block" />
                <span className="font-serif-italic text-gold-light">silently costing you?</span>
              </h2>
              <p className="text-white/85 text-lg max-w-xl leading-relaxed">
                Drop in 4 numbers, get a personalised report showing exactly how much revenue you&apos;re leaking, and what AI automation would recover.
              </p>
            </div>
            <Link
              to="/calculator"
              className="inline-flex items-center gap-2.5 bg-white text-primary font-heading font-extrabold text-base md:text-lg rounded-full px-7 py-4 hover:scale-[1.04] transition shadow-gold-glow ring-2 ring-gold-light/60 shrink-0 self-center"
            >
              <Calculator className="w-5 h-5" />
              Calculate my ROI
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

export default CalculatorCTA;

import { ArrowRight, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "./Section";

const CalculatorCTA = () => (
  <Section className="py-16 px-4">
    <div className="max-w-4xl mx-auto text-center glass-card p-8 md:p-12">
      <span className="glass-pill mb-4 inline-flex text-sm">
        <Calculator className="w-4 h-4 text-primary" /> Free Tool
      </span>
      <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground mt-4 mb-3">
        How Much Is Manual Work <span className="gradient-text">Costing You?</span>
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
        Use our free AI Revenue Calculator to see exactly how much revenue you're losing — and how much you'll gain with automation. Takes 60 seconds.
      </p>
      <Link to="/calculator" className="btn-gradient text-base inline-flex">
        <Calculator className="w-5 h-5" />
        Calculate My ROI Now
        <ArrowRight className="w-4 h-4 btn-icon" />
      </Link>
    </div>
  </Section>
);

export default CalculatorCTA;

import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import Section from "./Section";

const FinalCTA = () => (
  <Section id="contact" className="py-20 px-4">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
        Your Business Deserves<br />
        <span className="gradient-text">To Run Without You.</span>
      </h2>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-14 leading-relaxed">
        Stop being the bottleneck. Book your free 30-minute AI Audit and discover exactly what systems
        you need to generate leads, automate operations, and scale — starting this week.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Book a Call */}
        <div className="glass-card p-8 text-center flex flex-col items-center">
          <Phone className="w-10 h-10 text-primary mb-4" />
          <h3 className="font-heading font-bold text-xl text-foreground mb-2">Book a Free 30-Min Call</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Get a personalized AI audit of your business. Zero obligation, 100% value.
          </p>
          <a href="https://cal.com/yasir-bashir-bp4wob/30min" target="_blank" rel="noopener noreferrer" className="btn-gradient text-base w-full justify-center">
            Book My Free Audit <ArrowRight className="w-4 h-4 btn-icon" />
          </a>
        </div>

        {/* Send a Message */}
        <div className="glass-card p-8 text-center flex flex-col items-center">
          <MessageCircle className="w-10 h-10 text-primary mb-4" />
          <h3 className="font-heading font-bold text-xl text-foreground mb-2">Send a Direct Message</h3>
          <p className="text-sm text-muted-foreground mb-6">
            DM "SYSTEM" on LinkedIn or WhatsApp and I'll get back within 24 hours.
          </p>
          <div className="flex gap-3 w-full">
            <a
              href="https://www.linkedin.com/in/yasirbashiraiengineer/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass flex-1 justify-center text-xs"
            >
              LinkedIn
            </a>
            <a
              href="https://wa.me/923446012505"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass flex-1 justify-center text-xs"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

export default FinalCTA;

import { ArrowRight, Phone, MessageCircle, Linkedin } from "lucide-react";
import Section from "./Section";

const FinalCTA = () => (
  <Section id="contact" className="py-20 px-4 relative">
    <div className="max-w-6xl mx-auto">
      {/* Gold-bordered outer wrap */}
      <div className="relative p-[2.5px] rounded-[2rem] bg-gold-gradient shadow-gold-glow">
        <div
          className="relative overflow-hidden rounded-[1.9rem] p-10 md:p-14 lg:p-16"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 100%)",
          }}
        >
          {/* Glow + grain */}
          <div className="absolute -top-40 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-gold-light/25 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 grain-bg opacity-40 pointer-events-none" />

          <div className="relative z-10 text-center">
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-5 leading-[1.05] tracking-tight">
              Your Business Deserves<br />
              <span className="font-serif-italic text-gold-light">To Run Without You.</span>
            </h2>

            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Stop being the bottleneck. Book a free 30-minute audit and discover exactly what to build, fix, or automate to scale, starting this week.
            </p>

            {/* 2-card grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto">
              {/* Card 1, Book a call */}
              <div className="relative bg-white rounded-3xl p-8 text-center shadow-card-hover border border-white/40">
                <div className="absolute inset-0 grain-bg opacity-30 rounded-3xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="icon-box icon-box-lg mx-auto mb-5">
                    <Phone className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-2">
                    Book a Free 30-Min Call
                  </h3>
                  <p className="text-base text-foreground/75 mb-6 leading-relaxed">
                    Get a personalised audit of your business. Zero obligation, 100% value.
                  </p>
                  <a
                    href="https://cal.com/yasir-bashir-bp4wob/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-cta-primary inline-block w-full"
                  >
                    <span className="hero-cta-inner justify-center w-full">
                      Book My Free Audit
                      <ArrowRight className="w-4 h-4 btn-icon" />
                    </span>
                  </a>
                </div>
              </div>

              {/* Card 2, Direct message */}
              <div className="relative bg-white rounded-3xl p-8 text-center shadow-card-hover border border-white/40">
                <div className="absolute inset-0 grain-bg opacity-30 rounded-3xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="icon-box icon-box-lg mx-auto mb-5">
                    <MessageCircle className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-2">
                    Send a Direct Message
                  </h3>
                  <p className="text-base text-foreground/75 mb-6 leading-relaxed">
                    DM &quot;SYSTEM&quot; on LinkedIn or WhatsApp and I&apos;ll reply within 24 hours.
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="https://www.linkedin.com/in/yasirbashiraiengineer/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-soft border border-primary/30 text-primary font-heading font-bold text-sm rounded-full px-4 py-3 hover:bg-primary hover:text-white transition"
                    >
                      <Linkedin className="w-4 h-4" /> LinkedIn
                    </a>
                    <a
                      href="https://wa.me/923446012505"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-soft border border-primary/30 text-primary font-heading font-bold text-sm rounded-full px-4 py-3 hover:bg-primary hover:text-white transition"
                    >
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

export default FinalCTA;

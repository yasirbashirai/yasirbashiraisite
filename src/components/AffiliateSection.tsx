import { ArrowRight, ExternalLink } from "lucide-react";
import Section from "./Section";
import { affiliateLinks } from "@/lib/cms";

const FALLBACK = [
  {
    name: "Hostinger",
    desc: "Best web hosting for your online presence",
    commission: "Up to 60% commission",
    short: "60% commission",
    emoji: "🌐",
    link: "https://hostinger.com",
  },
  {
    name: "Lovable",
    desc: "AI-powered app builder, build MVPs in minutes",
    commission: "Up to 30% commission",
    short: "30% commission",
    emoji: "💜",
    link: "https://lovable.dev",
  },
  {
    name: "GoHighLevel",
    desc: "All-in-one CRM, funnels & automation platform",
    commission: "40% recurring commission",
    short: "40% recurring",
    emoji: "🚀",
    link: "https://gohighlevel.com",
  },
];

const affiliates =
  affiliateLinks.length > 0
    ? affiliateLinks.map((a) => ({
        name: a.name,
        desc: a.description,
        commission: a.commission_text,
        short: a.short_text,
        emoji: a.emoji,
        link: a.url,
      }))
    : FALLBACK;

const AffiliateSection = () => (
  <Section id="affiliates" className="py-14 md:py-16 px-4">
    <div className="max-w-6xl mx-auto">
      {/* Big header card — cream/secondary background with gold border */}
      <div className="relative p-[2.5px] rounded-[2rem] bg-gold-gradient shadow-gold-glow mb-8 md:mb-10">
        <div
          className="relative overflow-hidden rounded-[1.9rem] p-8 md:p-12 lg:p-14"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--secondary)) 0%, hsla(31, 80%, 96%, 1) 100%)",
          }}
        >
          {/* Decorative glow + grain */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-light/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-gold-light/20 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 grain-bg opacity-30 pointer-events-none" />

          <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
            {/* Left: copy + CTA */}
            <div className="max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-primary text-sm font-heading font-bold uppercase tracking-widest mb-5 shadow-soft border border-primary/15">
                <span className="text-base">💰</span>
                Affiliate Program
              </div>

              <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground mb-5 leading-[1.05] tracking-tight">
                Refer &amp; earn{" "}
                <span className="font-serif-italic gradient-text">commission.</span>
              </h2>

              <p className="text-foreground/80 text-base md:text-lg leading-relaxed mb-7 max-w-xl mx-auto md:mx-0">
                Earn up to 60% commission on every successful referral. Help businesses grow with the tools I recommend and get rewarded for it.
              </p>

              <a
                href="https://cal.com/yasir-bashir-bp4wob/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-primary inline-block"
              >
                <span className="hero-cta-inner">
                  Join the affiliate program
                  <ArrowRight className="w-4 h-4 btn-icon" />
                </span>
              </a>
            </div>

            {/* Right: 3 mini affiliate boxes */}
            <div className="w-full md:w-auto flex flex-col gap-3 md:min-w-[280px]">
              {affiliates.map((a) => (
                <a
                  key={a.name}
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all border border-primary/15"
                >
                  <div className="icon-box icon-box-sm text-lg shrink-0">{a.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-extrabold text-base text-foreground leading-tight group-hover:text-primary transition-colors">
                      {a.name}
                    </p>
                    <p className="text-sm text-primary font-heading font-bold leading-tight">
                      {a.short}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-foreground/40 group-hover:text-primary transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  </Section>
);

export default AffiliateSection;

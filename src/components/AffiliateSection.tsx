import { ArrowRight, ExternalLink } from "lucide-react";
import Section from "./Section";

const affiliates = [
  {
    name: "Hostinger",
    desc: "Best web hosting for your online presence",
    commission: "Up to 60% commission",
    emoji: "🌐",
    link: "https://hostinger.com",
    color: "from-purple-600 to-indigo-600",
  },
  {
    name: "Lovable",
    desc: "AI-powered app builder — build MVPs in minutes",
    commission: "Up to 30% commission",
    emoji: "💜",
    link: "https://lovable.dev",
    color: "from-pink-500 to-rose-600",
  },
  {
    name: "GoHighLevel",
    desc: "All-in-one CRM, funnels & automation platform",
    commission: "40% recurring commission",
    emoji: "🚀",
    link: "https://gohighlevel.com",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "n8n",
    desc: "Workflow automation for technical teams",
    commission: "20% recurring commission",
    emoji: "⚙️",
    link: "https://n8n.io",
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Make (Integromat)",
    desc: "Visual automation platform — connect anything",
    commission: "Up to 20% commission",
    emoji: "🔗",
    link: "https://make.com",
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "Calendly",
    desc: "Scheduling automation — fill your calendar",
    commission: "Up to $100/referral",
    emoji: "📅",
    link: "https://calendly.com",
    color: "from-blue-600 to-blue-800",
  },
];

const AffiliateSection = () => (
  <Section id="affiliates" className="py-20 px-4">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="glass-card p-8 md:p-12 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-10" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="glass-pill mb-4">💰 Affiliate Program</div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-foreground mb-4">
              Refer & Earn <span className="gradient-text">Commission.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Earn up to 60% commission on every successful referral. Help businesses grow with the tools I recommend and get rewarded for it!
            </p>
            <a href="https://cal.com/yasir-bashir-bp4wob/30min" target="_blank" rel="noopener noreferrer" className="btn-gradient text-base">
              Join Affiliate Program <ArrowRight className="w-4 h-4 btn-icon" />
            </a>
          </div>
          <div className="w-full md:w-auto flex flex-col gap-3">
            {["$500+", "$500+", "$500+"].map((amount, i) => (
              <div key={i} className="glass-card px-6 py-3 flex items-center justify-between gap-8 min-w-[240px]">
                <div>
                  <p className="text-xs text-primary font-heading font-bold">Referral Commissions</p>
                  <p className="text-xs text-muted-foreground">Per Referral</p>
                </div>
                <span className="font-heading font-extrabold text-foreground text-xl">{amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tool Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {affiliates.map((tool) => (
          <a
            key={tool.name}
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-6 flex flex-col group hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl`}>
                {tool.emoji}
              </span>
              <div>
                <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                  {tool.name} <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-primary font-heading font-semibold">{tool.commission}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
          </a>
        ))}
      </div>
    </div>
  </Section>
);

export default AffiliateSection;

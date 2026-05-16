import Section from "./Section";

const services = [
  { icon: "🤖", name: "n8n Automation", desc: "Custom workflow automation that runs 24/7" },
  { icon: "🎯", name: "GoHighLevel", desc: "Full CRM, funnel & pipeline setup and management" },
  { icon: "🎬", name: "AI Video Production", desc: "UGC, ads & AI-powered video content at scale" },
  { icon: "💬", name: "AI Chatbots", desc: "Web, WhatsApp & Messenger bots that qualify & book" },
  { icon: "🌐", name: "WordPress Development", desc: "High-converting websites built to perform" },
  { icon: "🛒", name: "E-commerce Solutions", desc: "Store design, CRO & brand building that converts" },
  { icon: "📱", name: "Social Media Automation", desc: "Content systems running daily without you" },
  { icon: "▶️", name: "YouTube Automation", desc: "Channel systems that publish & grow on autopilot" },
  { icon: "📧", name: "Email Marketing", desc: "Sequences that nurture & close leads automatically" },
  { icon: "📊", name: "Analytics & Tracking", desc: "Know exactly what's working and what's not" },
  { icon: "🔄", name: "Zapier/Make Setup", desc: "Connect all your tools with zero-code automation" },
  { icon: "💼", name: "CRM Implementation", desc: "Pipelines & follow-ups that never miss a lead" },
  { icon: "📄", name: "Document Automation", desc: "Smart docs, proposals & reports on autopilot" },
  { icon: "🎨", name: "AI Branding", desc: "AI-powered brand identity that stands out" },
  { icon: "📈", name: "Lead Generation", desc: "Consistent inbound leads without cold calling" },
  { icon: "🧠", name: "Automation Strategy", desc: "Blueprint to automate your entire business" },
  { icon: "⚡", name: "Vibe Coding", desc: "Rapid product building using AI-first development" },
  { icon: "🚀", name: "SaaS Web App", desc: "Full-stack web applications built and deployed" },
  { icon: "☁️", name: "Web App Deployment", desc: "Deploy, host & maintain your app reliably" },
  { icon: "🔍", name: "FREE CRO Audit", desc: "Find what's breaking your conversions — free" },
  { icon: "🔗", name: "Funnels & Landing Pages", desc: "High-converting funnels built to book calls" },
  { icon: "📞", name: "Booking Systems", desc: "Automated appointment systems that fill calendars" },
  { icon: "🤝", name: "RevOps Systems", desc: "Align marketing, sales & ops for predictable revenue" },
  { icon: "🧩", name: "AI Agents", desc: "Autonomous AI agents for sales, support & research" },
];

const ServicesGrid = () => (
  <Section id="services" className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground text-center mb-4">
        Everything You Need to <span className="gradient-text">Scale With AI</span>
      </h2>
      <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        24 battle-tested services designed to automate, grow, and dominate your market.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {services.map((s) => (
          <div key={s.name} className="glass-card p-5 flex flex-col gap-2">
            <span className="text-2xl">{s.icon}</span>
            <h3 className="font-heading font-bold text-foreground">{s.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

export default ServicesGrid;

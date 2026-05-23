import { useState, useEffect } from "react";
import {
  ArrowRight, Calendar, Check, Plus, Send,
  Truck, LayoutDashboard, Smartphone, Bot, Shield, Sparkles,
  Briefcase, Building2, Package,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingSocials from "@/components/FloatingSocials";
import WhatsAppChatbot from "@/components/WhatsAppChatbot";
import IncomingCallPopup from "@/components/IncomingCallPopup";
import LogisticsPortfolio from "@/components/LogisticsPortfolio";

const CAL_LINK = "https://cal.com/yasir-bashir-bp4wob/30min";
const WHATSAPP_LINK = "https://wa.me/923446012505?text=Hi%20Yasir%2C%20saw%20your%20Logistics%20Solutions%20page";

const segments = [
  { icon: Truck, name: "Owner-Operators", desc: "1-3 trucks. You need a real site that books direct loads and runs without you." },
  { icon: Briefcase, name: "Small Fleets", desc: "5-50 trucks. You need a dispatch dashboard + driver app that replace 4 disconnected tools." },
  { icon: Building2, name: "Freight Brokers", desc: "Carrier vetting, MC# verification, bond monitoring, automated rate-cons in one portal." },
  { icon: Package, name: "Movers / Couriers", desc: "Instant quote calculator, AI chatbot, lead-funnel site that doesn't lose to Thumbtack." },
];

const services = [
  {
    no: "01",
    icon: LayoutDashboard,
    name: "Dispatch Dashboard",
    sub: "DispatchOS™",
    body: "An internal control room for loads, drivers and KPIs, owned by you. Replaces per-seat TMS licences with one custom system.",
    price: "$3,000+",
    ship: "30 days",
    span: "lg:col-span-2 lg:row-span-2",
    accent: true,
  },
  {
    no: "02",
    icon: Bot,
    name: "AI Dispatcher Agent",
    sub: "Flagship",
    body: "Custom AI wired to your rates, lanes and brokers. Voice + WhatsApp + web.",
    price: "$9,500+",
    ship: "45 days",
    flagship: true,
  },
  {
    no: "03",
    icon: Truck,
    name: "Logistics Website",
    sub: "Mobile-first",
    body: "Built for trucking owners, not designers. SEO-tuned, fast, load-converting.",
    price: "$1,500+",
    ship: "14 days",
  },
  {
    no: "04",
    icon: Smartphone,
    name: "Driver App",
    sub: "iOS + Android",
    body: "POD upload, check-ins, pay status and load assignment in their pocket.",
    price: "$2,500+",
    ship: "21 days",
  },
  {
    no: "05",
    icon: Shield,
    name: "Broker Portal",
    sub: "Carrier-grade",
    body: "Quote requests, MC# verification, payment tracking. Catches double-broker risk.",
    price: "$2,500+",
    ship: "21 days",
  },
  {
    no: "06",
    icon: Sparkles,
    name: "Smart Chatbot + CRM",
    sub: "GoHighLevel",
    body: "24/7 quote responder + pipeline automation. SMS, email, web, WhatsApp in one inbox.",
    price: "$1,250+",
    ship: "10 days",
  },
];

const process = [
  { day: "DAY 01", title: "Free audit call", desc: "15-min call. We map your bottleneck and scope the build. You walk away with a clear plan, even if you don't hire me." },
  { day: "DAY 03", title: "Design approved", desc: "You see the design in Figma. One revision round included. No 3-week mockup ping-pong." },
  { day: "DAY 10", title: "Build complete", desc: "Site, integrations, CRM and chatbot all wired and live in staging. You QA on real devices." },
  { day: "DAY 14", title: "Launched", desc: "Live site, ad pixels firing, leads landing in your CRM. Team trained. You start booking." },
];

const tiers = [
  {
    name: "Starter",
    price: "1,500",
    period: "one-time",
    desc: "For owner-ops & small carriers who need a real site, fast.",
    features: [
      "5-page custom site",
      "Mobile-first &amp; SEO-tuned",
      "GA4 + Meta Pixel installed",
      "Quote/contact form → your inbox",
      "14-day delivery",
    ],
    cta: "Start with Starter",
    primary: false,
  },
  {
    name: "Booking Stack",
    price: "3,500",
    period: "+ $497/mo",
    desc: "For carriers & brokers turning visitors into booked loads.",
    badge: "Most Popular",
    features: [
      "Everything in Starter",
      "Quote &amp; booking portal",
      "AI chatbot (Chatbase)",
      "CRM setup (GoHighLevel)",
      "1 case study page",
      "21-day delivery",
    ],
    cta: "Start with Booking",
    primary: true,
  },
  {
    name: "Ops Stack",
    price: "7,500",
    period: "+ $1,497/mo",
    desc: "For 5-50 truck fleets replacing 4 tools with one.",
    features: [
      "Everything in Booking Stack",
      "Dispatch dashboard, driver app OR broker portal",
      "Samsara / Motive API integration",
      "Monthly content + SEO",
      "30-day delivery",
    ],
    cta: "Start with Ops",
    primary: false,
  },
];

const faqs = [
  {
    q: "How long does it take?",
    a: "Standard logistics site: 14 days. Booking stack: 21 days. Dispatch dashboard or driver app: 30 days. AI Dispatcher Agent: 45 days. No 3-month enterprise crawl.",
  },
  {
    q: "What if I already have a website?",
    a: "Start with the free 15-minute audit call. I'll show you what's actually broken, where money is leaking, and what's worth keeping. No pitch unless you ask for one.",
  },
  {
    q: "Do you only work with US clients?",
    a: "Primary focus is US carriers, brokers, dispatch services, movers, couriers and car haulers. I take UK/EU on request after a fit call.",
  },
  {
    q: "What tech stack do you use?",
    a: "Framer or WordPress for marketing sites. Next.js for portals &amp; dashboards. GoHighLevel for CRM. n8n for automation. Built to be owned by you, not me.",
  },
  {
    q: "Can you integrate with my TMS?",
    a: "Yes, McLeod, Samsara, Motive, AscendTMS, LoadOps, Truckbase, Trimble, DAT and Truckstop. Via API or n8n/Zapier.",
  },
];

const LogisticsSolutions = () => {
  const [form, setForm] = useState({ name: "", email: "", url: "", bottleneck: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Logistics Solutions, Built for US Carriers, Brokers & Dispatchers | Yasir Bashir";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute(
      "content",
      "Premium websites, dispatch dashboards, driver apps and AI Dispatcher Agents for US trucking, freight and moving businesses. Built and shipped in 14 days."
    );
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submitAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase.from("form_submissions").insert({
        source: "logistics-audit",
        name: form.name,
        email: form.email,
        message: form.bottleneck || null,
        metadata: { website: form.url },
        referrer: window.location.href,
        user_agent: navigator.userAgent,
      });
      setSubmitted(true);
    } catch (err) {
      // Fall back to mailto if Supabase insert fails
      const subject = encodeURIComponent(`Audit request, ${form.name}`);
      const body = encodeURIComponent(
        `New audit request from yasirbashir.com/logistics-solutions\n\n` +
          `Name: ${form.name}\nEmail: ${form.email}\nWebsite: ${form.url}\n` +
          `Bottleneck: ${form.bottleneck || "(not provided)"}\n`,
      );
      window.location.href = `mailto:yasirbashirai@gmail.com?subject=${subject}&body=${body}`;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-background text-foreground">
      <div className="grid-background" aria-hidden="true" />

      <Navbar />
      <FloatingSocials />
      <WhatsAppChatbot />
      <IncomingCallPopup />

      <main className="relative z-10 pt-24">

        {/* ============ HERO ============ */}
        <section className="relative pt-10 pb-12 lg:pt-14 lg:pb-20 overflow-hidden px-4">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-primary-light/[0.10] blur-[140px]" />
            <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-cream/40 blur-[120px]" />
          </div>

          <div className="relative max-w-6xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft border border-primary/30 text-xs uppercase tracking-[0.16em] text-primary font-bold mb-6">
              <span className="text-base leading-none">🇺🇸</span>
              Built for US Logistics Operators
            </span>

            <h1 className="font-heading font-extrabold tracking-[-0.035em] leading-[1.02] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground max-w-5xl mx-auto">
              Websites &amp; AI systems<br className="hidden sm:block" />
              for{" "}
              <span className="font-serif-italic gradient-text">US trucking, freight</span>
              {" "}&amp; movers.
            </h1>

            <p className="mt-7 max-w-2xl mx-auto text-lg lg:text-xl text-foreground/80 leading-relaxed">
              I build websites, dispatch dashboards, driver apps and AI Dispatcher Agents for US logistics businesses. 800+ projects shipped. Most live in 14 days.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="hero-cta-primary">
                <span className="hero-cta-inner">
                  <Calendar className="w-5 h-5" />
                  Book a 15-min audit
                  <ArrowRight className="w-4 h-4 btn-icon" />
                </span>
              </a>
              <a href="#services" className="inline-flex items-center gap-2 text-foreground font-heading font-semibold border-b-2 border-primary pb-1 hover:gap-3 transition-all">
                See what I build
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-7 flex items-center justify-center gap-2 text-sm text-foreground/75">
              <Shield className="w-4 h-4 text-success" />
              <span>14-day launch promise · Milestone billing · Cancel anytime</span>
            </div>
          </div>
        </section>

        {/* ============ TRUSTED-BY CLIENT STRIP ============ */}
        <section className="py-10 px-4 bg-secondary/40 border-y border-border">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-[10px] uppercase tracking-[0.3em] text-foreground/70 font-bold mb-5">
              Trusted by US logistics businesses
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-4 items-center justify-items-center">
              {[
                "SFam Logistics",
                "Earth Logistics",
                "Steer Logistics",
                "RMG Transport",
                "Arnold Freight Co",
                "Movements Transport",
              ].map((name) => (
                <span
                  key={name}
                  className="font-heading font-extrabold text-base lg:text-lg text-foreground/75 hover:text-primary transition tracking-tight text-center"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============ WHO IT'S FOR ============ */}
        <section className="py-14 lg:py-20 px-4 bg-gradient-to-b from-white via-cream/30 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">Who I help</p>
              <h2 className="font-heading font-extrabold text-3xl lg:text-5xl tracking-[-0.03em] leading-[1.05] text-foreground">
                One niche. <span className="font-serif-italic gradient-text">Built deep, not wide.</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {segments.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.name} className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition grain-bg">
                    <div className="icon-box icon-box-lg mb-4">
                      <Icon className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-2">{s.name}</h3>
                    <p className="text-sm text-foreground/75 leading-relaxed">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ AMERICAN OPERATIONS VISUAL ============ */}
        <section className="py-14 lg:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3 flex items-center justify-center gap-2">
                <span className="text-base leading-none">🇺🇸</span>
                Built for American operations
              </p>
              <h2 className="font-heading font-extrabold text-3xl lg:text-5xl tracking-[-0.03em] leading-[1.05] text-foreground">
                Built around how <span className="font-serif-italic gradient-text">American freight</span> actually moves.
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { src: "/trucks/usa-truck-2.jpg", label: "Dry Van &amp; OTR", sub: "Long-haul, regional" },
                { src: "/trucks/usa-truck-3.png", label: "Reefer &amp; Specialty", sub: "Cold chain, hazmat" },
                { src: "/trucks/usa-truck-4.png", label: "Flatbed &amp; Heavy", sub: "Construction, oversize" },
              ].map((t) => (
                <div
                  key={t.label}
                  className="relative rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition group"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={t.src}
                      alt={t.label.replace(/&amp;/g, "&")}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                    <p className="font-heading font-extrabold text-xl lg:text-2xl leading-tight" dangerouslySetInnerHTML={{ __html: t.label }} />
                    <p className="text-sm text-white/85 mt-1">{t.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center mt-10 text-sm lg:text-base text-foreground/70 max-w-3xl mx-auto">
              From the Texas triangle to coast-to-coast OTR, we&apos;ve shipped builds for owner-ops, small fleets, brokers and movers running every kind of US trailer.
            </p>
          </div>
        </section>

        {/* ============ SERVICES BENTO ============ */}
        <section id="services" className="py-14 lg:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">What I build</p>
              <h2 className="font-heading font-extrabold text-3xl lg:text-5xl tracking-[-0.03em] leading-[1.05] text-foreground">
                Six modules. <span className="font-serif-italic gradient-text">Owned by you forever.</span>
              </h2>
              <p className="mt-4 text-base lg:text-lg text-foreground/75">
                Start with one. Add the rest as you grow.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[260px] lg:auto-rows-[280px]">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={i}
                    className={`group relative ${s.span || ""} bg-card border border-border rounded-2xl p-5 lg:p-6 overflow-hidden hover:border-primary/50 transition-all flex flex-col grain-bg ${s.accent ? "lg:p-8" : ""}`}
                  >
                    {s.flagship && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full gold-border-rounded bg-white text-foreground shadow-soft">
                        <Sparkles className="w-3 h-3 text-gold" />
                        <span className="text-foreground">Flagship</span>
                      </span>
                    )}

                    <div className="flex items-start justify-between mb-auto">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">{s.no}</p>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{s.sub}</p>
                        <h3 className={`font-heading font-extrabold tracking-tight text-foreground ${s.accent ? "text-3xl lg:text-4xl" : "text-xl lg:text-2xl"}`}>
                          {s.name}
                        </h3>
                      </div>
                      {s.accent && (
                        <div className="hidden lg:block">
                          <div className="icon-box icon-box-lg">
                            <Icon className="w-7 h-7" strokeWidth={1.5} />
                          </div>
                        </div>
                      )}
                    </div>

                    <p className={`text-foreground/70 leading-relaxed my-4 ${s.accent ? "text-base max-w-md" : "text-sm"}`}>{s.body}</p>

                    <div className="flex items-end justify-between pt-3 border-t border-border">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">From</p>
                        <p className={`font-heading font-extrabold gradient-text ${s.accent ? "text-3xl" : "text-xl"}`}>{s.price}</p>
                      </div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">{s.ship}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ AI DISPATCHER SPOTLIGHT ============ */}
        <section className="py-14 lg:py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cream/40 via-white to-primary-soft/30" />
          <div className="relative max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">Flagship product</p>
                <h2 className="font-heading font-extrabold text-3xl lg:text-5xl tracking-[-0.03em] leading-[1.02] text-foreground mb-5">
                  The{" "}
                  <span className="font-serif-italic gradient-text">AI Dispatcher Agent™</span>
                  {" "}books loads while you sleep.
                </h2>
                <p className="text-base lg:text-lg text-foreground/80 leading-relaxed max-w-2xl mb-7">
                  Generic AI dispatch services sell the same agent to everyone. I build <strong className="text-foreground">yours</strong>, wired to your rate floors, your lanes, your preferred brokers and your TMS.
                </p>
                <div className="space-y-3 max-w-xl mb-8">
                  {[
                    "Answers carrier calls 24/7 in natural voice",
                    "Negotiates within your rate floor, never below",
                    "Books loads on DAT, Truckstop and your TMS",
                    "Hands off to you when something needs a human",
                  ].map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary-soft border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <p className="text-foreground/90">{f}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Starts at</p>
                    <p className="font-heading font-extrabold text-4xl gradient-text">$9,500</p>
                    <p className="text-xs text-muted-foreground">+ $1,997/mo · 45-day build</p>
                  </div>
                  <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="hero-cta-primary">
                    <span className="hero-cta-inner">
                      Talk to Yasir
                      <ArrowRight className="w-4 h-4 btn-icon" />
                    </span>
                  </a>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="relative bg-card border border-primary/25 rounded-xl p-5 shadow-card-hover grain-bg">
                  <div className="flex items-center gap-2 mb-4">
                    <Bot className="w-5 h-5 text-primary" />
                    <span className="font-mono text-xs text-muted-foreground">ai-agent.live</span>
                    <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] text-success font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                      LISTENING
                    </span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-2">
                      <span className="text-[10px] text-muted-foreground font-mono pt-1">23:14</span>
                      <div className="flex-1 bg-secondary border border-border rounded p-3">
                        <p className="text-[10px] uppercase tracking-wider text-primary font-bold mb-1">📞 Inbound · DAT</p>
                        <p className="text-foreground">&quot;Got a load Dallas → Phoenix, 47K lbs, drop tomorrow. $2,950 all-in. You interested?&quot;</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-row-reverse">
                      <span className="text-[10px] text-muted-foreground font-mono pt-1">23:14</span>
                      <div className="flex-1 bg-primary-soft border border-primary/30 rounded p-3">
                        <p className="text-[10px] uppercase tracking-wider text-primary font-bold mb-1">🤖 AI Agent</p>
                        <p className="text-foreground">&quot;Lane checks out. Rate floor on TX→AZ is $3,100. I can do $3,050 with quick-pay. Confirm and I&apos;ll send rate-con.&quot;</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[10px] text-muted-foreground font-mono pt-1">23:15</span>
                      <div className="flex-1 bg-secondary border border-border rounded p-3">
                        <p className="text-[10px] uppercase tracking-wider text-success font-bold mb-1">✓ BOOKED</p>
                        <p className="text-foreground">Load assigned · $3,050 confirmed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ PROCESS ============ */}
        <section className="py-14 lg:py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">How it works</p>
              <h2 className="font-heading font-extrabold text-3xl lg:text-5xl tracking-[-0.03em] leading-[1.05] text-foreground">
                Audit to live in <span className="font-serif-italic gradient-text">fourteen days.</span>
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-[14px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary-light to-transparent" />
              <div className="space-y-10">
                {process.map((p, i) => (
                  <div key={i} className="relative pl-12">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary border-4 border-background flex items-center justify-center text-white font-heading font-bold text-sm shadow-card">
                      {i + 1}
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">{p.day}</p>
                    <h3 className="font-heading font-extrabold text-xl lg:text-2xl tracking-tight mb-2 text-foreground">{p.title}</h3>
                    <p className="text-foreground/75 text-base leading-relaxed max-w-2xl">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ PORTFOLIO ============ */}
        <LogisticsPortfolio variant="grid" />

        {/* ============ PRICING ============ */}
        <section id="pricing" className="py-14 lg:py-20 px-4 bg-gradient-to-b from-white via-cream/30 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">Pricing</p>
              <h2 className="font-heading font-extrabold text-3xl lg:text-5xl tracking-[-0.03em] leading-[1.05] text-foreground">
                Public pricing. <span className="font-serif-italic gradient-text">No discovery games.</span>
              </h2>
              <p className="mt-4 text-base lg:text-lg text-foreground/75">
                Pick a tier. Book a call. Full quote in 24 hours.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-5">
              {tiers.map((t) => (
                <div
                  key={t.name}
                  className={`relative flex flex-col p-7 lg:p-9 rounded-3xl transition-all duration-300 ${
                    t.primary
                      ? "gold-border-rounded shadow-card-hover scale-100 md:scale-[1.03] grain-bg"
                      : "bg-card border border-border shadow-card grain-bg"
                  }`}
                  style={
                    t.primary
                      ? { background: "linear-gradient(160deg, hsl(var(--primary)) 0%, hsl(var(--primary-dark)) 100%)", color: "white" }
                      : undefined
                  }
                >
                  {t.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <div className="gold-border-rounded px-4 py-1.5 inline-flex items-center gap-1.5 text-xs font-heading font-extrabold uppercase tracking-widest bg-white shadow-gold-glow">
                        <Sparkles className="w-3.5 h-3.5 text-gold fill-current" />
                        <span className="text-foreground">{t.badge}</span>
                      </div>
                    </div>
                  )}
                  <p className={`text-[10px] uppercase tracking-[0.2em] mb-2 mt-2 ${t.primary ? "text-white/80" : "text-muted-foreground"}`}>{t.name}</p>
                  <p className={`text-sm mb-5 leading-relaxed ${t.primary ? "text-white/85" : "text-foreground/75"}`}>{t.desc}</p>
                  <div className={`mb-6 pb-6 border-b ${t.primary ? "border-white/20" : "border-border"}`}>
                    <p className={`font-heading font-extrabold text-5xl lg:text-6xl tracking-[-0.04em] ${t.primary ? "text-white" : "gradient-text"}`}>${t.price}</p>
                    <p className={`text-sm mt-1 ${t.primary ? "text-white/75" : "text-foreground/65"}`}>{t.period}</p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {t.features.map((f) => (
                      <li key={f} className={`flex items-start gap-2.5 text-sm leading-snug ${t.primary ? "text-white/90" : "text-foreground/85"}`}>
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${t.primary ? "text-gold-light" : "text-primary"}`} />
                        <span dangerouslySetInnerHTML={{ __html: f }} />
                      </li>
                    ))}
                  </ul>
                  <a
                    href={CAL_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      t.primary
                        ? "inline-flex items-center justify-center gap-2 bg-white text-primary font-heading font-bold text-sm rounded-full px-6 py-3.5 hover:scale-[1.02] transition shadow-gold-glow"
                        : "hero-cta-primary"
                    }
                  >
                    {t.primary ? (
                      <>{t.cta} <ArrowRight className="w-4 h-4" /></>
                    ) : (
                      <span className="hero-cta-inner justify-center">
                        {t.cta} <ArrowRight className="w-4 h-4 btn-icon" />
                      </span>
                    )}
                  </a>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-foreground/65 mt-7">
              Retainer is month-to-month. Cancel anytime.
            </p>
          </div>
        </section>

        {/* ============ GUARANTEE ============ */}
        <section className="py-14 lg:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative p-[2.5px] rounded-[2rem] bg-gold-gradient shadow-gold-glow">
              <div
                className="relative overflow-hidden rounded-[1.9rem] p-10 md:p-14 text-center"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 100%)" }}
              >
                <div className="absolute inset-0 grain-bg opacity-40 pointer-events-none" />
                <div className="relative z-10">
                  <Shield className="w-14 h-14 mx-auto mb-5 text-gold-light" strokeWidth={1.5} />
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-3 text-white/80">The promise</p>
                  <h2 className="font-heading font-extrabold text-3xl lg:text-5xl tracking-[-0.03em] leading-[1] text-white mb-5">
                    Live in 14 days.<br/>
                    <span className="font-serif-italic text-gold-light">Or your deposit back.</span>
                  </h2>
                  <p className="text-base lg:text-lg leading-relaxed max-w-2xl mx-auto text-white/95">
                    Miss the launch window and I refund your deposit, you keep the design files. Milestone billing means you only pay when each stage ships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" className="py-14 lg:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">FAQ</p>
              <h2 className="font-heading font-extrabold text-3xl lg:text-5xl tracking-[-0.03em] leading-[1.05] text-foreground">
                Common questions, <span className="font-serif-italic gradient-text">straight answers.</span>
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full bg-card border border-border rounded-2xl p-5 lg:p-6 text-left grain-bg hover:border-primary/40 transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-heading font-bold text-base lg:text-lg text-foreground">{f.q}</h3>
                    <span className={`w-7 h-7 rounded-full bg-primary-soft border border-primary/30 flex items-center justify-center text-primary shrink-0 transition-transform ${openFaq === i ? "rotate-45" : ""}`}>
                      <Plus className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  {openFaq === i && (
                    <p className="text-foreground/75 leading-relaxed mt-3 text-sm lg:text-base"
                       dangerouslySetInnerHTML={{ __html: f.a }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section id="book" className="py-14 lg:py-20 px-4 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-primary-light/[0.08] blur-[160px]" />
          <div className="relative max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">Get started</p>
              <h2 className="font-heading font-extrabold text-3xl lg:text-6xl tracking-[-0.03em] leading-[1] text-foreground">
                Two ways to start. <span className="font-serif-italic gradient-text">Both free.</span>
              </h2>
              <p className="mt-6 text-base lg:text-lg text-foreground/75 max-w-2xl mx-auto leading-relaxed">
                Book the call, or send your URL and I&apos;ll send a personal audit. No pitch unless you ask for one.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
              <div className="bg-card border border-border rounded-3xl p-8 grain-bg shadow-card-hover">
                <div className="icon-box icon-box-lg mb-5">
                  <Calendar className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-extrabold text-2xl mb-3 text-foreground">Book the call</h3>
                <p className="text-foreground/75 mb-6 leading-relaxed text-sm">
                  15 minutes. Bring your URL, fleet size and biggest bottleneck. You walk away with a clear plan.
                </p>
                <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="hero-cta-primary inline-block w-full">
                  <span className="hero-cta-inner justify-center w-full">
                    Book 15-min call
                    <ArrowRight className="w-4 h-4 btn-icon" />
                  </span>
                </a>
              </div>

              <div className="bg-card border border-border rounded-3xl p-8 grain-bg shadow-card-hover">
                <div className="icon-box icon-box-lg mb-5">
                  <Send className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-extrabold text-2xl mb-3 text-foreground">Get a Loom audit</h3>
                <p className="text-foreground/75 mb-5 leading-relaxed text-sm">
                  No call. Drop your URL and I&apos;ll record a personal 10-min Loom within 24 hours.
                </p>
                {submitted ? (
                  <div className="bg-primary-soft border border-primary/20 rounded-xl p-6 text-center">
                    <div className="text-4xl mb-3">✅</div>
                    <p className="font-heading font-bold text-foreground mb-2">Request received!</p>
                    <p className="text-sm text-foreground/75">I&apos;ll record your personal Loom audit and email it within 24 hours.</p>
                  </div>
                ) : (
                <form onSubmit={submitAudit} className="space-y-2.5">
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition placeholder:text-muted-foreground" />
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Your email" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition placeholder:text-muted-foreground" />
                  <input type="text" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="Your website" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition placeholder:text-muted-foreground" />
                  <textarea rows={2} value={form.bottleneck} onChange={(e) => setForm({ ...form, bottleneck: e.target.value })} placeholder="Message / biggest challenges" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition resize-none placeholder:text-muted-foreground" />
                  <button type="submit" disabled={submitting} className="hero-cta-primary inline-block w-full disabled:opacity-60">
                    <span className="hero-cta-inner justify-center w-full">
                      {submitting ? "Sending…" : "Send audit request"}
                      <ArrowRight className="w-4 h-4 btn-icon" />
                    </span>
                  </button>
                </form>
                )}
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-foreground/65">
                Prefer chat?{" "}
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold underline underline-offset-4 hover:no-underline">
                  Message on WhatsApp →
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Mobile floating CTA */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden flex">
        <a href="#book" className="hero-cta-primary flex-1">
          <span className="hero-cta-inner justify-center w-full">
            Book a free audit
          </span>
        </a>
      </div>
    </div>
  );
};

export default LogisticsSolutions;

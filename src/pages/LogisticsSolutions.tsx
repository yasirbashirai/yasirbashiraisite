import { useState, useEffect } from "react";
import {
  ArrowRight, Calendar, Play, Check, Truck, Package, Phone, Sparkles, Shield, Clock,
  Globe, LayoutDashboard, Smartphone, MessageSquare, Target, Lock, Zap, Users, AlertTriangle,
  Boxes, Building2, Send, Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingSocials from "@/components/FloatingSocials";
import WhatsAppChatbot from "@/components/WhatsAppChatbot";
import Section from "@/components/Section";

const CAL_LINK = "https://cal.com/yasir-bashir-bp4wob/30min";
const WHATSAPP_LINK = "https://wa.me/923446012505?text=Hi%20Yasir%20%E2%80%94%20saw%20your%20Logistics%20Solutions%20page";

const clientAvatars = [
  { initials: "JR", color: "from-pink-500 to-purple-600" },
  { initials: "SM", color: "from-blue-500 to-cyan-500" },
  { initials: "AK", color: "from-green-500 to-emerald-500" },
  { initials: "MT", color: "from-orange-500 to-red-500" },
  { initials: "LP", color: "from-violet-500 to-indigo-500" },
];

const heroOffers = [
  {
    icon: Globe,
    emoji: "🌐",
    title: "Logistics Websites & Funnels",
    pain: "Losing leads to a slow site or weak booking form",
    solution: "Sites that load drivers, applications, and bookings — not just pretty visuals",
    cta1: "Book Free Audit",
    cta2: "See How It Works",
  },
  {
    icon: LayoutDashboard,
    emoji: "📊",
    title: "Dispatch & Driver Apps",
    pain: "Juggling 4 tools, chasing PODs at 9 PM, $24K/yr in per-seat TMS licenses",
    solution: "Custom dispatch dashboards + driver mobile apps you own forever",
    cta1: "Get My Dashboard",
    cta2: "View Demo",
  },
  {
    icon: Sparkles,
    emoji: "🤖",
    title: "AI Dispatcher Agent™",
    pain: "Generic AI agents that don't know your lanes, rates, or brokers",
    solution: "Custom AI agent wired to YOUR ops — voice + WhatsApp + web, books while you sleep",
    cta1: "Start My AI Agent",
    cta2: "View Use Cases",
  },
];

const industries = [
  { icon: "🚛", name: "Carriers", desc: "Asset-based fleets booking direct loads" },
  { icon: "📋", name: "Freight Brokers", desc: "Scaling brokerages without 3 more reps" },
  { icon: "📦", name: "3PLs", desc: "Multi-service ops needing one unified system" },
  { icon: "📞", name: "Dispatch Services", desc: "Managing 5–50 owner-ops on one dashboard" },
  { icon: "🛣️", name: "Owner-Operators", desc: "1–3 truck pros looking pro online" },
  { icon: "🏠", name: "Moving Companies", desc: "Replacing $25/lead Thumbtack with own funnel" },
  { icon: "🚗", name: "Car Haulers", desc: "Auto transport without Central Dispatch race" },
  { icon: "⚡", name: "Hot Shot & Courier", desc: "Specialized haulers and last-mile couriers" },
];

const painPoints = [
  { emoji: "🐌", title: "Slow site", desc: "8-second mobile load. Drivers bounce before the apply button renders." },
  { emoji: "👻", title: "Leads ghost", desc: "Quote form takes 14 seconds, 9 taps. Every second drops conversion 8%." },
  { emoji: "⚙️", title: "Manual ops", desc: "Dispatcher juggles 4 tools, emails rate cons at 11 PM, chases PODs all weekend." },
  { emoji: "💸", title: "Wasted spend", desc: "$25/lead on Thumbtack. $200/mo to Samsara. $50K McLeod implementation." },
];

const services = [
  { icon: "🌐", name: "Logistics Website", desc: "Brand-grade site, mobile-first, SEO-tuned. Built to load drivers, leads, and applications.", price: "$1,500", ship: "14-day ship" },
  { icon: "🔐", name: "Broker / Carrier Portal", desc: "Quote requests, load tracking, customer logins, MC# verification to catch double-broker scams.", price: "$2,500", ship: "21-day ship" },
  { icon: "📊", name: "Dispatch Dashboard™", desc: "Internal app for loads, drivers, KPIs. Replaces $24K/year of per-seat TMS licenses.", price: "$3,000", ship: "30-day ship", flagship: true },
  { icon: "📱", name: "Driver App / Portal", desc: "Mobile portal for drivers — POD upload, check-ins, pay status, load assignment. iOS + Android.", price: "$2,500", ship: "21-day ship" },
  { icon: "💬", name: "Smart Chatbot", desc: "24/7 quote-responder on your site + WhatsApp. Books while you sleep across time zones.", price: "$500 + $99/mo", ship: "7-day ship" },
  { icon: "🎯", name: "CRM Setup (GHL)", desc: "Pipeline, automations, SMS + email sequences. No more leads slipping through the cracks.", price: "$750 + $97/mo", ship: "10-day ship" },
];

const stats = [
  { value: "800+", label: "Logistics builds delivered" },
  { value: "5 yrs", label: "Specialized in logistics only" },
  { value: "14 days", label: "Average launch time" },
  { value: "4.9★", label: "Across 4 Fiverr accounts" },
];

const testimonials = [
  {
    initials: "M",
    color: "from-pink-500 to-purple-600",
    role: "Operations Director",
    company: "Mid-market freight broker · Atlanta",
    quote: "Yasir rebuilt our broker portal in 11 days. Carrier onboarding went from 3 days to 20 minutes. Already paid for itself.",
  },
  {
    initials: "J",
    color: "from-cyan-500 to-blue-600",
    role: "Owner",
    company: "14-truck carrier · Houston",
    quote: "We were paying Samsara $400/month and still couldn't see truck-level profit. Yasir built us a custom dashboard for less than a year of Samsara.",
  },
  {
    initials: "R",
    color: "from-orange-500 to-red-600",
    role: "Owner",
    company: "Local moving company · Dallas",
    quote: "Our quote form was killing us. New booking widget went live and bookings went up 31% in week one. Worth every dollar.",
  },
];

const process = [
  { num: 1, day: "Day 1", title: "Free audit", desc: "Submit your URL — we send a 10-min Loom teardown within 24 hours. No call required." },
  { num: 2, day: "Day 3", title: "Design approved", desc: "You see the new site in Figma. One round of revisions included. No mockup ping-pong." },
  { num: 3, day: "Day 10", title: "Build complete", desc: "Site, integrations, CRM, chatbot — all wired and live in staging. You QA on real devices." },
  { num: 4, day: "Day 14", title: "Launched", desc: "New site live, ad pixels firing, leads landing in your CRM. Then we train your team." },
];

const tiers = [
  {
    badge: "Starter",
    name: "Logistics Site Sprint",
    desc: "For owner-ops and small carriers who need a real site, fast.",
    price: "$1,500",
    period: "one-time",
    features: [
      "5-page Framer site (mobile-first)",
      "Quote/contact form → your inbox",
      "GA4 + Meta Pixel installed",
      "14-day delivery",
      "14-Day Launch Guarantee",
    ],
    cta: "Start with Starter",
    highlight: false,
  },
  {
    badge: "Most Popular",
    name: "Booking Stack",
    desc: "For carriers + brokers ready to convert visitors into booked loads.",
    price: "$3,500",
    period: "+ $497/mo",
    features: [
      "Everything in Starter",
      "Quote / booking portal",
      "AI chatbot (Chatbase)",
      "CRM setup (GoHighLevel)",
      "1 case study page",
      "21-day delivery",
    ],
    cta: "Start with Pro",
    highlight: true,
  },
  {
    badge: "Premium",
    name: "Ops Stack",
    desc: "For 5–50 truck fleets and brokerages replacing 4 tools with one.",
    price: "$7,500",
    period: "+ $1,497/mo",
    features: [
      "Everything in Pro",
      "Custom dispatch dashboard OR driver app OR broker portal",
      "Samsara / Motive API integration",
      "Monthly content + SEO",
      "30-day delivery",
    ],
    cta: "Start with Premium",
    highlight: false,
  },
];

const faqs = [
  { q: "How long does a build take?", a: "Standard 14 days. Complex builds (dispatch dashboards, broker portals) 21–30 days." },
  { q: "Do you work with non-US logistics businesses?", a: "Primary focus is US. We take UK/EU on request." },
  { q: "What if I already have a website?", a: "We audit, then rebuild or upgrade. Free 10-min Loom audit available — submit your URL below." },
  { q: "Do you require a retainer?", a: "No. Retainers are optional and month-to-month. Cancel anytime." },
  { q: "What tech stack do you use?", a: "Framer for marketing sites; Next.js for portals/dashboards; GoHighLevel for CRM; n8n for automation." },
  { q: "Can you integrate with my TMS?", a: "Yes — McLeod, Samsara, Motive, AscendTMS, LoadOps, Truckbase via API or Zapier/n8n." },
  { q: "Do you handle hosting?", a: "Yes, included for 12 months. Then $25/mo or you take ownership." },
  { q: "What about ongoing changes?", a: "Included on retainers. One-off changes: $99 each." },
];

const LogisticsSolutions = () => {
  const [form, setForm] = useState({ name: "", email: "", url: "", bottleneck: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // SEO — set title + meta tags on mount
  useEffect(() => {
    document.title = "Logistics Solutions | Yasir Bashir — Build Logistics Systems";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "I help US trucking, freight, dispatch & moving companies build websites, dispatch dashboards, driver apps & AI systems. 800+ logistics projects. Shipped in 14 days.");
  }, []);

  const submitAudit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Loom audit request — ${form.name}`);
    const body = encodeURIComponent(
      `New free Loom audit request from yasirbashir.com/logistics-solutions\n\n` +
      `Name: ${form.name}\nEmail: ${form.email}\nWebsite: ${form.url}\n` +
      `Bottleneck: ${form.bottleneck || "(not provided)"}\n`
    );
    window.location.href = `mailto:yasirbashirai@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen relative">
      <div className="grid-background" aria-hidden="true" />

      <Navbar />
      <FloatingSocials />
      <WhatsAppChatbot />

      <main className="relative z-10">

        {/* ========= HERO (mirrors homepage Hero pattern) ========= */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-16 overflow-hidden">
          {/* Center hero shine */}
          <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full bg-primary/[0.08] blur-[120px] animate-hero-shine" />
            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] sm:w-[500px] sm:h-[300px] rounded-full bg-primary/[0.12] blur-[80px]" />
          </div>

          {/* Avatars + review pill */}
          <div className="glass-pill mb-8 animate-fade-in relative z-10 py-2 px-4 gap-3">
            <div className="flex -space-x-2">
              {clientAvatars.map((a) => (
                <div key={a.initials} className={`w-8 h-8 rounded-full bg-gradient-to-br ${a.color} flex items-center justify-center text-xs font-bold text-white border-2 border-background`}>
                  {a.initials}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-foreground text-sm font-heading font-bold flex items-center gap-1">
                What Logistics Clients Say <ArrowRight className="w-3 h-3" />
              </span>
              <span className="text-xs text-muted-foreground">
                ⭐⭐⭐⭐⭐ based on 800+ logistics builds
              </span>
            </div>
          </div>

          {/* Tilted "Helping US Logistics" badge */}
          <div className="relative z-10 text-center max-w-5xl mb-6">
            <div className="flex justify-center mb-2">
              <span className="inline-block -rotate-3 text-sm sm:text-base md:text-lg font-heading font-semibold text-primary bg-primary/10 border border-primary/30 px-4 py-1 rounded-full">
                Helping US Logistics Businesses
              </span>
            </div>

            {/* "Build" */}
            <h1 className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground leading-none -mb-2 sm:-mb-3">
              Build
            </h1>

            {/* "Logistics Systems" */}
            <div className="flex items-baseline justify-center gap-3 sm:gap-4 flex-wrap">
              <span className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl gradient-text">
                Logistics
              </span>
              <span className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground">
                Systems
              </span>
            </div>

            {/* Glow line */}
            <div className="flex justify-center mt-2 mb-1">
              <div className="h-[2px] w-48 sm:w-64 md:w-80 bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
            </div>

            {/* Service chips */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4">
              {[
                { icon: "🌐", label: "Logistics Sites" },
                { icon: "📊", label: "Dispatch Dashboards" },
                { icon: "📱", label: "Driver Apps" },
                { icon: "🤖", label: "AI Dispatcher Agent™" },
                { icon: "🔐", label: "Broker Portals" },
              ].map((s) => (
                <span key={s.label} className="glass-pill text-xs sm:text-sm font-heading font-semibold">
                  <span>{s.icon}</span> {s.label}
                </span>
              ))}
            </div>
          </div>

          {/* Subhead */}
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl text-center max-w-3xl mb-10 relative z-10 leading-relaxed">
            I'm Yasir Bashir — <span className="text-foreground font-medium">Logistics Software Engineer &amp; Growth Strategist</span>.
            In 5 years, I've helped <span className="text-foreground font-medium">800+ US carriers, brokers, dispatchers, and movers</span>
            build websites, dispatch dashboards, and AI systems that ship in 14 days.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14 relative z-10">
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="btn-gradient text-base group">
              <Calendar className="w-5 h-5 group-hover:animate-bounce" />
              Book a Free Audit
              <ArrowRight className="w-4 h-4 btn-icon" />
            </a>
            <a href="#process" className="btn-glass text-base group">
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              See How It Works
              <Play className="w-4 h-4 btn-icon" />
            </a>
          </div>

          {/* 3 Hero Offer Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl relative z-10">
            {heroOffers.map((o) => (
              <div key={o.title} className="glass-card p-6 flex flex-col">
                <span className="text-4xl mb-4">{o.emoji}</span>
                <h3 className="font-heading font-bold text-xl text-foreground mb-3">{o.title}</h3>
                <p className="text-sm text-destructive mb-2 leading-relaxed">❌ {o.pain}</p>
                <p className="text-sm text-success mb-5 leading-relaxed">✅ {o.solution}</p>
                <div className="flex flex-wrap gap-3 mt-auto">
                  <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="btn-glass text-xs">
                    {o.cta1} <ArrowRight className="w-3 h-3 btn-icon" />
                  </a>
                  <a href="#services" className="btn-glass text-xs" style={{ background: "transparent", borderColor: "rgba(255,255,255,0.15)" }}>
                    <Play className="w-3 h-3" /> {o.cta2}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========= PAIN STRIP ========= */}
        <Section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="glass-pill mb-5 inline-flex">
                <AlertTriangle className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider">The hidden cost of bad logistics tech</span>
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground mt-6 leading-tight">
                Every day your competitors are<br />
                <span className="gradient-text">eating loads you should be booking.</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {painPoints.map((p) => (
                <div key={p.title} className="glass-card p-6">
                  <div className="text-3xl mb-3">{p.emoji}</div>
                  <h3 className="font-heading font-bold text-foreground mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ========= INDUSTRIES ========= */}
        <Section id="industries" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="glass-pill mb-5 inline-flex text-xs font-bold uppercase tracking-wider">Built for</span>
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground mt-6">
                <span className="gradient-text">8 industries.</span> One playbook.
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                From single-truck owner-ops to mid-market freight brokers.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {industries.map((i) => (
                <a key={i.name} href="#book" className="glass-card p-5 flex flex-col gap-2 group">
                  <span className="text-3xl">{i.icon}</span>
                  <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">{i.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{i.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </Section>

        {/* ========= SERVICES (6 modules) ========= */}
        <Section id="services" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="glass-pill mb-5 inline-flex text-xs font-bold uppercase tracking-wider">Services</span>
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground mt-6">
                <span className="gradient-text">6 modules.</span> Mix what you need.
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                Start with one. Add modules as you grow. Most clients begin with Website + Chatbot + CRM = $2,750.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s) => (
                <div key={s.name} className="glass-card p-6 flex flex-col relative">
                  {s.flagship && (
                    <span className="absolute top-3 right-3 text-[10px] font-heading font-bold uppercase tracking-wider gradient-bg text-primary-foreground px-2 py-1 rounded-md">
                      DispatchOS™
                    </span>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{s.icon}</span>
                    <span className="text-xs text-muted-foreground font-mono">{s.ship}</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">{s.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{s.desc}</p>
                  <div className="flex items-baseline gap-2 pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">From</span>
                    <span className="font-heading font-extrabold text-2xl gradient-text">{s.price}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Flagship Banner */}
            <div className="mt-10 glass-card p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute inset-0 gradient-bg opacity-[0.10]" />
              <div className="relative grid lg:grid-cols-3 gap-6 items-center">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-heading font-bold uppercase tracking-wider gradient-bg text-primary-foreground px-2 py-1 rounded-md">
                      Flagship · 2026
                    </span>
                    <span className="text-xs text-muted-foreground">First agency to build this</span>
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl md:text-4xl text-foreground mb-3">
                    AI Dispatcher Agent™
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A custom AI agent wired to <span className="text-foreground font-medium">your</span> rate floors, <span className="text-foreground font-medium">your</span> lanes, <span className="text-foreground font-medium">your</span> preferred brokers, talking to <span className="text-foreground font-medium">your</span> TMS. Voice + WhatsApp + web. Numeo and FleetWorks sell generic agents. We build yours.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">From</p>
                  <p className="font-heading font-extrabold text-4xl md:text-5xl gradient-text">$9,500</p>
                  <p className="text-sm text-muted-foreground mb-4">+ $1,997/mo · 45-day build</p>
                  <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="btn-gradient text-sm">
                    Talk to Yasir <ArrowRight className="w-4 h-4 btn-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ========= PROOF (Stats + Testimonials) ========= */}
        <Section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="glass-pill mb-5 inline-flex text-xs font-bold uppercase tracking-wider">Proof</span>
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground mt-6">
                <span className="gradient-text">Numbers,</span> not adjectives.
              </h2>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {stats.map((s) => (
                <div key={s.label} className="glass-card p-6 text-center">
                  <p className="font-heading font-extrabold text-4xl md:text-5xl gradient-text">{s.value}</p>
                  <p className="text-sm text-muted-foreground mt-2">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <div key={i} className="glass-card p-7">
                  <div className="flex items-center gap-1 mb-4 text-primary">★★★★★</div>
                  <p className="text-foreground leading-relaxed mb-5">"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center font-bold text-white`}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-sm text-foreground">{t.role}</p>
                      <p className="text-xs text-muted-foreground">{t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ========= PROCESS ========= */}
        <Section id="process" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="glass-pill mb-5 inline-flex text-xs font-bold uppercase tracking-wider">How it works</span>
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground mt-6">
                From audit to live in <span className="gradient-text">14 days.</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                No 6-week discovery decks. No 12 stakeholder calls. Just shipping.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {process.map((p) => (
                <div key={p.num} className="glass-card p-7 relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full gradient-bg flex items-center justify-center font-heading font-extrabold text-primary-foreground text-lg">
                    {p.num}
                  </div>
                  <p className="text-xs text-primary font-bold uppercase tracking-wider mt-2 mb-2">{p.day}</p>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ========= PRICING ========= */}
        <Section id="pricing" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="glass-pill mb-5 inline-flex text-xs font-bold uppercase tracking-wider">Pricing</span>
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground mt-6">
                <span className="gradient-text">Three tiers.</span> Public pricing.
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                Most logistics agencies hide rates. We don't.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {tiers.map((t) => (
                <div
                  key={t.name}
                  className={`glass-card p-8 flex flex-col ${t.highlight ? "ring-2 ring-primary" : ""}`}
                  style={t.highlight ? { animation: "pulse-glow 3s ease-in-out infinite" } : undefined}
                >
                  <div className={`inline-block self-start px-3 py-1 rounded-full text-xs font-heading font-bold mb-4 ${
                    t.highlight ? "gradient-bg text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {t.badge}
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl text-foreground mb-2">{t.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{t.desc}</p>
                  <div className="mb-6">
                    <span className="font-heading font-extrabold text-4xl gradient-text">{t.price}</span>
                    <span className="text-muted-foreground text-sm ml-2">{t.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={CAL_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={t.highlight ? "btn-gradient justify-center" : "btn-glass justify-center"}
                  >
                    {t.cta} <ArrowRight className="w-4 h-4 btn-icon" />
                  </a>
                </div>
              ))}
            </div>

            <p className="text-center text-muted-foreground text-sm">
              No retainer lock-in. Cancel anytime. Full quote on the discovery call.
            </p>
          </div>
        </Section>

        {/* ========= GUARANTEE ========= */}
        <Section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 lg:p-14 text-center relative overflow-hidden">
              <div className="absolute inset-0 gradient-bg opacity-[0.08]" />
              <div className="relative">
                <Shield className="w-16 h-16 mx-auto mb-5 text-primary" />
                <h2 className="font-heading font-extrabold text-3xl lg:text-5xl text-foreground mb-5">
                  The <span className="gradient-text">14-Day Launch</span> Guarantee.
                </h2>
                <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 leading-relaxed">
                  Your site launches inside 14 days from kickoff — or we <span className="text-foreground font-semibold">refund your deposit</span> and you keep all design files. No back-and-forth.
                </p>
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-card/50 px-4 py-2.5 rounded-full border border-border flex-wrap justify-center">
                  <span className="text-primary font-medium">+ Bonus:</span>
                  <span className="text-foreground font-semibold">30-Day Performance Promise</span>
                  <span>— zero leads in 30 days = free hero/copy/CTA rebuild.</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ========= FOUNDER ========= */}
        <Section className="py-20 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 items-center">
            <div className="md:col-span-1">
              <div className="aspect-square w-full max-w-[280px] mx-auto rounded-3xl gradient-bg flex items-center justify-center font-heading font-extrabold text-7xl text-primary-foreground shadow-2xl shadow-primary/30">
                YB
              </div>
            </div>
            <div className="md:col-span-2">
              <span className="glass-pill mb-4 inline-flex text-xs font-bold uppercase tracking-wider">From the founder</span>
              <h2 className="font-heading font-extrabold text-3xl lg:text-5xl text-foreground mt-4 mb-5">
                Hi — I'm <span className="gradient-text">Yasir.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I've spent 5 years building websites for trucking, freight, and moving companies. <span className="text-foreground font-medium">800+ of them</span>, across Fiverr, Upwork, and direct contracts.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Most logistics owners get fleeced by two kinds of agencies: marketing shops that don't understand dispatch, and software shops that don't understand marketing. So I built this — <span className="text-foreground font-medium">one team, one bill, one timeline</span>.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                If you run a US logistics business and your site is older than your last truck purchase, let's talk.
              </p>
              <p className="text-sm text-muted-foreground">
                yasirbashirai@gmail.com · +92 344 601 2505
              </p>
            </div>
          </div>
        </Section>

        {/* ========= FAQ ========= */}
        <Section id="faq" className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="glass-pill mb-5 inline-flex text-xs font-bold uppercase tracking-wider">FAQ</span>
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground mt-6">
                <span className="gradient-text">Questions,</span> answered.
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="glass-card p-6 w-full text-left"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-heading font-semibold text-base md:text-lg text-foreground">{f.q}</span>
                    <span className={`w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-primary-foreground shrink-0 transition-transform ${openFaq === i ? "rotate-45" : ""}`}>
                      <Plus className="w-4 h-4" />
                    </span>
                  </div>
                  {openFaq === i && (
                    <p className="text-muted-foreground mt-4 leading-relaxed">{f.a}</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </Section>

        {/* ========= FINAL CTA + AUDIT FORM ========= */}
        <Section id="book" className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.10] blur-[120px]" />
          </div>
          <div className="max-w-5xl mx-auto relative">
            <div className="text-center mb-14">
              <span className="glass-pill mb-5 inline-flex text-xs font-bold uppercase tracking-wider">Get Started</span>
              <h2 className="font-heading font-extrabold text-4xl md:text-6xl text-foreground mt-6 leading-[1.05]">
                Stop guessing what's<br />
                <span className="gradient-text">broken on your site.</span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Two ways to get started. Both free. Pick what fits.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Book Call */}
              <div className="glass-card p-8 flex flex-col">
                <Calendar className="w-12 h-12 text-primary mb-5" />
                <h3 className="font-heading font-bold text-2xl text-foreground mb-3">Book a 15-min call</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                  Direct conversation. Bring your URL, fleet size, and biggest bottleneck. You'll get a custom plan in 15 minutes.
                </p>
                <ul className="space-y-2 text-sm mb-8">
                  {["Real diagnosis on your live site", "Custom pricing within 24 hrs", "No sales pressure — promise"].map((item) => (
                    <li key={item} className="flex gap-2 text-muted-foreground">
                      <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="btn-gradient justify-center">
                  Book Free 15-Min Call <ArrowRight className="w-4 h-4 btn-icon" />
                </a>
              </div>

              {/* Audit Form */}
              <div id="audit" className="glass-card p-8">
                <Send className="w-12 h-12 text-primary mb-5" />
                <h3 className="font-heading font-bold text-2xl text-foreground mb-3">Get a 10-min Loom audit</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  No call. Drop your URL — Yasir records a personal Loom within 24 hours showing 3 specific things to fix.
                </p>
                <form onSubmit={submitAudit} className="space-y-3">
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-card/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition placeholder:text-muted-foreground"
                  />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full bg-card/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition placeholder:text-muted-foreground"
                  />
                  <input
                    type="url"
                    required
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                    placeholder="https://yourcompany.com"
                    className="w-full bg-card/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition placeholder:text-muted-foreground"
                  />
                  <textarea
                    rows={2}
                    value={form.bottleneck}
                    onChange={(e) => setForm({ ...form, bottleneck: e.target.value })}
                    placeholder="Biggest bottleneck right now? (optional)"
                    className="w-full bg-card/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition resize-none placeholder:text-muted-foreground"
                  />
                  <button type="submit" className="btn-gradient w-full justify-center">
                    Get My Loom Audit <ArrowRight className="w-4 h-4 btn-icon" />
                  </button>
                  <p className="text-xs text-muted-foreground text-center">
                    Loom sent within 24 hours. Zero spam, ever.
                  </p>
                </form>
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm text-muted-foreground">
                Prefer WhatsApp?{" "}
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-success hover:underline font-medium">
                  Message Yasir directly →
                </a>
              </p>
            </div>
          </div>
        </Section>

      </main>
      <Footer />
    </div>
  );
};

export default LogisticsSolutions;

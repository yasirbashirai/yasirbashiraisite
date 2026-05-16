import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, ArrowUpRight, Calendar, Check, Sparkles, Play, Plus,
  Truck, Package, LayoutDashboard, Smartphone, Bot, Shield,
  Send, Phone, ChevronRight, Star, Zap, Clock, TrendingUp, Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import LogisticsVersionSwitcher from "@/components/LogisticsVersionSwitcher";
import LogisticsPortfolio from "@/components/LogisticsPortfolio";

const CAL_LINK = "https://cal.com/yasir-bashir-bp4wob/30min";
const WHATSAPP_LINK = "https://wa.me/923446012505?text=Hi%20Yasir%20%E2%80%94%20saw%20your%20Logistics%20Solutions%20page";

// ============ DATA ============
const trustLogos = [
  "SFam Logistics", "Earth Logistics", "Steer Logistics", "Jon's Material Hauling",
  "Arnold Freight Co", "Fairway Logistics", "Movements Transport", "BTI Logistics",
];

const services = [
  {
    no: "01",
    icon: LayoutDashboard,
    name: "Dispatch Dashboard",
    sub: "DispatchOS™",
    body: "Internal control room for loads, drivers, KPIs. Replaces $24K/yr of per-seat TMS licenses with one custom system you own forever.",
    price: "$3,000+",
    ship: "30 days",
    span: "lg:col-span-2 lg:row-span-2",
    accent: true,
  },
  {
    no: "02",
    icon: Bot,
    name: "AI Dispatcher Agent",
    sub: "Flagship · 2026",
    body: "Custom AI wired to YOUR rates, lanes, brokers. Voice + WhatsApp + web. Books while you sleep.",
    price: "$9,500+",
    ship: "45 days",
    flagship: true,
  },
  {
    no: "03",
    icon: Truck,
    name: "Logistics Website",
    sub: "Brand-grade",
    body: "Mobile-first, SEO-tuned, load-converting. Built for trucking owners, not designers.",
    price: "$1,500+",
    ship: "14 days",
  },
  {
    no: "04",
    icon: Smartphone,
    name: "Driver App",
    sub: "iOS + Android",
    body: "POD upload, check-ins, pay status, load assignment in their pocket.",
    price: "$2,500+",
    ship: "21 days",
  },
  {
    no: "05",
    icon: Shield,
    name: "Broker Portal",
    sub: "Carrier-grade",
    body: "Quote requests, MC# verification, payment tracking. Catches the double-broker scams.",
    price: "$2,500+",
    ship: "21 days",
  },
  {
    no: "06",
    icon: Sparkles,
    name: "Smart Chatbot + CRM",
    sub: "GoHighLevel",
    body: "24/7 quote responder + pipeline automation. SMS, email, web, WhatsApp — one inbox.",
    price: "$1,250+",
    ship: "10 days",
  },
];

const stats = [
  { value: "800", suffix: "+", label: "Logistics builds", sub: "Across 5 years" },
  { value: "14", suffix: " days", label: "Average ship time", sub: "Concept to live" },
  { value: "4.9", suffix: "★", label: "Client rating", sub: "Across 4 platforms" },
  { value: "97", suffix: "%", label: "Of US carriers", sub: "Run <10 trucks — our sweet spot" },
];

const process = [
  { day: "DAY 01", title: "Free Loom Audit", desc: "Submit your URL. We record a 10-min teardown showing 3 specific fixes within 24 hours. No call required." },
  { day: "DAY 03", title: "Design Approved", desc: "You see the new site in Figma. One revision round included. We move fast — no 3-week mockup ping-pong." },
  { day: "DAY 10", title: "Build Complete", desc: "Site, integrations, CRM, chatbot — all wired and live in staging. You QA on real devices over the weekend." },
  { day: "DAY 14", title: "Launched", desc: "New site live, ad pixels firing, leads landing in your CRM. We train your team. You start booking loads." },
];

const tiers = [
  {
    name: "Starter",
    handle: "logistics_site_sprint",
    price: "1,500",
    period: "one-time",
    desc: "For owner-ops & small carriers who need a real site, fast.",
    features: [
      "5-page custom site",
      "Mobile-first, SEO-tuned",
      "GA4 + Meta Pixel installed",
      "Quote/contact form → your inbox",
      "14-day delivery",
    ],
    cta: "Start with Starter",
    primary: false,
  },
  {
    name: "Booking Stack",
    handle: "logistics_booking_stack",
    price: "3,500",
    period: "+ $497/mo",
    desc: "For carriers + brokers turning visitors into booked loads.",
    badge: "Most Popular",
    features: [
      "Everything in Starter",
      "Quote / booking portal",
      "AI chatbot (Chatbase)",
      "CRM setup (GoHighLevel)",
      "1 case study page",
      "21-day delivery",
    ],
    cta: "Start with Pro",
    primary: true,
  },
  {
    name: "Ops Stack",
    handle: "logistics_ops_stack",
    price: "7,500",
    period: "+ $1,497/mo",
    desc: "For 5–50 truck fleets and brokerages replacing 4 tools with one.",
    features: [
      "Everything in Booking Stack",
      "Custom dispatch dashboard OR driver app OR broker portal",
      "Samsara / Motive API integration",
      "Monthly content + SEO",
      "30-day delivery",
    ],
    cta: "Start with Premium",
    primary: false,
  },
];

const industries = [
  "Carriers", "Freight Brokers", "3PL & Distribution", "Dispatch Services",
  "Owner-Operators", "Moving Companies", "Car Haulers", "Hot Shot", "Couriers",
];

const testimonials = [
  {
    quote: "Rebuilt our broker portal in 11 days. Carrier onboarding went from 3 days to 20 minutes. Already paid for itself.",
    name: "Mike R.",
    role: "Operations Director",
    company: "Mid-market freight broker · Atlanta, GA",
  },
  {
    quote: "We were paying Samsara $400/month and still couldn't see truck-level profit. Yasir built us a custom dashboard for less than a year of Samsara.",
    name: "James K.",
    role: "Owner",
    company: "14-truck asset carrier · Houston, TX",
  },
  {
    quote: "Quote form was killing us. New booking widget went live and bookings went up 31% in week one. Worth every dollar.",
    name: "Rachel D.",
    role: "Owner",
    company: "Local moving company · Dallas, TX",
  },
];

const faqs = [
  { q: "How long does a build take?", a: "Standard: 14 days for a logistics site, 21 days for booking stacks, 30 days for dispatch dashboards. We work in sprints — no 3-month enterprise crawl." },
  { q: "Do you work with non-US logistics companies?", a: "Primary focus is US carriers, brokers, dispatch services, movers, couriers, and car haulers. We take UK/EU on request after a fit call." },
  { q: "What if I already have a website?", a: "We audit, then rebuild or upgrade. The free 10-min Loom audit tells you what's actually broken before you spend anything." },
  { q: "Is the retainer locked in?", a: "Never. Month-to-month. Cancel anytime. We earn the retainer every month or you walk." },
  { q: "What tech stack do you use?", a: "Framer for marketing sites. Next.js for portals & dashboards. GoHighLevel for CRM. n8n for automation. Built to be owned by you, not us." },
  { q: "Can you integrate with my TMS?", a: "Yes — McLeod, Samsara, Motive, AscendTMS, LoadOps, Truckbase, Trimble, DAT, Truckstop. All via API or n8n/Zapier." },
  { q: "Do you handle hosting?", a: "Yes, included for 12 months. After that, $25/mo or you take ownership of the deployment." },
  { q: "What about ongoing changes?", a: "Included free on retainers. One-off changes: $99 each, turned around in 48 hours." },
];

// ============ COMPONENT ============
const LogisticsSolutions = () => {
  const [form, setForm] = useState({ name: "", email: "", url: "", bottleneck: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.title = "Logistics Solutions — Engineered for US Carriers, Brokers & Dispatchers | Yasir Bashir";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Premium logistics websites, dispatch dashboards, driver apps, and AI Dispatcher Agents for US trucking, freight, and moving companies. 800+ builds. Shipped in 14 days.");
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
    <div className="min-h-screen bg-background text-foreground antialiased">
      <LogisticsVersionSwitcher />

      {/* ============ MINIMAL FUNNEL NAV ============ */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-2xl bg-background/80 border-b border-primary/20" : ""}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="w-9 h-9 rounded-md gradient-bg flex items-center justify-center font-heading font-extrabold text-sm text-primary-foreground">YB</span>
            <div className="flex flex-col leading-none">
              <span className="font-heading font-extrabold text-sm tracking-tight">YASIR BASHIR</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5 group-hover:text-primary transition">← Main Site</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>Logistics Solutions</span>
            <span className="text-muted-foreground/40">/</span>
            <span>2026 Funnel</span>
          </div>

          <div className="flex items-center gap-2">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hidden sm:flex w-9 h-9 rounded-md bg-[#25D366]/10 border border-[#25D366]/30 items-center justify-center text-[#25D366] hover:bg-[#25D366]/20 transition">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
            </a>
            <a href="#book" className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition">
              Book Audit
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </header>

      {/* ============ HERO — Split / Editorial ============ */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
        {/* Background grid + glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.5]" style={{
            backgroundImage: "linear-gradient(rgba(223,0,137,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(223,0,137,0.04) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%,black,transparent 70%)",
          }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-primary/[0.18] blur-[140px]" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">

          {/* Top eyebrow row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-6 border-b border-primary/10">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs uppercase tracking-[0.18em] text-primary font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Now Booking · Q2 2026
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider hidden sm:inline">For US Logistics Operators</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
              <span className="ml-1 font-heading font-bold text-foreground">4.9</span>
              <span>· based on 800+ logistics builds</span>
            </div>
          </div>

          {/* Editorial split layout */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left: Headline + CTA */}
            <div className="lg:col-span-7">
              <h1 className="font-heading font-extrabold tracking-[-0.045em] leading-[0.88] text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8.5vw] xl:text-[140px] text-foreground">
                Logistics<br/>
                <span className="gradient-text inline-block">Solutions</span><br/>
                <span className="text-foreground/70 italic font-medium text-[10vw] sm:text-[8vw] md:text-[7vw] lg:text-[6vw] xl:text-[100px]">at scale.</span>
              </h1>

              <p className="mt-8 max-w-xl text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Websites, dispatch dashboards, and AI Dispatcher Agents — <span className="text-foreground font-medium">engineered for US trucking, freight, dispatchers, and movers.</span> Shipped in 14 days. Built by the team that delivered 800+ logistics projects.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#book" className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 rounded-md font-bold text-base uppercase tracking-wider hover:bg-primary/90 transition shadow-[0_0_40px_-8px_hsl(323,100%,44%,0.6)]">
                  <Calendar className="w-5 h-5" />
                  Book Free Audit
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#services" className="group inline-flex items-center gap-2 text-foreground font-semibold border-b-2 border-primary pb-1 hover:gap-3 transition-all">
                  See what we build
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Industry tags */}
              <div className="mt-12 grid grid-cols-3 sm:grid-cols-5 gap-0 border-t border-l border-primary/15">
                {industries.slice(0, 5).map((i) => (
                  <div key={i} className="border-b border-r border-primary/15 px-3 py-3 text-xs uppercase tracking-wider font-bold text-center text-foreground/70 hover:bg-primary/5 hover:text-primary transition cursor-default">
                    {i}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Dashboard preview card */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-3xl" aria-hidden="true" />
                <div className="relative bg-card border border-primary/30 rounded-md overflow-hidden shadow-2xl">
                  {/* Browser chrome */}
                  <div className="flex items-center justify-between bg-background/60 border-b border-primary/15 px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-destructive/70" />
                      <span className="w-3 h-3 rounded-full bg-warning/70" />
                      <span className="w-3 h-3 rounded-full bg-success/70" />
                    </div>
                    <span className="text-[11px] text-muted-foreground font-mono">dispatch.yourfleet.com</span>
                    <span className="text-[11px] text-success font-mono">●  LIVE</span>
                  </div>
                  {/* Dashboard content */}
                  <div className="p-5 space-y-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Active Loads</p>
                      <p className="font-heading font-extrabold text-3xl text-foreground">$24,580 <span className="text-success text-base font-medium">↑ 18%</span></p>
                    </div>
                    {[
                      { id: "L-2841", route: "Dallas → Atlanta", driver: "Mike R.", status: "In Transit", color: "success" },
                      { id: "L-2842", route: "Houston → Phoenix", driver: "Sara T.", status: "Delivered", color: "warning" },
                      { id: "L-2843", route: "Chicago → Denver", driver: "Awaiting", status: "Booked", color: "primary" },
                    ].map((l) => (
                      <div key={l.id} className="flex items-center justify-between bg-background/40 border border-primary/10 rounded-md p-3">
                        <div>
                          <p className="text-sm font-bold text-foreground">{l.id} · {l.route}</p>
                          <p className="text-xs text-muted-foreground">{l.driver}</p>
                        </div>
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded ${
                          l.color === "success" ? "bg-success/15 text-success border border-success/30" :
                          l.color === "warning" ? "bg-warning/15 text-warning border border-warning/30" :
                          "bg-primary/15 text-primary border border-primary/30"
                        }`}>{l.status}</span>
                      </div>
                    ))}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-primary/10">
                      <div className="text-center">
                        <p className="text-[10px] uppercase text-muted-foreground">Util</p>
                        <p className="font-heading font-bold text-foreground">87%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] uppercase text-muted-foreground">Empty</p>
                        <p className="font-heading font-bold text-foreground">12%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] uppercase text-muted-foreground">RPM</p>
                        <p className="font-heading font-bold text-foreground">$2.84</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating tag */}
                <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-[10px] uppercase tracking-wider font-bold rotate-3 shadow-lg">
                  Built in 14 days
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ TRUST MARQUEE ============ */}
      <section className="border-y border-primary/10 bg-background/60 py-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground text-center">Trusted by 800+ US Logistics Businesses</p>
        </div>
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...trustLogos, ...trustLogos, ...trustLogos].map((logo, i) => (
              <div key={i} className="mx-8 flex items-center gap-4 font-heading font-bold text-foreground/40 hover:text-primary transition-colors text-lg">
                <span>{logo}</span>
                <span className="text-primary/30">★</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ THE PROBLEM (Editorial Big Type) ============ */}
      <section className="py-24 lg:py-36 relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">§ 01</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground sticky top-32">The Problem</p>
            </div>
            <div className="lg:col-span-9">
              <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-[-0.03em] leading-[1.02] text-foreground">
                Every day your competitors are <span className="gradient-text">eating loads</span> you should be booking.
              </h2>
              <div className="mt-12 grid sm:grid-cols-2 gap-x-12 gap-y-8 text-base lg:text-lg text-muted-foreground leading-relaxed">
                <div className="border-l-2 border-primary pl-5">
                  <p className="font-heading font-bold text-foreground text-xl mb-2">8-second mobile load.</p>
                  <p>Drivers bounce before the apply button renders. Every second above 2.5s costs you 30% of visitors.</p>
                </div>
                <div className="border-l-2 border-primary pl-5">
                  <p className="font-heading font-bold text-foreground text-xl mb-2">Leads that ghost.</p>
                  <p>Quote form takes 14 seconds and 9 taps. Every second drops conversion by 8%.</p>
                </div>
                <div className="border-l-2 border-primary pl-5">
                  <p className="font-heading font-bold text-foreground text-xl mb-2">Dispatcher emails at 11 PM.</p>
                  <p>Juggling 4 tools. Chasing PODs all weekend. Manual rate cons in plain text email.</p>
                </div>
                <div className="border-l-2 border-primary pl-5">
                  <p className="font-heading font-bold text-foreground text-xl mb-2">$24K/year per-seat tax.</p>
                  <p>Paying McLeod, Samsara, AscendTMS, Truckstop — and still nothing talks to anything else.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS BAR ============ */}
      <section className="bg-primary/[0.04] border-y border-primary/15 py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-primary/15">
            {stats.map((s, i) => (
              <div key={i} className="px-6 first:pl-0">
                <p className="font-heading font-extrabold text-5xl lg:text-7xl tracking-[-0.04em] text-foreground leading-none">
                  {s.value}<span className="gradient-text">{s.suffix}</span>
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] font-bold text-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES — BENTO GRID ============ */}
      <section id="services" className="py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-14 items-end">
            <div className="lg:col-span-7">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">§ 02 · What We Build</p>
              <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.02]">
                Six modules. <span className="gradient-text">One system.</span><br/>
                Owned by you forever.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Start with one module. Add the rest as you grow. Most clients begin with Website + Chatbot + CRM = <span className="text-foreground font-bold">$2,750</span> and ship in 21 days.
              </p>
            </div>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[280px]">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className={`group relative ${s.span || ""} bg-card border border-primary/15 rounded-md p-6 lg:p-8 overflow-hidden hover:border-primary/50 transition-colors flex flex-col ${s.accent ? "lg:p-10" : ""}`}
                >
                  {s.flagship && (
                    <span className="absolute top-4 right-4 text-[9px] uppercase tracking-wider font-bold bg-primary text-primary-foreground px-2 py-1 rounded">
                      Flagship
                    </span>
                  )}

                  <div className="flex items-start justify-between mb-auto">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">{s.no}</p>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{s.sub}</p>
                      <h3 className={`font-heading font-extrabold tracking-tight text-foreground ${s.accent ? "text-3xl lg:text-5xl" : "text-xl lg:text-2xl"}`}>
                        {s.name}
                      </h3>
                    </div>
                    {s.accent && (
                      <div className="hidden lg:block">
                        <Icon className="w-12 h-12 text-primary" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>

                  <p className={`text-muted-foreground leading-relaxed my-4 ${s.accent ? "text-base lg:text-lg max-w-md" : "text-sm"}`}>{s.body}</p>

                  <div className="flex items-end justify-between pt-4 border-t border-primary/10">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">From</p>
                      <p className={`font-heading font-extrabold gradient-text ${s.accent ? "text-3xl" : "text-xl"}`}>{s.price}</p>
                    </div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">{s.ship}</p>
                  </div>

                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-primary/[0.03] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ AI DISPATCHER AGENT — Feature Spotlight ============ */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-background to-secondary/[0.08]" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">§ 03 · Flagship Product</p>
              <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-7xl tracking-[-0.04em] leading-[0.95] mb-6">
                The <span className="gradient-text italic">AI Dispatcher Agent™</span> books loads while you sleep.
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
                Numeo and FleetWorks sell <em>generic</em> AI dispatchers. We build <strong className="text-foreground">yours</strong> — wired to your rate floors, your lanes, your preferred brokers, your TMS. Voice. WhatsApp. Web. One agent that talks to your stack.
              </p>
              <div className="space-y-3 max-w-xl mb-10">
                {[
                  "Answers carrier calls 24/7 in natural voice",
                  "Negotiates within your rate floor — never below",
                  "Books loads on DAT, Truckstop, your TMS",
                  "WhatsApp/SMS/email handoff when human needed",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
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
                <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3.5 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition">
                  Talk to Yasir
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative bg-card border border-primary/30 rounded-md p-6 shadow-2xl">
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
                    <div className="flex-1 bg-background/40 border border-primary/10 rounded p-3">
                      <p className="text-[10px] uppercase tracking-wider text-primary font-bold mb-1">📞 Inbound · DAT</p>
                      <p className="text-foreground">"Got a load Dallas → Phoenix, 47K lbs, drop tomorrow. $2,950 all-in. You interested?"</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-row-reverse">
                    <span className="text-[10px] text-muted-foreground font-mono pt-1">23:14</span>
                    <div className="flex-1 bg-primary/10 border border-primary/30 rounded p-3">
                      <p className="text-[10px] uppercase tracking-wider text-primary font-bold mb-1">🤖 AI Agent</p>
                      <p className="text-foreground">"Lane checks out. Rate floor on TX→AZ is $3,100. I can do $3,050 with quick-pay. Confirm and I'll send rate-con."</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[10px] text-muted-foreground font-mono pt-1">23:15</span>
                    <div className="flex-1 bg-background/40 border border-primary/10 rounded p-3">
                      <p className="text-[10px] uppercase tracking-wider text-success font-bold mb-1">✓ BOOKED</p>
                      <p className="text-foreground">Load assigned · Mike R · $3,050 confirmed</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-primary/10 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Tonight's bookings:</span>
                  <span className="font-heading font-bold text-foreground">14 loads · <span className="gradient-text">$41,820</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROCESS — Timeline ============ */}
      <section className="py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-14">
            <div className="lg:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">§ 04</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">The Process</p>
            </div>
            <div className="lg:col-span-9">
              <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.02]">
                Audit to live in <span className="gradient-text">fourteen days.</span><br/>
                No discovery decks. No stakeholder rituals.
              </h2>
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-[7px] sm:left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />
            <div className="space-y-16">
              {process.map((p, i) => (
                <div key={i} className="relative pl-10 sm:pl-16">
                  <div className="absolute left-0 top-1 w-3.5 h-3.5 sm:w-8 sm:h-8 rounded-full bg-primary border-4 border-background flex items-center justify-center text-primary-foreground font-heading font-bold text-xs">
                    <span className="hidden sm:inline">{i + 1}</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">{p.day}</p>
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-3">{p.title}</h3>
                  <p className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-2xl">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PORTFOLIO ============ */}
      <LogisticsPortfolio variant="grid" sectionNum="§ 05" />

      {/* ============ TESTIMONIAL CINEMATIC ============ */}
      <section className="py-24 lg:py-32 bg-card border-y border-primary/15 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/[0.06] blur-[120px]" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-12">
            <div className="lg:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">§ 05</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">The Receipts</p>
            </div>
            <div className="lg:col-span-9">
              <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.02]">
                Numbers, <span className="gradient-text">not adjectives.</span>
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-primary/15">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-background p-8 lg:p-10 flex flex-col">
                <div className="flex gap-1 mb-6 text-primary">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="w-4 h-4 fill-primary" />)}
                </div>
                <p className="font-heading font-bold text-xl lg:text-2xl leading-snug text-foreground mb-8 flex-1">
                  "{t.quote}"
                </p>
                <div className="pt-6 border-t border-primary/15">
                  <p className="font-heading font-bold text-base">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING — Tabular ============ */}
      <section id="pricing" className="py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-14 items-end">
            <div className="lg:col-span-7">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">§ 06 · Pricing</p>
              <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.02]">
                Public pricing. <span className="gradient-text">No discovery games.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Most logistics agencies hide rates behind 3 sales calls. We don't. Pick a tier. Book the audit. Get a quote in 24 hours.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-px bg-primary/20 border border-primary/20 rounded-md overflow-hidden">
            {tiers.map((t, i) => (
              <div key={i} className={`p-8 lg:p-10 relative ${t.primary ? "bg-primary/[0.04] lg:scale-[1.02] lg:z-10" : "bg-background"}`}>
                {t.badge && (
                  <span className="absolute -top-px left-0 right-0 mx-auto w-fit bg-primary text-primary-foreground px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold rounded-b-md">
                    {t.badge}
                  </span>
                )}
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 mt-4">{t.name}</p>
                <p className="font-mono text-[11px] text-primary/70 mb-4">&lt;{t.handle}/&gt;</p>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{t.desc}</p>
                <div className="mb-8 pb-8 border-b border-primary/15">
                  <p className="font-heading font-extrabold text-5xl lg:text-6xl tracking-[-0.04em] gradient-text">${t.price}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t.period}</p>
                </div>
                <ul className="space-y-3 mb-10">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={CAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block w-full text-center py-3.5 rounded-md font-bold text-sm uppercase tracking-wider transition ${
                    t.primary ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-foreground/[0.05] text-foreground hover:bg-foreground/[0.1] border border-primary/20"
                  }`}
                >
                  {t.cta} →
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            No retainer lock-in. Cancel anytime. Full quote on the discovery call.
          </p>
        </div>
      </section>

      {/* ============ GUARANTEE — Bold Statement ============ */}
      <section className="py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-2">
            <Shield className="w-16 h-16 lg:w-24 lg:h-24" strokeWidth={1.5} />
          </div>
          <div className="lg:col-span-10">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-3 opacity-80">§ 07 · The Promise</p>
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-7xl tracking-[-0.04em] leading-[0.95]">
              14-day launch — <span className="italic font-medium">or deposit back.</span>
            </h2>
            <p className="mt-6 text-lg lg:text-xl leading-relaxed max-w-3xl opacity-90">
              Your site launches inside 14 days from kickoff. If we miss it, we refund your deposit and you keep all design files. No back-and-forth. Plus: <strong>zero qualified leads in 30 days = free hero/copy/CTA rebuild.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">§ 08 · FAQ</p>
              <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.02] mb-6">
                Questions, <span className="gradient-text">answered.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If yours isn't here, just <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4 hover:no-underline">message on WhatsApp →</a>
              </p>
            </div>
            <div className="lg:col-span-8 divide-y divide-primary/15 border-y border-primary/15">
              {faqs.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full py-6 text-left flex items-start gap-6 group"
                >
                  <span className="font-mono text-xs text-primary/60 mt-1.5">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-heading font-bold text-lg lg:text-xl text-foreground group-hover:text-primary transition-colors">
                        {f.q}
                      </h3>
                      <span className={`w-7 h-7 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0 transition-transform ${openFaq === i ? "rotate-45" : ""}`}>
                        <Plus className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    {openFaq === i && (
                      <p className="mt-4 text-muted-foreground leading-relaxed">{f.a}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA — Big Bold Takeover ============ */}
      <section id="book" className="py-24 lg:py-36 bg-card border-t border-primary/15 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] rounded-full bg-primary/[0.10] blur-[160px]" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">

          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-4">§ 09 · Get Started</p>
            <h2 className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-8xl xl:text-9xl tracking-[-0.04em] leading-[0.9]">
              Stop guessing.<br/>
              <span className="gradient-text italic">Start shipping.</span>
            </h2>
            <p className="mt-8 text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Two ways to start. Both free. The Loom audit takes you 60 seconds. The call takes 15 minutes. Either way, you walk away knowing exactly what's broken and what it costs to fix.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-primary/20 border border-primary/20 rounded-md overflow-hidden max-w-5xl mx-auto">

            {/* Book Call */}
            <div className="bg-background p-8 lg:p-12 flex flex-col">
              <div className="mb-6">
                <Calendar className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">Option A</p>
                <h3 className="font-heading font-extrabold text-3xl mb-3">Book the call</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Direct conversation. Bring your URL, fleet size, and biggest bottleneck. Custom plan in 15 minutes.
                </p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Real diagnosis on your live site",
                  "Custom pricing within 24 hours",
                  "Zero sales pressure — promise",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="group bg-primary text-primary-foreground w-full text-center py-4 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition inline-flex items-center justify-center gap-2">
                Book 15-min Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Audit Form */}
            <div id="audit" className="bg-background p-8 lg:p-12">
              <Send className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">Option B</p>
              <h3 className="font-heading font-extrabold text-3xl mb-3">Get the Loom audit</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                No call. Drop your URL — Yasir records a personal 10-min Loom within 24 hours showing 3 specific fixes.
              </p>
              <form onSubmit={submitAudit} className="space-y-3">
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full bg-foreground/[0.03] border border-primary/15 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary transition placeholder:text-muted-foreground"
                />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.com"
                  className="w-full bg-foreground/[0.03] border border-primary/15 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary transition placeholder:text-muted-foreground"
                />
                <input
                  type="url"
                  required
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  placeholder="https://yourcompany.com"
                  className="w-full bg-foreground/[0.03] border border-primary/15 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary transition placeholder:text-muted-foreground"
                />
                <textarea
                  rows={2}
                  value={form.bottleneck}
                  onChange={(e) => setForm({ ...form, bottleneck: e.target.value })}
                  placeholder="Biggest bottleneck right now? (optional)"
                  className="w-full bg-foreground/[0.03] border border-primary/15 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary transition resize-none placeholder:text-muted-foreground"
                />
                <button type="submit" className="group bg-foreground/[0.05] border border-primary/30 hover:bg-primary hover:text-primary-foreground w-full text-center py-4 rounded-md font-bold text-sm uppercase tracking-wider transition inline-flex items-center justify-center gap-2">
                  Send Audit Request
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-xs text-muted-foreground text-center">
                  Loom delivered within 24 hours. Zero spam. Ever.
                </p>
              </form>
            </div>
          </div>

          {/* WhatsApp fallback */}
          <div className="text-center mt-10">
            <p className="text-sm text-muted-foreground">
              Prefer chat?{" "}
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-[#25D366] underline underline-offset-4 hover:no-underline font-medium">
                Message Yasir on WhatsApp →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ============ MINIMAL FUNNEL FOOTER ============ */}
      <footer className="py-12 border-t border-primary/10 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-8 items-center text-sm">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-md gradient-bg flex items-center justify-center font-heading font-extrabold text-xs text-primary-foreground">YB</span>
              <div>
                <p className="font-heading font-bold">Yasir Bashir</p>
                <p className="text-xs text-muted-foreground">Logistics Solutions · 2026</p>
              </div>
            </div>
            <div className="md:text-center">
              <Link to="/" className="text-muted-foreground hover:text-primary transition inline-flex items-center gap-1">
                ← Main site
              </Link>
            </div>
            <div className="md:text-right space-x-4">
              <a href="mailto:yasirbashirai@gmail.com" className="text-muted-foreground hover:text-primary transition">yasirbashirai@gmail.com</a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">WhatsApp</a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>© 2026 Yasir Bashir · All rights reserved.</p>
            <p className="font-mono">v2.0 · Built in 14 days · Made for US logistics 🇺🇸</p>
          </div>
        </div>
      </footer>

      {/* ============ FLOATING CTA (mobile) ============ */}
      <div className="fixed bottom-4 inset-x-4 z-40 md:hidden">
        <a href="#book" className="group block w-full bg-primary text-primary-foreground text-center py-4 rounded-md font-bold text-sm uppercase tracking-wider shadow-2xl shadow-primary/40">
          Book Free Audit →
        </a>
      </div>

      {/* Marquee animation */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LogisticsSolutions;

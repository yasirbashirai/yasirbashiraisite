import { useState, useEffect } from "react";
import {
  ArrowRight, Calendar, Check, X, AlertTriangle, Zap, Clock, Sparkles,
  Star, Send, TrendingUp, DollarSign, Gift, Shield, Flame, Lock,
} from "lucide-react";
import { Link } from "react-router-dom";
import LogisticsVersionSwitcher from "@/components/LogisticsVersionSwitcher";
import LogisticsPortfolio from "@/components/LogisticsPortfolio";

const CAL_LINK = "https://cal.com/yasir-bashir-bp4wob/30min";
const WHATSAPP_LINK = "https://wa.me/923446012505?text=Hi%20Yasir%20%E2%80%94%20saw%20your%20sales%20page";

const beforeAfter = [
  { before: "Driver applications take 15 mins on mobile", after: "1-tap apply, 90% complete the form", lift: "+340% apps" },
  { before: "Quote form lives in your inbox", after: "AI auto-qualifies, books, syncs to CRM", lift: "+212% bookings" },
  { before: "$400/mo for a TMS you barely use", after: "Custom dashboard, you own forever", lift: "Save $3.8K/yr" },
  { before: "Dispatcher emails rate cons at 11 PM", after: "AI dispatcher books overnight loads", lift: "Save 22 hrs/wk" },
  { before: "Carriers ghost after 7-day no-pay", after: "Auto follow-up + carrier vetting portal", lift: "+47% retention" },
  { before: "Looking like every other trucking site", after: "Brand premium clients trust on first visit", lift: "+18% close rate" },
];

const stackItems = [
  { name: "Custom logistics website built around your operation", value: "$3,500" },
  { name: "Dispatch dashboard wired to your TMS (Samsara/Motive/McLeod/AscendTMS)", value: "$5,000" },
  { name: "Driver app for iOS + Android (POD, check-ins, pay status)", value: "$2,500" },
  { name: "AI Dispatcher Agent — books loads while you sleep", value: "$9,500" },
  { name: "Carrier vetting + bond monitoring portal (catches double-broker scams)", value: "$2,500" },
  { name: "GoHighLevel CRM setup + 7 automations + pipeline", value: "$1,500" },
  { name: "Meta + TikTok Pixel setup + Conversions API", value: "$500" },
  { name: "WhatsApp Business API + click-to-WhatsApp ads ready", value: "$750" },
  { name: "Monthly retainer: hosting, edits, SEO, chatbot upkeep", value: "$497/mo" },
  { name: "14-Day Launch Guarantee + 30-Day Performance Promise", value: "Priceless" },
];

const bonuses = [
  { name: "BONUS #1: \"The 2026 Freight Tech Stack Guide\" — what McLeod, Samsara, AscendTMS, DAT actually cost (40-page PDF)", value: "$197" },
  { name: "BONUS #2: \"Cold Email Templates That Closed $40K\" — paste-ready sequences for carriers, brokers, movers", value: "$497" },
  { name: "BONUS #3: 30-minute strategy call to map your 6-month growth funnel", value: "$497" },
  { name: "BONUS #4: First 90 days of priority support (24-hr response, no waiting)", value: "$1,200" },
];

const objections = [
  {
    q: "I've been burned by agencies before. How is this different?",
    a: "Three concrete things: (1) Milestone billing — you pay in stages tied to delivery, not 100% upfront. (2) 14-Day Launch Guarantee — miss the date, get your deposit back and keep the design files. (3) Month-to-month retainer with cancel-anytime. The risk reversal is engineered to make ghosting impossible.",
  },
  {
    q: "I'm not technical. Will I understand what's being built?",
    a: "You'll see a Loom walkthrough every Friday during the build, plus a 30-minute training call before launch. No jargon. If you can read a load board, you can manage what we ship you.",
  },
  {
    q: "What if I already have a website I'm 'mostly' happy with?",
    a: "Start with the free 10-minute Loom audit — submit your URL below and I'll tell you exactly what's leaking money. If the answer is 'nothing,' I'll say so. If it's a $40K/yr fix, you'll know.",
  },
  {
    q: "How fast can you actually start?",
    a: "Kickoff within 5 business days of signed proposal. We currently take 4 new clients per quarter and Q2 2026 has 2 slots remaining as of this week. Wait list opens July 1.",
  },
  {
    q: "Why are you in Pakistan if you only work with US clients?",
    a: "Two reasons: (1) Pricing — our overhead lets us deliver agency-quality work at indie pricing. (2) Time zones — US prospects message you in business hours; we deliver overnight. You wake up to finished work. We've shipped 800 builds this way.",
  },
];

const LogisticsSales = () => {
  const [form, setForm] = useState({ name: "", email: "", url: "", bottleneck: "" });
  const [timeLeft, setTimeLeft] = useState({ days: 14, hours: 6, mins: 32, secs: 14 });

  useEffect(() => {
    document.title = "Add $10K-$50K Monthly Revenue to Your US Logistics Business — In 90 Days | Yasir Bashir";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Custom website + dispatch dashboard + AI Dispatcher Agent built in 14 days for US trucking, freight, dispatch & moving companies. 14-day launch guarantee or deposit back.");
    // Fake countdown ticker for urgency
    const t = setInterval(() => {
      setTimeLeft((p) => {
        let { days, hours, mins, secs } = p;
        secs--;
        if (secs < 0) { secs = 59; mins--; }
        if (mins < 0) { mins = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) { days = 14; hours = 6; mins = 32; secs = 14; }
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const submitAudit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[V3 Sales] Audit request — ${form.name}`);
    const body = encodeURIComponent(
      `New audit request from /logistics-solutions/sales\n\nName: ${form.name}\nEmail: ${form.email}\nWebsite: ${form.url}\nBottleneck: ${form.bottleneck || "(not provided)"}\n`
    );
    window.location.href = `mailto:yasirbashirai@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <LogisticsVersionSwitcher />

      {/* URGENCY BANNER */}
      <div className="fixed top-0 inset-x-0 z-50 bg-primary text-primary-foreground py-2 px-4 text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-3">
        <Flame className="w-4 h-4 animate-pulse" />
        <span className="hidden sm:inline">Q2 2026 closing soon — 2 build slots left</span>
        <span className="sm:hidden">2 slots left</span>
        <span className="opacity-80">·</span>
        <span className="font-mono">{timeLeft.days}d {String(timeLeft.hours).padStart(2,"0")}:{String(timeLeft.mins).padStart(2,"0")}:{String(timeLeft.secs).padStart(2,"0")}</span>
      </div>

      {/* NAV */}
      <header className="fixed top-9 inset-x-0 z-40 backdrop-blur-xl bg-background/85 border-b border-primary/15">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-md gradient-bg flex items-center justify-center font-heading font-extrabold text-sm text-primary-foreground">YB</span>
            <span className="font-heading font-extrabold text-sm">Yasir Bashir</span>
          </Link>
          <a href="#claim" className="bg-primary text-primary-foreground px-5 py-2 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition animate-pulse">
            Claim Your Slot →
          </a>
        </div>
      </header>

      {/* HERO — Big Promise */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full bg-primary/[0.13] blur-[160px]" />
        <div className="relative max-w-[1100px] mx-auto px-6 lg:px-10 text-center">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-8">
            <Zap className="w-3 h-3" /> For US Logistics Owners Doing $50K–$500K/Mo
          </div>

          <h1 className="font-heading font-extrabold tracking-[-0.045em] leading-[0.92] text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] mb-8">
            Add <span className="gradient-text">$10K–$50K</span> in Monthly Revenue<br/>
            to Your Logistics Business<br/>
            <span className="italic text-foreground/80">in the Next 90 Days.</span>
          </h1>

          <p className="text-xl lg:text-2xl text-foreground/85 max-w-3xl mx-auto leading-relaxed mb-4">
            Even if your current site is broken, your TMS is bleeding money, and you're sick of "AI agencies" wasting your time.
          </p>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            We build the website, the dispatch dashboard, the driver app, and the AI agent that books loads while you sleep. <strong className="text-foreground">Ship in 14 days. Or your deposit back.</strong>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <a href="#claim" className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-md font-extrabold text-base uppercase tracking-wider hover:bg-primary/90 transition shadow-[0_0_50px_-10px_hsl(323,100%,44%,0.6)]">
              <Flame className="w-5 h-5" />
              Yes — Claim My Slot
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-4 h-4 text-success" />
            <span>14-Day Launch Guarantee · 30-Day Performance Promise · Milestone billing</span>
          </div>
        </div>
      </section>

      {/* AGITATION — The "Are you tired of..." */}
      <section className="py-20 lg:py-28 bg-card border-y border-primary/15">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-4">If you're nodding "yes" to any of these...</p>
          <h2 className="text-center font-heading font-extrabold text-3xl lg:text-5xl tracking-[-0.03em] leading-[1.02] mb-12">
            You're leaving <span className="gradient-text">six figures</span> on the table every year.
          </h2>

          <div className="space-y-3 max-w-3xl mx-auto">
            {[
              "Your website was built by a cousin / nephew / random freelancer 3 years ago",
              "You're paying $200–$400/month for a TMS that barely works",
              "Driver applications come in once a week, if at all",
              "Quote requests sit in your inbox for 6+ hours before someone replies",
              "You're getting hammered with AI cold-calls from \"dispatch services\" daily",
              "PODs are stuck in driver cabs for 7+ days slowing invoicing",
              "You've watched 2+ brokers shut down in the last 6 months",
              "You know AI could help but you don't trust the hype or the vendors",
            ].map((pain) => (
              <div key={pain} className="flex items-start gap-4 bg-background border border-destructive/20 p-4 rounded-md">
                <X className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-foreground/90">{pain}</p>
              </div>
            ))}
          </div>

          <p className="text-center mt-12 font-heading font-bold text-2xl lg:text-3xl">
            <span className="text-foreground">Here's the truth:</span> <span className="gradient-text italic">every one of those is fixable in 14–30 days.</span>
          </p>
        </div>
      </section>

      {/* BEFORE / AFTER GRID */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">What changes after we ship</p>
            <h2 className="font-heading font-extrabold text-4xl lg:text-6xl tracking-[-0.03em] leading-[1.02]">
              From <span className="text-destructive">"good enough"</span><br/>
              to <span className="gradient-text">unstoppable</span> in 14 days.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {beforeAfter.map((b, i) => (
              <div key={i} className="bg-card border border-primary/15 rounded-md p-6 hover:border-primary/40 transition">
                <div className="grid grid-cols-7 gap-3 items-center">
                  <div className="col-span-3">
                    <p className="text-[10px] uppercase tracking-wider text-destructive font-bold mb-1">BEFORE</p>
                    <p className="text-sm text-foreground/70 line-through decoration-destructive/40">{b.before}</p>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                  <div className="col-span-3">
                    <p className="text-[10px] uppercase tracking-wider text-success font-bold mb-1">AFTER</p>
                    <p className="text-sm text-foreground font-medium">{b.after}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-primary/10 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Average Result</span>
                  <span className="font-heading font-extrabold text-2xl gradient-text">{b.lift}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE STACK — What you actually get */}
      <section className="py-24 lg:py-32 bg-card border-y border-primary/15">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">Here's exactly what you get</p>
            <h2 className="font-heading font-extrabold text-4xl lg:text-6xl tracking-[-0.03em] leading-[1.02]">
              The full <span className="gradient-text italic">"Logistics Growth Stack."</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">Everything we ship in one engagement. À-la-carte values listed.</p>
          </div>

          <div className="bg-background border border-primary/20 rounded-md overflow-hidden">
            {stackItems.map((s, i) => (
              <div key={i} className="grid grid-cols-12 gap-3 px-6 py-5 border-b border-primary/10 last:border-b-0 hover:bg-primary/[0.02] transition">
                <div className="col-span-1 flex items-center">
                  <Check className="w-5 h-5 text-success" />
                </div>
                <div className="col-span-8 lg:col-span-9 flex items-center">
                  <p className="text-foreground/90 leading-snug">{s.name}</p>
                </div>
                <div className="col-span-3 lg:col-span-2 text-right">
                  <span className="font-heading font-bold gradient-text">{s.value}</span>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-12 gap-3 px-6 py-5 bg-primary/[0.05] border-t-2 border-primary">
              <div className="col-span-9 font-heading font-extrabold text-lg">TOTAL À-LA-CARTE VALUE:</div>
              <div className="col-span-3 text-right font-heading font-extrabold text-2xl gradient-text">$26,944</div>
            </div>
          </div>

          {/* Bonuses */}
          <div className="mt-10 bg-primary/[0.06] border-2 border-dashed border-primary/40 rounded-md p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-5">
              <Gift className="w-6 h-6 text-primary" />
              <h3 className="font-heading font-extrabold text-xl">Plus, when you start in Q2 2026, you also get:</h3>
            </div>
            <div className="space-y-3">
              {bonuses.map((b, i) => (
                <div key={i} className="flex items-start gap-3 bg-background border border-primary/15 p-4 rounded-md">
                  <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground/90">{b.name}</p>
                  </div>
                  <span className="text-sm font-heading font-bold gradient-text shrink-0">{b.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-5 border-t border-primary/20 flex items-center justify-between">
              <p className="font-heading font-extrabold">Bonus stack value:</p>
              <span className="font-heading font-extrabold text-2xl gradient-text">$2,391</span>
            </div>
          </div>

          {/* The price reveal */}
          <div className="mt-10 text-center">
            <p className="text-base text-muted-foreground mb-3">Total value of everything above:</p>
            <p className="font-heading text-3xl text-foreground line-through decoration-destructive">$29,335</p>
            <p className="mt-6 text-sm uppercase tracking-[0.3em] text-primary font-bold">Your investment today</p>
            <p className="font-heading font-extrabold text-7xl lg:text-9xl gradient-text tracking-[-0.05em] my-4">$3,500</p>
            <p className="text-lg text-muted-foreground">one-time + $497/mo retainer (cancel anytime)</p>
            <a href="#claim" className="mt-8 inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-md font-extrabold text-base uppercase tracking-wider hover:bg-primary/90 transition shadow-[0_0_50px_-10px_hsl(323,100%,44%,0.6)]">
              <Flame className="w-5 h-5" />
              Claim My Slot Now
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="mt-3 text-xs text-muted-foreground">2 of 4 Q2 slots remaining as of today.</p>
          </div>
        </div>
      </section>

      {/* GUARANTEE — Bold takeover */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6" strokeWidth={1.5} />
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4 opacity-80">The Iron-Clad Promise</p>
          <h2 className="font-heading font-extrabold text-4xl lg:text-7xl tracking-[-0.04em] leading-[0.95] mb-6">
            Live in 14 days.<br/>
            <span className="italic">Or your deposit back.</span>
          </h2>
          <p className="text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto opacity-95 mb-6">
            We hit the 14-day launch window or we refund your deposit AND you keep all design files and code. No back-and-forth. No "we got behind." No excuses.
          </p>
          <p className="text-base lg:text-lg leading-relaxed max-w-3xl mx-auto opacity-90">
            <strong>Plus:</strong> If your new site doesn't generate a single qualified inbound lead in the first 30 days, we rebuild the hero, copy, and CTAs free of charge.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-wider">
            <span className="flex items-center gap-2"><Check className="w-4 h-4" /> Milestone billing</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4" /> Cancel retainer anytime</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4" /> US references on request</span>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL CAROUSEL */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-4">Real results · Real US logistics owners</p>
          <h2 className="text-center font-heading font-extrabold text-4xl lg:text-6xl tracking-[-0.03em] leading-[1.02] mb-12">
            "I should've done this <span className="gradient-text italic">two years ago."</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { quote: "Carrier onboarding went from 3 days to 20 minutes. Already paid for itself in week 2.", name: "Mike R.", role: "Operations Director · Atlanta", lift: "+$11K/mo" },
              { quote: "Quote form went live Monday. By Friday we'd booked 47 moves. The site paid for itself in 6 days.", name: "Rachel D.", role: "Owner · Dallas moving co", lift: "+$22K week 1" },
              { quote: "Custom dashboard replaced Samsara, McLeod, and 3 spreadsheets. We save 28 hours per week.", name: "James K.", role: "Owner · 14-truck carrier · Houston", lift: "Save $3.8K/yr" },
            ].map((t, i) => (
              <div key={i} className="bg-card border border-primary/15 rounded-md p-7 hover:border-primary/40 transition">
                <div className="flex gap-1 mb-4 text-primary">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="w-4 h-4 fill-primary" />)}
                </div>
                <p className="font-heading text-xl leading-snug text-foreground mb-6 italic">"{t.quote}"</p>
                <div className="pt-5 border-t border-primary/10 flex items-center justify-between">
                  <div>
                    <p className="font-heading font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                  <span className="font-heading font-extrabold text-lg gradient-text">{t.lift}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <LogisticsPortfolio variant="grid" sectionNum="OUR WORK" />

      {/* OBJECTION HANDLING */}
      <section className="py-24 lg:py-32 bg-card border-y border-primary/15">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-4">Before you say "but..."</p>
          <h2 className="text-center font-heading font-extrabold text-4xl lg:text-6xl tracking-[-0.03em] leading-[1.02] mb-12">
            The 5 questions <span className="gradient-text italic">everyone asks.</span>
          </h2>

          <div className="space-y-4">
            {objections.map((o, i) => (
              <div key={i} className="bg-background border border-primary/15 rounded-md p-6 lg:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-extrabold shrink-0">{i + 1}</span>
                  <h3 className="font-heading font-extrabold text-xl lg:text-2xl pt-1">{o.q}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed lg:pl-14">{o.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CLAIM CTA */}
      <section id="claim" className="py-24 lg:py-36 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] rounded-full bg-primary/[0.12] blur-[180px]" />

        <div className="relative max-w-[1100px] mx-auto px-6 lg:px-10">

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/15 border border-destructive/40 text-[10px] uppercase tracking-[0.2em] text-destructive font-bold mb-6 animate-pulse">
              <AlertTriangle className="w-3 h-3" /> Only 2 Q2 2026 slots remaining
            </div>

            <h2 className="font-heading font-extrabold text-5xl lg:text-7xl xl:text-8xl tracking-[-0.04em] leading-[0.9]">
              Your competition is <span className="gradient-text italic">already shipping.</span>
            </h2>
            <p className="mt-8 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every week you wait is loads you don't book, drivers who don't apply, and revenue you don't bank. Two slots. First-come-first-served. Claim yours below.
            </p>
          </div>

          <div className="bg-card border-2 border-primary rounded-md p-8 lg:p-12 max-w-2xl mx-auto shadow-[0_0_80px_-20px_hsl(323,100%,44%,0.5)]">
            <h3 className="font-heading font-extrabold text-2xl lg:text-3xl text-center mb-2">Get your free 10-min Loom audit</h3>
            <p className="text-center text-muted-foreground mb-6">No call required. Delivered within 24 hours. Zero spam.</p>

            <form onSubmit={submitAudit} className="space-y-3">
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full bg-foreground/[0.03] border border-primary/15 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary transition placeholder:text-muted-foreground" />
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="w-full bg-foreground/[0.03] border border-primary/15 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary transition placeholder:text-muted-foreground" />
              <input type="url" required value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://yourcompany.com" className="w-full bg-foreground/[0.03] border border-primary/15 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary transition placeholder:text-muted-foreground" />
              <textarea rows={2} value={form.bottleneck} onChange={(e) => setForm({ ...form, bottleneck: e.target.value })} placeholder="What's bleeding money right now? (optional)" className="w-full bg-foreground/[0.03] border border-primary/15 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary transition resize-none placeholder:text-muted-foreground" />
              <button type="submit" className="group w-full bg-primary text-primary-foreground py-5 rounded-md font-extrabold text-base uppercase tracking-wider hover:bg-primary/90 transition inline-flex items-center justify-center gap-2">
                <Flame className="w-5 h-5" />
                Yes, Send My Free Audit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
              <div className="flex items-center justify-center gap-3 pt-2 text-xs text-muted-foreground">
                <Lock className="w-3 h-3" />
                <span>Your info stays private. We never sell or share data.</span>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-primary/15 text-center text-sm">
              <span className="text-muted-foreground">Prefer to talk? </span>
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4 hover:no-underline font-medium">Book a 15-min call instead →</a>
            </div>
          </div>

          {/* PS — classic sales letter */}
          <div className="mt-14 max-w-2xl mx-auto p-6 bg-foreground/[0.03] border-l-4 border-primary rounded-r-md">
            <p className="font-mono text-xs text-primary font-bold mb-2">P.S.</p>
            <p className="text-muted-foreground leading-relaxed">
              The freight market is in the middle of the biggest shake-up in 5 years. FMCSA is pulling ELDs. Brokers are going bankrupt. AI is changing everything. The carriers and brokers who update their tech in 2026 are going to own the market for the next decade. Don't be the one watching from the sidelines. <strong className="text-foreground">Two slots left. Lock yours in.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-primary/10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid md:grid-cols-3 gap-8 items-center text-sm">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-md gradient-bg flex items-center justify-center font-heading font-extrabold text-xs text-primary-foreground">YB</span>
            <div>
              <p className="font-heading font-bold">Yasir Bashir</p>
              <p className="text-xs text-muted-foreground">Logistics Solutions · V3 Sales</p>
            </div>
          </div>
          <div className="md:text-center">
            <Link to="/" className="text-muted-foreground hover:text-primary transition">← Main site</Link>
          </div>
          <div className="md:text-right space-x-4">
            <a href="mailto:yasirbashirai@gmail.com" className="text-muted-foreground hover:text-primary transition">yasirbashirai@gmail.com</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-[#25D366]">WhatsApp</a>
          </div>
        </div>
      </footer>

      {/* MOBILE FLOATING CTA */}
      <div className="fixed bottom-4 inset-x-4 z-40 md:hidden">
        <a href="#claim" className="block w-full bg-primary text-primary-foreground text-center py-4 rounded-md font-extrabold text-sm uppercase tracking-wider shadow-2xl shadow-primary/40 animate-pulse">
          🔥 Claim My Slot →
        </a>
      </div>
    </div>
  );
};

export default LogisticsSales;

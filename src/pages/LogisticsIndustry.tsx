import { useState, useEffect } from "react";
import {
  ArrowRight, Calendar, Check, X, AlertTriangle, TrendingUp, TrendingDown,
  Activity, BarChart3, Send, Truck, Building2, Briefcase, Package, Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import LogisticsVersionSwitcher from "@/components/LogisticsVersionSwitcher";
import LogisticsPortfolio from "@/components/LogisticsPortfolio";

const CAL_LINK = "https://cal.com/yasir-bashir-bp4wob/30min";
const WHATSAPP_LINK = "https://wa.me/923446012505?text=Hi%20Yasir%20%E2%80%94%20saw%20your%20industry%20comparison%20page";

const marketSignals = [
  { value: "+23%", label: "US Spot Rates YoY", trend: "up", source: "DAT, May 2026" },
  { value: "$5.64", label: "Diesel/gal (peak +28.9¢)", trend: "down", source: "EIA, May 2026" },
  { value: "14.2%", label: "OTRI (Capacity tightening)", trend: "up", source: "FreightWaves SONAR" },
  { value: "$65M", label: "R&R unpaid freight bills", trend: "down", source: "Overdrive, Jan 2026" },
  { value: "$75K", label: "FMCSA broker bond floor", trend: "up", source: "Effective Jan 16, 2026" },
  { value: "97%", label: "US carriers with <10 trucks", trend: "neutral", source: "FreightWaves" },
];

const subSegments = [
  {
    icon: Truck, name: "Owner-Operators (1–3 trucks)", anxiety: "\"Will I get paid?\"",
    pains: ["Broker bankruptcy fear", "Diesel-rate gap", "Load board fees +25–45%"],
    fix: "Direct-shipper landing page + automated driver applications + payment status portal.",
    pkg: "$1,500–$3,500 site + $497/mo retainer",
  },
  {
    icon: Briefcase, name: "Small Fleets (5–50 trucks)", anxiety: "\"4 tools, none talk to each other\"",
    pains: ["Dispatcher tool sprawl", "PODs lost in driver cabs", "90% driver turnover"],
    fix: "Custom dispatch dashboard + driver mobile app + recruiting funnel. One unified system.",
    pkg: "$7,500–$25,000 + $997–$1,997/mo retainer",
  },
  {
    icon: Building2, name: "Freight Brokers (1–10 agents)", anxiety: "\"Will I lose my authority?\"",
    pains: ["10–20% margin compression", "FMCSA bond enforcement", "Double-broker AI scams"],
    fix: "Carrier vetting portal + MC# verify + bond monitoring + automated rate cons.",
    pkg: "$15,000–$50,000 broker portal + $1,997/mo",
  },
  {
    icon: Package, name: "Movers / Couriers / Car Haulers", anxiety: "\"Thumbtack is eating my margin\"",
    pains: ["$25–50/lead CAC", "Hidden fees BBB complaints", "Lead response time"],
    fix: "Lead-funnel site with instant quote calculator + AI chatbot + Google Reviews integration.",
    pkg: "$3,500 site + $497–$997/mo retainer",
  },
];

const competitors = [
  {
    type: "Generic web agencies",
    examples: "DreamCo Design, ThePixel, True Digital",
    they_do: ["Pretty WordPress sites", "Generic SEO", "Stock truck photos"],
    they_dont: ["Speak ELD/dispatch/MC#", "Build broker portals", "Integrate with TMS", "AI dispatch agents"],
    yasir: "We do both — marketing site AND dispatch backend.",
  },
  {
    type: "Enterprise software houses",
    examples: "Acropolium, Intellectsoft, ClickySoft",
    they_do: ["Custom TMS modernization", "WMS for enterprise", "$100K+ engagements"],
    they_dont: ["Marketing/funnel/copy", "Speak to small carriers", "Ship in 14 days", "Owner-operator UX"],
    yasir: "Same tech skill, agency-priced, with brand & funnel built-in.",
  },
  {
    type: "TMS/SaaS vendors",
    examples: "Samsara, McLeod, AscendTMS",
    they_do: ["Off-the-shelf dispatch", "3-year contracts", "Per-seat licensing"],
    they_dont: ["Custom to your ops", "Owner data ownership", "Marketing site", "Integrate to other tools"],
    yasir: "We layer on top of your existing TMS — you keep what works, we fix what doesn't.",
  },
  {
    type: "Freelancer / Fiverr generalist",
    examples: "Random freelancers from Upwork",
    they_do: ["Cheap WordPress", "Quick turnaround"],
    they_dont: ["Know logistics", "Stick around for retainer", "Build software", "Speak the language"],
    yasir: "800+ logistics-only builds. Same agency runs every project — no junior handoff.",
  },
];

const regulations = [
  { date: "Jan 16, 2026", rule: "FMCSA broker bond enforcement", impact: "Single-day dip below $75K = authority suspended", color: "destructive" },
  { date: "Mar 16, 2026", rule: "Non-domiciled CDL rule", impact: "194K drivers may exit over 24 months", color: "warning" },
  { date: "May 4, 2026", rule: "ELD revocation deadline", impact: "14 ELDs pulled; $400–600 replacement cost", color: "warning" },
  { date: "Ongoing", rule: "English-Language-Proficiency", impact: "Out-of-Service if fail; 48K+ violations in 2025", color: "destructive" },
];

const LogisticsIndustry = () => {
  const [form, setForm] = useState({ name: "", email: "", url: "", segment: "" });

  useEffect(() => {
    document.title = "Logistics Industry Analysis — Why Generic Agencies Fail You | Yasir Bashir";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Data-driven comparison: how generic web agencies, enterprise software houses, and TMS vendors fail US logistics owners — and what we build instead.");
  }, []);

  const submitAudit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[V2 Industry] Audit request — ${form.name}`);
    const body = encodeURIComponent(
      `New audit request from /logistics-solutions/industry\n\nName: ${form.name}\nEmail: ${form.email}\nWebsite: ${form.url}\nSegment: ${form.segment}\n`
    );
    window.location.href = `mailto:yasirbashirai@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <LogisticsVersionSwitcher />

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/85 border-b border-primary/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-md gradient-bg flex items-center justify-center font-heading font-extrabold text-sm text-primary-foreground">YB</span>
            <div className="leading-none">
              <p className="font-heading font-extrabold text-sm">Yasir Bashir</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">Industry Intelligence · 2026</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-wider font-mono">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 border border-success/30 text-success">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              MARKET OPEN
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">Updated 2026-05-17</span>
          </nav>
          <a href="#book" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition">
            Get Industry Audit
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
              <BarChart3 className="w-3 h-3" /> Industry Comparison · Data-Driven
            </span>
          </div>

          <h1 className="font-heading font-extrabold tracking-[-0.04em] leading-[0.95] text-5xl lg:text-7xl xl:text-[88px] max-w-5xl mb-6">
            Built for US logistics. <span className="gradient-text">Not for designers.</span>
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            The freight market is changing fast. ELDs revoked. Bond rules tightened. Diesel volatile. AI cold-calls everywhere. Most agencies don't know any of this. We do — because we only serve this industry.
          </p>
        </div>
      </section>

      {/* MARKET SIGNALS — Bloomberg-style ticker */}
      <section className="border-y border-primary/15 bg-card">
        <div className="max-w-[1400px] mx-auto">
          <div className="px-6 lg:px-10 py-3 border-b border-primary/15 flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Live Market Signals · § 01</p>
            <p className="text-[10px] font-mono text-muted-foreground">SOURCES VERIFIED</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-primary/15">
            {marketSignals.map((s, i) => (
              <div key={i} className="p-5 border-b lg:border-b-0 border-primary/15 last:border-b-0">
                <div className="flex items-center gap-1 mb-1">
                  {s.trend === "up" && <TrendingUp className="w-3 h-3 text-success" />}
                  {s.trend === "down" && <TrendingDown className="w-3 h-3 text-destructive" />}
                  {s.trend === "neutral" && <Activity className="w-3 h-3 text-muted-foreground" />}
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground">{s.source}</span>
                </div>
                <p className={`font-heading font-extrabold text-2xl lg:text-3xl tracking-[-0.03em] ${
                  s.trend === "up" ? "text-success" : s.trend === "down" ? "text-destructive" : "text-foreground"
                }`}>{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY GENERIC AGENCIES FAIL — Comparison Table */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-14">
            <div className="lg:col-span-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">§ 02 · The Field</p>
              <h2 className="font-heading font-extrabold text-4xl lg:text-5xl tracking-[-0.03em] leading-[1.02]">
                The competition isn't <span className="gradient-text">built for this.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 text-muted-foreground text-lg leading-relaxed pt-2">
              We mapped the 4 types of vendors US logistics owners hire — and what each one consistently fails at. The structural gap they leave is exactly where we operate.
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-px bg-primary/15 border border-primary/15 rounded-md overflow-hidden">
            {competitors.map((c, i) => (
              <div key={i} className="bg-background p-7 lg:p-9">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Vendor Type {String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-heading font-extrabold text-2xl mb-1">{c.type}</h3>
                <p className="text-xs text-muted-foreground italic mb-6">e.g. {c.examples}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-success font-bold mb-2 flex items-center gap-1"><Check className="w-3 h-3" /> They do</p>
                    <ul className="space-y-1.5 text-sm text-foreground/90">
                      {c.they_do.map((x) => <li key={x}>• {x}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-destructive font-bold mb-2 flex items-center gap-1"><X className="w-3 h-3" /> They don't</p>
                    <ul className="space-y-1.5 text-sm text-foreground/90">
                      {c.they_dont.map((x) => <li key={x}>• {x}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-primary/15 pt-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-2">Our Edge</p>
                  <p className="text-sm text-foreground font-medium">{c.yasir}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUB-SEGMENT MAP — What we build per business type */}
      <section className="py-24 lg:py-32 bg-card border-y border-primary/15">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-14">
            <div className="lg:col-span-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">§ 03 · By Segment</p>
              <h2 className="font-heading font-extrabold text-4xl lg:text-5xl tracking-[-0.03em] leading-[1.02]">
                Different operations. <span className="gradient-text">Different fixes.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 text-muted-foreground text-lg leading-relaxed pt-2">
              Owner-ops have a "will I get paid" problem. Small fleets have a tool-sprawl problem. Brokers have a margin + compliance problem. Movers have a CAC problem. We build different products for each.
            </div>
          </div>

          <div className="space-y-px bg-primary/15 border border-primary/15 rounded-md overflow-hidden">
            {subSegments.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="bg-background grid lg:grid-cols-12 gap-6 p-7 lg:p-9 hover:bg-primary/[0.02] transition">
                  <div className="lg:col-span-3 flex items-start gap-3">
                    <div className="w-12 h-12 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-heading font-extrabold text-lg leading-tight">{s.name}</p>
                      <p className="text-xs text-muted-foreground italic mt-1">{s.anxiety}</p>
                    </div>
                  </div>
                  <div className="lg:col-span-3">
                    <p className="text-[10px] uppercase tracking-wider text-destructive font-bold mb-2">Top 3 Pains</p>
                    <ul className="space-y-1 text-sm text-foreground/85">
                      {s.pains.map((p) => <li key={p}>• {p}</li>)}
                    </ul>
                  </div>
                  <div className="lg:col-span-4">
                    <p className="text-[10px] uppercase tracking-wider text-success font-bold mb-2">Our Fix</p>
                    <p className="text-sm text-foreground leading-relaxed">{s.fix}</p>
                  </div>
                  <div className="lg:col-span-2 flex flex-col justify-center">
                    <p className="text-[10px] uppercase tracking-wider text-primary font-bold mb-2">Package</p>
                    <p className="text-sm font-heading font-bold text-foreground">{s.pkg}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2026 REGULATORY CALENDAR */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-14">
            <div className="lg:col-span-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">§ 04 · 2026 Compliance Calendar</p>
              <h2 className="font-heading font-extrabold text-4xl lg:text-5xl tracking-[-0.03em] leading-[1.02]">
                Rules changed. <span className="gradient-text">Have you?</span>
              </h2>
            </div>
            <div className="lg:col-span-7 text-muted-foreground text-lg leading-relaxed pt-2">
              FMCSA is doing in 2026 what the freight recession couldn't — flushing out marginal carriers and brokers. The survivors that update tooling now will own the post-shakeout market.
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-primary/15 rounded-md overflow-hidden">
              <thead>
                <tr className="bg-primary/[0.05] border-b border-primary/15">
                  <th className="text-left px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Date</th>
                  <th className="text-left px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Rule</th>
                  <th className="text-left px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Impact on Operators</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/15">
                {regulations.map((r, i) => (
                  <tr key={i} className="hover:bg-primary/[0.02] transition">
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-2 text-sm font-bold ${r.color === "destructive" ? "text-destructive" : "text-warning"}`}>
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {r.date}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-heading font-bold text-foreground">{r.rule}</td>
                    <td className="px-6 py-5 text-muted-foreground text-sm">{r.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-muted-foreground italic">Sources: FMCSA Federal Register, SuretyBonds Insider, Aladdin Capital 2026 Crackdown Survival Guide</p>
        </div>
      </section>

      {/* PORTFOLIO */}
      <LogisticsPortfolio variant="list" sectionNum="§ 05" />

      {/* WHAT WE BUILD — Industry-aware */}
      <section className="py-24 lg:py-32 bg-card border-y border-primary/15">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">§ 06 · What we ship</p>
            <h2 className="font-heading font-extrabold text-4xl lg:text-5xl tracking-[-0.03em] leading-[1.02]">
              Six modules. <span className="gradient-text">Built for this industry only.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            {[
              { name: "Logistics Website", price: "$1,500+", ship: "14d", desc: "Built for trucking owners, not designers." },
              { name: "Broker / Carrier Portal", price: "$2,500+", ship: "21d", desc: "MC# verify, quote requests, payment tracking." },
              { name: "Dispatch Dashboard (DispatchOS™)", price: "$3,000+", ship: "30d", desc: "Replaces $24K/yr per-seat licenses." },
              { name: "Driver App / Portal", price: "$2,500+", ship: "21d", desc: "POD upload, check-ins, pay status. iOS+Android." },
              { name: "Smart Chatbot", price: "$500+", ship: "7d", desc: "24/7 quote responder on site + WhatsApp." },
              { name: "AI Dispatcher Agent™", price: "$9,500+", ship: "45d", desc: "Custom voice/WA/web agent. Books overnight." },
            ].map((s) => (
              <div key={s.name} className="bg-background border border-primary/15 rounded-md p-6 hover:border-primary transition">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-extrabold text-lg">{s.name}</h3>
                  <span className="text-[10px] font-mono text-muted-foreground">{s.ship}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
                <p className="font-heading font-extrabold text-2xl gradient-text">{s.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="book" className="py-24 lg:py-32">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">

          <div className="text-center mb-14">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-4">§ 07 · Industry Audit</p>
            <h2 className="font-heading font-extrabold text-5xl lg:text-7xl tracking-[-0.04em] leading-[0.95]">
              Free industry-specific<br/>
              <span className="gradient-text italic">audit of your site.</span>
            </h2>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Tell us your segment, your URL, and your biggest bottleneck. We'll send a 10-min Loom showing 3 specific things broken for <em>your</em> kind of logistics business — within 24 hours.
            </p>
          </div>

          <div className="bg-card border border-primary/20 rounded-md p-8 lg:p-12 max-w-2xl mx-auto">
            <form onSubmit={submitAudit} className="space-y-3">
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full bg-foreground/[0.03] border border-primary/15 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary transition placeholder:text-muted-foreground" />
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="w-full bg-foreground/[0.03] border border-primary/15 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary transition placeholder:text-muted-foreground" />
              <input type="url" required value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://yourcompany.com" className="w-full bg-foreground/[0.03] border border-primary/15 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary transition placeholder:text-muted-foreground" />
              <select required value={form.segment} onChange={(e) => setForm({ ...form, segment: e.target.value })} className="w-full bg-foreground/[0.03] border border-primary/15 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary transition text-foreground">
                <option value="">Your segment...</option>
                <option>Owner-Operator (1–3 trucks)</option>
                <option>Small Fleet (5–50 trucks)</option>
                <option>Freight Broker</option>
                <option>3PL / Distribution</option>
                <option>Moving Company</option>
                <option>Courier / Last-Mile</option>
                <option>Car Hauler / Auto Transport</option>
                <option>Other Logistics</option>
              </select>
              <button type="submit" className="group w-full bg-primary text-primary-foreground py-4 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition inline-flex items-center justify-center gap-2">
                Get My Segment-Specific Audit
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
            </form>
            <div className="mt-6 pt-6 border-t border-primary/10 text-center text-sm">
              <span className="text-muted-foreground">Prefer to talk? </span>
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4 hover:no-underline font-medium">Book a 15-min call →</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-primary/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid md:grid-cols-3 gap-8 items-center text-sm">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-md gradient-bg flex items-center justify-center font-heading font-extrabold text-xs text-primary-foreground">YB</span>
            <div>
              <p className="font-heading font-bold">Yasir Bashir</p>
              <p className="text-xs text-muted-foreground">Logistics Solutions · V2 Industry</p>
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
    </div>
  );
};

export default LogisticsIndustry;

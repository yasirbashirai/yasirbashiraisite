import { useState, useEffect } from "react";
import {
  ArrowRight, ArrowUpRight, Calendar, Check, Award, BookOpen, Sparkles,
  Quote, Star, FileText, TrendingUp, Send, Layers, Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import LogisticsVersionSwitcher from "@/components/LogisticsVersionSwitcher";
import LogisticsPortfolio from "@/components/LogisticsPortfolio";

const CAL_LINK = "https://cal.com/yasir-bashir-bp4wob/30min";
const WHATSAPP_LINK = "https://wa.me/923446012505?text=Hi%20Yasir%20%E2%80%94%20saw%20your%20value-led%20page";

const credentials = [
  { num: "800+", label: "Logistics builds delivered", sub: "Across 5 years, all US-focused" },
  { num: "5 yrs", label: "In one niche only", sub: "Logistics, transport, freight" },
  { num: "$2.3M", label: "Lift documented", sub: "From client outcome metrics" },
  { num: "4.9★", label: "4 Fiverr accounts", sub: "Level 2 seller, repeat clients" },
];

const expertise = [
  {
    no: "01",
    title: "Driver recruiting funnels",
    body: "Built 200+ driver recruiting pages. The highest-converting structure is a 4-step apply flow with mobile-first one-handed UX — applications lift 3–4× vs generic Indeed embeds.",
  },
  {
    no: "02",
    title: "Carrier onboarding portals",
    body: "Carrier packets that took 3 days now take 20 minutes. MC# verification, W-9 auto-extract, COI parse, NOA upload, and instant ACH-ready — all in a single self-serve flow.",
  },
  {
    no: "03",
    title: "TMS/load board integration",
    body: "Live integrations into McLeod, AscendTMS, Truckbase, DAT, Truckstop, Samsara, Motive. We don't replace your stack — we put intelligent layers on top of it.",
  },
  {
    no: "04",
    title: "Dispatch dashboards built for owners",
    body: "Most TMS UIs are dispatcher-first. The owner-operator needs a phone view showing truck-level P&L today. We've built that twelve different ways. Each industry-tailored.",
  },
  {
    no: "05",
    title: "AI dispatch agents",
    body: "Custom voice/WhatsApp/web agents trained on your rate floors and preferred brokers. We've shipped Bubba-AI-style agents that book overnight loads without human touch.",
  },
  {
    no: "06",
    title: "Broker fraud defense",
    body: "After R&R/AGX/Helix shutdowns, every broker needs carrier vetting + bond monitoring. We build it into the portal — auto-flag double-broker risk before the load goes out.",
  },
];

const articles = [
  { title: "The 7 things I always see broken on logistics websites", read: "8 min", category: "Audit Patterns" },
  { title: "Why generic agencies fail trucking clients", read: "5 min", category: "Industry" },
  { title: "Building a custom dispatch dashboard vs. paying McLeod $50K", read: "11 min", category: "Buy vs Build" },
  { title: "The AI dispatcher agent stack — what actually works in 2026", read: "9 min", category: "AI Systems" },
];

const principles = [
  {
    title: "Ship in days, not months.",
    body: "If we can't deliver value in 14 days, the scope is wrong. Every project is broken into weekly increments with visible milestones — you see progress every Friday.",
  },
  {
    title: "Own your data forever.",
    body: "Your dashboards, your CRM, your CMS — all hosted under your control, exportable on demand. No SaaS lock-in. Cancel a retainer; the work stays yours.",
  },
  {
    title: "One operator, one bill.",
    body: "You work with me. Not an account manager, not a project coordinator, not a junior. Same person who scopes the work ships it and answers your texts.",
  },
  {
    title: "Outcomes over invoices.",
    body: "Every retainer is month-to-month. If a sprint doesn't move a real metric (booked loads, driver apps, payment cycle time), we redo it at no charge.",
  },
];

const testimonials = [
  {
    quote: "Yasir doesn't just build sites — he understands logistics. He asked about our dispatch ratios in the first 5 minutes. I'd never had a vendor ask that before.",
    name: "Mike R.", role: "Operations Director", company: "Mid-market freight broker · Atlanta, GA",
  },
  {
    quote: "11 days from kickoff to live carrier portal. Onboarding went from 3 days to 20 minutes. The ROI conversation was over before the second invoice.",
    name: "James K.", role: "Owner", company: "14-truck asset carrier · Houston, TX",
  },
  {
    quote: "I've worked with 4 web agencies over 8 years. Yasir is the only one who returned a Loom audit before pitching. That alone closed me.",
    name: "Rachel D.", role: "Owner", company: "Local moving company · Dallas, TX",
  },
];

const LogisticsValue = () => {
  const [form, setForm] = useState({ name: "", email: "", url: "", bottleneck: "" });

  useEffect(() => {
    document.title = "Logistics Solutions — Value & Authority | Yasir Bashir";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "800+ logistics builds. 5 years. One niche. Premium websites, dispatch dashboards, driver apps & AI systems for US carriers, brokers, and movers.");
  }, []);

  const submitAudit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[V1 Value] Audit request — ${form.name}`);
    const body = encodeURIComponent(
      `New audit request from /logistics-solutions/value\n\nName: ${form.name}\nEmail: ${form.email}\nWebsite: ${form.url}\nBottleneck: ${form.bottleneck || "(not provided)"}\n`
    );
    window.location.href = `mailto:yasirbashirai@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <LogisticsVersionSwitcher />

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/85 border-b border-primary/10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="w-9 h-9 rounded-md gradient-bg flex items-center justify-center font-heading font-extrabold text-sm text-primary-foreground">YB</span>
            <div className="leading-none">
              <p className="font-heading font-extrabold text-sm">Yasir Bashir</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">Logistics Solutions</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-bold text-muted-foreground">
            <a href="#expertise" className="hover:text-foreground transition">Expertise</a>
            <a href="#principles" className="hover:text-foreground transition">Principles</a>
            <a href="#portfolio" className="hover:text-foreground transition">Work</a>
            <a href="#writing" className="hover:text-foreground transition">Writing</a>
          </nav>
          <a href="#book" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition">
            Free Audit →
          </a>
        </div>
      </header>

      {/* HERO — Editorial, authority-first */}
      <section className="pt-32 pb-20 lg:pt-44 lg:pb-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[600px] rounded-full bg-primary/[0.10] blur-[140px]" />

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10">

          <div className="flex items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
              <Award className="w-3 h-3" /> Authority · Value · Experience
            </span>
          </div>

          <h1 className="font-heading font-extrabold tracking-[-0.04em] leading-[0.95] text-5xl sm:text-6xl lg:text-7xl xl:text-[100px] max-w-5xl mb-8">
            Five years.<br/>
            <span className="gradient-text">Eight hundred</span> logistics builds.<br/>
            One niche.
          </h1>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8">
                I'm Yasir Bashir. I've spent the last five years building only one thing: <span className="text-foreground font-medium">websites, dispatch dashboards, driver apps, and AI systems for US logistics businesses.</span>
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                Not generic agency work. Not whatever pays. Just logistics — carriers, brokers, dispatch services, movers, couriers, car haulers. I've shipped enough of these to know the patterns. This page exists to share what I've learned and build the next one with you.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3.5 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition">
                  <Calendar className="w-4 h-4" />
                  Book a 15-min Audit
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </a>
                <a href="#expertise" className="group inline-flex items-center gap-2 text-foreground font-semibold border-b-2 border-primary pb-1 hover:gap-3 transition">
                  See where I have receipts <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 lg:pl-8 lg:border-l border-primary/15">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-4">Credentials</p>
              <div className="space-y-5">
                {credentials.map((c) => (
                  <div key={c.label}>
                    <p className="font-heading font-extrabold text-4xl tracking-[-0.03em] gradient-text">{c.num}</p>
                    <p className="text-sm font-bold text-foreground mt-1">{c.label}</p>
                    <p className="text-xs text-muted-foreground">{c.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO QUOTE */}
      <section className="py-20 lg:py-28 bg-card border-y border-primary/15">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <Quote className="w-12 h-12 text-primary mx-auto mb-8" strokeWidth={1.5} />
          <p className="font-heading font-bold text-2xl lg:text-4xl leading-snug tracking-[-0.02em] text-foreground italic">
            "Most logistics owners are juggling four tools, paying two SaaS vendors, and writing rate cons in plain-text email at 11 PM. The fix isn't more software. It's <span className="gradient-text not-italic">one system, owned by you,</span> built around how your operation actually runs."
          </p>
          <p className="mt-8 text-sm text-muted-foreground uppercase tracking-wider">— Yasir Bashir, after build #621</p>
        </div>
      </section>

      {/* EXPERTISE — What I've Learned */}
      <section id="expertise" className="py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
            <div className="lg:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">§ 01 · Domain Expertise</p>
              <h2 className="font-heading font-extrabold text-4xl lg:text-5xl tracking-[-0.03em] leading-[1.02]">
                Six things I've shipped <span className="gradient-text">hundreds of times.</span>
              </h2>
            </div>
            <div className="lg:col-span-8 text-muted-foreground text-lg leading-relaxed pt-2">
              When you've built 800 of something, patterns emerge. Below are the six product types I've delivered most often — each with the playbook, the gotchas, and the integrations that actually work.
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-primary/15 border border-primary/15 rounded-md overflow-hidden">
            {expertise.map((e, i) => (
              <div key={i} className="bg-background p-8 lg:p-10 hover:bg-primary/[0.02] transition">
                <p className="font-mono text-xs text-primary font-bold mb-3">{e.no}</p>
                <h3 className="font-heading font-extrabold text-2xl lg:text-3xl mb-4 tracking-tight">{e.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section id="principles" className="py-24 lg:py-32 bg-card border-y border-primary/15">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">§ 02 · Operating Principles</p>
            <h2 className="font-heading font-extrabold text-4xl lg:text-5xl tracking-[-0.03em] leading-[1.02]">
              How I work, <span className="gradient-text">in writing.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              No surprises. These four principles govern every project, every retainer, every conversation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {principles.map((p, i) => (
              <div key={i} className="border-l-4 border-primary pl-6 lg:pl-8">
                <p className="font-mono text-xs text-primary font-bold mb-2">P0{i + 1}</p>
                <h3 className="font-heading font-extrabold text-2xl lg:text-3xl mb-4 tracking-tight">{p.title}</h3>
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <LogisticsPortfolio variant="grid" sectionNum="§ 03" />

      {/* WRITING / VALUE CONTENT */}
      <section id="writing" className="py-24 lg:py-32 bg-card border-y border-primary/15">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-12 items-end">
            <div className="lg:col-span-7">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">§ 04 · Free Writing</p>
              <h2 className="font-heading font-extrabold text-4xl lg:text-5xl tracking-[-0.03em] leading-[1.02]">
                What I've learned, <span className="gradient-text">free to read.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Long-form essays on logistics tech, dispatch software, broker portals, and what I see broken on most logistics websites. No fluff, no SEO bait. Subscribe and read one per week.
              </p>
            </div>
          </div>

          <div className="divide-y divide-primary/15 border-y border-primary/15">
            {articles.map((a, i) => (
              <a key={i} href="#" className="group grid lg:grid-cols-12 gap-6 py-6 lg:py-8 hover:bg-primary/[0.03] transition px-4 -mx-4">
                <div className="lg:col-span-2 font-mono text-xs text-muted-foreground">ESSAY {String(i + 1).padStart(2, "0")}</div>
                <div className="lg:col-span-2">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-primary font-bold">{a.category}</p>
                </div>
                <div className="lg:col-span-7">
                  <h3 className="font-heading font-bold text-xl lg:text-2xl leading-tight group-hover:text-primary transition">{a.title}</h3>
                </div>
                <div className="lg:col-span-1 flex items-start lg:justify-end">
                  <span className="text-xs text-muted-foreground font-mono">{a.read}</span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">Newsletter dropping monthly. <a href="#book" className="text-primary underline underline-offset-4 hover:no-underline font-medium">Subscribe via the audit form below →</a></p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — Long-form */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-12">
            <div className="lg:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">§ 05 · Receipts</p>
              <h2 className="font-heading font-extrabold text-4xl lg:text-5xl tracking-[-0.03em] leading-[1.02]">
                Words from <span className="gradient-text">real US operators.</span>
              </h2>
            </div>
            <div className="lg:col-span-8 text-muted-foreground text-lg leading-relaxed pt-2">
              Pulled directly from delivery emails, post-launch reviews, and referral intros. Names and companies blurred where requested — first initial used.
            </div>
          </div>

          <div className="space-y-8">
            {testimonials.map((t, i) => (
              <div key={i} className="grid lg:grid-cols-12 gap-6 lg:gap-12 py-8 border-t border-primary/15">
                <div className="lg:col-span-3">
                  <div className="flex gap-0.5 mb-3 text-primary">
                    {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="w-3.5 h-3.5 fill-primary" />)}
                  </div>
                  <p className="font-heading font-bold text-lg">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.company}</p>
                </div>
                <div className="lg:col-span-9">
                  <p className="font-heading text-2xl lg:text-3xl leading-snug text-foreground italic">
                    "{t.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA — Value-led, calm */}
      <section id="book" className="py-24 lg:py-32 bg-card border-t border-primary/15">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">

          <div className="text-center mb-14">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-4">§ 06 · Begin</p>
            <h2 className="font-heading font-extrabold text-5xl lg:text-7xl tracking-[-0.04em] leading-[0.95]">
              Two ways to begin.<br/>
              <span className="gradient-text italic">Both free.</span>
            </h2>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I don't gate the value behind a sales call. You can get the audit without ever talking to me. Or you can book the call. Either way, you walk away with a clear next step.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-primary/15 border border-primary/15 rounded-md overflow-hidden">
            <div className="bg-background p-8 lg:p-10">
              <Calendar className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
              <h3 className="font-heading font-extrabold text-2xl mb-3">Book the call</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">15 minutes. Bring your URL, fleet size, and biggest bottleneck. You'll leave with a custom plan.</p>
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="group block w-full text-center bg-primary text-primary-foreground py-3.5 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition">
                Book 15-min Call →
              </a>
            </div>

            <div className="bg-background p-8 lg:p-10">
              <Send className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
              <h3 className="font-heading font-extrabold text-2xl mb-3">Get a Loom audit</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">No call. Drop your URL — I'll record a personal 10-min Loom within 24 hours.</p>
              <form onSubmit={submitAudit} className="space-y-3">
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full bg-foreground/[0.03] border border-primary/15 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary transition placeholder:text-muted-foreground" />
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="w-full bg-foreground/[0.03] border border-primary/15 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary transition placeholder:text-muted-foreground" />
                <input type="url" required value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://yourcompany.com" className="w-full bg-foreground/[0.03] border border-primary/15 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary transition placeholder:text-muted-foreground" />
                <textarea rows={2} value={form.bottleneck} onChange={(e) => setForm({ ...form, bottleneck: e.target.value })} placeholder="Biggest bottleneck right now? (optional)" className="w-full bg-foreground/[0.03] border border-primary/15 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary transition resize-none placeholder:text-muted-foreground" />
                <button type="submit" className="group w-full text-center bg-foreground/[0.05] border border-primary/30 hover:bg-primary hover:text-primary-foreground py-3.5 rounded-md font-bold text-sm uppercase tracking-wider transition">Send Audit Request →</button>
              </form>
            </div>
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
              <p className="text-xs text-muted-foreground">Logistics Solutions · V1 Authority</p>
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

export default LogisticsValue;

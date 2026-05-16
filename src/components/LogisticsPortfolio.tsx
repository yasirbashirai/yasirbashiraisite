import { ArrowUpRight, ExternalLink } from "lucide-react";

// Placeholder portfolio items — Yasir to replace with real projects
const portfolioItems = [
  { name: "SFam Logistics", category: "Freight Brokerage", desc: "Bold dark-theme brokerage website + admin dashboard", color: "from-pink-500 to-purple-600", live: false },
  { name: "Earth Logistics", category: "IN Freight Broker", desc: "15-page corporate B2B site, white/navy/blue palette", color: "from-cyan-500 to-blue-600", live: false },
  { name: "Steer Logistics", category: "Trucking Carrier", desc: "Full corporate site + driver recruiting funnel", color: "from-orange-500 to-red-600", live: false },
  { name: "Jon's Material Hauling", category: "Material Hauling", desc: "Local hauling company with online booking", color: "from-green-500 to-emerald-600", live: false },
  { name: "Arnold Freight Co", category: "Freight Carrier", desc: "Modern carrier website with quote system", color: "from-violet-500 to-indigo-600", live: false },
  { name: "Fairway Logistics", category: "Logistics Services", desc: "Full-service logistics site with portal access", color: "from-yellow-500 to-amber-600", live: false },
];

type Props = { variant?: "grid" | "list" | "minimal"; sectionNum?: string };

const LogisticsPortfolio = ({ variant = "grid", sectionNum }: Props) => {
  return (
    <section id="portfolio" className="py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-12 items-end">
          <div className="lg:col-span-7">
            {sectionNum && (
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">{sectionNum} · Portfolio</p>
            )}
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.02]">
              Live projects. <span className="gradient-text">Real US logistics clients.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              Each project below was shipped in 14–30 days for a real US carrier, broker, mover, or dispatcher. Click through to see live sites and case studies.
            </p>
          </div>
        </div>

        {/* PLACEHOLDER NOTICE — to be removed when real portfolio is added */}
        <div className="mb-6 px-4 py-3 bg-primary/[0.04] border border-primary/20 rounded-md text-xs text-muted-foreground flex items-center justify-between flex-wrap gap-2">
          <span><strong className="text-foreground">Portfolio Placeholder:</strong> Yasir to replace with real screenshots, live URLs, and detailed case studies.</span>
          <span className="font-mono text-primary/70">PortfolioPlaceholder.tsx</span>
        </div>

        {variant === "grid" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolioItems.map((item, i) => (
              <a
                key={i}
                href="#"
                className="group bg-card border border-primary/15 rounded-md overflow-hidden hover:border-primary/50 transition-all"
              >
                {/* Image placeholder */}
                <div className={`aspect-[16/10] bg-gradient-to-br ${item.color} relative overflow-hidden flex items-center justify-center`}>
                  <span className="font-heading font-extrabold text-3xl text-white/90 text-center px-4">{item.name}</span>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
                {/* Content */}
                <div className="p-5">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-primary font-bold mb-2">{item.category}</p>
                  <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition">{item.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </a>
            ))}
          </div>
        )}

        {variant === "list" && (
          <div className="divide-y divide-primary/15 border-y border-primary/15">
            {portfolioItems.map((item, i) => (
              <a key={i} href="#" className="group grid lg:grid-cols-12 gap-6 py-8 hover:bg-primary/[0.02] transition px-4 -mx-4">
                <div className="lg:col-span-2 font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</div>
                <div className="lg:col-span-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-primary font-bold mb-1">{item.category}</p>
                  <h3 className="font-heading font-bold text-2xl group-hover:text-primary transition">{item.name}</h3>
                </div>
                <div className="lg:col-span-5 text-muted-foreground leading-relaxed">{item.desc}</div>
                <div className="lg:col-span-2 flex items-start justify-end">
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition">
                    View case study <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        {variant === "minimal" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {portfolioItems.map((item, i) => (
              <a key={i} href="#" className="group bg-card border border-primary/15 rounded-md p-5 hover:border-primary transition">
                <div className={`w-full aspect-square bg-gradient-to-br ${item.color} rounded mb-3 flex items-center justify-center`}>
                  <span className="font-heading font-extrabold text-xs text-white/90 text-center px-2 leading-tight">{item.name}</span>
                </div>
                <p className="text-[10px] uppercase tracking-wider text-primary font-bold">{item.category}</p>
                <h3 className="font-heading font-bold text-sm group-hover:text-primary transition">{item.name}</h3>
              </a>
            ))}
          </div>
        )}

        <p className="mt-10 text-sm text-muted-foreground text-center">
          800+ projects delivered. Above are 6 highlighted examples. Full portfolio on request.
        </p>
      </div>
    </section>
  );
};

export default LogisticsPortfolio;

import { ArrowUpRight } from "lucide-react";

// Placeholder portfolio items, replace with real screenshots when available
const portfolioItems = [
  { name: "SFam Logistics", category: "Freight Brokerage", desc: "Bold dark-theme brokerage website + admin dashboard", color: "from-teal-500 to-emerald-600", live: false, image: null },
  { name: "Earth Logistics", category: "IN Freight Broker", desc: "15-page corporate B2B site, white/navy palette", color: "from-cyan-500 to-teal-600", live: false, image: null },
  { name: "Steer Logistics", category: "Trucking Carrier", desc: "Full corporate site + driver recruiting funnel", color: "from-amber-500 to-orange-600", live: false, image: null },
  { name: "Jon's Material Hauling", category: "Material Hauling", desc: "Local hauling company with online booking", color: "from-emerald-500 to-teal-600", live: false, image: null },
  { name: "Arnold Freight Co", category: "Freight Carrier", desc: "Modern carrier website with quote system", color: "from-teal-600 to-cyan-600", live: false, image: null },
  { name: "Fairway Logistics", category: "Logistics Services", desc: "Full-service logistics site with portal access", color: "from-orange-400 to-amber-600", live: false, image: null },
];

type Props = { variant?: "grid" | "list" | "minimal"; sectionNum?: string };

const LogisticsPortfolio = ({ variant = "grid", sectionNum }: Props) => {
  return (
    <section id="portfolio" className="py-16 lg:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 mb-10 items-end">
          <div className="lg:col-span-7">
            {sectionNum && (
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">{sectionNum} · Portfolio</p>
            )}
            <h2 className="font-heading font-extrabold text-4xl lg:text-6xl tracking-[-0.03em] leading-[1.02]">
              Live projects. <span className="font-serif-italic gradient-text">Real US logistics clients.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base lg:text-lg text-foreground/75 leading-relaxed">
              Each project below was shipped in 14-30 days for a real US carrier, broker, mover, or dispatcher.
            </p>
          </div>
        </div>

        {variant === "grid" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {portfolioItems.map((item, i) => (
              <a
                key={i}
                href="#"
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-card-hover hover:-translate-y-1 transition-all grain-bg"
              >
                {/* Image / visual */}
                <div className={`aspect-[16/10] bg-gradient-to-br ${item.color} relative overflow-hidden flex items-center justify-center`}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <span className="font-heading font-extrabold text-3xl text-white/95 text-center px-4">{item.name}</span>
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition" />
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-soft">
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  </div>
                </div>
                {/* Content */}
                <div className="p-5">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-primary font-bold mb-2">{item.category}</p>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition">{item.name}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
                </div>
              </a>
            ))}
          </div>
        )}

        {variant === "list" && (
          <div className="divide-y divide-border border-y border-border">
            {portfolioItems.map((item, i) => (
              <a key={i} href="#" className="group grid lg:grid-cols-12 gap-6 py-7 hover:bg-secondary/40 transition px-4 -mx-4 rounded">
                <div className="lg:col-span-2 font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</div>
                <div className="lg:col-span-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-primary font-bold mb-1">{item.category}</p>
                  <h3 className="font-heading font-bold text-2xl text-foreground group-hover:text-primary transition">{item.name}</h3>
                </div>
                <div className="lg:col-span-5 text-foreground/70 leading-relaxed text-sm">{item.desc}</div>
                <div className="lg:col-span-2 flex items-start justify-end">
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition">
                    View <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LogisticsPortfolio;

import { useState, useEffect, useRef } from "react";
import {
  Menu, X, ArrowRight, Calculator, Briefcase, ChevronDown,
  Truck, Package, Brush, GraduationCap, HardHat, Building, Banknote, ShoppingBag,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import AiSparkle from "./AiSparkle";

const links = [
  { label: "About", hash: "#stats" },
  { label: "Process", hash: "#process" },
  { label: "Pricing", hash: "#pricing" },
  { label: "FAQ", hash: "#faq" },
];

type Industry = {
  name: string;
  desc: string;
  icon: typeof Truck;
  href?: string;
  available: boolean;
};

const industries: Industry[] = [
  { name: "Logistics Solutions", desc: "US carriers, brokers, movers", icon: Truck, href: "/logistics-solutions", available: true },
  { name: "Moving Companies", desc: "Quote funnels & booking", icon: Package, available: false },
  { name: "Cleaning Services", desc: "Booking & scheduling automation", icon: Brush, available: false },
  { name: "Coaching & Consulting", desc: "Personal brand + CRM", icon: GraduationCap, available: false },
  { name: "Construction", desc: "Project showcases & RFQ portals", icon: HardHat, available: false },
  { name: "Real Estate", desc: "Listings + lead capture", icon: Building, available: false },
  { name: "Finance & Fintech", desc: "Trust-grade, compliance-ready", icon: Banknote, available: false },
  { name: "E-commerce Brands", desc: "Stores + retention + CRO", icon: ShoppingBag, available: false },
];

const IndustryCard = ({ industry, onClick }: { industry: Industry; onClick?: () => void }) => {
  const Icon = industry.icon;
  const content = (
    <div className="group flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-primary-soft transition relative h-full">
      <div className="icon-box icon-box-sm shrink-0">
        <Icon className="w-4 h-4" strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <p className="font-heading font-bold text-[13px] text-foreground group-hover:text-primary transition leading-tight">
            {industry.name}
          </p>
          {!industry.available && (
            <span className="text-[8px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-full bg-secondary text-foreground/65 border border-border">
              Soon
            </span>
          )}
        </div>
        <p className="text-[11px] text-foreground/65 leading-snug mt-0.5">{industry.desc}</p>
      </div>
    </div>
  );

  if (industry.available && industry.href) {
    return (
      <Link to={industry.href} onClick={onClick} className="block">
        {content}
      </Link>
    );
  }
  return (
    <div className="opacity-70 cursor-not-allowed select-none" aria-disabled="true">
      {content}
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimerRef = useRef<number | undefined>(undefined);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hover open / delayed close so the cursor can travel from trigger to menu
  const openServices = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = undefined;
    }
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setServicesOpen(false), 180);
  };

  useEffect(() => () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
  }, []);

  // Smart section-link handler
  const goToSection = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname === "/") {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.location.hash = hash;
    } else {
      navigate("/" + hash);
    }
  };

  const goToServicesOverview = (e: React.MouseEvent) => {
    e.preventDefault();
    setServicesOpen(false);
    setOpen(false);
    if (location.pathname === "/") {
      const el = document.querySelector("#services");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/#services");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? "glass-nav" : ""}`}
      style={{ transitionProperty: "background-color, border-color, box-shadow", transitionDuration: "200ms" }}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/logo.png"
            alt="Yasir Bashir"
            className="w-11 h-11 object-contain bg-white"
            style={{ borderRadius: "5px" }}
          />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-heading font-bold text-base text-foreground">Yasir Bashir</span>
            <span className="text-[9px] uppercase tracking-[0.18em] font-bold text-primary">AI Engineer</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          <a
            href="/#about"
            onClick={(e) => goToSection(e, "#about")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium cursor-pointer"
          >
            About
          </a>

          {/* Services mega menu — hover triggered */}
          <div
            className="relative"
            onMouseEnter={openServices}
            onMouseLeave={scheduleClose}
          >
            <button
              onClick={() => setServicesOpen((v) => !v)}
              className={`inline-flex items-center gap-1 text-sm transition-colors font-medium cursor-pointer ${
                servicesOpen ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
            >
              Services
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>

            {/* One fixed wrapper, anchored to viewport. Header (z-50) stays
                on top, this menu sits at z-40 strictly underneath it. The
                top padding inside the wrapper acts as the hover bridge so
                no separate floating element is needed. */}
            {servicesOpen && (
              <div
                onMouseEnter={openServices}
                onMouseLeave={scheduleClose}
                className="fixed left-1/2 -translate-x-1/2 top-[4.5rem] pt-3 w-[min(960px,calc(100vw-2rem))] z-40"
              >
                <div className="bg-card border border-border rounded-2xl shadow-card-hover p-5 grain-bg">
                {/* Header strip */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-border">
                  <div>
                    <p className="font-heading font-extrabold text-base text-foreground">Industries we build for</p>
                    <p className="text-xs text-foreground/65">Pick your niche, see what we ship.</p>
                  </div>
                  <a
                    href="/#services"
                    onClick={goToServicesOverview}
                    className="text-xs font-heading font-bold text-primary hover:text-primary-dark inline-flex items-center gap-1 cursor-pointer"
                  >
                    All services <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Horizontal layout: CTA card left, industries grid right */}
                <div className="grid grid-cols-12 gap-4">
                  {/* Left CTA card */}
                  <div className="col-span-12 lg:col-span-4">
                    <div
                      className="relative overflow-hidden rounded-2xl p-5 h-full flex flex-col grain-bg shadow-card"
                      style={{
                        background:
                          "linear-gradient(155deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 100%)",
                      }}
                    >
                      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gold-light/25 blur-3xl pointer-events-none" />
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-heading font-bold text-white/85 mb-3">
                          <AiSparkle size={12} className="text-gold-light" />
                          Free strategy call
                        </div>
                        <h4 className="font-heading font-extrabold text-xl text-white leading-tight mb-2">
                          Not sure which niche fits?
                        </h4>
                        <p className="text-sm text-white/85 leading-relaxed mb-4 flex-1">
                          Book a 15-min audit. I&apos;ll map your fastest path to revenue, no pitch.
                        </p>
                        <a
                          href="https://cal.com/yasir-bashir-bp4wob/30min"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setServicesOpen(false)}
                          className="inline-flex items-center justify-center gap-2 bg-white text-primary font-heading font-extrabold text-sm rounded-full px-5 py-2.5 hover:scale-[1.03] transition shadow-gold-glow ring-2 ring-gold-light/50"
                        >
                          Book free call
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right: industries grid */}
                  <div className="col-span-12 lg:col-span-8">
                    <div className="grid grid-cols-2 gap-1">
                      {industries.map((i) => (
                        <IndustryCard key={i.name} industry={i} onClick={() => setServicesOpen(false)} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border text-center">
                  <p className="text-[11px] text-foreground/65">
                    Need a niche not listed?{" "}
                    <a href="https://wa.me/923446012505" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                      Message me on WhatsApp
                    </a>
                  </p>
                </div>
                </div>
              </div>
            )}
          </div>

          {links.slice(1).map((l) => (
            <a
              key={l.hash}
              href={`/${l.hash}`}
              onClick={(e) => goToSection(e, l.hash)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium cursor-pointer"
            >
              {l.label}
            </a>
          ))}

          <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5" /> Portfolio
          </Link>
          <Link to="/calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-1">
            <Calculator className="w-3.5 h-3.5" /> ROI
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a href="https://cal.com/yasir-bashir-bp4wob/30min" target="_blank" rel="noopener noreferrer" className="btn-glass text-sm">
            Book Free Audit <ArrowRight className="w-4 h-4 btn-icon" />
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} className="text-foreground p-2" aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-card mx-4 mb-4 p-4 flex flex-col gap-1 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <a
            href="/#about"
            onClick={(e) => goToSection(e, "#about")}
            className="py-2 px-3 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted cursor-pointer"
          >
            About
          </a>

          <button
            onClick={() => setMobileServicesOpen((v) => !v)}
            className="py-2 px-3 text-foreground font-medium rounded-lg hover:bg-muted cursor-pointer flex items-center justify-between"
          >
            <span>Services</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileServicesOpen && (
            <div className="pl-2 pr-1 pt-1 pb-2 space-y-2">
              {/* Mobile CTA card */}
              <div
                className="relative overflow-hidden rounded-xl p-4 shadow-card"
                style={{
                  background:
                    "linear-gradient(155deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 100%)",
                }}
              >
                <div className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-heading font-bold text-white/85 mb-2">
                  <AiSparkle size={11} className="text-gold-light" />
                  Free strategy call
                </div>
                <p className="text-sm font-heading font-extrabold text-white leading-tight mb-3">
                  Not sure which niche fits?
                </p>
                <a
                  href="https://cal.com/yasir-bashir-bp4wob/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary font-heading font-extrabold text-xs rounded-full px-4 py-2 ring-2 ring-gold-light/50"
                >
                  Book free call <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <a
                href="/#services"
                onClick={goToServicesOverview}
                className="block py-1.5 px-3 text-xs font-heading font-bold uppercase tracking-widest text-primary"
              >
                All services overview →
              </a>
              {industries.map((i) => (
                <IndustryCard key={i.name} industry={i} onClick={() => setOpen(false)} />
              ))}
            </div>
          )}

          {links.slice(1).map((l) => (
            <a
              key={l.hash}
              href={`/${l.hash}`}
              onClick={(e) => goToSection(e, l.hash)}
              className="py-2 px-3 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted cursor-pointer"
            >
              {l.label}
            </a>
          ))}

          <Link to="/portfolio" onClick={() => setOpen(false)} className="py-2 px-3 text-primary font-bold flex items-center gap-1.5 rounded-lg hover:bg-muted">
            <Briefcase className="w-4 h-4" /> Portfolio
          </Link>
          <Link to="/calculator" onClick={() => setOpen(false)} className="py-2 px-3 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted flex items-center gap-1.5">
            <Calculator className="w-4 h-4" /> ROI Calculator
          </Link>
          <a href="https://cal.com/yasir-bashir-bp4wob/30min" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="btn-glass mt-3 justify-center">
            Book Free Audit <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;

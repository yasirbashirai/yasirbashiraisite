import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Calculator, Briefcase, Truck } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "About", hash: "#stats" },
  { label: "Services", hash: "#services" },
  { label: "Process", hash: "#process" },
  { label: "Pricing", hash: "#pricing" },
  { label: "FAQ", hash: "#faq" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smart section-link handler:
  // - on home → smooth scroll to the section
  // - elsewhere → navigate to /#section (ScrollToTop handles the scroll)
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-nav" : ""}`}>
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <img
              src="/logo.png"
              alt="Yasir Bashir"
              className="w-11 h-11 object-contain bg-white"
              style={{ borderRadius: "5px" }}
            />
            {/* Live AI pulse dot */}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary border-2 border-white" />
            </span>
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-heading font-bold text-base text-foreground">Yasir Bashir</span>
            <span className="text-[9px] uppercase tracking-[0.18em] font-bold text-primary">AI Engineer · Live</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.hash}
              href={`/${l.hash}`}
              onClick={(e) => goToSection(e, l.hash)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium cursor-pointer"
            >
              {l.label}
            </a>
          ))}
          <Link to="/logistics-solutions" className="text-sm text-primary hover:text-primary/80 transition-colors font-bold flex items-center gap-1">
            <Truck className="w-3.5 h-3.5" /> Logistics
          </Link>
          <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5" /> Portfolio
          </Link>
          <Link to="/calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-1">
            <Calculator className="w-3.5 h-3.5" /> ROI Calculator
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

      {open && (
        <div className="md:hidden glass-card mx-4 mb-4 p-4 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.hash}
              href={`/${l.hash}`}
              onClick={(e) => goToSection(e, l.hash)}
              className="py-2 px-3 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted cursor-pointer"
            >
              {l.label}
            </a>
          ))}
          <Link to="/logistics-solutions" onClick={() => setOpen(false)} className="py-2 px-3 text-primary font-bold flex items-center gap-1.5 rounded-lg hover:bg-muted">
            <Truck className="w-4 h-4" /> Logistics
          </Link>
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

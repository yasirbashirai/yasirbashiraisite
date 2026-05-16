import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Calculator, Briefcase, Truck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "About", href: "#stats" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-nav" : ""}`}>
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center font-heading font-extrabold text-lg text-primary-foreground">
            YB
          </span>
          <span className="font-heading font-bold text-foreground hidden sm:block">Yasir Bashir</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
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
          <button onClick={() => setOpen(!open)} className="text-foreground p-2">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden glass-card mx-4 mb-4 p-4 flex flex-col gap-1">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 px-3 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
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

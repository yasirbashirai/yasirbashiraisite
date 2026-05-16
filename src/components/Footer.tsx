import { Link } from "react-router-dom";
import { Github, Linkedin, Facebook, Youtube, Mail, Phone } from "lucide-react";
import fiverrLogo from "@/assets/fiverr-logo.png";
import upworkLogo from "@/assets/upwork-logo.png";
import payoneerLogo from "@/assets/payoneer-logo.png";
import wiseLogo from "@/assets/wise-logo.png";

const socials = [
  { icon: Github, href: "https://github.com/yasirbashirai" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/yasirbashiraiengineer/" },
  { icon: Facebook, href: "https://web.facebook.com/yasirprodev/" },
  { icon: Youtube, href: "https://www.youtube.com/@YasirBashirai" },
];

const serviceLinks = [
  "n8n Automation", "GoHighLevel", "AI Chatbots", "Web Apps",
  "Lead Generation", "CRM Implementation", "Vibe Coding", "FREE CRO Audit",
];

const quickLinks = [
  { label: "About", href: "#stats" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Book a Call", href: "https://cal.com/yasir-bashir-bp4wob/30min", external: true },
  { label: "Contact", href: "#contact" },
];

const pageLinks = [
  { label: "💼 Portfolio", href: "/portfolio" },
  { label: "🧮 ROI Calculator", href: "/calculator" },
];

const platforms = [
  { name: "Fiverr", logo: fiverrLogo },
  { name: "Upwork", logo: upworkLogo },
  { name: "Payoneer", logo: payoneerLogo },
  { name: "Wise", logo: wiseLogo },
];

const Footer = () => (
  <footer className="glass-nav mt-20">
    <div className="container mx-auto px-4 py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div>
          <h3 className="font-heading font-extrabold text-2xl gradient-text mb-2">Yasir Bashir</h3>
          <p className="text-sm text-muted-foreground mb-1 font-heading font-semibold">
            AI Automation Engineer | Growth Strategist
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Building AI-powered business systems that generate leads, automate operations, and scale revenue — 24/7.
          </p>

          {/* Contact info */}
          <div className="space-y-2 mb-4">
            <a href="mailto:yasirbashirai@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Mail size={14} /> yasirbashirai@gmail.com
            </a>
            <a href="https://wa.me/923446012505" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Phone size={14} /> +92 344 601 2505
            </a>
          </div>

          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-heading font-bold text-foreground mb-4">Services</h4>
          <ul className="space-y-2">
            {serviceLinks.map((s) => (
              <li key={s}>
                <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-bold text-foreground mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {quickLinks.map((l) => (
              <li key={l.label}>
                {l.external ? (
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l.label}
                  </a>
                ) : (
                  <a href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l.label}
                  </a>
                )}
              </li>
            ))}
            <li className="pt-2 border-t border-border mt-2">
              {pageLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="block py-1 text-sm text-primary font-semibold hover:text-primary/80 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </li>
          </ul>
        </div>

        {/* Platforms */}
        <div>
          <h4 className="font-heading font-bold text-foreground mb-4">Work With Me On</h4>
          <div className="flex flex-wrap gap-3 mb-6">
            {platforms.map((p) => (
              <div key={p.name} className="glass-card px-4 py-3 flex items-center gap-2 rounded-xl">
                <img src={p.logo} alt={p.name} className="h-5 w-auto object-contain" />
                <span className="text-sm font-heading font-semibold text-foreground">{p.name}</span>
              </div>
            ))}
            {/* PayPal with SVG-like styling */}
            <div className="glass-card px-4 py-3 flex items-center gap-2 rounded-xl">
              <span className="text-lg">💳</span>
              <span className="text-sm font-heading font-semibold text-foreground">PayPal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-muted-foreground text-center">
        <span>© 2026 Yasir Bashir. All rights reserved.</span>
        <span className="hidden sm:inline">·</span>
        <Link to="/disclaimer" className="hover:text-primary transition-colors font-medium">
          Disclaimer &amp; Terms
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;

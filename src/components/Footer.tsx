import { Link } from "react-router-dom";
import { Github, Linkedin, Facebook, Youtube, Instagram, Mail, Phone } from "lucide-react";
import fiverrLogo from "@/assets/fiverr-logo.png";
import upworkLogo from "@/assets/upwork-logo.png";
import payoneerLogo from "@/assets/payoneer-logo.png";
import wiseLogo from "@/assets/wise-logo.png";

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/yasirbashiraiengineer/" },
  { icon: Instagram, href: "https://www.instagram.com/yasirbhatti.331/" },
  { icon: Github, href: "https://github.com/yasirbashirai" },
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

const platforms: { name: string; logo: string; hideName?: boolean }[] = [
  { name: "Fiverr", logo: fiverrLogo, hideName: true },
  { name: "Upwork", logo: upworkLogo, hideName: true },
  { name: "Payoneer", logo: payoneerLogo, hideName: true },
  { name: "Wise", logo: wiseLogo, hideName: true },
];

const Footer = () => (
  <footer
    className="mt-20 relative overflow-hidden"
    style={{
      background:
        "linear-gradient(160deg, hsl(var(--primary)) 0%, hsl(var(--primary-dark)) 100%)",
    }}
  >
    {/* Decorative glow + grain */}
    <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gold-light/20 blur-3xl pointer-events-none" />
    <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-white/10 blur-3xl pointer-events-none" />
    <div className="absolute inset-0 grain-bg opacity-40 pointer-events-none" />

    <div className="container mx-auto px-4 py-16 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/logo.png"
              alt="Yasir Bashir"
              className="w-12 h-12 object-contain bg-white/10 rounded-xl p-1 backdrop-blur"
            />
            <h3 className="font-heading font-extrabold text-2xl text-white">Yasir Bashir</h3>
          </div>
          <p className="text-base text-white/85 mb-2 font-heading font-semibold">
            AI Automation Engineer · Growth Strategist
          </p>
          <p className="text-base text-white/75 leading-relaxed mb-5">
            Building premium websites &amp; AI-powered growth systems that generate leads, automate ops, and scale revenue, 24/7.
          </p>

          {/* Contact info */}
          <div className="space-y-2 mb-5">
            <a href="mailto:yasirbashirai@gmail.com" className="flex items-center gap-2 text-sm text-white/85 hover:text-white transition-colors">
              <Mail size={16} /> yasirbashirai@gmail.com
            </a>
            <a href="https://wa.me/923446012505" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/85 hover:text-white transition-colors">
              <Phone size={16} /> +92 344 601 2505
            </a>
          </div>

          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: "hsl(var(--secondary))",
                  color: "hsl(var(--primary))",
                  border: "1.5px solid hsla(43, 90%, 60%, 0.55)",
                }}
              >
                <s.icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-heading font-bold text-lg text-white mb-4">Services</h4>
          <ul className="space-y-2.5">
            {serviceLinks.map((s) => (
              <li key={s}>
                <a href="#services" className="text-base text-white/80 hover:text-white transition-colors">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-bold text-lg text-white mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.label}>
                {l.external ? (
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-base text-white/80 hover:text-white transition-colors">
                    {l.label}
                  </a>
                ) : (
                  <a href={l.href} className="text-base text-white/80 hover:text-white transition-colors">
                    {l.label}
                  </a>
                )}
              </li>
            ))}
            <li className="pt-3 border-t border-white/15 mt-3">
              {pageLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="block py-1 text-base font-semibold text-gold-light hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </li>
          </ul>
        </div>

        {/* Platforms */}
        <div>
          <h4 className="font-heading font-bold text-lg text-white mb-4">Work With Me On</h4>
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="bg-white px-3 py-2.5 flex items-center gap-2 rounded-xl shadow-soft"
              >
                <img src={p.logo} alt={p.name} className="h-5 w-auto object-contain" />
                {!p.hideName && (
                  <span className="text-sm font-heading font-semibold text-foreground">{p.name}</span>
                )}
              </div>
            ))}
            <div className="bg-white px-3 py-2.5 flex items-center gap-2 rounded-xl shadow-soft">
              <span className="text-lg">💳</span>
              <span className="text-sm font-heading font-semibold text-foreground">PayPal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 pt-6 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-white/75 text-center">
        <span>© 2026 Yasir Bashir. All rights reserved.</span>
        <span className="hidden sm:inline">·</span>
        <Link to="/disclaimer" className="hover:text-white transition-colors font-medium">
          Disclaimer &amp; Terms
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;

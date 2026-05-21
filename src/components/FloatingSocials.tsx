import { Github, Linkedin, Facebook, Youtube, Instagram } from "lucide-react";

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/yasirbashiraiengineer/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/yasirbhatti.331/", label: "Instagram" },
  { icon: Github, href: "https://github.com/yasirbashirai", label: "GitHub" },
  { icon: Facebook, href: "https://web.facebook.com/yasirprodev/", label: "Facebook" },
  { icon: Youtube, href: "https://www.youtube.com/@YasirBashirai", label: "YouTube" },
];

const FloatingSocials = () => (
  <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 hidden md:flex">
    {socials.map((s) => (
      <a
        key={s.label}
        href={s.href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-soft"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 100%)",
          color: "hsl(var(--secondary))",
          border: "1.5px solid hsla(43, 90%, 60%, 0.45)",
        }}
        aria-label={s.label}
      >
        <s.icon size={20} />
      </a>
    ))}
  </div>
);

export default FloatingSocials;

import { Github, Linkedin, Facebook, Youtube } from "lucide-react";

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/yasirbashiraiengineer/", label: "LinkedIn" },
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
        className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all"
        aria-label={s.label}
      >
        <s.icon size={18} />
      </a>
    ))}
  </div>
);

export default FloatingSocials;

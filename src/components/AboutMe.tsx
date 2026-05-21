import { useEffect, useState } from "react";
import { ArrowRight, Linkedin, Github, Facebook, Youtube, MessageCircle } from "lucide-react";
import AiSparkle from "./AiSparkle";

const photos = [
  "/about/yasir-1.jpg",
  "/about/yasir-2.jpg",
  "/about/yasir-3.jpg",
  "/about/yasir-4.jpg",
  "/about/yasir-5.jpg",
];

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/yasirbashiraiengineer/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/yasirbashirai", label: "GitHub" },
  { icon: Facebook, href: "https://web.facebook.com/yasirprodev/", label: "Facebook" },
  { icon: Youtube, href: "https://www.youtube.com/@YasirBashirai", label: "YouTube" },
  { icon: MessageCircle, href: "https://wa.me/923446012505", label: "WhatsApp" },
];

const AboutMe = () => {
  const [active, setActive] = useState(0);

  // Auto-cycle photos
  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % photos.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="about"
      className="relative overflow-hidden py-16 md:py-24 px-4"
      style={{
        background:
          "linear-gradient(135deg, hsl(var(--secondary)) 0%, hsla(31, 80%, 96%, 1) 100%)",
      }}
    >
      {/* Decorative glow + grain (no card wrapper, the whole section is the bg) */}
      <div className="absolute -top-40 -right-40 w-[28rem] h-[28rem] rounded-full bg-primary-light/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-gold-light/20 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 grain-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT, Bio + socials */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-primary text-sm font-heading font-bold uppercase tracking-widest mb-5 shadow-soft border border-primary/15">
              <AiSparkle size={14} />
              About Me
            </div>

            <h2 className="font-heading font-extrabold text-3xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-[1.05] tracking-tight">
              I&apos;m Yasir Bashir.<br className="hidden sm:block" />
              <span className="font-serif-italic gradient-text">AI Automation Engineer.</span>
            </h2>

            <div className="space-y-4 text-foreground/80 text-base md:text-lg leading-relaxed max-w-xl mb-7">
              <p>
                I live at the intersection of design, code and intelligence. I architect AI-first systems, ship production-grade web apps, and wire automations that move real numbers, not vanity metrics.
              </p>
              <p>
                My toolkit: <span className="font-semibold text-foreground">React + Next.js</span> for frontends,{" "}
                <span className="font-semibold text-foreground">n8n &amp; GoHighLevel</span> for the operational layer,{" "}
                <span className="font-semibold text-foreground">OpenAI / Claude APIs</span> for the brain, custom backends when off-the-shelf isn&apos;t enough. I obsess over conversion details, performance budgets, and clean architecture.
              </p>
              <p>
                Off-screen I&apos;m experimenting with new AI workflows, hiking through the mountains, or chasing the next great cup of coffee.
              </p>
            </div>

            {/* Socials */}
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.18em] font-heading font-bold text-foreground/65 mb-3">
                Follow / connect
              </p>
              <div className="flex flex-wrap gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-11 h-11 rounded-full bg-white border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:-translate-y-0.5 shadow-soft transition"
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <a
              href="https://cal.com/yasir-bashir-bp4wob/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-primary inline-block"
            >
              <span className="hero-cta-inner">
                Let&apos;s build something
                <ArrowRight className="w-4 h-4 btn-icon" />
              </span>
            </a>
          </div>

          {/* RIGHT, tilted profile card with Ken Burns photos */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className="relative w-full max-w-[360px] transition-transform duration-500 hover:rotate-0"
              style={{ transform: "rotate(2deg)" }}
            >
              <div className="relative rounded-3xl bg-white border border-primary/15 shadow-card-hover p-5 grain-bg">
                {/* Header strip */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-heading font-bold text-primary">
                    AI Engineer · Builder
                  </p>
                  <p className="text-[10px] font-mono text-foreground/60">
                    {String(active + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
                  </p>
                </div>

                {/* Image stage with Ken Burns zoom */}
                <div className="relative rounded-2xl overflow-hidden bg-secondary aspect-[3/4] shadow-soft">
                  {photos.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={`Yasir, photo ${i + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        i === active ? "ken-burns" : ""
                      }`}
                      style={{ opacity: i === active ? 1 : 0 }}
                    />
                  ))}
                </div>

                {/* Bottom: name only */}
                <div className="mt-4 pt-3 border-t border-border text-center">
                  <p className="font-heading font-extrabold text-lg text-foreground leading-tight">Yasir Bashir</p>
                  <p className="text-xs text-foreground/65 mt-0.5">AI Automation Engineer</p>
                </div>

                {/* Dot indicators */}
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  {photos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      aria-label={`Show photo ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === active ? "w-6 bg-primary" : "w-1.5 bg-primary/25 hover:bg-primary/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

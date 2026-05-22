import Section from "./Section";
import { testimonials as cmsTestimonials } from "@/lib/cms";

const FALLBACK = [
  { name: "James R.", role: "Moving Company Owner", platform: "Fiverr", text: "Yasir automated our entire lead follow-up. We went from missing 60% of inquiries to booking every single one automatically. ROI in the first week." },
  { name: "Sarah M.", role: "Med Spa Owner", platform: "Upwork", text: "Best investment we made. Yasir built our entire CRM + funnel in days. We're now generating leads while we sleep." },
  { name: "Ahmed K.", role: "E-commerce Owner", platform: "Fiverr", text: "The AI chatbot he built handles our customer support 24/7. Saved us $3K/month in staff costs immediately." },
  { name: "Michael T.", role: "Agency Owner", platform: "LinkedIn", text: "Yasir is not just a developer, he's a strategic partner. His systems thinking is on another level." },
  { name: "Lisa P.", role: "SaaS Founder", platform: "Upwork", text: "We launched our SaaS MVP in 2 weeks. Can't believe the quality and speed. Will never work with anyone else." },
  { name: "David O.", role: "Transport Company", platform: "Fiverr", text: "The n8n automation he built saves our team 40+ hours every week. Absolutely game-changing." },
];

const testimonials =
  cmsTestimonials.length > 0
    ? cmsTestimonials.map((t) => ({
        name: t.name,
        role: t.role,
        platform: t.company || "Direct",
        text: t.quote,
      }))
    : FALLBACK;

// Distribute across 3 columns (top + bottom of each column)
const col1 = [testimonials[0 % testimonials.length], testimonials[3 % testimonials.length]];
const col2 = [testimonials[1 % testimonials.length], testimonials[4 % testimonials.length]];
const col3 = [testimonials[2 % testimonials.length], testimonials[5 % testimonials.length]];

const Card = ({ t }: { t: typeof testimonials[0] }) => (
  <div className="glass-card p-5 mb-4">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center font-heading font-bold text-sm text-primary-foreground">
        {t.name.split(" ").map(w => w[0]).join("")}
      </div>
      <div>
        <p className="font-heading font-bold text-foreground text-sm">{t.name}</p>
        <p className="text-xs text-muted-foreground">{t.role}</p>
      </div>
      <span className="ml-auto glass-pill text-xs py-1 px-2">{t.platform}</span>
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed mb-3">"{t.text}"</p>
    <div className="text-primary text-sm">⭐⭐⭐⭐⭐</div>
  </div>
);

const ScrollColumn = ({ items, direction }: { items: typeof testimonials; direction: "up" | "down" }) => (
  <div className="testimonial-scroll">
    <div className={direction === "up" ? "scroll-track-up" : "scroll-track-down"}>
      {[...items, ...items, ...items].map((t, i) => (
        <Card key={i} t={t} />
      ))}
    </div>
  </div>
);

const Testimonials = () => (
  <Section id="testimonials" className="py-16 px-4 bg-gradient-to-b from-white via-cream/40 to-white">
    <div className="max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="glass-pill text-xs font-heading font-bold uppercase tracking-widest text-primary mb-4">
          Receipts
        </span>
        <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground mt-5 mb-3 leading-tight">
          Trusted by <span className="font-serif-italic gradient-text">300+ businesses</span> across logistics, SaaS &amp; coaching.
        </h2>
        <p className="text-muted-foreground text-base md:text-lg">
          Real names, real businesses, real numbers, no stock photos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScrollColumn items={col1} direction="up" />
        <ScrollColumn items={col2} direction="down" />
        <ScrollColumn items={col3} direction="up" />
      </div>
    </div>
  </Section>
);

export default Testimonials;

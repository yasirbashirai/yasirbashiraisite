import Section from "./Section";

const testimonials = [
  { name: "James R.", role: "Moving Company Owner", platform: "Fiverr", text: "Yasir automated our entire lead follow-up. We went from missing 60% of inquiries to booking every single one automatically. ROI in the first week." },
  { name: "Sarah M.", role: "Med Spa Owner", platform: "Upwork", text: "Best investment we made. Yasir built our entire CRM + funnel in days. We're now generating leads while we sleep." },
  { name: "Ahmed K.", role: "E-commerce Brand", platform: "Fiverr", text: "The AI chatbot he built handles our customer support 24/7. Saved us $3K/month in staff costs immediately." },
  { name: "Michael T.", role: "Agency Owner", platform: "LinkedIn", text: "Yasir is not just a developer — he's a strategic partner. His systems thinking is on another level." },
  { name: "Lisa P.", role: "SaaS Founder", platform: "Upwork", text: "We launched our SaaS MVP in 2 weeks. Can't believe the quality and speed. Will never work with anyone else." },
  { name: "David O.", role: "Transport Company", platform: "Fiverr", text: "The n8n automation he built saves our team 40+ hours every week. Absolutely game-changing." },
];

const col1 = [testimonials[0], testimonials[3]];
const col2 = [testimonials[1], testimonials[4]];
const col3 = [testimonials[2], testimonials[5]];

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
  <Section id="testimonials" className="py-20 px-4">
    <div className="max-w-6xl mx-auto">
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground text-center mb-4">
        What Clients Say About <span className="gradient-text">Working With Yasir</span>
      </h2>
      <p className="text-muted-foreground text-center mb-12">
        Real results from real businesses. No fluff.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScrollColumn items={col1} direction="up" />
        <ScrollColumn items={col2} direction="down" />
        <ScrollColumn items={col3} direction="up" />
      </div>
    </div>
  </Section>
);

export default Testimonials;

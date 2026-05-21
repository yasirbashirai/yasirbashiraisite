import { useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import Section from "./Section";
import vslAiAutomation from "@/assets/vsl-ai-automation.png";
import vslLeadEngine from "@/assets/vsl-lead-engine.png";
import vslWebApps from "@/assets/vsl-web-apps.png";

const videos = [
  { title: "How I Transform Businesses With AI", thumbnail: vslAiAutomation },
  { title: "n8n Automation Deep Dive", thumbnail: vslLeadEngine },
  { title: "Lead Engine Case Study", thumbnail: vslWebApps },
];

const VSLSection = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? videos.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === videos.length - 1 ? 0 : c + 1));

  return (
    <Section id="vsl" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass-pill mb-6 mx-auto">🎬 Watch This First</div>
        <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground mb-10">
          See Exactly How I<br />
          <span className="gradient-text">Transform Businesses</span> With AI
        </h2>

        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={prev}
            aria-label="Previous video"
            className="absolute left-1 md:-left-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all cursor-pointer shadow-card-hover ring-2 ring-gold-light/40"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 100%)",
            }}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={next}
            aria-label="Next video"
            className="absolute right-1 md:-right-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all cursor-pointer shadow-card-hover ring-2 ring-gold-light/40"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 100%)",
            }}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="glass-card p-2 md:p-3 mx-auto" style={{ animation: "pulse-glow 3s ease-in-out infinite" }}>
            <div className="relative aspect-video rounded-lg overflow-hidden flex items-center justify-center">
              <img src={videos[current].thumbnail} alt="Video thumbnail" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <button className="w-20 h-20 md:w-24 md:h-24 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-primary fill-primary group-hover:scale-110 transition-transform" />
                </button>
                <p className="text-white text-sm font-heading font-semibold">{videos[current].title}</p>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  i === current ? "bg-primary w-8" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default VSLSection;

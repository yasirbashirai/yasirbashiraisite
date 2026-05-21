import { useState } from "react";
import Section from "./Section";
import { ExternalLink, ChevronUp, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────────────── */
/*  PROJECT DATA                                           */
/* ─────────────────────────────────────────────────────── */

const projects = [
  {
    id: "rmg-transport",
    title: "RMG Transport",
    subtitle: "Nationwide vehicle transport, USA",
    period: "May 2023, Aug 2023",
    categories: ["Web Apps", "n8n Automation", "CRM Systems"],
    url: "https://rmgtransport.com",
    emoji: "🚗",
    preview: {
      headline: "AI lead system for a nationwide transport company.",
      stats: [
        { value: "40%", label: "More Leads" },
        { value: "60%", label: "Less Manual Work" },
        { value: "3×", label: "Faster Booking" },
      ],
    },
    detail: {
      client: "Redline Motor Group (RMG Transport)",
      industry: "Vehicle Transport / Logistics",
      location: "USA, Nationwide",
      challenge:
        "RMG was handling vehicle transport bookings manually across multiple states. Leads came in through different channels with no unified system, sales reps spent hours on follow-ups, social media was unmanaged, and ops depended on individual people.",
      solution:
        "Built a custom web application combined with a full automation stack that unified their entire operation:",
      deliverables: [
        "Custom web application with booking & quote system",
        "AI-powered lead generation system capturing inbound leads 24/7",
        "Social media automation, posts, engagement & follow-up sequences",
        "CRM setup with automated follow-up pipelines",
        "Sales workflow automation reducing manual touchpoints by 60%",
        "Operational dashboard for tracking vehicles, bookings & clients",
      ],
      results: [
        { metric: "Lead capture rate", before: "Manual, inconsistent", after: "Automated 24/7" },
        { metric: "Follow-up speed", before: "Hours to days", after: "Under 5 minutes" },
        { metric: "Manual admin time", before: "20+ hrs/week", after: "Under 8 hrs/week" },
        { metric: "Booking process", before: "Phone calls only", after: "Online self-serve" },
      ],
      tools: ["WordPress", "n8n", "GoHighLevel", "Meta Automation", "Custom CRM"],
      liveUrl: "https://rmgtransport.com",
    },
  },
  {
    id: "steer-logistics",
    title: "Steer Logistics",
    subtitle: "Freight brokerage platform, USA",
    period: "2023",
    categories: ["Web Apps"],
    url: "https://steerlogistics.co",
    emoji: "🚛",
    preview: {
      headline: "Full-scale freight brokerage web platform.",
      stats: [
        { value: "100%", label: "Digitised Ops" },
        { value: "2 wks", label: "Launch Time" },
        { value: "∞", label: "Scalable" },
      ],
    },
    detail: {
      client: "Steer Logistics",
      industry: "Freight Brokerage / Logistics",
      location: "USA",
      challenge:
        "Steer Logistics managed freight coordination between shippers and carriers manually, quotes were handled over email and phone, no digital touchpoint for clients, and no system to track capacity or broker communications at scale.",
      solution:
        "Designed and developed a full-scale web application that digitised their entire freight brokerage workflow, from quote to booking to carrier management, using AI-assisted development to launch fast.",
      deliverables: [
        "Custom freight brokerage web platform (full stack)",
        "Instant online freight quote request system",
        "Online booking functionality for shippers",
        "Shipper ↔ Carrier interaction flow",
        "Structured operational workflow dashboard",
        "AI-assisted development for accelerated delivery",
      ],
      results: [
        { metric: "Quote process", before: "Email & phone only", after: "Instant online form" },
        { metric: "Shipper experience", before: "Manual calls", after: "Self-serve platform" },
        { metric: "Launch time", before: "Estimated 3 months", after: "Delivered in 2 weeks" },
        { metric: "Operational clarity", before: "Scattered communications", after: "Centralised dashboard" },
      ],
      tools: ["Full-Stack Web Dev", "AI-Assisted Vibe Coding", "Custom Backend", "REST APIs"],
      liveUrl: "https://steerlogistics.co",
    },
  },
  {
    id: "lee-goodenough",
    title: "Lee Goodenough",
    subtitle: "Personal site + CRM",
    period: "2024",
    categories: ["Web Apps", "CRM Systems"],
    url: "https://leegoodenough.com",
    emoji: "🎯",
    preview: {
      headline: "Personal site + CRM for a business coach.",
      stats: [
        { value: "New", label: "Visual Identity" },
        { value: "Full", label: "CRM Pipeline" },
        { value: "Auto", label: "Lead Follow-up" },
      ],
    },
    detail: {
      client: "Lee Goodenough",
      industry: "Coaching",
      location: "USA",
      challenge:
        "Lee needed a complete digital presence that matched his identity, a site that clearly communicated his offer and authority, plus a backend CRM to capture, track and follow up with leads automatically.",
      solution:
        "Built a high-converting personal site with a fully integrated CRM pipeline that captures leads from the site automatically, tags them by source, and triggers follow-up sequences without manual intervention.",
      deliverables: [
        "Custom personal site design & development",
        "High-converting landing page with clear offer positioning",
        "CRM system setup with lead capture integration",
        "Automated follow-up sequence (email + SMS)",
        "Lead pipeline with stages: New → Nurturing → Booked → Closed",
        "Contact tagging and segmentation by source",
      ],
      results: [
        { metric: "Online presence", before: "None / outdated", after: "Professional site live" },
        { metric: "Lead follow-up", before: "Manual & inconsistent", after: "Fully automated" },
        { metric: "Lead tracking", before: "Spreadsheet or memory", after: "CRM pipeline with stages" },
        { metric: "Booking rate", before: "Low, no system", after: "Improved with nurture" },
      ],
      tools: ["WordPress", "GoHighLevel CRM", "Email Automation", "Custom Design"],
      liveUrl: "https://leegoodenough.com",
    },
  },
  {
    id: "dominique-mcclaney",
    title: "Dominique McClaney",
    subtitle: "Personal site + AI chatbot",
    period: "2024",
    categories: ["Web Apps", "AI Chatbots"],
    url: "",
    emoji: "🤖",
    preview: {
      headline: "AI-powered personal site for a full-stack engineer & Navy veteran.",
      stats: [
        { value: "24/7", label: "AI Chatbot" },
        { value: "100%", label: "Personalised UX" },
        { value: "Auto", label: "Lead Qualify" },
      ],
    },
    detail: {
      client: "Dominique McClaney",
      industry: "Tech / Consulting",
      location: "USA",
      challenge:
        "Dominique needed a site matching his background blending military precision, technical depth and sales personality, plus an AI chatbot that could engage visitors personally and qualify leads without him being available 24/7.",
      solution:
        "Designed and built a site that visually and tonally matched Dominique's identity, paired with a custom AI chatbot trained on his background, services and personality, so every visitor gets a personalised real-time conversation.",
      deliverables: [
        "Custom site design & development",
        "Identity aligned to background: military, tech, sales",
        "Personalised AI chatbot trained on bio, services & FAQs",
        "Chatbot handles intro convos, service questions, lead qualification",
        "Booking integration inside chatbot flow",
        "Mobile-responsive, fast-loading design",
      ],
      results: [
        { metric: "Visitor engagement", before: "Static site, no interaction", after: "AI chatbot engages every visitor" },
        { metric: "Lead qualification", before: "Manual calls", after: "AI qualifies before human touchpoint" },
        { metric: "Online identity", before: "No digital presence", after: "Professional site matching identity" },
        { metric: "Availability", before: "Business hours only", after: "AI chatbot active 24/7" },
      ],
      tools: ["Custom Web Dev", "AI Chatbot (trained)", "Booking Integration"],
      liveUrl: "",
    },
  },
  {
    id: "ai-content-planner",
    title: "AI Content Planner",
    subtitle: "n8n automation for e-commerce",
    period: "2024",
    categories: ["n8n Automation", "Social Automation"],
    url: "",
    emoji: "📱",
    preview: {
      headline: "AI-driven content engine that runs without a social media team.",
      stats: [
        { value: "30+", label: "Posts/Month" },
        { value: "80%", label: "Time Saved" },
        { value: "0", label: "Manual Scheduling" },
      ],
    },
    detail: {
      client: "E-commerce Business (Confidential)",
      industry: "E-commerce / Retail",
      location: "International",
      challenge:
        "The team was spending 15-20 hours per week manually creating, scheduling, and posting social media content. Posts were often late or skipped, quality was inconsistent. They needed a system that produced and published content on autopilot without adding headcount.",
      solution:
        "Deployed an AI-driven content planning and scheduling system built entirely in n8n, a fully automated workflow that generates content ideas, creates copy using AI, schedules posts and sends weekly performance reports.",
      deliverables: [
        "Full n8n workflow for AI content generation",
        "Auto-generates post ideas based on catalogue + trends",
        "AI writes captions, selects hashtags, and formats per platform",
        "Automated scheduling to IG, FB, TikTok & Pinterest",
        "Weekly content calendar auto-built and emailed to team",
        "Performance tracking, engagement data pulled into n8n",
        "Optional human approval checkpoint before posting",
      ],
      results: [
        { metric: "Content hours/week", before: "15-20 hrs manual", after: "Under 2 hrs review" },
        { metric: "Posting consistency", before: "Irregular, often skipped", after: "Daily posts, never missed" },
        { metric: "Content quality", before: "Inconsistent, rushed", after: "AI-optimised per platform" },
        { metric: "Team bandwidth", before: "Tied up in content", after: "Freed for high-value work" },
      ],
      tools: ["n8n", "OpenAI GPT-4", "Meta Graph API", "Notion", "Google Sheets"],
      liveUrl: "",
    },
  },
  {
    id: "freelanceflow-ai",
    title: "FreelanceFlow AI",
    subtitle: "SaaS, AI copywriting for freelancers",
    period: "2024 - 2025",
    categories: ["SaaS Products", "Web Apps"],
    url: "",
    emoji: "🚀",
    preview: {
      headline: "Built a SaaS that writes pro freelancer copy in seconds.",
      stats: [
        { value: "SaaS", label: "Full Product" },
        { value: "AI", label: "Writing Engine" },
        { value: "10×", label: "Faster Proposals" },
      ],
    },
    detail: {
      client: "Internal / Own Product",
      industry: "SaaS / Freelance Tools",
      location: "Global",
      challenge:
        "Freelancers spend 20-30% of working time on communication: proposals, follow-ups, scope, emails. None of that directly makes them money. They needed an AI tool built for their workflow, not a generic chatbot.",
      solution:
        "Built FreelanceFlow AI, a dedicated SaaS with AI tools designed specifically for freelancers and professional communicators. Every feature is purpose-built for a specific freelancer pain point.",
      deliverables: [
        "🤖 Proposal Generator, polished proposals in seconds",
        "📧 Client Email Writer, follow-ups, scope changes, payment reminders",
        "📋 Project Scope Builder, auto-builds scope-of-work docs",
        "💬 Objection Handler, responses to tough client pushback",
        "🧾 Invoice Copy, professional payment request language",
        "📈 Rate Negotiation Scripts, charge more without losing the client",
        "🌐 Multi-platform web app, accessible anywhere",
      ],
      results: [
        { metric: "Proposal writing time", before: "1-2 hrs per proposal", after: "Under 5 minutes" },
        { metric: "Communication quality", before: "Inconsistent, informal", after: "Always professional" },
        { metric: "Client perception", before: "Amateur communications", after: "Agency-level professionalism" },
        { metric: "Follow-up rate", before: "Often forgotten", after: "Automated reminders" },
      ],
      tools: ["React", "Node.js", "OpenAI API", "Stripe", "Supabase", "Tailwind", "Vercel"],
      liveUrl: "",
    },
  },
];

/* ─────────────────────────────────────────────────────── */

const FILTERS = [
  "All Projects",
  "Web Apps",
  "n8n Automation",
  "AI Chatbots",
  "GoHighLevel",
  "SaaS Products",
  "Social Automation",
  "CRM Systems",
];

// Color palette for placeholder image gradients (cycled per project)
const placeholderGradients = [
  "from-teal-500 to-emerald-600",
  "from-amber-500 to-orange-600",
  "from-cyan-500 to-teal-600",
  "from-emerald-500 to-teal-600",
  "from-teal-600 to-cyan-600",
  "from-orange-400 to-amber-600",
];

type ProjectWithImage = typeof projects[0] & { image?: string };

const ProjectCard = ({
  project,
  isOpen,
  onToggle,
  index,
}: {
  project: ProjectWithImage;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) => (
  <div className="flex flex-col">
    <div
      onClick={onToggle}
      className={`relative rounded-2xl flex flex-col cursor-pointer overflow-hidden group bg-card border transition-all duration-300 ${
        isOpen
          ? "border-primary/50 shadow-card-hover -translate-y-1"
          : "border-border shadow-card hover:shadow-card-hover hover:-translate-y-1"
      }`}
    >
      {/* Image slot — replace `image` field on the project with a URL to swap in real screenshots */}
      <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${placeholderGradients[index % placeholderGradients.length]} grain-bg`}>
        {project.image ? (
          <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/95">
            <span className="text-5xl mb-2">{project.emoji}</span>
            <span className="font-heading font-extrabold text-2xl text-center px-4">{project.title}</span>
            <span className="text-xs uppercase tracking-widest mt-2 opacity-80">Replace with project image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition" />
      </div>

      <div className="p-5 flex flex-col gap-4 grain-bg">
        {/* Tags row */}
        <div className="flex items-center gap-2 flex-wrap">
          {project.categories.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="text-xs font-heading font-bold px-2.5 py-0.5 rounded-full bg-primary-soft border border-primary/20 text-primary"
            >
              {cat}
            </span>
          ))}
          <span className="text-xs ml-auto text-muted-foreground">{project.period}</span>
        </div>

      {/* Title */}
      <div>
        <h3 className="font-heading font-bold text-xl text-foreground leading-tight">{project.title}</h3>
        <p className="text-sm mt-0.5 text-muted-foreground">{project.subtitle}</p>
      </div>

      {/* Headline */}
      <p className="text-sm leading-relaxed text-foreground/75">{project.preview.headline}</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {project.preview.stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-2.5 text-center bg-secondary border border-primary/15"
          >
            <div className="font-heading font-extrabold text-lg gradient-text">{s.value}</div>
            <div className="text-xs mt-0.5 text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 pt-1">
        <button className="flex items-center gap-1.5 text-sm font-heading font-bold text-primary">
          {isOpen ? (
            <><ChevronUp className="w-4 h-4" /> Close</>
          ) : (
            <><ArrowRight className="w-4 h-4" /> View project</>
          )}
        </button>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs font-medium ml-auto text-muted-foreground hover:text-primary transition-colors"
          >
            Live site <ExternalLink className="w-3 h-3" />
          </a>
        )}
        </div>
      </div>
    </div>

    {/* Detail panel */}
    <div
      style={{
        maxHeight: isOpen ? "3000px" : "0px",
        opacity: isOpen ? 1 : 0,
        overflow: "hidden",
        transition: "max-height 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease",
        marginTop: isOpen ? "12px" : "0px",
      }}
    >
      <DetailPanel project={project} />
    </div>
  </div>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-heading font-bold tracking-widest uppercase text-primary">{children}</p>
);

const DetailPanel = ({ project }: { project: typeof projects[0] }) => {
  const d = project.detail;
  return (
    <div className="rounded-2xl p-6 md:p-8 flex flex-col gap-6 bg-card border border-primary/20 shadow-card">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{project.emoji}</span>
            <h3 className="font-heading font-extrabold text-2xl text-foreground">{project.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {d.client} · {d.industry} · {d.location} · {project.period}
          </p>
        </div>
        {d.liveUrl && (
          <a
            href={d.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-heading font-bold px-4 py-2 rounded-full bg-primary-soft border border-primary/30 text-primary hover:bg-primary hover:text-white transition"
          >
            Visit site <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      <div className="h-px w-full bg-border" />

      {/* Challenge */}
      <div>
        <SectionLabel>The challenge</SectionLabel>
        <p className="text-sm leading-relaxed mt-2 text-foreground/80">{d.challenge}</p>
      </div>

      {/* Deliverables */}
      <div>
        <SectionLabel>What was built</SectionLabel>
        <p className="text-sm mt-2 mb-3 text-foreground/75">{d.solution}</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {d.deliverables.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-foreground/85">
              <span className="mt-0.5 flex-shrink-0 text-xs text-primary">✓</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Before / After */}
      <div>
        <SectionLabel>The transformation</SectionLabel>
        <div className="mt-3 rounded-xl overflow-hidden border border-border">
          <div className="grid grid-cols-3 text-xs font-heading font-bold uppercase bg-secondary">
            <div className="p-3 text-foreground/65">Area</div>
            <div className="p-3 text-destructive border-l border-border">❌ Before</div>
            <div className="p-3 text-success border-l border-border">✅ After</div>
          </div>
          {d.results.map((row, i) => (
            <div key={i} className="grid grid-cols-3 text-sm border-t border-border">
              <div className="p-3 font-medium text-foreground/70">{row.metric}</div>
              <div className="p-3 text-foreground/75 bg-destructive/[0.05] border-l-2 border-destructive/30">
                {row.before}
              </div>
              <div className="p-3 font-medium text-foreground bg-success/[0.06] border-l-2 border-success/30">
                {row.after}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div>
        <SectionLabel>Tools &amp; tech</SectionLabel>
        <div className="flex flex-wrap gap-2 mt-3">
          {d.tools.map((tool) => (
            <span
              key={tool}
              className="text-xs font-heading font-semibold px-3 py-1.5 rounded-full bg-primary-soft border border-primary/25 text-primary"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-xl p-5 text-center flex flex-col gap-3 items-center bg-primary-soft border border-primary/20">
        <p className="font-heading font-bold text-foreground">Want results like this for your business?</p>
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <a
            href="https://cal.com/yasir-bashir-bp4wob/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta-primary"
          >
            <span className="hero-cta-inner">🔥 Book free audit</span>
          </a>
          <a
            href="https://wa.me/923446012505"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-sm"
          >
            💬 Ask about this
          </a>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const [openProject, setOpenProject] = useState<string | null>(null);

  const filtered = projects.filter(
    (p) => activeFilter === "All Projects" || p.categories.includes(activeFilter)
  );

  const toggleProject = (id: string) => {
    setOpenProject((prev) => (prev === id ? null : id));
  };

  return (
    <Section id="portfolio" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="glass-pill text-sm font-heading font-bold uppercase tracking-widest text-primary mb-4 inline-flex">
            💼 Real work. Real results.
          </span>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 mb-4 leading-tight">
            Projects that{" "}
            <span className="font-serif-italic gradient-text">transformed businesses.</span>
          </h2>
          <p className="text-foreground/75 text-base md:text-lg max-w-2xl mx-auto">
            Every project started with a real problem. Every one ended with a system that scaled. Filter by what you need most.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 flex-wrap justify-center mb-10">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setOpenProject(null);
                }}
                className={`text-sm font-heading font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-white border-transparent shadow-card-hover"
                    : "bg-card border border-border text-foreground/75 hover:border-primary/40 hover:text-foreground"
                }`}
                style={
                  isActive
                    ? {
                        background:
                          "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 100%)",
                      }
                    : undefined
                }
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              isOpen={openProject === project.id}
              onToggle={() => toggleProject(project.id)}
              index={i}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-heading font-bold text-xl">No projects in this category yet.</p>
          </div>
        )}

        {/* Footer CTA */}
        <div className="relative mt-16 p-[2.5px] rounded-3xl bg-gold-gradient shadow-gold-glow">
          <div
            className="rounded-[1.4rem] p-10 text-center"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 100%)",
            }}
          >
            <h3 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-3">
              Have a project in mind?
            </h3>
            <p className="text-base md:text-lg mb-8 max-w-xl mx-auto text-white/85">
              Let&apos;s build something that transforms your business.
            </p>
            <div className="flex items-center gap-4 justify-center flex-wrap">
              <a
                href="https://cal.com/yasir-bashir-bp4wob/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-primary font-heading font-extrabold text-base rounded-full px-6 py-3.5 hover:scale-[1.03] transition shadow-gold-glow ring-2 ring-gold-light/60"
              >
                🔥 Book a free audit <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923446012505"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-base"
              >
                💬 Tell me your project
              </a>
            </div>
            <p className="text-sm mt-6 text-white/70">800+ projects delivered. Yours could be next.</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Portfolio;

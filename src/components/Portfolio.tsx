import { useState, useRef } from "react";
import Section from "./Section";
import { ExternalLink, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────────────── */
/*  PROJECT DATA                                           */
/* ─────────────────────────────────────────────────────── */

const projects = [
  {
    id: "rmg-transport",
    title: "RMG Transport",
    subtitle: "Nationwide Vehicle Transport — USA",
    period: "May 2023 – Aug 2023",
    categories: ["Web Apps", "n8n Automation", "CRM Systems"],
    tags: ["Web Application", "Lead Gen", "Social Automation", "CRM"],
    url: "https://rmgtransport.com",
    emoji: "🚗",
    visual: "browser",
    preview: {
      headline: "AI Lead System for a Nationwide Transport Company",
      stats: [
        { value: "40%", label: "More Leads" },
        { value: "60%", label: "Less Manual Work" },
        { value: "3×", label: "Faster Booking" },
      ],
    },
    detail: {
      client: "Redline Motor Group (RMG Transport)",
      industry: "Vehicle Transport / Logistics",
      location: "USA — Nationwide",
      challenge:
        "Redline Motor Group was handling vehicle transport bookings manually across multiple states. Leads came in through different channels with no unified system — sales reps were spending hours on follow-ups, social media was unmanaged, and operational workflows were entirely dependent on individual people.",
      solution:
        "Built a custom web application combined with a full automation stack that unified their entire operation:",
      deliverables: [
        "Custom web application with booking & quote system",
        "AI-powered lead generation system capturing inbound leads 24/7",
        "Social media automation — posts, engagement & follow-up sequences",
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
    subtitle: "Freight Brokerage Platform — USA",
    period: "2023",
    categories: ["Web Apps"],
    tags: ["SaaS Platform", "Freight", "Web Application", "AI Dev"],
    url: "https://steerlogistics.co",
    emoji: "🚛",
    visual: "dashboard",
    preview: {
      headline: "Full-Scale Freight Brokerage Web Platform",
      stats: [
        { value: "100%", label: "Digitized Ops" },
        { value: "2 wks", label: "Launch Time" },
        { value: "∞", label: "Scalable" },
      ],
    },
    detail: {
      client: "Steer Logistics",
      industry: "Freight Brokerage / Logistics",
      location: "USA",
      challenge:
        "Steer Logistics was managing freight coordination between shippers and carriers manually — quotes were handled over email and phone, there was no digital touchpoint for clients, and the team had no system to track capacity, loads, or broker communications at scale.",
      solution:
        "Designed and developed a full-scale web application that digitized their entire freight brokerage workflow — from quote request to booking confirmation to carrier management — using AI-assisted development to launch fast without sacrificing quality.",
      deliverables: [
        "Custom freight brokerage web platform (full stack)",
        "Instant online freight quote request system",
        "Online booking functionality for shippers",
        "Shipper ↔ Carrier interaction and communication flow",
        "Structured operational workflow dashboard",
        "Business process digitization — eliminated email/phone bottleneck",
        "AI-assisted development for accelerated delivery",
      ],
      results: [
        { metric: "Quote process", before: "Email & phone only", after: "Instant online form" },
        { metric: "Shipper experience", before: "Manual calls", after: "Self-serve platform" },
        { metric: "Launch time", before: "Estimated 3 months", after: "Delivered in 2 weeks" },
        { metric: "Operational clarity", before: "Scattered communications", after: "Centralized dashboard" },
      ],
      tools: ["Full-Stack Web Dev", "AI-Assisted Vibe Coding", "Custom Backend", "REST APIs"],
      liveUrl: "https://steerlogistics.co",
    },
  },
  {
    id: "lee-goodenough",
    title: "Lee Goodenough",
    subtitle: "Personal Brand Website + CRM System",
    period: "2024",
    categories: ["Web Apps", "CRM Systems"],
    tags: ["Personal Brand", "Website", "CRM", "Lead System"],
    url: "https://leegoodenough.com",
    emoji: "🎯",
    visual: "browser",
    preview: {
      headline: "Personal Brand Website & CRM for a Business Coach",
      stats: [
        { value: "New", label: "Brand Identity" },
        { value: "Full", label: "CRM Pipeline" },
        { value: "Auto", label: "Lead Follow-up" },
      ],
    },
    detail: {
      client: "Lee Goodenough",
      industry: "Personal Brand / Coaching",
      location: "USA",
      challenge:
        "Lee needed a complete digital presence that matched his personal brand — a website that clearly communicated his offer and authority, combined with a backend CRM system to capture, track and follow up with leads automatically so no opportunity was missed.",
      solution:
        "Built a high-converting personal brand website with a fully integrated CRM pipeline that captures leads from the website automatically, tags them by source, and triggers follow-up sequences — all without manual intervention.",
      deliverables: [
        "Custom personal brand website — design & development",
        "High-converting landing page with clear offer positioning",
        "CRM system setup with lead capture integration",
        "Automated follow-up sequence (email + SMS)",
        "Lead pipeline with stages: New → Nurturing → Booked → Closed",
        "Contact tagging and segmentation by source",
      ],
      results: [
        { metric: "Online presence", before: "None / outdated", after: "Professional brand site live" },
        { metric: "Lead follow-up", before: "Manual & inconsistent", after: "Fully automated" },
        { metric: "Lead tracking", before: "Spreadsheet or memory", after: "CRM pipeline with stages" },
        { metric: "Booking rate", before: "Low — no system", after: "Improved with automated nurture" },
      ],
      tools: ["WordPress", "GoHighLevel CRM", "Email Automation", "Custom Design"],
      liveUrl: "https://leegoodenough.com",
    },
  },
  {
    id: "dominique-mcclaney",
    title: "Dominique McClaney",
    subtitle: "Personal Brand Website + AI Chatbot",
    period: "2024",
    categories: ["Web Apps", "AI Chatbots"],
    tags: ["Personal Brand", "AI Chatbot", "Website", "Navy Veteran"],
    url: "",
    emoji: "🤖",
    visual: "chatbot",
    preview: {
      headline: "AI-Powered Personal Brand for a Full Stack Engineer & Navy Veteran",
      stats: [
        { value: "24/7", label: "AI Chatbot" },
        { value: "100%", label: "Personalized UX" },
        { value: "Auto", label: "Lead Qualify" },
      ],
    },
    detail: {
      client: "Dominique McClaney",
      industry: "Tech / Personal Brand / Consulting",
      location: "USA",
      challenge:
        "Dominique needed a personal brand website that matched his unique background — blending military precision, technical depth, and sales personality. He also needed an AI chatbot that could engage visitors personally, answer questions about his background, and qualify potential clients — without him being available 24/7.",
      solution:
        "Designed and built a personal brand website that visually and tonally matched Dominique's identity, paired with a custom AI chatbot trained on his background, services, and personality — so every visitor gets a personalized, real-time conversation.",
      deliverables: [
        "Custom personal brand website — design & development",
        "Brand identity aligned to his background: military, tech, sales",
        "Personalized AI chatbot trained on his bio, services & FAQs",
        "Chatbot handles: intro conversations, service questions, lead qualification",
        "Booking integration inside chatbot flow",
        "Mobile-responsive, fast-loading design",
      ],
      results: [
        { metric: "Visitor engagement", before: "Static website, no interaction", after: "AI chatbot engages every visitor" },
        { metric: "Lead qualification", before: "Manual calls to qualify", after: "AI qualifies before human touchpoint" },
        { metric: "Personal brand", before: "No digital presence", after: "Professional site matching his identity" },
        { metric: "Availability", before: "Business hours only", after: "AI chatbot active 24/7" },
      ],
      tools: ["Custom Web Dev", "AI Chatbot (trained)", "Booking Integration", "Brand Design"],
      liveUrl: "",
    },
  },
  {
    id: "ai-content-planner",
    title: "AI Content Planner & Scheduler",
    subtitle: "n8n Automation for E-commerce Brand",
    period: "2024",
    categories: ["n8n Automation", "Social Automation"],
    tags: ["n8n", "Content Automation", "Social Media", "E-commerce", "AI"],
    url: "",
    emoji: "📱",
    visual: "nodes",
    preview: {
      headline: "AI-Driven Content Engine That Runs Without a Social Media Team",
      stats: [
        { value: "30+", label: "Posts/Month" },
        { value: "80%", label: "Time Saved" },
        { value: "0", label: "Manual Scheduling" },
      ],
    },
    detail: {
      client: "E-commerce Brand (Confidential)",
      industry: "E-commerce / Retail",
      location: "International",
      challenge:
        "The brand's team was spending 15–20 hours per week manually creating, scheduling, and posting social media content. Posts were often late or skipped during busy periods, and content quality was inconsistent. They needed a system that would produce and publish content on autopilot without adding headcount.",
      solution:
        "Deployed an AI-driven content planning and scheduling system built entirely in n8n — a fully automated workflow that generates content ideas, creates copy using AI, schedules posts across platforms, and sends weekly performance reports to the team.",
      deliverables: [
        "Full n8n workflow for AI content generation",
        "Auto-generates post ideas based on product catalog + trending topics",
        "AI writes captions, selects hashtags, and formats per platform",
        "Automated scheduling to Instagram, Facebook, TikTok & Pinterest",
        "Weekly content calendar auto-built and sent to team via email",
        "Performance tracking — pulls engagement data back into n8n",
        "Human approval checkpoint built in (optional review before posting)",
      ],
      results: [
        { metric: "Content hours/week", before: "15–20 hours manual", after: "Under 2 hours review" },
        { metric: "Posting consistency", before: "Irregular, often skipped", after: "Daily posts, never missed" },
        { metric: "Content quality", before: "Inconsistent, rushed", after: "AI-optimized per platform" },
        { metric: "Team bandwidth", before: "Tied up in content creation", after: "Freed for high-value work" },
      ],
      tools: ["n8n", "OpenAI GPT-4", "Meta Graph API", "Notion", "Google Sheets", "Zapier Webhooks"],
      liveUrl: "",
      howItWorks: [
        "n8n pulls product data + trending topics every Monday",
        "AI (GPT-4) generates 30 content ideas + full captions",
        "Content is auto-formatted per platform (IG, FB, TikTok)",
        "Optional: team reviews via Notion/email before publishing",
        "Posts auto-schedule and publish at optimal times",
        "Engagement data pulled weekly → performance report sent to team",
      ],
    },
  },
  {
    id: "freelanceflow-ai",
    title: "FreelanceFlow AI",
    subtitle: "SaaS Product — AI Copywriting for Freelancers",
    period: "2024–2025",
    categories: ["SaaS Products", "Web Apps"],
    tags: ["SaaS", "AI", "Copywriting", "Freelancers", "Web App"],
    url: "",
    emoji: "🚀",
    visual: "dashboard",
    preview: {
      headline: "Built a SaaS Tool That Writes Professional Freelancer Copy in Seconds",
      stats: [
        { value: "SaaS", label: "Full Product" },
        { value: "AI", label: "Powered Writing" },
        { value: "10×", label: "Faster Proposals" },
      ],
    },
    detail: {
      client: "Internal / Own Product",
      industry: "SaaS / Freelance Tools",
      location: "Global",
      challenge:
        "Freelancers spend 20–30% of their working time on communication — writing proposals, following up with clients, scoping projects, and handling professional emails. This time doesn't directly make them money. They needed an AI tool built specifically for their workflow, not a generic chatbot.",
      solution:
        "Built FreelanceFlow AI — a dedicated SaaS product with AI-powered tools designed specifically for freelancers and professional communicators. Every feature is purpose-built for a specific freelancer pain point.",
      deliverables: [
        "🤖 Proposal Generator — polished proposal in seconds",
        "📧 Client Email Writer — follow-ups, scope changes, payment reminders",
        "📋 Project Scope Builder — auto-builds detailed scope of work documents",
        "💬 Objection Handler — suggested responses to tough client pushback",
        "🧾 Invoice Copy — professional payment request language",
        "📈 Rate Negotiation Scripts — how to charge more without losing the client",
        "🌐 Multi-platform: Web app, accessible anywhere",
      ],
      results: [
        { metric: "Proposal writing time", before: "1–2 hours per proposal", after: "Under 5 minutes" },
        { metric: "Communication quality", before: "Inconsistent, often informal", after: "Always professional" },
        { metric: "Client perception", before: "Amateur communications", after: "Agency-level professionalism" },
        { metric: "Follow-up rate", before: "Often forgotten/skipped", after: "Automated reminders written" },
      ],
      tools: ["React", "Node.js", "OpenAI API", "Stripe", "Supabase", "Tailwind CSS", "Vercel"],
      liveUrl: "",
      howItWorks: [
        "User selects the type of communication they need",
        "Fills in their context (client name, project, amount, situation)",
        "AI generates professional, tone-matched copy instantly",
        "User edits if needed and copies to use anywhere",
        "Saves all outputs in personal library for reuse",
      ],
    },
  },
];

/* ─────────────────────────────────────────────────────── */
/*  CSS-GENERATED VISUALS                                  */
/* ─────────────────────────────────────────────────────── */

const BrowserVisual = () => (
  <div className="w-full h-32 rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(223,0,137,0.12)" }}>
    {/* Browser bar */}
    <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(223,0,137,0.1)" }}>
      <div className="w-2 h-2 rounded-full" style={{ background: "#ff5f57" }} />
      <div className="w-2 h-2 rounded-full" style={{ background: "#febc2e" }} />
      <div className="w-2 h-2 rounded-full" style={{ background: "#28c840" }} />
      <div className="flex-1 mx-2 h-3 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
    </div>
    {/* Page content mockup */}
    <div className="p-3 flex flex-col gap-1.5">
      <div className="h-3 rounded w-2/3" style={{ background: "linear-gradient(90deg,#df0089,#641545)" }} />
      <div className="h-2 rounded w-full" style={{ background: "rgba(255,255,255,0.07)" }} />
      <div className="h-2 rounded w-4/5" style={{ background: "rgba(255,255,255,0.05)" }} />
      <div className="flex gap-2 mt-1">
        <div className="h-6 w-16 rounded-md" style={{ background: "rgba(223,0,137,0.25)", border: "1px solid rgba(223,0,137,0.3)" }} />
        <div className="h-6 w-16 rounded-md" style={{ background: "rgba(255,255,255,0.04)" }} />
      </div>
    </div>
  </div>
);

const DashboardVisual = () => (
  <div className="w-full h-32 rounded-xl overflow-hidden p-3 flex gap-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(223,0,137,0.12)" }}>
    <div className="flex flex-col gap-1.5 w-1/3">
      {[60, 85, 40, 70].map((h, i) => (
        <div key={i} className="rounded" style={{ height: `${h}%`, background: i === 1 ? "linear-gradient(180deg,#df0089,#641545)" : "rgba(255,255,255,0.07)" }} />
      ))}
    </div>
    <div className="flex-1 flex flex-col gap-1.5 justify-between">
      <div className="h-2 rounded w-full" style={{ background: "rgba(255,255,255,0.07)" }} />
      <div className="grid grid-cols-2 gap-1 flex-1">
        {["#df0089", "#641545", "rgba(255,255,255,0.08)", "rgba(255,255,255,0.06)"].map((bg, i) => (
          <div key={i} className="rounded-lg" style={{ background: bg, opacity: 0.7 + i * 0.05 }} />
        ))}
      </div>
    </div>
  </div>
);

const NodesVisual = () => (
  <div className="w-full h-32 rounded-xl overflow-hidden relative" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(223,0,137,0.12)" }}>
    <svg className="w-full h-full" viewBox="0 0 300 128">
      {/* Connection lines */}
      <line x1="60" y1="30" x2="140" y2="64" stroke="rgba(223,0,137,0.3)" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="60" y1="98" x2="140" y2="64" stroke="rgba(223,0,137,0.3)" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="160" y1="64" x2="240" y2="30" stroke="rgba(100,21,69,0.5)" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="160" y1="64" x2="240" y2="98" stroke="rgba(100,21,69,0.5)" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* Nodes */}
      {[
        { cx: 60, cy: 30 }, { cx: 60, cy: 98 },
        { cx: 150, cy: 64 },
        { cx: 240, cy: 30 }, { cx: 240, cy: 98 },
      ].map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r="12" fill={i === 2 ? "#df0089" : "rgba(255,255,255,0.06)"} stroke={i === 2 ? "#df0089" : "rgba(223,0,137,0.25)"} strokeWidth="1.5" />
          <circle cx={n.cx} cy={n.cy} r="5" fill={i === 2 ? "white" : "rgba(223,0,137,0.6)"} />
        </g>
      ))}
    </svg>
  </div>
);

const ChatbotVisual = () => (
  <div className="w-full h-32 rounded-xl overflow-hidden p-3 flex flex-col gap-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(223,0,137,0.12)" }}>
    <div className="flex items-end gap-2">
      <div className="w-5 h-5 rounded-full flex-shrink-0" style={{ background: "linear-gradient(135deg,#df0089,#641545)" }} />
      <div className="px-2.5 py-1.5 rounded-lg rounded-bl-sm text-xs" style={{ background: "rgba(223,0,137,0.12)", border: "1px solid rgba(223,0,137,0.2)", color: "rgba(255,255,255,0.7)", fontSize: "10px" }}>
        Hi! How can I help you today? 👋
      </div>
    </div>
    <div className="flex items-end gap-2 self-end flex-row-reverse">
      <div className="w-5 h-5 rounded-full flex-shrink-0" style={{ background: "rgba(255,255,255,0.1)" }} />
      <div className="px-2.5 py-1.5 rounded-lg rounded-br-sm text-xs" style={{ background: "rgba(255,255,255,0.06)", fontSize: "10px", color: "rgba(255,255,255,0.6)" }}>
        Tell me about your services
      </div>
    </div>
    <div className="flex items-center gap-1 self-start">
      {[0, 150, 300].map((d) => (
        <div key={d} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#df0089", animationDelay: `${d}ms` }} />
      ))}
    </div>
  </div>
);

const visuals: Record<string, JSX.Element> = {
  browser: <BrowserVisual />,
  dashboard: <DashboardVisual />,
  nodes: <NodesVisual />,
  chatbot: <ChatbotVisual />,
};

/* ─────────────────────────────────────────────────────── */
/*  FILTER PILLS                                           */
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

/* ─────────────────────────────────────────────────────── */
/*  PROJECT CARD                                           */
/* ─────────────────────────────────────────────────────── */

interface ProjectCardProps {
  project: typeof projects[0];
  isOpen: boolean;
  onToggle: () => void;
}

const ProjectCard = ({ project, isOpen, onToggle }: ProjectCardProps) => {
  const detailRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col">
      {/* Card */}
      <div
        onClick={onToggle}
        className="glass-card p-5 flex flex-col gap-4 cursor-pointer relative overflow-hidden group"
        style={{
          transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
          borderColor: isOpen ? "rgba(223,0,137,0.5)" : undefined,
          boxShadow: isOpen ? "0 0 40px rgba(223,0,137,0.18), 0 20px 60px rgba(0,0,0,0.4)" : undefined,
          transform: isOpen ? "translateY(-4px)" : undefined,
        }}
      >
        {/* Shimmer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(90deg,transparent,rgba(223,0,137,0.04),transparent)",
            transform: "translateX(-100%)",
            transition: "transform 0.6s ease",
          }}
        />

        {/* Tags row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xl">{project.emoji}</span>
          {project.categories.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(223,0,137,0.1)", border: "1px solid rgba(223,0,137,0.2)", color: "#df0089" }}
            >
              {cat}
            </span>
          ))}
          <span className="text-xs ml-auto" style={{ color: "rgba(255,255,255,0.35)" }}>
            {project.period}
          </span>
        </div>

        {/* Visual */}
        {visuals[project.visual]}

        {/* Title */}
        <div>
          <h3 className="font-heading font-bold text-xl text-foreground leading-tight">{project.title}</h3>
          <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{project.subtitle}</p>
        </div>

        {/* Headline */}
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
          {project.preview.headline}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {project.preview.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-2.5 text-center"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(223,0,137,0.1)" }}
            >
              <div className="font-heading font-extrabold text-lg gradient-text">{s.value}</div>
              <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Footer CTAs */}
        <div className="flex items-center gap-3 pt-1">
          <button
            className="flex items-center gap-1.5 text-sm font-bold transition-all"
            style={{ color: "#df0089" }}
          >
            {isOpen ? (
              <><ChevronUp className="w-4 h-4" /> Close</>
            ) : (
              <><ArrowRight className="w-4 h-4" /> View Project</>
            )}
          </button>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs font-medium ml-auto transition-colors"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Live Site <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Inline Detail Panel */}
      <div
        ref={detailRef}
        style={{
          maxHeight: isOpen ? "2000px" : "0px",
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
};

/* ─────────────────────────────────────────────────────── */
/*  DETAIL PANEL                                           */
/* ─────────────────────────────────────────────────────── */

const DetailPanel = ({ project }: { project: typeof projects[0] }) => {
  const d = project.detail;
  return (
    <div
      className="rounded-2xl p-6 md:p-8 flex flex-col gap-6"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(223,0,137,0.2)", backdropFilter: "blur(20px)" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{project.emoji}</span>
            <h3 className="font-heading font-extrabold text-2xl text-foreground">{project.title}</h3>
          </div>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            {d.client} · {d.industry} · {d.location} · {project.period}
          </p>
        </div>
        {d.liveUrl && (
          <a
            href={d.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full flex-shrink-0"
            style={{ background: "rgba(223,0,137,0.1)", border: "1px solid rgba(223,0,137,0.3)", color: "#df0089" }}
          >
            Visit Site <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      <div className="w-full h-px" style={{ background: "rgba(223,0,137,0.1)" }} />

      {/* Challenge */}
      <div>
        <SectionLabel>THE CHALLENGE</SectionLabel>
        <p className="text-sm leading-relaxed mt-2" style={{ color: "rgba(255,255,255,0.65)" }}>{d.challenge}</p>
      </div>

      {/* Deliverables */}
      <div>
        <SectionLabel>WHAT WAS BUILT</SectionLabel>
        <p className="text-sm mt-2 mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>{d.solution}</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {d.deliverables.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              <span className="mt-0.5 flex-shrink-0 text-xs font-bold" style={{ color: "#df0089" }}>✅</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* How It Works (automation projects) */}
      {"howItWorks" in d && d.howItWorks && (
        <div>
          <SectionLabel>HOW IT WORKS</SectionLabel>
          <div className="flex flex-col gap-2 mt-2">
            {d.howItWorks.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-extrabold font-heading"
                  style={{ background: "linear-gradient(135deg,#df0089,#641545)", color: "white" }}
                >
                  {i + 1}
                </div>
                <p className="text-sm pt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Before / After */}
      <div>
        <SectionLabel>THE TRANSFORMATION</SectionLabel>
        <div className="mt-3 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(223,0,137,0.12)" }}>
          {/* Header row */}
          <div className="grid grid-cols-3 text-xs font-bold uppercase" style={{ background: "rgba(255,255,255,0.04)" }}>
            <div className="p-3" style={{ color: "rgba(255,255,255,0.5)" }}>Area</div>
            <div className="p-3" style={{ color: "#ff4444", borderLeft: "1px solid rgba(223,0,137,0.1)" }}>❌ Before</div>
            <div className="p-3" style={{ color: "#00c853", borderLeft: "1px solid rgba(223,0,137,0.1)" }}>✅ After</div>
          </div>
          {d.results.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-3 text-sm"
              style={{ borderTop: "1px solid rgba(223,0,137,0.08)" }}
            >
              <div className="p-3 font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>{row.metric}</div>
              <div
                className="p-3"
                style={{
                  background: "rgba(255,68,68,0.05)",
                  borderLeft: "2px solid rgba(255,68,68,0.3)",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                {row.before}
              </div>
              <div
                className="p-3 font-medium"
                style={{
                  background: "rgba(0,200,83,0.05)",
                  borderLeft: "2px solid rgba(0,200,83,0.3)",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                {row.after}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div>
        <SectionLabel>TOOLS & TECH USED</SectionLabel>
        <div className="flex flex-wrap gap-2 mt-3">
          {d.tools.map((tool) => (
            <span
              key={tool}
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(223,0,137,0.08)",
                border: "1px solid rgba(223,0,137,0.25)",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="rounded-xl p-5 text-center flex flex-col gap-3 items-center"
        style={{ background: "rgba(223,0,137,0.06)", border: "1px solid rgba(223,0,137,0.18)" }}
      >
        <p className="font-heading font-bold text-foreground">Want results like this for your business?</p>
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <a
            href="https://cal.com/yasir-bashir-bp4wob/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient text-sm px-5 py-2.5"
          >
            🔥 Book Free AI Audit
          </a>
          <a
            href="https://wa.me/923446012505"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass text-sm px-5 py-2.5"
          >
            💬 Ask About This
          </a>
        </div>
      </div>
    </div>
  );
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#df0089" }}>
    {children}
  </p>
);

/* ─────────────────────────────────────────────────────── */
/*  MAIN PORTFOLIO SECTION                                 */
/* ─────────────────────────────────────────────────────── */

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
    <Section id="portfolio" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="glass-pill mb-6 mx-auto w-fit">
            <span>💼</span>
            <span>Real Work. Real Results.</span>
          </div>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
            Projects That<br />
            <span className="gradient-text">Transformed Businesses</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            Every project below started with a real problem. Every one ended with a system that scaled.
            <br className="hidden sm:block" />
            Filter by what you need most.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 flex-wrap justify-center mb-12">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setOpenProject(null);
                }}
                className="text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg,#df0089,#641545)"
                    : "rgba(255,255,255,0.04)",
                  border: isActive
                    ? "1px solid transparent"
                    : "1px solid rgba(223,0,137,0.18)",
                  color: isActive ? "white" : "rgba(255,255,255,0.6)",
                  boxShadow: isActive ? "0 0 20px rgba(223,0,137,0.35)" : "none",
                  transform: isActive ? "scale(1.04)" : "scale(1)",
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isOpen={openProject === project.id}
              onToggle={() => toggleProject(project.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24" style={{ color: "rgba(255,255,255,0.35)" }}>
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-heading font-bold text-xl">No projects in this category yet.</p>
          </div>
        )}

        {/* Footer CTA */}
        <div
          className="mt-20 rounded-2xl p-10 text-center"
          style={{
            background: "rgba(223,0,137,0.05)",
            border: "1px solid rgba(223,0,137,0.2)",
            backdropFilter: "blur(20px)",
          }}
        >
          <h3 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground mb-3">
            Have a project in mind?
          </h3>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            Let's build something that transforms your business.
          </p>
          <div className="flex items-center gap-4 justify-center flex-wrap">
            <a
              href="https://cal.com/yasir-bashir-bp4wob/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient"
            >
              🔥 Book a Free AI Audit <ArrowRight className="w-4 h-4 btn-icon" />
            </a>
            <a
              href="https://wa.me/923446012505"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass"
            >
              💬 Tell Me Your Project
            </a>
          </div>
          <p className="text-sm mt-6" style={{ color: "rgba(255,255,255,0.3)" }}>
            800+ projects delivered. Yours could be next.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default Portfolio;

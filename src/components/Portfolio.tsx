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
    categories: ["Web Apps", "Logistics", "n8n Automation", "CRM Systems"],
    url: "https://rmgtransport.com",
    emoji: "🚗",
    image: "/portfolio/rmg-transport.png",
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
    categories: ["Web Apps", "Logistics"],
    url: "https://steerlogistics.co",
    emoji: "🚛",
    image: "/portfolio/steer-logistics.png",
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
    id: "dominique-mcclaney",
    title: "Dominique McClaney",
    subtitle: "Personal site + AI chatbot",
    period: "2024",
    categories: ["Web Apps", "AI Chatbots"],
    url: "https://dominiquemcclaney.com",
    emoji: "🤖",
    image: "/portfolio/dominique-mcclaney.png",
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
      liveUrl: "https://dominiquemcclaney.com",
    },
  },
  {
    id: "truckin-link",
    title: "TruckinLink",
    subtitle: "Digital marketing + driver recruitment for trucking",
    period: "2024",
    categories: ["Web Apps", "Logistics", "Social Automation"],
    url: "https://truckinlink.com",
    emoji: "🎯",
    image: "/portfolio/truckin-link.png",
    preview: {
      headline: "All-in-one digital marketing partner for US trucking companies.",
      stats: [
        { value: "10+", label: "Yrs Trucking Niche" },
        { value: "Lower", label: "Cost per Driver" },
        { value: "Multi", label: "Channel Ads" },
      ],
    },
    detail: {
      client: "TruckinLink",
      industry: "Marketing Agency / Trucking",
      location: "USA",
      challenge:
        "TruckinLink helps trucking companies recruit drivers and grow through paid ads + social, but their old site didn't reflect a decade of niche expertise or convert visiting fleet owners into audit bookings. They needed a site that immediately positioned them as the trucking-specific marketing partner.",
      solution:
        "Designed a focused, agency-grade site that leads with the trucking specialism, communicates the driver-recruitment + marketing service stack, and funnels every visitor into a free custom audit.",
      deliverables: [
        "Custom agency-style design with clear trucking positioning",
        "Service breakdown: Google ads, Facebook ads, social management, website dev, recruitment",
        "Driver-hunt funnel: cost-effective driver acquisition story",
        "\"Free custom audit\" lead-magnet flow as primary CTA",
        "Social proof: \"Companies we worked with\" logo wall",
        "Why-us blocks: save time, cost-efficiency, decade of know-how",
        "Mobile-responsive, fast-loading build",
      ],
      results: [
        { metric: "Positioning", before: "Generic marketing agency look", after: "Clearly trucking-specialist" },
        { metric: "Lead capture", before: "Contact form only", after: "Free-audit funnel" },
        { metric: "Trust signal", before: "No client showcase", after: "Logo wall + decade story" },
        { metric: "Service clarity", before: "Mixed services jumble", after: "Clean stack: ads + social + recruit" },
      ],
      tools: ["Custom Web Dev", "Tailwind", "Lead Funnel", "Brand Design"],
      liveUrl: "https://truckinlink.com",
    },
  },
  {
    id: "elevated-financial",
    title: "Elevated Financial",
    subtitle: "Credit repair, business funding & financial planning",
    period: "2024",
    categories: ["Web Apps"],
    url: "https://elevatedfinancialllc.com",
    emoji: "💼",
    image: "/portfolio/elevated-financial.png",
    preview: {
      headline: "Trust-first site for a credit repair + business funding firm.",
      stats: [
        { value: "$1M+", label: "Funding Approved" },
        { value: "4.95★", label: "Client Rating" },
        { value: "3", label: "Service Tracks" },
      ],
    },
    detail: {
      client: "Elevated Financial LLC",
      industry: "Financial Services / Credit Repair / Business Funding",
      location: "USA",
      challenge:
        "Elevated Financial helps businesses and individuals with credit repair, business funding and financial planning — high-trust services where the website has to do most of the credibility work before the first call. The previous setup didn't communicate authority or capture qualified leads.",
      solution:
        "Built a polished navy/blue corporate finance site that leads with results ($1M+ funding approved, 4.95★ rating) and segments services into three clear tracks — Credit Repair, Funding Consulting and Business Planning — each with its own lead path.",
      deliverables: [
        "Premium navy/blue corporate finance design",
        "Hero with proof-led headline + 'Start Credit Repair' CTA",
        "$1M+ funding approved trust block",
        "Three service tracks: Consulting · Planning · Management · Business",
        "Sub-services per track (credit repair plans, funding consulting, debt reduction, growth strategies)",
        "Score-increase feature card + mobile mockup",
        "Apply-for-funding form integrated into the page",
        "Mobile-responsive, fast-loading build",
      ],
      results: [
        { metric: "Brand credibility", before: "Looked like a startup", after: "Premium financial-firm feel" },
        { metric: "Lead capture", before: "Single contact form", after: "Multiple service-specific paths" },
        { metric: "Service clarity", before: "Buried in copy", after: "3 segmented tracks" },
        { metric: "Proof prominence", before: "No trust signals", after: "$1M+ funding + 4.95★ above fold" },
      ],
      tools: ["Custom Web Dev", "Tailwind", "Forms", "Brand Design"],
      liveUrl: "https://elevatedfinancialllc.com",
    },
  },
  {
    id: "fwl-logistics",
    title: "FWL Logistics",
    subtitle: "Freight brokerage website, USA",
    period: "2024",
    categories: ["Web Apps", "Logistics"],
    url: "https://fwllogistics.com",
    emoji: "🚚",
    image: "/portfolio/fwl-logistics.png",
    preview: {
      headline: "Clean, conversion-focused site for a US freight broker.",
      stats: [
        { value: "B2B", label: "Lead Capture" },
        { value: "Fast", label: "Load Times" },
        { value: "Pro", label: "Brand Trust" },
      ],
    },
    detail: {
      client: "FWL Logistics",
      industry: "Freight Brokerage / Logistics",
      location: "USA",
      challenge:
        "FWL needed a professional online presence that positioned them as a serious freight broker, not a directory listing. The previous setup didn't capture shipper or carrier leads and didn't communicate service depth.",
      solution:
        "Designed a corporate B2B site with clear service architecture, equipment coverage, trust signals and dual lead-capture paths for shippers and carriers.",
      deliverables: [
        "Custom corporate B2B design (white / navy / blue palette)",
        "Service breakdown: dry van, flatbed, reefer, specialty",
        "Shipper quote request form",
        "Carrier sign-up flow",
        "About / Coverage / Industries content pages",
        "Mobile-responsive, SEO-friendly build",
      ],
      results: [
        { metric: "Online credibility", before: "Generic / no site", after: "Pro corporate site live" },
        { metric: "Lead capture", before: "None on site", after: "Shipper + carrier forms" },
        { metric: "Service clarity", before: "Unclear offering", after: "Full equipment + lanes" },
        { metric: "Mobile UX", before: "Not mobile-ready", after: "Fully responsive" },
      ],
      tools: ["Custom Web Dev", "Tailwind", "SEO Content", "Forms"],
      liveUrl: "https://fwllogistics.com",
    },
  },
  {
    id: "sfam-logistics",
    title: "SFam Logistics",
    subtitle: "Freight brokerage + admin dashboard",
    period: "2024",
    categories: ["Web Apps", "Logistics", "CRM Systems"],
    url: "https://sfamlogistics.com",
    emoji: "📦",
    image: "/portfolio/sfam-logistics.png",
    preview: {
      headline: "Bold-themed freight brokerage site with a real admin dashboard.",
      stats: [
        { value: "12", label: "Public Pages" },
        { value: "Full", label: "Admin Panel" },
        { value: "Auth", label: "Login System" },
      ],
    },
    detail: {
      client: "SFam Logistics LLC",
      industry: "Freight Brokerage / Logistics",
      location: "USA",
      challenge:
        "SFam wanted to stand out from generic freight broker sites — and needed more than a brochure. They required real operational tooling: quotes, carriers, agents and settings, all managed from one dashboard.",
      solution:
        "Built a bold, colorful, futuristic dark-themed marketing site paired with a complete admin dashboard. Login + signup gate access to internal ops modules so the founders can run the business from one place.",
      deliverables: [
        "12 public pages with bold gradient/glassmorphism design",
        "Auth system: login + signup flows",
        "Admin dashboard: overview, quotes, carriers, agents, settings",
        "Quote intake form on public site",
        "Animated orbs, particle effects, neon accents (approved brand)",
        "Fully responsive, mobile-friendly",
      ],
      results: [
        { metric: "Brand identity", before: "Generic dark template", after: "Distinctive bold futuristic" },
        { metric: "Quote handling", before: "Email back-and-forth", after: "Form → dashboard pipeline" },
        { metric: "Internal ops", before: "Spreadsheets", after: "Centralised admin panel" },
        { metric: "Carrier/agent mgmt", before: "Manual tracking", after: "Dashboard modules" },
      ],
      tools: ["React", "Tailwind", "Auth", "Custom Dashboard", "Framer Motion"],
      liveUrl: "https://sfamlogistics.com",
    },
  },
  {
    id: "earth-logistics",
    title: "Earth Logistics Inc",
    subtitle: "Indiana freight broker, 15-page corporate site",
    period: "2025",
    categories: ["Web Apps", "Logistics"],
    url: "https://earth-logistics-inc.vercel.app",
    emoji: "🌎",
    image: "/portfolio/earth-logistics.png",
    preview: {
      headline: "Professional 15-page freight broker site built for shipper/carrier leads.",
      stats: [
        { value: "15", label: "Pages" },
        { value: "3", label: "Lead Funnels" },
        { value: "24/7", label: "Operation Story" },
      ],
    },
    detail: {
      client: "Earth Logistics Inc (AJ Smith)",
      industry: "Freight Brokerage / Logistics",
      location: "Saint John, Indiana, USA",
      challenge:
        "Earth Logistics is a DOT-authorized freight broker running 24/7 ops, but had no real digital footprint. They needed a B2B corporate site that captures shippers, recruits carriers AND onboards freight agents — across 10+ equipment types including specialty bulk.",
      solution:
        "Designed a clean white/navy/blue corporate site (no dark sci-fi — explicit client requirement). Built 15 pages including dedicated SEO content for every equipment type and three separate lead funnels.",
      deliverables: [
        "Home + About + Services hub + Contact + Coverage + Industries",
        "Service pages: dry van, flatbed, reefer, lowboy, car hauler",
        "Bulk side: end dump, pneumatic, liquid, hopper bottom, hazmat",
        "Quote page with heavy-haul calculator",
        "3 lead funnels: shipper, carrier, freight agent",
        "FMCSA / DOT / TIA trust badges + carrier count signals",
        "Inter / Plus Jakarta Sans typography, real American truck imagery",
      ],
      results: [
        { metric: "Digital presence", before: "None", after: "15-page corporate site" },
        { metric: "Lead paths", before: "Phone only", after: "3 dedicated funnels" },
        { metric: "Service SEO", before: "No equipment pages", after: "10 equipment landing pages" },
        { metric: "Brand positioning", before: "Looked like a startup", after: "Looks like a national broker" },
      ],
      tools: ["React", "Vite", "Tailwind", "Vercel", "SEO Content"],
      liveUrl: "https://earth-logistics-inc.vercel.app",
    },
  },
  {
    id: "arnold-freight",
    title: "Arnold Freight Group",
    subtitle: "Freight brokerage website, USA",
    period: "2024",
    categories: ["Web Apps", "Logistics"],
    url: "https://arnoldfreightgroup.com",
    emoji: "🚛",
    image: "/portfolio/arnold-freight.png",
    preview: {
      headline: "Corporate freight broker site engineered for trust and lead capture.",
      stats: [
        { value: "Pro", label: "B2B Design" },
        { value: "Fast", label: "Lead Forms" },
        { value: "Trust", label: "Signal Stack" },
      ],
    },
    detail: {
      client: "Arnold Freight Group",
      industry: "Freight Brokerage / Logistics",
      location: "USA",
      challenge:
        "Arnold needed an online presence that matched the professionalism of larger national brokers. Without a strong site, shipper RFPs were going to competitors and carrier recruiting was entirely word-of-mouth.",
      solution:
        "Built a corporate B2B site emphasising service breadth, lane coverage and operational reliability — with clear CTAs for both shippers and carriers above the fold.",
      deliverables: [
        "Custom corporate design tied to brand colors",
        "Services + equipment pages with SEO copy",
        "Shipper quote request + carrier sign-up forms",
        "Trust signal stack: experience, lane coverage, compliance",
        "Mobile-first responsive build",
        "On-page SEO for freight-broker keywords",
      ],
      results: [
        { metric: "RFP credibility", before: "Lost vs national brokers", after: "Competes on first impression" },
        { metric: "Carrier sign-ups", before: "Word-of-mouth only", after: "Online onboarding" },
        { metric: "Lead intake", before: "Calls only", after: "Forms + calls" },
        { metric: "Brand polish", before: "DIY look", after: "Agency-grade design" },
      ],
      tools: ["Custom Web Dev", "Tailwind", "SEO Content", "Lead Forms"],
      liveUrl: "https://arnoldfreightgroup.com",
    },
  },
  {
    id: "sc-commercial",
    title: "SC Commercial Concepts",
    subtitle: "Commercial cleaning services website",
    period: "2025",
    categories: ["Web Apps"],
    url: "https://sc-commercialconcepts.com",
    emoji: "🧼",
    image: "/portfolio/sc-commercial.png",
    preview: {
      headline: "Service-first site for a commercial cleaning operator.",
      stats: [
        { value: "Pro", label: "Service Pages" },
        { value: "Fast", label: "Quote Form" },
        { value: "Local", label: "SEO Built-in" },
      ],
    },
    detail: {
      client: "SC Commercial Concepts",
      industry: "Commercial Cleaning Services",
      location: "USA",
      challenge:
        "SC needed a credible online presence to win commercial cleaning contracts — office buildings, retail, post-construction. The previous site couldn't communicate service depth or capture leads from facility managers.",
      solution:
        "Built a service-first website with clear segmentation by client type, fast quote intake and local-SEO structure so the right contracts find them.",
      deliverables: [
        "Service breakdown: office, retail, post-construction, recurring",
        "Quote request form (clean, no friction)",
        "About / Process / Service Areas pages",
        "Trust elements: insurance, references, before/after",
        "Mobile-responsive, fast loading",
        "Local-SEO friendly URL + meta structure",
      ],
      results: [
        { metric: "Lead intake", before: "Phone only", after: "Online quote form" },
        { metric: "Service clarity", before: "Generic 'we clean'", after: "Segmented by client type" },
        { metric: "Online presence", before: "Outdated site", after: "Modern, conversion-built" },
        { metric: "Mobile experience", before: "Broken", after: "Fully responsive" },
      ],
      tools: ["Custom Web Dev", "Tailwind", "Local SEO", "Quote Form"],
      liveUrl: "https://sc-commercialconcepts.com",
    },
  },
  {
    id: "sublime-pathways",
    title: "Sublime Pathways",
    subtitle: "Wellness, yoga & care center site",
    period: "2024",
    categories: ["Web Apps"],
    url: "https://sublimepathways.com",
    emoji: "🧘",
    image: "/portfolio/sublime-pathways.png",
    preview: {
      headline: "Calm, premium presence for a wellness & yoga practice.",
      stats: [
        { value: "Calm", label: "Brand Feel" },
        { value: "Easy", label: "Booking UX" },
        { value: "Pro", label: "Practitioner Story" },
      ],
    },
    detail: {
      client: "Sublime Pathways",
      industry: "Wellness / Yoga / Holistic Care",
      location: "USA",
      challenge:
        "Sublime Pathways needed a digital home that felt as grounded as the in-person experience. The site had to communicate practitioner credibility, services, and let clients book or enquire without friction.",
      solution:
        "Designed a soft, premium-feeling site with gentle typography and generous whitespace, paired with clear service descriptions and a simple booking/contact pathway.",
      deliverables: [
        "Custom calm aesthetic (soft palette, serif headlines)",
        "Services & offerings pages",
        "Practitioner / about story",
        "Booking + contact flow",
        "Testimonials and trust elements",
        "Mobile-responsive, fast performance",
      ],
      results: [
        { metric: "Brand experience", before: "Generic wellness template", after: "Distinct, premium feel" },
        { metric: "Service clarity", before: "Hard to navigate", after: "Clean offering pages" },
        { metric: "Booking experience", before: "Email-only", after: "Streamlined contact flow" },
        { metric: "Mobile UX", before: "Clunky", after: "Polished, responsive" },
      ],
      tools: ["Custom Web Dev", "Tailwind", "Booking Integration", "Brand Design"],
      liveUrl: "https://sublimepathways.com",
    },
  },
  {
    id: "love-care-retreat",
    title: "Love & Care Retreat",
    subtitle: "Bilingual healing retreat (EN / RO)",
    period: "2025",
    categories: ["Web Apps"],
    url: "https://loveandcareretreat.com",
    emoji: "🌸",
    image: "/portfolio/love-care-retreat.png",
    preview: {
      headline: "Feminine, bilingual site for a healing & retreat practitioner.",
      stats: [
        { value: "EN/RO", label: "Bilingual" },
        { value: "5", label: "Pages" },
        { value: "PDF", label: "Freebie Funnel" },
      ],
    },
    detail: {
      client: "Daniela — Love & Care Retreat",
      industry: "Healing / Retreats / Coaching",
      location: "Romania → International",
      challenge:
        "Daniela's previous site was too plain for the depth of work she offers. She needed a feminine, advanced, creative presence — and it had to work for both her English-speaking and Romanian audiences without feeling like two different sites.",
      solution:
        "Rebuilt the site from scratch with an EN/RO language switcher, asymmetric feminine layouts, Instagram-style story sections, a freebie PDF lead funnel and contact form — all under one cohesive brand.",
      deliverables: [
        "5-page site: Home · About · Offerings · Freebie · Contact",
        "EN / RO bilingual with header switcher (react-i18next)",
        "Feminine palette: cream / blush / champagne gold / sage",
        "Fraunces serif + DM Sans body typography",
        "Two Instagram-style story sections",
        "Freebie PDF lead-magnet funnel",
        "Formspree-powered contact form",
        "Framer Motion micro-interactions",
      ],
      results: [
        { metric: "Brand feel", before: "Plain & minimal", after: "Feminine, creative, premium" },
        { metric: "Audience reach", before: "Single language", after: "EN + RO covered" },
        { metric: "Lead capture", before: "None", after: "Freebie PDF funnel + contact" },
        { metric: "Mobile UX", before: "Basic", after: "Asymmetric, animated, responsive" },
      ],
      tools: ["React 19", "TypeScript", "Vite", "Tailwind", "Framer Motion", "react-i18next", "Formspree"],
      liveUrl: "https://loveandcareretreat.com",
    },
  },
];

/* ─────────────────────────────────────────────────────── */

const FILTERS = [
  "All Projects",
  "Web Apps",
  "Logistics",
  "n8n Automation",
  "AI Chatbots",
  "GoHighLevel",
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

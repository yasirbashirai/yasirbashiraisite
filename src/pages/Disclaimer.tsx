import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AlertTriangle, Info, ShieldAlert, FileWarning } from "lucide-react";

const sections = [
  {
    icon: ShieldAlert,
    title: "No Guarantee on Results",
    content: `All pricing, service packages, projected outcomes, ROI estimates, and performance metrics displayed on this website are for illustrative purposes only. Yasir Bashir and his team make no representations or warranties — express or implied — that any client will achieve the same, similar, or any results whatsoever. Business outcomes depend on numerous factors outside our control, including but not limited to market conditions, client implementation, industry, and team capacity. Past client results do not guarantee future performance.`,
  },
  {
    icon: AlertTriangle,
    title: "Pricing Is Subject to Change",
    content: `All pricing displayed on this website is indicative and may change without notice. Final pricing for any service engagement is determined after a discovery call and scoping session. Any price listed should not be treated as a formal quote, binding offer, or contract. Actual project pricing may vary based on complexity, timeline, integrations required, and scope.`,
  },
  {
    icon: FileWarning,
    title: "Do Not Share Critical or Sensitive Data",
    content: `This website is a marketing and lead generation platform. It is NOT a secure data portal. Do not submit, share, upload, or transmit any of the following through this website or its contact forms: personally identifiable information (PII) beyond basic contact details, financial account numbers, banking credentials, medical or health records, government-issued ID numbers, confidential business trade secrets, passwords or access credentials, or any information classified as sensitive under applicable laws (GDPR, HIPAA, etc.). Any information submitted via forms on this site is used solely for communication and project scoping purposes.`,
  },
  {
    icon: Info,
    title: "General Information Only",
    content: `All content on this website — including blog posts, case studies, service descriptions, tool recommendations, and automation frameworks — is provided for general informational purposes only. Nothing on this website constitutes professional legal, financial, medical, or regulatory advice. You should consult qualified professionals before making business decisions based on information found here. Yasir Bashir is not liable for any decisions made based on content presented on this website.`,
  },
];

const Disclaimer = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <main className="container mx-auto px-4 pt-32 pb-20 max-w-3xl">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sm font-semibold text-primary border border-primary/20 mb-6">
          <ShieldAlert size={14} /> Legal Disclaimer
        </span>
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl mb-4">
          Disclaimer &amp; <span className="gradient-text">Terms of Use</span>
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Please read this disclaimer carefully before using this website, engaging any services,
          or acting on any information presented here. Last updated: February 2026.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((s) => (
          <div key={s.title} className="glass-card rounded-2xl p-7 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                <s.icon size={18} className="text-primary-foreground" />
              </div>
              <h2 className="font-heading font-bold text-xl text-foreground">{s.title}</h2>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.content}</p>
          </div>
        ))}

        {/* Acceptance */}
        <div className="glass-card rounded-2xl p-7 border border-primary/20 bg-primary/5">
          <h2 className="font-heading font-bold text-lg text-foreground mb-3">
            Acceptance of These Terms
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            By accessing and using this website, you acknowledge that you have read, understood,
            and agree to this disclaimer in its entirety. If you do not agree, please do not use
            this website or engage any services offered herein. For questions, contact{" "}
            <a
              href="mailto:yasirbashirai@gmail.com"
              className="text-primary font-semibold hover:underline"
            >
              yasirbashirai@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Disclaimer;

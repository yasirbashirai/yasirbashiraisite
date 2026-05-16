import Section from "./Section";

const row1 = [
  "n8n", "GoHighLevel", "Make", "Zapier", "OpenAI", "ChatGPT", "Claude AI",
  "Midjourney", "ElevenLabs", "HeyGen", "WordPress", "Shopify", "Webflow",
];
const row2 = [
  "Stripe", "Notion", "Airtable", "Google Workspace", "Meta Ads", "LinkedIn Ads",
  "ActiveCampaign", "Mailchimp", "Calendly", "Typeform", "WhatsApp API", "Slack",
];

const ToolPill = ({ name }: { name: string }) => (
  <div className="glass-pill whitespace-nowrap text-sm font-heading font-semibold shrink-0">
    {name}
  </div>
);

const ToolCarousel = () => (
  <Section id="tools" className="py-20 px-4">
    <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground text-center mb-12">
      The Tools & Systems I Master <span className="gradient-text">For Your Growth</span>
    </h2>

    <div className="marquee-container mb-4 marquee-left">
      <div className="marquee-track">
        {[...row1, ...row1].map((t, i) => (
          <ToolPill key={`l-${i}`} name={t} />
        ))}
      </div>
    </div>

    <div className="marquee-container marquee-right">
      <div className="marquee-track">
        {[...row2, ...row2].map((t, i) => (
          <ToolPill key={`r-${i}`} name={t} />
        ))}
      </div>
    </div>
  </Section>
);

export default ToolCarousel;

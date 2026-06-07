import type { CertificateItem, CtaContent, PublicPageContent, ResourceItem, ValueItem } from "@/features/company-profile/types";

export const whyUsItems: ValueItem[] = [
  {
    title: "Integrated planning logic",
    description: "Land, buildings, logistics, and business support are presented as one coordinated system.",
    items: ["Clear cluster hierarchy", "Purpose-built product mix", "Expandable estate logic"],
    tone: "gold",
  },
  {
    title: "Operational practicality",
    description: "The district story prioritizes circulation, support infrastructure, and phased delivery readiness.",
    items: ["Road and yard sequencing", "Utility backbone clarity", "Tenant-readiness framing"],
    tone: "teal",
  },
  {
    title: "Public-facing confidence",
    description: "A stronger landing experience helps investors and partners understand the estate before deeper discussions.",
    items: ["Structured homepage flow", "Consistent detail pages", "Reusable narrative system"],
    tone: "copper",
  },
];

export const operationsSupportItems: ValueItem[] = [
  {
    title: "Infrastructure benefits",
    description: "Utility, access, and internal movement systems are explained as scalable operational assets.",
    tone: "slate",
  },
  {
    title: "Location and access benefits",
    description: "Dummy location copy highlights corridor access, workforce reach, and partner ecosystem proximity.",
    tone: "gold",
  },
  {
    title: "Operational support benefits",
    description: "The district includes room for logistics, services, and day-to-day business support functions.",
    tone: "teal",
  },
];

export const resourceItems: ResourceItem[] = [
  {
    title: "Brochure",
    description: "A concise overview of positioning, product mix, and development priorities.",
    href: "/contact",
    meta: "PDF placeholder",
    tone: "gold",
  },
  {
    title: "Investor Guide",
    description: "A sanitized guide to estate structure, district logic, and stakeholder touchpoints.",
    href: "/about",
    meta: "Guide placeholder",
    tone: "slate",
  },
  {
    title: "FAQ",
    description: "Common public questions about products, phasing, and support services.",
    href: "/why-us",
    meta: "Knowledge base",
    tone: "teal",
  },
  {
    title: "Regulation",
    description: "Dummy compliance references and framework notes for demo purposes.",
    href: "/compliance",
    meta: "Reference pack",
    tone: "copper",
  },
  {
    title: "Media Kit",
    description: "Brand-neutral visual assets, placeholder statements, and public use notes.",
    href: "/news",
    meta: "Media pack",
    tone: "emerald",
  },
];

export const complianceFramework: ValueItem[] = [
  {
    title: "Operating framework",
    description: "A generic framework covering site governance, tenant onboarding, and operational coordination.",
    items: ["Entry review", "Site conduct", "Operational reporting"],
    tone: "slate",
  },
  {
    title: "Policy stack",
    description: "Public-facing summaries for ethics, health and safety, and environmental discipline.",
    items: ["Ethics and conduct", "Health and safety", "Environmental management"],
    tone: "gold",
  },
  {
    title: "Assurance cycle",
    description: "Dummy audit, review, and corrective-action rhythm designed for long-horizon reliability.",
    items: ["Periodic review", "Risk logging", "Continuous improvement"],
    tone: "teal",
  },
];

export const sustainabilityItems: ValueItem[] = [
  {
    title: "Water stewardship",
    description: "Illustrative reuse, treatment, and network efficiency initiatives.",
    tone: "teal",
  },
  {
    title: "Energy transition",
    description: "Dummy actions for monitoring, efficiency upgrades, and lower-intensity operations support.",
    tone: "gold",
  },
  {
    title: "Community alignment",
    description: "A generic approach to workforce facilities, mobility, and local business participation.",
    tone: "emerald",
  },
];

export const certificateItems: CertificateItem[] = [
  {
    title: "Operational Readiness Note",
    description: "Illustrative certification card for infrastructure and site preparedness.",
    tone: "slate",
  },
  {
    title: "Environmental Practice Note",
    description: "Illustrative certification card for water, waste, and monitoring practices.",
    tone: "emerald",
  },
  {
    title: "Safety System Note",
    description: "Illustrative certification card for coordinated site safety processes.",
    tone: "gold",
  },
];

const sharedContactCta: CtaContent = {
  eyebrow: "Connect",
  title: "Start the next conversation from the public profile, then move deeper only where the demo needs it.",
  description:
    "Every CTA stays internal to the MVP and keeps the public experience separate from the protected portal system.",
  actions: [
    { label: "Contact us", href: "/contact", variant: "primary" },
    { label: "Review products", href: "/products", variant: "secondary" },
  ],
};

export const publicPageContent: Record<
  "about" | "whyUs" | "products" | "development" | "portfolio" | "resources" | "compliance" | "news" | "contact",
  PublicPageContent
> = {
  about: {
    metadata: {
      title: "About",
      description: "Generic company overview, values, and milestone story for the public profile demo.",
    },
    hero: {
      eyebrow: "About",
      title: "A structured district identity built for public confidence and operational credibility.",
      description:
        "This page expands the homepage overview into company positioning, mission logic, values, and a simple milestone narrative.",
      stats: [
        { label: "Planning Tracks", value: "4" },
        { label: "Core Values", value: "5" },
        { label: "Milestones", value: "4" },
      ],
    },
    intro: {
      eyebrow: "Overview",
      title: "A narrative system designed for industrial, commercial, and community layers.",
      description:
        "The public story explains how development, operations, and partner engagement fit together without exposing any real-world sensitive material.",
    },
    values: [
      {
        title: "Vision",
        description: "Build a district known for structured growth, resilient operations, and a credible public-facing identity.",
        tone: "gold",
      },
      {
        title: "Mission",
        description: "Coordinate land, buildings, logistics, and support services into one coherent estate proposition.",
        tone: "slate",
      },
      {
        title: "Values",
        description: "Clarity, operational discipline, adaptability, long-range stewardship, and partner trust.",
        tone: "emerald",
      },
    ],
    cta: sharedContactCta,
  },
  whyUs: {
    metadata: {
      title: "Why Us",
      description: "Generic advantage page for an industrial district public profile demo.",
    },
    hero: {
      eyebrow: "Why Us",
      title: "The value proposition is built around planning clarity, not marketing noise.",
      description:
        "This page extends the hero promise into district advantages, access logic, infrastructure readiness, and operational support benefits.",
      stats: [
        { label: "Advantage Themes", value: "3" },
        { label: "Support Layers", value: "3" },
      ],
    },
    intro: {
      title: "A stronger answer to why this estate exists, how it performs, and where it creates leverage.",
      description:
        "The focus is on coherent decision support: why the district is structured this way and what practical benefits that creates for occupiers and partners.",
    },
    values: whyUsItems,
    cta: {
      eyebrow: "Next move",
      title: "Compare the district advantages with the product mix and get a direct public contact route.",
      description: "The next step should either clarify fit or open a conversation.",
      actions: [
        { label: "View products", href: "/products", variant: "primary" },
        { label: "Contact us", href: "/contact", variant: "secondary" },
      ],
    },
  },
  products: {
    metadata: {
      title: "Products",
      description: "Product detail page for industrial land, buildings, commercial area, warehouse, and residential offerings.",
    },
    hero: {
      eyebrow: "Products",
      title: "Five product layers organized to mirror the mega menu and homepage card structure.",
      description:
        "Each section deepens the public explanation while staying generic, internal, and fully sanitized.",
      stats: [
        { label: "Product Types", value: "5" },
        { label: "Anchor Sections", value: "5" },
      ],
    },
    cta: sharedContactCta,
  },
  development: {
    metadata: {
      title: "Development",
      description: "Development clusters, masterplan logic, and milestone timeline for the public profile demo.",
    },
    hero: {
      eyebrow: "Development",
      title: "Development is framed as a sequence of readable decisions, not abstract phases.",
      description:
        "This page expands the masterplan section with clusters, sequence logic, infrastructure priorities, and a more detailed milestone story.",
      stats: [
        { label: "Clusters", value: "3" },
        { label: "Milestones", value: "4" },
      ],
    },
    intro: {
      title: "Phasing, cluster hierarchy, and infrastructure logic are presented in a business-readable way.",
      description:
        "The goal is to show momentum and structure without relying on any original video embeds or sensitive technical detail.",
    },
    values: [],
    cta: {
      eyebrow: "Portfolio link",
      title: "Move from planning logic into sample project evidence and ecosystem context.",
      description: "Development gains credibility when the portfolio demonstrates how similar ideas are delivered.",
      actions: [
        { label: "Open portfolio", href: "/portfolio", variant: "primary" },
        { label: "Contact us", href: "/contact", variant: "secondary" },
      ],
    },
  },
  portfolio: {
    metadata: {
      title: "Portfolio",
      description: "Sample portfolio, ecosystem partners, and impact summary for the public profile demo.",
    },
    hero: {
      eyebrow: "Portfolio",
      title: "Project snapshots and ecosystem cards turn positioning into visible proof points.",
      description:
        "This page replaces the old placeholder with richer cards, partner context, and an impact layer connected to the estate story.",
      stats: [
        { label: "Projects", value: "3" },
        { label: "Partner Groups", value: "3" },
      ],
    },
    intro: {
      title: "A portfolio layer helps the district story feel grounded in delivery patterns and partner capability.",
      description:
        "Even with dummy content, the page needs enough structure to support a credible demo walkthrough.",
    },
    values: [],
    cta: sharedContactCta,
  },
  resources: {
    metadata: {
      title: "Resources",
      description: "Resource center page with generic brochures, guides, FAQ, regulation notes, and media kit links.",
    },
    hero: {
      eyebrow: "Resources",
      title: "A lightweight resource center gives the public profile more depth than a single brochure link.",
      description:
        "This page groups generic documents and information packs into a simple internal-only resource hub.",
    },
    resources: resourceItems,
    cta: sharedContactCta,
  },
  compliance: {
    metadata: {
      title: "Compliance",
      description: "Compliance, sustainability, and certificate placeholder content for the public profile demo.",
    },
    hero: {
      eyebrow: "Compliance",
      title: "Governance and sustainability are presented as part of operational maturity, not a detached appendix.",
      description:
        "The page combines framework cards, policy summaries, sustainability themes, and certificate placeholders.",
    },
    values: complianceFramework,
    certificates: certificateItems,
    cta: sharedContactCta,
  },
  news: {
    metadata: {
      title: "News",
      description: "Generic news listing page with a featured article and supporting cards.",
    },
    hero: {
      eyebrow: "News",
      title: "A fuller news page extends the homepage grid into a more complete public-facing newsroom.",
      description:
        "Featured and supporting articles stay generic, internal, and aligned with the estate narrative.",
    },
    featuredNewsSlug: "district-launches-new-logistics-corridor-preview",
    cta: sharedContactCta,
  },
  contact: {
    metadata: {
      title: "Contact",
      description: "Public contact page with local-only form UI and placeholder office information.",
    },
    hero: {
      eyebrow: "Contact",
      title: "A direct public contact route closes the loop without needing backend integration.",
      description:
        "The form is intentionally local-only, supported by placeholder office information and a map-style media block.",
    },
    cta: {
      eyebrow: "Continue exploring",
      title: "If the conversation is not ready yet, the product and development pages provide the next level of detail.",
      description: "This keeps the public flow self-contained and easy to demo.",
      actions: [
        { label: "Review development", href: "/development", variant: "secondary" },
        { label: "Browse products", href: "/products", variant: "primary" },
      ],
    },
  },
};

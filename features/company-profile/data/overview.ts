import type {
  AboutContent,
  AwardItem,
  CtaContent,
  HighlightVideoContent,
  HomeHeroContent,
  MasterplanContent,
  MilestoneItem,
  TestimonialItem,
  ValueItem,
} from "@/features/company-profile/types";

export const homeHeroContent: HomeHeroContent = {
  eyebrow: "Integrated industrial district",
  title: "A structured destination for growth, operations, and long-horizon investment.",
  description:
    "Northstar Industrial District presents a sanitized company profile demo with a strong public landing flow, estate positioning, and portfolio-ready storytelling.",
  primaryAction: {
    label: "Explore why us",
    href: "/why-us",
    variant: "primary",
  },
  secondaryAction: {
    label: "View portfolio",
    href: "/portfolio",
    variant: "secondary",
  },
  slides: [
    {
      title: "Gateway access and estate frontage",
      caption: "Public-facing arrival, business identity, and district visibility.",
      tone: "gold",
    },
    {
      title: "Warehouse and service-yard network",
      caption: "Operational movement, sequencing, and scalable logistics support.",
      tone: "teal",
    },
    {
      title: "Commercial and workplace ecosystem",
      caption: "A balanced estate with room for business support and community life.",
      tone: "copper",
    },
  ],
  stats: [
    { label: "Managed Area", value: "1,680 ha", note: "Illustrative district footprint" },
    { label: "Business Partners", value: "64", note: "Sample occupier and delivery network" },
    { label: "Development Zones", value: "9", note: "Structured clusters and support programs" },
    { label: "Workforce Capacity", value: "26,000+", note: "Projected mixed-estate workforce" },
    { label: "Recognition", value: "18", note: "Illustrative industry and planning citations" },
  ],
};

export const aboutContent: AboutContent = {
  eyebrow: "About the district",
  title: "A public-facing estate narrative built around clarity, logistics logic, and business readiness.",
  description:
    "The rebuilt homepage keeps the strong section order of the target structure while replacing every original brand signal with a clean, generic industrial estate story.",
  supportingText:
    "This positioning layer emphasizes long-term planning, business support, and a more intentional urban-industrial ecosystem for tenants, operators, and visiting stakeholders.",
  logos: [
    {
      label: "Planning Studio",
      description: "Masterplan logic and phased district layout.",
      tone: "gold",
    },
    {
      label: "Utilities Program",
      description: "Service backbone and operational resilience.",
      tone: "slate",
    },
    {
      label: "Investor Desk",
      description: "Public-facing engagement and opportunity framing.",
      tone: "emerald",
    },
  ],
};

export const awardItems: AwardItem[] = [
  {
    title: "Regional Planning Citation",
    subtitle: "Estate Strategy Recognition",
    description: "Recognized for coordinated land-use planning and investment communication quality.",
    tone: "gold",
  },
  {
    title: "Operational Readiness Mention",
    subtitle: "Infrastructure Preview Program",
    description: "Highlighted for clearly staged utility and circulation planning across multiple clusters.",
    tone: "slate",
  },
  {
    title: "Sustainability Showcase",
    subtitle: "Practical ESG Program",
    description: "Acknowledged for integrating workforce, utilities, and environmental priorities into the estate story.",
    tone: "emerald",
  },
  {
    title: "Commercial Design Commendation",
    subtitle: "Business Core Experience",
    description: "Noted for a balanced mix of arrival experience, support services, and public-facing identity.",
    tone: "copper",
  },
];

export const testimonialItems: TestimonialItem[] = [
  {
    quote:
      "The estate story is easy to understand because every section builds from location value to operational detail without losing business clarity.",
    name: "Alicia Mercer",
    role: "Investment Strategy Lead",
    company: "Meridian Capital Partners",
    tone: "gold",
  },
  {
    quote:
      "What stands out is the balance between heavy operations and public-facing polish. It feels engineered, not decorative.",
    name: "Daniel Reeve",
    role: "Regional Logistics Director",
    company: "Axis Freight Network",
    tone: "teal",
  },
  {
    quote:
      "The product breakdown makes it much easier to imagine how land, buildings, warehousing, and support amenities fit together in one district.",
    name: "Maya Holloway",
    role: "Industrial Advisory Principal",
    company: "Northbank Advisory",
    tone: "slate",
  },
  {
    quote:
      "For a demo MVP, the site already tells a coherent procurement and development story without needing any real-world sensitive data.",
    name: "Rafael Quinn",
    role: "Program Delivery Consultant",
    company: "Studio Forge",
    tone: "copper",
  },
];

export const masterplanContent: MasterplanContent = {
  eyebrow: "Development framework",
  title: "Masterplanning is presented as a phased operating system, not just a map.",
  description:
    "The section mirrors the original two-column structure with sanitized copy, a placeholder media card, and a clearer explanation of how clusters, access, and utilities align over time.",
  bullets: [
    "Cluster sequencing is tied to access, utilities, and market-facing readiness.",
    "Core infrastructure is framed as a reusable backbone for multiple product types.",
    "Operational movement and public-facing arrival are planned as separate but connected systems.",
  ],
  cta: {
    label: "See development details",
    href: "/development",
  },
  mediaLabel: "Masterplan preview",
  mediaCaption: "Placeholder media replacing the original embedded progress video.",
  tone: "slate",
};

export const highlightVideoContent: HighlightVideoContent = {
  eyebrow: "District highlight",
  title: "A cinematic welcome section rebuilt as a polished, script-free placeholder experience.",
  description:
    "This band preserves the feel of a welcome video section with a strong overlay, prominent play affordance, and a short positioning statement.",
  action: {
    label: "Open contact page",
    href: "/contact",
  },
  mediaLabel: "Highlight reel placeholder",
  tone: "copper",
};

export const homeCtaContent: CtaContent = {
  eyebrow: "Next step",
  title: "Continue from public narrative into project discussions, portfolio review, or the MVP tender flow.",
  description:
    "The public landing closes with internal links only, keeping the demo narrative coherent without touching the protected portal routes.",
  actions: [
    {
      label: "Contact the team",
      href: "/contact",
      variant: "primary",
    },
    {
      label: "Browse portfolio",
      href: "/portfolio",
      variant: "secondary",
    },
    {
      label: "View tender guest",
      href: "/tender/guest",
      variant: "secondary",
    },
  ],
};

export const aboutTimelineItems: MilestoneItem[] = [
  {
    time: "2022-02-14",
    title: "Concept framework prepared",
    description: "The district narrative was shaped around phased growth, business support, and logistics clarity.",
    tone: "accent",
  },
  {
    time: "2023-06-09",
    title: "Cluster strategy aligned",
    description: "Planning scenarios grouped industrial, warehouse, and commercial uses into expandable delivery zones.",
    tone: "success",
  },
  {
    time: "2024-08-21",
    title: "Public positioning refined",
    description: "Investor messaging, support ecosystem language, and estate hierarchy were simplified for external audiences.",
    tone: "warning",
  },
  {
    time: "2026-01-16",
    title: "MVP company profile launched",
    description: "The sanitized public website became the primary demo landing for the broader procurement MVP.",
    tone: "accent",
  },
];

export const developmentTimelineItems: MilestoneItem[] = [
  {
    time: "2025-04-11",
    title: "Infrastructure backbone package",
    description: "Road access, drainage, and utilities planning enters coordinated delivery preparation.",
    tone: "accent",
  },
  {
    time: "2025-09-02",
    title: "Commercial core readiness",
    description: "Arrival, client-facing amenities, and support frontage are detailed for phased rollout.",
    tone: "success",
  },
  {
    time: "2026-02-18",
    title: "Warehouse cluster alignment",
    description: "Support yards, logistics lanes, and handling zones move into the next planning gate.",
    tone: "warning",
  },
  {
    time: "2026-06-01",
    title: "Residential support program",
    description: "Workforce-oriented living and amenity layers are synchronized with district operations goals.",
    tone: "neutral",
  },
];

export const developmentClusters: ValueItem[] = [
  {
    title: "North Access Cluster",
    description: "Focused on arrival sequence, frontage quality, and external business visibility.",
    items: ["Business gateway", "Visitor orientation", "Commercial frontage"],
    tone: "gold",
  },
  {
    title: "Utility Spine Cluster",
    description: "Organized around dependable service infrastructure and scalable industrial support.",
    items: ["Power and water readiness", "Service corridors", "Phased backbone delivery"],
    tone: "slate",
  },
  {
    title: "Logistics Yard Cluster",
    description: "Dedicated to warehouse efficiency, truck circulation, and distribution support.",
    items: ["Support yards", "Buffer inventory", "Route separation"],
    tone: "teal",
  },
];

export const portfolioProjects: ValueItem[] = [
  {
    title: "Gateway Operations Center",
    description: "A sample project showing how public arrival, control, and logistics screening can be packaged into one delivery story.",
    items: ["Access control", "Visitor experience", "Operations visibility"],
    tone: "gold",
  },
  {
    title: "Multi-Use Business Block",
    description: "Illustrates the crossover between commercial support, office demand, and estate-scale branding moments.",
    items: ["Meeting suites", "Retail support", "Flexible business frontage"],
    tone: "copper",
  },
  {
    title: "Fulfillment Yard Expansion",
    description: "Demonstrates warehouse growth planning with circulation logic and operational phasing.",
    items: ["Truck staging", "Shared loading", "Future-ready storage"],
    tone: "teal",
  },
];

export const partnerEcosystem: ValueItem[] = [
  {
    title: "Planning and advisory partners",
    description: "Dummy ecosystem entries representing consultants, estate strategists, and project enablers.",
    tone: "slate",
  },
  {
    title: "Logistics and operations partners",
    description: "Dummy entries for yard management, transport coordination, and warehouse support services.",
    tone: "teal",
  },
  {
    title: "Commercial and community partners",
    description: "Dummy entries for workplace amenities, business support, and neighborhood services.",
    tone: "emerald",
  },
];

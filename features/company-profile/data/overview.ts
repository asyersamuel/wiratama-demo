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
  eyebrow: "Future-ready industrial estate",
  title: "A strategic business destination built for industry, logistics, and long-term growth.",
  description:
    "Nusantara Industrial Estate presents a public-facing district story with a large visual hero, structured product mix, and a cleaner investment narrative.",
  primaryAction: {
    label: "Explore Why Us",
    href: "/why-us",
    variant: "primary",
  },
  secondaryAction: {
    label: "View Portfolio",
    href: "/portfolio",
    variant: "secondary",
  },
  slides: [
    {
      title: "Gateway boulevard and arrival sequence",
      caption: "Public-facing frontage for business identity and visitor arrival.",
      tone: "gold",
    },
    {
      title: "Logistics yards and support circulation",
      caption: "Back-of-house operations planned for safe, efficient movement.",
      tone: "teal",
    },
    {
      title: "Commercial core and workplace ecosystem",
      caption: "A mixed-use center that supports daily estate activity.",
      tone: "slate",
    },
  ],
  stats: [
    { label: "Managed Area", value: "4,800+", note: "Illustrative hectares under phased planning" },
    { label: "Business Partners", value: "120+", note: "Sample tenants and ecosystem operators" },
    { label: "Development Zones", value: "8", note: "Industrial, logistics, support, and mixed-use clusters" },
    { label: "Workforce Capacity", value: "25K+", note: "Projected workforce capacity across district programs" },
    { label: "Recognition Milestones", value: "30+", note: "Illustrative planning, delivery, and community citations" },
  ],
};

export const aboutContent: AboutContent = {
  eyebrow: "About the estate",
  title: "A modern business district designed around infrastructure clarity and long-range operational readiness.",
  description:
    "The homepage rebuild follows the target section hierarchy while replacing every original brand signal with a generic estate story built around planning logic, access, and growth.",
  supportingText:
    "This public profile emphasizes phased development, business support services, and a more intentional relationship between industrial, commercial, logistics, and residential zones.",
  logos: [
    {
      label: "Planning Office",
      description: "Masterplan and zoning logic for a multi-cluster estate.",
      tone: "gold",
    },
    {
      label: "Utility Network",
      description: "Reliable service corridors for long-horizon business operations.",
      tone: "slate",
    },
    {
      label: "Investor Relations",
      description: "Public-facing communication for growth and opportunity mapping.",
      tone: "emerald",
    },
  ],
};

export const awardItems: AwardItem[] = [
  {
    title: "Regional Infrastructure Recognition",
    subtitle: "Planning Excellence",
    description: "Acknowledged for clear district sequencing, circulation logic, and public-facing delivery structure.",
    tone: "gold",
  },
  {
    title: "Sustainable Development Milestone",
    subtitle: "Operations Program",
    description: "Recognized for integrating utilities, landscape systems, and practical stewardship into estate planning.",
    tone: "emerald",
  },
  {
    title: "Digital Operations Excellence",
    subtitle: "Business Systems",
    description: "Highlighted for a more legible approach to estate operations, support services, and business-readiness storytelling.",
    tone: "slate",
  },
  {
    title: "Community Impact Program",
    subtitle: "District Engagement",
    description: "Commended for pairing business growth with workforce support and local service participation.",
    tone: "copper",
  },
  {
    title: "Business Growth Recognition",
    subtitle: "Investment Narrative",
    description: "Noted for presenting industrial, commercial, and logistics opportunities as one coherent public offer.",
    tone: "teal",
  },
];

export const testimonialItems: TestimonialItem[] = [
  {
    quote:
      "The district story feels disciplined. Each section explains a business purpose instead of relying on decorative claims.",
    name: "Ari Putra",
    role: "Operations Director",
    company: "Meridian Manufacturing Group",
    tone: "gold",
  },
  {
    quote:
      "The product mix is much easier to understand because land, buildings, warehousing, and support spaces are presented in a clear order.",
    name: "Maya Santoso",
    role: "Investment Lead",
    company: "Archipelago Capital Advisory",
    tone: "slate",
  },
  {
    quote:
      "It reads like an estate built for movement and scale, not just a brochure. That is the right signal for serious operators.",
    name: "Daniel Hartono",
    role: "Supply Chain Partner",
    company: "Transit Axis Network",
    tone: "teal",
  },
  {
    quote:
      "The homepage gives enough confidence to continue into development, portfolio, and contact routes without feeling unfinished.",
    name: "Clara Wijaya",
    role: "Development Consultant",
    company: "Studio Grid Advisory",
    tone: "copper",
  },
];

export const masterplanContent: MasterplanContent = {
  eyebrow: "Masterplan",
  title: "A phased development framework that connects land use, logistics, and utility readiness.",
  description:
    "This section mirrors the target two-column masterplan block with stronger explanatory copy on how access, clusters, and infrastructure are sequenced over time.",
  bullets: [
    "Primary access, utilities, and logistics movement are planned as a single delivery backbone.",
    "Development zones can expand in phases without breaking the estate's circulation logic.",
    "Public-facing areas and heavy operations are connected, but intentionally separated in use.",
  ],
  cta: {
    label: "See Development",
    href: "/development",
  },
  mediaLabel: "Masterplan preview",
  mediaCaption: "A placeholder video card replaces the original embedded progress media.",
  tone: "slate",
};

export const highlightVideoContent: HighlightVideoContent = {
  eyebrow: "Welcome",
  title: "Welcome to a future-ready business district",
  description:
    "A large highlight band preserves the feel of a welcome-video moment with a strong overlay, centered play button, and a short positioning statement.",
  action: {
    label: "Contact the Team",
    href: "/contact",
  },
  mediaLabel: "District highlight reel",
  tone: "copper",
};

export const homeCtaContent: CtaContent = {
  eyebrow: "Next step",
  title: "Move from the public landing story into products, development, or a direct contact route.",
  description:
    "All follow-up actions stay internal to the demo so the public experience remains coherent and safe to review.",
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
  ],
};

export const aboutTimelineItems: MilestoneItem[] = [
  {
    time: "2022-02-14",
    title: "Concept framework prepared",
    description: "The estate narrative was shaped around phased growth, business support, and logistics clarity.",
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
    title: "Public website launched",
    description: "The generic public website became the demo landing for the wider procurement MVP.",
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

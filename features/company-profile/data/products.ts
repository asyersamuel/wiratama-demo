import type { ProductItem } from "@/features/company-profile/types";

export const productItems: ProductItem[] = [
  {
    id: "industrial-land",
    title: "Industrial Land",
    kicker: "Development-ready plots",
    description:
      "Large-format parcels are organized for phased industrial growth with utility corridors, circulation logic, and room for long-range expansion.",
    summary:
      "Built for anchor tenants and long-range operators that need room to grow without reworking the district around them.",
    features: [
      "Flexible parcel sizing for staged acquisition and expansion.",
      "Primary roads, drainage, and services planned as one backbone.",
      "Clear separation between public frontage and operational movement.",
    ],
    cta: {
      label: "View industrial land",
      href: "/products#industrial-land",
    },
    mediaLabel: "Industrial Land",
    mediaCaption: "Prepared parcels, structured access, and long-horizon planning.",
    tone: "gold",
  },
  {
    id: "factory-building",
    title: "Factory Building",
    kicker: "Fast-track operational launch",
    description:
      "Ready-built factory envelopes shorten fit-out time for businesses that want predictable delivery and lower setup friction.",
    summary:
      "Suited for assembly, light processing, packaging, and operators that need a professional shell with reliable site servicing.",
    features: [
      "Modular layouts sized for fast occupancy and staged customization.",
      "Loading, parking, and service circulation built into the site grid.",
      "Suitable for clean production and controlled access operations.",
    ],
    cta: {
      label: "View factory building",
      href: "/products#factory-building",
    },
    mediaLabel: "Factory Building",
    mediaCaption: "Modular envelopes tuned for speed, clarity, and repeatable delivery.",
    tone: "slate",
  },
  {
    id: "commercial-area",
    title: "Commercial Area",
    kicker: "Town-center business frontage",
    description:
      "Commercial frontage is designed to support the daily rhythm of the estate with retail, office, hospitality, and meeting functions.",
    summary:
      "This layer gives the public-facing side of the estate a clear identity while keeping operations efficient behind it.",
    features: [
      "Business-support zoning for retail and client-facing offices.",
      "Walkable frontage with clear visitor orientation and meeting spaces.",
      "Connected to workforce, visitor, and management movement patterns.",
    ],
    cta: {
      label: "View commercial area",
      href: "/products#commercial-area",
    },
    mediaLabel: "Commercial Area",
    mediaCaption: "A structured business address at the front door of the estate.",
    tone: "copper",
  },
  {
    id: "commercial-space",
    title: "Commercial Space",
    kicker: "Flexible business suites",
    description:
      "Smaller-format commercial suites provide room for business support services, showrooms, client meetings, and supporting daily operations.",
    summary:
      "Designed for tenants that need adaptable space close to the estate's busiest commercial and visitor flows.",
    features: [
      "Flexible suite sizes for office, retail, and service operations.",
      "Positioned near visitor arrival and commercial support activity.",
      "Useful for brands needing visibility without large land commitments.",
    ],
    cta: {
      label: "View commercial space",
      href: "/products#commercial-space",
    },
    mediaLabel: "Commercial Space",
    mediaCaption: "Adaptable business suites with frontage, visibility, and support access.",
    tone: "sand",
  },
  {
    id: "residential",
    title: "Residential",
    kicker: "Live-near-work community",
    description:
      "Residential zones support workforce retention and daily convenience with a calmer neighborhood environment near employment and services.",
    summary:
      "Structured for staff housing, managerial residences, and shared living support in a district-scale setting.",
    features: [
      "Balanced mix of living clusters, retail, and shared green pockets.",
      "Shorter commute patterns for teams supporting daily operations.",
      "Integrated with estate services, security, and community facilities.",
    ],
    cta: {
      label: "View residential",
      href: "/products#residential",
    },
    mediaLabel: "Residential",
    mediaCaption: "A supportive community layer that completes the district ecosystem.",
    tone: "emerald",
  },
  {
    id: "warehouse",
    title: "Warehouse",
    kicker: "Distribution and staging capacity",
    description:
      "Warehouse clusters give tenants shared logistics logic, efficient truck routes, and dedicated handling space for inbound and outbound movement.",
    summary:
      "Ideal for 3PL providers, buffer inventory operators, and businesses needing strong estate-side logistics coordination.",
    features: [
      "High-clearance storage and truck-friendly circulation for daily throughput.",
      "Dedicated staging and support yards for safer operational sequencing.",
      "Suitable for cross-docking, regional fulfillment, and buffer inventory.",
    ],
    cta: {
      label: "View warehouse",
      href: "/products#warehouse",
    },
    mediaLabel: "Warehouse",
    mediaCaption: "A logistics layer designed for movement, timing, and visibility.",
    tone: "teal",
  },
];

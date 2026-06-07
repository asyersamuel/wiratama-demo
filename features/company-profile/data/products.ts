import type { ProductItem } from "@/features/company-profile/types";

export const productItems: ProductItem[] = [
  {
    id: "industrial-land",
    title: "Industrial Land",
    kicker: "Development-ready plots",
    description:
      "Large-format land parcels are planned for phased industrial growth with utility corridors, circulation logic, and expansion-ready zoning.",
    summary:
      "Built for anchor tenants, export manufacturers, and supply-chain operators who need room to grow without redesigning the estate around them.",
    features: [
      "Flexible parcel sizing for phased acquisition and long-term expansion.",
      "Road, drainage, and service infrastructure planned as a coordinated backbone.",
      "Positioned for logistics access, operational separation, and future utility upgrades.",
    ],
    cta: {
      label: "Discuss industrial land",
      href: "/contact",
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
      "Standardized building envelopes shorten fit-out time for businesses that want predictable delivery and lower setup friction.",
    summary:
      "The offer suits assembly, light processing, packaging, and operators that need a professional shell with reliable site servicing.",
    features: [
      "Modular building layouts sized for quick occupancy and staged customization.",
      "Loading, parking, and service circulation integrated into the estate grid.",
      "Support for clean production, controlled access, and tenant branding zones.",
    ],
    cta: {
      label: "Explore factory options",
      href: "/contact",
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
      "This layer gives the public-facing side of the district a clear identity while keeping industrial operations efficient behind it.",
    features: [
      "Business-support zoning for retail, client-facing offices, and service amenities.",
      "Walkable frontage with event-ready space and clear visitor orientation.",
      "Planned adjacency to workforce, visitor, and management movement patterns.",
    ],
    cta: {
      label: "Review commercial area",
      href: "/contact",
    },
    mediaLabel: "Commercial Area",
    mediaCaption: "A structured business address at the front door of the estate.",
    tone: "copper",
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
      "Dedicated staging and support-yard planning for safer operational sequencing.",
      "Suitable for cross-docking, regional fulfillment, and materials buffering.",
    ],
    cta: {
      label: "See warehouse capabilities",
      href: "/contact",
    },
    mediaLabel: "Warehouse",
    mediaCaption: "A logistics layer designed for movement, timing, and visibility.",
    tone: "teal",
  },
  {
    id: "residential",
    title: "Residential",
    kicker: "Live-near-work community",
    description:
      "Residential zones support workforce retention and daily convenience with a calmer neighborhood environment near employment and services.",
    summary:
      "The concept is structured for staff housing, managerial residences, and shared living support in a district-scale setting.",
    features: [
      "Balanced mix of living clusters, daily retail, and shared green pockets.",
      "Shorter commute patterns for teams supporting round-the-clock operations.",
      "Planned integration with estate services, security, and community facilities.",
    ],
    cta: {
      label: "Learn about residential plans",
      href: "/contact",
    },
    mediaLabel: "Residential",
    mediaCaption: "A supportive community layer that completes the district ecosystem.",
    tone: "emerald",
  },
];

import type { WhyUsTabContent } from "@/features/company-profile/types";

/**
 * All content is sanitized dummy data — no real company names,
 * real statistics context, or real external URLs.
 * (docs/design.md §4 — Content Sanitization)
 */

export const whyUsTabs: WhyUsTabContent[] = [
  {
    id: "sez",
    label: "Special Economic Zone",
    title: "Special Economic Zone",
    paragraphs: [
      "Our Industrial Estate operates as a fully designated Special Economic Zone (SEZ), providing unparalleled fiscal and non-fiscal incentives to qualified investors and tenants.",
      "By establishing operations within the SEZ, businesses can leverage significant tax holidays, import duty exemptions, and streamlined customs procedures, dramatically improving capital efficiency and operational speed.",
    ],
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80",
    imageAlt: "Tax Holiday Table Placeholder",
  },
  {
    id: "master-plan",
    label: "Master Plan",
    title: "Master Plan",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
    imageAlt: "Master Plan Map Placeholder",
  },
  {
    id: "infrastructure",
    label: "Infrastructure & Logistic",
    title: "Infrastructure & Logistic Connectivity",
    paragraphs: [
      "Designed from the ground up to support heavy industry and high-volume logistics, the estate features a resilient utility backbone and direct connections to major transport nodes.",
    ],
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    imageAlt: "Connectivity Map Placeholder",
    infraCards: [
      {
        id: "infra-1",
        iconName: "Route",
        title: "Connectivity",
        description: "Direct toll road access, dedicated rail freight links, and proximity to international deep-sea ports.",
      },
      {
        id: "infra-2",
        iconName: "Zap",
        title: "Utilities",
        description: "Redundant power substations, high-capacity water treatment, and integrated smart grid systems.",
      },
      {
        id: "infra-3",
        iconName: "Building",
        title: "Facilities",
        description: "Ready-to-use commercial spaces, modern worker accommodations, and emergency response centers.",
      },
    ],
  },
  {
    id: "one-stop",
    label: "One-Stop Services",
    title: "One-Stop Services",
    paragraphs: [
      "Our dedicated investor support desk ensures a frictionless setup process. From initial licensing to ongoing operational compliance, our integrated service center handles all administrative requirements.",
      "Key service areas include:",
    ],
    serviceCards: [
      { id: "svc-1", iconName: "FileText", title: "Business Licensing" },
      { id: "svc-2", iconName: "ShieldCheck", title: "Immigration & Visas" },
      { id: "svc-3", iconName: "HardHat", title: "Construction Permits" },
      { id: "svc-4", iconName: "Leaf", title: "Environmental Clearances" },
      { id: "svc-5", iconName: "Calculator", title: "Tax & Customs Advisory" },
      { id: "svc-6", iconName: "Users", title: "Labor Registration" },
    ],
  },
  {
    id: "policy",
    label: "Policy Aspect",
    title: "Policy Aspect",
    paragraphs: [
      "The estate is governed by a clear and supportive regulatory framework designed to protect investments and ensure long-term operational stability.",
    ],
    policyCards: [
      {
        id: "pol-1",
        iconName: "Scale",
        title: "Legal Certainty",
        description: "Guaranteed land rights and operational protections.",
      },
      {
        id: "pol-2",
        iconName: "Lock",
        title: "Investment Security",
        description: "National-level asset protection guarantees.",
      },
      {
        id: "pol-3",
        iconName: "Globe",
        title: "Foreign Ownership",
        description: "Favorable conditions for international entities.",
      },
      {
        id: "pol-4",
        iconName: "Coins",
        title: "Capital Repatriation",
        description: "Unrestricted transfer of profits and dividends.",
      },
      {
        id: "pol-5",
        iconName: "TrendingUp",
        title: "Economic Stimulus",
        description: "Priority access to regional development funds.",
      },
    ],
    strategicList: [
      {
        id: "reg-1",
        number: "I.",
        text: "National Economic Regulation regarding the acceleration of industrial zone development.",
        url: "#",
      },
      {
        id: "reg-2",
        number: "II.",
        text: "Presidential Decree on Strategic National Projects designation.",
        url: "#",
      },
    ],
    investmentList: [
      {
        id: "reg-3",
        number: "I.",
        text: "Ministry of Investment framework for SEZ fiscal incentives.",
        url: "#",
      },
      {
        id: "reg-4",
        number: "II.",
        text: "Regional ordinance supporting integrated business licensing.",
        url: "#",
      },
    ],
  },
];

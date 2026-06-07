import type { RegionTabItem } from "@/features/company-profile/types";

/**
 * All content is sanitized dummy data — no real company names,
 * real statistics context, or real external URLs.
 * (docs/design.md §4 — Content Sanitization)
 */

export const regionTabs: RegionTabItem[] = [
  {
    id: "investment-overview",
    label: "Investment Overview",
    layout: "overview",
    title: "A Strategic Investment Destination",
    paragraphs: [
      "The Central District has consistently demonstrated strong economic fundamentals, positioning itself as a premier destination for domestic and foreign direct investment. Over the past year, the region has maintained a resilient growth trajectory, supported by robust infrastructure development and a pro-business regulatory environment.",
      "In the last fiscal period, the region recorded an impressive economic growth rate of 5.37%, significantly outpacing national averages in the industrial sector. This growth has been accompanied by the creation of over 326,000 new jobs, reflecting the dynamic expansion of manufacturing and logistics operations.",
      "Our strategic location offers unparalleled connectivity to major seaports, toll roads, and international airports, ensuring that businesses can optimize their supply chains and reach global markets with maximum efficiency.",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imageAlt: "Economic growth chart placeholder",
  },
  {
    id: "demography",
    label: "Demography",
    layout: "demography",
    title: "Regional Demography",
    subtitle: "A strategic hub for a skilled and competitive workforce.",
    stats: [
      {
        id: "stat-growth",
        iconName: "TrendingUp",
        value: "5.37%",
        label: "Economic Growth (2023)",
      },
      {
        id: "stat-population",
        iconName: "Users",
        value: "38.23 Mio",
        label: "Total Population",
      },
      {
        id: "stat-graduates",
        iconName: "GraduationCap",
        value: "355 K",
        label: "University Graduates/Year",
      },
      {
        id: "stat-vocational",
        iconName: "Briefcase",
        value: "208 K",
        label: "Vocational Graduates/Year",
      },
      {
        id: "stat-industries",
        iconName: "Building2",
        value: "15,000+",
        label: "Active Industrial Units",
      },
      {
        id: "stat-wage",
        iconName: "CircleDollarSign",
        value: "Competitive",
        label: "Minimum Regional Wage",
      },
    ],
  },
];

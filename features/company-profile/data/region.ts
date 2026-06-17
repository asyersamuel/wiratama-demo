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
    title: "Lorem Ipsum Overview",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc.",
    ],
    imageUrl: "https://picsum.photos/seed/region1/800/600",
    imageAlt: "Overview placeholder",
  },
  {
    id: "demography",
    label: "Demography",
    layout: "demography",
    title: "Regional Demography",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    stats: [
      {
        id: "stat-growth",
        iconName: "TrendingUp",
        value: "XX.XX%",
        label: "Lorem Ipsum Stat 1",
      },
      {
        id: "stat-population",
        iconName: "Users",
        value: "XX.X Mio",
        label: "Lorem Ipsum Stat 2",
      },
      {
        id: "stat-graduates",
        iconName: "GraduationCap",
        value: "XXX K",
        label: "Lorem Ipsum Stat 3",
      },
      {
        id: "stat-vocational",
        iconName: "Briefcase",
        value: "XXX K",
        label: "Lorem Ipsum Stat 4",
      },
      {
        id: "stat-industries",
        iconName: "Building2",
        value: "XX,XXX+",
        label: "Lorem Ipsum Stat 5",
      },
      {
        id: "stat-wage",
        iconName: "CircleDollarSign",
        value: "Lorem Ipsum",
        label: "Lorem Ipsum Stat 6",
      },
    ],
  },
];

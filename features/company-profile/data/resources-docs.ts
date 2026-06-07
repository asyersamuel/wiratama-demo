import type {
  AnnualReportItem,
  InvestmentPrincipleItem,
  NewsLetterItem,
  SustainabilityReportItem,
} from "@/features/company-profile/types";

/**
 * All content is sanitized dummy data — no real company names,
 * real download links, or real external government URLs.
 * (docs/design.md §4 — Content Sanitization)
 */

// ── Annual Reports ─────────────────────────────────────────────────────────────

export const annualReports: AnnualReportItem[] = [
  {
    id: "ar-2023",
    title: "Standard Dummy Report 2023",
    coverImageUrl: "https://picsum.photos/seed/ar2023/800/600",
    downloadUrl: "/resources",
  },
  {
    id: "ar-2022",
    title: "Standard Dummy Report 2022",
    coverImageUrl: "https://picsum.photos/seed/ar2022/800/600",
    downloadUrl: "/resources",
  },
  {
    id: "ar-2021",
    title: "Standard Dummy Report 2021",
    coverImageUrl: "https://picsum.photos/seed/ar2021/800/600",
    downloadUrl: "/resources",
  },
];

// ── Sustainability Reports ─────────────────────────────────────────────────────

export const sustainabilityReports: SustainabilityReportItem[] = [
  {
    id: "sr-2023",
    title: "Lorem Ipsum Sustainability Report 2023",
    coverImageUrl: "https://picsum.photos/seed/sr2023/800/600",
    downloadUrl: "/resources",
  },
  {
    id: "sr-2022",
    title: "Lorem Ipsum Sustainability Report 2022",
    coverImageUrl: "https://picsum.photos/seed/sr2022/800/600",
    downloadUrl: "/resources",
  },
];

// ── Investment Principles ──────────────────────────────────────────────────────

export const investmentPrinciples: InvestmentPrincipleItem[] = [
  {
    id: "inv-1",
    title: "Lorem Ipsum Policy Document",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    externalUrl: "https://example.com/investment-licensing",
  },
  {
    id: "inv-2",
    title: "Lorem Ipsum Regulatory Framework",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    externalUrl: "https://example.com/industrial-zone-regulations",
  },
  {
    id: "inv-3",
    title: "Lorem Ipsum Eligibility Guide",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    externalUrl: "https://example.com/foreign-investment",
  },
  {
    id: "inv-4",
    title: "Lorem Ipsum Work Reference",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    externalUrl: "https://example.com/work-permits",
  },
];

// ── Newsletters ───────────────────────────────────────────────────────────────

export const newsLetters: NewsLetterItem[] = [
  {
    id: "nl-q4-2023",
    title: "Lorem Ipsum Newsletter Q4 2023",
    coverImageUrl: "https://picsum.photos/seed/nlq42023/800/600",
    pdfUrl: "/resources",
  },
  {
    id: "nl-q3-2023",
    title: "Lorem Ipsum Newsletter Q3 2023",
    coverImageUrl: "https://picsum.photos/seed/nlq32023/800/600",
    pdfUrl: "/resources",
  },
  {
    id: "nl-q2-2023",
    title: "Lorem Ipsum Newsletter Q2 2023",
    coverImageUrl: "https://picsum.photos/seed/nlq22023/800/600",
    pdfUrl: "/resources",
  },
  {
    id: "nl-q1-2023",
    title: "Lorem Ipsum Newsletter Q1 2023",
    coverImageUrl: "https://picsum.photos/seed/nlq12023/800/600",
    pdfUrl: "/resources",
  },
  {
    id: "nl-q4-2022",
    title: "Lorem Ipsum Newsletter Q4 2022",
    coverImageUrl: "https://picsum.photos/seed/nlq42022/800/600",
    pdfUrl: "/resources",
  },
  {
    id: "nl-q3-2022",
    title: "Lorem Ipsum Newsletter Q3 2022",
    coverImageUrl: "https://picsum.photos/seed/nlq32022/800/600",
    pdfUrl: "/resources",
  },
  {
    id: "nl-q2-2022",
    title: "Lorem Ipsum Newsletter Q2 2022",
    coverImageUrl: "https://picsum.photos/seed/nlq22022/800/600",
    pdfUrl: "/resources",
  },
  {
    id: "nl-q1-2022",
    title: "Lorem Ipsum Newsletter Q1 2022",
    coverImageUrl: "https://picsum.photos/seed/nlq12022/800/600",
    pdfUrl: "/resources",
  },
];

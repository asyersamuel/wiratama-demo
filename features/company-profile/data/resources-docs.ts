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
 *
 * Document covers use portrait-aspect Unsplash or placehold.co images.
 * Download/external URLs point to internal routes or example.com.
 */

// ── Annual Reports ─────────────────────────────────────────────────────────────

export const annualReports: AnnualReportItem[] = [
  {
    id: "ar-2023",
    title: "Annual Report 2023",
    coverImageUrl:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=480&q=80",
    downloadUrl: "/resources",
  },
  {
    id: "ar-2022",
    title: "Annual Report 2022",
    coverImageUrl:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=480&q=80",
    downloadUrl: "/resources",
  },
  {
    id: "ar-2021",
    title: "Annual Report 2021",
    coverImageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&q=80",
    downloadUrl: "/resources",
  },
];

// ── Sustainability Reports ─────────────────────────────────────────────────────

export const sustainabilityReports: SustainabilityReportItem[] = [
  {
    id: "sr-2023",
    title: "Sustainability Report 2023",
    coverImageUrl:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=480&q=80",
    downloadUrl: "/resources",
  },
  {
    id: "sr-2022",
    title: "Sustainability Report 2022",
    coverImageUrl:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=480&q=80",
    downloadUrl: "/resources",
  },
];

// ── Investment Principles ──────────────────────────────────────────────────────

export const investmentPrinciples: InvestmentPrincipleItem[] = [
  {
    id: "inv-1",
    title: "Business Investment Licensing Guide",
    description:
      "General guidelines for obtaining investment licences and permits for industrial estate occupiers.",
    externalUrl: "https://example.com/investment-licensing",
  },
  {
    id: "inv-2",
    title: "Industrial Zone Regulatory Framework",
    description:
      "Overview of the applicable regulatory framework governing industrial zone development and operations.",
    externalUrl: "https://example.com/industrial-zone-regulations",
  },
  {
    id: "inv-3",
    title: "Foreign Investment Eligibility Guide",
    description:
      "Eligibility criteria and compliance requirements for foreign direct investment within the estate.",
    externalUrl: "https://example.com/foreign-investment",
  },
  {
    id: "inv-4",
    title: "Immigration & Work Permit Reference",
    description:
      "Reference document for immigration procedures and work permit applications for international personnel.",
    externalUrl: "https://example.com/work-permits",
  },
];

// ── Newsletters ───────────────────────────────────────────────────────────────

export const newsLetters: NewsLetterItem[] = [
  {
    id: "nl-q4-2023",
    title: "Newsletter Q4 2023",
    coverImageUrl:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=480&q=80",
    pdfUrl: "/resources",
  },
  {
    id: "nl-q3-2023",
    title: "Newsletter Q3 2023",
    coverImageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=480&q=80",
    pdfUrl: "/resources",
  },
  {
    id: "nl-q2-2023",
    title: "Newsletter Q2 2023",
    coverImageUrl:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=480&q=80",
    pdfUrl: "/resources",
  },
  {
    id: "nl-q1-2023",
    title: "Newsletter Q1 2023",
    coverImageUrl:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=480&q=80",
    pdfUrl: "/resources",
  },
  {
    id: "nl-q4-2022",
    title: "Newsletter Q4 2022",
    coverImageUrl:
      "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=480&q=80",
    pdfUrl: "/resources",
  },
  {
    id: "nl-q3-2022",
    title: "Newsletter Q3 2022",
    coverImageUrl:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=480&q=80",
    pdfUrl: "/resources",
  },
  {
    id: "nl-q2-2022",
    title: "Newsletter Q2 2022",
    coverImageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=480&q=80",
    pdfUrl: "/resources",
  },
  {
    id: "nl-q1-2022",
    title: "Newsletter Q1 2022",
    coverImageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=480&q=80",
    pdfUrl: "/resources",
  },
];

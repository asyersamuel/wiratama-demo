"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type {
  AnnualReportItem,
  InvestmentPrincipleItem,
  NewsLetterItem,
  SustainabilityReportItem,
} from "@/features/company-profile/types";

// ─── SVG icon helpers ──────────────────────────────────────────────────────────

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function DownloadArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

// ─── Tab definition ────────────────────────────────────────────────────────────

type TabId = "annual" | "sustainability" | "investment" | "newsletter";

const TABS: { id: TabId; label: string }[] = [
  { id: "annual", label: "Annual Report" },
  { id: "sustainability", label: "Sustainability Report" },
  { id: "investment", label: "Investment Principle" },
  { id: "newsletter", label: "News Letter" },
];

// ─── Vertical tab button (matches PID / Compliance pattern) ───────────────────

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "cp-resources-tab w-full cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C68E17] focus-visible:ring-offset-2",
        active
          ? "cp-resources-tab--active bg-[#C68E17] text-white shadow-md"
          : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-[#C68E17] hover:text-[#C68E17]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

// ─── Tab 1: Annual Report card ─────────────────────────────────────────────────
// Title centered ABOVE the portrait cover; entire card is a <Link>.

function AnnualCard({ item }: { item: AnnualReportItem }) {
  return (
    <div className="cp-resources-unified-card flex flex-col items-center gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Title */}
      <h3 className="text-center text-base font-bold text-slate-800">
        {item.title}
      </h3>
      {/* Portrait cover */}
      <div className="relative aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-lg bg-slate-100 shadow-sm">
        <Image
          src={item.coverImageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 90vw, 220px"
          className="object-cover"
        />
      </div>
      {/* Download button */}
      <a
        href={item.downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-gray-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-1 mt-auto"
      >
        Download
        <DownloadArrowIcon />
      </a>
    </div>
  );
}

// ─── Tab 2: Sustainability Report card ────────────────────────────────────────
// Uses identical unified card UI as Tab 1.

function SustainabilityCard({ item }: { item: SustainabilityReportItem }) {
  return (
    <div className="cp-resources-unified-card flex flex-col items-center gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Title */}
      <h3 className="text-center text-base font-bold text-slate-800">
        {item.title}
      </h3>
      {/* Portrait cover */}
      <div className="relative aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-lg bg-slate-100 shadow-sm">
        <Image
          src={item.coverImageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 90vw, 220px"
          className="object-cover"
        />
      </div>
      {/* Download button */}
      <a
        href={item.downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-gray-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-1 mt-auto"
      >
        Download
        <DownloadArrowIcon />
      </a>
    </div>
  );
}

// ─── Tab 3: Investment Principle card ─────────────────────────────────────────
// Light-gray card: bold title left-aligned, "See Document →" pill button below.

function InvestmentCard({ item }: { item: InvestmentPrincipleItem }) {
  return (
    <div className="cp-resources-inv-card group flex flex-col gap-4 rounded-xl bg-slate-50 p-6 transition-all duration-200 hover:bg-[#fdf8ee]">
      <h3 className="text-base font-bold leading-snug text-slate-800 transition-colors group-hover:text-[#9a6d10]">
        {item.title}
      </h3>
      <p className="text-sm leading-6 text-slate-500">{item.description}</p>
      <div className="mt-auto">
        <a
          href={item.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:border-[#C68E17] hover:text-[#C68E17] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C68E17] focus-visible:ring-offset-1"
        >
          See Document
          <ArrowRightIcon />
        </a>
      </div>
    </div>
  );
}

// ─── Tab 4: Newsletter card ────────────────────────────────────────────────────
// Title centered above portrait cover; entire card is a <Link> (no separate button).

function NewsLetterCard({ item }: { item: NewsLetterItem }) {
  return (
    <Link
      href={item.pdfUrl}
      className="cp-resources-nl-card group flex flex-col gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C68E17] focus-visible:ring-offset-2"
      aria-label={`Open ${item.title}`}
    >
      {/* Title above image */}
      <p className="text-center text-sm font-bold text-slate-800 transition-colors group-hover:text-[#9a6d10]">
        {item.title}
      </p>
      {/* Portrait cover */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-slate-100 shadow-sm transition-shadow duration-300 group-hover:shadow-md">
        <Image
          src={item.coverImageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </Link>
  );
}

// ─── Tab content panels ────────────────────────────────────────────────────────

function AnnualGrid({ items }: { items: AnnualReportItem[] }) {
  return (
    <div className="cp-resources-panel grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <AnnualCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function SustainabilityGrid({ items }: { items: SustainabilityReportItem[] }) {
  return (
    <div className="cp-resources-panel grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <SustainabilityCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function InvestmentGrid({ items }: { items: InvestmentPrincipleItem[] }) {
  return (
    <div className="cp-resources-panel grid grid-cols-1 gap-6 md:grid-cols-2">
      {items.map((item) => (
        <InvestmentCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function NewsLetterGrid({ items }: { items: NewsLetterItem[] }) {
  return (
    <div className="cp-resources-panel grid grid-cols-2 gap-6 sm:grid-cols-3">
      {items.map((item) => (
        <NewsLetterCard key={item.id} item={item} />
      ))}
    </div>
  );
}

// ─── Main section export ───────────────────────────────────────────────────────

type ResourcesSectionProps = {
  annualReports: AnnualReportItem[];
  sustainabilityReports: SustainabilityReportItem[];
  investmentPrinciples: InvestmentPrincipleItem[];
  newsLetters: NewsLetterItem[];
};

export function ResourcesSection({
  annualReports,
  sustainabilityReports,
  investmentPrinciples,
  newsLetters,
}: ResourcesSectionProps) {
  const [activeTab, setActiveTab] = useState<TabId>("annual");

  return (
    <section className="cp-resources-section shell py-[4.5rem] sm:py-[5.5rem]">
      {/* Centered sub-header ──────────────────────────────────────────────── */}
      <div className="mb-10 text-center sm:mb-12">
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
          Resources
        </h2>
        <div className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-[#C68E17]" />
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500">
          Our reports and documents are available for download — well-structured
          to support transparency, accountability, and strategic decision-making.
        </p>
      </div>

      {/* Mobile: horizontal scrollable pills ─────────────────────────────── */}
      <div
        role="tablist"
        aria-label="Resource categories"
        className="mb-6 flex gap-2 overflow-x-auto pb-2 lg:hidden"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeTab}
            onClick={() => setActiveTab(tab.id)}
            className={[
              "cp-resources-tab shrink-0 cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C68E17] focus-visible:ring-offset-2",
              tab.id === activeTab
                ? "cp-resources-tab--active bg-[#C68E17] text-white shadow-md"
                : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-[#C68E17] hover:text-[#C68E17]",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Desktop: 2-column sidebar + content ─────────────────────────────── */}
      <div className="grid gap-8 lg:grid-cols-[250px_1fr] lg:items-start lg:gap-12">
        {/* Left sidebar (desktop only) */}
        <nav
          role="tablist"
          aria-label="Resource categories"
          className="hidden lg:flex lg:flex-col lg:gap-2"
        >
          {TABS.map((tab) => (
            <TabButton
              key={tab.id}
              label={tab.label}
              active={tab.id === activeTab}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </nav>

        {/* Right content panel — key triggers fade-in animation on switch */}
        <div role="tabpanel" aria-label={TABS.find((t) => t.id === activeTab)?.label} key={activeTab}>
          {activeTab === "annual" && <AnnualGrid items={annualReports} />}
          {activeTab === "sustainability" && <SustainabilityGrid items={sustainabilityReports} />}
          {activeTab === "investment" && <InvestmentGrid items={investmentPrinciples} />}
          {activeTab === "newsletter" && <NewsLetterGrid items={newsLetters} />}
        </div>
      </div>
    </section>
  );
}

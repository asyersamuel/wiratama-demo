"use client";

import { useState } from "react";
import Image from "next/image";
import type { RegionTabItem } from "@/features/company-profile/types";

// ─── SVG icon helpers ──────────────────────────────────────────────────────────

function TrendingUpIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21.42 10.922a2 2 0 0 1-.019 3.838L12.83 19.818a2 2 0 0 1-1.66 0L2.6 14.76a2 2 0 0 1-.019-3.838l8.57-4.887a2 2 0 0 1 1.701.002z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function Building2Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
}

function CircleDollarSignIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 18V6" />
    </svg>
  );
}

function HelpCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

const ICONS: Record<string, React.FC> = {
  TrendingUp: TrendingUpIcon,
  Users: UsersIcon,
  GraduationCap: GraduationCapIcon,
  Briefcase: BriefcaseIcon,
  Building2: Building2Icon,
  CircleDollarSign: CircleDollarSignIcon,
};

// ─── Shared Components ────────────────────────────────────────────────────────

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
        "cp-region-tab w-full cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C68E17] focus-visible:ring-offset-2",
        active
          ? "cp-region-tab--active bg-[#C68E17] text-white shadow-md"
          : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-[#C68E17] hover:text-[#C68E17]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type RegionSectionProps = {
  tabs: RegionTabItem[];
};

export function RegionSection({ tabs }: RegionSectionProps) {
  const [activeTabId, setActiveTabId] = useState<string>(
    tabs[0]?.id || "investment-overview"
  );

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  return (
    <section className="cp-region-section shell py-[4.5rem] sm:py-[5.5rem]">
      {/* Mobile: horizontal scrollable pills */}
      <div
        role="tablist"
        aria-label="Region sections"
        className="mb-6 flex gap-2 overflow-x-auto pb-2 lg:hidden"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeTabId}
            onClick={() => setActiveTabId(tab.id)}
            className={[
              "cp-region-tab shrink-0 cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C68E17] focus-visible:ring-offset-2",
              tab.id === activeTabId
                ? "cp-region-tab--active bg-[#C68E17] text-white shadow-md"
                : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-[#C68E17] hover:text-[#C68E17]",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Desktop: 2-column layout */}
      <div className="grid gap-8 lg:grid-cols-[250px_1fr] lg:items-start lg:gap-12">
        {/* Left sidebar (desktop only) */}
        <nav
          role="tablist"
          aria-label="Region categories"
          className="hidden lg:flex lg:flex-col lg:gap-2"
        >
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              label={tab.label}
              active={tab.id === activeTabId}
              onClick={() => setActiveTabId(tab.id)}
            />
          ))}
        </nav>

        {/* Right Content Area (Unified Card) */}
        <div
          role="tabpanel"
          aria-label={activeTab.label}
          key={activeTab.id}
          className="cp-region-panel bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
        >
          {/* Tab 1: Investment Overview */}
          {activeTab.layout === "overview" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {activeTab.title}
              </h2>
              <div className="flex flex-col gap-4 text-base leading-relaxed text-slate-600">
                {activeTab.paragraphs?.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
              {activeTab.imageUrl && (
                <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl bg-slate-100 border border-slate-200">
                  <Image
                    src={activeTab.imageUrl}
                    alt={activeTab.imageAlt || "Chart placeholder"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Demography */}
          {activeTab.layout === "demography" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {activeTab.title}
                </h2>
                {activeTab.subtitle && (
                  <p className="mt-2 text-base text-slate-500">
                    {activeTab.subtitle}
                  </p>
                )}
              </div>

              {/* Grid of Stat Items */}
              <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2">
                {activeTab.stats?.map((stat) => {
                  const IconComponent = ICONS[stat.iconName] || HelpCircleIcon;

                  return (
                    <div key={stat.id} className="flex items-center gap-4">
                      {/* Left: Icon */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center text-[#C68E17]">
                        <IconComponent />
                      </div>
                      {/* Right: Stacked text */}
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-[#003A8C]">
                          {stat.value}
                        </span>
                        <span className="text-sm font-medium text-slate-700">
                          {stat.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

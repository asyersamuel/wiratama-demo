"use client";

import { useState } from "react";
import Image from "next/image";
import type { WhyUsTabContent, WhyUsTabId } from "@/features/company-profile/types";

// ─── SVG icon helpers ──────────────────────────────────────────────────────────

function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// Icons for the various cards
const ICONS: Record<string, React.FC> = {
  Route: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>
  ),
  Zap: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  Building: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
  ),
  FileText: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
  ),
  ShieldCheck: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
  ),
  HardHat: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6h0"/><path d="M14 6h0a6 6 0 0 1 6 6v3"/></svg>
  ),
  Leaf: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 22c1.25-.97 2.5-2 3.8-2.5"/></svg>
  ),
  Calculator: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  Scale: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
  ),
  Lock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  ),
  Globe: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
  ),
  Coins: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>
  ),
  TrendingUp: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
  ),
};

const DefaultIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
);

// ─── Shared Tab Button ────────────────────────────────────────────────────────

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
        "cp-whyus-tab w-full cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C68E17] focus-visible:ring-offset-2",
        active
          ? "cp-whyus-tab--active bg-[#C68E17] text-white shadow-md"
          : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-[#C68E17] hover:text-[#C68E17]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type WhyUsSectionProps = {
  tabs: WhyUsTabContent[];
};

export function WhyUsSection({ tabs }: WhyUsSectionProps) {
  const [activeTabId, setActiveTabId] = useState<WhyUsTabId>(
    (tabs[0]?.id as WhyUsTabId) || "sez"
  );

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  return (
    <section className="cp-whyus-section shell py-[4.5rem] sm:py-[5.5rem]">
      {/* Mobile: horizontal scrollable pills */}
      <div
        role="tablist"
        aria-label="Why Us categories"
        className="mb-6 flex gap-2 overflow-x-auto pb-2 lg:hidden"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeTabId}
            onClick={() => setActiveTabId(tab.id as WhyUsTabId)}
            className={[
              "cp-whyus-tab shrink-0 cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C68E17] focus-visible:ring-offset-2",
              tab.id === activeTabId
                ? "cp-whyus-tab--active bg-[#C68E17] text-white shadow-md"
                : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-[#C68E17] hover:text-[#C68E17]",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Desktop: 2-column layout */}
      <div className="grid gap-8 lg:grid-cols-[250px_1fr] lg:items-start lg:gap-12">
        {/* Left sidebar */}
        <nav
          role="tablist"
          aria-label="Why Us categories"
          className="hidden lg:flex lg:flex-col lg:gap-2"
        >
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              label={tab.label}
              active={tab.id === activeTabId}
              onClick={() => setActiveTabId(tab.id as WhyUsTabId)}
            />
          ))}
        </nav>

        {/* Right Content Area (Unified Card) */}
        <div
          role="tabpanel"
          aria-label={activeTab.label}
          key={activeTab.id}
          className="cp-whyus-panel bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
        >
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Header Text */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {activeTab.title}
              </h2>
              {activeTab.paragraphs && activeTab.paragraphs.length > 0 && (
                <div className="flex flex-col gap-4 text-base leading-relaxed text-slate-600">
                  {activeTab.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Render Large Image if exists */}
            {activeTab.imageUrl && (
              <div
                className={`relative w-full overflow-hidden rounded-xl bg-slate-100 border border-slate-200 ${
                  activeTab.id === "master-plan" ? "aspect-[16/9]" : "aspect-[3/2] sm:aspect-video"
                }`}
              >
                <Image
                  src={activeTab.imageUrl}
                  alt={activeTab.imageAlt || activeTab.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Specific Layout: Infrastructure Cards */}
            {activeTab.infraCards && activeTab.infraCards.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {activeTab.infraCards.map((card) => {
                  const Icon = ICONS[card.iconName] || DefaultIcon;
                  return (
                    <div key={card.id} className="flex flex-col gap-3 rounded-xl bg-slate-50 p-6">
                      <div className="text-[#C68E17]">
                        <Icon />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">{card.title}</h4>
                      {card.description && (
                        <p className="text-sm leading-relaxed text-slate-600">{card.description}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Specific Layout: One-Stop Service Cards */}
            {activeTab.serviceCards && activeTab.serviceCards.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-2">
                {activeTab.serviceCards.map((card) => {
                  const Icon = ICONS[card.iconName] || DefaultIcon;
                  return (
                    <div key={card.id} className="flex flex-col items-center justify-center gap-4 rounded-xl border border-slate-200 bg-white p-6 text-center transition-shadow hover:shadow-md">
                      <div className="text-[#C68E17]">
                        <Icon />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 sm:text-base">{card.title}</h4>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Specific Layout: Policy Cards & Regulations */}
            {activeTab.id === "policy" && (
              <div className="flex flex-col gap-10 pt-2">
                {/* 5 Policy Cards Grid */}
                {activeTab.policyCards && activeTab.policyCards.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {activeTab.policyCards.map((card) => {
                      const Icon = ICONS[card.iconName] || DefaultIcon;
                      return (
                        <div key={card.id} className="flex flex-col gap-3 rounded-xl bg-slate-50 p-6">
                          <div className="text-[#C68E17]">
                            <Icon />
                          </div>
                          <h4 className="text-base font-bold text-slate-900">{card.title}</h4>
                          {card.description && (
                            <p className="text-sm leading-relaxed text-slate-500">{card.description}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Regulation Lists */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  {/* Strategic National Project */}
                  {activeTab.strategicList && activeTab.strategicList.length > 0 && (
                    <div className="flex flex-col gap-6">
                      <h3 className="text-lg font-bold text-slate-900">Strategic National Project</h3>
                      <div className="flex flex-col gap-4">
                        {activeTab.strategicList.map((item) => (
                          <div key={item.id} className="flex flex-col gap-3">
                            <div className="flex gap-3">
                              <span className="font-bold text-slate-900">{item.number}</span>
                              <p className="text-sm text-slate-700 leading-relaxed">{item.text}</p>
                            </div>
                            <div className="pl-6">
                              <a
                                href={item.url}
                                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-[#C68E17] hover:text-[#C68E17] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C68E17] focus-visible:ring-offset-1"
                              >
                                See Regulation <ArrowRightIcon />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Capital Investment */}
                  {activeTab.investmentList && activeTab.investmentList.length > 0 && (
                    <div className="flex flex-col gap-6">
                      <h3 className="text-lg font-bold text-slate-900">Capital Investment</h3>
                      <div className="flex flex-col gap-4">
                        {activeTab.investmentList.map((item) => (
                          <div key={item.id} className="flex flex-col gap-3">
                            <div className="flex gap-3">
                              <span className="font-bold text-slate-900">{item.number}</span>
                              <p className="text-sm text-slate-700 leading-relaxed">{item.text}</p>
                            </div>
                            <div className="pl-6">
                              <a
                                href={item.url}
                                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-[#C68E17] hover:text-[#C68E17] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C68E17] focus-visible:ring-offset-1"
                              >
                                See Regulation <ArrowRightIcon />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

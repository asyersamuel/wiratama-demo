"use client";

import { useState } from "react";
import Image from "next/image";
import type { WhyUsTabContent, WhyUsTabId } from "@/features/company-profile/types";

type WhyUsSectionProps = {
  tabs: WhyUsTabContent[];
};

export function WhyUsSection({ tabs }: WhyUsSectionProps) {
  const [activeTabId, setActiveTabId] = useState<WhyUsTabId>(
    (tabs[0]?.id as WhyUsTabId) || "sez"
  );

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  return (
    <section className="bg-stone-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Mobile: horizontal scrollable pills */}
        <div
          role="tablist"
          aria-label="Why Us categories"
          className="mb-8 flex gap-2 overflow-x-auto pb-3 lg:hidden"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={tab.id === activeTabId}
              onClick={() => setActiveTabId(tab.id as WhyUsTabId)}
              className={`shrink-0 cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-600 focus-visible:ring-offset-2 ${
                tab.id === activeTabId
                  ? "bg-yellow-600 text-white shadow-md"
                  : "bg-white text-stone-800 border border-stone-200 shadow-sm hover:border-yellow-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Desktop & General Grid Layout */}
        <div className="grid gap-8 lg:grid-cols-4 lg:items-start lg:gap-12">
          {/* Left Column (25% on desktop) */}
          <nav
            role="tablist"
            aria-label="Why Us categories"
            className="hidden lg:flex lg:flex-col lg:gap-3 lg:col-span-1"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabId(tab.id as WhyUsTabId)}
                aria-pressed={tab.id === activeTabId}
                className={`w-full cursor-pointer rounded-full px-6 py-3 text-sm font-semibold text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-600 focus-visible:ring-offset-2 ${
                  tab.id === activeTabId
                    ? "bg-yellow-600 text-white shadow-md"
                    : "bg-white text-stone-800 border border-stone-200 shadow-sm hover:border-yellow-600 hover:text-yellow-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right Column (75% on desktop - Large white card) */}
          <div
            role="tabpanel"
            aria-label={activeTab.label}
            className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 lg:col-span-3"
          >
            <div className="flex flex-col gap-6">
              {/* H2 dummy title */}
              <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
                {activeTab.title}
              </h2>

              {/* 2 paragraphs of Lorem Ipsum */}
              {activeTab.paragraphs && activeTab.paragraphs.length > 0 && (
                <div className="flex flex-col gap-4 text-base leading-relaxed text-stone-600">
                  {activeTab.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              )}

              {/* Responsive placeholder image below the text */}
              {activeTab.imageUrl && (
                <div className="relative w-full overflow-hidden rounded-xl bg-stone-100 border border-stone-200 aspect-[16/9] sm:aspect-video mt-2">
                  <Image
                    src={activeTab.imageUrl}
                    alt={activeTab.imageAlt || activeTab.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                    priority={activeTab.id === "sez"}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

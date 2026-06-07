"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PidTabItem } from "@/features/company-profile/types";

// ─── helpers ────────────────────────────────────────────────────────────────

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
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

// ─── tab button ──────────────────────────────────────────────────────────────

type TabButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function TabButton({ label, active, onClick }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "cp-pid-tab w-full cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C68E17] focus-visible:ring-offset-2",
        active
          ? "cp-pid-tab--active bg-[#C68E17] text-white shadow-md"
          : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-[#C68E17] hover:text-[#C68E17]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

// ─── content panel ───────────────────────────────────────────────────────────

type ContentPanelProps = {
  tab: PidTabItem;
};

function ContentPanel({ tab }: ContentPanelProps) {
  const hasImage = Boolean(tab.imageUrl);

  return (
    <div className="cp-pid-panel rounded-2xl bg-white p-6 shadow-md sm:p-8">
      {/* Title */}
      <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl">
        {tab.title}
      </h3>

      {/* Gold accent divider */}
      <div className="mt-3 h-[3px] w-14 rounded-full bg-[#C68E17]" />

      {hasImage ? (
        /* ── Image + text layout ──────────────────────────────────────────── */
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-8">
          {/* Left: text */}
          <div className="flex flex-col gap-4">
            {tab.paragraphs.map((para, i) => (
              <p
                key={i}
                className="text-sm leading-7 text-slate-600 sm:text-base"
              >
                {para}
              </p>
            ))}
            {tab.numberedList && (
              <ol className="mt-2 flex flex-col gap-2">
                {tab.numberedList.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-6 text-slate-600">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C68E17]/12 text-[11px] font-bold text-[#9a6d10]">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            )}
            {tab.documentHref && (
              <div className="mt-4">
                <Link
                  href={tab.documentHref}
                  className="cp-pid-download inline-flex items-center gap-2 rounded-full border border-[#C68E17] px-6 py-2.5 text-sm font-semibold text-[#C68E17] transition-all duration-200 hover:bg-[#C68E17] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C68E17] focus-visible:ring-offset-2"
                >
                  <DownloadIcon />
                  Download Document
                </Link>
              </div>
            )}
          </div>

          {/* Right: image */}
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src={tab.imageUrl!}
              alt={tab.imageAlt ?? tab.title}
              width={640}
              height={420}
              className="h-full w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      ) : (
        /* ── Text-only layout ────────────────────────────────────────────── */
        <div className="mt-6 flex flex-col gap-4">
          {tab.paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-sm leading-7 text-slate-600 sm:text-base"
            >
              {para}
            </p>
          ))}
          {tab.numberedList && (
            <ol className="mt-2 flex flex-col gap-3">
              {tab.numberedList.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm leading-6 text-slate-600 sm:text-base"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C68E17]/12 text-xs font-bold text-[#9a6d10]">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          )}
          {tab.documentHref && (
            <div className="mt-4">
              <Link
                href={tab.documentHref}
                className="cp-pid-download inline-flex items-center gap-2 rounded-full border border-[#C68E17] px-6 py-2.5 text-sm font-semibold text-[#C68E17] transition-all duration-200 hover:bg-[#C68E17] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C68E17] focus-visible:ring-offset-2"
              >
                <DownloadIcon />
                Download Document
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── main section ─────────────────────────────────────────────────────────────

type PidSectionProps = {
  tabs: PidTabItem[];
};

export function PidSection({ tabs }: PidSectionProps) {
  const [activeId, setActiveId] = useState<string>(tabs[0]?.id ?? "");

  const activeTab = tabs.find((t) => t.id === activeId) ?? tabs[0];

  if (!tabs.length || !activeTab) return null;

  return (
    <section className="cp-pid-section shell py-[4.5rem] sm:py-[5.5rem]">
      {/* Section header ───────────────────────────────────────────────────── */}
      <div className="mb-10 text-center sm:mb-12">
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
          PID
        </h2>
        <p className="mt-1 text-sm font-medium uppercase tracking-[0.22em] text-slate-400">
          Public Information Disclosure
        </p>
        {/* Gold accent line */}
        <div className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-[#C68E17]" />
      </div>

      {/* ── Mobile: horizontal scrollable pills ──────────────────────────── */}
      <div
        role="tablist"
        aria-label="PID sections"
        className="mb-6 flex gap-2 overflow-x-auto pb-2 lg:hidden"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeId}
            onClick={() => setActiveId(tab.id)}
            className={[
              "cp-pid-tab shrink-0 cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C68E17] focus-visible:ring-offset-2",
              tab.id === activeId
                ? "cp-pid-tab--active bg-[#C68E17] text-white shadow-md"
                : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-[#C68E17] hover:text-[#C68E17]",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Desktop: 2-column sidebar + content ──────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.28fr)_minmax(0,1fr)] lg:gap-8 lg:items-start">
        {/* Left sidebar (desktop only) */}
        <nav
          role="tablist"
          aria-label="PID sections"
          className="hidden lg:flex lg:flex-col lg:gap-2"
        >
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              label={tab.label}
              active={tab.id === activeId}
              onClick={() => setActiveId(tab.id)}
            />
          ))}
        </nav>

        {/* Right content panel */}
        <div role="tabpanel" aria-label={activeTab.label}>
          <ContentPanel tab={activeTab} key={activeId} />
        </div>
      </div>
    </section>
  );
}

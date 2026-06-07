"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type {
  ComplianceSubSection,
  ComplianceTabItem,
} from "@/features/company-profile/types";

// ─── icon helpers ─────────────────────────────────────────────────────────────

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

function ExternalLinkIcon() {
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
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// ─── tab button ───────────────────────────────────────────────────────────────

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
        "cp-compliance-tab w-full cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C68E17] focus-visible:ring-offset-2",
        active
          ? "cp-compliance-tab--active bg-[#C68E17] text-white shadow-md"
          : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-[#C68E17] hover:text-[#C68E17]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

// ─── shared sub-components ────────────────────────────────────────────────────

function BulletItem({ text }: { text: string }) {
  return (
    <li className="flex gap-3 text-sm leading-7 text-slate-600 sm:text-base">
      <span
        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C68E17]"
        aria-hidden="true"
      />
      {text}
    </li>
  );
}

function NumberedItem({ index, text }: { index: number; text: string }) {
  return (
    <li className="flex gap-3 text-sm leading-7 text-slate-600 sm:text-base">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C68E17]/12 text-xs font-bold text-[#9a6d10]">
        {index}
      </span>
      {text}
    </li>
  );
}

function DownloadButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="cp-compliance-download inline-flex items-center gap-2 rounded-full border border-[#C68E17] px-6 py-2.5 text-sm font-semibold text-[#C68E17] transition-all duration-200 hover:bg-[#C68E17] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C68E17] focus-visible:ring-offset-2"
    >
      <DownloadIcon />
      Download Document
    </Link>
  );
}

// ─── content panel layouts ────────────────────────────────────────────────────

/** Renders the text + list block used in both side and banner layouts */
function TextBlock({ tab }: { tab: ComplianceTabItem }) {
  return (
    <div className="flex flex-col gap-4">
      {tab.paragraphs.map((para, i) => (
        <p key={i} className="text-sm leading-7 text-slate-600 sm:text-base">
          {para}
        </p>
      ))}

      {tab.bulletList && (
        <ul className="mt-1 flex flex-col gap-1.5">
          {tab.bulletList.map((item, i) => (
            <BulletItem key={i} text={item} />
          ))}
        </ul>
      )}

      {tab.numberedList && (
        <ol className="mt-1 flex flex-col gap-2">
          {tab.numberedList.map((item, i) => (
            <NumberedItem key={i} index={i + 1} text={item} />
          ))}
        </ol>
      )}
    </div>
  );
}

/** Layout: text left, image right, optional download below text */
function SideLayout({ tab }: { tab: ComplianceTabItem }) {
  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-8 lg:items-start">
      {/* Left: text + lists + download */}
      <div className="flex flex-col gap-4">
        <TextBlock tab={tab} />
        {tab.documentHref && (
          <div className="mt-2">
            <DownloadButton href={tab.documentHref} />
          </div>
        )}
      </div>

      {/* Right: image */}
      {tab.imageUrl && (
        <div className="relative overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={tab.imageUrl}
            alt={tab.imageAlt ?? tab.title}
            width={600}
            height={800}
            className="w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 300px"
          />
        </div>
      )}
    </div>
  );
}

/** Layout: text above, full-width clickable banner image below, optional download */
function BannerLayout({ tab }: { tab: ComplianceTabItem }) {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <TextBlock tab={tab} />

      {/* Full-width banner image */}
      {tab.imageUrl && (
        <Link
          href={tab.documentHref ?? "/resources"}
          className="group relative block overflow-hidden rounded-xl bg-slate-800"
          aria-label="Open Whistleblowing System report portal"
        >
          <Image
            src={tab.imageUrl}
            alt={tab.imageAlt ?? tab.title}
            width={1200}
            height={400}
            className="w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
            sizes="(max-width: 1024px) 100vw, 900px"
          />
          {/* Overlay CTA */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors duration-300 group-hover:bg-black/20">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#C68E17] px-8 py-3 text-sm font-bold text-white shadow-lg transition-transform duration-200 group-hover:scale-105">
              <ExternalLinkIcon />
              Access Reporting Portal
            </span>
          </div>
        </Link>
      )}

      {tab.documentHref && !tab.imageUrl && (
        <div>
          <DownloadButton href={tab.documentHref} />
        </div>
      )}
    </div>
  );
}

/** Layout: text-only with H3 sub-sections (Privacy Policy) */
function SubSectionLayout({ tab }: { tab: ComplianceTabItem }) {
  return (
    <div className="mt-6 flex flex-col gap-6">
      {tab.paragraphs.map((para, i) => (
        <p key={i} className="text-sm leading-7 text-slate-600 sm:text-base">
          {para}
        </p>
      ))}

      {tab.subSections?.map((section: ComplianceSubSection, si) => (
        <div key={si} className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-slate-800 sm:text-lg">
            {section.heading}
          </h3>
          {section.paragraphs?.map((para, pi) => (
            <p
              key={pi}
              className="text-sm leading-7 text-slate-600 sm:text-base"
            >
              {para}
            </p>
          ))}
          {section.orderedList && (
            <ol className="flex flex-col gap-2">
              {section.orderedList.map((item, li) => (
                <NumberedItem key={li} index={li + 1} text={item} />
              ))}
            </ol>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── content panel ────────────────────────────────────────────────────────────

function ContentPanel({ tab }: { tab: ComplianceTabItem }) {
  const layout = tab.layout ?? (tab.imageUrl ? "side" : "none");

  return (
    <div className="cp-compliance-panel rounded-2xl bg-white p-6 shadow-md sm:p-8">
      {/* Title */}
      <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl">
        {tab.title}
      </h2>
      {/* Gold accent divider */}
      <div className="mt-3 h-[3px] w-14 rounded-full bg-[#C68E17]" />

      {layout === "side" && <SideLayout tab={tab} />}
      {layout === "banner" && <BannerLayout tab={tab} />}
      {layout === "none" && tab.subSections ? (
        <SubSectionLayout tab={tab} />
      ) : layout === "none" ? (
        /* Fallback: plain text + lists */
        <div className="mt-6 flex flex-col gap-4">
          <TextBlock tab={tab} />
          {tab.documentHref && (
            <div className="mt-2">
              <DownloadButton href={tab.documentHref} />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

// ─── main export ─────────────────────────────────────────────────────────────

type ComplianceSectionProps = {
  tabs: ComplianceTabItem[];
};

export function ComplianceSection({ tabs }: ComplianceSectionProps) {
  const [activeId, setActiveId] = useState<string>(tabs[0]?.id ?? "");
  const activeTab = tabs.find((t) => t.id === activeId) ?? tabs[0];

  if (!tabs.length || !activeTab) return null;

  return (
    <section className="cp-compliance-section shell py-[4.5rem] sm:py-[5.5rem]">
      {/* Section header */}
      <div className="mb-10 text-center sm:mb-12">
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
          Compliance
        </h2>
        <p className="mt-1 text-sm font-medium uppercase tracking-[0.22em] text-slate-400">
          Governance, Risk &amp; Integrity
        </p>
        <div className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-[#C68E17]" />
      </div>

      {/* Mobile: horizontally scrollable pills */}
      <div
        role="tablist"
        aria-label="Compliance sections"
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
              "cp-compliance-tab shrink-0 cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C68E17] focus-visible:ring-offset-2",
              tab.id === activeId
                ? "cp-compliance-tab--active bg-[#C68E17] text-white shadow-md"
                : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-[#C68E17] hover:text-[#C68E17]",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Desktop: 2-column sidebar + content */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.28fr)_minmax(0,1fr)] lg:gap-8 lg:items-start">
        {/* Left sidebar (desktop only) */}
        <nav
          role="tablist"
          aria-label="Compliance sections"
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

"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlaceholderMedia } from "@/components/company-profile/placeholder-media";
import type { NewsItem } from "@/features/company-profile/types";

// ─── helpers ────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getYear(dateStr: string): string {
  return dateStr.slice(0, 4);
}

// ─── filter pill ─────────────────────────────────────────────────────────────

type FilterPillProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "cp-filter-pill inline-flex cursor-pointer select-none items-center rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C68E17] focus-visible:ring-offset-2",
        active
          ? "cp-filter-pill--active border-[#C68E17] bg-[#C68E17] text-white shadow-md"
          : "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-[#C68E17] hover:text-[#C68E17]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

// ─── news card ───────────────────────────────────────────────────────────────

type NewsCardProps = {
  item: NewsItem;
};

function NewsCard({ item }: NewsCardProps) {
  return (
    <Link
      href={`/news/${item.slug}`}
      className="cp-news-card group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      aria-label={item.title}
    >
      {/* Image area */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderMedia
            label={item.category}
            caption={item.title}
            tone={item.tone}
            aspect="landscape"
          />
        )}
        {/* Category chip overlaid on image */}
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9a6d10] shadow-sm backdrop-blur-sm">
            {item.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-xs font-medium text-slate-400">{formatDate(item.date)}</p>
        <h3 className="line-clamp-2 text-base font-semibold leading-snug tracking-[-0.02em] text-slate-900 transition-colors duration-200 group-hover:text-[#9a6d10]">
          {item.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-6 text-slate-500">{item.excerpt}</p>
        <div className="mt-auto flex items-center gap-1.5 pt-2 text-sm font-semibold text-[#C68E17] transition-colors duration-200 group-hover:text-[#9a6d10]">
          Read more
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── main component ──────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 9;
const LOAD_MORE_STEP = 6;

type NewsSectionProps = {
  items: NewsItem[];
};

export function NewsSection({ items }: NewsSectionProps) {
  // Derive unique years sorted descending
  const years = useMemo(() => {
    const seen = new Set<string>();
    return items
      .map((i) => getYear(i.date))
      .filter((y) => {
        if (seen.has(y)) return false;
        seen.add(y);
        return true;
      })
      .sort((a, b) => Number(b) - Number(a));
  }, [items]);

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredItems = useMemo(
    () =>
      activeFilter === "all"
        ? items
        : items.filter((i) => getYear(i.date) === activeFilter),
    [items, activeFilter],
  );

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  function handleFilterChange(filter: string) {
    setActiveFilter(filter);
    setVisibleCount(ITEMS_PER_PAGE);
  }

  function handleLoadMore() {
    setVisibleCount((prev) => prev + LOAD_MORE_STEP);
  }

  return (
    <section className="shell py-[4.5rem] sm:py-[5.5rem]">
      {/* Section header */}
      <div className="mb-10 sm:mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C68E17]">
          Newsroom
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
          Latest updates from the estate
        </h2>
        <div className="mt-4 h-1 w-20 rounded-full bg-[#C68E17]/70" />
      </div>

      {/* Filter bar */}
      <div
        role="group"
        aria-label="Filter news by year"
        className="mb-10 flex flex-wrap items-center gap-2 sm:gap-3"
      >
        <FilterPill
          label="All Posts"
          active={activeFilter === "all"}
          onClick={() => handleFilterChange("all")}
        />
        {years.map((year) => (
          <FilterPill
            key={year}
            label={year}
            active={activeFilter === year}
            onClick={() => handleFilterChange(year)}
          />
        ))}
      </div>

      {/* News grid */}
      {visibleItems.length > 0 ? (
        <div className="cp-news-grid grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {visibleItems.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[16rem] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50">
          <p className="text-sm text-slate-400">No articles found for {activeFilter}.</p>
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            className="cp-load-more-btn inline-flex items-center gap-2 rounded-full border border-[#C68E17] bg-white px-8 py-3 text-sm font-semibold text-[#C68E17] shadow-sm transition-all duration-200 hover:bg-[#C68E17] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C68E17] focus-visible:ring-offset-2"
          >
            Load More Articles
            <span aria-hidden="true">↓</span>
          </button>
        </div>
      )}

      {/* Item count */}
      <p className="mt-6 text-center text-xs text-slate-400">
        Showing {visibleItems.length} of {filteredItems.length} articles
      </p>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { StatusPill } from "@/components/ui/status-pill";
import type { Tender, TenderStatus } from "@/features/tender/types";
import { formatCurrency, formatDate } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

type TenderDirectoryProps = {
  tenders: Tender[];
};

type CategoryGroup = "all" | "Infrastructure" | "Utility" | "Building" | "Supplier";
type TenderValueRange = "all" | "under25" | "25to75" | "above75";
type TenderSort = "newest" | "deadline" | "value" | "proposals";

const statusOptions: Array<{ value: "all" | TenderStatus; label: string }> = [
  { value: "all", label: "All Status" },
  { value: "draft", label: "Draft" },
  { value: "open", label: "Open" },
  { value: "under_review", label: "Under Review" },
  { value: "shortlisting", label: "Shortlisting" },
  { value: "awarded", label: "Awarded" },
  { value: "closed", label: "Closed" },
];

const categoryOptions: Array<{ value: CategoryGroup; label: string }> = [
  { value: "all", label: "All Categories" },
  { value: "Infrastructure", label: "Infrastructure" },
  { value: "Utility", label: "Utility" },
  { value: "Building", label: "Building" },
  { value: "Supplier", label: "Supplier" },
];

const valueOptions: Array<{ value: TenderValueRange; label: string }> = [
  { value: "all", label: "All Values" },
  { value: "under25", label: "Up to IDR 25B" },
  { value: "25to75", label: "IDR 25B - 75B" },
  { value: "above75", label: "Above IDR 75B" },
];

const zoneOptions = [
  { value: "all", label: "All Zones" },
  { value: "Zona A", label: "Zona A" },
  { value: "Zona Utilitas", label: "Zona Utility" },
  { value: "Zona Commercial Support", label: "Zona Commercial Support" },
  { value: "Zona Administrasi", label: "Zona Administration" },
  { value: "Zona B", label: "Zona B" },
] as const;

const sortOptions: Array<{ value: TenderSort; label: string }> = [
  { value: "newest", label: "Newest" },
  { value: "deadline", label: "Closing Soon" },
  { value: "value", label: "Highest Value" },
  { value: "proposals", label: "Most Proposals" },
];

function getCategoryGroup(tender: Tender): Exclude<CategoryGroup, "all"> {
  if (tender.category.includes("Building")) {
    return "Building";
  }

  if (tender.category.includes("Utility Procurement")) {
    return "Supplier";
  }

  if (tender.category.includes("Electrical")) {
    return "Utility";
  }

  return "Infrastructure";
}

function matchesValueRange(
  estimatedValue: number,
  valueRange: TenderValueRange,
) {
  if (valueRange === "under25") {
    return estimatedValue < 25_000_000_000;
  }

  if (valueRange === "25to75") {
    return estimatedValue >= 25_000_000_000 && estimatedValue <= 75_000_000_000;
  }

  if (valueRange === "above75") {
    return estimatedValue > 75_000_000_000;
  }

  return true;
}

export function TenderDirectory({ tenders }: TenderDirectoryProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | TenderStatus>("all");
  const [category, setCategory] = useState<CategoryGroup>("all");
  const [valueRange, setValueRange] = useState<TenderValueRange>("all");
  const [zone, setZone] =
    useState<(typeof zoneOptions)[number]["value"]>("all");
  const [sort, setSort] = useState<TenderSort>("newest");

  const filteredTenders = tenders.filter((tender) => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery =
      normalizedQuery.length === 0 ||
      tender.title.toLowerCase().includes(normalizedQuery) ||
      tender.code.toLowerCase().includes(normalizedQuery) ||
      tender.description.toLowerCase().includes(normalizedQuery) ||
      tender.location.toLowerCase().includes(normalizedQuery) ||
      tender.zone.toLowerCase().includes(normalizedQuery);

    const matchesStatus = status === "all" || tender.status === status;
    const matchesCategory =
      category === "all" || getCategoryGroup(tender) === category;
    const matchesZone = zone === "all" || tender.zone === zone;
    const matchesValue = matchesValueRange(tender.estimatedValue, valueRange);

    return (
      matchesQuery &&
      matchesStatus &&
      matchesCategory &&
      matchesZone &&
      matchesValue
    );
  });

  const sortedTenders = [...filteredTenders].sort((left, right) => {
    if (sort === "deadline") {
      return (
        new Date(left.deadline).getTime() - new Date(right.deadline).getTime()
      );
    }

    if (sort === "value") {
      return right.estimatedValue - left.estimatedValue;
    }

    if (sort === "proposals") {
      return right.proposals.length - left.proposals.length;
    }

    return new Date(right.startDate).getTime() - new Date(left.startDate).getTime();
  });

  const hasActiveFilters =
    query.trim().length > 0 ||
    status !== "all" ||
    category !== "all" ||
    valueRange !== "all" ||
    zone !== "all";

  const resetFilters = () => {
    setQuery("");
    setStatus("all");
    setCategory("all");
    setValueRange("all");
    setZone("all");
    setSort("newest");
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={(event) => event.preventDefault()}
        className="tender-card p-4 sm:p-5"
      >
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by tender title, code, location, or zone"
            className="tender-input h-14 rounded-[20px] px-5 text-base"
          />
          <button
            type="submit"
            className="btn btn-primary h-14 rounded-[20px] px-6"
          >
            Find Tender Package
          </button>
        </div>
      </form>

      <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
          <div className="tender-card p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="code-label">Tender Filters</p>
                <h2 className="mt-2 text-lg font-semibold text-slate-950">
                  Filter Tender Packages
                </h2>
              </div>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-sm font-semibold text-[var(--accent-strong)]"
                >
                  Reset
                </button>
              ) : null}
            </div>

            <div className="mt-6 space-y-6">
              <section>
                <h3 className="text-sm font-semibold text-slate-950">Category</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {categoryOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setCategory(option.value)}
                      className={`rounded-full border px-3 py-2 text-sm transition ${
                        category === option.value
                          ? "border-[#d8b1b9] bg-[var(--accent-soft)] font-semibold text-[var(--accent-strong)]"
                          : "border-[var(--line)] text-slate-600 hover:border-[#ead8dc] hover:bg-[#fcf7f8]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-slate-950">Status</h3>
                <div className="mt-3 grid gap-2">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setStatus(option.value)}
                      className={`flex items-center justify-between rounded-[18px] border px-4 py-3 text-left text-sm transition ${
                        status === option.value
                          ? "border-[#d8b1b9] bg-[var(--accent-soft)] font-semibold text-[var(--accent-strong)]"
                          : "border-[var(--line)] text-slate-600 hover:border-[#ead8dc] hover:bg-[#fcf7f8]"
                      }`}
                    >
                      <span>{option.label}</span>
                      <span className="code-label">
                        {option.value === "all"
                          ? filteredTenders.length
                          : tenders.filter((item) => item.status === option.value).length}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-slate-950">
                  Tender Value
                </h3>
                <div className="mt-3 grid gap-2">
                  {valueOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setValueRange(option.value)}
                      className={`rounded-[18px] border px-4 py-3 text-left text-sm transition ${
                        valueRange === option.value
                          ? "border-[#d8b1b9] bg-[var(--accent-soft)] font-semibold text-[var(--accent-strong)]"
                          : "border-[var(--line)] text-slate-600 hover:border-[#ead8dc] hover:bg-[#fcf7f8]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-slate-950">Zone</h3>
                <div className="mt-3 grid gap-2">
                  {zoneOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setZone(option.value)}
                      className={`rounded-[18px] border px-4 py-3 text-left text-sm transition ${
                        zone === option.value
                          ? "border-[#d8b1b9] bg-[var(--accent-soft)] font-semibold text-[var(--accent-strong)]"
                          : "border-[var(--line)] text-slate-600 hover:border-[#ead8dc] hover:bg-[#fcf7f8]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </aside>

        <div className="space-y-5">
          <div className="tender-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="code-label">Tender Catalog Results</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">
                {sortedTenders.length} tender package{sortedTenders.length === 1 ? "" : "s"}
              </h2>
              <p className="mt-1 text-sm copy-muted">
                Review each Tender Package by status, value, deadline, and current proposal activity before opening Tender Detail.
              </p>
            </div>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 sm:min-w-[210px]">
              Sort by
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as TenderSort)}
                className="tender-input"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {sortedTenders.length === 0 ? (
            <div className="tender-card p-8 text-center">
              <p className="text-base font-semibold text-slate-950">
                No tender matches the current filters.
              </p>
              <p className="mt-2 text-sm copy-muted">
                Try another keyword, zone, value range, or status to explore the available packages.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 xl:grid-cols-2">
              {sortedTenders.map((tender) => {
                const categoryGroup = getCategoryGroup(tender);

                return (
                  <article key={tender.id} className="tender-card p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="code-label">PT WIP / {tender.code}</p>
                        <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-slate-950">
                          {tender.title}
                        </h3>
                      </div>
                      <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-strong)]">
                        {categoryGroup}
                      </span>
                      <span className="inline-flex rounded-full border border-[var(--line)] px-3 py-1 text-xs font-medium text-slate-600">
                        {tender.category}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-7 copy-muted">
                      {tender.description}
                    </p>

                    <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                      <div>
                        <dt className="code-label">Deadline</dt>
                        <dd className="mt-2 font-medium text-slate-900">
                          {formatDate(tender.deadline)}
                        </dd>
                      </div>
                      <div>
                        <dt className="code-label">Estimated Value</dt>
                        <dd className="mt-2 font-medium text-slate-900">
                          {formatCurrency(tender.estimatedValue)}
                        </dd>
                      </div>
                      <div>
                        <dt className="code-label">Zone</dt>
                        <dd className="mt-2 font-medium text-slate-900">
                          {tender.zone}
                        </dd>
                      </div>
                      <div>
                        <dt className="code-label">Proposal Count</dt>
                        <dd className="mt-2 font-medium text-slate-900">
                          {tender.proposals.length} proposal{tender.proposals.length === 1 ? "" : "s"}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-6 flex items-center justify-between gap-4">
                      <p className="text-sm text-slate-500">{tender.location}</p>
                      <Link
                        href={`/tender/${tender.id}`}
                        className="btn btn-primary"
                      >
                        View Detail
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

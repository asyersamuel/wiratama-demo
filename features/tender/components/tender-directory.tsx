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

const statusOptions: Array<{ value: "all" | TenderStatus; label: string }> = [
  { value: "all", label: "All Status" },
  { value: "draft", label: "Draft" },
  { value: "open", label: "Open" },
  { value: "evaluation", label: "Under Evaluation" },
  { value: "awarded", label: "Awarded" },
  { value: "closed", label: "Closed" },
];

export function TenderDirectory({ tenders }: TenderDirectoryProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | TenderStatus>("all");
  const [category, setCategory] = useState("all");

  const categories = Array.from(new Set(tenders.map((item) => item.category)));

  const filteredTenders = tenders.filter((tender) => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery =
      normalizedQuery.length === 0 ||
      tender.title.toLowerCase().includes(normalizedQuery) ||
      tender.code.toLowerCase().includes(normalizedQuery) ||
      tender.location.toLowerCase().includes(normalizedQuery) ||
      tender.zone.toLowerCase().includes(normalizedQuery);

    const matchesStatus = status === "all" || tender.status === status;
    const matchesCategory = category === "all" || tender.category === category;

    return matchesQuery && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-5">
      <div className="panel-strong grid gap-4 p-5 sm:grid-cols-[minmax(0,1.4fr)_minmax(180px,0.5fr)_minmax(200px,0.7fr)]">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Search Tender
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by tender name, code, location, or zone"
            className="h-12 rounded-2xl border border-[var(--line)] bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[var(--accent)]"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Status
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as "all" | TenderStatus)
            }
            className="h-12 rounded-2xl border border-[var(--line)] bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[var(--accent)]"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-12 rounded-2xl border border-[var(--line)] bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[var(--accent)]"
          >
            <option value="all">All Categories</option>
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4">
        {filteredTenders.map((tender) => (
          <article
            key={tender.id}
            className="panel-strong rounded-[26px] p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-3xl">
                <p className="code-label">{tender.code}</p>
                <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-slate-950">
                  {tender.title}
                </h2>
                <p className="mt-2 text-sm copy-muted">
                  {tender.category} · {tender.location} · {tender.zone}
                </p>
              </div>
              <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
            </div>

            <p className="mt-4 max-w-4xl text-sm leading-7 copy-muted">
              {tender.description}
            </p>

            <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2 xl:grid-cols-4">
              <p>Deadline: {formatDate(tender.deadline)}</p>
              <p>Estimated Value: {formatCurrency(tender.estimatedValue)}</p>
              <p>Proposal Count: {tender.proposals.length}</p>
              <p>Start Date: {formatDate(tender.startDate)}</p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/tender/${tender.id}`}
                className="inline-flex rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-92"
              >
                View Detail
              </Link>
            </div>
          </article>
        ))}

        {filteredTenders.length === 0 ? (
          <div className="panel-strong rounded-[26px] p-8 text-center">
            <p className="text-base font-semibold text-slate-950">
              No tender matches the current filters.
            </p>
            <p className="mt-2 text-sm copy-muted">
              Try another keyword, status, or category to explore available
              packages.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

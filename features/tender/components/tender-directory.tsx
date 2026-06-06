"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useDemoTenders } from "@/features/tender/demo-store";
import { StatusPill } from "@/components/ui/status-pill";
import type { Tender, TenderStatus } from "@/features/tender/types";
import { formatCurrency, formatDate } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

type TenderDirectoryProps = {
  tenders: Tender[];
};

type TenderSort = "deadline" | "value" | "latest";

const statusOptions: Array<{ value: "all" | TenderStatus; label: string }> = [
  { value: "all", label: "Semua status" },
  { value: "open", label: "Open" },
  { value: "under_review", label: "Under Review" },
  { value: "shortlisting", label: "Shortlisting" },
  { value: "draft", label: "Draft" },
  { value: "awarded", label: "Awarded" },
  { value: "closed", label: "Closed" },
];

const sortOptions: Array<{ value: TenderSort; label: string }> = [
  { value: "deadline", label: "Terdekat" },
  { value: "value", label: "Nilai tertinggi" },
  { value: "latest", label: "Terbaru" },
];

export function TenderDirectory({ tenders: seedTenders }: TenderDirectoryProps) {
  const tenders = useDemoTenders(seedTenders);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | TenderStatus>("all");
  const [sort, setSort] = useState<TenderSort>("deadline");

  const filteredTenders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tenders
      .filter((tender) => {
        const matchesQuery =
          normalizedQuery.length === 0 ||
          tender.title.toLowerCase().includes(normalizedQuery) ||
          tender.code.toLowerCase().includes(normalizedQuery) ||
          tender.category.toLowerCase().includes(normalizedQuery) ||
          tender.location.toLowerCase().includes(normalizedQuery) ||
          tender.zone.toLowerCase().includes(normalizedQuery);
        const matchesStatus = status === "all" || tender.status === status;

        return matchesQuery && matchesStatus;
      })
      .sort((left, right) => {
        if (sort === "value") {
          return right.estimatedValue - left.estimatedValue;
        }

        if (sort === "latest") {
          return new Date(right.startDate).getTime() - new Date(left.startDate).getTime();
        }

        return new Date(left.deadline).getTime() - new Date(right.deadline).getTime();
      });
  }, [query, sort, status, tenders]);

  return (
    <div className="space-y-6">
      <section className="tender-card p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_220px]">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Cari tender
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Nama paket, kode, lokasi, atau zona"
              className="tender-input"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Status tender
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as "all" | TenderStatus)}
              className="tender-input"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Urutkan
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
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="code-label">Hasil daftar tender</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              {filteredTenders.length} paket tender
            </h2>
          </div>
          <p className="text-sm copy-muted">
            Vendor melihat paket, status, nilai estimasi, dan deadline sebelum membuka detail tender.
          </p>
        </div>

        {filteredTenders.length === 0 ? (
          <div className="tender-card p-8 text-center">
            <p className="text-base font-semibold text-slate-950">
              Tidak ada tender yang sesuai dengan pencarian.
            </p>
            <p className="mt-2 text-sm copy-muted">
              Coba ubah kata kunci atau status tender yang dipilih.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {filteredTenders.map((tender) => (
              <article key={tender.id} className="tender-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="code-label">{tender.code}</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-950">
                      {tender.title}
                    </h3>
                  </div>
                  <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
                </div>

                <p className="mt-4 text-sm leading-7 copy-muted">{tender.description}</p>

                <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="code-label">Kategori</dt>
                    <dd className="mt-2 font-medium text-slate-900">{tender.category}</dd>
                  </div>
                  <div>
                    <dt className="code-label">Lokasi</dt>
                    <dd className="mt-2 font-medium text-slate-900">{tender.location}</dd>
                  </div>
                  <div>
                    <dt className="code-label">Deadline</dt>
                    <dd className="mt-2 font-medium text-slate-900">{formatDate(tender.deadline)}</dd>
                  </div>
                  <div>
                    <dt className="code-label">Nilai estimasi</dt>
                    <dd className="mt-2 font-medium text-slate-900">
                      {formatCurrency(tender.estimatedValue)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 flex items-center justify-between gap-4 border-t border-[var(--line)] pt-5">
                  <p className="text-sm text-slate-500">{tender.zone}</p>
                  <Link href={`/tender/${tender.id}`} className="btn btn-primary">
                    Lihat Detail Tender
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

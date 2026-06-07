"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
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
  { value: "deadline", label: "Deadline terdekat" },
  { value: "value", label: "Nilai estimasi tertinggi" },
  { value: "latest", label: "Target mulai terbaru" },
];

export function TenderDirectory({ tenders }: TenderDirectoryProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | TenderStatus>("all");
  const [category, setCategory] = useState("all");
  const [zone, setZone] = useState("all");
  const [sort, setSort] = useState<TenderSort>("deadline");
  const deferredQuery = useDeferredValue(query);

  const categoryOptions = useMemo(
    () => ["all", ...new Set(tenders.map((tender) => tender.category))],
    [tenders],
  );
  const zoneOptions = useMemo(
    () => ["all", ...new Set(tenders.map((tender) => tender.zone))],
    [tenders],
  );

  const filteredTenders = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

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
        const matchesCategory = category === "all" || tender.category === category;
        const matchesZone = zone === "all" || tender.zone === zone;

        return matchesQuery && matchesStatus && matchesCategory && matchesZone;
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
  }, [category, deferredQuery, sort, status, tenders, zone]);

  return (
    <div className="space-y-6">
      <section className="tender-card p-5 sm:p-6">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_200px_240px_180px_220px]">
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
            Kategori
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="tender-input"
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "all" ? "Semua kategori" : option}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Zona
            <select
              value={zone}
              onChange={(event) => setZone(event.target.value)}
              className="tender-input"
            >
              {zoneOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "all" ? "Semua zona" : option}
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
            <p className="code-label">Daftar paket tender</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              {filteredTenders.length} peluang tender
            </h2>
          </div>
          <p className="max-w-2xl text-sm copy-muted">
            Gunakan filter untuk menyaring paket berdasarkan status, kategori, dan
            zona proyek sebelum membuka detail tender atau mengajukan proposal.
          </p>
        </div>

        {filteredTenders.length === 0 ? (
          <div className="tender-card p-8 text-center">
            <p className="text-base font-semibold text-slate-950">
              Tidak ada tender yang sesuai dengan filter saat ini.
            </p>
            <p className="mt-2 text-sm copy-muted">
              Coba ubah kata kunci, status, kategori, atau zona yang dipilih.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {filteredTenders.map((tender) => {
              const canApply = tender.status === "open";

              return (
                <article key={tender.id} className="tender-card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="max-w-3xl">
                      <p className="code-label">{tender.code}</p>
                      <h3 className="mt-2 text-xl font-semibold text-slate-950">
                        {tender.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 copy-muted">
                        {tender.description}
                      </p>
                    </div>
                    <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
                  </div>

                  <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-3">
                    <div>
                      <dt className="code-label">Lokasi / zona</dt>
                      <dd className="mt-2 font-medium text-slate-900">
                        {tender.location}
                        <span className="block text-slate-500">{tender.zone}</span>
                      </dd>
                    </div>
                    <div>
                      <dt className="code-label">Kategori</dt>
                      <dd className="mt-2 font-medium text-slate-900">{tender.category}</dd>
                    </div>
                    <div>
                      <dt className="code-label">Deadline</dt>
                      <dd className="mt-2 font-medium text-slate-900">
                        {formatDate(tender.deadline)}
                      </dd>
                    </div>
                    <div>
                      <dt className="code-label">Estimasi nilai</dt>
                      <dd className="mt-2 font-medium text-slate-900">
                        {formatCurrency(tender.estimatedValue)}
                      </dd>
                    </div>
                    <div>
                      <dt className="code-label">Dokumen pengajuan</dt>
                      <dd className="mt-2 font-medium text-slate-900">
                        {tender.requiredDocuments.length} dokumen
                      </dd>
                    </div>
                    <div>
                      <dt className="code-label">Persyaratan utama</dt>
                      <dd className="mt-2 font-medium text-slate-900">
                        {tender.requirements.length} poin utama
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-5">
                    <p className="text-sm text-slate-500">
                      Buka detail untuk melihat scope pekerjaan, timeline, dan kebutuhan
                      dokumen secara lengkap.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link href={`/tender/${tender.id}`} className="btn btn-primary">
                        Lihat Detail
                      </Link>
                      {canApply ? (
                        <Link href={`/tender/${tender.id}/apply`} className="btn btn-secondary">
                          Ajukan Proposal
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

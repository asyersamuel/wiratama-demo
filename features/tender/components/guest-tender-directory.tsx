"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { StatusPill } from "@/components/ui/status-pill";
import type { GuestTenderCard, TenderStatus } from "@/features/tender/types";
import { formatDate } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

type GuestTenderDirectoryProps = {
  tenders: GuestTenderCard[];
};

const statusOptions: Array<{ value: "all" | TenderStatus; label: string }> = [
  { value: "all", label: "Semua status" },
  { value: "open", label: "Open" },
  { value: "under_review", label: "Under Review" },
  { value: "shortlisting", label: "Shortlisting" },
  { value: "awarded", label: "Awarded" },
  { value: "closed", label: "Closed" },
];

export function GuestTenderDirectory({ tenders }: GuestTenderDirectoryProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | TenderStatus>("all");

  const filteredTenders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tenders.filter((tender) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        tender.title.toLowerCase().includes(normalizedQuery) ||
        tender.category.toLowerCase().includes(normalizedQuery) ||
        tender.location.toLowerCase().includes(normalizedQuery) ||
        tender.zone.toLowerCase().includes(normalizedQuery);
      const matchesStatus = status === "all" || tender.status === status;

      return matchesQuery && matchesStatus;
    });
  }, [query, status, tenders]);

  return (
    <div className="space-y-6">
      <section className="tender-card p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px]">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Cari tender publik
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Nama paket, kategori, lokasi, atau zona"
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
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="code-label">Tender publik tersedia</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              {filteredTenders.length} paket tender publik
            </h2>
          </div>
          <p className="max-w-2xl text-sm copy-muted">
            Informasi yang ditampilkan bersifat terbatas. Detail teknis lengkap dan
            akses pengajuan proposal hanya tersedia untuk vendor terdaftar.
          </p>
        </div>

        {filteredTenders.length === 0 ? (
          <div className="tender-card p-8 text-center">
            <p className="text-base font-semibold text-slate-950">
              Tidak ada tender publik yang sesuai dengan pencarian.
            </p>
            <p className="mt-2 text-sm copy-muted">
              Ubah kata kunci atau pilih status tender yang berbeda.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {filteredTenders.map((tender) => (
              <article key={tender.id} className="tender-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="code-label">{tender.zone}</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-950">
                      {tender.title}
                    </h3>
                  </div>
                  <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
                </div>

                <p className="mt-4 text-sm leading-7 copy-muted">{tender.publicSummary}</p>

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
                    <dt className="code-label">Batas waktu umum</dt>
                    <dd className="mt-2 font-medium text-slate-900">
                      {formatDate(tender.deadline)}
                    </dd>
                  </div>
                  <div>
                    <dt className="code-label">Nilai indikatif</dt>
                    <dd className="mt-2 font-medium text-slate-900">
                      {tender.publicValueLabel ?? "Tersedia untuk vendor terdaftar"}
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 flex items-center justify-between gap-4 border-t border-[var(--line)] pt-5">
                  <p className="text-sm text-slate-500">
                    Akses detail lengkap tersedia setelah akun vendor aktif.
                  </p>
                  <Link href="/tender/join" className="btn btn-primary">
                    Ajukan Akun Vendor
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

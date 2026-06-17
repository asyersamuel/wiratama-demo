"use client";

import Link from "next/link";
import { Timeline } from "@/components/shared/timeline";
import { StatusPill } from "@/components/ui/status-pill";
import { useDemoTenders } from "@/features/tender/demo-store";
import type { Tender } from "@/features/tender/types";
import { formatCurrency, formatDate } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

type TenderDetailViewProps = {
  seedTenders: Tender[];
  tenderId: string;
};

export function TenderDetailView({
  seedTenders,
  tenderId,
}: TenderDetailViewProps) {
  const tenders = useDemoTenders(seedTenders);
  const tender = tenders.find((item) => item.id === tenderId);

  if (!tender) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <Link href="/tender" className="btn btn-secondary px-4 py-2">
          Kembali ke Daftar Tender
        </Link>
      </div>

      <section className="tender-card p-6 sm:p-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-4xl">
            <p className="code-label">{tender.code}</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              {tender.title}
            </h1>
            <p className="mt-4 text-base leading-8 copy-muted">{tender.description}</p>
          </div>
          <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
        </div>

        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-4">
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

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`/tender/${tender.id}/apply`} className="btn btn-primary">
            Ajukan Proposal
          </Link>
          <Link href="/tender" className="btn btn-secondary">
            Kembali ke Daftar Tender
          </Link>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <section className="tender-card p-6 sm:p-7">
          <div className="border-b border-[var(--line)] pb-4">
            <p className="code-label">Informasi umum</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Ringkasan tender
            </h2>
          </div>

          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="code-label">Kode tender</dt>
              <dd className="mt-2 font-medium text-slate-900">{tender.code}</dd>
            </div>
            <div>
              <dt className="code-label">Zona</dt>
              <dd className="mt-2 font-medium text-slate-900">{tender.zone}</dd>
            </div>
            <div>
              <dt className="code-label">Target mulai</dt>
              <dd className="mt-2 font-medium text-slate-900">{formatDate(tender.startDate)}</dd>
            </div>
            <div>
              <dt className="code-label">Status tender</dt>
              <dd className="mt-2 font-medium text-slate-900">{getStatusLabel(tender.status)}</dd>
            </div>
          </dl>
        </section>

        <section className="tender-card p-6 sm:p-7">
          <div className="border-b border-[var(--line)] pb-4">
            <p className="code-label">Jadwal tender</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Timeline proses
            </h2>
          </div>
          <div className="mt-5">
            <Timeline items={tender.milestones} />
          </div>
        </section>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <section className="tender-card p-6 sm:p-7">
          <div className="border-b border-[var(--line)] pb-4">
            <p className="code-label">Scope pekerjaan</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Ruang lingkup pekerjaan
            </h2>
          </div>
          <ul className="mt-5 space-y-3">
            {tender.scope.map((item) => (
              <li
                key={item}
                className="rounded-[18px] border border-[var(--line)] bg-[#faf8f8] px-4 py-3 text-sm leading-7 text-slate-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="tender-card p-6 sm:p-7">
          <div className="border-b border-[var(--line)] pb-4">
            <p className="code-label">Persyaratan</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Kualifikasi dan persyaratan
            </h2>
          </div>
          <ul className="mt-5 space-y-3">
            {tender.requirements.map((item) => (
              <li
                key={item}
                className="rounded-[18px] border border-[var(--line)] bg-[#faf8f8] px-4 py-3 text-sm leading-7 text-slate-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </section>

      <section className="tender-card p-6 sm:p-7">
        <div className="border-b border-[var(--line)] pb-4">
          <p className="code-label">Dokumen yang dibutuhkan</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            Dokumen pengajuan vendor
          </h2>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {tender.requiredDocuments.map((item) => (
            <div
              key={item}
              className="rounded-[18px] border border-[var(--line)] bg-[#faf8f8] px-4 py-3 text-sm text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

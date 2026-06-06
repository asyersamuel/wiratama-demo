"use client";

import Link from "next/link";
import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { StatusPill } from "@/components/ui/status-pill";
import { contractors } from "@/features/contractor/data/contractors";
import { useDemoTenders } from "@/features/tender/demo-store";
import { tenders as seedTenders } from "@/features/tender/data/tenders";
import { formatCurrency, formatDate } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

const vendor = contractors.find((item) => item.id === "prima-infrastruktur-abadi");

export default function VendorTenderPage() {
  const tenders = useDemoTenders(seedTenders);

  if (!vendor) {
    return null;
  }

  const vendorProposals = tenders
    .flatMap((tender) =>
      tender.proposals
        .filter((proposal) => proposal.vendorId === vendor.id)
        .map((proposal) => ({
          tenderId: tender.id,
          tenderCode: tender.code,
          tenderTitle: tender.title,
          tenderStatus: tender.status,
          proposal,
        })),
    )
    .sort(
      (left, right) =>
        new Date(right.proposal.submittedAt).getTime() -
        new Date(left.proposal.submittedAt).getTime(),
    );
  const openTenders = tenders.filter((item) => item.status === "open").slice(0, 2);
  const needAttentionCount = vendorProposals.filter((item) =>
    ["submitted", "under_review", "clarification"].includes(item.proposal.status),
  ).length;

  return (
    <div className="space-y-6">
      <PortalPageIntro
        eyebrow="Mode Vendor"
        title="Portal Vendor"
        description="Pantau status pengajuan proposal, lihat ringkasan profil vendor, dan kembali ke tender yang masih dibuka bila diperlukan."
      />

      <section className="tender-card p-6 sm:p-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl">
            <p className="code-label">Profil vendor utama demo</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">{vendor.name}</h2>
            <p className="mt-3 text-sm leading-7 copy-muted">{vendor.summary}</p>
          </div>
          <StatusPill tone="success">{vendor.verificationStatus}</StatusPill>
        </div>

        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <dt className="code-label">NIB</dt>
            <dd className="mt-2 font-medium text-slate-900">{vendor.nib}</dd>
          </div>
          <div>
            <dt className="code-label">NPWP</dt>
            <dd className="mt-2 font-medium text-slate-900">{vendor.npwp}</dd>
          </div>
          <div>
            <dt className="code-label">PIC</dt>
            <dd className="mt-2 font-medium text-slate-900">
              {vendor.picName} · {vendor.picTitle}
            </dd>
          </div>
          <div>
            <dt className="code-label">Bidang usaha</dt>
            <dd className="mt-2 font-medium text-slate-900">{vendor.businessField}</dd>
          </div>
        </dl>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="tender-card p-5">
          <p className="code-label">Pengajuan saya</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {vendorProposals.length}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Total proposal vendor yang terlihat pada browser demo ini.
          </p>
        </article>
        <article className="tender-card p-5">
          <p className="code-label">Perlu dipantau</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {needAttentionCount}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Proposal dengan status Submitted, Under Review, atau Clarification.
          </p>
        </article>
        <article className="tender-card p-5">
          <p className="code-label">Tender open</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {openTenders.length}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Paket tender yang masih dapat dibuka kembali dari sisi vendor.
          </p>
        </article>
      </section>

      <section className="tender-card p-6 sm:p-7">
        <div className="border-b border-[var(--line)] pb-4">
          <p className="code-label">Status proposal</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            Daftar pengajuan saya
          </h2>
        </div>

        <div className="mt-5 space-y-4">
          {vendorProposals.length === 0 ? (
            <div className="rounded-[20px] border border-dashed border-[var(--line)] bg-[#faf8f8] p-5 text-sm copy-muted">
              Belum ada proposal yang dikirim dari vendor ini. Gunakan halaman
              Ajukan Proposal untuk membuat pengajuan demo.
            </div>
          ) : (
            vendorProposals.map(({ tenderId, tenderCode, tenderTitle, tenderStatus, proposal }) => (
              <article
                key={proposal.proposalId}
                className="rounded-[22px] border border-[var(--line)] bg-[#faf8f8] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="code-label">{tenderCode}</p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-950">
                      {tenderTitle}
                    </h3>
                    <p className="mt-2 text-sm copy-muted">
                      Status tender: {getStatusLabel(tenderStatus)}
                    </p>
                  </div>
                  <StatusPill>{getStatusLabel(proposal.status)}</StatusPill>
                </div>

                <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-4">
                  <div>
                    <dt className="code-label">No. proposal</dt>
                    <dd className="mt-2 font-medium text-slate-900">{proposal.proposalId}</dd>
                  </div>
                  <div>
                    <dt className="code-label">Harga penawaran</dt>
                    <dd className="mt-2 font-medium text-slate-900">
                      {formatCurrency(proposal.offeredPrice)}
                    </dd>
                  </div>
                  <div>
                    <dt className="code-label">Durasi</dt>
                    <dd className="mt-2 font-medium text-slate-900">
                      {proposal.estimatedDurationDays} hari
                    </dd>
                  </div>
                  <div>
                    <dt className="code-label">Tanggal submit</dt>
                    <dd className="mt-2 font-medium text-slate-900">
                      {formatDate(proposal.submittedAt)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href={`/tender/${tenderId}`} className="btn btn-secondary">
                    Lihat Detail Tender
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="tender-card p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="code-label">Tender yang masih dibuka</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">
              Peluang tender lain
            </h2>
          </div>
          <Link href="/tender" className="btn btn-primary">
            Kembali ke Daftar Tender
          </Link>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {openTenders.map((tender) => (
            <article
              key={tender.id}
              className="rounded-[20px] border border-[var(--line)] bg-[#faf8f8] p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="code-label">{tender.code}</p>
                  <h3 className="mt-2 font-semibold text-slate-950">{tender.title}</h3>
                </div>
                <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
              </div>
              <p className="mt-3 text-sm copy-muted">{tender.location}</p>
              <Link href={`/tender/${tender.id}`} className="mt-4 btn btn-secondary w-fit">
                Lihat Detail Tender
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

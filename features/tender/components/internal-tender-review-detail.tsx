"use client";

import Link from "next/link";
import { useState } from "react";
import { StatusPill } from "@/components/ui/status-pill";
import { ProposalComparisonTable } from "@/features/tender/components/proposal-comparison-table";
import { ProposalDetailDrawer } from "@/features/tender/components/proposal-detail-drawer";
import { getTenderDeadlineMeta } from "@/features/tender/service";
import {
  updateDemoProposalStatus,
  useDemoTenders,
} from "@/features/tender/demo-store";
import type { Contractor } from "@/features/contractor/types";
import type { ProposalStatus, Tender } from "@/features/tender/types";
import { formatCurrency, formatDate } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

type InternalTenderReviewDetailProps = {
  contractors: Contractor[];
  seedTenders: Tender[];
  tenderId: string;
};

export function InternalTenderReviewDetail({
  contractors,
  seedTenders,
  tenderId,
}: InternalTenderReviewDetailProps) {
  const tenders = useDemoTenders(seedTenders);
  const tender = tenders.find((item) => item.id === tenderId);
  const [selectedProposalId, setSelectedProposalId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeProposalId =
    selectedProposalId &&
    tender?.proposals.some((proposal) => proposal.proposalId === selectedProposalId)
      ? selectedProposalId
      : tender?.proposals[0]?.proposalId ?? "";
  const selectedProposal =
    tender?.proposals.find((proposal) => proposal.proposalId === activeProposalId) ??
    tender?.proposals[0];
  const selectedContractor = contractors.find(
    (contractor) => contractor.id === selectedProposal?.vendorId,
  );

  if (!tender) {
    return null;
  }

  const deadlineProgress = getTenderDeadlineMeta(tender);

  const openProposal = (proposalId: string) => {
    setSelectedProposalId(proposalId);
    setDrawerOpen(true);
  };

  const handleUpdateStatus = (status: ProposalStatus, internalNotes?: string) => {
    if (!selectedProposal) {
      return;
    }

    updateDemoProposalStatus({
      proposalId: selectedProposal.proposalId,
      tenderId: tender.id,
      status,
      internalNotes,
      relatedProposalIds: tender.proposals.map((proposal) => proposal.proposalId),
    });
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <Link href="/tender/internal" className="btn btn-secondary px-4 py-2">
            Kembali ke Review Tender
          </Link>
        </div>

        <section className="tender-card p-6 sm:p-7">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <p className="code-label">{tender.code}</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Detail Review Tender
              </h1>
              <p className="mt-4 text-base leading-8 copy-muted">
                {tender.title}
              </p>
            </div>
            <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
          </div>

          <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <dt className="code-label">Nilai estimasi</dt>
              <dd className="mt-2 font-medium text-slate-900">
                {formatCurrency(tender.estimatedValue)}
              </dd>
            </div>
            <div>
              <dt className="code-label">Deadline</dt>
              <dd className="mt-2 font-medium text-slate-900">{formatDate(tender.deadline)}</dd>
              <p className="mt-2 text-xs text-slate-500">
                {deadlineProgress.progressPercent}% waktu berjalan
              </p>
            </div>
            <div>
              <dt className="code-label">Proposal masuk</dt>
              <dd className="mt-2 font-medium text-slate-900">{tender.proposals.length}</dd>
            </div>
            <div>
              <dt className="code-label">Lokasi</dt>
              <dd className="mt-2 font-medium text-slate-900">{tender.location}</dd>
            </div>
          </dl>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <section className="tender-card p-6 sm:p-7">
              <div className="border-b border-[var(--line)] pb-4">
                <p className="code-label">Proposal vendor</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                  Daftar proposal masuk
                </h2>
                <p className="mt-3 text-sm leading-7 copy-muted">
                  Buka detail proposal melalui drawer agar halaman review tetap rapi,
                  terarah, dan mudah dipresentasikan.
                </p>
              </div>

              <div className="mt-5 space-y-4">
                {tender.proposals.map((proposal) => {
                  const isSelected = proposal.proposalId === selectedProposal?.proposalId;

                  return (
                    <article
                      key={proposal.proposalId}
                      className={`rounded-[22px] border p-5 transition ${
                        isSelected
                          ? "border-[#d8b1b9] bg-[var(--accent-soft)]/55"
                          : "border-[var(--line)] bg-[#faf8f8]"
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-base font-semibold text-slate-950">
                            {proposal.vendorName}
                          </p>
                          <p className="mt-2 text-sm copy-muted">
                            {proposal.proposalId}
                          </p>
                        </div>
                        <StatusPill>{getStatusLabel(proposal.status)}</StatusPill>
                      </div>

                      <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-4">
                        <div>
                          <dt className="code-label">Harga</dt>
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
                          <dt className="code-label">Tanggal mulai</dt>
                          <dd className="mt-2 font-medium text-slate-900">
                            {formatDate(proposal.proposedStartDate)}
                          </dd>
                        </div>
                        <div>
                          <dt className="code-label">Tenaga kerja</dt>
                          <dd className="mt-2 font-medium text-slate-900">
                            {proposal.manpowerCount} orang
                          </dd>
                        </div>
                      </dl>

                      <button
                        type="button"
                        onClick={() => openProposal(proposal.proposalId)}
                        className={isSelected ? "mt-5 btn btn-primary" : "mt-5 btn btn-secondary"}
                      >
                        Lihat Proposal
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="tender-card p-6 sm:p-7">
              <div className="border-b border-[var(--line)] pb-4">
                <p className="code-label">Perbandingan ringkas</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                  Ringkasan komparasi proposal
                </h2>
              </div>

              <div className="mt-5">
                <ProposalComparisonTable
                  actionLabel="Lihat Proposal"
                  onSelectProposal={(proposal) => openProposal(proposal.proposalId)}
                  proposals={tender.proposals}
                  selectedProposalId={selectedProposal?.proposalId}
                />
              </div>
            </section>
          </div>

          <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
            <section className="tender-card p-6">
              <p className="code-label">Fokus review</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">
                Arahan peninjauan internal
              </h2>
              <p className="mt-3 text-sm leading-7 copy-muted">
                Evaluasi difokuskan pada harga penawaran, durasi, kesiapan tenaga kerja,
                metode kerja, dan kecukupan dokumen pengajuan vendor.
              </p>
            </section>

            <section className="tender-card p-6">
              <p className="code-label">Profil vendor terpilih</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">
                {selectedProposal?.vendorName ?? "Pilih proposal"}
              </h2>

              {!selectedContractor ? (
                <div className="mt-4 rounded-[20px] border border-dashed border-[var(--line)] bg-[#faf8f8] p-5 text-sm copy-muted">
                  Profil vendor belum tersedia untuk proposal ini.
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  <div className="rounded-[20px] border border-[var(--line)] bg-[#faf8f8] p-4">
                    <p className="font-semibold text-slate-950">{selectedContractor.name}</p>
                    <p className="mt-2 text-sm copy-muted">
                      {selectedContractor.businessField}
                    </p>
                    <div className="mt-4 space-y-2 text-sm text-slate-700">
                      <p>Status verifikasi: {selectedContractor.verificationStatus}</p>
                      <p>NIB: {selectedContractor.nib}</p>
                      <p>Skor rata-rata: {selectedContractor.averageScore}/100</p>
                    </div>
                  </div>

                  <Link href={`/contractors/${selectedContractor.id}`} className="btn btn-secondary w-full">
                    Lihat Profil Vendor
                  </Link>
                </div>
              )}
            </section>
          </aside>
        </section>
      </div>

      <ProposalDetailDrawer
        key={selectedProposal?.proposalId ?? "empty"}
        contractor={selectedContractor}
        onClose={() => setDrawerOpen(false)}
        onUpdateStatus={handleUpdateStatus}
        open={drawerOpen}
        proposal={selectedProposal}
        tenderTitle={tender.title}
      />
    </>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { StatusPill } from "@/components/ui/status-pill";
import type { Contractor } from "@/features/contractor/types";
import type { ProposalStatus, TenderProposal } from "@/features/tender/types";
import { formatCurrency, formatDate } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

type ProposalDetailDrawerProps = {
  contractor?: Contractor;
  onClose: () => void;
  onUpdateStatus: (status: ProposalStatus, internalNotes?: string) => void;
  open: boolean;
  proposal?: TenderProposal;
  tenderTitle: string;
};

const statusActions: Array<{ status: ProposalStatus; label: string; tone: string }> = [
  { status: "under_review", label: "Tandai Under Review", tone: "secondary" },
  { status: "clarification", label: "Minta Klarifikasi", tone: "secondary-accent" },
  { status: "shortlisted", label: "Masukkan Shortlist", tone: "primary" },
  { status: "awarded", label: "Pilih sebagai Awarded", tone: "primary" },
  { status: "not_selected", label: "Tandai Tidak Dipilih", tone: "secondary" },
];

export function ProposalDetailDrawer({
  contractor,
  onClose,
  onUpdateStatus,
  open,
  proposal,
  tenderTitle,
}: ProposalDetailDrawerProps) {
  const [internalNotes, setInternalNotes] = useState(proposal?.internalNotes ?? "");

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose, open]);

  const availableDocuments = useMemo(
    () => proposal?.documents ?? [],
    [proposal?.documents],
  );

  if (!open || !proposal) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/30 backdrop-blur-[1px]"
      onClick={onClose}
      role="presentation"
    >
      <aside
        aria-label="Proposal detail drawer"
        className="h-full w-full max-w-2xl overflow-y-auto border-l border-[var(--line)] bg-white shadow-[-24px_0_48px_-32px_rgba(15,23,42,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] px-6 py-6 sm:px-8">
          <div>
            <p className="code-label">Detail proposal</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              {proposal.vendorName}
            </h2>
            <p className="mt-2 text-sm leading-7 copy-muted">{tenderTitle}</p>
          </div>
          <button type="button" onClick={onClose} className="btn btn-secondary px-4 py-2">
            Tutup
          </button>
        </div>

        <div className="space-y-6 px-6 py-6 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <StatusPill>{getStatusLabel(proposal.status)}</StatusPill>
            <p className="text-sm copy-muted">Nomor proposal: {proposal.proposalId}</p>
          </div>

          <section className="tender-card-soft p-5">
            <p className="code-label">Snapshot vendor</p>
            {contractor ? (
              <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="code-label">Nama perusahaan</dt>
                  <dd className="mt-2 font-medium text-slate-900">{contractor.name}</dd>
                </div>
                <div>
                  <dt className="code-label">Status verifikasi</dt>
                  <dd className="mt-2 font-medium text-slate-900">
                    {contractor.verificationStatus}
                  </dd>
                </div>
                <div>
                  <dt className="code-label">NIB</dt>
                  <dd className="mt-2 font-medium text-slate-900">{contractor.nib}</dd>
                </div>
                <div>
                  <dt className="code-label">NPWP</dt>
                  <dd className="mt-2 font-medium text-slate-900">{contractor.npwp}</dd>
                </div>
                <div>
                  <dt className="code-label">PIC</dt>
                  <dd className="mt-2 font-medium text-slate-900">
                    {contractor.picName} · {contractor.picTitle}
                  </dd>
                </div>
                <div>
                  <dt className="code-label">Kontak</dt>
                  <dd className="mt-2 font-medium text-slate-900">
                    {contractor.email} · {contractor.phone}
                  </dd>
                </div>
              </div>
            ) : (
              <p className="mt-3 text-sm copy-muted">
                Profil vendor detail belum tersedia untuk proposal ini.
              </p>
            )}
          </section>

          <section className="tender-card p-5">
            <p className="code-label">Ringkasan penawaran</p>
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="code-label">Harga penawaran</dt>
                <dd className="mt-2 font-medium text-slate-900">
                  {formatCurrency(proposal.offeredPrice)}
                </dd>
              </div>
              <div>
                <dt className="code-label">Durasi pekerjaan</dt>
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
              <div>
                <dt className="code-label">Masa berlaku penawaran</dt>
                <dd className="mt-2 font-medium text-slate-900">
                  {proposal.offerValidityDays} hari
                </dd>
              </div>
              <div>
                <dt className="code-label">Tanggal submit</dt>
                <dd className="mt-2 font-medium text-slate-900">
                  {formatDate(proposal.submittedAt)}
                </dd>
              </div>
            </dl>
          </section>

          <section className="tender-card p-5">
            <p className="code-label">Metode kerja</p>
            <p className="mt-3 text-sm leading-7 text-slate-700">{proposal.workMethod}</p>
          </section>

          <section className="tender-card p-5">
            <p className="code-label">Pengalaman relevan</p>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              {proposal.relevantExperience}
            </p>
          </section>

          <section className="tender-card p-5">
            <p className="code-label">Peralatan utama</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {proposal.mainEquipment.map((equipment) => (
                <span
                  key={equipment}
                  className="rounded-full border border-[var(--line)] bg-[#faf8f8] px-3 py-2 text-sm text-slate-700"
                >
                  {equipment}
                </span>
              ))}
            </div>
          </section>

          <section className="tender-card p-5">
            <p className="code-label">Dokumen pengajuan</p>
            <div className="mt-4 grid gap-3">
              {availableDocuments.map((document) => (
                <div
                  key={document.type}
                  className="flex items-center justify-between gap-3 rounded-[18px] border border-[var(--line)] bg-[#faf8f8] px-4 py-3"
                >
                  <span className="text-sm text-slate-700">{document.label}</span>
                  <StatusPill>{getStatusLabel(document.status)}</StatusPill>
                </div>
              ))}
            </div>
          </section>

          <section className="tender-card p-5">
            <p className="code-label">Catatan vendor</p>
            <p className="mt-3 text-sm leading-7 text-slate-700">{proposal.vendorNotes}</p>
          </section>

          <section className="tender-card p-5">
            <p className="code-label">Catatan internal</p>
            <textarea
              value={internalNotes}
              onChange={(event) => setInternalNotes(event.target.value)}
              className="mt-3 tender-textarea min-h-28 w-full"
              placeholder="Tambahkan catatan internal untuk kebutuhan demo review."
            />
          </section>

          <div className="grid gap-3">
            {statusActions.map((action) => (
              <button
                key={action.status}
                type="button"
                onClick={() => onUpdateStatus(action.status, internalNotes)}
                className={
                  action.tone === "primary"
                    ? "btn btn-primary w-full"
                    : action.tone === "secondary-accent"
                      ? "btn btn-secondary-accent w-full"
                      : "btn btn-secondary w-full"
                }
              >
                {action.label}
              </button>
            ))}
            {contractor ? (
              <Link href={`/contractors/${contractor.id}`} className="btn btn-secondary-accent w-full">
                Lihat Profil Vendor
              </Link>
            ) : null}
          </div>
        </div>
      </aside>
    </div>
  );
}

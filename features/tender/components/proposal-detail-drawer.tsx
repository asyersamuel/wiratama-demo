"use client";

import Link from "next/link";
import { useEffect } from "react";
import { StatusPill } from "@/components/ui/status-pill";
import type { Contractor } from "@/features/contractor/types";
import type { TenderProposal } from "@/features/tender/types";
import { formatCurrency } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

type ProposalDetailDrawerProps = {
  contractor?: Contractor;
  onClose: () => void;
  open: boolean;
  proposal?: TenderProposal;
  tenderTitle: string;
};

export function ProposalDetailDrawer({
  contractor,
  onClose,
  open,
  proposal,
  tenderTitle,
}: ProposalDetailDrawerProps) {
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
            <p className="code-label">Proposal Detail</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              {proposal.contractorName}
            </h2>
            <p className="mt-2 text-sm leading-7 copy-muted">{tenderTitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary px-4 py-2"
          >
            Close
          </button>
        </div>

        <div className="space-y-6 px-6 py-6 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <StatusPill tone="accent">{getStatusLabel(proposal.status)}</StatusPill>
            <p className="text-sm copy-muted">Selected proposal for internal review.</p>
          </div>

          <section className="tender-card-soft p-5">
            <p className="code-label">Proposal Summary</p>
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="code-label">Offered Price</dt>
                <dd className="mt-2 font-medium text-slate-900">
                  {formatCurrency(proposal.offeredPrice)}
                </dd>
              </div>
              <div>
                <dt className="code-label">Estimated Duration</dt>
                <dd className="mt-2 font-medium text-slate-900">
                  {proposal.estimatedDurationDays} days
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="code-label">Technical Fit</dt>
                <dd className="mt-2 text-sm leading-7 text-slate-700">
                  {proposal.technicalFit}
                </dd>
              </div>
            </dl>
          </section>

          <section className="tender-card p-5">
            <p className="code-label">Relevant Experience</p>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              {proposal.relevantExperience}
            </p>
          </section>

          <section className="tender-card p-5">
            <p className="code-label">Submitted Documents</p>
            {proposal.submittedDocuments?.length ? (
              <ul className="mt-4 space-y-2">
                {proposal.submittedDocuments.map((document) => (
                  <li
                    key={document}
                    className="rounded-[18px] border border-[var(--line)] bg-[#faf8f8] px-4 py-3 text-sm text-slate-700"
                  >
                    {document}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm leading-7 copy-muted">
                No submitted documents are listed for this demo proposal.
              </p>
            )}
          </section>

          <section className="tender-card p-5">
            <p className="code-label">Internal Notes</p>
            <p className="mt-3 text-sm leading-7 text-slate-700">{proposal.notes}</p>
          </section>

          <div className="grid gap-3">
            <button type="button" className="btn btn-secondary w-full">
              Mark as Reviewed
            </button>
            <button type="button" className="btn btn-secondary-accent w-full">
              Request Clarification
            </button>
            <button type="button" className="btn btn-primary w-full">
              Shortlist Candidate
            </button>
            {contractor ? (
              <Link
                href={`/contractors/${contractor.id}`}
                className="btn btn-secondary-accent w-full"
              >
                View Contractor History
              </Link>
            ) : (
              <span className="btn btn-secondary-accent w-full cursor-not-allowed opacity-50">
                View Contractor History
              </span>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

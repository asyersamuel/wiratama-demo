"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { StatusPill } from "@/components/ui/status-pill";
import { ProposalComparisonTable } from "@/features/tender/components/proposal-comparison-table";
import { ProposalDetailDrawer } from "@/features/tender/components/proposal-detail-drawer";
import type { Contractor } from "@/features/contractor/types";
import type { Tender } from "@/features/tender/types";
import { formatCurrency, formatDate } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

type InternalTenderReviewDetailProps = {
  contractors: Contractor[];
  tender: Tender;
};

export function InternalTenderReviewDetail({
  contractors,
  tender,
}: InternalTenderReviewDetailProps) {
  const [selectedProposalId, setSelectedProposalId] = useState(
    tender.proposals[0]?.id ?? "",
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  const selectedProposal =
    tender.proposals.find((proposal) => proposal.id === selectedProposalId) ??
    tender.proposals[0];
  const selectedContractor = useMemo(
    () =>
      contractors.find((contractor) => contractor.id === selectedProposal?.vendorId),
    [contractors, selectedProposal?.vendorId],
  );

  const openProposal = (proposalId: string) => {
    setSelectedProposalId(proposalId);
    setDrawerOpen(true);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-4">
          <Link
            href="/tender/internal"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition hover:text-[var(--accent-strong)]"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Internal Review
          </Link>

          <section className="tender-card p-6 sm:p-7">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-3xl">
                <p className="code-label">{tender.code}</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  {tender.title}
                </h1>
                <p className="mt-4 text-base leading-8 copy-muted">
                  {tender.description}
                </p>
              </div>
              <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
            </div>

            <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-4">
              <div>
                <dt className="code-label">Estimated Value</dt>
                <dd className="mt-2 font-medium text-slate-900">
                  {formatCurrency(tender.estimatedValue)}
                </dd>
              </div>
              <div>
                <dt className="code-label">Deadline</dt>
                <dd className="mt-2 font-medium text-slate-900">
                  {formatDate(tender.deadline)}
                </dd>
              </div>
              <div>
                <dt className="code-label">Submission Count</dt>
                <dd className="mt-2 font-medium text-slate-900">
                  {tender.proposals.length}
                </dd>
              </div>
              <div>
                <dt className="code-label">Review Focus</dt>
                <dd className="mt-2 font-medium text-slate-900">
                  Technical fit, pricing, and contractor history
                </dd>
              </div>
            </dl>
          </section>
        </div>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <section className="tender-card p-6 sm:p-7">
              <div className="border-b border-[var(--line)] pb-5">
                <p className="code-label">Submitted Contractors</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                  Review Submitted Proposals
                </h2>
                <p className="mt-3 text-sm leading-7 copy-muted">
                  Open a proposal to inspect contractor detail without leaving this
                  tender review page.
                </p>
              </div>

              <div className="mt-6 space-y-4">
                {tender.proposals.map((proposal) => {
                  const isSelected = proposal.id === selectedProposal?.id;

                  return (
                    <article
                      key={proposal.id}
                      className={`rounded-[22px] border p-5 transition ${
                        isSelected
                          ? "border-[#d8b1b9] bg-[var(--accent-soft)]/55"
                          : "border-[var(--line)] bg-[#faf8f8] hover:border-[#ead8dc] hover:bg-[#fcf7f8]"
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-base font-semibold text-slate-950">
                            {proposal.contractorName}
                          </p>
                          <p className="mt-2 text-sm copy-muted">
                            Submitted for {tender.code}
                          </p>
                        </div>
                        <StatusPill>{getStatusLabel(proposal.status)}</StatusPill>
                      </div>

                      <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-4">
                        <div>
                          <dt className="code-label">Offered Price</dt>
                          <dd className="mt-2 font-medium text-slate-900">
                            {formatCurrency(proposal.offeredPrice)}
                          </dd>
                        </div>
                        <div>
                          <dt className="code-label">Duration</dt>
                          <dd className="mt-2 font-medium text-slate-900">
                            {proposal.estimatedDurationDays} days
                          </dd>
                        </div>
                        <div>
                          <dt className="code-label">Submitted Date</dt>
                          <dd className="mt-2 font-medium text-slate-900">
                            {formatDate(proposal.submittedAt)}
                          </dd>
                        </div>
                        <div>
                          <dt className="code-label">Proposal Status</dt>
                          <dd className="mt-2 font-medium text-slate-900">
                            {getStatusLabel(proposal.status)}
                          </dd>
                        </div>
                      </dl>

                      <button
                        type="button"
                        onClick={() => openProposal(proposal.id)}
                        className={isSelected ? "mt-5 btn btn-primary" : "mt-5 btn btn-secondary"}
                      >
                        View Proposal
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="tender-card p-6 sm:p-7">
              <div className="border-b border-[var(--line)] pb-5">
                <p className="code-label">Proposal Comparison</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                  Compare Submitted Proposals
                </h2>
                <p className="mt-3 text-sm leading-7 copy-muted">
                  Compare only the proposals submitted to this tender package.
                </p>
              </div>

              <div className="mt-6">
                <ProposalComparisonTable
                  actionLabel="View Proposal"
                  onSelectProposal={(proposal) => openProposal(proposal.id)}
                  proposals={tender.proposals}
                  selectedProposalId={selectedProposal?.id}
                />
              </div>
            </section>
          </div>

          <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
            <section className="tender-card p-6">
              <p className="code-label">Decision Support Insight</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">
                Internal Review Context
              </h2>
              <p className="mt-3 text-sm leading-7 copy-muted">
                These proposals can be reviewed as shortlist candidates based on
                pricing, duration, technical fit, and contractor history. Final
                decisions remain with the PT WIP procurement team.
              </p>
            </section>

            <section className="tender-card p-6">
              <p className="code-label">Contractor History Preview</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">
                {selectedProposal?.contractorName ?? "Partner Context"}
              </h2>

              {!selectedContractor ? (
                <div className="mt-5 rounded-[20px] border border-dashed border-[var(--line)] bg-[#faf8f8] p-5 text-sm copy-muted">
                  No linked contractor history is available for the currently selected proposal.
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  <div className="rounded-[20px] border border-[var(--line)] bg-[#faf8f8] p-4">
                    <p className="font-semibold text-slate-950">
                      {selectedContractor.name}
                    </p>
                    <p className="mt-2 text-sm copy-muted">
                      {selectedContractor.category} / {selectedContractor.specialization}
                    </p>
                    <div className="mt-4 space-y-2 text-sm text-slate-700">
                      <p>Completed Projects: {selectedContractor.completedProjects}</p>
                      <p>Average Rating: {selectedContractor.averageScore}/100</p>
                      <p>On-Time Record: {selectedContractor.onTimeRecord}</p>
                    </div>
                  </div>

                  <Link
                    href={`/contractors/${selectedContractor.id}`}
                    className="btn btn-secondary w-full"
                  >
                    View Contractor History
                  </Link>
                </div>
              )}
            </section>
          </aside>
        </section>
      </div>

      <ProposalDetailDrawer
        contractor={selectedContractor}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        proposal={selectedProposal}
        tenderTitle={tender.title}
      />
    </>
  );
}

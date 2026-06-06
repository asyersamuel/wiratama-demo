import Link from "next/link";
import { StatusPill } from "@/components/ui/status-pill";
import { listContractors } from "@/features/contractor/service";
import { ProposalComparisonTable } from "@/features/tender/components/proposal-comparison-table";
import {
  getFeaturedTenderComparison,
  getInternalTenderSummary,
  getTendersUnderEvaluation,
} from "@/features/tender/service";
import { formatCurrency, formatDate } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

export default async function InternalTenderPage() {
  const [summary, evaluationTenders, featuredComparison, contractors] =
    await Promise.all([
      getInternalTenderSummary(),
      getTendersUnderEvaluation(),
      getFeaturedTenderComparison(),
      listContractors(),
    ]);

  const relatedContractors = Array.from(
    new Map(
      (featuredComparison?.proposals ?? []).flatMap((proposal) => {
        const contractor = contractors.find(
          (item) => item.id === proposal.vendorId,
        );

        return contractor ? [[contractor.id, contractor] as const] : [];
      }),
    ).values(),
  );

  const recommendedContractor = contractors.find(
    (contractor) =>
      contractor.id === featuredComparison?.recommendedProposal?.vendorId,
  );

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <p className="code-label">Tender Portal / Internal View</p>
        <div className="tender-card p-7 sm:p-9">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <span className="eyebrow">Internal Procurement Workspace</span>
              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Internal Procurement View
              </h1>
              <p className="mt-4 text-base leading-8 copy-muted">
                Review evaluation-stage tenders, compare vendor submissions, and support shortlist decisions with relevant contractor history.
              </p>
            </div>

            <div className="rounded-[24px] border border-[#ead8dc] bg-[#fcf7f8] p-5 xl:max-w-sm">
              <p className="code-label">Workspace Note</p>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                This is still an MVP review surface. The actions below remain visual and do not trigger approvals, notifications, or backend changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="tender-card p-5">
          <p className="code-label">active tenders</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {summary.activeTenders}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Open and evaluation-stage tenders requiring procurement attention.
          </p>
        </article>
        <article className="tender-card p-5">
          <p className="code-label">incoming proposals</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {summary.incomingProposals}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Proposal records visible across the active tender pipeline.
          </p>
        </article>
        <article className="tender-card p-5">
          <p className="code-label">need evaluation</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {summary.needEvaluation}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Submissions still awaiting final review or clarification.
          </p>
        </article>
        <article className="tender-card p-5">
          <p className="code-label">recommended vendor</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {summary.recommendedVendor}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Current best-fit vendor from the featured comparison set.
          </p>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.18fr)_340px]">
        <div className="space-y-6">
          <section className="tender-card p-6 sm:p-7">
            <div className="border-b border-[var(--line)] pb-5">
              <p className="code-label">Tenders Under Evaluation</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                Current Review Queue
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              {evaluationTenders.map((tender) => (
                <article
                  key={tender.id}
                  className="rounded-[22px] border border-[var(--line)] bg-[#faf8f8] p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="max-w-3xl">
                      <p className="code-label">{tender.code}</p>
                      <h3 className="mt-2 text-lg font-semibold text-slate-950">
                        {tender.title}
                      </h3>
                      <p className="mt-2 text-sm copy-muted">
                        {tender.category} / {tender.location} / {tender.zone}
                      </p>
                    </div>
                    <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
                  </div>

                  <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-4">
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
                      <dt className="code-label">Start Date</dt>
                      <dd className="mt-2 font-medium text-slate-900">
                        {formatDate(tender.startDate)}
                      </dd>
                    </div>
                    <div>
                      <dt className="code-label">Incoming Proposals</dt>
                      <dd className="mt-2 font-medium text-slate-900">
                        {tender.proposals.length}
                      </dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>

          {featuredComparison ? (
            <section className="tender-card p-6 sm:p-7">
              <div className="border-b border-[var(--line)] pb-5">
                <p className="code-label">Proposal Comparison</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                  {featuredComparison.tender.title}
                </h2>
              </div>

              <div className="mt-6">
                <ProposalComparisonTable
                  proposals={featuredComparison.proposals}
                  recommendedProposalId={featuredComparison.recommendedProposal?.id}
                />
              </div>
            </section>
          ) : null}
        </div>

        <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
          {featuredComparison?.recommendedProposal ? (
            <section className="tender-card-soft p-6">
              <p className="code-label">Recommended Vendor</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                {featuredComparison.recommendedProposal.contractorName}
              </h2>
              <StatusPill tone="accent">
                {getStatusLabel(featuredComparison.recommendedProposal.status)}
              </StatusPill>

              <dl className="mt-5 grid gap-4 text-sm">
                <div>
                  <dt className="code-label">Offered Price</dt>
                  <dd className="mt-2 font-medium text-slate-900">
                    {formatCurrency(featuredComparison.recommendedProposal.offeredPrice)}
                  </dd>
                </div>
                <div>
                  <dt className="code-label">Duration</dt>
                  <dd className="mt-2 font-medium text-slate-900">
                    {featuredComparison.recommendedProposal.estimatedDurationDays} days
                  </dd>
                </div>
                <div>
                  <dt className="code-label">Score</dt>
                  <dd className="mt-2 font-medium text-slate-900">
                    {featuredComparison.recommendedProposal.score ?? "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="code-label">Technical Fit</dt>
                  <dd className="mt-2 font-medium text-slate-900">
                    {featuredComparison.recommendedProposal.technicalFit}
                  </dd>
                </div>
              </dl>

              <p className="mt-5 text-sm leading-7 text-slate-700">
                {featuredComparison.recommendedProposal.recommendation}
              </p>

              <div className="mt-6 grid gap-3">
                <button
                  type="button"
                  className="btn btn-primary w-full"
                >
                  Mark as Shortlisted
                </button>
                <button
                  type="button"
                  className="btn btn-secondary-accent w-full"
                >
                  Request Clarification
                </button>
                {recommendedContractor ? (
                  <Link
                    href={`/contractors/${recommendedContractor.id}`}
                    className="btn btn-secondary w-full"
                  >
                    View Contractor History
                  </Link>
                ) : (
                  <span className="btn btn-secondary w-full opacity-50 cursor-not-allowed">
                    View Contractor History
                  </span>
                )}
              </div>
            </section>
          ) : null}

          <section className="tender-card p-6">
            <p className="code-label">Contractor History Preview</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">
              Partner Context
            </h2>

            {relatedContractors.length === 0 ? (
              <div className="mt-5 rounded-[20px] border border-dashed border-[var(--line)] bg-[#faf8f8] p-5 text-sm copy-muted">
                No linked contractor history is available for the current comparison set.
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                {relatedContractors.map((contractor) => (
                  <article
                    key={contractor.id}
                    className="rounded-[20px] border border-[var(--line)] bg-[#faf8f8] p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-slate-950">
                          {contractor.name}
                        </h3>
                        <p className="mt-1 text-sm copy-muted">
                          {contractor.specialization}
                        </p>
                      </div>
                      <StatusPill>{contractor.status}</StatusPill>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-slate-700">
                      <p>Completed Projects: {contractor.completedProjects}</p>
                      <p>Average Rating: {contractor.averageScore}/100</p>
                      <p>On-Time Record: {contractor.onTimeRecord}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </aside>
      </section>
    </div>
  );
}

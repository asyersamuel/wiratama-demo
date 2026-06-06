import Link from "next/link";
import { StatusPill } from "@/components/ui/status-pill";
import type { InternalTenderSummary, Tender, TenderProposal } from "@/features/tender/types";
import { formatCurrency, formatDate } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

type InternalReviewListProps = {
  metrics: InternalTenderSummary;
  tenders: Tender[];
};

const tenderFlow = ["Draft", "Open", "Under Review", "Shortlisting", "Awarded", "Closed"];
const proposalFlow = [
  "Submitted",
  "Under Review",
  "Clarification",
  "Shortlisted",
  "Awarded",
  "Not Selected",
];

function getNeedReviewCount(proposals: TenderProposal[]) {
  return proposals.filter(
    (proposal) =>
      proposal.status === "submitted" || proposal.status === "under_review",
  ).length;
}

export function InternalReviewList({
  metrics,
  tenders,
}: InternalReviewListProps) {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="tender-card p-5">
          <p className="code-label">tender packages</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {metrics.tenderPackages}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Tender packages currently visible in the internal review queue.
          </p>
        </article>
        <article className="tender-card p-5">
          <p className="code-label">total submissions</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {metrics.totalSubmissions}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Proposal submissions currently available for the two demo review packages.
          </p>
        </article>
        <article className="tender-card p-5">
          <p className="code-label">need review</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {metrics.needReview}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Proposals still marked as submitted or under review by the PT WIP team.
          </p>
        </article>
        <article className="tender-card p-5">
          <p className="code-label">shortlisted</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {metrics.shortlisted}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Proposal submissions already moved into shortlist discussion.
          </p>
        </article>
      </section>

      <section className="tender-card p-6 sm:p-7">
        <div className="border-b border-[var(--line)] pb-5">
          <p className="code-label">Tender & Proposal Status Guide</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            Compact Review Pipeline
          </h2>
          <p className="mt-3 text-sm leading-7 copy-muted">
            Use this compact guide to explain how tender packages and proposals move
            through the internal procurement review process.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[22px] border border-[var(--line)] bg-[#faf8f8] p-5">
            <p className="code-label">Tender Flow</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-medium text-slate-700">
              {tenderFlow.map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-[var(--line)] bg-white px-3 py-2">
                    {step}
                  </span>
                  {index < tenderFlow.length - 1 ? (
                    <span className="text-slate-400">-&gt;</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[22px] border border-[var(--line)] bg-[#faf8f8] p-5">
            <p className="code-label">Proposal Flow</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-medium text-slate-700">
              {proposalFlow.map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-[var(--line)] bg-white px-3 py-2">
                    {step}
                  </span>
                  {index < proposalFlow.length - 1 ? (
                    <span className="text-slate-400">-&gt;</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="tender-card p-6 sm:p-7">
        <div className="border-b border-[var(--line)] pb-5">
          <p className="code-label">Tender Review Queue</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            Select a Tender Package
          </h2>
          <p className="mt-3 text-sm leading-7 copy-muted">
            Choose one tender package to review submitted contractors and open
            proposal detail in the next step.
          </p>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {tenders.map((tender) => {
            const needReviewCount = getNeedReviewCount(tender.proposals);

            return (
              <article
                key={tender.id}
                className="rounded-[22px] border border-[var(--line)] bg-[#faf8f8] p-5 transition hover:border-[#ead8dc] hover:bg-[#fcf7f8]"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-3xl">
                    <p className="code-label">{tender.code}</p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-950">
                      {tender.title}
                    </h3>
                  </div>
                  <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
                </div>

                <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="code-label">Deadline</dt>
                    <dd className="mt-2 font-medium text-slate-900">
                      {formatDate(tender.deadline)}
                    </dd>
                  </div>
                  <div>
                    <dt className="code-label">Estimated Value</dt>
                    <dd className="mt-2 font-medium text-slate-900">
                      {formatCurrency(tender.estimatedValue)}
                    </dd>
                  </div>
                  <div>
                    <dt className="code-label">Submission Count</dt>
                    <dd className="mt-2 font-medium text-slate-900">
                      {tender.proposals.length}
                    </dd>
                  </div>
                  <div>
                    <dt className="code-label">Need Review</dt>
                    <dd className="mt-2 font-medium text-slate-900">
                      {needReviewCount}
                    </dd>
                  </div>
                </dl>

                <Link
                  href={`/tender/internal/${tender.id}`}
                  className="mt-5 btn btn-primary"
                >
                  Review Tender
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

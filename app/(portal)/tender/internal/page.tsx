import Link from "next/link";
import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { MetricCard } from "@/components/ui/metric-card";
import { SectionCard } from "@/components/ui/section-card";
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

  const relatedContractors =
    featuredComparison?.proposals.flatMap((proposal) => {
      const contractor = contractors.find(
        (item) => item.id === proposal.vendorId,
      );

      return contractor ? [contractor] : [];
    }) ?? [];

  const recommendedContractor = contractors.find(
    (contractor) =>
      contractor.id === featuredComparison?.recommendedProposal?.vendorId,
  );

  return (
    <>
      <PortalPageIntro
        eyebrow="Internal Procurement"
        title="Internal Procurement View"
        description="Review incoming proposals, compare vendor offers, and preview contractor history before shortlisting."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="active tenders"
          value={String(summary.activeTenders)}
          hint="Open and evaluation-stage tenders requiring procurement attention."
        />
        <MetricCard
          label="incoming proposals"
          value={String(summary.incomingProposals)}
          hint="Proposal records visible across the active tender pipeline."
        />
        <MetricCard
          label="need evaluation"
          value={String(summary.needEvaluation)}
          hint="Submissions still awaiting final review or clarification."
        />
        <MetricCard
          label="recommended vendor"
          value={summary.recommendedVendor}
          hint="Current best-fit vendor based on the featured comparison."
        />
      </section>

      <SectionCard
        title="Tender Under Evaluation"
        description="Use this section to explain which package is actively being reviewed by PT WIP and why proposal comparison matters."
      >
        <div className="grid gap-4">
          {evaluationTenders.map((tender) => (
            <article
              key={tender.id}
              className="rounded-[24px] border border-[var(--line)] bg-white/80 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-3xl">
                  <p className="code-label">{tender.code}</p>
                  <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-slate-950">
                    {tender.title}
                  </h2>
                  <p className="mt-2 text-sm copy-muted">
                    {tender.category} · {tender.location} · {tender.zone}
                  </p>
                </div>
                <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
              </div>

              <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2 xl:grid-cols-4">
                <p>Estimated Value: {formatCurrency(tender.estimatedValue)}</p>
                <p>Deadline: {formatDate(tender.deadline)}</p>
                <p>Start Date: {formatDate(tender.startDate)}</p>
                <p>Incoming Proposals: {tender.proposals.length}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>

      {featuredComparison ? (
        <SectionCard
          title={`Proposal Comparison · ${featuredComparison.tender.title}`}
          description="The comparison table stays intentionally lightweight: enough to explain decision-making without turning the demo into a full scoring engine."
        >
          <ProposalComparisonTable
            proposals={featuredComparison.proposals}
            recommendedProposalId={featuredComparison.recommendedProposal?.id}
          />
        </SectionCard>
      ) : null}

      {featuredComparison?.recommendedProposal ? (
        <SectionCard
          title="Recommended Vendor Highlight"
          description="This card gives the presenter a clear shortlist narrative: why the vendor stands out, what the commercial offer looks like, and how history supports confidence."
        >
          <div className="rounded-[26px] border border-[#d8b1b9] bg-[var(--accent-soft)] p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-3xl">
                <p className="code-label">Recommended Vendor</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                  {featuredComparison.recommendedProposal.contractorName}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {featuredComparison.recommendedProposal.recommendation}
                </p>
              </div>
              <StatusPill>
                {getStatusLabel(featuredComparison.recommendedProposal.status)}
              </StatusPill>
            </div>

            <div className="mt-5 grid gap-4 text-sm text-slate-700 md:grid-cols-2 xl:grid-cols-4">
              <p>
                Offered Price:{" "}
                {formatCurrency(featuredComparison.recommendedProposal.offeredPrice)}
              </p>
              <p>
                Duration: {featuredComparison.recommendedProposal.estimatedDurationDays}{" "}
                days
              </p>
              <p>
                Score: {featuredComparison.recommendedProposal.score ?? "N/A"}
              </p>
              <p>
                Technical Fit:{" "}
                {featuredComparison.recommendedProposal.technicalFit}
              </p>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-700">
              {featuredComparison.recommendedProposal.relevantExperience}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-92"
              >
                Mark as Shortlisted
              </button>
              <button
                type="button"
                className="rounded-full border border-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent)] transition hover:bg-white"
              >
                Request Clarification
              </button>
              {recommendedContractor ? (
                <Link
                  href={`/contractors/${recommendedContractor.id}`}
                  className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
                >
                  View Contractor History
                </Link>
              ) : (
                <span className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-slate-500">
                  View Contractor History
                </span>
              )}
            </div>
          </div>
        </SectionCard>
      ) : null}

      <SectionCard
        title="Contractor History Preview"
        description="This is the long-term value story for PT WIP: tender decisions can build on retained contractor knowledge instead of starting from zero every cycle."
      >
        {relatedContractors.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-[var(--line)] bg-white/70 p-6 text-sm copy-muted">
            No linked contractor history is available for the current
            comparison set.
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-3">
            {relatedContractors.map((contractor) => (
              <article
                key={contractor.id}
                className="rounded-[24px] border border-[var(--line)] bg-white/80 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-950">
                      {contractor.name}
                    </h2>
                    <p className="mt-2 text-sm copy-muted">
                      {contractor.specialization}
                    </p>
                  </div>
                  <StatusPill>{contractor.status}</StatusPill>
                </div>

                <div className="mt-4 space-y-2 text-sm text-slate-700">
                  <p>Completed Projects: {contractor.completedProjects}</p>
                  <p>Average Rating: {contractor.averageScore}/100</p>
                  <p>On-Time Record: {contractor.onTimeRecord}</p>
                  <p>
                    Last Relevant Project:{" "}
                    {contractor.history[0]?.project ??
                      "Project history not available"}
                  </p>
                </div>

                <Link
                  href={`/contractors/${contractor.id}`}
                  className="mt-5 inline-flex text-sm font-semibold text-[var(--accent-strong)]"
                >
                  Open Contractor Record
                </Link>
              </article>
            ))}
          </div>
        )}
      </SectionCard>
    </>
  );
}

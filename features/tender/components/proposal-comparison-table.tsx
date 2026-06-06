import { StatusPill } from "@/components/ui/status-pill";
import type { TenderProposal } from "@/features/tender/types";
import { formatCurrency } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

type ProposalComparisonTableProps = {
  proposals: TenderProposal[];
  recommendedProposalId?: string;
};

export function ProposalComparisonTable({
  proposals,
  recommendedProposalId,
}: ProposalComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[920px] w-full border-separate border-spacing-0">
        <thead>
          <tr className="text-left">
            {[
              "Contractor",
              "Offered Price",
              "Duration",
              "Experience",
              "Technical Fit",
              "Recommendation",
              "Status",
            ].map((label) => (
              <th
                key={label}
                className="border-b border-[var(--line)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal) => {
            const isRecommended = proposal.id === recommendedProposalId;

            return (
              <tr
                key={proposal.id}
                className={isRecommended ? "bg-[var(--accent-soft)]/65" : ""}
              >
                <td className="border-b border-[var(--line)] px-4 py-4 align-top">
                  <p className="font-semibold text-slate-950">
                    {proposal.contractorName}
                  </p>
                  <p className="mt-1 text-sm copy-muted">
                    {proposal.type === "contractor"
                      ? "Contractor"
                      : "Supplier"}
                  </p>
                </td>
                <td className="border-b border-[var(--line)] px-4 py-4 align-top text-sm text-slate-700">
                  {formatCurrency(proposal.offeredPrice)}
                </td>
                <td className="border-b border-[var(--line)] px-4 py-4 align-top text-sm text-slate-700">
                  {proposal.estimatedDurationDays} days
                </td>
                <td className="border-b border-[var(--line)] px-4 py-4 align-top text-sm leading-7 text-slate-700">
                  {proposal.relevantExperience}
                </td>
                <td className="border-b border-[var(--line)] px-4 py-4 align-top text-sm leading-7 text-slate-700">
                  {proposal.technicalFit}
                </td>
                <td className="border-b border-[var(--line)] px-4 py-4 align-top text-sm leading-7 text-slate-700">
                  <span
                    className={
                      isRecommended
                        ? "font-semibold text-[var(--accent-strong)]"
                        : undefined
                    }
                  >
                    {proposal.recommendation}
                  </span>
                </td>
                <td className="border-b border-[var(--line)] px-4 py-4 align-top">
                  <StatusPill>{getStatusLabel(proposal.status)}</StatusPill>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

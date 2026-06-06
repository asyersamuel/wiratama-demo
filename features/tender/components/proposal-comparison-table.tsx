import { StatusPill } from "@/components/ui/status-pill";
import type { TenderProposal } from "@/features/tender/types";
import { formatCurrency } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

type ProposalComparisonTableProps = {
  actionLabel?: string;
  onSelectProposal?: (proposal: TenderProposal) => void;
  proposals: TenderProposal[];
  selectedProposalId?: string;
};

export function ProposalComparisonTable({
  actionLabel,
  onSelectProposal,
  proposals,
  selectedProposalId,
}: ProposalComparisonTableProps) {
  if (proposals.length === 0) {
    return (
      <div className="rounded-[24px] border border-dashed border-[var(--line)] bg-[#faf8f8] p-5 text-sm copy-muted">
        No submitted proposals are available for comparison in this tender package.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[24px] border border-[var(--line)]">
      <div className="overflow-x-auto">
        <table className="min-w-[860px] w-full border-separate border-spacing-0 bg-white">
          <thead className="bg-[#faf7f7]">
            <tr className="text-left">
              {[
                "Contractor",
                "Offered Price",
                "Duration",
                "Relevant Experience",
                "Technical Fit",
                "Status",
                ...(onSelectProposal ? ["Action"] : []),
              ].map((label) => (
                <th
                  key={label}
                  className="border-b border-[var(--line)] px-4 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {proposals.map((proposal) => {
              const isSelected = proposal.id === selectedProposalId;

              return (
                <tr
                  key={proposal.id}
                  className={`transition hover:bg-[#fcf8f8] ${
                    isSelected ? "bg-[var(--accent-soft)]/65" : "bg-white"
                  }`}
                >
                  <td className="border-b border-[var(--line)] px-4 py-4 align-top">
                    <p className="font-semibold text-slate-950">
                      {proposal.contractorName}
                    </p>
                    <p className="mt-1 text-sm copy-muted">
                      {proposal.type === "contractor"
                        ? "External Contractor"
                        : "Supplier"}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {isSelected ? (
                        <span className="inline-flex rounded-full border border-[#d8b1b9] bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-strong)]">
                          Selected Proposal
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="border-b border-[var(--line)] px-4 py-4 align-top text-sm font-medium text-slate-700">
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
                  <td className="border-b border-[var(--line)] px-4 py-4 align-top">
                    <StatusPill>{getStatusLabel(proposal.status)}</StatusPill>
                  </td>
                  {onSelectProposal ? (
                    <td className="border-b border-[var(--line)] px-4 py-4 align-top">
                      <button
                        type="button"
                        onClick={() => onSelectProposal(proposal)}
                        className={isSelected ? "btn btn-primary" : "btn btn-secondary"}
                      >
                        {actionLabel ?? "View Detail"}
                      </button>
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

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
        Belum ada proposal yang bisa dibandingkan untuk tender ini.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[24px] border border-[var(--line)]">
      <div className="overflow-x-auto">
        <table className="min-w-[820px] w-full border-separate border-spacing-0 bg-white">
          <thead className="bg-[#faf7f7]">
            <tr className="text-left">
              {[
                "Vendor",
                "Harga Penawaran",
                "Durasi",
                "Tenaga Kerja",
                "Pengalaman Relevan",
                "Status",
                ...(onSelectProposal ? ["Aksi"] : []),
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
              const isSelected = proposal.proposalId === selectedProposalId;

              return (
                <tr
                  key={proposal.proposalId}
                  className={`transition hover:bg-[#fcf8f8] ${
                    isSelected ? "bg-[var(--accent-soft)]/65" : "bg-white"
                  }`}
                >
                  <td className="border-b border-[var(--line)] px-4 py-4 align-top">
                    <p className="font-semibold text-slate-950">{proposal.vendorName}</p>
                    <p className="mt-1 text-sm copy-muted">
                      {proposal.vendorType === "contractor" ? "Kontraktor" : "Vendor"}
                    </p>
                  </td>
                  <td className="border-b border-[var(--line)] px-4 py-4 align-top text-sm font-medium text-slate-700">
                    {formatCurrency(proposal.offeredPrice)}
                  </td>
                  <td className="border-b border-[var(--line)] px-4 py-4 align-top text-sm text-slate-700">
                    {proposal.estimatedDurationDays} hari
                  </td>
                  <td className="border-b border-[var(--line)] px-4 py-4 align-top text-sm text-slate-700">
                    {proposal.manpowerCount} orang
                  </td>
                  <td className="border-b border-[var(--line)] px-4 py-4 align-top text-sm leading-7 text-slate-700">
                    {proposal.relevantExperience}
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
                        {actionLabel ?? "Lihat Proposal"}
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

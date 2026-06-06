import { tenders } from "@/features/tender/data/tenders";
import type {
  InternalTenderSummary,
  ProposalStatus,
  Tender,
  TenderStats,
  VendorProposalSummary,
} from "@/features/tender/types";
import { simulateLatency } from "@/lib/mock-api";

const demoVendorId = "prima-infrastruktur-abadi";
const demoVendorName = "PT Prima Infrastruktur Abadi";

function countProposalStatuses(
  proposals: Tender["proposals"],
  statuses: ProposalStatus[],
) {
  return proposals.filter((proposal) => statuses.includes(proposal.status)).length;
}

export async function getTenders(): Promise<Tender[]> {
  await simulateLatency();
  return tenders;
}

export async function getTenderById(id: string): Promise<Tender | undefined> {
  await simulateLatency();
  return tenders.find((item) => item.id === id);
}

export async function getOpenTenders(): Promise<Tender[]> {
  await simulateLatency();
  return tenders.filter((item) => item.status === "open");
}

export async function getReviewTenders(): Promise<Tender[]> {
  await simulateLatency();
  return tenders.filter((item) => item.proposals.length > 0);
}

export async function getInternalReviewTenderById(
  id: string,
): Promise<Tender | undefined> {
  await simulateLatency();
  return tenders.find((item) => item.id === id);
}

export async function getTenderStats(): Promise<TenderStats> {
  await simulateLatency();

  return {
    totalTender: tenders.length,
    activeTender: tenders.filter((item) => item.status !== "draft" && item.status !== "closed")
      .length,
    openTender: tenders.filter((item) => item.status === "open").length,
    underReviewTender: tenders.filter(
      (item) => item.status === "under_review" || item.status === "shortlisting",
    ).length,
    totalEstimatedValue: tenders.reduce(
      (sum, item) => sum + item.estimatedValue,
      0,
    ),
  };
}

export async function getVendorProposalSummary(): Promise<VendorProposalSummary> {
  await simulateLatency();

  const proposals = tenders.flatMap((tender) =>
    tender.proposals.filter((proposal) => proposal.vendorId === demoVendorId),
  );

  return {
    vendorId: demoVendorId,
    vendorName: demoVendorName,
    verificationStatus: "Terverifikasi",
    availableTenders: tenders.filter((item) => item.status === "open").length,
    submittedProposals: proposals.length,
    needAttention: countProposalStatuses(proposals, [
      "submitted",
      "under_review",
      "clarification",
    ]),
    shortlisted: countProposalStatuses(proposals, ["shortlisted"]),
  };
}

export async function getInternalTenderSummary(): Promise<InternalTenderSummary> {
  await simulateLatency();

  const reviewTenders = tenders.filter((item) => item.proposals.length > 0);
  const allProposals = reviewTenders.flatMap((item) => item.proposals);

  return {
    tenderPackages: reviewTenders.length,
    totalSubmissions: allProposals.length,
    needReview: countProposalStatuses(allProposals, [
      "submitted",
      "under_review",
      "clarification",
    ]),
    shortlisted: countProposalStatuses(allProposals, ["shortlisted"]),
  };
}

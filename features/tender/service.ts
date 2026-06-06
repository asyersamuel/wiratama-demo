import { tenders } from "@/features/tender/data/tenders";
import type {
  FeaturedTenderComparison,
  InternalTenderSummary,
  Tender,
  TenderStats,
  VendorProposalSummary,
} from "@/features/tender/types";
import { simulateLatency } from "@/lib/mock-api";

const demoVendorId = "prima-infrastruktur-abadi";
const demoVendorName = "PT Prima Infrastruktur Abadi";
const demoVendorType = "Contractor";
const demoVendorCategory = "Infrastructure";
const demoVendorStatus = "Verified Demo Vendor";
const internalReviewTenderIds = [
  "jalan-utama-zona-a",
  "drainase-utama-zona-a",
] as const;

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

export async function getTendersUnderEvaluation(): Promise<Tender[]> {
  await simulateLatency();
  return tenders.filter(
    (item) => item.status === "under_review" || item.status === "shortlisting",
  );
}

export async function getInternalReviewQueue(): Promise<Tender[]> {
  await simulateLatency();

  return internalReviewTenderIds
    .map((id) => tenders.find((item) => item.id === id))
    .filter((item): item is Tender => Boolean(item));
}

export async function getInternalReviewTenderById(
  id: string,
): Promise<Tender | undefined> {
  await simulateLatency();

  if (!internalReviewTenderIds.includes(id as (typeof internalReviewTenderIds)[number])) {
    return undefined;
  }

  return tenders.find((item) => item.id === id);
}

export async function getTenderStats(): Promise<TenderStats> {
  await simulateLatency();

  return {
    totalTender: tenders.length,
    openTender: tenders.filter((item) => item.status === "open").length,
    underEvaluation: tenders.filter(
      (item) => item.status === "under_review" || item.status === "shortlisting",
    ).length,
    totalEstimatedValue: tenders.reduce(
      (sum, item) => sum + item.estimatedValue,
      0,
    ),
  };
}

export async function getFeaturedTender(): Promise<Tender | undefined> {
  await simulateLatency();

  return (
    tenders.find((item) => item.id === "jalan-utama-zona-a") ??
    tenders.find((item) => item.status === "under_review") ??
    tenders[0]
  );
}

export async function getFeaturedTenderComparison(): Promise<FeaturedTenderComparison | undefined> {
  await simulateLatency();

  const tender =
    tenders.find((item) => item.id === "jalan-utama-zona-a") ??
    tenders.find((item) => item.status === "under_review");

  if (!tender) {
    return undefined;
  }

  const proposals = [...tender.proposals].sort(
    (left, right) => (right.score ?? 0) - (left.score ?? 0),
  );

  const recommendedProposal = proposals.find(
    (item) => item.status === "shortlisted",
  );

  return {
    tender,
    proposals,
    recommendedProposal: recommendedProposal ?? proposals[0],
  };
}

export async function getVendorProposalSummary(): Promise<VendorProposalSummary> {
  await simulateLatency();

  const proposals = tenders.flatMap((tender) =>
    tender.proposals
      .filter((proposal) => proposal.vendorId === demoVendorId)
      .map((proposal) => ({
        tenderId: tender.id,
        tenderCode: tender.code,
        tenderTitle: tender.title,
        offeredPrice: proposal.offeredPrice,
        estimatedDurationDays: proposal.estimatedDurationDays,
        submittedAt: proposal.submittedAt,
        status: proposal.status,
      })),
  );

  return {
    vendorId: demoVendorId,
    vendorName: demoVendorName,
    vendorType: demoVendorType,
    vendorCategory: demoVendorCategory,
    vendorStatus: demoVendorStatus,
    availableTenders: tenders.filter((item) => item.status === "open").length,
    submittedProposals: proposals.length,
    underReview: proposals.filter((item) => item.status === "under_review")
      .length,
    shortlisted: proposals.filter((item) => item.status === "shortlisted")
      .length,
    proposals,
  };
}

export async function getInternalTenderSummary(): Promise<InternalTenderSummary> {
  await simulateLatency();

  const reviewQueue = internalReviewTenderIds
    .map((id) => tenders.find((item) => item.id === id))
    .filter((item): item is Tender => Boolean(item));
  const totalSubmissions = reviewQueue
    .reduce((sum, item) => sum + item.proposals.length, 0);
  const needReview = reviewQueue.reduce(
    (sum, item) =>
      sum +
      item.proposals.filter(
        (proposal) =>
          proposal.status === "submitted" ||
          proposal.status === "under_review",
      ).length,
    0,
  );
  const shortlisted = reviewQueue.reduce(
    (sum, item) =>
      sum +
      item.proposals.filter((proposal) => proposal.status === "shortlisted")
        .length,
    0,
  );

  return {
    tenderPackages: reviewQueue.length,
    totalSubmissions,
    needReview,
    shortlisted,
  };
}

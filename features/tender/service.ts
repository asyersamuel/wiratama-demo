import { tenders } from "@/features/tender/data/tenders";
import type {
  GuestTenderCard,
  InternalTenderSummary,
  ProposalStatus,
  Tender,
  TenderAreaMapItem,
  TenderDeadlineProgress,
  TenderOperationalSummary,
  TenderStats,
  VendorProposalSummary,
} from "@/features/tender/types";
import { simulateLatency } from "@/lib/mock-api";

const demoVendorId = "prima-infrastruktur-abadi";
const demoVendorName = "PT Prima Infrastruktur Abadi";
const DAY_IN_MS = 24 * 60 * 60 * 1000;

function countProposalStatuses(
  proposals: Tender["proposals"],
  statuses: ProposalStatus[],
) {
  return proposals.filter((proposal) => statuses.includes(proposal.status)).length;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getTenderLaunchDate(tender: Tender) {
  return tender.milestones[0]?.date ?? tender.startDate;
}

function getTenderDeadlineProgress(
  tender: Tender,
  referenceDate = new Date(),
): TenderDeadlineProgress {
  const deadline = new Date(tender.deadline);
  const launchDate = new Date(getTenderLaunchDate(tender));
  const totalDuration = Math.max(deadline.getTime() - launchDate.getTime(), DAY_IN_MS);
  const elapsedDuration = referenceDate.getTime() - launchDate.getTime();
  const progressPercent = clamp(
    Math.round((elapsedDuration / totalDuration) * 100),
    0,
    100,
  );
  const daysToDeadline = Math.ceil(
    (deadline.getTime() - referenceDate.getTime()) / DAY_IN_MS,
  );

  let label = "Berjalan";

  if (daysToDeadline < 0) {
    label = "Melewati tenggat";
  } else if (daysToDeadline <= 5) {
    label = "Menuju tenggat";
  } else if (tender.status === "under_review" || tender.status === "shortlisting") {
    label = "Dalam evaluasi";
  }

  return {
    progressPercent,
    daysToDeadline,
    label,
  };
}

function buildTenderAreaMapItem(tender: Tender): TenderAreaMapItem {
  return {
    tenderId: tender.id,
    title: tender.title,
    zone: tender.zone,
    location: tender.location,
    status: tender.status,
    markerLabel: tender.mapPosition.markerLabel,
    shortLabel: tender.mapPosition.shortLabel,
    x: tender.mapPosition.x,
    y: tender.mapPosition.y,
    publicSummary: tender.publicSummary,
    publicValueLabel: tender.publicValueLabel,
  };
}

export function getTenderAreaMapItemsFromTenders(
  tenders: Tender[],
  audience: "vendor" | "internal" | "guest" = "vendor",
): TenderAreaMapItem[] {
  const relevantTenders =
    audience === "guest" ? tenders.filter((item) => item.isPublic) : tenders;

  return relevantTenders.map(buildTenderAreaMapItem);
}

function buildGuestTenderCard(tender: Tender): GuestTenderCard {
  return {
    id: tender.id,
    title: tender.title,
    category: tender.category,
    location: tender.location,
    zone: tender.zone,
    status: tender.status,
    deadline: tender.deadline,
    publicSummary: tender.publicSummary,
    publicValueLabel: tender.publicValueLabel,
  };
}

function buildOperationalSummary(tender: Tender): TenderOperationalSummary {
  return {
    tenderId: tender.id,
    proposalCount: tender.proposals.length,
    needReviewCount: countProposalStatuses(tender.proposals, [
      "submitted",
      "under_review",
      "clarification",
    ]),
    shortlistedCount: countProposalStatuses(tender.proposals, ["shortlisted"]),
    progress: getTenderDeadlineProgress(tender),
    frequentDocuments: tender.frequentDocuments,
    relatedParties: tender.relatedParties,
  };
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

export async function getPublicTenders(): Promise<Tender[]> {
  await simulateLatency();
  return tenders.filter((item) => item.isPublic);
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

export async function getTenderAreaMapItems(
  audience: "vendor" | "internal" | "guest" = "vendor",
): Promise<TenderAreaMapItem[]> {
  await simulateLatency();
  return getTenderAreaMapItemsFromTenders(tenders, audience);
}

export async function getGuestTenderCards(): Promise<GuestTenderCard[]> {
  await simulateLatency();
  return tenders.filter((item) => item.isPublic).map(buildGuestTenderCard);
}

export async function getTenderOperationalSummaries(): Promise<
  TenderOperationalSummary[]
> {
  await simulateLatency();
  return tenders.map(buildOperationalSummary);
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

export function getTenderDeadlineMeta(
  tender: Tender,
  referenceDate = new Date(),
): TenderDeadlineProgress {
  return getTenderDeadlineProgress(tender, referenceDate);
}

export function getNeedReviewProposalCount(proposals: Tender["proposals"]) {
  return countProposalStatuses(proposals, [
    "submitted",
    "under_review",
    "clarification",
  ]);
}

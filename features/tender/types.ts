export type TenderStatus =
  | "draft"
  | "open"
  | "under_review"
  | "shortlisting"
  | "awarded"
  | "closed";

export type ProposalStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "clarification"
  | "shortlisted"
  | "awarded"
  | "not_selected";

export type ProposalVendorType = "contractor" | "supplier";

export type ProposalDocumentType =
  | "proposal_teknis"
  | "proposal_harga"
  | "company_profile"
  | "legal_document"
  | "pengalaman_proyek"
  | "k3_safety_statement"
  | "daftar_peralatan";

export type TenderFrequentDocumentKind =
  | "technical"
  | "commercial"
  | "administrative"
  | "schedule";

export type TenderFrequentDocument = {
  id: string;
  label: string;
  kind: TenderFrequentDocumentKind;
};

export type TenderMapPosition = {
  markerLabel: string;
  shortLabel: string;
  x: number;
  y: number;
};

export type TenderRelatedPartyRole = "contractor" | "vendor";

export type TenderRelatedParty = {
  contractorId: string;
  role: TenderRelatedPartyRole;
  workstream: string;
};

export const proposalDocumentCatalog = [
  { type: "proposal_teknis", label: "Proposal Teknis" },
  { type: "proposal_harga", label: "Proposal Harga / RAB" },
  { type: "company_profile", label: "Company Profile" },
  { type: "legal_document", label: "Legal Document" },
  { type: "pengalaman_proyek", label: "Pengalaman Proyek" },
  { type: "k3_safety_statement", label: "K3 / Safety Statement" },
  { type: "daftar_peralatan", label: "Daftar Peralatan" },
] as const satisfies ReadonlyArray<{
  type: ProposalDocumentType;
  label: string;
}>;

export type TenderMilestone = {
  label: string;
  date: string;
  note: string;
};

export type ProposalDocument = {
  type: ProposalDocumentType;
  label: string;
  status: "ready" | "missing";
  note?: string;
};

export type TenderProposal = {
  proposalId: string;
  tenderId: string;
  vendorId: string;
  vendorName: string;
  vendorType: ProposalVendorType;
  offeredPrice: number;
  estimatedDurationDays: number;
  proposedStartDate: string;
  workMethod: string;
  relevantExperience: string;
  mainEquipment: string[];
  manpowerCount: number;
  offerValidityDays: number;
  vendorNotes: string;
  internalNotes: string;
  submittedAt: string;
  status: ProposalStatus;
  documents: ProposalDocument[];
  score?: number;
};

export type Tender = {
  id: string;
  code: string;
  title: string;
  category: string;
  location: string;
  zone: string;
  estimatedValue: number;
  status: TenderStatus;
  deadline: string;
  startDate: string;
  description: string;
  publicSummary: string;
  publicValueLabel?: string;
  isPublic: boolean;
  scope: string[];
  requirements: string[];
  requiredDocuments: string[];
  frequentDocuments: TenderFrequentDocument[];
  relatedParties: TenderRelatedParty[];
  mapPosition: TenderMapPosition;
  milestones: TenderMilestone[];
  proposals: TenderProposal[];
};

export type TenderStats = {
  totalTender: number;
  activeTender: number;
  openTender: number;
  underReviewTender: number;
  totalEstimatedValue: number;
};

export type VendorProposalSummary = {
  vendorId: string;
  vendorName: string;
  verificationStatus: string;
  availableTenders: number;
  submittedProposals: number;
  needAttention: number;
  shortlisted: number;
};

export type InternalTenderSummary = {
  tenderPackages: number;
  totalSubmissions: number;
  needReview: number;
  shortlisted: number;
};

export type TenderDeadlineProgress = {
  progressPercent: number;
  daysToDeadline: number;
  label: string;
};

export type TenderAreaMapItem = {
  tenderId: string;
  title: string;
  zone: string;
  location: string;
  status: TenderStatus;
  markerLabel: string;
  shortLabel: string;
  x: number;
  y: number;
  publicSummary: string;
  publicValueLabel?: string;
};

export type GuestTenderCard = {
  id: string;
  title: string;
  category: string;
  location: string;
  zone: string;
  status: TenderStatus;
  deadline: string;
  publicSummary: string;
  publicValueLabel?: string;
};

export type TenderOperationalSummary = {
  tenderId: string;
  proposalCount: number;
  needReviewCount: number;
  shortlistedCount: number;
  progress: TenderDeadlineProgress;
  frequentDocuments: TenderFrequentDocument[];
  relatedParties: TenderRelatedParty[];
};

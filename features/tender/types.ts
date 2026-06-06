export type TenderStatus =
  | "draft"
  | "open"
  | "under_review"
  | "shortlisting"
  | "awarded"
  | "closed";

export type ProposalStatus =
  | "submitted"
  | "under_review"
  | "clarification"
  | "shortlisted"
  | "awarded"
  | "not_selected";

export type ProposalVendorType = "contractor" | "supplier";

export type TenderMilestone = {
  label: string;
  date: string;
  note: string;
};

export type TenderProposal = {
  id: string;
  tenderId: string;
  vendorId: string;
  contractorName: string;
  type: ProposalVendorType;
  offeredPrice: number;
  estimatedDurationDays: number;
  relevantExperience: string;
  technicalFit: string;
  recommendation: string;
  status: ProposalStatus;
  submittedAt: string;
  notes: string;
  submittedDocuments?: string[];
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
  scope: string[];
  requirements: string[];
  requiredDocuments: string[];
  milestones: TenderMilestone[];
  proposals: TenderProposal[];
};

export type TenderStats = {
  totalTender: number;
  openTender: number;
  underEvaluation: number;
  totalEstimatedValue: number;
};

export type FeaturedTenderComparison = {
  tender: Tender;
  proposals: TenderProposal[];
  recommendedProposal?: TenderProposal;
};

export type VendorProposalSummary = {
  vendorId: string;
  vendorName: string;
  vendorType: string;
  vendorCategory: string;
  vendorStatus: string;
  availableTenders: number;
  submittedProposals: number;
  underReview: number;
  shortlisted: number;
  proposals: Array<{
    tenderId: string;
    tenderCode: string;
    tenderTitle: string;
    offeredPrice: number;
    estimatedDurationDays: number;
    submittedAt: string;
    status: ProposalStatus;
  }>;
};

export type InternalTenderSummary = {
  tenderPackages: number;
  totalSubmissions: number;
  needReview: number;
  shortlisted: number;
};

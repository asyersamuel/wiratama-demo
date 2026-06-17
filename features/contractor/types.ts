export type ExternalPartyType = "contractor";

export type LegalDocument = {
  name: string;
  status: string;
  note?: string;
};

export type ProjectExperience = {
  projectName: string;
  client: string;
  year: string;
  scope: string;
  contractValue: number;
  result: string;
};

export type ContractorHistoryItem = {
  project: string;
  year: string;
  packageName: string;
  result: string;
};

export type Contractor = {
  id: string;
  name: string;
  type: ExternalPartyType;
  category: string;
  businessField: string;
  businessClassification: string;
  establishedYear: number;
  verificationStatus: string;
  nib: string;
  npwp: string;
  address: string;
  picName: string;
  picTitle: string;
  email: string;
  phone: string;
  workforceCount: number;
  serviceAreas: string[];
  specialization: string;
  onTimeRecord: string;
  completedProjects: number;
  averageScore: number;
  summary: string;
  performanceSummary: string[];
  legalDocuments: LegalDocument[];
  projectExperiences: ProjectExperience[];
  history: ContractorHistoryItem[];
};

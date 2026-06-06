export type ExternalPartyType = "contractor" | "supplier" | "consultant";

export type Contractor = {
  id: string;
  name: string;
  type: ExternalPartyType;
  category: string;
  specialization: string;
  onTimeRecord: string;
  status: string;
  lastAward: string;
  completedProjects: number;
  averageScore: number;
  summary: string;
  strengths: string[];
  history: {
    project: string;
    year: string;
    packageName: string;
    result: string;
  }[];
};

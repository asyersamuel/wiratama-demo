export type IncidentStatus =
  | "reported"
  | "under_investigation"
  | "action_taken"
  | "resolved"
  | "closed";

export type IncidentSeverity = "low" | "medium" | "high" | "critical";

export type IncidentCategory = "k3" | "security" | "infrastructure" | "environment";

export type IncidentEvidenceType = "photo" | "document" | "note" | "video";

export type IncidentEvidence = {
  id: string;
  label?: string;
  name?: string;
  type: IncidentEvidenceType;
  size?: number;
  uploadedAt?: string;
};

export type IncidentActivity = {
  id: string;
  actor: string;
  timestamp?: string;
  time?: string;
  action?: string;
  title?: string;
  description?: string;
  note?: string;
  status?: IncidentStatus;
};

export type IncidentMapPosition = {
  x: number;
  y: number;
};

export type Incident = {
  id: string;
  code: string;
  title: string;
  description: string;
  category: IncidentCategory;
  subCategory: string;
  primaryLocation: string;
  zoneId: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  estimatedLoss: number;
  downtimeHours: number;
  assignedPicId?: string;
  reportedAt: string;
  occurredAt: string;
  mapPosition: IncidentMapPosition;
  evidence: IncidentEvidence[];
  activityLog: IncidentActivity[];
  reporterName?: string;
  locationDetail?: string;
  rootCause?: string;
  correctiveAction?: string;
  preventiveAction?: string;
  slaDeadline?: string;
};

export type PicOption = {
  id: string;
  name: string;
  role: string;
  type: "internal" | "vendor";
  vendorCategory?: string;
};

export type EstateZoneStatus = "normal" | "construction" | "incident" | "maintenance";

export type EstateZoneType = "residential" | "industrial" | "utility" | "logistics" | "entrance";

export type EstateZone = {
  id: string;
  name: string;
  type: EstateZoneType;
  status: EstateZoneStatus;
  utilizationPercent: number;
  mapPosition: IncidentMapPosition;
};

export type InfrastructureProgress = {
  id: string;
  label: string;
  target: number;
  actual: number;
  unit: string;
};

export type EstateLandSummary = {
  totalHectares: number;
  usedPercent: number;
  availablePercent: number;
};

export type ErpDashboardSeed = {
  estate: EstateLandSummary;
  infrastructure: InfrastructureProgress[];
};

export type ErpModuleTone = "active" | "semi" | "disabled";

export type ErpModule = {
  id: string;
  label: string;
  description: string;
  icon: string;
  href?: string;
  isActive: boolean;
  tone: ErpModuleTone;
  badge?: string;
};

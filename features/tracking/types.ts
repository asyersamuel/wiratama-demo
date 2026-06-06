export type TrackingLegalStatus =
  | "verified"
  | "pending_document"
  | "needs_review"
  | "flagged"
  | "rejected";

export type TrackingGateStatus =
  | "scheduled"
  | "arrived"
  | "approved_entry"
  | "held_for_review"
  | "rejected"
  | "exited"
  | "completed";

export type TrackingRiskLevel = "low" | "medium" | "high";

export type TrackingDocumentStatus = "valid" | "missing" | "expired" | "mismatch";

export type TrackingDocument = {
  name: string;
  status: TrackingDocumentStatus;
  note: string;
};

export type TrackingEventTone =
  | "neutral"
  | "accent"
  | "success"
  | "warning"
  | "danger";

export type TrackingEvent = {
  time: string;
  title: string;
  description: string;
  officer?: string;
  tone?: TrackingEventTone;
};

export type TrackingRecord = {
  barcode: string;
  contractorName: string;
  contractorPic: string;
  supplierName: string;
  supplierOrigin: string;
  materialName: string;
  materialCategory: string;
  quantity: number;
  unit: string;
  origin: string;
  destinationZone: string;
  workArea: string;
  vehiclePlate: string;
  vehicleType: string;
  driverName: string;
  driverId: string;
  legalStatus: TrackingLegalStatus;
  gateStatus: TrackingGateStatus;
  riskLevel: TrackingRiskLevel;
  scheduledDate: string;
  entryTime: string | null;
  exitTime: string | null;
  verificationNotes: string;
  gateOfficer: string;
  rejectionReason?: string | null;
  riskNotes?: string | null;
  documents: TrackingDocument[];
  events: TrackingEvent[];
};

export type TrackingStats = {
  todaysEntries: number;
  pendingVerification: number;
  flaggedSupplies: number;
  approvedVehicles: number;
};

export type TrackingItem = TrackingRecord;

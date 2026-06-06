export type StatusTone = "neutral" | "accent" | "success" | "warning" | "danger";

const statusLabelMap: Record<string, string> = {
  draft: "Draft",
  open: "Open",
  under_review: "Under Review",
  shortlisting: "Shortlisting",
  awarded: "Awarded",
  closed: "Closed",
  submitted: "Submitted",
  clarification: "Clarification",
  shortlisted: "Shortlisted",
  not_selected: "Not Selected",
  ready: "Lengkap",
  missing: "Belum Ada",
  pending_document: "Pending Document",
  needs_review: "Needs Review",
  flagged: "Flagged",
  expired: "Expired",
  mismatch: "Mismatch",
  terverifikasi: "Terverifikasi",
  verified: "Terverifikasi",
  aktif: "Aktif",
  active: "Aktif",
  completed: "Selesai",
  scheduled: "Scheduled",
  arrived: "Arrived",
  approved_entry: "Approved Entry",
  held_for_review: "Held for Review",
  exited: "Exited",
  low: "Low Risk",
  medium: "Medium Risk",
  high: "High Risk",
  low_risk: "Low Risk",
  medium_risk: "Medium Risk",
  high_risk: "High Risk",
  valid: "Valid",
  rejected: "Rejected",
};

export function getStatusTone(status: string): StatusTone {
  const normalized = status.trim().toLowerCase().replace(/\s+/g, "_");

  if (
    normalized === "open" ||
    normalized === "awarded" ||
    normalized === "verified" ||
    normalized === "terverifikasi" ||
    normalized === "ready" ||
    normalized === "valid" ||
    normalized === "active" ||
    normalized === "aktif" ||
    normalized === "approved_entry" ||
    normalized === "low" ||
    normalized === "low_risk"
  ) {
    return normalized === "awarded" ? "accent" : "success";
  }

  if (
    normalized === "submitted" ||
    normalized === "under_review" ||
    normalized === "clarification" ||
    normalized === "shortlisting" ||
    normalized === "shortlisted" ||
    normalized === "pending_document" ||
    normalized === "needs_review" ||
    normalized === "held_for_review" ||
    normalized === "medium" ||
    normalized === "medium_risk" ||
    normalized.includes("review") ||
    normalized.includes("shortlist")
  ) {
    return "warning";
  }

  if (
    normalized === "not_selected" ||
    normalized === "closed" ||
    normalized === "missing" ||
    normalized === "rejected" ||
    normalized === "flagged" ||
    normalized === "expired" ||
    normalized === "mismatch" ||
    normalized === "high" ||
    normalized === "high_risk"
  ) {
    return "danger";
  }

  return "neutral";
}

export function getStatusLabel(status: string) {
  const normalized = status.trim().toLowerCase().replace(/\s+/g, "_");
  return statusLabelMap[normalized] ?? status;
}

export function getStatusMeta(status: string) {
  return {
    label: getStatusLabel(status),
    tone: getStatusTone(status),
  };
}

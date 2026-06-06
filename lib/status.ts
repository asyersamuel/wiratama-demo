export type StatusTone = "neutral" | "accent" | "success" | "warning" | "danger";

const statusLabelMap: Record<string, string> = {
  draft: "Draft",
  open: "Open",
  evaluation: "Under Review",
  under_review: "Under Review",
  shortlisting: "Shortlisting",
  awarded: "Awarded",
  closed: "Closed",
  submitted: "Submitted",
  clarification: "Clarification",
  shortlisted: "Shortlisted",
  not_selected: "Not Selected",
  verified: "Verified",
  pending_document: "Pending Document",
  needs_review: "Needs Review",
  flagged: "Flagged",
  rejected: "Rejected",
  scheduled: "Scheduled",
  arrived: "Arrived",
  approved_entry: "Approved Entry",
  held_for_review: "Held for Review",
  exited: "Exited",
  completed: "Completed",
  low: "Low Risk",
  medium: "Medium Risk",
  high: "High Risk",
  valid: "Valid",
  missing: "Missing",
  expired: "Expired",
  mismatch: "Mismatch",
  low_risk: "Low Risk",
  medium_risk: "Medium Risk",
  high_risk: "High Risk",
};

export function getStatusTone(status: string): StatusTone {
  const normalized = status.trim().toLowerCase().replace(/\s+/g, "_");

  if (
    normalized === "verified" ||
    normalized === "approved" ||
    normalized === "approved_entry" ||
    normalized === "valid" ||
    normalized === "low" ||
    normalized === "low_risk" ||
    normalized === "active" ||
    normalized === "live" ||
    normalized === "open"
  ) {
    return "success";
  }

  if (
    normalized === "pending_document" ||
    normalized === "needs_review" ||
    normalized === "held_for_review" ||
    normalized === "medium" ||
    normalized === "medium_risk" ||
    normalized === "evaluation" ||
    normalized === "under_evaluation" ||
    normalized === "under_review" ||
    normalized === "clarification" ||
    normalized === "shortlisting" ||
    normalized === "shortlisted" ||
    normalized.includes("review") ||
    normalized.includes("shortlist")
  ) {
    return "warning";
  }

  if (
    normalized === "scheduled" ||
    normalized === "arrived" ||
    normalized === "exited" ||
    normalized === "completed"
  ) {
    return "neutral";
  }

  if (
    normalized === "awarded" ||
    normalized.includes("award") ||
    normalized.includes("recommended")
  ) {
    return "accent";
  }

  if (
    normalized === "flagged" ||
    normalized === "rejected" ||
    normalized === "missing" ||
    normalized === "expired" ||
    normalized === "mismatch" ||
    normalized === "high" ||
    normalized === "high_risk" ||
    normalized === "closed" ||
    normalized === "not_selected" ||
    normalized.includes("rejected") ||
    normalized.includes("hold") ||
    normalized.includes("risk")
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

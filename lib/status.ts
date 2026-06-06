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
};

export function getStatusTone(status: string): StatusTone {
  const normalized = status.trim().toLowerCase().replace(/\s+/g, "_");

  if (
    normalized === "open" ||
    normalized === "active" ||
    normalized === "live" ||
    normalized === "approved"
  ) {
    return "success";
  }

  if (
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
    normalized === "awarded" ||
    normalized.includes("award") ||
    normalized.includes("recommended")
  ) {
    return "accent";
  }

  if (
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

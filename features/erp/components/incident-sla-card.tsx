"use client";

import { StatusPill } from "@/components/ui/status-pill";
import type { Incident } from "@/features/erp/types";
import { formatDate } from "@/lib/format";

type IncidentSlaCardProps = {
  incident: Incident;
};

type SlaStatus = {
  label: string;
  tone: "neutral" | "success" | "warning" | "danger";
  hint: string;
};

function computeSlaStatus(incident: Incident): SlaStatus {
  // Closed status overrides all deadline-based statuses
  if (incident.status === "closed") {
    return {
      label: "Closed / Archived",
      tone: "neutral",
      hint: "Ticket telah dikunci sebagai arsip audit.",
    };
  }

  if (!incident.slaDeadline) {
    return {
      label: "No SLA assigned",
      tone: "neutral",
      hint: "Belum ada tenggat waktu penanganan.",
    };
  }

  const now = new Date();
  const deadline = new Date(incident.slaDeadline);
  const diffMs = deadline.getTime() - now.getTime();

  if (diffMs < 0) {
    return {
      label: "Overdue",
      tone: "danger",
      hint: "Tenggat waktu telah terlewati.",
    };
  }

  const diffHours = diffMs / (1000 * 60 * 60);
  if (diffHours <= 24) {
    return {
      label: "Due Soon",
      tone: "warning",
      hint: "Tenggat waktu kurang dari 24 jam.",
    };
  }

  return {
    label: "On Track",
    tone: "success",
    hint: "Penanganan masih dalam batas SLA.",
  };
}

export function IncidentSlaCard({ incident }: IncidentSlaCardProps) {
  const sla = computeSlaStatus(incident);
  const hasDeadline = Boolean(incident.slaDeadline);

  return (
    <div className="panel-strong rounded-[24px] p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="code-label">SLA</p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">
            Status penanganan tiket
          </h3>
          <p className="mt-2 text-sm copy-muted">{sla.hint}</p>
        </div>
        <StatusPill tone={sla.tone}>{sla.label}</StatusPill>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[18px] border border-[var(--line)] bg-white/75 p-4">
          <p className="code-label">SLA Deadline</p>
          <p className="mt-2 text-sm font-semibold text-slate-950">
            {hasDeadline && incident.slaDeadline
              ? formatDate(
                  new Date(incident.slaDeadline).toISOString(),
                )
              : "—"}
          </p>
        </div>
        <div className="rounded-[18px] border border-[var(--line)] bg-white/75 p-4">
          <p className="code-label">Current Status</p>
          <p className="mt-2 text-sm font-semibold text-slate-950">
            {incident.status.replace(/_/g, " ")}
          </p>
        </div>
      </div>
    </div>
  );
}

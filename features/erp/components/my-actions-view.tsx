"use client";

import Link from "next/link";
import { useMemo } from "react";
import { StatusPill } from "@/components/ui/status-pill";
import { useDemoIncidents } from "@/features/erp/demo-store";
import type { Incident } from "@/features/erp/types";
import { formatCurrency } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

type MyActionsViewProps = {
  seedIncidents: Incident[];
};

type SlaSummary = {
  onTrack: number;
  dueSoon: number;
  overdue: number;
};

function computeSlaSummary(incidents: Incident[]): SlaSummary {
  const summary: SlaSummary = { onTrack: 0, dueSoon: 0, overdue: 0 };
  const now = new Date();

  incidents.forEach((incident) => {
    if (!incident.slaDeadline) {
      summary.onTrack += 1;
      return;
    }

    const deadline = new Date(incident.slaDeadline);
    const diffMs = deadline.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffMs < 0) {
      summary.overdue += 1;
    } else if (diffHours <= 24) {
      summary.dueSoon += 1;
    } else {
      summary.onTrack += 1;
    }
  });

  return summary;
}

function severityTone(severity: Incident["severity"]) {
  if (severity === "critical") return "danger" as const;
  if (severity === "high") return "warning" as const;
  if (severity === "medium") return "accent" as const;
  return "neutral" as const;
}

export function MyActionsView({ seedIncidents }: MyActionsViewProps) {
  const incidents = useDemoIncidents(seedIncidents);

  const assignedIncidents = useMemo(
    () =>
      incidents.filter(
        (incident) =>
          Boolean(incident.assignedPicId) &&
          incident.status !== "closed",
      ),
    [incidents],
  );

  const sortedAssigned = useMemo(
    () =>
      [...assignedIncidents].sort((a, b) => {
        const aPriority = a.status === "action_taken" ? 0 : 1;
        const bPriority = b.status === "action_taken" ? 0 : 1;
        if (aPriority !== bPriority) return aPriority - bPriority;
        return (
          new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime()
        );
      }),
    [assignedIncidents],
  );

  const slaSummary = useMemo(
    () => computeSlaSummary(assignedIncidents),
    [assignedIncidents],
  );

  const totalEstimatedLoss = useMemo(
    () =>
      assignedIncidents.reduce(
        (sum, incident) => sum + incident.estimatedLoss,
        0,
      ),
    [assignedIncidents],
  );

  if (assignedIncidents.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <p className="eyebrow">My Actions</p>
          <h1 className="mt-2 section-title">Assigned Actions</h1>
          <p className="mt-2 text-sm copy-muted">
            Daftar insiden yang ditugaskan kepada Anda dan masih memerlukan penanganan.
          </p>
        </div>

        <div className="panel-strong rounded-[24px] p-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
            <svg
              className="h-8 w-8 text-emerald-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-slate-950">
            Tidak ada tindakan yang ditugaskan
          </p>
          <p className="mt-2 text-sm copy-muted">
            Semua insiden yang ditugaskan kepada Anda telah selesai atau belum ada assignment baru.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">My Actions</p>
        <h1 className="mt-2 section-title">Assigned Actions</h1>
        <p className="mt-2 text-sm copy-muted">
          Insiden yang ditugaskan kepada Anda dan masih memerlukan penanganan.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="panel-strong p-5">
          <p className="code-label">total assigned</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {assignedIncidents.length}
          </p>
          <p className="mt-2 text-sm copy-muted">Insiden aktif yang perlu ditindaklanjuti.</p>
        </div>
        <div className="panel-strong p-5">
          <p className="code-label">on track</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-emerald-700">
            {slaSummary.onTrack}
          </p>
          <p className="mt-2 text-sm copy-muted">Penanganan masih dalam batas SLA.</p>
        </div>
        <div className="panel-strong p-5">
          <p className="code-label">due soon</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-amber-600">
            {slaSummary.dueSoon}
          </p>
          <p className="mt-2 text-sm copy-muted">Tenggat waktu kurang dari 24 jam.</p>
        </div>
        <div className="panel-strong p-5">
          <p className="code-label">overdue</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-rose-700">
            {slaSummary.overdue}
          </p>
          <p className="mt-2 text-sm copy-muted">Tenggat waktu telah terlewati.</p>
        </div>
      </section>

      <div className="panel-strong rounded-[24px] p-5">
        <p className="code-label">estimated loss assigned</p>
        <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
          {formatCurrency(totalEstimatedLoss)}
        </p>
        <p className="mt-1 text-sm copy-muted">Total estimasi kerugian dari insiden yang ditugaskan.</p>
      </div>

      <div className="grid gap-3">
        {sortedAssigned.map((incident) => (
          <Link
            key={incident.id}
            href={`/erp/incidents/${incident.id}`}
            className="panel-strong flex flex-wrap items-start justify-between gap-4 rounded-[22px] p-5 transition hover:border-[var(--accent)] hover:bg-white"
          >
            <div className="max-w-3xl">
              <p className="code-label">{incident.code}</p>
              <h3 className="mt-2 text-base font-semibold text-slate-950">
                {incident.title}
              </h3>
              <p className="mt-1 text-sm copy-muted">
                {incident.primaryLocation} · {incident.subCategory}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill tone={severityTone(incident.severity)}>
                {incident.severity.toUpperCase()}
              </StatusPill>
              <StatusPill>{getStatusLabel(incident.status)}</StatusPill>
              <span className="font-mono text-xs text-slate-700">
                {formatCurrency(incident.estimatedLoss)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

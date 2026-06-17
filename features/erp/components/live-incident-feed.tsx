"use client";

import Link from "next/link";
import { useMemo } from "react";
import { StatusPill } from "@/components/ui/status-pill";
import type { Incident, IncidentSeverity } from "@/features/erp/types";
import { formatDate } from "@/lib/format";

type LiveIncidentFeedProps = {
  incidents: Incident[];
};

function severityTone(severity: IncidentSeverity) {
  if (severity === "critical") return "danger" as const;
  if (severity === "high") return "warning" as const;
  if (severity === "medium") return "accent" as const;
  return "neutral" as const;
}

function statusTone(status: Incident["status"]) {
  if (status === "reported") return "warning" as const;
  if (status === "under_investigation") return "accent" as const;
  if (status === "action_taken") return "success" as const;
  if (status === "resolved") return "success" as const;
  if (status === "closed") return "neutral" as const;
  return "neutral" as const;
}

function statusLabel(status: Incident["status"]) {
  const labels: Record<Incident["status"], string> = {
    reported: "Reported",
    under_investigation: "Under Investigation",
    action_taken: "Action Taken",
    resolved: "Resolved",
    closed: "Closed",
  };
  return labels[status];
}

export function LiveIncidentFeed({ incidents }: LiveIncidentFeedProps) {
  const latest = useMemo(() => {
    return [...incidents]
      .sort(
        (a, b) =>
          new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime(),
      )
      .slice(0, 5);
  }, [incidents]);

  if (latest.length === 0) {
    return (
      <div className="panel-strong flex flex-col gap-4 rounded-[24px] p-5 sm:p-6">
        <div>
          <p className="code-label">Live Feed</p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">
            Feed insiden kawasan
          </h3>
        </div>
        <div className="rounded-[18px] border border-dashed border-[var(--line)] bg-white/60 p-6 text-center text-sm copy-muted">
          Belum ada insiden yang tercatat di kawasan.
        </div>
      </div>
    );
  }

  return (
    <div className="panel-strong flex flex-col gap-4 rounded-[24px] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="code-label">Live Feed</p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">
            Feed insiden kawasan
          </h3>
        </div>
        <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">
          {latest.length} terbaru
        </span>
      </div>

      <div className="overflow-hidden rounded-[18px] border border-[var(--line)]">
        {/* Header */}
        <div className="hidden border-b border-[var(--line)] bg-slate-50/80 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:grid sm:grid-cols-[1fr_1.5fr_0.8fr_0.7fr_0.7fr]">
          <span>ID Insiden</span>
          <span>Judul Laporan</span>
          <span>Lokasi</span>
          <span>Severity</span>
          <span>Status</span>
        </div>

        {/* Rows */}
        {latest.map((incident, index) => (
          <Link
            key={incident.id}
            href={`/erp/incidents/${incident.id}`}
            className={`group grid grid-cols-1 gap-2 px-4 py-3 text-sm transition sm:grid-cols-[1fr_1.5fr_0.8fr_0.7fr_0.7fr] sm:items-center ${
              index !== latest.length - 1
                ? "border-b border-[var(--line)]"
                : ""
            } hover:bg-[var(--accent-soft)]/40`}
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-600">
                {incident.code}
              </p>
              <p className="mt-0.5 text-xs copy-muted sm:hidden">
                {formatDate(incident.reportedAt)}
              </p>
            </div>
            <p className="font-medium text-slate-900 group-hover:text-[var(--accent)]">
              {incident.title}
            </p>
            <p className="copy-muted">{incident.primaryLocation}</p>
            <StatusPill tone={severityTone(incident.severity)}>
              {incident.severity.toUpperCase()}
            </StatusPill>
            <StatusPill tone={statusTone(incident.status)}>
              {statusLabel(incident.status)}
            </StatusPill>
          </Link>
        ))}
      </div>
    </div>
  );
}

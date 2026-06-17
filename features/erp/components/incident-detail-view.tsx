"use client";

import Link from "next/link";
import { useMemo } from "react";
import { StatusPill } from "@/components/ui/status-pill";
import { IncidentSlaCard } from "@/features/erp/components/incident-sla-card";
import { IncidentWorkflowActions } from "@/features/erp/components/incident-workflow-actions";
import { IncidentWorkflowTimeline } from "@/features/erp/components/incident-workflow-timeline";
import {
  useDemoIncidents,
} from "@/features/erp/demo-store";
import { picOptions } from "@/features/erp/data/pic";
import type {
  Incident,
  IncidentActivity,
  IncidentSeverity,
  PicOption,
} from "@/features/erp/types";
import { formatCurrency, formatDate } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

type IncidentDetailViewProps = {
  incidentId: string;
  seedIncidents: Incident[];
};

const severityTone: Record<IncidentSeverity, "danger" | "warning" | "accent" | "neutral"> = {
  critical: "danger",
  high: "warning",
  medium: "accent",
  low: "neutral",
};

function findIncident(
  incidents: Incident[],
  id: string,
): Incident | undefined {
  return (
    incidents.find((item) => item.id === id) ??
    incidents.find((item) => item.code === id)
  );
}

function lookupPic(id: string | undefined, pics: PicOption[]) {
  if (!id) return undefined;
  return pics.find((pic) => pic.id === id);
}

function TimelineItem({ activity }: { activity: IncidentActivity }) {
  const displayTitle = activity.title ?? activity.action ?? "Activity";
  const displayTime = activity.time ?? activity.timestamp;
  const displayNote = activity.description ?? activity.note;

  return (
    <li className="relative pl-8">
      <span
        className="absolute left-0 top-1.5 inline-flex h-3 w-3 rounded-full border-2 border-white bg-[var(--accent)] shadow-[0_0_0_1px_rgba(143,34,52,0.25)]"
        aria-hidden
      />
      <p className="text-sm font-semibold text-slate-950">{displayTitle}</p>
      <p className="mt-1 text-xs copy-muted">
        {activity.actor}
        {displayTime ? ` · ${formatDate(displayTime)}` : ""}
        {activity.status
          ? ` · ${activity.status.replace(/_/g, " ")}`
          : ""}
      </p>
      {displayNote ? (
        <p className="mt-2 text-sm leading-6 text-slate-700">{displayNote}</p>
      ) : null}
    </li>
  );
}

export function IncidentDetailView({
  incidentId,
  seedIncidents,
}: IncidentDetailViewProps) {
  const incidents = useDemoIncidents(seedIncidents);
  const incident = useMemo(
    () => findIncident(incidents, incidentId),
    [incidents, incidentId],
  );

  if (!incident) {
    return (
      <div className="panel-strong rounded-[24px] p-8 text-center">
        <p className="text-base font-semibold text-slate-950">
          Insiden tidak ditemukan
        </p>
        <p className="mt-2 text-sm copy-muted">
          Tiket dengan ID <span className="font-mono">{incidentId}</span> tidak
          ada di Incident Register demo.
        </p>
        <Link
          href="/erp/incidents"
          className="mt-5 inline-flex rounded-full border border-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent-soft)]"
        >
          Kembali ke Incident Register
        </Link>
      </div>
    );
  }

  const pic = lookupPic(incident.assignedPicId, picOptions);
  const isClosed = incident.status === "closed";

  return (
    <div className="space-y-6">
      <Link
        href="/erp/incidents"
        className="inline-flex w-fit rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
      >
        Back to Incident Register
      </Link>

      <div className="panel p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="code-label">{incident.code}</p>
            <h1 className="mt-3 section-title">{incident.title}</h1>
            <p className="mt-3 text-sm leading-7 copy-muted">
              {incident.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill tone={severityTone[incident.severity]}>
              {incident.severity.toUpperCase()}
            </StatusPill>
            <StatusPill>{getStatusLabel(incident.status)}</StatusPill>
            {isClosed ? (
              <StatusPill tone="neutral">Closed</StatusPill>
            ) : null}
          </div>
        </div>
      </div>

      <IncidentWorkflowTimeline status={incident.status} />

      <IncidentWorkflowActions
        incident={incident}
        seedIncidents={seedIncidents}
      />

      <IncidentSlaCard incident={incident} />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <div className="panel-strong p-5">
          <p className="code-label">Location</p>
          <p className="mt-3 text-base font-semibold text-slate-950">
            {incident.primaryLocation}
          </p>
          {incident.locationDetail ? (
            <p className="mt-1 text-xs copy-muted">{incident.locationDetail}</p>
          ) : null}
        </div>
        <div className="panel-strong p-5">
          <p className="code-label">Category</p>
          <p className="mt-3 text-base font-semibold text-slate-950">
            {incident.category} · {incident.subCategory}
          </p>
        </div>
        <div className="panel-strong p-5">
          <p className="code-label">Estimated Loss</p>
          <p className="mt-3 text-base font-semibold text-slate-950">
            {formatCurrency(incident.estimatedLoss)}
          </p>
        </div>
        <div className="panel-strong p-5">
          <p className="code-label">Downtime</p>
          <p className="mt-3 text-base font-semibold text-slate-950">
            {incident.downtimeHours} jam
          </p>
        </div>
        <div className="panel-strong p-5">
          <p className="code-label">Assigned PIC</p>
          <p className="mt-3 text-base font-semibold text-slate-950">
            {pic ? pic.name : "Belum ditugaskan"}
          </p>
          {pic ? (
            <p className="mt-1 text-xs copy-muted">{pic.role}</p>
          ) : null}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="panel p-6 sm:p-7">
          <div className="mb-5 flex flex-col gap-2 border-b border-[var(--line)] pb-5">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">
              Activity Log
            </h2>
            <p className="text-sm copy-muted">
              Riwayat aktivitas tiket insiden dari Command Center.
            </p>
          </div>
          <ol className="space-y-6 border-l border-dashed border-[var(--line)] pl-6">
            {incident.activityLog.map((activity) => (
              <TimelineItem key={activity.id} activity={activity} />
            ))}
          </ol>
        </div>

        <div className="panel p-6 sm:p-7">
          <div className="mb-5 flex flex-col gap-2 border-b border-[var(--line)] pb-5">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">
              Evidence
            </h2>
            <p className="text-sm copy-muted">
              Lampiran pendukung yang tercatat pada tiket ini.
            </p>
          </div>
          {incident.evidence.length === 0 ? (
            <p className="text-sm copy-muted">
              Belum ada lampiran yang diunggah untuk tiket ini.
            </p>
          ) : (
            <ul className="space-y-3 text-sm leading-7 text-slate-700">
              {incident.evidence.map((evidence) => {
                const displayName = evidence.name ?? evidence.label ?? "Lampiran";
                const sizeLabel = evidence.size
                  ? ` · ${(evidence.size / 1024).toFixed(1)} KB`
                  : "";
                return (
                  <li
                    key={evidence.id}
                    className="rounded-[18px] border border-[var(--line)] bg-white/75 px-4 py-3"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                      {evidence.type}
                      {sizeLabel}
                    </span>
                    <p className="mt-1 text-sm font-semibold text-slate-950">
                      {displayName}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

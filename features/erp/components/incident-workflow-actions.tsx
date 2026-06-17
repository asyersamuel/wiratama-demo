"use client";

import { useMemo, useState } from "react";
import { updateDemoIncidentStatus } from "@/features/erp/demo-store";
import type { Incident, IncidentStatus } from "@/features/erp/types";

type IncidentWorkflowActionsProps = {
  incident: Incident;
  seedIncidents: Incident[];
};

const defaultActor = "Dewi Lestari";

type WorkflowTransition = {
  nextStatus: IncidentStatus;
  buttonLabel: string;
  note: string;
  confirmMessage?: string;
};

const workflowTransitions: Partial<Record<IncidentStatus, WorkflowTransition>> = {
  reported: {
    nextStatus: "under_investigation",
    buttonLabel: "Start Investigation",
    note: "Manajer membuka laporan dan memulai proses verifikasi lapangan.",
  },
  under_investigation: {
    nextStatus: "action_taken",
    buttonLabel: "Move to Action Taken",
    note: "Analisis dampak selesai. PIC telah ditugaskan untuk menjalankan tindakan korektif.",
  },
  action_taken: {
    nextStatus: "resolved",
    buttonLabel: "Mark as Resolved",
    note: "PIC melaporkan pekerjaan perbaikan telah selesai dan menunggu verifikasi manajer.",
  },
  resolved: {
    nextStatus: "closed",
    buttonLabel: "Close Ticket",
    note: "Manajer melakukan verifikasi akhir. Ticket dikunci untuk kebutuhan audit.",
    confirmMessage:
      "Close ticket ini? Setelah closed, ticket akan dikunci untuk kebutuhan audit.",
  },
};

export function IncidentWorkflowActions({
  incident,
  seedIncidents,
}: IncidentWorkflowActionsProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const transition = useMemo(
    () => workflowTransitions[incident.status],
    [incident.status],
  );

  const handleAction = () => {
    if (!transition || isUpdating) return;

    if (transition.confirmMessage) {
      const confirmed = window.confirm(transition.confirmMessage);
      if (!confirmed) return;
    }

    setIsUpdating(true);
    updateDemoIncidentStatus({
      incidentId: incident.id,
      status: transition.nextStatus,
      actor: defaultActor,
      note: transition.note,
      seedIncidents,
    });
    setIsUpdating(false);
  };

  // Closed state: show Audit Locked panel
  if (incident.status === "closed") {
    return (
      <div className="panel-strong rounded-[24px] p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="code-label">Workflow</p>
            <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">
              Audit Locked
            </h3>
            <p className="mt-2 text-sm copy-muted">
              Ticket ini telah ditutup dan dikunci untuk menjaga integritas
              audit. Data tetap tersedia sebagai arsip performa operasional
              dan evaluasi vendor/tim.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-900">
            Closed
          </span>
        </div>

        <div className="mt-4 rounded-[18px] border border-emerald-200 bg-emerald-50/60 p-4">
          <p className="text-sm font-semibold text-emerald-900">
            Ticket selesai diaudit
          </p>
          <p className="mt-1 text-xs leading-6 text-emerald-800">
            Aktivitas tiket terekam lengkap di activity log. Untuk kebutuhan
            pitching, ticket ini tidak lagi dihitung sebagai active incident dan
            tidak muncul di peta kawasan.
          </p>
        </div>
      </div>
    );
  }

  // Active state: show action button
  if (!transition) {
    return null;
  }

  return (
    <div className="panel-strong rounded-[24px] p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="code-label">Workflow Action</p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">
            Lanjutkan ke tahap berikutnya
          </h3>
          <p className="mt-2 text-sm copy-muted">
            Setiap transisi akan menambahkan entry baru ke activity log dan
            tersimpan di demo store ERP.
          </p>
        </div>
        <span className="inline-flex items-center rounded-full border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
          {defaultActor}
        </span>
      </div>

      <div className="mt-4 rounded-[18px] border border-[var(--line)] bg-white/75 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] copy-muted">
          Next step
        </p>
        <p className="mt-2 text-base font-semibold text-slate-950">
          {transition.buttonLabel}
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-700">
          {transition.note}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleAction}
          disabled={isUpdating}
          className="inline-flex rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUpdating ? "Memperbarui..." : transition.buttonLabel}
        </button>
        {transition.confirmMessage ? (
          <span className="inline-flex items-center text-xs copy-muted">
            <svg
              className="mr-1.5 h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            </svg>
            Memerlukan konfirmasi
          </span>
        ) : null}
      </div>
    </div>
  );
}

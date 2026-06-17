"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { StatusPill } from "@/components/ui/status-pill";
import {
  useDemoIncidents,
} from "@/features/erp/demo-store";
import type { Incident, IncidentSeverity, IncidentStatus } from "@/features/erp/types";
import { formatCompactCurrency, formatCurrency } from "@/lib/format";
import {
  ERP_ROLE_KEY,
  erpRoles,
  type ErpRole,
} from "@/lib/navigation";
import { getStatusLabel } from "@/lib/status";

type IncidentRegisterProps = {
  seedIncidents: Incident[];
};

type SeverityFilter = "all" | IncidentSeverity;
type StatusFilter = "all" | IncidentStatus;

const severityOptions: Array<{ value: SeverityFilter; label: string }> = [
  { value: "all", label: "All Severity" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
];

const statusOptions: Array<{ value: StatusFilter; label: string }> = [
  { value: "all", label: "All Status" },
  { value: "reported", label: "Reported" },
  { value: "under_investigation", label: "Under Investigation" },
  { value: "action_taken", label: "Action Taken" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
];

function severityTone(severity: IncidentSeverity) {
  if (severity === "critical") return "danger" as const;
  if (severity === "high") return "warning" as const;
  if (severity === "medium") return "accent" as const;
  return "neutral" as const;
}

function getStoredRole(): ErpRole {
  if (typeof window === "undefined") return "executive";
  const stored = window.localStorage.getItem(ERP_ROLE_KEY);
  if (stored && erpRoles.includes(stored as ErpRole)) {
    return stored as ErpRole;
  }
  return "executive";
}

export function IncidentRegister({ seedIncidents }: IncidentRegisterProps) {
  const incidents = useDemoIncidents(seedIncidents);
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState<SeverityFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [role, setRole] = useState<ErpRole>("executive");

  useEffect(() => {
    setRole(getStoredRole());
    const sync = () => setRole(getStoredRole());
    const onStorage = (event: StorageEvent) => {
      if (event.key === ERP_ROLE_KEY) sync();
    };
    const onCustom = () => sync();
    window.addEventListener("storage", onStorage);
    window.addEventListener(ERP_ROLE_KEY, onCustom as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(ERP_ROLE_KEY, onCustom as EventListener);
    };
  }, []);

  const canCreate = role === "command_center";

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return incidents.filter((incident) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        incident.title.toLowerCase().includes(normalizedQuery) ||
        incident.code.toLowerCase().includes(normalizedQuery) ||
        incident.primaryLocation.toLowerCase().includes(normalizedQuery);
      const matchesSeverity =
        severity === "all" || incident.severity === severity;
      const matchesStatus = status === "all" || incident.status === status;
      return matchesQuery && matchesSeverity && matchesStatus;
    });
  }, [incidents, query, severity, status]);

  const totalActive = incidents.filter((i) => i.status !== "closed").length;
  const totalLoss = incidents
    .filter((i) => i.status !== "closed")
    .reduce((sum, i) => sum + i.estimatedLoss, 0);

  return (
    <div className="space-y-5">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="panel-strong p-5">
          <p className="code-label">total tiket</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {incidents.length}
          </p>
          <p className="mt-2 text-sm copy-muted">Seluruh insiden terdaftar.</p>
        </div>
        <div className="panel-strong p-5">
          <p className="code-label">active incidents</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {totalActive}
          </p>
          <p className="mt-2 text-sm copy-muted">Status bukan Closed. Resolved tetap dihitung aktif.</p>
        </div>
        <div className="panel-strong p-5">
          <p className="code-label">monthly loss (active)</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {formatCompactCurrency(totalLoss)}
          </p>
          <p className="mt-2 text-sm copy-muted">
            {formatCurrency(totalLoss)} estimasi kerugian aktif.
          </p>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari kode, judul, atau lokasi"
            className="h-11 w-full min-w-[220px] rounded-2xl border border-[var(--line)] bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[var(--accent)] sm:w-72"
          />
          <select
            value={severity}
            onChange={(event) =>
              setSeverity(event.target.value as SeverityFilter)
            }
            className="h-11 rounded-2xl border border-[var(--line)] bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[var(--accent)]"
          >
            {severityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as StatusFilter)}
            className="h-11 rounded-2xl border border-[var(--line)] bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[var(--accent)]"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <Link
          href="/erp/incidents/new"
          className={`btn ${canCreate ? "btn-primary" : "btn-secondary pointer-events-none opacity-50"}`}
          aria-disabled={!canCreate}
          tabIndex={canCreate ? 0 : -1}
          title={
            canCreate
              ? "Buat laporan awal insiden baru"
              : "Hanya Command Center yang dapat membuat laporan awal"
          }
        >
          Buat Laporan Awal
        </Link>
      </div>

      <div className="grid gap-3">
        {filtered.map((incident) => (
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

        {filtered.length === 0 ? (
          <div className="panel-strong rounded-[22px] p-8 text-center">
            <p className="text-base font-semibold text-slate-950">
              Tidak ada insiden yang cocok dengan filter saat ini.
            </p>
            <p className="mt-2 text-sm copy-muted">
              Coba ubah kata kunci, severity, atau status untuk melihat tiket
              lain.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

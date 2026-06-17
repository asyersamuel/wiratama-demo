"use client";

import { useEffect, useMemo, useState } from "react";
import { picOptions } from "@/features/erp/data/pic";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { updateDemoIncident } from "@/features/erp/demo-store";
import type {
  Incident,
  IncidentCategory,
  IncidentEvidence,
  IncidentSeverity,
  PicOption,
} from "@/features/erp/types";
import {
  ERP_ROLE_KEY,
  erpRoles,
  type ErpRole,
} from "@/lib/navigation";

type IncidentWorkflowActionsProps = {
  incident: Incident;
  seedIncidents: Incident[];
};

const hseActor = "Dewi Lestari (HSE)";
const operationsManagerActor = "Dewi Lestari (Operations Manager)";
const picActor = "PIC / Vendor";

const subCategoriesByCategory: Record<IncidentCategory, string[]> = {
  k3: ["Cedera Ringan", "Cedera Berat", "Near Miss"],
  security: ["Akses Ilegal", "Pencurian Material", "Gangguan Perimeter"],
  infrastructure: [
    "Pipa Pecah",
    "Jalan Amblas",
    "Listrik Padam",
    "Fiber Optic Putus",
  ],
  environment: ["Tumpahan Limbah", "Polusi Udara", "Kebisingan"],
};

const categoryLabels: Record<IncidentCategory, string> = {
  k3: "K3",
  security: "Security",
  infrastructure: "Infrastructure",
  environment: "Environment",
};

const severityOptions: IncidentSeverity[] = [
  "low",
  "medium",
  "high",
  "critical",
];

function inputClasses(hasError: boolean) {
  return `h-12 w-full rounded-2xl border bg-white px-4 text-sm text-slate-900 outline-none transition ${
    hasError
      ? "border-rose-400 focus:border-rose-500"
      : "border-[var(--line)] focus:border-[var(--accent)]"
  }`;
}

function textareaClasses() {
  return `w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[var(--accent)]`;
}

function getStoredRole(): ErpRole {
  if (typeof window === "undefined") return "executive";
  const stored = window.localStorage.getItem(ERP_ROLE_KEY);
  if (stored && erpRoles.includes(stored as ErpRole)) {
    return stored as ErpRole;
  }
  return "executive";
}

function useCurrentErpRole(): ErpRole {
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

  return role;
}

type ImpactForm = {
  category: IncidentCategory;
  subCategory: string;
  severity: IncidentSeverity;
  estimatedLoss: string;
  downtimeHours: string;
  investigationNote: string;
};

type CapaForm = {
  rootCause: string;
  correctiveAction: string;
  preventiveAction: string;
  assignedPicId: string;
  slaDeadline: string;
};

type ProofForm = {
  completionNote: string;
  proofFiles: IncidentEvidence[];
};

function CloseIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
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
  );
}

function ReadOnlyPanel({
  title,
  description,
  tone = "muted",
}: {
  title: string;
  description: string;
  tone?: "muted" | "accent" | "warning";
}) {
  const toneClasses =
    tone === "accent"
      ? "border-[var(--accent-soft)] bg-[var(--accent-soft)]/30"
      : tone === "warning"
        ? "border-amber-200 bg-amber-50/60"
        : "border-[var(--line)] bg-white/60";
  const textClasses =
    tone === "accent"
      ? "text-[var(--accent-strong)]"
      : tone === "warning"
        ? "text-amber-800"
        : "text-slate-700";
  return (
    <div
      className={`panel-strong rounded-[24px] border ${toneClasses} p-5 sm:p-6`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="code-label">Workflow</p>
          <h3
            className={`mt-2 text-lg font-semibold tracking-[-0.02em] ${textClasses}`}
          >
            {title}
          </h3>
          <p className={`mt-2 text-sm leading-6 ${textClasses}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function AuditLockedPanel() {
  return (
    <div className="panel-strong rounded-[24px] p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="code-label">Workflow</p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">
            Audit Locked
          </h3>
          <p className="mt-2 text-sm copy-muted">
            Ticket ini telah ditutup dan dikunci untuk menjaga integritas audit.
            Data tetap tersedia sebagai arsip performa operasional dan evaluasi
            vendor/tim.
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

function ImpactAssessmentPanel({
  incident,
  seedIncidents,
}: {
  incident: Incident;
  seedIncidents: Incident[];
}) {
  const [form, setForm] = useState<ImpactForm>({
    category: incident.category,
    subCategory: incident.subCategory,
    severity: incident.severity,
    estimatedLoss:
      incident.estimatedLoss > 0 ? String(incident.estimatedLoss) : "",
    downtimeHours:
      incident.downtimeHours > 0 ? String(incident.downtimeHours) : "",
    investigationNote: incident.investigationNote ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = <K extends keyof ImpactForm>(key: K, value: ImpactForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const updateCategory = (category: IncidentCategory) => {
    setForm((prev) => ({ ...prev, category, subCategory: "" }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.category;
      delete next.subCategory;
      return next;
    });
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.subCategory) next.subCategory = "Pilih sub-kategori.";
    if (!form.severity) next.severity = "Pilih severity.";
    const loss = parseFloat(form.estimatedLoss);
    if (!form.estimatedLoss || isNaN(loss) || loss < 0) {
      next.estimatedLoss = "Estimasi kerugian harus angka valid.";
    }
    const downtime = parseFloat(form.downtimeHours);
    if (!form.downtimeHours || isNaN(downtime) || downtime < 0) {
      next.downtimeHours = "Downtime harus angka valid (jam).";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate() || submitting) return;

    setSubmitting(true);
    updateDemoIncident({
      incidentId: incident.id,
      patch: {
        category: form.category,
        subCategory: form.subCategory,
        severity: form.severity,
        estimatedLoss: parseFloat(form.estimatedLoss) || 0,
        downtimeHours: parseFloat(form.downtimeHours) || 0,
        investigationNote: form.investigationNote.trim() || undefined,
        status: "under_investigation",
      },
      actor: hseActor,
      activity: {
        title: "Analisis dampak diselesaikan",
        description:
          "HSE / Operations melengkapi kategori, severity, estimasi kerugian, dan downtime.",
        status: "under_investigation",
      },
      seedIncidents,
    });
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="panel-strong rounded-[24px] p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="code-label">Impact Assessment</p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">
            Lengkapi analisis dampak
          </h3>
          <p className="mt-2 text-sm copy-muted">
            HSE / Operations menentukan kategori, severity, estimasi kerugian,
            downtime, dan catatan investigasi awal.
          </p>
        </div>
        <span className="inline-flex items-center rounded-full border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
          {hseActor}
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Category
          <select
            value={form.category}
            onChange={(e) => updateCategory(e.target.value as IncidentCategory)}
            className={inputClasses(Boolean(errors.category))}
          >
            {(Object.keys(subCategoriesByCategory) as IncidentCategory[]).map(
              (key) => (
                <option key={key} value={key}>
                  {categoryLabels[key]}
                </option>
              ),
            )}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Sub-Category
          <select
            value={form.subCategory}
            onChange={(e) => updateField("subCategory", e.target.value)}
            className={inputClasses(Boolean(errors.subCategory))}
          >
            <option value="">Pilih sub-kategori</option>
            {subCategoriesByCategory[form.category].map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
          {errors.subCategory ? (
            <p className="mt-1 text-xs font-medium text-rose-600">
              {errors.subCategory}
            </p>
          ) : null}
        </label>

        <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          <span>Severity</span>
          <div className="flex flex-wrap gap-2">
            {severityOptions.map((level) => {
              const active = form.severity === level;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => updateField("severity", level)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                    active
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                      : "border-[var(--line)] bg-white text-slate-700 hover:border-[var(--accent)]"
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>
          {errors.severity ? (
            <p className="mt-1 text-xs font-medium text-rose-600">
              {errors.severity}
            </p>
          ) : null}
        </div>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Estimated Loss (IDR)
          <input
            type="number"
            min="0"
            value={form.estimatedLoss}
            onChange={(e) => updateField("estimatedLoss", e.target.value)}
            className={inputClasses(Boolean(errors.estimatedLoss))}
            placeholder="Contoh: 25000000"
          />
          {errors.estimatedLoss ? (
            <p className="mt-1 text-xs font-medium text-rose-600">
              {errors.estimatedLoss}
            </p>
          ) : null}
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Downtime (jam)
          <input
            type="number"
            min="0"
            step="0.5"
            value={form.downtimeHours}
            onChange={(e) => updateField("downtimeHours", e.target.value)}
            className={inputClasses(Boolean(errors.downtimeHours))}
            placeholder="Contoh: 2"
          />
          {errors.downtimeHours ? (
            <p className="mt-1 text-xs font-medium text-rose-600">
              {errors.downtimeHours}
            </p>
          ) : null}
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
          Catatan Investigasi (opsional)
          <textarea
            value={form.investigationNote}
            onChange={(e) => updateField("investigationNote", e.target.value)}
            className={`${textareaClasses()} min-h-20`}
            placeholder="Temuan awal investigasi lapangan."
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-[var(--line)] bg-white/60 p-4">
        <p className="text-xs copy-muted">
          Submit akan mengubah status menjadi{" "}
          <strong>Under Investigation</strong> dan menambahkan entry ke activity
          log.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Menyimpan..." : "Submit Impact Assessment"}
        </button>
      </div>
    </form>
  );
}

function CapaAssignmentPanel({
  incident,
  seedIncidents,
  picList,
}: {
  incident: Incident;
  seedIncidents: Incident[];
  picList: PicOption[];
}) {
  const [form, setForm] = useState<CapaForm>({
    rootCause: incident.rootCause ?? "",
    correctiveAction: incident.correctiveAction ?? "",
    preventiveAction: incident.preventiveAction ?? "",
    assignedPicId: incident.assignedPicId ?? "",
    slaDeadline: incident.slaDeadline ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = <K extends keyof CapaForm>(key: K, value: CapaForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.assignedPicId) next.assignedPicId = "Pilih PIC / vendor.";
    if (!form.slaDeadline) next.slaDeadline = "Tentukan SLA deadline.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate() || submitting) return;

    setSubmitting(true);
    updateDemoIncident({
      incidentId: incident.id,
      patch: {
        rootCause: form.rootCause.trim() || undefined,
        correctiveAction: form.correctiveAction.trim() || undefined,
        preventiveAction: form.preventiveAction.trim() || undefined,
        assignedPicId: form.assignedPicId,
        slaDeadline: form.slaDeadline,
        status: "action_taken",
      },
      actor: operationsManagerActor,
      activity: {
        title: "CAPA ditetapkan dan PIC ditugaskan",
        description:
          "Operations Manager menetapkan tindakan korektif/preventif, PIC, dan SLA.",
        status: "action_taken",
      },
      seedIncidents,
    });
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="panel-strong rounded-[24px] p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="code-label">CAPA & Assignment</p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">
            Tetapkan tindakan & PIC
          </h3>
          <p className="mt-2 text-sm copy-muted">
            Operations Manager mengisi root cause, corrective &amp; preventive
            action, menugaskan PIC/vendor, dan menentukan SLA deadline.
          </p>
        </div>
        <span className="inline-flex items-center rounded-full border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
          {operationsManagerActor}
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
          Root Cause Analysis
          <textarea
            value={form.rootCause}
            onChange={(e) => updateField("rootCause", e.target.value)}
            className={`${textareaClasses()} min-h-20`}
            placeholder="Penyebab utama kejadian"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Corrective Action
          <textarea
            value={form.correctiveAction}
            onChange={(e) => updateField("correctiveAction", e.target.value)}
            className={`${textareaClasses()} min-h-20`}
            placeholder="Tindakan korektif yang akan dijalankan"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Preventive Action
          <textarea
            value={form.preventiveAction}
            onChange={(e) => updateField("preventiveAction", e.target.value)}
            className={`${textareaClasses()} min-h-20`}
            placeholder="Tindakan pencegahan untuk kejadian serupa"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Assigned PIC / Vendor
          <select
            value={form.assignedPicId}
            onChange={(e) => updateField("assignedPicId", e.target.value)}
            className={inputClasses(Boolean(errors.assignedPicId))}
          >
            <option value="">Pilih PIC / vendor</option>
            {picList.map((pic) => (
              <option key={pic.id} value={pic.id}>
                {pic.name} — {pic.role}
              </option>
            ))}
          </select>
          {errors.assignedPicId ? (
            <p className="mt-1 text-xs font-medium text-rose-600">
              {errors.assignedPicId}
            </p>
          ) : null}
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          SLA Deadline
          <input
            type="date"
            value={form.slaDeadline}
            onChange={(e) => updateField("slaDeadline", e.target.value)}
            className={inputClasses(Boolean(errors.slaDeadline))}
          />
          {errors.slaDeadline ? (
            <p className="mt-1 text-xs font-medium text-rose-600">
              {errors.slaDeadline}
            </p>
          ) : null}
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-[var(--line)] bg-white/60 p-4">
        <p className="text-xs copy-muted">
          Submit akan mengubah status menjadi <strong>Action Taken</strong> dan
          tiket akan muncul di My Actions PIC/vendor.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Menyimpan..." : "Submit CAPA & Assignment"}
        </button>
      </div>
    </form>
  );
}

function ProofOfWorkPanel({
  incident,
  seedIncidents,
}: {
  incident: Incident;
  seedIncidents: Incident[];
}) {
  const [form, setForm] = useState<ProofForm>({
    completionNote: incident.completionNote ?? "",
    proofFiles: incident.proofFiles ?? [],
  });
  const [submitting, setSubmitting] = useState(false);

  const updateField = <K extends keyof ProofForm>(key: K, value: ProofForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const simulated: IncidentEvidence[] = Array.from(files).map((file, index) => ({
      id: `proof-${Date.now()}-${index}`,
      name: file.name,
      type: file.type.startsWith("image/") ? "photo" : "document",
      size: file.size,
      uploadedAt: new Date().toISOString(),
    }));
    setForm((prev) => ({
      ...prev,
      proofFiles: [...prev.proofFiles, ...simulated],
    }));
    event.target.value = "";
  };

  const removeProof = (id: string) => {
    setForm((prev) => ({
      ...prev,
      proofFiles: prev.proofFiles.filter((f) => f.id !== id),
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    const mergedEvidence = [...incident.evidence, ...form.proofFiles];
    updateDemoIncident({
      incidentId: incident.id,
      patch: {
        completionNote: form.completionNote.trim() || undefined,
        proofFiles: form.proofFiles.length > 0 ? form.proofFiles : undefined,
        evidence: mergedEvidence,
        status: "resolved",
      },
      actor: picActor,
      activity: {
        title: "Pekerjaan ditandai selesai",
        description:
          "PIC/Vendor mengirim bukti penyelesaian dan menunggu verifikasi.",
        status: "resolved",
      },
      seedIncidents,
    });
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="panel-strong rounded-[24px] p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="code-label">Proof of Work</p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">
            Selesaikan pekerjaan
          </h3>
          <p className="mt-2 text-sm copy-muted">
            PIC/Vendor mengunggah bukti penyelesaian dan catatan pekerjaan.
          </p>
        </div>
        <span className="inline-flex items-center rounded-full border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
          {picActor}
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
          Completion Note
          <textarea
            value={form.completionNote}
            onChange={(e) => updateField("completionNote", e.target.value)}
            className={`${textareaClasses()} min-h-24`}
            placeholder="Ringkasan pekerjaan yang sudah dilakukan."
          />
        </label>

        <div className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
          <span>Bukti Pekerjaan (Simulasi)</span>
          <label className="flex h-12 cursor-pointer items-center justify-between rounded-2xl border border-dashed border-[var(--line)] bg-white/60 px-4 text-sm text-slate-600 transition hover:border-[var(--accent)]">
            <span>Pilih file foto / dokumen bukti</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Browse
            </span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <p className="text-[11px] copy-muted">
            File tidak diunggah ke server, hanya metadata yang disimpan untuk
            demo.
          </p>
        </div>
      </div>

      {form.proofFiles.length > 0 ? (
        <div className="mt-4 grid gap-2">
          {form.proofFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-white/75 px-4 py-2.5 text-sm"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-700">
                  {file.type}
                </span>
                <span className="font-medium text-slate-900">
                  {file.name ?? "Lampiran"}
                </span>
                {typeof file.size === "number" ? (
                  <span className="text-xs copy-muted">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => removeProof(file.id)}
                className="rounded-full px-3 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-[var(--line)] bg-white/60 p-4">
        <p className="text-xs copy-muted">
          Submit akan mengubah status menjadi <strong>Resolved</strong> dan
          menunggu verifikasi dari HSE / Operations atau Operations Manager.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Menyimpan..." : "Submit Proof of Work"}
        </button>
      </div>
    </form>
  );
}

function CloseTicketPanel({
  incident,
  seedIncidents,
  role,
}: {
  incident: Incident;
  seedIncidents: Incident[];
  role: ErpRole;
}) {
  const [verificationNote, setVerificationNote] = useState(
    incident.verificationNote ?? "",
  );
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const actor =
    role === "hse_operations"
      ? hseActor
      : role === "operations_manager"
        ? operationsManagerActor
        : "Manager";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    setShowConfirmModal(true);
  };

  const handleConfirmClose = () => {
    setSubmitting(true);
    const trimmedNote = verificationNote.trim();
    const noteDescription = trimmedNote
      ? `${actor} melakukan verifikasi akhir dan menutup tiket. Catatan: ${trimmedNote}`
      : `${actor} melakukan verifikasi akhir dan menutup tiket.`;

    updateDemoIncident({
      incidentId: incident.id,
      patch: {
        status: "closed",
        ...(trimmedNote ? { verificationNote: trimmedNote } : {}),
      },
      actor,
      activity: {
        title: "Ticket ditutup dan dikunci",
        description: noteDescription,
        status: "closed",
      },
      seedIncidents,
    });
    setSubmitting(false);
    setShowConfirmModal(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="panel-strong rounded-[24px] p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="code-label">Close Ticket</p>
            <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">
              Verifikasi akhir & tutup tiket
            </h3>
            <p className="mt-2 text-sm copy-muted">
              Tambahkan catatan verifikasi (opsional), lalu tutup tiket untuk
              mengunci audit.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
            {actor}
          </span>
        </div>

        <div className="mt-5">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Verification Note (opsional)
            <textarea
              value={verificationNote}
              onChange={(e) => setVerificationNote(e.target.value)}
              className={`${textareaClasses()} min-h-20`}
              placeholder="Catatan verifikasi sebelum menutup tiket."
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-[var(--line)] bg-white/60 p-4">
          <span className="inline-flex items-center text-xs copy-muted">
            <CloseIcon />
            <span className="ml-1.5">Memerlukan konfirmasi sebelum menutup.</span>
          </span>
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {submitting ? "Menutup..." : "Close Ticket"}
          </button>
        </div>
      </form>

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmClose}
        title="Tutup Tiket Insiden"
        message="Close ticket ini? Setelah closed, tiket akan dikunci untuk kebutuhan audit."
        confirmText="Close Ticket"
        cancelText="Batal"
        tone="danger"
      />
    </>
  );
}

export function IncidentWorkflowActions({
  incident,
  seedIncidents,
}: IncidentWorkflowActionsProps) {
  const role = useCurrentErpRole();
  const status = incident.status;

  const message = useMemo(() => {
    if (status === "closed") return null;

    if (role === "executive") {
      return {
        title: "Read-only monitoring",
        description:
          "Executive tidak dapat mengubah status ticket. Gunakan role lain untuk memproses tiket.",
        tone: "muted" as const,
      };
    }

    if (role === "command_center") {
      if (status === "reported") {
        return {
          title: "Laporan sudah dikirim",
          description:
            "Laporan awal telah dibuat dan menunggu Impact Assessment dari HSE / Operations.",
          tone: "muted" as const,
        };
      }
      return {
        title: "Command Center tidak dapat memperbarui tiket",
        description:
          "Tiket sudah diproses oleh role lain. Command Center hanya mengirim laporan awal.",
        tone: "muted" as const,
      };
    }

    if (role === "hse_operations") {
      if (status === "under_investigation") {
        return {
          title: "Menunggu CAPA dan Assignment",
          description:
            "HSE sudah menyelesaikan Impact Assessment. Menunggu CAPA & assignment dari Operations Manager.",
          tone: "warning" as const,
        };
      }
      if (status === "action_taken") {
        return {
          title: "Menunggu bukti pekerjaan PIC",
          description:
            "Operations Manager sudah menugaskan PIC. Menunggu Proof of Work dari PIC/vendor.",
          tone: "muted" as const,
        };
      }
      return {
        title: "HSE tidak dapat memperbarui tiket ini",
        description:
          "Tahap ini bukan wewenang HSE. Gunakan role Operations Manager atau PIC.",
        tone: "muted" as const,
      };
    }

    if (role === "operations_manager") {
      if (status === "reported") {
        return {
          title: "Menunggu Impact Assessment",
          description:
            "Tiket baru dibuat. HSE / Operations akan melengkapi Impact Assessment terlebih dahulu.",
          tone: "muted" as const,
        };
      }
      if (status === "action_taken") {
        return {
          title: "Menunggu bukti pekerjaan PIC",
          description:
            "CAPA sudah ditetapkan dan PIC ditugaskan. Menunggu Proof of Work dari PIC/vendor.",
          tone: "muted" as const,
        };
      }
      return {
        title: "Operations Manager tidak dapat memperbarui tiket ini",
        description:
          "Tahap ini bukan wewenang Operations Manager.",
        tone: "muted" as const,
      };
    }

    if (role === "pic_vendor") {
      if (status === "reported" || status === "under_investigation") {
        return {
          title: "Ticket belum ditugaskan",
          description:
            "Tiket belum masuk tahap Action Taken. PIC hanya menangani tiket yang sudah ditugaskan.",
          tone: "warning" as const,
        };
      }
      if (status === "resolved") {
        return {
          title: "Menunggu verifikasi",
          description:
            "Pekerjaan sudah dikirim. Menunggu verifikasi dan penutupan tiket oleh HSE / Operations atau Operations Manager.",
          tone: "muted" as const,
        };
      }
      return {
        title: "PIC tidak dapat memperbarui tiket ini",
        description:
          "Tahap ini bukan wewenang PIC/Vendor.",
        tone: "muted" as const,
      };
    }

    return null;
  }, [role, status]);

  if (status === "closed") {
    return <AuditLockedPanel />;
  }

  if (
    role === "hse_operations" &&
    status === "reported"
  ) {
    return (
      <ImpactAssessmentPanel
        incident={incident}
        seedIncidents={seedIncidents}
      />
    );
  }

  if (
    role === "operations_manager" &&
    status === "under_investigation"
  ) {
    return (
      <CapaAssignmentPanel
        incident={incident}
        seedIncidents={seedIncidents}
        picList={picOptions}
      />
    );
  }

  if (
    role === "pic_vendor" &&
    status === "action_taken" &&
    Boolean(incident.assignedPicId)
  ) {
    return (
      <ProofOfWorkPanel
        incident={incident}
        seedIncidents={seedIncidents}
      />
    );
  }

  if (
    status === "resolved" &&
    (role === "hse_operations" || role === "operations_manager")
  ) {
    return (
      <CloseTicketPanel
        incident={incident}
        seedIncidents={seedIncidents}
        role={role}
      />
    );
  }

  if (message) {
    return (
      <ReadOnlyPanel
        title={message.title}
        description={message.description}
        tone={message.tone}
      />
    );
  }

  return null;
}
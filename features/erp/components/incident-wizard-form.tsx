"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { StatusPill } from "@/components/ui/status-pill";
import {
  addDemoIncident,
  getNextIncidentNumber,
  useDemoIncidents,
} from "@/features/erp/demo-store";
import type {
  EstateZone,
  Incident,
  IncidentCategory,
  IncidentEvidence,
  IncidentSeverity,
  PicOption,
} from "@/features/erp/types";
import { formatCurrency, formatDate } from "@/lib/format";

type IncidentWizardFormProps = {
  seedIncidents: Incident[];
  zones: EstateZone[];
  picOptions: PicOption[];
};

type WizardFormData = {
  title: string;
  description: string;
  occurredAt: string;
  zoneId: string;
  locationDetail: string;
  reporterName: string;
  evidenceFiles: Array<{
    id: string;
    name: string;
    type: IncidentEvidence["type"];
    size: number;
    uploadedAt: string;
  }>;
  category: IncidentCategory | "";
  subCategory: string;
  severity: IncidentSeverity | "";
  estimatedLoss: string;
  downtimeHours: string;
  rootCause: string;
  correctiveAction: string;
  preventiveAction: string;
  assignedPicId: string;
  slaDeadline: string;
};

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

const severityTone = (severity: IncidentSeverity) => {
  if (severity === "critical") return "danger" as const;
  if (severity === "high") return "warning" as const;
  if (severity === "medium") return "accent" as const;
  return "neutral" as const;
};

const initialFormData: WizardFormData = {
  title: "",
  description: "",
  occurredAt: "",
  zoneId: "",
  locationDetail: "",
  reporterName: "Rizky Pratama",
  evidenceFiles: [],
  category: "",
  subCategory: "",
  severity: "",
  estimatedLoss: "",
  downtimeHours: "",
  rootCause: "",
  correctiveAction: "",
  preventiveAction: "",
  assignedPicId: "",
  slaDeadline: "",
};

const steps = [
  { id: 1, title: "Initial Log", description: "Lapor dan identifikasi awal" },
  {
    id: 2,
    title: "Impact Assessment",
    description: "Kategori, dampak, kerugian",
  },
  {
    id: 3,
    title: "CAPA / Assignment",
    description: "Tindakan & penugasan PIC",
  },
  { id: 4, title: "Review & Submit", description: "Konfirmasi tiket" },
];

function detectEvidenceType(file: File): IncidentEvidence["type"] {
  if (file.type.startsWith("image/")) return "photo";
  if (file.type.startsWith("video/")) return "video";
  return "document";
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 text-xs font-medium text-rose-600">{message}</p>
  );
}

function inputClasses(hasError: boolean) {
  return `h-12 w-full rounded-2xl border bg-white px-4 text-sm text-slate-900 outline-none transition ${
    hasError
      ? "border-rose-400 focus:border-rose-500"
      : "border-[var(--line)] focus:border-[var(--accent)]"
  }`;
}

function textareaClasses(hasError: boolean) {
  return `w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition ${
    hasError
      ? "border-rose-400 focus:border-rose-500"
      : "border-[var(--line)] focus:border-[var(--accent)]"
  }`;
}

export function IncidentWizardForm({
  seedIncidents,
  zones,
  picOptions,
}: IncidentWizardFormProps) {
  const router = useRouter();
  const mergedIncidents = useDemoIncidents(seedIncidents);
  const nextNumber = useMemo(
    () => getNextIncidentNumber(mergedIncidents),
    [mergedIncidents],
  );
  const previewCode = `KI-INC-2026-${String(nextNumber).padStart(3, "0")}`;

  const [formData, setFormData] = useState<WizardFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = <K extends keyof WizardFormData>(
    key: K,
    value: WizardFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const updateCategory = (category: IncidentCategory | "") => {
    setFormData((prev) => ({
      ...prev,
      category,
      subCategory: "",
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.category;
      delete next.subCategory;
      return next;
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const simulated: WizardFormData["evidenceFiles"] = Array.from(files).map(
      (file, index) => ({
        id: `ev-sim-${Date.now()}-${index}`,
        name: file.name,
        type: detectEvidenceType(file),
        size: file.size,
        uploadedAt: new Date().toISOString(),
      }),
    );
    setFormData((prev) => ({
      ...prev,
      evidenceFiles: [...prev.evidenceFiles, ...simulated],
    }));
    event.target.value = "";
  };

  const removeEvidence = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      evidenceFiles: prev.evidenceFiles.filter((f) => f.id !== id),
    }));
  };

  const validateStep1 = (): boolean => {
    const next: Record<string, string> = {};
    if (!formData.title.trim()) next.title = "Judul insiden wajib diisi.";
    if (!formData.description.trim())
      next.description = "Kronologi singkat wajib diisi.";
    if (!formData.occurredAt)
      next.occurredAt = "Waktu kejadian wajib diisi.";
    if (!formData.zoneId) next.zoneId = "Pilih lokasi primary.";
    if (!formData.locationDetail.trim())
      next.locationDetail = "Detail lokasi wajib diisi.";
    if (!formData.reporterName.trim())
      next.reporterName = "Nama pelapor wajib diisi.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateStep2 = (): boolean => {
    const next: Record<string, string> = {};
    if (!formData.category) next.category = "Pilih kategori insiden.";
    if (!formData.subCategory)
      next.subCategory = "Pilih sub-kategori insiden.";
    if (!formData.severity) next.severity = "Pilih severity.";
    const loss = parseFloat(formData.estimatedLoss);
    if (!formData.estimatedLoss || isNaN(loss) || loss < 0)
      next.estimatedLoss = "Estimasi kerugian harus angka valid.";
    const downtime = parseFloat(formData.downtimeHours);
    if (!formData.downtimeHours || isNaN(downtime) || downtime < 0)
      next.downtimeHours = "Downtime harus angka valid (jam).";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    setCurrentStep((prev) => (prev < 4 ? ((prev + 1) as 1 | 2 | 3 | 4) : prev));
  };

  const handleBack = () => {
    setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3 | 4) : prev));
  };

  const handleSubmit = () => {
    if (!validateStep1() || !validateStep2()) {
      if (!validateStep1()) setCurrentStep(1);
      else if (!validateStep2()) setCurrentStep(2);
      return;
    }

    const selectedZone = zones.find((z) => z.id === formData.zoneId);
    if (!selectedZone) return;

    const nowIso = new Date().toISOString();
    const incidentId = `inc-2026-${String(nextNumber).padStart(3, "0")}`;

    const newIncident: Incident = {
      id: incidentId,
      code: previewCode,
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category as IncidentCategory,
      subCategory: formData.subCategory,
      primaryLocation: selectedZone.name,
      zoneId: selectedZone.id,
      severity: formData.severity as IncidentSeverity,
      status: "reported",
      estimatedLoss: parseFloat(formData.estimatedLoss) || 0,
      downtimeHours: parseFloat(formData.downtimeHours) || 0,
      reportedAt: nowIso,
      occurredAt: new Date(formData.occurredAt).toISOString(),
      mapPosition: { ...selectedZone.mapPosition },
      evidence: formData.evidenceFiles.map((file) => ({
        id: file.id,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: file.uploadedAt,
      })),
      activityLog: [
        {
          id: `act-${Date.now()}`,
          time: nowIso,
          actor: formData.reporterName.trim(),
          title: "Laporan insiden dikirim",
          description:
            "Status awal Reported. Notifikasi otomatis dikirim ke HSE Manager dan Operations Manager.",
          status: "reported",
        },
      ],
      reporterName: formData.reporterName.trim(),
      locationDetail: formData.locationDetail.trim(),
      ...(formData.rootCause.trim()
        ? { rootCause: formData.rootCause.trim() }
        : {}),
      ...(formData.correctiveAction.trim()
        ? { correctiveAction: formData.correctiveAction.trim() }
        : {}),
      ...(formData.preventiveAction.trim()
        ? { preventiveAction: formData.preventiveAction.trim() }
        : {}),
      ...(formData.assignedPicId
        ? { assignedPicId: formData.assignedPicId }
        : {}),
      ...(formData.slaDeadline
        ? { slaDeadline: formData.slaDeadline }
        : {}),
    };

    setIsSubmitting(true);
    addDemoIncident(newIncident);
    router.push(`/erp/incidents/${newIncident.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Stepper */}
      <div className="panel-strong flex flex-col gap-4 rounded-[24px] p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="code-label">Incident Wizard</p>
            <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">
              Step {currentStep} dari 4 · {steps[currentStep - 1]?.title}
            </h3>
            <p className="mt-1 text-sm copy-muted">
              {steps[currentStep - 1]?.description}
            </p>
          </div>
          <span className="inline-flex items-center rounded-full border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
            {previewCode}
          </span>
        </div>
        <ol className="grid gap-2 sm:grid-cols-4">
          {steps.map((step) => {
            const isActive = currentStep === step.id;
            const isDone = currentStep > step.id;
            return (
              <li
                key={step.id}
                className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "border-[var(--accent)] bg-[var(--accent-soft)]/60"
                    : isDone
                      ? "border-emerald-200 bg-emerald-50/60"
                      : "border-[var(--line)] bg-white/60"
                }`}
              >
                <span
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                    isActive
                      ? "bg-[var(--accent)] text-white"
                      : isDone
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {isDone ? "✓" : step.id}
                </span>
                <span
                  className={`font-medium ${
                    isActive
                      ? "text-[var(--accent-strong)]"
                      : isDone
                        ? "text-emerald-800"
                        : "text-slate-600"
                  }`}
                >
                  {step.title}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Step content */}
      {currentStep === 1 && (
        <div className="panel-strong rounded-[24px] p-6 sm:p-7">
          <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">
            Initial Log
          </h2>
          <p className="mt-1 text-sm copy-muted">
            Catat judul, kronologi, waktu, lokasi, pelapor, dan lampiran awal.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Incident Code
              <input
                value={previewCode}
                readOnly
                className="h-12 w-full cursor-not-allowed rounded-2xl border border-dashed border-[var(--line)] bg-slate-50 px-4 font-mono text-sm text-slate-500"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Incident Title
              <input
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                className={inputClasses(Boolean(errors.title))}
                placeholder="Contoh: Jalan amblas dekat akses utama"
              />
              <FieldError message={errors.title} />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Waktu Kejadian
              <input
                type="datetime-local"
                value={formData.occurredAt}
                onChange={(e) => updateField("occurredAt", e.target.value)}
                className={inputClasses(Boolean(errors.occurredAt))}
              />
              <FieldError message={errors.occurredAt} />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Primary Location (Zone)
              <select
                value={formData.zoneId}
                onChange={(e) => updateField("zoneId", e.target.value)}
                className={inputClasses(Boolean(errors.zoneId))}
              >
                <option value="">Pilih zone kawasan</option>
                {zones.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name} ({zone.type})
                  </option>
                ))}
              </select>
              <FieldError message={errors.zoneId} />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
              Location Detail
              <textarea
                value={formData.locationDetail}
                onChange={(e) => updateField("locationDetail", e.target.value)}
                className={`${textareaClasses(Boolean(errors.locationDetail))} min-h-20`}
                placeholder="Contoh: 50 meter dari gerbang Blok A, sisi timur jalan utama"
              />
              <FieldError message={errors.locationDetail} />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
              Kronologi Singkat
              <textarea
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                className={`${textareaClasses(Boolean(errors.description))} min-h-24`}
                placeholder="Jelaskan kronologi kejadian secara singkat dan jelas."
              />
              <FieldError message={errors.description} />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Nama Pelapor
              <input
                value={formData.reporterName}
                onChange={(e) => updateField("reporterName", e.target.value)}
                className={inputClasses(Boolean(errors.reporterName))}
                placeholder="Nama pelapor"
              />
              <FieldError message={errors.reporterName} />
            </label>

            <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              <span>Lampiran Evidence (Simulasi)</span>
              <label className="flex h-12 cursor-pointer items-center justify-between rounded-2xl border border-dashed border-[var(--line)] bg-white/60 px-4 text-sm text-slate-600 transition hover:border-[var(--accent)]">
                <span>Pilih file foto / video / dokumen</span>
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

          {formData.evidenceFiles.length > 0 && (
            <div className="mt-4 grid gap-2">
              {formData.evidenceFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-white/75 px-4 py-2.5 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-700">
                      {file.type}
                    </span>
                    <span className="font-medium text-slate-900">
                      {file.name}
                    </span>
                    <span className="text-xs copy-muted">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeEvidence(file.id)}
                    className="rounded-full px-3 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {currentStep === 2 && (
        <div className="panel-strong rounded-[24px] p-6 sm:p-7">
          <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">
            Impact Assessment
          </h2>
          <p className="mt-1 text-sm copy-muted">
            Tentukan kategori, sub-kategori, severity, kerugian, dan downtime.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Category
              <select
                value={formData.category}
                onChange={(e) =>
                  updateCategory(e.target.value as IncidentCategory | "")
                }
                className={inputClasses(Boolean(errors.category))}
              >
                <option value="">Pilih kategori</option>
                {(Object.keys(subCategoriesByCategory) as IncidentCategory[]).map(
                  (key) => (
                    <option key={key} value={key}>
                      {categoryLabels[key]}
                    </option>
                  ),
                )}
              </select>
              <FieldError message={errors.category} />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Sub-Category
              <select
                value={formData.subCategory}
                onChange={(e) => updateField("subCategory", e.target.value)}
                className={inputClasses(Boolean(errors.subCategory))}
                disabled={!formData.category}
              >
                <option value="">
                  {formData.category
                    ? "Pilih sub-kategori"
                    : "Pilih kategori terlebih dahulu"}
                </option>
                {formData.category
                  ? subCategoriesByCategory[formData.category].map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))
                  : null}
              </select>
              <FieldError message={errors.subCategory} />
            </label>

            <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              <span>Severity</span>
              <div className="flex flex-wrap gap-2">
                {(["low", "medium", "high", "critical"] as IncidentSeverity[]).map(
                  (level) => {
                    const active = formData.severity === level;
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
                  },
                )}
              </div>
              <FieldError message={errors.severity} />
            </div>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Estimated Loss (IDR)
              <input
                type="number"
                min="0"
                value={formData.estimatedLoss}
                onChange={(e) => updateField("estimatedLoss", e.target.value)}
                className={inputClasses(Boolean(errors.estimatedLoss))}
                placeholder="Contoh: 25000000"
              />
              <FieldError message={errors.estimatedLoss} />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Downtime (jam)
              <input
                type="number"
                min="0"
                step="0.5"
                value={formData.downtimeHours}
                onChange={(e) => updateField("downtimeHours", e.target.value)}
                className={inputClasses(Boolean(errors.downtimeHours))}
                placeholder="Contoh: 2"
              />
              <FieldError message={errors.downtimeHours} />
            </label>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="panel-strong rounded-[24px] p-6 sm:p-7">
          <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">
            CAPA / Assignment
          </h2>
          <p className="mt-1 text-sm copy-muted">
            Isi tindakan korektif, pencegahan, PIC, dan SLA. Semua field di
            langkah ini opsional dan bisa diperbarui setelah tiket dibuat.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
              Root Cause Analysis
              <textarea
                value={formData.rootCause}
                onChange={(e) => updateField("rootCause", e.target.value)}
                className={`${textareaClasses(false)} min-h-20`}
                placeholder="Penyebab utama kejadian (opsional)"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Corrective Action
              <textarea
                value={formData.correctiveAction}
                onChange={(e) => updateField("correctiveAction", e.target.value)}
                className={`${textareaClasses(false)} min-h-20`}
                placeholder="Tindakan korektif awal (opsional)"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Preventive Action
              <textarea
                value={formData.preventiveAction}
                onChange={(e) => updateField("preventiveAction", e.target.value)}
                className={`${textareaClasses(false)} min-h-20`}
                placeholder="Tindakan pencegahan (opsional)"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Assigned PIC
              <select
                value={formData.assignedPicId}
                onChange={(e) => updateField("assignedPicId", e.target.value)}
                className={inputClasses(false)}
              >
                <option value="">Belum ditugaskan</option>
                {picOptions.map((pic) => (
                  <option key={pic.id} value={pic.id}>
                    {pic.name} — {pic.role}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              SLA Deadline
              <input
                type="date"
                value={formData.slaDeadline}
                onChange={(e) => updateField("slaDeadline", e.target.value)}
                className={inputClasses(false)}
              />
            </label>
          </div>
        </div>
      )}

      {currentStep === 4 && (() => {
        const selectedZone = zones.find((z) => z.id === formData.zoneId);
        const selectedPic = picOptions.find((p) => p.id === formData.assignedPicId);
        const lossValue = parseFloat(formData.estimatedLoss) || 0;
        const downtimeValue = parseFloat(formData.downtimeHours) || 0;

        return (
          <div className="panel-strong rounded-[24px] p-6 sm:p-7">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">
              Review & Submit
            </h2>
            <p className="mt-1 text-sm copy-muted">
              Pastikan data tiket sudah benar sebelum dikirim ke Incident
              Register.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[18px] border border-[var(--line)] bg-white/75 p-4">
                <p className="code-label">Incident Code</p>
                <p className="mt-2 font-mono text-sm font-semibold text-slate-950">
                  {previewCode}
                </p>
              </div>
              <div className="rounded-[18px] border border-[var(--line)] bg-white/75 p-4">
                <p className="code-label">Title</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">
                  {formData.title || "—"}
                </p>
              </div>
              <div className="rounded-[18px] border border-[var(--line)] bg-white/75 p-4">
                <p className="code-label">Waktu Kejadian</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">
                  {formData.occurredAt
                    ? formatDate(new Date(formData.occurredAt).toISOString())
                    : "—"}
                </p>
              </div>
              <div className="rounded-[18px] border border-[var(--line)] bg-white/75 p-4">
                <p className="code-label">Location</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">
                  {selectedZone?.name ?? "—"}
                </p>
                {formData.locationDetail && (
                  <p className="mt-1 text-xs copy-muted">
                    {formData.locationDetail}
                  </p>
                )}
              </div>
              <div className="rounded-[18px] border border-[var(--line)] bg-white/75 p-4">
                <p className="code-label">Severity</p>
                <div className="mt-2">
                  {formData.severity ? (
                    <StatusPill tone={severityTone(formData.severity as IncidentSeverity)}>
                      {formData.severity.toUpperCase()}
                    </StatusPill>
                  ) : (
                    <span className="text-sm text-slate-400">—</span>
                  )}
                </div>
              </div>
              <div className="rounded-[18px] border border-[var(--line)] bg-white/75 p-4">
                <p className="code-label">Category / Sub-Category</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">
                  {formData.category
                    ? `${categoryLabels[formData.category as IncidentCategory]} · ${formData.subCategory || "—"}`
                    : "—"}
                </p>
              </div>
              <div className="rounded-[18px] border border-[var(--line)] bg-white/75 p-4">
                <p className="code-label">Estimated Loss</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">
                  {lossValue > 0 ? formatCurrency(lossValue) : "—"}
                </p>
              </div>
              <div className="rounded-[18px] border border-[var(--line)] bg-white/75 p-4">
                <p className="code-label">Downtime</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">
                  {downtimeValue > 0 ? `${downtimeValue} jam` : "—"}
                </p>
              </div>
              <div className="rounded-[18px] border border-[var(--line)] bg-white/75 p-4">
                <p className="code-label">Assigned PIC</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">
                  {selectedPic ? selectedPic.name : "Belum ditugaskan"}
                </p>
                {selectedPic && (
                  <p className="mt-1 text-xs copy-muted">{selectedPic.role}</p>
                )}
              </div>
              <div className="rounded-[18px] border border-[var(--line)] bg-white/75 p-4">
                <p className="code-label">SLA Deadline</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">
                  {formData.slaDeadline
                    ? formatDate(new Date(formData.slaDeadline).toISOString())
                    : "—"}
                </p>
              </div>
              {formData.description && (
                <div className="rounded-[18px] border border-[var(--line)] bg-white/75 p-4 sm:col-span-2">
                  <p className="code-label">Kronologi</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {formData.description}
                  </p>
                </div>
              )}
              {formData.evidenceFiles.length > 0 && (
                <div className="rounded-[18px] border border-[var(--line)] bg-white/75 p-4 sm:col-span-2">
                  <p className="code-label">Lampiran ({formData.evidenceFiles.length})</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                    {formData.evidenceFiles.map((file) => (
                      <li
                        key={file.id}
                        className="flex items-center justify-between"
                      >
                        <span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                            {file.type}
                          </span>
                          {" — "}
                          {file.name}
                        </span>
                        <span className="text-xs copy-muted">
                          {formatFileSize(file.size)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* Navigation buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/erp/incidents"
            className="inline-flex rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
          >
            Cancel
          </Link>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="inline-flex rounded-full border border-[var(--line)] px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Back
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {currentStep < 4 && (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex rounded-full border border-[var(--accent)] px-5 py-2 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent-soft)]"
            >
              Next
            </button>
          )}
          {currentStep === 4 && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white transition hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Mengirim..." : "Kirim Laporan"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

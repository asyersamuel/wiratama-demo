"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
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
  PicOption,
} from "@/features/erp/types";

type InitialLogFormProps = {
  seedIncidents: Incident[];
  zones: EstateZone[];
  picOptions: PicOption[];
};

type FormData = {
  title: string;
  description: string;
  occurredAt: string;
  zoneId: string;
  locationDetail: string;
  reporterName: string;
  evidenceFiles: IncidentEvidence[];
};

const initialFormData: FormData = {
  title: "",
  description: "",
  occurredAt: "",
  zoneId: "",
  locationDetail: "",
  reporterName: "Rizky Pratama",
  evidenceFiles: [],
};

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

const placeholderCategory: IncidentCategory = "k3";

export function IncidentWizardForm({
  seedIncidents,
  zones,
}: InitialLogFormProps) {
  const router = useRouter();
  const mergedIncidents = useDemoIncidents(seedIncidents);
  const nextNumber = useMemo(
    () => getNextIncidentNumber(mergedIncidents),
    [mergedIncidents],
  );
  const previewCode = `KI-INC-2026-${String(nextNumber).padStart(3, "0")}`;

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const simulated: IncidentEvidence[] = Array.from(files).map((file, index) => ({
      id: `ev-sim-${Date.now()}-${index}`,
      name: file.name,
      type: detectEvidenceType(file),
      size: file.size,
      uploadedAt: new Date().toISOString(),
    }));
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

  const validate = (): boolean => {
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate() || isSubmitting) return;

    const selectedZone = zones.find((z) => z.id === formData.zoneId);
    if (!selectedZone) return;

    const nowIso = new Date().toISOString();
    const incidentId = `inc-2026-${String(nextNumber).padStart(3, "0")}`;

    const newIncident: Incident = {
      id: incidentId,
      code: previewCode,
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: placeholderCategory,
      subCategory: "—",
      primaryLocation: selectedZone.name,
      zoneId: selectedZone.id,
      severity: "medium",
      status: "reported",
      estimatedLoss: 0,
      downtimeHours: 0,
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
          title: "Laporan awal dibuat",
          description:
            "Laporan insiden dikirim oleh Command Center. Menunggu Impact Assessment dari HSE / Operations.",
          status: "reported",
        },
      ],
      reporterName: formData.reporterName.trim(),
      locationDetail: formData.locationDetail.trim(),
    };

    setIsSubmitting(true);
    addDemoIncident(newIncident);
    router.push(`/erp/incidents/${newIncident.id}`);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="panel-strong flex flex-col gap-4 rounded-[24px] p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="code-label">Initial Log</p>
            <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">
              Laporan awal insiden kawasan
            </h3>
            <p className="mt-1 text-sm copy-muted">
              Catat judul, kronologi, waktu, lokasi, pelapor, dan lampiran awal.
              Setelah dikirim, tiket akan berstatus <strong>Reported</strong> dan
              menunggu Impact Assessment dari HSE / Operations.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
            {previewCode}
          </span>
        </div>
      </div>

      <div className="panel-strong rounded-[24px] p-6 sm:p-7">
        <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">
          Initial Log
        </h2>
        <p className="mt-1 text-sm copy-muted">
          Field wajib diisi untuk membuat tiket insiden baru.
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

        {formData.evidenceFiles.length > 0 ? (
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
                    {file.name ?? "Lampiran"}
                  </span>
                  {typeof file.size === "number" ? (
                    <span className="text-xs copy-muted">
                      {formatFileSize(file.size)}
                    </span>
                  ) : null}
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
        ) : null}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-[var(--line)] bg-white/60 p-4">
          <p className="text-xs copy-muted">
            Setelah dikirim, tiket akan berstatus <strong>Reported</strong>.
            Impact Assessment, CAPA, dan Assignment akan diisi oleh role
            terkait di halaman detail tiket.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Mengirim..." : "Kirim Laporan Awal"}
          </button>
        </div>
      </div>
    </form>
  );
}
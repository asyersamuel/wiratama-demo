"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { addDemoProposal, buildDemoProposalId } from "@/features/tender/demo-store";
import type { Contractor } from "@/features/contractor/types";
import {
  proposalDocumentCatalog,
  type ProposalDocument,
  type Tender,
} from "@/features/tender/types";
import { formatDate } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

type SuccessCta = {
  href: string;
  label: string;
  tone?: "primary" | "secondary";
};

type VendorProposalFormProps = {
  tender: Pick<Tender, "id" | "code" | "title" | "deadline" | "startDate">;
  vendor: Contractor;
  successCtas?: SuccessCta[];
};

type DocumentChecklistState = Record<ProposalDocument["type"], boolean>;

function createInitialDocumentState(): DocumentChecklistState {
  return proposalDocumentCatalog.reduce((accumulator, document) => {
    accumulator[document.type] = true;
    return accumulator;
  }, {} as DocumentChecklistState);
}

export function VendorProposalForm({
  tender,
  vendor,
  successCtas = [],
}: VendorProposalFormProps) {
  const [offeredPrice, setOfferedPrice] = useState("142500000000");
  const [estimatedDurationDays, setEstimatedDurationDays] = useState("210");
  const [proposedStartDate, setProposedStartDate] = useState(tender.startDate);
  const [workMethod, setWorkMethod] = useState(
    "Pekerjaan dibagi per segmen dengan fokus pembukaan koridor utama lebih dahulu, lalu dilanjutkan rigid pavement dan penyelesaian bahu jalan secara bertahap.",
  );
  const [relevantExperience, setRelevantExperience] = useState(
    "Memiliki pengalaman pada pembangunan jalan akses kawasan industri, rigid pavement, dan koordinasi drainase koridor utilitas.",
  );
  const [mainEquipment, setMainEquipment] = useState(
    "Concrete paver, motor grader, excavator 20 ton, dump truck, water tanker",
  );
  const [manpowerCount, setManpowerCount] = useState("118");
  const [offerValidityDays, setOfferValidityDays] = useState("45");
  const [vendorNotes, setVendorNotes] = useState(
    "Kami siap melakukan mobilisasi alat utama maksimal 10 hari setelah surat penunjukan kerja diterbitkan.",
  );
  const [documentState, setDocumentState] = useState<DocumentChecklistState>(
    createInitialDocumentState(),
  );
  const [submittedProposalId, setSubmittedProposalId] = useState("");

  const selectedDocuments = useMemo<ProposalDocument[]>(
    () =>
      proposalDocumentCatalog.map((document) => ({
        type: document.type,
        label: document.label,
        status: documentState[document.type] ? "ready" : "missing",
      })),
    [documentState],
  );

  const isSubmitted = submittedProposalId.length > 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const proposalId = buildDemoProposalId(tender.code);

    addDemoProposal({
      proposalId,
      tenderId: tender.id,
      vendorId: vendor.id,
      vendorName: vendor.name,
      vendorType: "contractor",
      offeredPrice: Number(offeredPrice),
      estimatedDurationDays: Number(estimatedDurationDays),
      proposedStartDate,
      workMethod,
      relevantExperience,
      mainEquipment: mainEquipment
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      manpowerCount: Number(manpowerCount),
      offerValidityDays: Number(offerValidityDays),
      vendorNotes,
      internalNotes: "Proposal baru masuk dari portal vendor dan menunggu review internal.",
      submittedAt: new Date().toISOString(),
      status: "submitted",
      documents: selectedDocuments,
    });

    setSubmittedProposalId(proposalId);
  };

  const handleResetForm = () => {
    setSubmittedProposalId("");
    setOfferedPrice("142500000000");
    setEstimatedDurationDays("210");
    setProposedStartDate(tender.startDate);
    setWorkMethod(
      "Pekerjaan dibagi per segmen dengan fokus pembukaan koridor utama lebih dahulu, lalu dilanjutkan rigid pavement dan penyelesaian bahu jalan secara bertahap.",
    );
    setRelevantExperience(
      "Memiliki pengalaman pada pembangunan jalan akses kawasan industri, rigid pavement, dan koordinasi drainase koridor utilitas.",
    );
    setMainEquipment(
      "Concrete paver, motor grader, excavator 20 ton, dump truck, water tanker",
    );
    setManpowerCount("118");
    setOfferValidityDays("45");
    setVendorNotes(
      "Kami siap melakukan mobilisasi alat utama maksimal 10 hari setelah surat penunjukan kerja diterbitkan.",
    );
    setDocumentState(createInitialDocumentState());
  };

  return (
    <div className="space-y-6">
      {isSubmitted ? (
        <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-base font-semibold text-emerald-900">
            Pengajuan proposal berhasil disimulasikan.
          </p>
          <dl className="mt-4 grid gap-3 text-sm text-emerald-900 sm:grid-cols-2">
            <div>
              <dt className="code-label">Nomor proposal</dt>
              <dd className="mt-1 font-medium">{submittedProposalId}</dd>
            </div>
            <div>
              <dt className="code-label">Status proposal</dt>
              <dd className="mt-1 font-medium">{getStatusLabel("submitted")}</dd>
            </div>
            <div>
              <dt className="code-label">Tender</dt>
              <dd className="mt-1 font-medium">{tender.title}</dd>
            </div>
            <div>
              <dt className="code-label">Vendor</dt>
              <dd className="mt-1 font-medium">{vendor.name}</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm leading-7 text-emerald-800">
            Proposal tersimpan sebagai state demo lokal di browser ini dan akan
            muncul di Portal Vendor maupun area Review Tender internal.
          </p>
          {successCtas.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-3">
              {successCtas.map((cta) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className={cta.tone === "secondary" ? "btn btn-secondary" : "btn btn-primary"}
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <section className="rounded-[24px] border border-[#ead8dc] bg-[#fcf7f8] p-5">
        <p className="code-label">Ringkasan tender</p>
        <h3 className="mt-2 text-lg font-semibold text-slate-950">
          {tender.code} · {tender.title}
        </h3>
        <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          <p>Batas akhir pengajuan: {formatDate(tender.deadline)}</p>
          <p>Target mulai pekerjaan: {formatDate(tender.startDate)}</p>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="tender-card p-5 sm:p-6">
          <div className="border-b border-[var(--line)] pb-4">
            <p className="code-label">Profil vendor</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950">
              Data vendor terprefill
            </h3>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              { label: "Nama perusahaan", value: vendor.name },
              { label: "NIB", value: vendor.nib },
              { label: "NPWP", value: vendor.npwp },
              { label: "PIC", value: vendor.picName },
              { label: "Email", value: vendor.email },
              { label: "Telepon", value: vendor.phone },
              { label: "Bidang usaha", value: vendor.businessField },
              { label: "Status verifikasi", value: vendor.verificationStatus },
            ].map((item) => (
              <label
                key={item.label}
                className="flex flex-col gap-2 text-sm font-medium text-slate-700"
              >
                {item.label}
                <input value={item.value} readOnly className="tender-input bg-[#faf8f8]" />
              </label>
            ))}
          </div>
        </section>

        <section className="tender-card p-5 sm:p-6">
          <div className="border-b border-[var(--line)] pb-4">
            <p className="code-label">Pengajuan proposal</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950">
              Informasi penawaran vendor
            </h3>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Harga penawaran (IDR)
              <input
                value={offeredPrice}
                onChange={(event) => setOfferedPrice(event.target.value)}
                className="tender-input"
                inputMode="numeric"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Durasi pekerjaan (hari)
              <input
                value={estimatedDurationDays}
                onChange={(event) => setEstimatedDurationDays(event.target.value)}
                className="tender-input"
                inputMode="numeric"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Tanggal mulai yang diajukan
              <input
                type="date"
                value={proposedStartDate}
                onChange={(event) => setProposedStartDate(event.target.value)}
                className="tender-input"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Masa berlaku penawaran (hari)
              <input
                value={offerValidityDays}
                onChange={(event) => setOfferValidityDays(event.target.value)}
                className="tender-input"
                inputMode="numeric"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
              Metode kerja singkat
              <textarea
                value={workMethod}
                onChange={(event) => setWorkMethod(event.target.value)}
                className="tender-textarea min-h-28"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
              Pengalaman relevan
              <textarea
                value={relevantExperience}
                onChange={(event) => setRelevantExperience(event.target.value)}
                className="tender-textarea min-h-28"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
              Daftar peralatan utama
              <textarea
                value={mainEquipment}
                onChange={(event) => setMainEquipment(event.target.value)}
                className="tender-textarea min-h-24"
                placeholder="Pisahkan dengan koma"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Jumlah tenaga kerja yang diajukan
              <input
                value={manpowerCount}
                onChange={(event) => setManpowerCount(event.target.value)}
                className="tender-input"
                inputMode="numeric"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
              Catatan vendor
              <textarea
                value={vendorNotes}
                onChange={(event) => setVendorNotes(event.target.value)}
                className="tender-textarea min-h-24"
              />
            </label>
          </div>
        </section>

        <section className="tender-card p-5 sm:p-6">
          <div className="border-b border-[var(--line)] pb-4">
            <p className="code-label">Dokumen pengajuan</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950">
              Checklist upload visual-only
            </h3>
            <p className="mt-2 text-sm leading-7 copy-muted">
              Tidak ada upload file real. Checklist ini hanya dipakai untuk
              simulasi kelengkapan dokumen saat demo.
            </p>
          </div>

          <div className="mt-5 grid gap-3">
            {proposalDocumentCatalog.map((document) => (
              <label
                key={document.type}
                className="flex items-center gap-3 rounded-[18px] border border-[var(--line)] bg-[#faf8f8] px-4 py-3 text-sm text-slate-700"
              >
                <input
                  type="checkbox"
                  checked={documentState[document.type]}
                  onChange={(event) =>
                    setDocumentState((current) => ({
                      ...current,
                      [document.type]: event.target.checked,
                    }))
                  }
                />
                <span>{document.label}</span>
              </label>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <button type="submit" className="btn btn-primary">
            Kirim Proposal
          </button>
          <button type="button" onClick={handleResetForm} className="btn btn-secondary">
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { Tender } from "@/features/tender/types";

type VendorProposalFormProps = {
  tenders: Pick<Tender, "id" | "code" | "title">[];
  defaultCompanyName: string;
};

export function VendorProposalForm({
  tenders,
  defaultCompanyName,
}: VendorProposalFormProps) {
  const [selectedTenderId, setSelectedTenderId] = useState(tenders[0]?.id ?? "");
  const [companyName, setCompanyName] = useState(defaultCompanyName);
  const [picName, setPicName] = useState("Budi Santoso");
  const [offeredPrice, setOfferedPrice] = useState("");
  const [estimatedDurationDays, setEstimatedDurationDays] = useState("");
  const [relevantExperience, setRelevantExperience] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  const selectedTender = tenders.find((item) => item.id === selectedTenderId);

  return (
    <div className="space-y-5">
      {isSubmitted ? (
        <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-base font-semibold text-emerald-900">
            Proposal submitted successfully.
          </p>
          <p className="mt-2 text-sm leading-7 text-emerald-800">
            This is a local demo state for pitching purposes. No data is stored
            or sent to a backend service.
          </p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Select Tender
            <select
              value={selectedTenderId}
              onChange={(event) => setSelectedTenderId(event.target.value)}
              className="h-12 rounded-2xl border border-[var(--line)] bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[var(--accent)]"
              required
            >
              {tenders.map((tender) => (
                <option key={tender.id} value={tender.id}>
                  {tender.code} - {tender.title}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Company Name
            <input
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              className="h-12 rounded-2xl border border-[var(--line)] bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[var(--accent)]"
              required
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            PIC Name
            <input
              value={picName}
              onChange={(event) => setPicName(event.target.value)}
              className="h-12 rounded-2xl border border-[var(--line)] bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[var(--accent)]"
              placeholder="Person in charge"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Offered Price (IDR)
            <input
              value={offeredPrice}
              onChange={(event) => setOfferedPrice(event.target.value)}
              className="h-12 rounded-2xl border border-[var(--line)] bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[var(--accent)]"
              inputMode="numeric"
              placeholder="e.g. 142500000000"
              required
            />
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Estimated Duration (Days)
          <input
            value={estimatedDurationDays}
            onChange={(event) => setEstimatedDurationDays(event.target.value)}
            className="h-12 rounded-2xl border border-[var(--line)] bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[var(--accent)]"
            inputMode="numeric"
            placeholder="e.g. 210"
            required
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Relevant Experience
          <textarea
            value={relevantExperience}
            onChange={(event) => setRelevantExperience(event.target.value)}
            className="min-h-28 rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[var(--accent)]"
            placeholder="Summarize similar industrial estate, infrastructure, or supply experience."
            required
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Notes
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="min-h-24 rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[var(--accent)]"
            placeholder="Additional notes, assumptions, or clarification points."
          />
        </label>

        <div className="rounded-[24px] border border-dashed border-[var(--line)] bg-white/70 p-5">
          <p className="text-sm font-semibold text-slate-950">Dummy Upload Area</p>
          <p className="mt-2 text-sm leading-7 copy-muted">
            Upload area is visual only for this MVP. It represents tender
            document submission without implementing real file storage.
          </p>
          <div className="mt-4 rounded-[18px] bg-[var(--accent-soft)] px-4 py-4 text-sm text-[var(--accent-strong)]">
            {selectedTender
              ? `Ready to attach supporting files for ${selectedTender.code}.`
              : "Select a tender to preview upload context."}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="inline-flex rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-92"
          >
            Submit Proposal Simulation
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setOfferedPrice("");
              setEstimatedDurationDays("");
              setRelevantExperience("");
              setNotes("");
            }}
            className="inline-flex rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}

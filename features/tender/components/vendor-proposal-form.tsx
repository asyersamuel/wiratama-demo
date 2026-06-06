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
            This success state is local to the MVP. No file upload, database write, or backend submission is performed.
          </p>
        </div>
      ) : null}

      <div className="rounded-[24px] border border-[#ead8dc] bg-[#fcf7f8] p-5">
        <p className="code-label">Selected Tender Context</p>
        <p className="mt-2 text-lg font-semibold text-slate-950">
          {selectedTender ? `${selectedTender.code} / ${selectedTender.title}` : "Select a tender package"}
        </p>
        <p className="mt-2 text-sm copy-muted">
          Use the clean form below to demonstrate vendor submission without adding any real procurement workflow complexity.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Select Tender
            <select
              value={selectedTenderId}
              onChange={(event) => setSelectedTenderId(event.target.value)}
              className="tender-input"
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
              className="tender-input"
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
              className="tender-input"
              placeholder="Person in charge"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Offered Price (IDR)
            <input
              value={offeredPrice}
              onChange={(event) => setOfferedPrice(event.target.value)}
              className="tender-input"
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
            className="tender-input"
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
            className="tender-textarea min-h-32"
            placeholder="Summarize similar industrial estate, infrastructure, or supply experience."
            required
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Notes
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="tender-textarea min-h-28"
            placeholder="Additional notes, assumptions, or clarification points."
          />
        </label>

        <div className="rounded-[24px] border border-dashed border-[#d8b1b9] bg-[#fcf7f8] p-5">
          <p className="text-sm font-semibold text-slate-950">
            Visual Upload Area
          </p>
          <p className="mt-2 text-sm leading-7 copy-muted">
            This upload section is intentionally visual-only for the MVP. It represents tender document submission without implementing real file storage.
          </p>
          <div className="mt-4 rounded-[18px] border border-[#ead8dc] bg-white px-4 py-4 text-sm text-[var(--accent-strong)]">
            {selectedTender
              ? `Ready to attach supporting files for ${selectedTender.code}.`
              : "Select a tender to preview upload context."}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="btn btn-primary"
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
            className="btn btn-secondary"
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}

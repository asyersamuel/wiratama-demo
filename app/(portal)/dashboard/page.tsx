"use client";

import Link from "next/link";
import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { MetricCard } from "@/components/ui/metric-card";
import { StatusPill } from "@/components/ui/status-pill";
import { contractors } from "@/features/contractor/data/contractors";
import { useDemoTenders } from "@/features/tender/demo-store";
import { TenderAreaMap } from "@/features/tender/components/tender-area-map";
import { tenders as seedTenders } from "@/features/tender/data/tenders";
import type { Tender } from "@/features/tender/types";
import {
  getNeedReviewProposalCount,
  getTenderAreaMapItemsFromTenders,
  getTenderDeadlineMeta,
} from "@/features/tender/service";
import { trackingRecords } from "@/features/tracking/data/items";
import { formatDate } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

function getProgressTone(daysToDeadline: number) {
  if (daysToDeadline < 0) {
    return "text-red-700";
  }

  if (daysToDeadline <= 5) {
    return "text-amber-700";
  }

  return "text-slate-700";
}

export default function DashboardPage() {
  const tenders = useDemoTenders(seedTenders);
  const mapItems = getTenderAreaMapItemsFromTenders(tenders, "internal");
  const activeTender = tenders.filter(
    (item) => item.status !== "draft" && item.status !== "closed",
  );
  const openTender = tenders.filter((item) => item.status === "open");
  const underReviewTender = tenders.filter(
    (item) => item.status === "under_review" || item.status === "shortlisting",
  );
  const allProposals = tenders.flatMap((item) => item.proposals);
  const shortlisted = allProposals.filter((proposal) => proposal.status === "shortlisted");

  return (
    <div className="space-y-6">
      <PortalPageIntro
        eyebrow="POV Internal PT WIP"
        title="Dashboard Internal PT WIP"
        description="Pantau status tender, proposal masuk, progres deadline, kontraktor terkait, dan aktivitas operasional kawasan."
      />

      <TenderAreaMap audience="internal" items={mapItems} />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Tender Aktif"
          value={String(activeTender.length)}
          hint="Paket tender yang sedang berjalan pada skenario demo saat ini."
        />
        <MetricCard
          label="Tender Open"
          value={String(openTender.length)}
          hint="Tender yang masih terbuka untuk partisipasi vendor."
        />
        <MetricCard
          label="Tender Under Review"
          value={String(underReviewTender.length)}
          hint="Tender yang sudah masuk proses evaluasi atau shortlist internal."
        />
        <MetricCard
          label="Proposal Masuk"
          value={String(allProposals.length)}
          hint="Seluruh proposal vendor yang saat ini terbaca oleh browser demo."
        />
        <MetricCard
          label="Proposal Perlu Review"
          value={String(
            tenders.reduce((sum, tender) => sum + getNeedReviewProposalCount(tender.proposals), 0),
          )}
          hint="Proposal dengan status Submitted, Under Review, atau Clarification."
        />
        <MetricCard
          label="Shortlisted"
          value={String(shortlisted.length)}
          hint="Proposal yang sudah masuk shortlist untuk tindak lanjut lebih lanjut."
        />
        <MetricCard
          label="Kontraktor Aktif"
          value={String(contractors.length)}
          hint="Direktori vendor dan kontraktor yang siap dipakai dalam demo internal."
        />
        <MetricCard
          label="Tracking Hari Ini"
          value={String(trackingRecords.length)}
          hint="Aktivitas operasional kawasan yang tetap terpisah dari alur tender."
        />
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="code-label">Ringkasan tender internal</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Paket tender dan proyek yang perlu dipantau
            </h2>
          </div>
          <p className="max-w-2xl text-sm copy-muted">
            Setiap kartu merangkum progres deadline, proposal masuk, kontraktor
            terkait, serta dokumen yang paling sering diakses oleh tim internal.
          </p>
        </div>

        <div className="grid gap-4">
          {tenders.map((tender) => {
            const progress = getTenderDeadlineMeta(tender);
            const relatedParties = tender.relatedParties.reduce<
              Array<{
                id: string;
                name: string;
                verificationStatus: string;
                workstream: string;
                proposalStatus?: Tender["proposals"][number]["status"];
              }>
            >((accumulator, party) => {
                const contractor = contractors.find(
                  (item) => item.id === party.contractorId,
                );
                const proposal = tender.proposals.find(
                  (item) => item.vendorId === party.contractorId,
                );

                if (!contractor) {
                  return accumulator;
                }

                accumulator.push({
                  id: contractor.id,
                  name: contractor.name,
                  verificationStatus: contractor.verificationStatus,
                  workstream: party.workstream,
                  proposalStatus: proposal?.status,
                });

                return accumulator;
              }, [])
              .slice(0, 3);

            return (
              <article key={tender.id} className="tender-card p-6 sm:p-7">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                  <div className="max-w-4xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="code-label">{tender.code}</p>
                      <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold text-slate-950">
                      {tender.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 copy-muted">
                      {tender.description}
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-[var(--line)] bg-[#faf8f8] p-4 xl:max-w-sm">
                    <p className="code-label">Progress deadline</p>
                    <p className="mt-3 text-2xl font-semibold text-slate-950">
                      {progress.progressPercent}% waktu berjalan
                    </p>
                    <p className={`mt-2 text-sm font-medium ${getProgressTone(progress.daysToDeadline)}`}>
                      {progress.daysToDeadline >= 0
                        ? `${progress.daysToDeadline} hari menuju deadline`
                        : `${Math.abs(progress.daysToDeadline)} hari melewati deadline`}
                    </p>
                    <p className="mt-2 text-sm copy-muted">{progress.label}</p>
                    <div className="mt-4 h-2 rounded-full bg-[#f0e6e8]">
                      <div
                        className="h-2 rounded-full bg-[var(--accent)] transition-all"
                        style={{ width: `${progress.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                  <div className="space-y-5">
                    <div className="grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-3">
                      <div className="rounded-[20px] border border-[var(--line)] bg-white/80 p-4">
                        <p className="code-label">Deadline</p>
                        <p className="mt-2 font-medium text-slate-900">
                          {formatDate(tender.deadline)}
                        </p>
                      </div>
                      <div className="rounded-[20px] border border-[var(--line)] bg-white/80 p-4">
                        <p className="code-label">Proposal masuk</p>
                        <p className="mt-2 font-medium text-slate-900">
                          {tender.proposals.length} proposal
                        </p>
                      </div>
                      <div className="rounded-[20px] border border-[var(--line)] bg-white/80 p-4">
                        <p className="code-label">Perlu review</p>
                        <p className="mt-2 font-medium text-slate-900">
                          {getNeedReviewProposalCount(tender.proposals)} proposal
                        </p>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-[var(--line)] bg-[#faf8f8] p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="code-label">Kontraktor terkait</p>
                          <h4 className="mt-2 text-lg font-semibold text-slate-950">
                            Vendor dan kontraktor yang relevan
                          </h4>
                        </div>
                        <Link href="/contractors" className="btn btn-secondary px-4 py-2">
                          Lihat Direktori
                        </Link>
                      </div>

                      <div className="mt-4 grid gap-3">
                        {relatedParties.length === 0 ? (
                          <div className="rounded-[18px] border border-dashed border-[var(--line)] bg-white/80 px-4 py-4 text-sm copy-muted">
                            Belum ada kontraktor terkait yang ditandai pada paket ini.
                          </div>
                        ) : (
                          relatedParties.map((party) => (
                            <div
                              key={party.id}
                              className="rounded-[18px] border border-[var(--line)] bg-white/85 px-4 py-4"
                            >
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                  <p className="font-semibold text-slate-950">{party.name}</p>
                                  <p className="mt-2 text-sm copy-muted">{party.workstream}</p>
                                  <p className="mt-2 text-sm text-slate-700">
                                    Status vendor: {party.verificationStatus}
                                  </p>
                                  <p className="mt-1 text-sm text-slate-700">
                                    Status proposal:{" "}
                                    {party.proposalStatus
                                      ? getStatusLabel(party.proposalStatus)
                                      : "Belum submit"}
                                  </p>
                                </div>
                                <Link
                                  href={`/contractors/${party.id}`}
                                  className="btn btn-secondary px-4 py-2"
                                >
                                  Lihat Profil
                                </Link>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-[var(--line)] bg-[#faf8f8] p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="code-label">Dokumen tender</p>
                        <h4 className="mt-2 text-lg font-semibold text-slate-950">
                          Dokumen yang sering diakses
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button type="button" className="btn btn-secondary px-4 py-2">
                          Akses Dokumen
                        </button>
                        <button type="button" className="btn btn-secondary-accent px-4 py-2">
                          Preview Dokumen
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {tender.frequentDocuments.map((document) => (
                        <div
                          key={`${tender.id}-${document.id}`}
                          className="rounded-[18px] border border-[var(--line)] bg-white/85 px-4 py-4"
                        >
                          <p className="font-medium text-slate-900">{document.label}</p>
                          <p className="mt-2 text-sm copy-muted">
                            Dokumen visual-only untuk kebutuhan demo procurement internal.
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3 border-t border-[var(--line)] pt-5">
                      <Link href={`/tender/internal/${tender.id}`} className="btn btn-primary">
                        Review Tender
                      </Link>
                      <Link href={`/tender/${tender.id}`} className="btn btn-secondary">
                        Detail Tender
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

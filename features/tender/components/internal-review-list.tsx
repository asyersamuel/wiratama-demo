"use client";

import Link from "next/link";
import { StatusPill } from "@/components/ui/status-pill";
import { useDemoTenders } from "@/features/tender/demo-store";
import { getTenderDeadlineMeta } from "@/features/tender/service";
import type { Tender } from "@/features/tender/types";
import { formatDate } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

type InternalReviewListProps = {
  tenders: Tender[];
};

function getNeedReviewCount(proposals: Tender["proposals"]) {
  return proposals.filter((proposal) =>
    ["submitted", "under_review", "clarification"].includes(proposal.status),
  ).length;
}

export function InternalReviewList({ tenders: seedTenders }: InternalReviewListProps) {
  const tenders = useDemoTenders(seedTenders).filter((tender) => tender.proposals.length > 0);
  const totalProposals = tenders.reduce((sum, tender) => sum + tender.proposals.length, 0);
  const needReview = tenders.reduce(
    (sum, tender) => sum + getNeedReviewCount(tender.proposals),
    0,
  );
  const shortlisted = tenders.reduce(
    (sum, tender) =>
      sum + tender.proposals.filter((proposal) => proposal.status === "shortlisted").length,
    0,
  );

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
        <article className="tender-card p-5">
          <p className="code-label">Tender dalam review</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {tenders.length}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Paket tender yang saat ini memiliki proposal untuk direview.
          </p>
        </article>
        <article className="tender-card p-5">
          <p className="code-label">Proposal masuk</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {totalProposals}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Total proposal dari seluruh tender review pada demo internal.
          </p>
        </article>
        <article className="tender-card p-5">
          <p className="code-label">Perlu review</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {needReview}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Proposal dengan status Submitted, Under Review, atau Clarification.
          </p>
        </article>
        <article className="tender-card p-5">
          <p className="code-label">Shortlisted</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {shortlisted}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Proposal yang sudah masuk shortlist pada review internal.
          </p>
        </article>
      </section>

      <section className="tender-card p-6 sm:p-7">
        <div className="border-b border-[var(--line)] pb-4">
          <p className="code-label">Review tender</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            Daftar tender yang perlu ditinjau
          </h2>
          <p className="mt-3 text-sm leading-7 copy-muted">
            Pilih satu tender untuk membuka detail review, melihat proposal vendor,
            dan mengubah status proposal secara lokal untuk kebutuhan demo.
          </p>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-2">
          {tenders.map((tender) => {
            const needReviewCount = getNeedReviewCount(tender.proposals);
            const progress = getTenderDeadlineMeta(tender);

            return (
              <article
                key={tender.id}
                className="rounded-[22px] border border-[var(--line)] bg-[#faf8f8] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="code-label">{tender.code}</p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-950">
                      {tender.title}
                    </h3>
                    <p className="mt-2 text-sm copy-muted">{tender.location}</p>
                  </div>
                  <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
                </div>

                <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="code-label">Deadline</dt>
                    <dd className="mt-2 font-medium text-slate-900">{formatDate(tender.deadline)}</dd>
                    <p className="mt-2 text-xs text-slate-500">
                      {progress.progressPercent}% waktu berjalan
                    </p>
                  </div>
                  <div>
                    <dt className="code-label">Proposal masuk</dt>
                    <dd className="mt-2 font-medium text-slate-900">{tender.proposals.length}</dd>
                  </div>
                  <div>
                    <dt className="code-label">Perlu review</dt>
                    <dd className="mt-2 font-medium text-slate-900">{needReviewCount}</dd>
                  </div>
                  <div>
                    <dt className="code-label">Status tender</dt>
                    <dd className="mt-2 font-medium text-slate-900">{getStatusLabel(tender.status)}</dd>
                  </div>
                </dl>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm copy-muted">
                    {progress.daysToDeadline >= 0
                      ? `${progress.daysToDeadline} hari menuju deadline`
                      : `${Math.abs(progress.daysToDeadline)} hari melewati deadline`}
                  </p>
                  <Link href={`/tender/internal/${tender.id}`} className="btn btn-primary">
                    Review Tender
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

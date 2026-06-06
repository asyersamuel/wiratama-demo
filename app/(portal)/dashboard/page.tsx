"use client";

import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { MetricCard } from "@/components/ui/metric-card";
import { SectionCard } from "@/components/ui/section-card";
import { StatusPill } from "@/components/ui/status-pill";
import { contractors } from "@/features/contractor/data/contractors";
import { useDemoTenders } from "@/features/tender/demo-store";
import { tenders as seedTenders } from "@/features/tender/data/tenders";
import { trackingRecords } from "@/features/tracking/data/items";
import { getStatusLabel } from "@/lib/status";

export default function DashboardPage() {
  const tenders = useDemoTenders(seedTenders);
  const activeTender = tenders.filter(
    (item) => item.status !== "draft" && item.status !== "closed",
  );
  const openTender = tenders.filter((item) => item.status === "open");
  const underReviewTender = tenders.filter(
    (item) => item.status === "under_review" || item.status === "shortlisting",
  );
  const allProposals = tenders.flatMap((item) => item.proposals);
  const needReview = allProposals.filter((proposal) =>
    ["submitted", "under_review", "clarification"].includes(proposal.status),
  );
  const shortlisted = allProposals.filter((proposal) => proposal.status === "shortlisted");
  const latestProposal = [...allProposals].sort(
    (left, right) =>
      new Date(right.submittedAt).getTime() - new Date(left.submittedAt).getTime(),
  )[0];

  return (
    <div className="space-y-6">
      <PortalPageIntro
        eyebrow="Mode Internal PT WIP"
        title="Dashboard Ringkasan Internal"
        description="Ringkasan ini dipakai tim internal PT WIP untuk melihat kondisi tender aktif, proposal masuk, vendor yang sedang direview, dan gambaran operasional harian."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="tender aktif"
          value={String(activeTender.length)}
          hint="Tender yang sedang berjalan pada skenario demo saat ini."
        />
        <MetricCard
          label="tender open"
          value={String(openTender.length)}
          hint="Tender yang masih terbuka untuk partisipasi vendor."
        />
        <MetricCard
          label="under review"
          value={String(underReviewTender.length)}
          hint="Tender yang sudah mulai masuk proses review internal."
        />
        <MetricCard
          label="proposal masuk"
          value={String(allProposals.length)}
          hint="Total proposal yang terlihat pada browser demo ini."
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="perlu review"
          value={String(needReview.length)}
          hint="Proposal yang masih perlu ditindaklanjuti oleh tim internal."
        />
        <MetricCard
          label="shortlisted"
          value={String(shortlisted.length)}
          hint="Proposal yang sudah masuk kandidat shortlist."
        />
        <MetricCard
          label="kontraktor aktif"
          value={String(contractors.length)}
          hint="Direktori vendor utama yang disiapkan untuk demo pitch PT WIP."
        />
        <MetricCard
          label="tracking hari ini"
          value={String(trackingRecords.length)}
          hint="Entry operasional kawasan yang tetap terpisah dari alur tender."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
        <SectionCard
          title="Status Tender Ringkas"
          description="Snapshot cepat untuk tender yang sedang berjalan dan perlu dipresentasikan dari sisi internal PT WIP."
        >
          <div className="space-y-4">
            {tenders.map((tender) => (
              <article
                key={tender.id}
                className="rounded-[22px] border border-[var(--line)] bg-white/75 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="code-label">{tender.code}</p>
                    <h3 className="mt-2 font-semibold text-slate-950">{tender.title}</h3>
                  </div>
                  <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
                </div>
                <p className="mt-3 text-sm copy-muted">
                  {tender.proposals.length} proposal masuk pada paket ini.
                </p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Laporan Progress Singkat"
          description="Ringkasan status demo agar presenter dapat berpindah dari vendor ke internal tanpa kehilangan konteks proposal utama."
        >
          <div className="space-y-4 text-sm leading-7 text-slate-700">
            <p>
              Proposal vendor utama akan muncul otomatis di area review internal
              setelah dikirim dari halaman Ajukan Proposal.
            </p>
            <p>
              Tim internal dapat mengubah status proposal menjadi Under Review,
              Clarification, Shortlisted, Awarded, atau Not Selected secara lokal.
            </p>
            <p>
              Perubahan status yang dilakukan internal akan langsung terlihat kembali
              pada Portal Vendor di browser yang sama.
            </p>
            {latestProposal ? (
              <div className="rounded-[20px] border border-[var(--line)] bg-white/75 p-4">
                <p className="code-label">Update proposal terbaru</p>
                <p className="mt-2 font-semibold text-slate-950">
                  {latestProposal.vendorName}
                </p>
                <p className="mt-2">
                  Status terakhir: {getStatusLabel(latestProposal.status)}
                </p>
              </div>
            ) : null}
          </div>
        </SectionCard>
      </section>
    </div>
  );
}

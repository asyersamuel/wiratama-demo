"use client";

import Link from "next/link";
import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { TenderAreaMap } from "@/features/tender/components/tender-area-map";
import { TenderDirectory } from "@/features/tender/components/tender-directory";
import { useDemoTenders } from "@/features/tender/demo-store";
import { tenders as seedTenders } from "@/features/tender/data/tenders";
import { getTenderAreaMapItemsFromTenders } from "@/features/tender/service";
import { getStatusLabel } from "@/lib/status";

const demoVendorId = "prima-infrastruktur-abadi";

export default function TenderPage() {
  const tenders = useDemoTenders(seedTenders);
  const mapItems = getTenderAreaMapItemsFromTenders(tenders, "vendor");
  const vendorProposals = tenders.flatMap((tender) =>
    tender.proposals.filter((proposal) => proposal.vendorId === demoVendorId),
  );
  const summary = {
    total: vendorProposals.length,
    submitted: vendorProposals.filter((proposal) => proposal.status === "submitted").length,
    underReview: vendorProposals.filter((proposal) =>
      ["under_review", "clarification"].includes(proposal.status),
    ).length,
    shortlisted: vendorProposals.filter((proposal) => proposal.status === "shortlisted").length,
  };

  return (
    <div className="space-y-6">
      <PortalPageIntro
        eyebrow="POV Vendor"
        title="Dashboard Tender Vendor"
        description="Lihat tender yang tersedia, filter berdasarkan kebutuhan, lalu buka detail sebelum mengajukan proposal."
      />

      <TenderAreaMap audience="vendor" items={mapItems} />

      <section className="tender-card p-5 sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-2xl">
            <p className="code-label">Proposal saya</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Ringkasan pengajuan vendor
            </h2>
            <p className="mt-3 text-sm leading-7 copy-muted">
              Ringkasan ini membantu vendor melihat posisi proposal yang sudah
              dikirim sebelum berpindah ke Portal Vendor.
            </p>
          </div>

          <Link href="/tender/vendor" className="btn btn-primary">
            Lihat Portal Vendor
          </Link>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-[22px] border border-[var(--line)] bg-[#faf8f8] p-4">
            <p className="code-label">Total proposal</p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">{summary.total}</p>
            <p className="mt-2 text-sm copy-muted">
              Jumlah pengajuan yang tercatat pada browser demo ini.
            </p>
          </article>
          <article className="rounded-[22px] border border-[var(--line)] bg-[#faf8f8] p-4">
            <p className="code-label">{getStatusLabel("submitted")}</p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">
              {summary.submitted}
            </p>
            <p className="mt-2 text-sm copy-muted">
              Proposal yang baru dikirim dan menunggu tindak lanjut awal.
            </p>
          </article>
          <article className="rounded-[22px] border border-[var(--line)] bg-[#faf8f8] p-4">
            <p className="code-label">{getStatusLabel("under_review")}</p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">
              {summary.underReview}
            </p>
            <p className="mt-2 text-sm copy-muted">
              Proposal yang sedang dievaluasi atau menunggu klarifikasi.
            </p>
          </article>
          <article className="rounded-[22px] border border-[var(--line)] bg-[#faf8f8] p-4">
            <p className="code-label">{getStatusLabel("shortlisted")}</p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">
              {summary.shortlisted}
            </p>
            <p className="mt-2 text-sm copy-muted">
              Proposal yang sudah masuk shortlist pada simulasi tender.
            </p>
          </article>
        </div>
      </section>

      <TenderDirectory tenders={tenders} />
    </div>
  );
}

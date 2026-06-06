import Link from "next/link";
import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { MetricCard } from "@/components/ui/metric-card";
import { SectionCard } from "@/components/ui/section-card";
import { StatusPill } from "@/components/ui/status-pill";
import { VendorProposalForm } from "@/features/tender/components/vendor-proposal-form";
import {
  getOpenTenders,
  getVendorProposalSummary,
} from "@/features/tender/service";
import { formatCurrency, formatDate } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

export default async function VendorTenderPage() {
  const [openTenders, vendorSummary] = await Promise.all([
    getOpenTenders(),
    getVendorProposalSummary(),
  ]);

  return (
    <>
      <PortalPageIntro
        eyebrow="Vendor Portal"
        title="Vendor Portal Simulation"
        description="Explore available tender opportunities and simulate how contractors or suppliers submit a proposal to PT WIP."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="available tenders"
          value={String(vendorSummary.availableTenders)}
          hint="Open opportunities currently visible to external vendors."
        />
        <MetricCard
          label="submitted proposals"
          value={String(vendorSummary.submittedProposals)}
          hint="Proposal records shown for the demo vendor account."
        />
        <MetricCard
          label="under review"
          value={String(vendorSummary.underReview)}
          hint="Submissions still being reviewed by PT WIP."
        />
        <MetricCard
          label="shortlisted"
          value={String(vendorSummary.shortlisted)}
          hint="Proposals that advanced to deeper evaluation."
        />
      </section>

      <SectionCard
        title="Available Tenders"
        description="Keep this list simple and visible. It demonstrates how vendors discover relevant estate development opportunities in one centralized portal."
      >
        <div className="grid gap-4">
          {openTenders.map((tender) => (
            <article
              key={tender.id}
              className="rounded-[24px] border border-[var(--line)] bg-white/80 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-3xl">
                  <p className="code-label">{tender.code}</p>
                  <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-slate-950">
                    {tender.title}
                  </h2>
                  <p className="mt-2 text-sm copy-muted">
                    {tender.category} · {tender.location} · {tender.zone}
                  </p>
                </div>
                <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
              </div>

              <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2 xl:grid-cols-3">
                <p>Estimated Value: {formatCurrency(tender.estimatedValue)}</p>
                <p>Deadline: {formatDate(tender.deadline)}</p>
                <p>Proposal Count: {tender.proposals.length}</p>
              </div>

              <Link
                href={`/tender/${tender.id}`}
                className="mt-5 inline-flex rounded-full border border-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent-soft)]"
              >
                View Tender Detail
              </Link>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title={`My Proposal Status · ${vendorSummary.vendorName}`}
        description="This section shows a lightweight vendor-side tracking view using mock proposal records only."
      >
        <div className="grid gap-4">
          {vendorSummary.proposals.map((proposal) => (
            <article
              key={`${proposal.tenderId}-${proposal.status}`}
              className="rounded-[24px] border border-[var(--line)] bg-white/80 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="code-label">{proposal.tenderCode}</p>
                  <h2 className="mt-2 text-lg font-semibold text-slate-950">
                    {proposal.tenderTitle}
                  </h2>
                </div>
                <StatusPill>{getStatusLabel(proposal.status)}</StatusPill>
              </div>

              <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2 xl:grid-cols-4">
                <p>Offered Price: {formatCurrency(proposal.offeredPrice)}</p>
                <p>Duration: {proposal.estimatedDurationDays} days</p>
                <p>Submitted: {formatDate(proposal.submittedAt)}</p>
                <p>Status: {getStatusLabel(proposal.status)}</p>
              </div>

              <Link
                href={`/tender/${proposal.tenderId}`}
                className="mt-5 inline-flex text-sm font-semibold text-[var(--accent-strong)]"
              >
                Open Tender Context
              </Link>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Submit Proposal Simulation"
        description="The form below is intentionally local-only. It helps tell the tender submission story without adding backend complexity."
      >
        <VendorProposalForm
          tenders={openTenders.map((item) => ({
            id: item.id,
            code: item.code,
            title: item.title,
          }))}
          defaultCompanyName={vendorSummary.vendorName}
        />
      </SectionCard>
    </>
  );
}

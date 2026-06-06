import Link from "next/link";
import { DemoNote } from "@/components/shared/demo-note";
import { StatusPill } from "@/components/ui/status-pill";
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
  const suggestedTenders = openTenders.slice(0, 3);

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <p className="code-label">Tender Portal / Vendor Portal</p>
        <div className="tender-card p-7 sm:p-9">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <span className="eyebrow">Vendor Dashboard</span>
              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Vendor Proposal Dashboard
              </h1>
              <p className="mt-4 text-base leading-8 copy-muted">
                Monitor proposal status for the demo vendor, then jump back into tender detail whenever another opportunity needs review.
              </p>
            </div>

            <div className="xl:max-w-sm">
              <DemoNote label="Vendor Flow">
                Use this dashboard to review submitted proposal status and return to open opportunities.
              </DemoNote>
            </div>
          </div>
        </div>
      </section>

      <section className="tender-card p-6 sm:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="code-label">Vendor Profile Summary</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              {vendorSummary.vendorName}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 copy-muted">
              Demo external party profile used to simulate proposal participation in PT WIP tender opportunities.
            </p>
          </div>
          <StatusPill tone="accent">{vendorSummary.vendorStatus}</StatusPill>
        </div>

        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
          <div className="rounded-[22px] border border-[var(--line)] bg-[#faf8f8] p-4">
            <dt className="code-label">Type</dt>
            <dd className="mt-2 font-medium text-slate-900">
              {vendorSummary.vendorType}
            </dd>
          </div>
          <div className="rounded-[22px] border border-[var(--line)] bg-[#faf8f8] p-4">
            <dt className="code-label">Category</dt>
            <dd className="mt-2 font-medium text-slate-900">
              {vendorSummary.vendorCategory}
            </dd>
          </div>
          <div className="rounded-[22px] border border-[var(--line)] bg-[#faf8f8] p-4">
            <dt className="code-label">Portal Focus</dt>
            <dd className="mt-2 font-medium text-slate-900">
              Proposal status and open tender shortcuts
            </dd>
          </div>
        </dl>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="tender-card p-5">
          <p className="code-label">submitted proposals</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {vendorSummary.submittedProposals}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Proposal records shown for the demo vendor account.
          </p>
        </article>
        <article className="tender-card p-5">
          <p className="code-label">under review</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {vendorSummary.underReview}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Submissions still being reviewed by PT WIP.
          </p>
        </article>
        <article className="tender-card p-5">
          <p className="code-label">shortlisted</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {vendorSummary.shortlisted}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Proposals that advanced to deeper evaluation.
          </p>
        </article>
        <article className="tender-card p-5">
          <p className="code-label">open opportunities</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {vendorSummary.availableTenders}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Open tenders that can still be reviewed from the main catalog.
          </p>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <section className="tender-card p-6 sm:p-7">
          <div className="border-b border-[var(--line)] pb-5">
            <p className="code-label">My Proposal Status</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Submitted Proposals
            </h2>
          </div>

          <div className="mt-6 space-y-4">
            {vendorSummary.proposals.map((proposal) => (
              <article
                key={`${proposal.tenderId}-${proposal.submittedAt}`}
                className="rounded-[22px] border border-[var(--line)] bg-[#faf8f8] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="code-label">{proposal.tenderCode}</p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-950">
                      {proposal.tenderTitle}
                    </h3>
                  </div>
                  <StatusPill>{getStatusLabel(proposal.status)}</StatusPill>
                </div>

                <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="code-label">Offered Price</dt>
                    <dd className="mt-2 font-medium text-slate-900">
                      {formatCurrency(proposal.offeredPrice)}
                    </dd>
                  </div>
                  <div>
                    <dt className="code-label">Duration</dt>
                    <dd className="mt-2 font-medium text-slate-900">
                      {proposal.estimatedDurationDays} days
                    </dd>
                  </div>
                  <div>
                    <dt className="code-label">Submitted Date</dt>
                    <dd className="mt-2 font-medium text-slate-900">
                      {formatDate(proposal.submittedAt)}
                    </dd>
                  </div>
                  <div>
                    <dt className="code-label">Status</dt>
                    <dd className="mt-2 font-medium text-slate-900">
                      {getStatusLabel(proposal.status)}
                    </dd>
                  </div>
                </dl>

                <Link
                  href={`/tender/${proposal.tenderId}`}
                  className="mt-5 btn btn-secondary w-fit px-4 py-2"
                >
                  View Tender Detail
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="tender-card p-6 sm:p-7">
            <div className="border-b border-[var(--line)] pb-5">
              <p className="code-label">Suggested Open Tenders</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                Quick Opportunity Shortcuts
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              {suggestedTenders.map((tender) => (
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
                      <p className="mt-2 text-sm copy-muted">
                        {tender.zone} / {formatDate(tender.deadline)}
                      </p>
                    </div>
                    <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
                  </div>

                  <Link
                    href={`/tender/${tender.id}`}
                    className="mt-5 btn btn-secondary w-fit px-4 py-2"
                  >
                    View Detail
                  </Link>
                </article>
              ))}
            </div>

            <Link
              href="/tender"
              className="mt-6 btn btn-primary w-full"
            >
              Browse All Tenders
            </Link>
          </div>

          <div className="tender-card p-6">
            <p className="code-label">Next Step</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">
              Continue from proposal status
            </h2>
            <p className="mt-3 text-sm leading-7 copy-muted">
              Return to the Tender Catalog to review another package, or open any Tender Detail card above to continue the demo story.
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}

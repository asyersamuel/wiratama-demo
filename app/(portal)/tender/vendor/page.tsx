import Link from "next/link";
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
    <div className="space-y-6">
      <section className="space-y-4">
        <p className="code-label">Tender Portal / Vendor Portal</p>
        <div className="tender-card p-7 sm:p-9">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <span className="eyebrow">Vendor Portal Simulation</span>
              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Vendor Portal Simulation
              </h1>
              <p className="mt-4 text-base leading-8 copy-muted">
                Demonstrate how a contractor or supplier reviews an open tender package and submits a proposal inside a controlled local-only MVP flow.
              </p>
            </div>

            <div className="rounded-[24px] border border-[#ead8dc] bg-[#fcf7f8] p-5 xl:max-w-sm">
              <p className="code-label">Demo Scope</p>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                This page keeps submission fully visible for presentation purposes. No authentication, database write, or real file upload is added.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="tender-card p-5">
          <p className="code-label">available tenders</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {vendorSummary.availableTenders}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Open opportunities currently visible to external vendors.
          </p>
        </article>
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
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="space-y-6">
          <section className="tender-card p-6 sm:p-7">
            <div className="border-b border-[var(--line)] pb-5">
              <p className="code-label">Available Tenders</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                Open Packages for Vendors
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              {openTenders.map((tender) => (
                <article
                  key={tender.id}
                  className="rounded-[22px] border border-[var(--line)] bg-[#faf8f8] p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="max-w-3xl">
                      <p className="code-label">{tender.code}</p>
                      <h3 className="mt-2 text-lg font-semibold text-slate-950">
                        {tender.title}
                      </h3>
                      <p className="mt-2 text-sm copy-muted">
                        {tender.category} / {tender.location} / {tender.zone}
                      </p>
                    </div>
                    <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
                  </div>

                  <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="code-label">Estimated Value</dt>
                      <dd className="mt-2 font-medium text-slate-900">
                        {formatCurrency(tender.estimatedValue)}
                      </dd>
                    </div>
                    <div>
                      <dt className="code-label">Deadline</dt>
                      <dd className="mt-2 font-medium text-slate-900">
                        {formatDate(tender.deadline)}
                      </dd>
                    </div>
                  </dl>

                  <Link
                    href={`/tender/${tender.id}`}
                    className="mt-5 btn btn-secondary px-4 py-2 w-fit"
                  >
                    View Tender Detail
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="tender-card p-6 sm:p-7">
            <div className="border-b border-[var(--line)] pb-5">
              <p className="code-label">My Proposal Status</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                {vendorSummary.vendorName}
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              {vendorSummary.proposals.map((proposal) => (
                <article
                  key={`${proposal.tenderId}-${proposal.status}`}
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
                      <dt className="code-label">Submitted</dt>
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
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="tender-card p-6 sm:p-7">
          <div className="border-b border-[var(--line)] pb-5">
            <p className="code-label">Submit Proposal</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Procurement Form Demo
            </h2>
          </div>

          <div className="mt-6">
            <VendorProposalForm
              tenders={openTenders.map((item) => ({
                id: item.id,
                code: item.code,
                title: item.title,
              }))}
              defaultCompanyName={vendorSummary.vendorName}
            />
          </div>
        </section>
      </section>
    </div>
  );
}

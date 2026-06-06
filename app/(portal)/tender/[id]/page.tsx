import Link from "next/link";
import { notFound } from "next/navigation";
import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { Timeline } from "@/components/shared/timeline";
import { SectionCard } from "@/components/ui/section-card";
import { StatusPill } from "@/components/ui/status-pill";
import { getTenderById } from "@/features/tender/service";
import { formatCurrency, formatDate } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

export default async function TenderDetailPage(props: PageProps<"/tender/[id]">) {
  const { id } = await props.params;
  const tender = await getTenderById(id);

  if (!tender) {
    notFound();
  }

  return (
    <>
      <Link
        href="/tender"
        className="inline-flex w-fit rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
      >
        Back to Tender Directory
      </Link>

      <div className="panel p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <PortalPageIntro
            eyebrow={tender.code}
            title={tender.title}
            description={tender.description}
          />
          <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-700">
          <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 font-medium text-[var(--accent-strong)]">
            {tender.category}
          </span>
          <span className="rounded-full border border-[var(--line)] px-3 py-1">
            Estimated Value: {formatCurrency(tender.estimatedValue)}
          </span>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <div className="panel-strong p-5">
          <p className="code-label">Location</p>
          <p className="mt-3 text-base font-semibold text-slate-950">
            {tender.location}
          </p>
        </div>
        <div className="panel-strong p-5">
          <p className="code-label">Zone</p>
          <p className="mt-3 text-base font-semibold text-slate-950">
            {tender.zone}
          </p>
        </div>
        <div className="panel-strong p-5">
          <p className="code-label">Deadline</p>
          <p className="mt-3 text-base font-semibold text-slate-950">
            {formatDate(tender.deadline)}
          </p>
        </div>
        <div className="panel-strong p-5">
          <p className="code-label">Start Date</p>
          <p className="mt-3 text-base font-semibold text-slate-950">
            {formatDate(tender.startDate)}
          </p>
        </div>
        <div className="panel-strong p-5">
          <p className="code-label">Proposals</p>
          <p className="mt-3 text-base font-semibold text-slate-950">
            {tender.proposals.length} proposal(s)
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <SectionCard title="Description">
          <p className="text-sm leading-7 copy-muted">{tender.description}</p>
        </SectionCard>

        <SectionCard title="Scope of Work">
          <ul className="space-y-3 text-sm leading-7 text-slate-700">
            {tender.scope.map((item) => (
              <li
                key={item}
                className="rounded-[18px] border border-[var(--line)] bg-white/75 px-4 py-3"
              >
                {item}
              </li>
            ))}
          </ul>
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <SectionCard title="Requirements">
          <ul className="space-y-3 text-sm leading-7 text-slate-700">
            {tender.requirements.map((item) => (
              <li
                key={item}
                className="rounded-[18px] border border-[var(--line)] bg-white/75 px-4 py-3"
              >
                {item}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Required Documents">
          <ul className="space-y-3 text-sm leading-7 text-slate-700">
            {tender.requiredDocuments.map((item) => (
              <li
                key={item}
                className="rounded-[18px] border border-[var(--line)] bg-white/75 px-4 py-3"
              >
                {item}
              </li>
            ))}
          </ul>
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <SectionCard
          title="Tender Timeline"
          description="Use this section during the pitch to make the tender feel operational, not abstract."
        >
          <Timeline items={tender.milestones} />
        </SectionCard>

        <SectionCard
          title="Proposal Overview"
          description="A light overview is enough for Phase 1. Detailed comparison remains in the internal procurement flow."
        >
          <div className="space-y-4">
            {tender.proposals.length === 0 ? (
              <div className="rounded-[22px] border border-dashed border-[var(--line)] bg-white/60 p-5 text-sm copy-muted">
                No proposals have been submitted for this tender yet.
              </div>
            ) : (
              tender.proposals.map((proposal) => (
                <article
                  key={proposal.id}
                  className="rounded-[22px] border border-[var(--line)] bg-white/75 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-950">
                        {proposal.contractorName}
                      </p>
                      <p className="mt-1 text-sm copy-muted">
                        {proposal.type === "contractor"
                          ? "Contractor Proposal"
                          : "Supplier Proposal"}
                      </p>
                    </div>
                    <StatusPill>{getStatusLabel(proposal.status)}</StatusPill>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                    <p>Offered Price: {formatCurrency(proposal.offeredPrice)}</p>
                    <p>Duration: {proposal.estimatedDurationDays} days</p>
                    <p>Submitted At: {formatDate(proposal.submittedAt)}</p>
                    <p>Technical Fit: {proposal.technicalFit}</p>
                  </div>

                  <p className="mt-4 text-sm leading-7 copy-muted">
                    {proposal.relevantExperience}
                  </p>
                </article>
              ))
            )}
          </div>
        </SectionCard>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/tender/vendor"
          className="inline-flex rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-92"
        >
          Simulate Vendor Proposal
        </Link>
        <Link
          href="/tender/internal"
          className="inline-flex rounded-full border border-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent-soft)]"
        >
          Review as Internal Team
        </Link>
      </div>
    </>
  );
}

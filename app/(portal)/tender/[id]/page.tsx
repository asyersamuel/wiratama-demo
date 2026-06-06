import Link from "next/link";
import { notFound } from "next/navigation";
import { Timeline } from "@/components/shared/timeline";
import { StatusPill } from "@/components/ui/status-pill";
import { getTenderById, getTenders } from "@/features/tender/service";
import { formatCurrency, formatDate } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

const detailTabs = [
  { href: "#general-information", label: "General Information" },
  { href: "#work-details", label: "Work Details" },
  { href: "#procurement-details", label: "Procurement Details" },
  { href: "#schedule", label: "Schedule" },
];

const relatedBusinessFields = [
  "Infrastructure Development",
  "Utility Network",
  "Industrial Estate Support",
];

export default async function TenderDetailPage(props: PageProps<"/tender/[id]">) {
  const { id } = await props.params;
  const [tender, allTenders] = await Promise.all([
    getTenderById(id),
    getTenders(),
  ]);

  if (!tender) {
    notFound();
  }

  const relatedTenders = allTenders
    .filter((item) => item.id !== tender.id)
    .slice(0, 3);

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <Link
          href="/tender"
          className="btn btn-secondary px-4 py-2 w-fit"
        >
          Back to Search Tender
        </Link>
        <p className="code-label">Tender Portal / Search Tender / Tender Detail</p>
      </div>

      <section className="tender-card p-7 sm:p-9">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow">PT WIP</span>
              <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
            </div>
            <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              {tender.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="rounded-full border border-[var(--line)] px-3 py-1">
                {tender.code}
              </span>
              <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 font-medium text-[var(--accent-strong)]">
                {tender.category}
              </span>
            </div>
            <p className="mt-5 max-w-3xl text-base leading-8 copy-muted">
              {tender.description}
            </p>
          </div>

          <dl className="grid gap-4 rounded-[24px] border border-[#ead8dc] bg-[#fcf7f8] p-5 text-sm sm:min-w-[320px] sm:grid-cols-2 xl:grid-cols-1">
            <div>
              <dt className="code-label">Estimated Value</dt>
              <dd className="mt-2 text-base font-semibold text-slate-950">
                {formatCurrency(tender.estimatedValue)}
              </dd>
            </div>
            <div>
              <dt className="code-label">Deadline</dt>
              <dd className="mt-2 text-base font-semibold text-slate-950">
                {formatDate(tender.deadline)}
              </dd>
            </div>
            <div>
              <dt className="code-label">Location</dt>
              <dd className="mt-2 text-base font-semibold text-slate-950">
                {tender.location}
              </dd>
            </div>
            <div>
              <dt className="code-label">Proposal Count</dt>
              <dd className="mt-2 text-base font-semibold text-slate-950">
                {tender.proposals.length} proposal{tender.proposals.length === 1 ? "" : "s"}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="tender-card overflow-x-auto p-2">
        <nav className="flex min-w-max gap-2">
          {detailTabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="rounded-full px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-[#fcf7f8] hover:text-slate-950"
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_320px]">
        <div className="space-y-6">
          <section
            id="general-information"
            className="tender-card scroll-mt-28 p-6 sm:p-7"
          >
            <div className="border-b border-[var(--line)] pb-5">
              <p className="code-label">General Information</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                Tender Summary
              </h2>
            </div>

            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="code-label">Code</dt>
                <dd className="mt-2 text-sm font-medium text-slate-900">
                  {tender.code}
                </dd>
              </div>
              <div>
                <dt className="code-label">Title</dt>
                <dd className="mt-2 text-sm font-medium text-slate-900">
                  {tender.title}
                </dd>
              </div>
              <div>
                <dt className="code-label">Organizer</dt>
                <dd className="mt-2 text-sm font-medium text-slate-900">
                  PT Wiratama Indramayu Perkasa
                </dd>
              </div>
              <div>
                <dt className="code-label">Category</dt>
                <dd className="mt-2 text-sm font-medium text-slate-900">
                  {tender.category}
                </dd>
              </div>
              <div>
                <dt className="code-label">Location</dt>
                <dd className="mt-2 text-sm font-medium text-slate-900">
                  {tender.location}
                </dd>
              </div>
              <div>
                <dt className="code-label">Zone</dt>
                <dd className="mt-2 text-sm font-medium text-slate-900">
                  {tender.zone}
                </dd>
              </div>
              <div>
                <dt className="code-label">Estimated Value</dt>
                <dd className="mt-2 text-sm font-medium text-slate-900">
                  {formatCurrency(tender.estimatedValue)}
                </dd>
              </div>
              <div>
                <dt className="code-label">Deadline</dt>
                <dd className="mt-2 text-sm font-medium text-slate-900">
                  {formatDate(tender.deadline)}
                </dd>
              </div>
              <div>
                <dt className="code-label">Start Date</dt>
                <dd className="mt-2 text-sm font-medium text-slate-900">
                  {formatDate(tender.startDate)}
                </dd>
              </div>
            </dl>
          </section>

          <section className="tender-card p-6 sm:p-7">
            <div className="border-b border-[var(--line)] pb-5">
              <p className="code-label">Description</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                Tender Background
              </h2>
            </div>
            <p className="mt-6 text-sm leading-8 copy-muted">
              {tender.description}
            </p>
          </section>

          <section
            id="work-details"
            className="tender-card scroll-mt-28 p-6 sm:p-7"
          >
            <div className="border-b border-[var(--line)] pb-5">
              <p className="code-label">Work Details</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                Scope of Work
              </h2>
            </div>

            <ul className="mt-6 space-y-3">
              {tender.scope.map((item) => (
                <li
                  key={item}
                  className="rounded-[20px] border border-[var(--line)] bg-[#faf8f8] px-4 py-4 text-sm leading-7 text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section
            id="procurement-details"
            className="tender-card scroll-mt-28 p-6 sm:p-7"
          >
            <div className="border-b border-[var(--line)] pb-5">
              <p className="code-label">Procurement Details</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                Requirements and Required Documents
              </h2>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">
                  Requirements
                </h3>
                <ul className="mt-4 space-y-3">
                  {tender.requirements.map((item) => (
                    <li
                      key={item}
                      className="rounded-[20px] border border-[var(--line)] bg-[#faf8f8] px-4 py-4 text-sm leading-7 text-slate-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-950">
                  Required Documents
                </h3>
                <ul className="mt-4 space-y-3">
                  {tender.requiredDocuments.map((item) => (
                    <li
                      key={item}
                      className="rounded-[20px] border border-[var(--line)] bg-[#faf8f8] px-4 py-4 text-sm leading-7 text-slate-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section
            id="schedule"
            className="tender-card scroll-mt-28 p-6 sm:p-7"
          >
            <div className="border-b border-[var(--line)] pb-5">
              <p className="code-label">Schedule</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                Tender Timeline
              </h2>
            </div>

            <div className="mt-6">
              <Timeline items={tender.milestones} />
            </div>
          </section>

          <section className="tender-card p-6 sm:p-7">
            <div className="border-b border-[var(--line)] pb-5">
              <p className="code-label">Proposal Overview</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                Current Submission Snapshot
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              {tender.proposals.length === 0 ? (
                <div className="rounded-[22px] border border-dashed border-[var(--line)] bg-[#faf8f8] p-5 text-sm copy-muted">
                  No proposals have been submitted for this tender yet.
                </div>
              ) : (
                tender.proposals.map((proposal) => (
                  <article
                    key={proposal.id}
                    className="rounded-[22px] border border-[var(--line)] bg-[#faf8f8] p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold text-slate-950">
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
                        <dt className="code-label">Submitted At</dt>
                        <dd className="mt-2 font-medium text-slate-900">
                          {formatDate(proposal.submittedAt)}
                        </dd>
                      </div>
                      <div>
                        <dt className="code-label">Technical Fit</dt>
                        <dd className="mt-2 font-medium text-slate-900">
                          {proposal.technicalFit}
                        </dd>
                      </div>
                    </dl>

                    <p className="mt-4 text-sm leading-7 copy-muted">
                      {proposal.relevantExperience}
                    </p>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
          <section className="tender-card p-6">
            <p className="code-label">Related Business Fields</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">
              Relevant Capability Areas
            </h2>
            <ul className="mt-5 space-y-3">
              {relatedBusinessFields.map((field) => (
                <li
                  key={field}
                  className="rounded-[20px] border border-[var(--line)] bg-[#faf8f8] px-4 py-4 text-sm font-medium text-slate-700"
                >
                  {field}
                </li>
              ))}
            </ul>
          </section>

          <section className="tender-card p-6">
            <p className="code-label">Related Tenders</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">
              Explore Nearby Packages
            </h2>
            <div className="mt-5 space-y-3">
              {relatedTenders.map((item) => (
                <Link
                  key={item.id}
                  href={`/tender/${item.id}`}
                  className="block rounded-[20px] border border-[var(--line)] bg-[#faf8f8] p-4 transition hover:border-[#d8b1b9] hover:bg-[#fcf7f8]"
                >
                  <p className="code-label">{item.code}</p>
                  <h3 className="mt-2 font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm copy-muted">{item.zone}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="tender-card p-6">
            <p className="code-label">Quick Actions</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">
              Continue the MVP Flow
            </h2>
            <div className="mt-5 grid gap-3">
              <Link
                href="/tender/vendor"
                className="btn btn-primary w-full"
              >
                Simulate Vendor Proposal
              </Link>
              <Link
                href="/tender/internal"
                className="btn btn-secondary-accent w-full"
              >
                Review as Internal Team
              </Link>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}

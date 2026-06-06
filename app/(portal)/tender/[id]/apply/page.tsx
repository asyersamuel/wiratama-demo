import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoNote } from "@/components/shared/demo-note";
import { VendorProposalForm } from "@/features/tender/components/vendor-proposal-form";
import { getTenderById } from "@/features/tender/service";
import { formatCurrency, formatDate } from "@/lib/format";

type TenderApplyPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TenderApplyPage({
  params,
}: TenderApplyPageProps) {
  const { id } = await params;
  const tender = await getTenderById(id);

  if (!tender) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Link
          href={`/tender/${tender.id}`}
          className="btn btn-secondary w-fit px-4 py-2"
        >
          Back to Tender Detail
        </Link>
        <p className="code-label">Tender Portal / Tender Detail / Apply</p>
      </div>

      <section className="tender-card p-7 sm:p-9">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl">
            <span className="eyebrow">Proposal Submission Simulation</span>
            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Submit Proposal for {tender.code}
            </h1>
            <p className="mt-4 text-base leading-8 copy-muted">
              This page simulates a vendor proposal submission after reviewing the tender detail. Everything stays local to the browser for demo purposes.
            </p>
          </div>

            <div className="rounded-[24px] border border-[#ead8dc] bg-[#fcf7f8] p-5 xl:max-w-sm">
              <p className="code-label">MVP Scope</p>
              <p className="mt-2 text-sm leading-7 text-slate-700">
              No authentication, database write, server action, or production document storage is used in this proposal flow.
              </p>
            </div>
        </div>
      </section>

      <DemoNote>
        This is a local-only proposal submission simulation. No files or data are persisted.
      </DemoNote>

      <section className="tender-card p-6 sm:p-7">
        <div className="border-b border-[var(--line)] pb-5">
          <p className="code-label">Tender Summary</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            {tender.title}
          </h2>
        </div>

        <dl className="mt-6 grid gap-5 text-sm sm:grid-cols-2 xl:grid-cols-3">
          <div>
            <dt className="code-label">Tender Code</dt>
            <dd className="mt-2 font-medium text-slate-900">{tender.code}</dd>
          </div>
          <div>
            <dt className="code-label">Category</dt>
            <dd className="mt-2 font-medium text-slate-900">
              {tender.category}
            </dd>
          </div>
          <div>
            <dt className="code-label">Deadline</dt>
            <dd className="mt-2 font-medium text-slate-900">
              {formatDate(tender.deadline)}
            </dd>
          </div>
          <div>
            <dt className="code-label">Estimated Value</dt>
            <dd className="mt-2 font-medium text-slate-900">
              {formatCurrency(tender.estimatedValue)}
            </dd>
          </div>
          <div>
            <dt className="code-label">Zone</dt>
            <dd className="mt-2 font-medium text-slate-900">{tender.zone}</dd>
          </div>
          <div>
            <dt className="code-label">Location</dt>
            <dd className="mt-2 font-medium text-slate-900">
              {tender.location}
            </dd>
          </div>
        </dl>
      </section>

      <section className="tender-card p-6 sm:p-7">
        <div className="border-b border-[var(--line)] pb-5">
          <p className="code-label">Proposal Form</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            Proposal Submission Simulation
          </h2>
        </div>

        <div className="mt-6">
          <VendorProposalForm
            tender={{
              code: tender.code,
              title: tender.title,
            }}
            defaultCompanyName="PT Prima Infrastruktur Abadi"
            successCtas={[
              {
                href: "/tender/vendor",
                label: "View Vendor Dashboard",
              },
              {
                href: `/tender/${tender.id}`,
                label: "Back to Tender Detail",
                tone: "secondary",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { TenderDirectory } from "@/features/tender/components/tender-directory";
import { getTenderStats, getTenders } from "@/features/tender/service";
import { formatCompactCurrency } from "@/lib/format";

export default async function TenderPage() {
  const [tenders, stats] = await Promise.all([getTenders(), getTenderStats()]);

  return (
    <>
      <section className="space-y-4">
        <p className="code-label">Tender Portal / Search Tender</p>
        <div className="tender-card p-6 sm:p-7">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <span className="eyebrow">PT WIP Procurement</span>
              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Tender Opportunities
              </h1>
              <p className="mt-3 text-sm leading-8 copy-muted sm:text-base">
                Explore current tender packages through a procurement-style directory with clear filters, status visibility, and direct access into vendor and internal review flows.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:w-[420px]">
              <Link
                href="/tender/vendor"
                className="tender-card-soft p-5 transition hover:translate-y-[-1px]"
              >
                <p className="code-label">Vendor Portal</p>
                <h2 className="mt-3 text-lg font-semibold text-slate-950">
                  Simulate contractor submission
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Keep the MVP flow compact with a polished local-only proposal form.
                </p>
              </Link>

              <Link
                href="/tender/internal"
                className="tender-card p-5 transition hover:translate-y-[-1px]"
              >
                <p className="code-label">Internal View</p>
                <h2 className="mt-3 text-lg font-semibold text-slate-950">
                  Compare vendors and shortlist
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Present procurement decision making in a cleaner and more professional review workspace.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="tender-card p-5">
          <p className="code-label">total tender</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {stats.totalTender}
          </p>
          <p className="mt-2 text-sm copy-muted">
            All mock tender packages prepared for the MVP demo.
          </p>
        </article>
        <article className="tender-card p-5">
          <p className="code-label">open tender</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {stats.openTender}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Packages currently open for vendor participation.
          </p>
        </article>
        <article className="tender-card p-5">
          <p className="code-label">under evaluation</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {stats.underEvaluation}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Packages being reviewed by the internal team.
          </p>
        </article>
        <article className="tender-card p-5">
          <p className="code-label">total estimated value</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {formatCompactCurrency(stats.totalEstimatedValue)}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Combined value across the current tender pipeline.
          </p>
        </article>
      </section>

      <TenderDirectory tenders={tenders} />
    </>
  );
}

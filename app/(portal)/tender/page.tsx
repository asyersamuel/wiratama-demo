import Link from "next/link";
import { DemoNote } from "@/components/shared/demo-note";
import { TenderDirectory } from "@/features/tender/components/tender-directory";
import { getTenderStats, getTenders } from "@/features/tender/service";
import { formatCompactCurrency } from "@/lib/format";

export default async function TenderPage() {
  const [tenders, stats] = await Promise.all([getTenders(), getTenderStats()]);

  return (
    <>
      <section className="space-y-4">
        <p className="code-label">Tender Portal / Tender Catalog</p>
        <div className="tender-card p-6 sm:p-7">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <span className="eyebrow">PT WIP Procurement</span>
              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Tender Catalog
              </h1>
              <p className="mt-3 text-sm leading-8 copy-muted sm:text-base">
                Browse tender packages, review their status and value, then open Tender Detail before moving into any proposal submission simulation.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:w-[420px]">
              <Link
                href="/tender/vendor"
                className="tender-card-soft p-5 transition hover:translate-y-[-1px]"
              >
                <p className="code-label">Vendor Portal</p>
                <h2 className="mt-3 text-lg font-semibold text-slate-950">
                  Review vendor dashboard
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Show submitted proposal status and quick links back into open tender opportunities.
                </p>
              </Link>

              <Link
                href="/tender/internal"
                className="tender-card p-5 transition hover:translate-y-[-1px]"
              >
                <p className="code-label">Internal View</p>
                <h2 className="mt-3 text-lg font-semibold text-slate-950">
                  Review evaluation workspace
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Present decision support, proposal comparison, and contractor history in one internal review surface.
                </p>
              </Link>
            </div>
          </div>
          <div className="mt-6 xl:max-w-3xl">
            <DemoNote>
              Start here to browse tender packages before opening a detail page.
            </DemoNote>
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
            All tender packages prepared for the MVP demo.
          </p>
        </article>
        <article className="tender-card p-5">
          <p className="code-label">open tender</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {stats.openTender}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Tender packages currently open for vendor participation.
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

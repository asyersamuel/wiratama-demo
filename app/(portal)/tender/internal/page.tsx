import { DemoNote } from "@/components/shared/demo-note";
import { InternalReviewList } from "@/features/tender/components/internal-review-list";
import {
  getInternalReviewQueue,
  getInternalTenderSummary,
} from "@/features/tender/service";

export default async function InternalTenderPage() {
  const [metrics, reviewQueue] = await Promise.all([
    getInternalTenderSummary(),
    getInternalReviewQueue(),
  ]);

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <p className="code-label">Tender Portal / Internal View</p>
        <div className="tender-card p-7 sm:p-9">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <span className="eyebrow">Internal Review Workspace</span>
              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Internal Procurement Review
              </h1>
              <p className="mt-4 text-base leading-8 copy-muted">
                Select a tender package to review submitted contractors and proposal details.
              </p>
            </div>

            <div className="xl:max-w-sm">
              <DemoNote label="Workspace Note">
                This page shows a compact review queue for the internal procurement demo.
              </DemoNote>
            </div>
          </div>
        </div>
      </section>

      <InternalReviewList metrics={metrics} tenders={reviewQueue} />
    </div>
  );
}

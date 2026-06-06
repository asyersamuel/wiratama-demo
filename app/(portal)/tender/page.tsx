import Link from "next/link";
import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { MetricCard } from "@/components/ui/metric-card";
import { SectionCard } from "@/components/ui/section-card";
import { TenderDirectory } from "@/features/tender/components/tender-directory";
import { getTenderStats, getTenders } from "@/features/tender/service";
import { formatCompactCurrency } from "@/lib/format";

export default async function TenderPage() {
  const [tenders, stats] = await Promise.all([getTenders(), getTenderStats()]);

  return (
    <>
      <PortalPageIntro
        eyebrow="Tender Management"
        title="Centralized tender visibility for vendor participation and internal decision making."
        description="This portal is designed for a clean pitching flow: showcase live opportunities, open a tender in detail, and move naturally into vendor simulation or internal procurement review."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="total tender"
          value={String(stats.totalTender)}
          hint="All mock tender packages prepared for the MVP demo."
        />
        <MetricCard
          label="open tender"
          value={String(stats.openTender)}
          hint="Packages currently open for vendor participation."
        />
        <MetricCard
          label="under evaluation"
          value={String(stats.underEvaluation)}
          hint="Packages being reviewed by the internal team."
        />
        <MetricCard
          label="total estimated value"
          value={formatCompactCurrency(stats.totalEstimatedValue)}
          hint="Combined value across the current tender pipeline."
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <div className="panel p-6 sm:p-7">
          <p className="code-label">Vendor Portal</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            Show external experience in one clear step.
          </h2>
          <p className="mt-3 text-sm leading-7 copy-muted">
            Vendors can discover open tenders, review requirements, and submit
            a proposal simulation without turning the demo into a full
            procurement system.
          </p>
          <Link
            href="/tender/vendor"
            className="mt-5 inline-flex rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-92"
          >
            Open Vendor Portal
          </Link>
        </div>

        <div className="panel p-6 sm:p-7">
          <p className="code-label">Internal Procurement</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            Compare proposals and explain the shortlist story.
          </h2>
          <p className="mt-3 text-sm leading-7 copy-muted">
            PT WIP internal stakeholders can review incoming proposals, compare
            contractors, and demonstrate how partner history supports a
            long-term estate development strategy.
          </p>
          <Link
            href="/tender/internal"
            className="mt-5 inline-flex rounded-full border border-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent-soft)]"
          >
            Open Internal Procurement
          </Link>
        </div>
      </section>

      <SectionCard
        title="Tender Directory"
        description="A simple search and filter layer is enough for the MVP. It helps the presenter move quickly across tender scenarios without adding unnecessary system complexity."
      >
        <TenderDirectory tenders={tenders} />
      </SectionCard>
    </>
  );
}

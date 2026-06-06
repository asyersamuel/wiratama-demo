import Link from "next/link";
import { DemoNote } from "@/components/shared/demo-note";
import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { MetricCard } from "@/components/ui/metric-card";
import { SectionCard } from "@/components/ui/section-card";
import { StatusPill } from "@/components/ui/status-pill";
import { listContractors } from "@/features/contractor/service";
import { listSuppliers } from "@/features/supplier/service";
import { getTenders } from "@/features/tender/service";
import { listTrackingItems } from "@/features/tracking/service";
import { formatCompactCurrency } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

export default async function DashboardPage() {
  const [tenders, contractors, suppliers, trackingItems] = await Promise.all([
    getTenders(),
    listContractors(),
    listSuppliers(),
    listTrackingItems(),
  ]);

  return (
    <>
      <section className="tender-card p-6 sm:p-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <PortalPageIntro
            eyebrow="Dashboard"
            title="Tender MVP Demo Command Center"
            description="Use this dashboard to introduce the MVP scope, key metrics, and recommended presentation flow before moving into the Tender Catalog."
          />

          <div className="xl:max-w-sm">
            <DemoNote>
              Use this page to introduce the MVP scope, then continue to Tender to begin the demo story.
            </DemoNote>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/tender" className="btn btn-primary">
            Start Tender Demo
          </Link>
          <Link href="/tender/internal" className="btn btn-secondary-accent">
            Open Internal Review
          </Link>
          <Link href="/contractors" className="btn btn-secondary">
            View Contractors
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="tender packages"
          value={String(tenders.length)}
          hint="Tender packages available for the MVP demo story."
        />
        <MetricCard
          label="shortlist candidates"
          value={String(contractors.filter((item) => item.status !== "Under review").length)}
          hint="External contractors ready for review discussions."
        />
        <MetricCard
          label="external records"
          value={String(contractors.length + suppliers.length)}
          hint="Mock partner history across contractors and suppliers."
        />
        <MetricCard
          label="tracking records"
          value={String(trackingItems.length)}
          hint="Sample gate and supply records for the separate operational tracking demo."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <SectionCard
          title="MVP Summary"
          description="The MVP presents a clear procurement story for PT WIP: browse tender packages, simulate vendor participation, support internal review, and reference external contractor history."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Tender Catalog for browsing active tender packages.",
              "Tender Detail for reviewing scope, requirements, and timeline.",
              "Proposal Submission Simulation for vendor-side storytelling.",
              "Internal Procurement Review for comparison and decision support.",
            ].map((item) => (
              <article
                key={item}
                className="rounded-[22px] border border-[var(--line)] bg-white/75 p-5 text-sm leading-7 text-slate-700"
              >
                {item}
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Recommended Demo Flow"
          description="Keep the walkthrough concise so stakeholders can follow the business story without getting lost in the UI."
        >
          <ol className="space-y-4 text-sm leading-7 text-slate-700">
            <li>1. Browse Tender Catalog.</li>
            <li>2. Review Tender Detail.</li>
            <li>3. Submit Proposal Simulation.</li>
            <li>4. View Vendor Dashboard.</li>
            <li>5. Open Internal Procurement Review.</li>
            <li>6. Review Contractor History.</li>
            <li>7. Optional Gate &amp; Supply Tracking Demo.</li>
          </ol>
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <SectionCard
          title="Tender Pulse"
          description="Use these tender packages to move naturally from catalog browsing into tender detail and proposal review."
        >
          <div className="space-y-4">
            {tenders.map((tender) => (
              <article
                key={tender.id}
                className="rounded-[22px] border border-[var(--line)] bg-white/75 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="code-label">{tender.code}</p>
                    <h2 className="mt-2 text-lg font-semibold text-slate-950">
                      {tender.title}
                    </h2>
                  </div>
                  <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
                </div>
                <p className="mt-3 text-sm leading-7 copy-muted">
                  {tender.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-700">
                  <span>{tender.location}</span>
                  <span>{formatCompactCurrency(tender.estimatedValue)}</span>
                  <span>{tender.proposals.length} proposals</span>
                </div>
                <Link
                  href={`/tender/${tender.id}`}
                  className="mt-5 btn btn-secondary px-4 py-2 w-fit"
                >
                  View Tender Detail
                </Link>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Next Step CTA"
          description="Use one of these shortcuts depending on which audience perspective you want to show next."
        >
          <div className="grid gap-3">
            <Link href="/tender" className="btn btn-primary w-full">
              Start Tender Demo
            </Link>
            <Link href="/tender/internal" className="btn btn-secondary-accent w-full">
              Open Internal Review
            </Link>
            <Link href="/tracking" className="btn btn-secondary w-full">
              Open Tracking Demo
            </Link>
          </div>
        </SectionCard>
      </section>
    </>
  );
}

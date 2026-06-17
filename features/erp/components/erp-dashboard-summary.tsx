"use client";

import Link from "next/link";
import { useMemo } from "react";
import { MetricCard } from "@/components/ui/metric-card";
import { ErpMapPanel } from "@/features/erp/components/erp-map-panel";
import { InfrastructureProgressChart } from "@/features/erp/components/infrastructure-progress-chart";
import { LiveIncidentFeed } from "@/features/erp/components/live-incident-feed";
import {
  useDemoIncidents,
} from "@/features/erp/demo-store";
import type {
  ErpDashboardSeed,
  EstateZone,
  Incident,
  IncidentSeverity,
} from "@/features/erp/types";
import { formatCompactCurrency, formatCurrency } from "@/lib/format";

type ErpDashboardSummaryProps = {
  seedIncidents: Incident[];
  seed: ErpDashboardSeed;
  zones: EstateZone[];
};

const isActiveStatus = (incident: Incident) => incident.status !== "closed";

export function ErpDashboardSummary({
  seedIncidents,
  seed,
  zones,
}: ErpDashboardSummaryProps) {
  const incidents = useDemoIncidents(seedIncidents);

  const stats = useMemo(() => {
    const active = incidents.filter(isActiveStatus);
    const totalActive = active.length;
    const monthlyLoss = active.reduce(
      (sum, incident) => sum + incident.estimatedLoss,
      0,
    );

    const constructionProgress = Math.round(
      seed.infrastructure.reduce((sum, item) => sum + item.actual, 0) /
        seed.infrastructure.length,
    );

    const severityBreakdown: Record<IncidentSeverity, number> = {
      critical: active.filter((i) => i.severity === "critical").length,
      high: active.filter((i) => i.severity === "high").length,
      medium: active.filter((i) => i.severity === "medium").length,
      low: active.filter((i) => i.severity === "low").length,
    };

    const severityParts: string[] = [];
    if (severityBreakdown.critical > 0)
      severityParts.push(`Critical: ${severityBreakdown.critical}`);
    if (severityBreakdown.high > 0)
      severityParts.push(`High: ${severityBreakdown.high}`);
    if (severityBreakdown.medium > 0)
      severityParts.push(`Medium: ${severityBreakdown.medium}`);
    if (severityBreakdown.low > 0)
      severityParts.push(`Low: ${severityBreakdown.low}`);

    const severityHint =
      severityParts.length > 0
        ? severityParts.join(" · ")
        : "Tidak ada insiden aktif.";

    return {
      totalActive,
      monthlyLoss,
      constructionProgress,
      severityHint,
    };
  }, [incidents, seed]);

  return (
    <>
      {/* Baris atas: 4 scorecards executive */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="total lahan kawasan"
          value={`${seed.estate.totalHectares} ha`}
          hint={`${seed.estate.usedPercent}% terpakai · ${seed.estate.availablePercent}% tersedia`}
        />
        <MetricCard
          label="progress konstruksi global"
          value={`${stats.constructionProgress}% Completed`}
          hint="Rata-rata realisasi seluruh paket infrastruktur aktif."
        />
        <MetricCard
          label="insiden aktif"
          value={String(stats.totalActive)}
          hint={stats.severityHint}
        />
        <MetricCard
          label="kerugian aktif bulan berjalan"
          value={formatCompactCurrency(stats.monthlyLoss)}
          hint={`Estimasi kerugian aktif: ${formatCurrency(stats.monthlyLoss)}.`}
        />
      </section>

      {/* Baris tengah: Estate Map + Infrastructure Progress */}
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <ErpMapPanel zones={zones} incidents={incidents} />
        <InfrastructureProgressChart items={seed.infrastructure} />
      </section>

      {/* Baris bawah: Live Incident Feed */}
      <LiveIncidentFeed incidents={incidents} />

      {/* CTA buttons */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/erp/incidents/new"
          className="btn btn-primary"
        >
          Buat Laporan Insiden
        </Link>
        <Link
          href="/erp/incidents"
          className="btn btn-secondary-accent"
        >
          Lihat Semua Insiden
        </Link>
      </div>
    </>
  );
}

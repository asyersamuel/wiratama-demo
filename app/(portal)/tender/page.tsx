import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { TenderDirectory } from "@/features/tender/components/tender-directory";
import { getTenderStats, getTenders } from "@/features/tender/service";
import { formatCompactCurrency } from "@/lib/format";

export default async function TenderPage() {
  const [tenders, stats] = await Promise.all([getTenders(), getTenderStats()]);

  return (
    <div className="space-y-6">
      <PortalPageIntro
        eyebrow="Mode Vendor"
        title="Daftar Tender"
        description="Lihat paket tender yang sedang dibuka atau diproses, pelajari ringkasannya, lalu buka detail tender sebelum mengajukan proposal."
      />

      <section className="grid gap-4 md:grid-cols-3">
        <article className="tender-card p-5">
          <p className="code-label">Tender aktif</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {stats.activeTender}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Paket tender yang sedang berjalan pada demo procurement PT WIP.
          </p>
        </article>
        <article className="tender-card p-5">
          <p className="code-label">Tender open</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {stats.openTender}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Tender yang masih dapat dipelajari dan diajukan oleh vendor.
          </p>
        </article>
        <article className="tender-card p-5">
          <p className="code-label">Total nilai estimasi</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {formatCompactCurrency(stats.totalEstimatedValue)}
          </p>
          <p className="mt-2 text-sm copy-muted">
            Nilai indikatif seluruh paket tender utama pada skenario demo.
          </p>
        </article>
      </section>

      <TenderDirectory tenders={tenders} />
    </div>
  );
}

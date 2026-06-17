import Link from "next/link";
import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { SectionCard } from "@/components/ui/section-card";
import { ErpAppGrid } from "@/features/erp/components/erp-app-grid";
import { ErpDemoGuidePanel } from "@/features/erp/components/erp-demo-guide-panel";
import { getErpModules } from "@/features/erp/service";

export default async function ErpLandingPage() {
  const modules = await getErpModules();
  const activeModules = modules.filter((module) => module.isActive);

  return (
    <>
      <PortalPageIntro
        eyebrow="Mini ERP"
        title="Manajemen kawasan terpadu untuk demo pitching."
        description="Mini ERP adalah fondasi operasional kawasan Wiratama. Phase 1 mengaktifkan Dashboard Eksekutif dan Pelaporan Insiden, lengkap dengan Incident Register sebagai modul pendukung."
      />

      <div className="panel-strong flex flex-col gap-3 rounded-[24px] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="code-label">Demo aktif</p>
          <p className="mt-2 text-base font-semibold text-slate-950">
            Demo aktif: Dashboard Eksekutif dan Pelaporan Insiden.
          </p>
          <p className="mt-1 text-sm copy-muted">
            Modul lain tersedia sebagai visualisasi ala Odoo untuk menunjukkan
            peta jalan implementasi Mini ERP berikutnya.
          </p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent-strong)]">
          Phase 1
        </span>
      </div>

      <ErpDemoGuidePanel variant="landing" />

      <SectionCard
        title="ERP App Grid"
        description="Klik modul aktif untuk membuka fitur. Modul bertanda Coming soon adalah placeholder roadmap untuk phase berikutnya."
      >
        <ErpAppGrid modules={modules} />
      </SectionCard>

      <SectionCard
        title="Quick Links"
        description="Akses cepat ke modul aktif Mini ERP untuk demo pitching."
      >
        <div className="flex flex-wrap gap-3">
          {activeModules.map((module) =>
            module.href ? (
              <Link
                key={module.id}
                href={module.href}
                className="inline-flex rounded-full border border-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent-soft)]"
              >
                {module.label}
              </Link>
            ) : null,
          )}
        </div>
      </SectionCard>
    </>
  );
}

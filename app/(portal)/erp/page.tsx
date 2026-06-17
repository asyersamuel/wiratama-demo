import { SectionCard } from "@/components/ui/section-card";
import { ErpAppGrid } from "@/features/erp/components/erp-app-grid";
import { getErpModules } from "@/features/erp/service";

export default async function ErpLandingPage() {
  const modules = await getErpModules();

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto">
        <p className="eyebrow">Wiratama ERP</p>
        <h1 className="mt-3 display-title">Operations Command Center</h1>
        <p className="mt-4 text-lg copy-muted leading-relaxed">
          Integrated dashboard for estate incidents, infrastructure progress, and executive visibility.
        </p>
      </div>

      {/* ERP App Grid */}
      <SectionCard
        title="ERP Modules"
        description="Modul aktif siap digunakan. Modul bertanda Coming soon adalah placeholder roadmap."
      >
        <ErpAppGrid modules={modules} />
      </SectionCard>

      {/* Footer note */}
      <p className="text-center text-xs copy-muted">
        Demo modules active: Dashboard, Incident Reporting, Incident Register.
      </p>
    </div>
  );
}

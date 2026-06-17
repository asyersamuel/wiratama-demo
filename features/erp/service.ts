import { erpDashboardSeed } from "@/features/erp/data/dashboard";
import { incidents } from "@/features/erp/data/incidents";
import { erpModules } from "@/features/erp/data/modules";
import { picOptions } from "@/features/erp/data/pic";
import { estateZones } from "@/features/erp/data/zones";
import type {
  ErpDashboardSeed,
  ErpModule,
  EstateZone,
  Incident,
  PicOption,
} from "@/features/erp/types";
import { simulateLatency } from "@/lib/mock-api";

export async function getErpModules(): Promise<ErpModule[]> {
  await simulateLatency();
  return erpModules;
}

export async function getEstateZones(): Promise<EstateZone[]> {
  await simulateLatency();
  return estateZones;
}

export async function getPicOptions(): Promise<PicOption[]> {
  await simulateLatency();
  return picOptions;
}

export async function getIncidents(): Promise<Incident[]> {
  await simulateLatency();
  return incidents;
}

export async function getIncidentById(id: string): Promise<Incident | undefined> {
  await simulateLatency();
  return incidents.find((item) => item.id === id);
}

export async function getErpDashboardSeed(): Promise<ErpDashboardSeed> {
  await simulateLatency();
  return erpDashboardSeed;
}

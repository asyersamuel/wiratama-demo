import { suppliers } from "@/features/supplier/data/suppliers";
import { simulateLatency } from "@/lib/mock-api";

export async function listSuppliers() {
  await simulateLatency();
  return suppliers;
}

export async function getSupplierById(id: string) {
  await simulateLatency();
  return suppliers.find((item) => item.id === id);
}

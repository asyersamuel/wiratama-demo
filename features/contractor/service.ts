import { contractors } from "./data/contractors";
import { simulateLatency } from "@/lib/mock-api";

export async function listContractors() {
  await simulateLatency();
  return contractors;
}

export async function getContractorById(id: string) {
  await simulateLatency();
  return contractors.find((item) => item.id === id);
}

import { contractors } from "./data/contractors";
import type { Contractor } from "./types";
import { simulateLatency } from "@/lib/mock-api";

export async function listContractors(): Promise<Contractor[]> {
  await simulateLatency();
  return contractors;
}

export async function getContractorById(
  id: string,
): Promise<Contractor | undefined> {
  await simulateLatency();
  return contractors.find((item) => item.id === id);
}

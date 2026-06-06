import { companyProfile } from "@/features/company-profile/data/overview";
import { simulateLatency } from "@/lib/mock-api";

export async function getCompanyProfile() {
  await simulateLatency();
  return companyProfile;
}

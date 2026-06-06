import type { CompanyProfile } from "@/features/company-profile/types";

export const companyProfile: CompanyProfile = {
  brand: "Wiratama Industrial",
  positioning: "Industrial estate development and procurement orchestration",
  description:
    "Platform demo ini menempatkan company profile dan procurement dalam satu alur. Publik melihat kapabilitas kawasan dan portofolio, sementara tim internal menjalankan tender, evaluasi kontraktor, external party history, dan separate operational tracking demo.",
  highlights: [
    {
      label: "Landbank pipeline",
      value: "1,240 ha",
      note: "Tahap awal sampai ekspansi jangka panjang.",
    },
    {
      label: "Procurement horizon",
      value: "30 years",
      note: "Keputusan vendor perlu menyimpan histori jangka panjang.",
    },
    {
      label: "Tender packages",
      value: "42 mock packages",
      note: "Skenario sipil, MEP, utilitas, dan operasional.",
    },
  ],
  developments: [
    {
      name: "North Logistics Hub",
      location: "Bekasi Industrial Corridor",
      area: "410 ha",
      status: "Phase 1 active",
      focus: "Warehouse clusters, utilities backbone, and heavy vehicle access.",
    },
    {
      name: "Central Utility Park",
      location: "Karawang Manufacturing Belt",
      area: "290 ha",
      status: "Tender planning",
      focus: "Power, water treatment, and smart operations support.",
    },
    {
      name: "Coastal Support Yard",
      location: "Cilegon Port Interface",
      area: "140 ha",
      status: "Pre-development",
      focus: "Supplier staging, port-linked fabrication, and logistics transfer.",
    },
  ],
  portfolio: [
    {
      name: "Dry Port Gate Expansion",
      type: "Infrastructure",
      location: "Karawang",
      completion: "2024",
      partners: "18 contractors, 7 suppliers",
      summary:
        "Package mix of civil work, gate automation, and heavy-duty pavement with staged handover.",
    },
    {
      name: "Multi-Tenant Warehouse Cluster",
      type: "Industrial buildings",
      location: "Bekasi",
      completion: "2025",
      partners: "12 contractors, 11 suppliers",
      summary:
        "Demonstrates repeatable tender packaging and contractor performance scoring.",
    },
    {
      name: "Integrated Utility Spine",
      type: "Utilities",
      location: "Cilegon",
      completion: "2025",
      partners: "9 contractors, 14 suppliers",
      summary:
        "Cross-functional delivery combining water, electrical, and monitoring procurement.",
    },
  ],
};

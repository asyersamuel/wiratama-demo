import type { ErpDashboardSeed } from "@/features/erp/types";

export const estateLandSummary = {
  totalHectares: 750,
  usedPercent: 62,
  availablePercent: 38,
};

export const infrastructureProgress = [
  {
    id: "jalan-utama-kawasan",
    label: "Jalan Utama Kawasan",
    target: 85,
    actual: 78,
    unit: "%",
  },
  {
    id: "water-treatment-plant",
    label: "Water Treatment Plant",
    target: 70,
    actual: 64,
    unit: "%",
  },
  {
    id: "gardu-listrik-utama",
    label: "Gardu Listrik Utama",
    target: 90,
    actual: 88,
    unit: "%",
  },
  {
    id: "jaringan-fiber-optic",
    label: "Jaringan Fiber Optic",
    target: 65,
    actual: 54,
    unit: "%",
  },
];

export const erpDashboardSeed: ErpDashboardSeed = {
  estate: estateLandSummary,
  infrastructure: infrastructureProgress,
};

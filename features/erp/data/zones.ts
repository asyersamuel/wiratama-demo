import type { EstateZone } from "@/features/erp/types";

export const estateZones: EstateZone[] = [
  {
    id: "blok-a",
    name: "Blok A",
    type: "residential",
    status: "incident",
    utilizationPercent: 72,
    mapPosition: { x: 30, y: 42 },
  },
  {
    id: "blok-b",
    name: "Blok B",
    type: "residential",
    status: "construction",
    utilizationPercent: 48,
    mapPosition: { x: 55, y: 38 },
  },
  {
    id: "area-wtp",
    name: "Area WTP",
    type: "utility",
    status: "incident",
    utilizationPercent: 86,
    mapPosition: { x: 48, y: 64 },
  },
  {
    id: "gerbang-utama",
    name: "Gerbang Utama",
    type: "entrance",
    status: "maintenance",
    utilizationPercent: 95,
    mapPosition: { x: 14, y: 22 },
  },
  {
    id: "kompleks-pergudangan",
    name: "Kompleks Pergudangan",
    type: "logistics",
    status: "normal",
    utilizationPercent: 68,
    mapPosition: { x: 78, y: 70 },
  },
];

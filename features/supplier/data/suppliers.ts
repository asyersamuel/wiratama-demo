import type { Supplier } from "@/features/supplier/types";

export const suppliers: Supplier[] = [
  {
    id: "prima-steel",
    name: "Prima Steel Distribution",
    category: "Structural steel",
    status: "Approved supplier",
    reliabilityScore: 90,
    leadTime: "14-18 days",
    summary:
      "Supplier baja struktur dengan histori pengiriman konsisten untuk gudang dan workshop kawasan.",
    suppliedPackages: [
      "Warehouse Cluster Beta",
      "North Hub Warehouse mock package",
      "Dry Port Gate Expansion",
    ],
    notes: [
      "Barcode tagging sudah siap sejak pabrik.",
      "Perlu booking produksi 2 minggu sebelum mobilisasi.",
    ],
  },
  {
    id: "tirta-pump",
    name: "Tirta Pump Systems",
    category: "Water and pumping equipment",
    status: "Strategic review",
    reliabilityScore: 84,
    leadTime: "21-28 days",
    summary:
      "Supplier equipment utilitas dengan dukungan commissioning, namun beberapa item masih impor.",
    suppliedPackages: [
      "Integrated Utility Spine",
      "Water treatment skid package",
    ],
    notes: [
      "Ada risiko lead time untuk control panel impor.",
      "Dokumen FAT lengkap dan rapi.",
    ],
  },
  {
    id: "bentang-aggregates",
    name: "Bentang Aggregates",
    category: "Bulk material and geotextile",
    status: "Active partner",
    reliabilityScore: 79,
    leadTime: "5-7 days",
    summary:
      "Cepat untuk material bulk lokal, tapi performa administrasi delivery note perlu distandardisasi.",
    suppliedPackages: [
      "Coastal Yard Drainage",
      "Port Buffer Zone",
    ],
    notes: [
      "Sangat cocok untuk pekerjaan percepatan.",
      "Perlu dashboard tracking agar bukti pengiriman lebih rapi.",
    ],
  },
];

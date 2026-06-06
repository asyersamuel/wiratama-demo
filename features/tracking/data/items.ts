import type { TrackingItem } from "@/features/tracking/types";

export const trackingItems: TrackingItem[] = [
  {
    barcode: "BC-STEEL-001",
    itemName: "Structural steel batch A",
    packageName: "North Hub Warehouse Construction",
    supplier: "Prima Steel Distribution",
    currentLocation: "Staging yard gate 2",
    status: "In transit",
    eta: "2026-06-08",
    events: [
      {
        label: "Factory release",
        date: "2026-06-03",
        note: "Bundle label diterbitkan dan dokumen packing list dibuat.",
      },
      {
        label: "Departed supplier yard",
        date: "2026-06-04",
        note: "Truk berangkat dengan barcode master batch.",
      },
      {
        label: "Checkpoint verification",
        date: "2026-06-05",
        note: "Tim logistik memverifikasi muatan di jalur Bekasi corridor.",
      },
    ],
  },
  {
    barcode: "BC-PUMP-014",
    itemName: "Pump skid line 1",
    packageName: "Utility Spine Phase One",
    supplier: "Tirta Pump Systems",
    currentLocation: "Commissioning warehouse",
    status: "Delivered",
    eta: "2026-06-01",
    events: [
      {
        label: "FAT completed",
        date: "2026-05-21",
        note: "Factory acceptance test ditandatangani procurement dan engineering.",
      },
      {
        label: "Delivered to site",
        date: "2026-05-29",
        note: "Barang diterima gudang commissioning dengan scan barcode.",
      },
      {
        label: "Ready for install",
        date: "2026-06-01",
        note: "Status berubah ke ready for installation.",
      },
    ],
  },
  {
    barcode: "BC-GEO-221",
    itemName: "Geotextile roll package",
    packageName: "Coastal Yard Drainage and Paving",
    supplier: "Bentang Aggregates",
    currentLocation: "Port side laydown area",
    status: "Ready onsite",
    eta: "2026-06-06",
    events: [
      {
        label: "Supplier pickup",
        date: "2026-06-02",
        note: "Roll package keluar dari gudang supplier dengan manifest digital.",
      },
      {
        label: "Arrival check",
        date: "2026-06-05",
        note: "Jumlah dan kondisi fisik diverifikasi saat unloading.",
      },
      {
        label: "Tagged onsite",
        date: "2026-06-06",
        note: "Barcode dipetakan ke zona drainase barat.",
      },
    ],
  },
];

import { trackingItems } from "@/features/tracking/data/items";
import { simulateLatency } from "@/lib/mock-api";

export async function listTrackingItems() {
  await simulateLatency();
  return trackingItems;
}

export async function getTrackingItemByBarcode(barcode: string) {
  await simulateLatency();
  return trackingItems.find((item) => item.barcode === barcode);
}

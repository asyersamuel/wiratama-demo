import { trackingRecords } from "@/features/tracking/data/items";
import type { TrackingRecord, TrackingStats } from "@/features/tracking/types";
import { simulateLatency } from "@/lib/mock-api";

function normalizeTrackingQuery(value: string) {
  return value.trim().toLowerCase();
}

function isPendingVerification(record: TrackingRecord) {
  return (
    record.legalStatus === "pending_document" ||
    record.legalStatus === "needs_review" ||
    record.gateStatus === "held_for_review"
  );
}

function isFlaggedTrackingRecord(record: TrackingRecord) {
  return (
    record.legalStatus === "flagged" ||
    record.legalStatus === "rejected" ||
    record.gateStatus === "held_for_review" ||
    record.gateStatus === "rejected"
  );
}

export async function getTrackingRecords() {
  await simulateLatency();
  return trackingRecords;
}

export async function getTrackingRecordByBarcode(barcode: string) {
  await simulateLatency();

  const normalizedBarcode = normalizeTrackingQuery(barcode);

  return trackingRecords.find(
    (record) => normalizeTrackingQuery(record.barcode) === normalizedBarcode,
  );
}

export async function getTrackingStats(): Promise<TrackingStats> {
  await simulateLatency();

  return {
    todaysEntries: trackingRecords.length,
    pendingVerification: trackingRecords.filter(isPendingVerification).length,
    flaggedSupplies: trackingRecords.filter(
      (record) =>
        record.legalStatus === "flagged" ||
        record.legalStatus === "rejected" ||
        record.documents.some(
          (document) =>
            document.status === "missing" ||
            document.status === "expired" ||
            document.status === "mismatch",
        ),
    ).length,
    approvedVehicles: trackingRecords.filter(
      (record) =>
        record.gateStatus === "approved_entry" ||
        record.gateStatus === "exited" ||
        record.gateStatus === "completed",
    ).length,
  };
}

export async function getRecentGateEntries() {
  await simulateLatency();

  return [...trackingRecords].sort((left, right) => {
    const rightTime = new Date(right.entryTime ?? right.scheduledDate).getTime();
    const leftTime = new Date(left.entryTime ?? left.scheduledDate).getTime();

    return rightTime - leftTime;
  });
}

export async function getFlaggedTrackingRecords() {
  await simulateLatency();

  return trackingRecords.filter(isFlaggedTrackingRecord);
}

export async function searchTrackingRecords(query: string) {
  await simulateLatency();

  const normalizedQuery = normalizeTrackingQuery(query);

  if (!normalizedQuery) {
    return [];
  }

  return trackingRecords.filter((record) =>
    [
      record.barcode,
      record.contractorName,
      record.supplierName,
      record.vehiclePlate,
      record.driverName,
      record.materialName,
      record.destinationZone,
      record.workArea,
    ].some((value) => normalizeTrackingQuery(value).includes(normalizedQuery)),
  );
}

export async function listTrackingItems() {
  return getTrackingRecords();
}

export async function getTrackingItemByBarcode(barcode: string) {
  return getTrackingRecordByBarcode(barcode);
}

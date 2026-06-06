export type TrackingEvent = {
  label: string;
  date: string;
  note: string;
};

export type TrackingItem = {
  barcode: string;
  itemName: string;
  packageName: string;
  supplier: string;
  currentLocation: string;
  status: string;
  eta: string;
  events: TrackingEvent[];
};

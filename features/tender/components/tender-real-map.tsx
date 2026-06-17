"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { TenderAreaMapItem } from "@/features/tender/types";
import { getStatusLabel } from "@/lib/status";

// Fix for default Leaflet marker icon in Next.js
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

const createCustomIcon = (status: TenderAreaMapItem["status"]) => {
  let color = "#64748b"; // slate-500
  if (status === "open") color = "#059669"; // emerald-600
  else if (status === "under_review") color = "#f59e0b"; // amber-500
  else if (status === "shortlisting") color = "#9f1239"; // accent
  else if (status === "awarded") color = "#0f172a"; // slate-900

  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `
      <div style="
        background-color: ${color};
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 0 2px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.2);
      "></div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8],
  });
};

type TenderRealMapProps = {
  items: TenderAreaMapItem[];
  audience: "vendor" | "internal" | "guest";
};

// Base coordinate around Indramayu / Project WIP
const BASE_LAT = -6.3276;
const BASE_LNG = 108.3249;

export default function TenderRealMap({ items, audience }: TenderRealMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[400px] w-full rounded-[28px] border border-[var(--line)] bg-[#f8f4f4] animate-pulse flex items-center justify-center">
        <p className="text-sm text-slate-500">Memuat peta...</p>
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full overflow-hidden rounded-[28px] border border-[var(--line)] bg-white z-0 relative">
      <MapContainer
        center={[BASE_LAT, BASE_LNG]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {items.map((item) => {
          // Convert arbitrary x/y percentages to pseudo-coordinates around base
          const lat = BASE_LAT + (50 - item.y) * 0.0005;
          const lng = BASE_LNG + (item.x - 50) * 0.0005;

          return (
            <Marker
              key={item.tenderId}
              position={[lat, lng]}
              icon={createCustomIcon(item.status)}
            >
              <Tooltip className="custom-leaflet-tooltip" direction="top" offset={[0, -10]}>
                <div className="p-1 min-w-[200px]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    {item.markerLabel}
                  </p>
                  <h3 className="text-sm font-semibold text-slate-900 mb-2 whitespace-normal">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-medium text-slate-700">
                      {getStatusLabel(item.status)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2 line-clamp-2 whitespace-normal">
                    {item.publicSummary}
                  </p>
                  {audience === "guest" && item.publicValueLabel && (
                    <p className="text-xs font-medium text-slate-800">
                      {item.publicValueLabel}
                    </p>
                  )}
                </div>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Incident } from "@/features/erp/types";
import { getStatusLabel } from "@/lib/status";

const severityColors: Record<string, string> = {
  critical: "#b91c1c",
  high: "#e11d48",
  medium: "#d97706",
  low: "#64748b",
};

const createIncidentIcon = (severity: Incident["severity"]) => {
  const color = severityColors[severity] ?? "#64748b";

  return L.divIcon({
    className: "erp-leaflet-marker",
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

type ErpRealMapProps = {
  incidents: Incident[];
};

const BASE_LAT = -6.3276;
const BASE_LNG = 108.3249;

export default function ErpRealMap({ incidents }: ErpRealMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeIncidents = incidents.filter(
    (incident) => incident.status !== "closed",
  );

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

        {activeIncidents.map((incident) => {
          const lat = BASE_LAT + (50 - incident.mapPosition.y) * 0.0005;
          const lng = BASE_LNG + (incident.mapPosition.x - 50) * 0.0005;

          return (
            <Marker
              key={incident.id}
              position={[lat, lng]}
              icon={createIncidentIcon(incident.severity)}
            >
              <Tooltip className="custom-leaflet-tooltip" direction="top" offset={[0, -10]}>
                <div className="p-1 min-w-[200px]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-rose-700 mb-1">
                    {incident.code}
                  </p>
                  <h3 className="text-sm font-semibold text-slate-900 mb-2 whitespace-normal">
                    {incident.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-medium text-slate-700">
                      {incident.severity.toUpperCase()}
                    </span>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-medium text-slate-700">
                      {getStatusLabel(incident.status)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 whitespace-normal">
                    {incident.primaryLocation}
                  </p>
                </div>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

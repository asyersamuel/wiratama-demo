"use client";

import { useState } from "react";
import type { EstateZone, Incident } from "@/features/erp/types";

type EstateMapPanelProps = {
  zones: EstateZone[];
  incidents: Incident[];
};

const zoneStatusClasses: Record<string, string> = {
  normal: "fill-emerald-100/80 stroke-emerald-500",
  construction: "fill-amber-100/80 stroke-amber-500",
  incident: "fill-rose-100/80 stroke-rose-500",
  maintenance: "fill-slate-100/80 stroke-slate-400",
};

const severityTone: Record<string, string> = {
  critical: "fill-rose-700",
  high: "fill-rose-600",
  medium: "fill-amber-600",
  low: "fill-slate-500",
};

const ZONE_WIDTH = 12;
const ZONE_HEIGHT = 8;
const PIN_RADIUS = 1.2;

export function EstateMapPanel({ zones, incidents }: EstateMapPanelProps) {
  const [hoveredIncidentId, setHoveredIncidentId] = useState<string | null>(
    null,
  );

  const activeIncidents = incidents.filter(
    (incident) => incident.status !== "closed",
  );

  const hoveredIncident = activeIncidents.find(
    (inc) => inc.id === hoveredIncidentId,
  );

  return (
    <div className="panel-strong flex flex-col gap-4 rounded-[24px] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="code-label">Estate Map</p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">
            Denah kawasan dan insiden aktif
          </h3>
        </div>
        <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-900">
          {activeIncidents.length} active
        </span>
      </div>

      <div className="relative w-full overflow-hidden rounded-[18px] border border-[var(--line)] bg-gradient-to-br from-slate-50 to-slate-100/60">
        <svg
          viewBox="0 0 100 56"
          className="w-full"
          style={{ aspectRatio: "16 / 9" }}
          role="img"
          aria-label="Denah kawasan Wiratama dengan zona dan pin insiden aktif"
        >
          <defs>
            <filter id="pin-shadow">
              <feDropShadow
                dx="0"
                dy="0.3"
                stdDeviation="0.5"
                floodOpacity="0.3"
              />
            </filter>
          </defs>

          {/* Grid lines */}
          {Array.from({ length: 6 }, (_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 11.2}
              x2="100"
              y2={i * 11.2}
              stroke="rgba(100,116,139,0.06)"
              strokeWidth="0.15"
            />
          ))}
          {Array.from({ length: 11 }, (_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 10}
              y1="0"
              x2={i * 10}
              y2="56"
              stroke="rgba(100,116,139,0.06)"
              strokeWidth="0.15"
            />
          ))}

          {/* Zone rectangles */}
          {zones.map((zone) => {
            const x = zone.mapPosition.x - ZONE_WIDTH / 2;
            const y = zone.mapPosition.y - ZONE_HEIGHT / 2;
            return (
              <g key={zone.id}>
                <rect
                  x={x}
                  y={y}
                  width={ZONE_WIDTH}
                  height={ZONE_HEIGHT}
                  rx="1.5"
                  className={zoneStatusClasses[zone.status]}
                  strokeWidth="0.3"
                />
                <text
                  x={zone.mapPosition.x}
                  y={zone.mapPosition.y - 0.5}
                  textAnchor="middle"
                  className="fill-slate-800"
                  fontSize="2.2"
                  fontWeight="600"
                >
                  {zone.name}
                </text>
                <text
                  x={zone.mapPosition.x}
                  y={zone.mapPosition.y + 2}
                  textAnchor="middle"
                  className="fill-slate-500"
                  fontSize="1.4"
                >
                  {zone.utilizationPercent}% util
                </text>
              </g>
            );
          })}

          {/* Incident pins - only active (status !== "closed") */}
          {activeIncidents.map((incident) => (
            <g
              key={incident.id}
              onMouseEnter={() => setHoveredIncidentId(incident.id)}
              onMouseLeave={() => setHoveredIncidentId(null)}
              className="cursor-pointer"
            >
                {/* Pulse ring */}
                <circle
                  cx={incident.mapPosition.x}
                  cy={incident.mapPosition.y}
                  r={PIN_RADIUS + 1.5}
                  className="fill-rose-400/20 animate-ping"
                />
                {/* Pin outer */}
                <circle
                  cx={incident.mapPosition.x}
                  cy={incident.mapPosition.y}
                  r={PIN_RADIUS + 0.5}
                  className={severityTone[incident.severity]}
                  opacity="0.4"
                  filter="url(#pin-shadow)"
                />
                {/* Pin inner */}
                <circle
                  cx={incident.mapPosition.x}
                  cy={incident.mapPosition.y}
                  r={PIN_RADIUS}
                  className={severityTone[incident.severity]}
                  filter="url(#pin-shadow)"
                />
                {/* Pin center dot */}
                <circle
                  cx={incident.mapPosition.x}
                  cy={incident.mapPosition.y}
                  r="0.4"
                  className="fill-white"
                />
              </g>
          ))}
        </svg>

        {/* Hover tooltip */}
        {hoveredIncident && (
          <div
            className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-[14px] border border-rose-200 bg-white/95 p-3 shadow-lg backdrop-blur-sm"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-rose-700">
              {hoveredIncident.code}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-950">
              {hoveredIncident.title}
            </p>
            <p className="mt-0.5 text-xs copy-muted">
              {hoveredIncident.primaryLocation} ·{" "}
              {hoveredIncident.severity.toUpperCase()}
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs copy-muted">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm border border-emerald-500 bg-emerald-100/80" />
          Normal
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm border border-amber-500 bg-amber-100/80" />
          Construction
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm border border-rose-500 bg-rose-100/80" />
          Incident
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm border border-slate-400 bg-slate-100/80" />
          Maintenance
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-600" />
          Active incident pin
        </span>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Incident, IncidentStatus } from "@/features/erp/types";

export const ERP_DEMO_STATE_KEY = "wip-erp-demo-state-v1";
export const ERP_DEMO_STATE_EVENT = "wip-erp-demo-state-change";

export type ErpDemoState = {
  addedIncidents: Incident[];
  incidentOverrides: Record<string, Partial<Incident>>;
};

const emptyState: ErpDemoState = {
  addedIncidents: [],
  incidentOverrides: {},
};

function isBrowser() {
  return typeof window !== "undefined";
}

function readState(): ErpDemoState {
  if (!isBrowser()) return emptyState;
  try {
    const raw = window.localStorage.getItem(ERP_DEMO_STATE_KEY);
    if (!raw) return emptyState;
    const parsed = JSON.parse(raw) as Partial<ErpDemoState>;
    return {
      addedIncidents: Array.isArray(parsed.addedIncidents)
        ? parsed.addedIncidents
        : [],
      incidentOverrides:
        parsed.incidentOverrides &&
        typeof parsed.incidentOverrides === "object"
          ? parsed.incidentOverrides
          : {},
    };
  } catch {
    return emptyState;
  }
}

let cachedState: ErpDemoState = emptyState;
let hasHydrated = false;
const listeners = new Set<() => void>();

function ensureHydrated() {
  if (hasHydrated || !isBrowser()) {
    hasHydrated = true;
    return;
  }
  cachedState = readState();
  hasHydrated = true;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (isBrowser()) {
    const onStorage = (event: StorageEvent) => {
      if (event.key === ERP_DEMO_STATE_KEY) {
        cachedState = readState();
        listener();
      }
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(ERP_DEMO_STATE_EVENT, listener);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(ERP_DEMO_STATE_EVENT, listener);
    };
  }
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): ErpDemoState {
  ensureHydrated();
  return cachedState;
}

function getServerSnapshot(): ErpDemoState {
  return emptyState;
}

function emitChange() {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(ERP_DEMO_STATE_EVENT));
}

function writeState(next: ErpDemoState) {
  cachedState = next;
  if (isBrowser()) {
    try {
      window.localStorage.setItem(ERP_DEMO_STATE_KEY, JSON.stringify(next));
    } catch {
      // storage quota or privacy mode: keep in-memory state only
    }
  }
  emitChange();
}

export function useErpDemoState(): ErpDemoState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function applyErpDemoStateToIncidents(
  seedIncidents: Incident[],
  demoState: ErpDemoState,
): Incident[] {
  const overridden = seedIncidents.map((incident) => {
    const patch = demoState.incidentOverrides[incident.id];
    return patch ? { ...incident, ...patch } : incident;
  });
  return [...overridden, ...demoState.addedIncidents];
}

export function useDemoIncidents(seedIncidents: Incident[]): Incident[] {
  const demoState = useErpDemoState();
  return applyErpDemoStateToIncidents(seedIncidents, demoState);
}

function generateId(prefix: string) {
  const random = Math.random().toString(36).slice(2, 8);
  const time = Date.now().toString(36).slice(-4);
  return `${prefix}-${time}${random}`;
}

export function getNextIncidentNumber(incidents: Incident[]): number {
  const numbers = incidents
    .map((incident) => {
      const match = incident.code.match(/KI-INC-2026-(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    })
    .filter((value) => !isNaN(value));
  return numbers.length > 0 ? Math.max(...numbers) + 1 : 5;
}

export function addDemoIncident(incident: Incident) {
  const current = getSnapshot();
  writeState({
    ...current,
    addedIncidents: [...current.addedIncidents, incident],
  });
}

export type UpdateDemoIncidentStatusInput = {
  incidentId: string;
  status: IncidentStatus;
  actor: string;
  note?: string;
  seedIncidents?: Incident[];
};

export type UpdateDemoIncidentStatusResult =
  | { ok: true; incident: Incident }
  | { ok: false; reason: "closed" | "not_found" };

export const workflowActivityTitles: Record<IncidentStatus, string> = {
  reported: "Laporan insiden dikirim",
  under_investigation: "Investigasi dimulai",
  action_taken: "Tindakan korektif ditugaskan",
  resolved: "Pekerjaan ditandai selesai",
  closed: "Ticket ditutup dan dikunci",
};

export function updateDemoIncidentStatus({
  incidentId,
  status,
  actor,
  note,
  seedIncidents,
}: UpdateDemoIncidentStatusInput): UpdateDemoIncidentStatusResult {
  const current = getSnapshot();

  // Lookup order:
  // 1. addedIncidents
  // 2. seedIncidents
  // 3. merge incidentOverrides
  // 4. not_found

  const added = current.addedIncidents.find((item) => item.id === incidentId);
  const seedMatch = seedIncidents?.find((item) => item.id === incidentId);
  const override = current.incidentOverrides[incidentId];

  let baseIncident: Incident | undefined;

  if (added) {
    baseIncident = added;
  } else if (seedMatch) {
    // Merge with override if exists
    baseIncident = override ? { ...seedMatch, ...override } : seedMatch;
  } else if (override) {
    // Override exists but no seed match - use override as-is
    baseIncident = override as Incident;
  }

  if (!baseIncident) {
    return { ok: false, reason: "not_found" };
  }

  if (baseIncident.status === "closed") {
    return { ok: false, reason: "closed" };
  }

  const nowIso = new Date().toISOString();
  const activityEntry = {
    id: generateId("act"),
    time: nowIso,
    actor,
    title: workflowActivityTitles[status],
    description: note ?? "",
    status,
  };

  const updated: Incident = {
    ...baseIncident,
    status,
    activityLog: [...baseIncident.activityLog, activityEntry],
  };

  if (added) {
    // Update in addedIncidents
    writeState({
      ...current,
      addedIncidents: current.addedIncidents.map((item) =>
        item.id === incidentId ? updated : item,
      ),
    });
  } else {
    // Save to incidentOverrides (seed incident or override-only)
    writeState({
      ...current,
      incidentOverrides: {
        ...current.incidentOverrides,
        [incidentId]: {
          ...current.incidentOverrides[incidentId],
          status: updated.status,
          activityLog: updated.activityLog,
        },
      },
    });
  }

  return { ok: true, incident: updated };
}

export function resetErpDemoState() {
  writeState(emptyState);
}

export function useResetErpDemoState() {
  return useCallback(() => {
    resetErpDemoState();
  }, []);
}

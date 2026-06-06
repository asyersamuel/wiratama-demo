"use client";

import { useMemo, useSyncExternalStore } from "react";
import type {
  ProposalStatus,
  Tender,
  TenderProposal,
  TenderStatus,
} from "@/features/tender/types";

const DEMO_STATE_KEY = "wip-tender-demo-state-v1";
const DEMO_STATE_EVENT = "wip-tender-demo-state-change";

type ProposalOverride = {
  status?: ProposalStatus;
  internalNotes?: string;
};

export type TenderDemoState = {
  addedProposals: TenderProposal[];
  proposalOverrides: Record<string, ProposalOverride>;
  tenderStatusById: Record<string, TenderStatus>;
};

const defaultDemoState: TenderDemoState = {
  addedProposals: [],
  proposalOverrides: {},
  tenderStatusById: {},
};

let cachedDemoStateRaw: string | null = null;
let cachedDemoState: TenderDemoState = defaultDemoState;

function isBrowser() {
  return typeof window !== "undefined";
}

function emitDemoStateChange() {
  if (!isBrowser()) {
    return;
  }

  window.dispatchEvent(new Event(DEMO_STATE_EVENT));
}

export function readDemoState(): TenderDemoState {
  if (!isBrowser()) {
    return defaultDemoState;
  }

  const raw = window.localStorage.getItem(DEMO_STATE_KEY);

  if (raw === cachedDemoStateRaw) {
    return cachedDemoState;
  }

  if (!raw) {
    cachedDemoStateRaw = null;
    cachedDemoState = defaultDemoState;
    return cachedDemoState;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<TenderDemoState>;
    cachedDemoStateRaw = raw;
    cachedDemoState = {
      addedProposals: parsed.addedProposals ?? [],
      proposalOverrides: parsed.proposalOverrides ?? {},
      tenderStatusById: parsed.tenderStatusById ?? {},
    };
    return cachedDemoState;
  } catch {
    cachedDemoStateRaw = null;
    cachedDemoState = defaultDemoState;
    return cachedDemoState;
  }
}

function writeDemoState(nextState: TenderDemoState) {
  if (!isBrowser()) {
    return;
  }

  const serialized = JSON.stringify(nextState);
  cachedDemoStateRaw = serialized;
  cachedDemoState = nextState;
  window.localStorage.setItem(DEMO_STATE_KEY, serialized);
  emitDemoStateChange();
}

function subscribeDemoState(listener: () => void) {
  if (!isBrowser()) {
    return () => undefined;
  }

  const handleChange = () => listener();

  window.addEventListener(DEMO_STATE_EVENT, handleChange);
  window.addEventListener("storage", handleChange);

  return () => {
    window.removeEventListener(DEMO_STATE_EVENT, handleChange);
    window.removeEventListener("storage", handleChange);
  };
}

function getDemoStateSnapshot() {
  return readDemoState();
}

function getDemoStateServerSnapshot() {
  return defaultDemoState;
}

export function useTenderDemoState() {
  return useSyncExternalStore(
    subscribeDemoState,
    getDemoStateSnapshot,
    getDemoStateServerSnapshot,
  );
}

function mergeProposalWithOverride(
  proposal: TenderProposal,
  override?: ProposalOverride,
): TenderProposal {
  if (!override) {
    return proposal;
  }

  return {
    ...proposal,
    status: override.status ?? proposal.status,
    internalNotes: override.internalNotes ?? proposal.internalNotes,
  };
}

export function applyDemoStateToTenders(
  seedTenders: Tender[],
  demoState: TenderDemoState,
) {
  return seedTenders.map((tender) => {
    const addedProposals = demoState.addedProposals.filter(
      (proposal) => proposal.tenderId === tender.id,
    );
    const mergedProposals = [...tender.proposals, ...addedProposals].map((proposal) =>
      mergeProposalWithOverride(
        proposal,
        demoState.proposalOverrides[proposal.proposalId],
      ),
    );

    return {
      ...tender,
      status: demoState.tenderStatusById[tender.id] ?? tender.status,
      proposals: mergedProposals,
    };
  });
}

export function useDemoTenders(seedTenders: Tender[]) {
  const demoState = useTenderDemoState();

  return useMemo(
    () => applyDemoStateToTenders(seedTenders, demoState),
    [demoState, seedTenders],
  );
}

export function buildDemoProposalId(tenderCode: string) {
  return `PR-${tenderCode.replace(/[^A-Z0-9-]/gi, "").toUpperCase()}-${Date.now()}`;
}

export function addDemoProposal(proposal: TenderProposal) {
  const currentState = readDemoState();
  const filteredAddedProposals = currentState.addedProposals.filter(
    (item) => !(item.tenderId === proposal.tenderId && item.vendorId === proposal.vendorId),
  );

  writeDemoState({
    ...currentState,
    addedProposals: [...filteredAddedProposals, proposal],
  });
}

type UpdateProposalStatusInput = {
  proposalId: string;
  tenderId: string;
  status: ProposalStatus;
  internalNotes?: string;
  relatedProposalIds?: string[];
};

export function updateDemoProposalStatus({
  proposalId,
  tenderId,
  status,
  internalNotes,
  relatedProposalIds = [],
}: UpdateProposalStatusInput) {
  const currentState = readDemoState();
  const nextOverrides = {
    ...currentState.proposalOverrides,
    [proposalId]: {
      ...currentState.proposalOverrides[proposalId],
      status,
      internalNotes:
        internalNotes ?? currentState.proposalOverrides[proposalId]?.internalNotes,
    },
  };
  const nextTenderStatusById = {
    ...currentState.tenderStatusById,
  };

  if (status === "under_review" || status === "clarification") {
    nextTenderStatusById[tenderId] = "under_review";
  }

  if (status === "shortlisted") {
    nextTenderStatusById[tenderId] = "shortlisting";
  }

  if (status === "awarded") {
    nextTenderStatusById[tenderId] = "awarded";

    relatedProposalIds
      .filter((relatedId) => relatedId !== proposalId)
      .forEach((relatedId) => {
        nextOverrides[relatedId] = {
          ...currentState.proposalOverrides[relatedId],
          status: "not_selected",
        };
      });
  }

  writeDemoState({
    ...currentState,
    proposalOverrides: nextOverrides,
    tenderStatusById: nextTenderStatusById,
  });
}

export function resetTenderDemoState() {
  if (!isBrowser()) {
    return;
  }

  cachedDemoStateRaw = null;
  cachedDemoState = defaultDemoState;
  window.localStorage.removeItem(DEMO_STATE_KEY);
  emitDemoStateChange();
}

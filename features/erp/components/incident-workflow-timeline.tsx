"use client";

import type { IncidentStatus } from "@/features/erp/types";

type IncidentWorkflowTimelineProps = {
  status: IncidentStatus;
};

const workflowSteps: { status: IncidentStatus; label: string }[] = [
  { status: "reported", label: "Reported" },
  { status: "under_investigation", label: "Under Investigation" },
  { status: "action_taken", label: "Action Taken" },
  { status: "resolved", label: "Resolved" },
  { status: "closed", label: "Closed" },
];

const statusOrder: Record<IncidentStatus, number> = {
  reported: 0,
  under_investigation: 1,
  action_taken: 2,
  resolved: 3,
  closed: 4,
};

export function IncidentWorkflowTimeline({
  status,
}: IncidentWorkflowTimelineProps) {
  const currentIndex = statusOrder[status];

  return (
    <div className="panel-strong rounded-[24px] p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="code-label">Workflow</p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">
            Progres tiket insiden
          </h3>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
          Step {currentIndex + 1} / 5
        </span>
      </div>

      <ol className="grid gap-3 sm:flex sm:items-start sm:gap-0">
        {workflowSteps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isClosed = step.status === "closed" && isCurrent;

          const circleClasses = isCompleted
            ? "bg-emerald-600 text-white"
            : isCurrent
              ? isClosed
                ? "bg-emerald-600 text-white"
                : "bg-[var(--accent)] text-white"
              : "bg-slate-200 text-slate-500";

          const labelClasses = isCompleted
            ? "text-emerald-800"
            : isCurrent
              ? isClosed
                ? "text-emerald-800"
                : "text-[var(--accent-strong)]"
              : "text-slate-500";

          return (
            <li
              key={step.status}
              className="relative flex flex-1 flex-col items-center text-center sm:flex-row sm:items-center sm:text-left"
            >
              {/* Connector line - hidden on last item */}
              {index < workflowSteps.length - 1 ? (
                <div
                  className={`absolute left-1/2 top-4 hidden h-0.5 w-full -translate-y-1/2 sm:left-auto sm:right-0 sm:top-5 sm:translate-x-0 sm:translate-y-0 ${
                    isCompleted ? "bg-emerald-500" : "bg-slate-200"
                  }`}
                  style={{ left: "calc(50% + 16px)", width: "calc(100% - 32px)" }}
                  aria-hidden
                />
              ) : null}

              <div className="z-10 flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3">
                <span
                  className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${circleClasses}`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? "✓" : index + 1}
                </span>
                <span
                  className={`text-xs font-semibold sm:text-sm ${labelClasses}`}
                >
                  {step.label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

"use client";

import { useState } from "react";
import { resetErpDemoState } from "@/features/erp/demo-store";

export function ResetErpDemoButton() {
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = () => {
    if (isResetting) return;
    const confirmed = window.confirm(
      "Reset semua data demo ERP? Data tender tidak akan terpengaruh.",
    );
    if (!confirmed) return;

    setIsResetting(true);
    resetErpDemoState();
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      disabled={isResetting}
      className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
      {isResetting ? "Resetting..." : "Reset ERP Demo"}
    </button>
  );
}

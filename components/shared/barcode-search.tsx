"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type BarcodeSearchProps = {
  initialValue?: string;
};

export function BarcodeSearch({ initialValue = "" }: BarcodeSearchProps) {
  const [barcode, setBarcode] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = barcode.trim();

    if (!value) {
      return;
    }

    startTransition(() => {
      router.push(`/tracking/${encodeURIComponent(value)}`);
    });
  };

  return (
    <form onSubmit={submit} className="panel-strong flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
      <div className="flex-1">
        <p className="code-label">Barcode Lookup</p>
        <input
          value={barcode}
          onChange={(event) => setBarcode(event.target.value)}
          placeholder="Contoh: BC-STEEL-001"
          className="mt-3 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-950"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-[#ffffff] transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-70"
      >
        {isPending ? "Opening..." : "Open tracking"}
      </button>
    </form>
  );
}

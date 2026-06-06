"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type BarcodeSearchProps = {
  initialValue?: string;
  validBarcodes: string[];
  sampleBarcodes?: string[];
};

function normalizeBarcode(value: string) {
  return value.trim().toUpperCase();
}

export function BarcodeSearch({
  initialValue = "",
  validBarcodes,
  sampleBarcodes = [],
}: BarcodeSearchProps) {
  const [barcode, setBarcode] = useState(initialValue);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const barcodeMap = new Map(
    validBarcodes.map((value) => [normalizeBarcode(value), value]),
  );

  const openBarcode = (value: string) => {
    const resolvedBarcode = barcodeMap.get(normalizeBarcode(value));

    if (!resolvedBarcode) {
      setError("Barcode tidak ditemukan. Gunakan salah satu sample tracking ID yang tersedia.");
      return;
    }

    setError("");

    startTransition(() => {
      router.push(`/tracking/${encodeURIComponent(resolvedBarcode)}`);
    });
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = barcode.trim();

    if (!value) {
      setError("Masukkan barcode tracking untuk membuka detail record.");
      return;
    }

    openBarcode(value);
  };

  return (
    <div className="panel-strong p-5 sm:p-6">
      <form onSubmit={submit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <p className="code-label">Barcode Search / Scan Simulation</p>
          <label htmlFor="tracking-barcode" className="sr-only">
            Tracking barcode
          </label>
          <input
            id="tracking-barcode"
            value={barcode}
            onChange={(event) => {
              setBarcode(event.target.value);
              if (error) {
                setError("");
              }
            }}
            placeholder="Contoh: WIP-TRK-2026-001"
            className="mt-3 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-[var(--accent)]"
          />
          {error ? <p className="mt-3 text-sm text-rose-700">{error}</p> : null}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#ffffff] transition hover:brightness-95 disabled:cursor-wait disabled:opacity-70"
        >
          {isPending ? "Opening..." : "Search / Scan Barcode"}
        </button>
      </form>

      <div className="mt-5 flex flex-wrap gap-2">
        {sampleBarcodes.map((sampleBarcode) => (
          <button
            key={sampleBarcode}
            type="button"
            onClick={() => {
              setBarcode(sampleBarcode);
              openBarcode(sampleBarcode);
            }}
            className="inline-flex rounded-full border border-[#e7cfd5] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)] transition hover:bg-[var(--accent-soft)]"
          >
            {sampleBarcode}
          </button>
        ))}
      </div>
    </div>
  );
}

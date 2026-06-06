# Wiratama Industrial MVP

Scaffold Next.js ini disiapkan untuk demo pitching dengan fokus pada flow, bukan integrasi database.

## Fitur Utama

- `Company profile`: home, development, dan portfolio.
- `Tender management`: index tender, vendor side, internal side, dan detail paket.
- `Contractor and supplier history`: record detail untuk shortlist dan evaluasi.
- `Barcode tracking`: lookup barcode dan event log material.

## Route Utama

- `/`
- `/development`
- `/portfolio`
- `/dashboard`
- `/tender`
- `/tender/vendor`
- `/tender/internal`
- `/tender/[id]`
- `/contractors`
- `/contractors/[id]`
- `/suppliers`
- `/suppliers/[id]`
- `/tracking`
- `/tracking/[barcode]`

## Jalankan Project

```bash
npm run dev
```

## Blueprint

Dokumen arsitektur MVP, daftar halaman per fitur, dan urutan flow pitching ada di [docs/mvp-blueprint.md](/D:/Study/Project/wiratama/docs/mvp-blueprint.md).

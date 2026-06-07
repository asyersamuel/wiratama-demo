# MVP Blueprint

## 1. Struktur Folder Final

```txt
app/
  favicon.ico
  layout.tsx
  globals.css
  not-found.tsx
  (public)/
    layout.tsx
    page.tsx
    development/page.tsx
    portfolio/page.tsx
  (portal)/
    layout.tsx
    dashboard/page.tsx
    tender/
      page.tsx
      guest/page.tsx
      join/page.tsx
      vendor/page.tsx
      internal/
        page.tsx
        [id]/page.tsx
      [id]/
        page.tsx
        apply/page.tsx
    contractors/
      page.tsx
      [id]/page.tsx
    suppliers/
      page.tsx
      [id]/page.tsx
    tracking/
      page.tsx
      [barcode]/page.tsx

components/
  shared/
    barcode-search.tsx
    demo-note.tsx
    page-hero.tsx
    portal-page-intro.tsx
    portal-shell.tsx
    portal-top-nav.tsx
    site-footer.tsx
    site-header.tsx
    timeline.tsx
  ui/
    metric-card.tsx
    section-card.tsx
    status-pill.tsx

features/
  company-profile/
    data/overview.ts
    service.ts
    types.ts
  tender/
    components/
      guest-tender-directory.tsx
      internal-review-list.tsx
      internal-tender-review-detail.tsx
      proposal-comparison-table.tsx
      proposal-detail-drawer.tsx
      tender-area-map.tsx
      tender-detail-view.tsx
      tender-directory.tsx
      vendor-proposal-form.tsx
    data/tenders.ts
    demo-store.ts
    service.ts
    types.ts
  contractor/
    data/contractors.ts
    service.ts
    types.ts
  supplier/
    data/suppliers.ts
    service.ts
    types.ts
  tracking/
    data/items.ts
    service.ts
    types.ts

lib/
  format.ts
  mock-api.ts
  navigation.ts
  status.ts
```

Prinsipnya:

- `app/` hanya untuk route, layout, dan page.
- `features/` memisahkan domain bisnis agar mock data, type, komponen spesifik domain, dan service tidak tercampur.
- `components/shared/` dipakai lintas halaman.
- `components/ui/` berisi primitive kecil yang berulang.
- `lib/` dipakai untuk utilitas umum yang tidak spesifik ke domain.

## 2. Daftar Halaman Per Fitur

### Company Profile

- `/`
  - landing utama yang menjelaskan 4 fitur MVP.
- `/development`
  - daftar kawasan atau cluster pengembangan.
- `/portfolio`
  - portofolio proyek dan partner sebagai jembatan ke history.

### Tender Management

- `/dashboard`
  - command center singkat untuk pembuka demo.
- `/tender`
  - index paket tender aktif.
- `/tender/guest`
  - direktori tender untuk publik/tamu yang belum terdaftar.
- `/tender/join`
  - halaman registrasi/onboarding vendor untuk bergabung.
- `/tender/vendor`
  - dashboard vendor untuk status proposal dan shortcut tender terbuka.
- `/tender/internal`
  - workspace review tim internal procurement.
- `/tender/internal/[id]`
  - detail review komparasi untuk satu paket tender dari sisi internal.
- `/tender/[id]`
  - detail satu paket tender, requirement, evaluation focus, dan milestones.
- `/tender/[id]/apply`
  - simulasi submit proposal untuk tender spesifik.

### Contractor and Supplier History

- `/contractors`
  - daftar record kontraktor.
- `/contractors/[id]`
  - histori proyek, score, dan kekuatan utama kontraktor.
- `/suppliers`
  - daftar record supplier.
- `/suppliers/[id]`
  - kategori material, reliability, lead time, dan notes.

### Barcode Tracking

- `/tracking`
  - input barcode manual dan daftar sample item.
- `/tracking/[barcode]`
  - status item, lokasi, dan event log.

## 3. Urutan Flow Demo untuk Pitching

Urutan yang paling aman:

1. Buka `/`
   - jelaskan bahwa ini bukan ERP penuh, tapi MVP untuk memperlihatkan flow bisnis.
2. Masuk ke `/development` lalu `/portfolio`
   - bangun konteks kawasan, skala proyek, dan partner ecosystem.
3. Pindah ke `/dashboard`
   - tunjukkan bahwa semua flow inti berkumpul di satu command center.
4. Buka `/tender`
   - perlihatkan paket aktif yang sedang berjalan.
5. Buka `/tender/guest` dan `/tender/join` (Opsional)
   - tunjukkan portal publik untuk vendor baru yang ingin bergabung.
6. Buka `/tender/[id]`
   - perlihatkan requirement dan milestone agar tender terasa nyata.
7. Masuk ke `/tender/[id]/apply`
   - tunjukkan simulasi submit proposal yang tetap local-only (menggunakan `demo-store`).
8. Masuk ke `/tender/vendor`
   - jelaskan status proposal dari sisi vendor yang disimulasikan dari `demo-store`.
9. Masuk ke `/tender/internal` dan `/tender/internal/[id]`
   - jelaskan bagaimana tim internal mereview dan membandingkan partner dengan UI drawer dan komparasi.
10. Buka `/contractors/[id]` atau `/suppliers/[id]`
   - tunjukkan kenapa history penting untuk proyek jangka 30 tahun.
11. Tutup di `/tracking/[barcode]`
   - tunjukkan separate operational tracking demo untuk material atau item.

## 4. Batasan MVP Saat Ini

- Semua data masih local mock, termasuk state management dengan Zustand (via `demo-store`).
- Belum ada autentikasi nyata.
- Belum ada database terpusat.
- Belum ada upload dokumen atau scanner barcode nyata.
- Fokus utama adalah alur presentasi dan validasi konsep produk melalui interaktivitas state client.

## 5. Arah Pengembangan Setelah Pitch

- Tambah role dan permission yang sebenarnya.
- Sambungkan `service.ts` ke API atau database (seperti Firebase/Supabase).
- Tambah histori tender yang lebih panjang.
- Tambah scoring matrix vendor terintegrasi.
- Ganti input barcode manual dengan scanner atau mobile app integration.

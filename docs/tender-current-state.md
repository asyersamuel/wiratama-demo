# Dokumentasi Current State - Tender MVP PT WIP

## Ringkasan

Tender MVP PT WIP saat ini diposisikan sebagai demo pitching lokal tanpa database, tanpa autentikasi real, dan tanpa API production. Fokus utamanya adalah memperlihatkan alur tender yang profesional dan mudah dipresentasikan dari sisi vendor maupun internal PT WIP.

Flow utama yang sekarang didukung:

- Mode Vendor
  - `Daftar Tender`
  - `Detail Tender`
  - `Ajukan Proposal`
  - `Portal Vendor`
- Mode Internal PT WIP
  - `Dashboard`
  - `Review Tender`
  - `Detail Review Tender`
  - `Detail Proposal`
  - `Update Status Proposal`
  - `Kontraktor`

Tracking tetap tersedia sebagai modul terpisah dan tidak diubah menjadi bagian inti flow tender.

## Struktur Navigasi Baru

Navbar portal sekarang memakai role switcher demo:

- `Vendor`
  - `/tender`
  - `/tender/vendor`
- `Internal PT WIP`
  - `/dashboard`
  - `/tender/internal`
  - `/contractors`
  - `/tracking`

`Company Profile` tetap menjadi link terpisah ke route publik `/`.

Mode akses disimpan di browser dan akan otomatis mengikuti route saat presenter berpindah antar area vendor dan internal.

## Data Dummy Aktif

### Tender utama

1. `TND-WIP-001` Pembangunan Jalan Utama Kawasan Industri Zona A
2. `TND-WIP-002` Pekerjaan Drainase Utama Zona A
3. `TND-WIP-003` Pengadaan Pipa HDPE Jaringan Air Bersih

### Vendor utama

1. `PT Prima Infrastruktur Abadi`
2. `PT Indra Konstruksi Mandiri`
3. `PT Karya Beton Nusantara`

### Skenario demo utama

Vendor utama `PT Prima Infrastruktur Abadi` mengajukan proposal ke tender:

- `Pembangunan Jalan Utama Kawasan Industri Zona A`

Proposal yang dikirim dari `/tender/[id]/apply` akan muncul kembali pada:

- `/tender/vendor`
- `/tender/internal`
- `/tender/internal/[id]`
- proposal detail drawer
- `/contractors/[id]`

Semua ini bekerja melalui state demo lokal di browser yang sama.

## Perilaku Demo State

State demo tersimpan di `localStorage` dan dipakai untuk:

- menambahkan proposal baru dari sisi vendor
- mengubah status proposal dari sisi internal
- memperbarui tampilan Portal Vendor dan Review Tender
- reset demo kembali ke seed data

Batasannya:

- hanya berlaku di browser yang sama
- tidak ada multi-user sync
- tidak ada persistence server
- tidak ada audit trail

## Fungsi Tiap Route

### `/dashboard`

Ringkasan internal PT WIP:

- jumlah tender aktif
- tender open
- tender under review
- proposal masuk
- proposal perlu review
- shortlisted
- kontraktor aktif
- tracking hari ini

Halaman ini tidak lagi menjadi command center navigasi besar.

### `/tender`

Daftar Tender untuk vendor:

- search
- filter status
- urutkan data
- status tender
- deadline
- nilai estimasi
- kategori dan lokasi

CTA utama: `Lihat Detail Tender`

### `/tender/[id]`

Detail Tender untuk vendor:

- ringkasan tender
- scope pekerjaan
- persyaratan
- dokumen yang dibutuhkan
- timeline tender

CTA utama: `Ajukan Proposal`

### `/tender/[id]/apply`

Ajukan Proposal:

- ringkasan tender
- profil vendor terprefill
- form proposal realistis
- checklist dokumen visual-only

Setelah submit, sistem menampilkan nomor proposal dan status `Submitted`.

### `/tender/vendor`

Portal Vendor:

- profil vendor
- status verifikasi
- daftar pengajuan saya
- status proposal
- shortcut ke tender yang masih open

### `/tender/internal`

Review Tender:

- daftar tender yang memiliki proposal
- status tender
- jumlah proposal masuk
- jumlah proposal perlu review

CTA utama: `Review Tender`

### `/tender/internal/[id]`

Detail Review Tender:

- summary tender
- daftar proposal vendor
- badge status proposal
- comparison table ringkas
- drawer detail proposal

Internal dapat mengubah status proposal secara lokal:

- `Under Review`
- `Clarification`
- `Shortlisted`
- `Awarded`
- `Not Selected`

Jika status berubah, Portal Vendor akan ikut ter-update di browser yang sama.

### `/contractors`

Direktori vendor/kontraktor:

- nama perusahaan
- bidang usaha
- NIB
- status verifikasi
- PIC
- skor ringkas

### `/contractors/[id]`

Profil vendor/kontraktor:

- NIB
- NPWP
- alamat
- PIC dan kontak
- bidang usaha
- klasifikasi usaha
- dokumen legal
- pengalaman proyek
- histori pekerjaan
- ringkasan kinerja

## Status Tender dan Proposal

### Tender

- `Draft`
- `Open`
- `Under Review`
- `Shortlisting`
- `Awarded`
- `Closed`

### Proposal

- `Draft`
- `Submitted`
- `Under Review`
- `Clarification`
- `Shortlisted`
- `Awarded`
- `Not Selected`

Status proposal dapat diubah dari drawer internal, dan perubahan tersebut akan memengaruhi tampilan di list internal serta Portal Vendor.

## Reset Demo

Terdapat kontrol `Reset Demo` di navbar portal.

Fungsinya:

- menghapus proposal tambahan dari local demo state
- menghapus override status proposal
- mengembalikan tampilan ke seed data awal

## Batasan MVP

- tidak ada database
- tidak ada auth real
- tidak ada API routes
- tidak ada upload file real
- tidak ada approval workflow real
- tidak ada ERP/procurement engine
- tidak ada sinkronisasi lintas browser

## Catatan Presentasi

Urutan demo yang paling aman:

1. `Mode Vendor` -> `/tender`
2. buka `/tender/[id]`
3. lanjut ke `/tender/[id]/apply`
4. submit proposal
5. buka `/tender/vendor`
6. switch ke `Mode Internal PT WIP`
7. buka `/dashboard`
8. lanjut ke `/tender/internal`
9. buka `/tender/internal/[id]`
10. buka drawer proposal dan ubah status
11. bila perlu buka `/contractors/[id]`

Dengan alur ini, presenter bisa menunjukkan bahwa satu proposal vendor benar-benar mengalir ke review internal dan kembali lagi ke Portal Vendor secara visual.

# Mini ERP Demo Guide — Executive Dashboard & Incident Management

## Tujuan Demo

Mini ERP adalah fondasi operasional kawasan Wiratama yang dirancang untuk
pitching flow. Demo ini menunjukkan bagaimana area operasional kawasan
(estate, infrastruktur, dan insiden) terhubung dalam satu pengalaman visual
konsisten, dengan localStorage sebagai demo store sehingga seluruh interaksi
terjadi secara real-time tanpa backend.

Fokus demo:
- Menunjukkan executive dashboard yang membaca data seed + demo state.
- Menunjukkan end-to-end incident lifecycle: Reported → Under Investigation
  → Action Taken → Resolved → Closed.
- Menunjukkan bagaimana perubahan status tiket langsung tercermin di
  dashboard, peta kawasan, dan live feed.

## Route Utama

| Route | Fungsi |
|-------|--------|
| `/erp` | Landing Mini ERP, app grid, quick links, demo guide |
| `/erp/dashboard` | Executive dashboard: scorecard, peta, infrastruktur, live feed |
| `/erp/incidents` | Incident Register: daftar tiket dengan filter |
| `/erp/incidents/new` | Wizard pelaporan insiden 4 langkah |
| `/erp/incidents/[id]` | Detail tiket: workflow, action, SLA, activity log, evidence |

## Data Dummy Utama

- **4 seed incidents** dengan status bervariasi: `under_investigation`,
  `action_taken`, `reported`, dan `closed`.
- **5 zone kawasan**: Blok A, Blok B, Area WTP, Gerbang Utama, Kompleks
  Pergudangan.
- **4 paket infrastruktur**: Jalan Utama Kawasan, Water Treatment Plant,
  Gardu Listrik Utama, Jaringan Fiber Optic.
- **5 PIC options** (3 internal + 2 vendor).

## Skenario Demo 5–7 Menit

1. **Mulai dari `/erp`** — Tunjukkan app grid, demo guide, dan quick links.
2. **Buka `/erp/dashboard`** — Highlight 4 scorecard eksekutif, peta kawasan
   dengan pin insiden aktif, progress chart, dan live feed.
3. **Buat incident baru** — Klik "Buat Laporan Insiden", jalankan wizard
   4 langkah (Initial Log → Impact Assessment → CAPA/Assignment → Review &
   Submit). Incident baru akan muncul otomatis di dashboard, register, dan
   peta.
4. **Lihat dashboard berubah** — Active count naik, kerugian aktif naik,
   pin baru muncul di peta kawasan.
5. **Jalankan workflow** — Buka detail incident, gunakan action button
   untuk transisi status: Start Investigation → Move to Action Taken →
   Mark as Resolved → Close Ticket.
6. **Lihat perubahan setelah Closed** — Active count turun, kerugian
   aktif turun, pin hilang dari peta, live feed menampilkan status
   "Closed", dan timeline menampilkan semua step completed.

## Reset Demo

Gunakan tombol **Reset ERP Demo** di halaman `/erp/dashboard` untuk:
- Menghapus semua incident yang dibuat selama demo.
- Mengembalikan status seed incident ke kondisi awal.

Reset hanya menghapus localStorage key `wip-erp-demo-state-v1`. Data tender
dan tracking tidak terpengaruh.

## Expected Demo Outcome

Setelah demo selesai, audience akan melihat:

- **Executive visibility**: 4 scorecard (lahan, konstruksi, insiden aktif,
  kerugian aktif) yang terupdate real-time.
- **Geographic context**: Peta kawasan dengan pin insiden yang muncul/hilang
  mengikuti status tiket.
- **Operational discipline**: Workflow 5-langkah dengan konfirmasi Close
  Ticket dan audit lock.
- **Data integrity**: Activity log merekam setiap transisi status dengan
  actor dan timestamp.
- **Demo reliability**: Reset button memastikan demo dapat diulang dari
  kondisi bersih tanpa memengaruhi data tender.

## Catatan Batasan

- **Tidak ada backend**: Semua data disimpan di localStorage browser
  (`wip-erp-demo-state-v1`).
- **Tidak ada upload file real**: Evidence hanya menyimpan metadata
  (nama, ukuran, tipe) tanpa mengunggah file ke server.
- **Data mock**: Seed incident, zone, infrastruktur, dan PIC adalah data
  statis untuk keperluan demo.
- **Tidak memengaruhi tender demo**: localStorage key ERP terpisah dari
  key tender, sehingga reset ERP tidak menghapus data tender.
- **Single-user**: Demo dirancang untuk satu user di satu browser, bukan
  multi-user collaboration.

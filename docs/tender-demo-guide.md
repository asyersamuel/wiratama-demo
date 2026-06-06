# Tender MVP Demo Guide

## 1. Overview

Tender MVP ini dibuat untuk membantu PT WIP menjelaskan gambaran sistem tender dan procurement secara cepat saat pitching, tanpa masuk ke kompleksitas sistem final. Fokusnya bukan pada transaksi produksi, tetapi pada kejelasan alur bisnis, visibilitas tender, simulasi partisipasi vendor, dukungan review internal, dan konteks histori partner.

Bagi PT WIP, nilai utama demo ini adalah:

- menunjukkan bagaimana tender package dapat dipresentasikan dengan rapi
- menunjukkan bagaimana vendor dapat memahami detail tender sebelum submit proposal
- menunjukkan bagaimana tim internal dapat membandingkan proposal dengan pendekatan decision support
- menunjukkan bagaimana histori external contractor dapat membantu evaluasi
- menunjukkan bahwa operational tracking dapat diperkenalkan sebagai modul terpisah

## 2. Module Summary

### Tender Catalog

Halaman ini adalah pintu masuk utama untuk melihat seluruh tender package. Presenter bisa menjelaskan bahwa user mulai dari katalog, bukan langsung dari form.

### Tender Detail

Halaman ini menunjukkan scope, requirements, required documents, timeline, dan snapshot proposal. Ini membantu menjelaskan bahwa vendor perlu memahami tender sebelum mengajukan proposal.

### Apply Proposal Simulation

Halaman ini adalah simulasi local-only untuk proposal submission. Tidak ada database, upload real, atau API production.

### Vendor Dashboard

Halaman ini menunjukkan status proposal dari sisi vendor. Fungsinya untuk menjelaskan post-submission visibility, bukan sebagai halaman pencarian tender utama.

### Internal Procurement Review

Halaman ini menunjukkan bagaimana tim internal PT WIP dapat melihat submitted contractors, membandingkan proposal, membaca decision support insight, dan membuka contractor history.

### Contractor History

Halaman ini menunjukkan histori external contractor atau partner yang relevan untuk evaluasi tender. Fokusnya adalah track record, strengths, dan project history.

### Operational Tracking Demo

Halaman ini adalah modul demo terpisah untuk material, item, atau barcode monitoring. Modul ini tidak diposisikan sebagai otomatis terhubung ke tender award.

## 3. Navbar Guide

### Dashboard

Digunakan sebagai command center demo. Ini adalah titik pembuka yang paling aman untuk memperkenalkan scope MVP.

### Tender

Masuk ke Tender Catalog untuk melihat tender package yang tersedia dan memilih salah satu package untuk dibuka.

### Vendor Portal

Menunjukkan Vendor Dashboard, yaitu ringkasan status proposal dari sisi external vendor.

### Internal View

Menunjukkan Internal Procurement Review, yaitu area evaluasi proposal, comparison, dan decision support.

### Contractors

Menunjukkan Contractor History, yaitu histori external contractor dan partner yang bisa dijadikan konteks evaluasi.

### Tracking

Menunjukkan Operational Tracking Demo yang berdiri terpisah dari flow tender inti.

### Company Profile

Kembali ke konteks perusahaan dan positioning awal demo.

## 4. Recommended Demo Flow

### 1. `/dashboard`

- What to show:
  - MVP summary
  - key metrics
  - recommended demo flow
- What to say:
  - "Ini adalah command center demo untuk menjelaskan scope MVP sebelum masuk ke alur tender."

### 2. `/tender`

- What to show:
  - Tender Catalog
  - filters
  - tender package cards
- What to say:
  - "Flow dimulai dari Tender Catalog agar user melihat daftar paket tender yang tersedia."

### 3. `/tender/[id]`

- What to show:
  - scope of work
  - requirements
  - required documents
  - timeline
- What to say:
  - "Sebelum submit proposal, vendor membaca Tender Detail terlebih dahulu agar konteks paketnya jelas."

### 4. `/tender/[id]/apply`

- What to show:
  - tender summary
  - Proposal Submission Simulation
  - success state
- What to say:
  - "Halaman ini hanya simulasi local-only. Tidak ada upload real, database write, atau backend procurement workflow."

### 5. `/tender/vendor`

- What to show:
  - Vendor Dashboard
  - submitted proposal status
  - suggested open tenders
- What to say:
  - "Setelah submission, vendor dapat melihat status proposal dan kembali ke tender package lain bila diperlukan."

### 6. `/tender/internal`

- What to show:
  - Tenders Under Evaluation
  - Submitted Contractors
  - Proposal Comparison
  - Decision Support Insight
- What to say:
  - "Di sisi internal, sistem membantu review proposal dan shortlist discussion, bukan otomatis memilih pemenang."

### 7. `/contractors/[id]`

- What to show:
  - contractor profile
  - strengths
  - project history
- What to say:
  - "Halaman ini menjelaskan mengapa histori external contractor penting sebagai konteks evaluasi tender."

### 8. Optional `/tracking`

- What to show:
  - barcode search
  - sample tracking items
- What to say:
  - "Ini adalah Operational Tracking Demo yang terpisah dari tender flow inti, untuk menunjukkan value operasional tambahan."

## 5. Demo Script

### 30-second opening

"MVP ini dirancang untuk membantu PT WIP mempresentasikan gambaran sistem tender secara lebih jelas. Fokusnya bukan pada sistem procurement final, tetapi pada bagaimana tender package ditampilkan, bagaimana vendor memahami dan mensimulasikan submission, bagaimana tim internal melakukan review proposal, dan bagaimana histori partner dapat digunakan sebagai decision support."

### 3–5 minute walkthrough

1. Mulai dari `/dashboard`
   - jelaskan bahwa ini adalah command center demo
   - tunjukkan scope MVP dan recommended flow

2. Buka `/tender`
   - jelaskan bahwa ini adalah Tender Catalog
   - tunjukkan search, filter, dan beberapa tender package

3. Buka `/tender/[id]`
   - tunjukkan scope, requirements, required documents, dan timeline
   - jelaskan bahwa vendor review terjadi sebelum apply

4. Buka `/tender/[id]/apply`
   - tunjukkan Proposal Submission Simulation
   - submit form untuk menampilkan success state

5. Buka `/tender/vendor`
   - tunjukkan Vendor Dashboard
   - jelaskan status proposal dan shortcut kembali ke tender

6. Buka `/tender/internal`
   - tunjukkan current review queue
   - tunjukkan Submitted Contractors
   - tunjukkan Proposal Comparison
   - jelaskan Decision Support Insight

7. Buka `/contractors/[id]`
   - tunjukkan histori dan strengths contractor
   - jelaskan relevansi histori terhadap evaluasi

8. Jika perlu, tutup di `/tracking`
   - posisikan sebagai optional Operational Tracking Demo

### 30-second closing

"Dengan MVP ini, PT WIP dapat menunjukkan alur tender yang lebih mudah dipahami stakeholder: mulai dari katalog tender, detail paket, simulasi submission vendor, review internal berbasis comparison dan contractor history, sampai optional operational tracking demo. Ini cukup untuk pitching dan validasi konsep tanpa harus membangun full procurement system terlebih dahulu."

## 6. MVP Limitations

- belum ada database
- belum ada authentication
- belum ada real upload
- belum ada production API
- semua submission tetap local-only simulation
- belum ada approval workflow
- belum ada audit trail

## 7. Future Enhancements

- role-based login
- persistent tender and proposal records
- document upload
- scoring framework
- approval workflow
- audit trail
- notification
- ERP or procurement integration
- optional tracking integration later if needed

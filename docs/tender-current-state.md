# Dokumentasi Current State - Tender MVP PT WIP

## 1. Ringkasan Fitur

Tender MVP PT WIP adalah demo produk yang dirancang untuk memvisualisasikan alur tender dan procurement kawasan industri secara cepat, rapi, dan mudah dipahami saat pitching ke client. Fokus utamanya bukan membangun sistem final, tetapi memperlihatkan bagaimana proses tender dapat dipresentasikan dari sisi vendor, tim internal procurement, histori contractor, dan opsional tracking operasional.

MVP ini dibuat untuk membantu PT Wiratama Indramayu Perkasa menjelaskan value digital procurement secara konkret, tanpa harus menunggu integrasi backend, workflow approval, atau data real siap diproduksi. Dengan pendekatan ini, PT WIP dapat menunjukkan gambaran sistem yang lebih matang di depan client, sambil tetap menjaga ruang untuk validasi kebutuhan bisnis sebelum development lanjutan.

Secara current state, sistem membantu memvisualisasikan:

- tender catalog untuk browsing paket tender
- tender detail untuk memahami scope, requirement, dan timeline
- proposal submission simulation dari sisi vendor
- vendor dashboard untuk melihat status proposal
- internal procurement review untuk membandingkan proposal
- contractor history sebagai konteks evaluasi partner
- operational tracking demo yang terpisah dari alur tender utama

Posisinya harus dijelaskan sebagai demo pitching atau MVP validation tool, bukan procurement system final.

## 2. Tujuan Bisnis

### Centralized Tender Catalog

PT WIP dapat menunjukkan bahwa seluruh paket tender bisa dilihat dalam satu katalog yang konsisten, lengkap dengan status, nilai estimasi, deadline, dan konteks paket. Ini membantu stakeholder memahami pipeline tender tanpa harus melihat file atau spreadsheet yang terpisah-pisah.

### Vendor Participation Flow

MVP ini memperlihatkan bahwa vendor tidak langsung masuk ke proses submit, tetapi terlebih dahulu memahami detail paket, requirement, dan dokumen yang dibutuhkan. Ini memberi gambaran proses procurement yang lebih tertib dan profesional.

### Proposal Submission Simulation

Walaupun masih simulasi, alur apply sudah cukup untuk menjelaskan bagaimana vendor akan mengirim penawaran, mengisi informasi utama, dan melihat status proposal setelah submit. Ini penting untuk menggambarkan pengalaman vendor secara end-to-end.

### Internal Review Workspace

PT WIP dapat mendemonstrasikan ruang kerja internal yang fokus pada review tender, perbandingan proposal, dan pengambilan keputusan berbasis data pendukung. Ini membantu menjelaskan bahwa sistem tidak hanya tampil bagus di sisi eksternal, tetapi juga berguna untuk tim procurement internal.

### Contractor History Foundation

Dalam proyek kawasan industri jangka panjang, histori contractor sangat penting. MVP ini menunjukkan bagaimana performa masa lalu, rating, dan pengalaman relevan bisa menjadi fondasi evaluasi vendor atau contractor pada tender berikutnya.

### Better Procurement Visibility

Dengan dashboard, katalog tender, internal review, dan contractor history, PT WIP dapat menjelaskan bahwa visibilitas procurement akan meningkat. Stakeholder bisa melihat paket yang aktif, yang sedang direview, serta konteks partner yang terlibat.

### Future-ready untuk proyek kawasan industri jangka panjang

Walaupun saat ini masih mock, struktur MVP sudah diarahkan untuk kebutuhan jangka panjang: role-based access, histori tender, scoring, workflow approval, document management, dan integrasi tracking bila nanti dibutuhkan.

## 3. Prinsip MVP Saat Ini

Current state MVP ini memiliki batasan yang memang disengaja:

- semua data masih dummy dan local mock
- belum ada database
- belum ada login atau authentication real
- belum ada upload dokumen real
- belum ada API production
- action internal masih visual-only
- belum ada approval workflow real
- belum ada audit trail
- tracking masih modul demo terpisah
- tujuan utama adalah validasi alur bisnis dan bahan pitching

Implikasinya, semua interaksi penting saat demo harus diposisikan sebagai simulasi pengalaman pengguna, bukan transaksi procurement yang benar-benar tersimpan.

## 4. Struktur Navigasi

Navbar portal saat ini menampilkan menu berikut:

- `Dashboard`
- `Tender`
- `Vendor Portal`
- `Internal View`
- `Contractors`
- `Tracking`
- tombol `Company Profile`

Route `Suppliers` masih ada di repo sebagai halaman dan data pendukung, tetapi tidak lagi tampil di navbar utama. Ini berarti supplier masih menjadi bagian dari domain data, namun bukan bagian dari current visible navigation flow saat pitching.

### Dashboard

Route: `/dashboard`  
Fungsi: command center demo untuk membuka narasi MVP.  
User utama: presenter, internal PT WIP.  
Dipakai saat demo: di awal, untuk menjelaskan scope, metrik, dan urutan demo.  
Next action: lanjut ke `/tender` atau langsung ke `/tender/internal`.

### Tender

Route: `/tender`  
Fungsi: katalog tender dengan search, filter, dan sort.  
User utama: vendor, internal PT WIP, presenter.  
Dipakai saat demo: untuk menunjukkan daftar paket tender yang tersedia sebelum membuka detail.  
Next action: buka `/tender/[id]`.

### Vendor Portal

Route: `/tender/vendor`  
Fungsi: dashboard vendor untuk melihat status proposal yang sudah disubmit dan shortcut ke tender terbuka.  
User utama: vendor, presenter.  
Dipakai saat demo: setelah proposal submission simulation.  
Next action: kembali ke `/tender` atau buka detail tender lain.

### Internal View

Route: `/tender/internal`  
Fungsi: workspace review internal dengan review queue tender.  
User utama: internal procurement PT WIP, presenter.  
Dipakai saat demo: setelah menunjukkan flow vendor, untuk pindah ke perspektif internal.  
Next action: buka `/tender/internal/[id]`.

### Contractors

Route: `/contractors`  
Fungsi: histori external partner untuk evaluasi tender.  
User utama: internal procurement, presenter.  
Dipakai saat demo: saat menjelaskan konteks track record partner.  
Next action: buka `/contractors/[id]`.

### Tracking

Route: `/tracking`  
Fungsi: demo tracking operasional berbasis barcode untuk material atau item.  
User utama: presenter, operasional, procurement.  
Dipakai saat demo: opsional, biasanya di akhir sebagai value tambahan.  
Next action: buka `/tracking/[barcode]`.

### Company Profile

Route utama: `/`  
Fungsi: public landing untuk memperkenalkan PT WIP, positioning, dan konteks kawasan.  
User utama: client, stakeholder eksternal, presenter.  
Dipakai saat demo: sebelum masuk portal, jika ingin membangun konteks company profile.  
Next action: lanjut ke `/dashboard`.

Catatan tambahan:

- public microsite juga memiliki route `/development` dan `/portfolio`
- route tersebut relevan untuk membangun konteks perusahaan, tetapi bukan bagian inti dari flow tender portal

## 5. Flow Demo Utama

Flow demo yang paling natural saat ini adalah:

`/dashboard` -> `/tender` -> `/tender/[id]` -> `/tender/[id]/apply` -> `/tender/vendor` -> `/tender/internal` -> `/tender/internal/[id]` -> `/contractors/[id]` -> optional `/tracking`

### 1. Dashboard

Route: `/dashboard`  
Yang ditampilkan: ringkasan MVP, metrik utama, tender pulse, CTA ke Tender, Internal Review, dan Contractors.  
Yang dijelaskan presenter: ini adalah command center untuk menjelaskan scope demo sebelum masuk ke alur tender.  
CTA berikutnya: `Start Tender Demo`.

### 2. Tender Catalog

Route: `/tender`  
Yang ditampilkan: katalog tender, search bar, filter, sort, statistik pipeline, shortcut ke Vendor Portal dan Internal View.  
Yang dijelaskan presenter: semua paket tender dapat dibrowse di satu tempat sebelum user membuka detail paket.  
CTA berikutnya: `View Detail`.

### 3. Tender Detail

Route: `/tender/[id]`  
Yang ditampilkan: detail tender lengkap, scope, requirements, required documents, timeline, snapshot proposal, related tenders, dan quick actions.  
Yang dijelaskan presenter: vendor atau internal harus memahami konteks paket terlebih dahulu sebelum submit atau review.  
CTA berikutnya: `Submit Proposal` atau `Review Internally`.

### 4. Proposal Apply Page

Route: `/tender/[id]/apply`  
Yang ditampilkan: tender summary, form proposal, visual upload area, local success state.  
Yang dijelaskan presenter: ini simulasi proposal submission dari sisi vendor, tanpa persistence data.  
CTA berikutnya: `View Vendor Dashboard`.

### 5. Vendor Dashboard

Route: `/tender/vendor`  
Yang ditampilkan: profil vendor demo, metrics, daftar proposal vendor, suggested open tenders.  
Yang dijelaskan presenter: setelah submit, vendor dapat memonitor status proposal dan mencari peluang lain.  
CTA berikutnya: `Browse All Tenders` atau buka detail tender.

### 6. Internal Procurement Review

Route: `/tender/internal`  
Yang ditampilkan: metrik review queue, guide status tender dan proposal, daftar tender yang perlu direview.  
Yang dijelaskan presenter: setelah vendor submit, tim internal masuk ke area review untuk memilih tender yang akan dievaluasi lebih dalam.  
CTA berikutnya: `Review Tender`.

### 7. Internal Tender Review Detail

Route: `/tender/internal/[id]`  
Yang ditampilkan: proposal masuk, comparison table, contractor history preview, proposal detail drawer, dan action visual-only.  
Yang dijelaskan presenter: sistem mendukung analisis, comparison, dan shortlist discussion, tetapi keputusan akhir tetap manusia.  
CTA berikutnya: buka `View Contractor History`.

### 8. Contractor History

Route: `/contractors/[id]`  
Yang ditampilkan: profil partner, strengths, histori proyek, score, on-time record.  
Yang dijelaskan presenter: histori partner membantu pengambilan keputusan tender jangka panjang.  
CTA berikutnya: kembali ke internal review.

### 9. Optional Tracking Demo

Route: `/tracking` atau `/tracking/[barcode]`  
Yang ditampilkan: barcode search, sample items, tracking snapshot, event log.  
Yang dijelaskan presenter: ini modul operasional tambahan yang terpisah dari alur tender inti.  
CTA berikutnya: tidak wajib; biasanya dipakai untuk penutup value tambahan.

## 6. Penjelasan Halaman per Route

### /dashboard

Fungsi utama:

- menjadi command center demo
- memperkenalkan scope MVP
- menyiapkan audience sebelum masuk ke katalog tender

Current summary yang tampil:

- `tender packages`: 5
- `shortlist candidates`: 6
- `external records`: 11
- `tracking items`: 3

Konten utama:

- hero command center dengan CTA `Start Tender Demo`, `Open Internal Review`, dan `View Contractors`
- blok `MVP Summary`
- blok `Recommended Demo Flow`
- blok `Tender Pulse` yang menampilkan seluruh tender utama
- blok `Next Step CTA`

Peran saat demo:

- halaman pembuka yang paling aman untuk memulai
- membantu presenter menjelaskan bahwa tender hanyalah satu bagian dari MVP yang lebih besar
- memudahkan perpindahan cepat ke katalog tender atau internal review

### /tender

Fungsi utama:

- menjadi katalog tender utama
- menyediakan pencarian, filter, dan sort
- menunjukkan status dan skala paket tender yang tersedia

Statistik yang tampil saat ini:

- total tender: 5
- open tender: 2
- under evaluation: 2
- total estimated value: sekitar IDR 329,2 miliar

Fitur katalog:

- search by title, code, location, description, atau zone
- filter kategori: All, Infrastructure, Utility, Building, Supplier
- filter status: Draft, Open, Under Review, Shortlisting, Awarded, Closed
- filter nilai tender: up to IDR 25B, IDR 25B - 75B, above IDR 75B
- filter zone
- sort: Newest, Closing Soon, Highest Value, Most Proposals

Data yang tampil di tiap tender card:

- tender code
- title
- status
- category group dan category
- short description
- deadline
- estimated value
- zone
- proposal count
- location

Catatan current state:

- tidak ada form apply langsung di halaman ini
- CTA utama adalah `View Detail`
- ada shortcut ke `Vendor Portal` dan `Internal View`

### /tender/[id]

Fungsi utama:

- menjadi halaman detail tender
- memperlihatkan informasi tender secara lengkap sebelum apply atau review internal

Informasi yang ditampilkan:

- tender code
- title
- category
- location
- zone
- estimated value
- deadline
- start date
- status
- description atau tender background
- scope of work
- requirements
- required documents
- milestones atau tender timeline
- proposal overview

Tab anchor yang tersedia:

- `General Information`
- `Work Details`
- `Procurement Details`
- `Schedule`

Proposal overview menampilkan:

- nama contractor atau supplier
- tipe proposal
- offered price
- duration
- submitted date
- technical fit
- relevant experience
- status proposal

CTA utama:

- `Submit Proposal` ke `/tender/[id]/apply`
- `Review Internally` ke `/tender/internal`

Catatan current state:

- detail tender sudah cukup kuat untuk demo karena memuat scope, requirement, timeline, dan snapshot proposal
- route ini tersedia untuk seluruh tender yang ada di data mock

### /tender/[id]/apply

Fungsi utama:

- simulasi proposal submission dari sisi vendor

Form yang tersedia:

- `Company Name`
- `PIC Name`
- `Offered Price (IDR)`
- `Estimated Duration (Days)`
- `Relevant Experience`
- `Notes`
- visual upload area

Current behaviour:

- form submit hanya mengubah local success state di browser
- tidak ada database write
- tidak ada upload file real
- tidak ada backend submission
- tidak ada auth check

Setelah success, CTA yang muncul:

- `View Vendor Dashboard`
- `Back to Tender Detail`

Catatan penting saat pitching:

- halaman ini harus ditegaskan sebagai proposal submission simulation
- data tidak benar-benar disimpan
- visual upload area hanya representasi untuk mendemonstrasikan alur dokumen

### /tender/vendor

Fungsi utama:

- menjadi dashboard vendor
- memperlihatkan kondisi pasca-submission

Current profile yang digunakan:

- vendor name: `PT Prima Infrastruktur Abadi`
- vendor type: `Contractor`
- category: `Infrastructure`
- status: `Verified Demo Vendor`

Current metrics:

- submitted proposals: 1
- under review: 0
- shortlisted: 1
- open opportunities: 2

Isi halaman:

- vendor profile summary
- metric cards
- `My Proposal Status`
- `Suggested Open Tenders`
- CTA `Browse All Tenders`

Catatan current state:

- halaman ini bukan full tender list
- fungsinya adalah post-submission view
- proposal yang tampil di dashboard diambil dari proposal mock milik vendor demo utama

### /tender/internal

Fungsi utama:

- menjadi internal review list atau review queue
- membantu internal memilih tender mana yang akan direview lebih lanjut

Current metrics:

- tender packages: 2
- total submissions: 4
- need review: 3
- shortlisted: 1

Konten utama:

- hero `Internal Procurement Review`
- `Tender & Proposal Status Guide`
- `Tender Review Queue`

Current state review queue:

- hanya menampilkan 2 tender utama untuk internal review detail:
  - `TND-WIP-001` Pembangunan Jalan Utama Kawasan Industri Zona A
  - `TND-WIP-002` Pekerjaan Drainase Utama Zona A

Catatan penting:

- walaupun ada tender lain yang berstatus `under_review` di katalog, current internal review queue memang dibatasi ke 2 tender di atas
- ini adalah kondisi implementasi saat ini, bukan bug dokumentasi

CTA utama:

- `Review Tender` ke `/tender/internal/[id]`

### /tender/internal/[id]

Route ini sudah ada dan aktif.

Fungsi utama:

- menjadi halaman review detail untuk satu tender internal
- menampilkan proposal yang masuk, comparison, dan konteks contractor history

Konten utama:

- header tender dengan code, title, description, status, estimated value, deadline, submission count
- `Submitted Contractors`
- `Proposal Comparison`
- `Decision Support Insight`
- `Contractor History Preview`
- `Proposal Detail Drawer`

Kemampuan yang tersedia:

- melihat daftar submitted contractors untuk tender tersebut
- membuka detail proposal melalui drawer
- membandingkan proposal dalam table
- melihat contractor history preview untuk proposal yang dipilih
- membuka halaman contractor detail

Isi proposal detail drawer:

- offered price
- estimated duration
- technical fit
- relevant experience
- submitted documents
- internal notes

Action yang tampil di drawer:

- `Mark as Reviewed`
- `Request Clarification`
- `Shortlist Candidate`
- `View Contractor History`

Catatan current state:

- semua action internal di drawer masih visual-only
- tidak ada perubahan status real
- tidak ada approval workflow real
- halaman ini berfungsi sebagai decision support surface, bukan mesin penentu pemenang

### /contractors

Fungsi utama:

- menjadi registri histori external partner untuk kebutuhan evaluasi tender

Data yang tampil saat ini:

- 8 record external partner
- mencakup tipe `contractor` dan `supplier`
- belum ada data `consultant` pada current mock

Informasi di list:

- nama partner
- type
- category
- status
- summary
- completed projects
- average score

Value bisnis untuk internal review:

- memberi konteks performa partner
- membantu shortlist discussion
- memperlihatkan histori jangka panjang yang relevan untuk kawasan industri

Catatan current state:

- label menu tetap `Contractors`
- tetapi isinya diposisikan sebagai broader external contractor records

### /contractors/[id]

Fungsi utama:

- menampilkan detail histori dan profil satu contractor atau partner

Data yang ditampilkan:

- external party type
- category
- specialization
- last award
- completed projects
- average score
- on-time record
- status
- strengths
- project history

CTA yang tersedia:

- `Back to Internal Review`
- `Back to Contractors`

Value saat demo:

- memperlihatkan kenapa histori partner penting untuk evaluasi tender
- memberi bukti bahwa keputusan procurement dapat didukung data performa sebelumnya

### /tracking

Fungsi utama:

- menjadi operational tracking demo yang terpisah dari tender

Fitur yang tersedia:

- barcode search manual
- daftar sample tracking items
- CTA ke tracking detail

Current sample items:

- `BC-STEEL-001` Structural steel batch A
- `BC-PUMP-014` Pump skid line 1
- `BC-GEO-221` Geotextile roll package

Value yang bisa dijelaskan:

- monitoring material atau item
- checkpoint logistik
- event log sederhana

Catatan current state:

- tidak otomatis terhubung dengan tender award
- tetap diposisikan sebagai modul opsional

### Company Profile / Public Landing

Route relevan:

- `/`
- `/development`
- `/portfolio`

Fungsi utamanya:

- membangun konteks perusahaan dan kawasan sebelum masuk ke portal
- menunjukkan bahwa MVP ini menggabungkan public trust layer dan procurement flow

Current landing page menekankan:

- company profile
- tender management
- contractor and supplier history
- barcode tracking

Route ini relevan untuk pembuka pitching, tetapi bukan bagian inti dari execution flow tender.

## 7. Data Dummy dan Mock Domain

### Tender Dummy

Current mock tender yang dipakai di aplikasi:

| Code | Title | Status | Estimated Value | Deadline | Proposal Count |
| --- | --- | --- | --- | --- | --- |
| TND-WIP-001 | Pembangunan Jalan Utama Kawasan Industri Zona A | Under Review | IDR 148.000.000.000 | 24 Juni 2026 | 2 |
| TND-WIP-002 | Pekerjaan Drainase Utama Zona A | Open | IDR 64.000.000.000 | 2 Juli 2026 | 2 |
| TND-WIP-003 | Pengadaan Pipa HDPE untuk Jaringan Air Bersih | Open | IDR 21.500.000.000 | 28 Juni 2026 | 2 |
| TND-WIP-004 | Pembangunan Kantor Pengelola Kawasan | Draft | IDR 38.500.000.000 | 18 Juli 2026 | 0 |
| TND-WIP-005 | Instalasi Jaringan Listrik Zona B | Under Review | IDR 57.200.000.000 | 26 Mei 2026 | 3 |

Catatan penting:

- seluruh tender di atas tersedia di katalog dan detail page
- internal review queue saat ini hanya memakai `TND-WIP-001` dan `TND-WIP-002`

### Proposal Dummy

Proposal utama yang terlihat pada internal review dan/atau detail tender:

| Contractor / Vendor | Tender | Offered Price | Duration | Status | Relevant Experience | Technical Fit |
| --- | --- | --- | --- | --- | --- | --- |
| PT Prima Infrastruktur Abadi | TND-WIP-001 | IDR 142.500.000.000 | 210 hari | Shortlisted | industrial access road dan logistics yard corridor | strong heavy-duty pavement capability |
| PT Indra Konstruksi Mandiri | TND-WIP-001 | IDR 145.200.000.000 | 198 hari | Under Review | estate road dan drainage tie-in | fast execution plan, solid coordination |
| PT Karya Beton Nusantara | TND-WIP-002 | IDR 62.000.000.000 | 135 hari | Under Review | concrete drainage dan rigid pavement support | drainage structure capability |
| PT Tirta Drainase Mandiri | TND-WIP-002 | IDR 63.500.000.000 | 150 hari | Submitted | open channel drainage dan utility crossing | relevant specialization, capacity review needed |
| CV Sumber Jaya Teknik | TND-WIP-003 | IDR 21.250.000.000 | 32 hari | Submitted | utility materials distribution | flexible logistics, phased delivery readiness |
| PT Utility Supply Nusantara | TND-WIP-003 | IDR 21.410.000.000 | 30 hari | Submitted | HDPE pipe systems and fittings | strong documentation quality |
| PT Energi Mandiri Sistem | TND-WIP-005 | IDR 56.300.000.000 | 126 hari | Shortlisted | industrial power distribution | strong commissioning readiness |
| PT Cahaya Utilitas Indonesia | TND-WIP-005 | IDR 55.650.000.000 | 134 hari | Under Review | medium-voltage installation | solid execution plan, staffing clarification needed |
| CV Sumber Jaya Teknik | TND-WIP-005 | IDR 54.800.000.000 | 149 hari | Submitted | general utility support | commercially attractive, specialist depth limited |

Data proposal yang saat ini juga tersedia per entry:

- submitted date
- internal notes
- recommendation
- submitted documents
- optional score

Contoh dokumen yang muncul di mock proposal:

- Company Profile
- Technical Proposal
- Price Proposal
- Project Experience
- Safety Statement
- Equipment List
- Product Catalog
- Delivery Schedule
- Commissioning Method

### Contractor Dummy

Current mock external partner yang tersedia di `/contractors`:

| Nama | Type | Category | Average Score | Completed Projects | Status |
| --- | --- | --- | --- | --- | --- |
| PT Prima Infrastruktur Abadi | Contractor | Infrastructure | 91 | 12 | Preferred shortlist |
| PT Karya Beton Nusantara | Contractor | Concrete Works | 85 | 9 | Under review |
| PT Indra Konstruksi Mandiri | Contractor | Integrated Civil Works | 89 | 10 | Active partner |
| PT Tirta Drainase Mandiri | Contractor | Drainage Works | 82 | 7 | Active bidder |
| PT Energi Mandiri Sistem | Contractor | Electrical Infrastructure | 92 | 11 | Preferred shortlist |
| PT Cahaya Utilitas Indonesia | Contractor | Utility Installation | 84 | 8 | Under review |
| CV Sumber Jaya Teknik | Supplier | Utility Supply | 78 | 6 | Active bidder |
| PT Utility Supply Nusantara | Supplier | Pipe and Fittings Supply | 88 | 8 | Approved supplier |

Informasi yang tersedia per contractor:

- specialization
- on-time record
- summary
- strengths
- project history
- last award

Belum ada current mock untuk tipe `consultant`.

## 8. Status dan Alur Tender

### Tender Status

`Draft`  
Tender masih dalam tahap persiapan internal dan belum dibuka untuk partisipasi vendor.

`Open`  
Tender sudah tersedia untuk dibrowse dan secara naratif dapat diikuti oleh vendor.

`Under Review`  
Proposal sudah masuk dan tim internal sedang melakukan evaluasi.

`Shortlisting`  
Tender masuk ke tahap penyaringan kandidat terbaik sebelum keputusan akhir.

`Awarded`  
Tender telah ditetapkan pemenangnya.

`Closed`  
Tender sudah selesai dan tidak lagi aktif.

Alur ideal tender:

`Draft -> Open -> Under Review -> Shortlisting -> Awarded / Closed`

### Proposal Status

`Submitted`  
Proposal telah masuk tetapi belum diproses lebih jauh.

`Under Review`  
Proposal sedang dianalisis oleh tim internal.

`Clarification`  
Tim internal membutuhkan klarifikasi tambahan dari vendor.

`Shortlisted`  
Proposal masuk kandidat teratas untuk evaluasi lanjutan.

`Awarded`  
Proposal terpilih sebagai pemenang.

`Not Selected`  
Proposal tidak terpilih.

Alur ideal proposal:

`Submitted -> Under Review -> Clarification -> Shortlisted -> Awarded / Not Selected`

Catatan current state:

- semua label status di atas sudah didefinisikan di domain tender
- tidak semua status saat ini sudah dipakai oleh mock data
- current mock paling banyak memakai `Draft`, `Open`, `Under Review`, `Submitted`, dan `Shortlisted`

## 9. Internal Procurement Review Flow

Current implementation sudah memakai route terpisah:

`/tender/internal` -> pilih tender -> `/tender/internal/[id]`

Flow yang terjadi saat ini:

1. Internal membuka `/tender/internal`.
2. Internal melihat metrik review queue dan status guide.
3. Internal memilih salah satu tender dengan CTA `Review Tender`.
4. Sistem membuka `/tender/internal/[id]`.
5. Internal melihat submitted contractors pada tender tersebut.
6. Internal membuka detail proposal melalui tombol `View Proposal`.
7. Proposal detail muncul di drawer, tanpa keluar dari halaman review.
8. Internal melihat comparison table untuk membandingkan harga, durasi, pengalaman, technical fit, dan status.
9. Internal melihat contractor history preview untuk proposal yang sedang dipilih.
10. Jika perlu, internal membuka halaman contractor detail.

Bagaimana internal melihat tender yang perlu direview:

- melalui `Tender Review Queue` di `/tender/internal`
- saat ini queue dibatasi ke 2 tender demo utama

Bagaimana internal melihat contractor yang mengajukan:

- melalui section `Submitted Contractors`
- setiap entry menunjukkan nama, harga, durasi, tanggal submit, dan status proposal

Bagaimana internal melihat detail proposal:

- melalui `View Proposal`
- detail muncul di drawer

Bagaimana internal membandingkan proposal:

- melalui `Proposal Comparison`
- table membandingkan contractor, offered price, duration, relevant experience, technical fit, dan status

Bagaimana decision support digunakan:

- sistem memberi konteks comparison dan contractor history
- sistem tidak menggantikan keputusan manusia
- final decision tetap diposisikan sebagai keputusan tim procurement PT WIP

## 10. Vendor Flow

Vendor flow yang saat ini sudah tervisualisasi:

`/tender` -> `/tender/[id]` -> `/tender/[id]/apply` -> `/tender/vendor`

Penjelasan flow:

- vendor mencari tender di katalog
- vendor membaca detail tender untuk memahami scope, requirement, dan deadline
- vendor mengisi proposal submission simulation
- vendor melihat status proposal di dashboard vendor

Hal penting yang perlu dijelaskan saat demo:

- vendor tidak apply dari list view, tetapi dari detail tender
- dashboard vendor diposisikan sebagai post-submission monitoring
- current vendor dashboard memakai satu vendor demo utama

## 11. Hal yang Visual-only / Simulasi

Fitur berikut saat ini masih visual-only atau local simulation:

- submit proposal
- visual upload document
- local success state setelah submit
- mark as reviewed
- request clarification
- shortlist candidate
- proposal status update dari action internal
- internal action di proposal drawer
- approval workflow
- audit trail
- tracking scan real

Semua ini memang disengaja karena MVP dibuat untuk pitching dan validasi alur, bukan untuk menjalankan transaksi procurement real.

## 12. Future Enhancement

Pengembangan berikutnya yang paling relevan setelah validasi client:

- real login dan role permission
- database untuk tender, proposal, contractor, dan supplier
- real document upload dan storage
- proposal persistence
- internal approval workflow
- weighted scoring matrix
- audit trail
- notification email atau WhatsApp
- contractor performance analytics
- supplier dan vendor consolidation
- tracking integration ke tender atau procurement bila dibutuhkan
- export reports
- admin configuration

## 13. Demo Script

### Opening 30 detik

"MVP ini dibuat untuk membantu PT WIP mempresentasikan gambaran alur tender dan procurement kawasan industri secara lebih jelas. Jadi yang ingin kami tampilkan bukan sistem final, tetapi bagaimana katalog tender, detail paket, simulasi pengajuan proposal, review internal, dan histori contractor bisa divisualisasikan dalam satu pengalaman yang mudah dipahami stakeholder."

### Walkthrough 3-5 menit

1. Buka `/dashboard`.
   Narasi: "Ini adalah command center demo. Dari sini kita bisa melihat scope MVP, metrik utama, dan alur demo yang disarankan."

2. Buka `/tender`.
   Narasi: "Di sini semua paket tender dikumpulkan dalam satu katalog. User bisa mencari berdasarkan paket, zona, status, dan nilai tender."

3. Buka salah satu `/tender/[id]`, idealnya `TND-WIP-001`.
   Narasi: "Sebelum mengajukan proposal, vendor atau tim internal perlu memahami scope pekerjaan, requirement, dokumen yang dibutuhkan, dan timeline tender."

4. Lanjut ke `/tender/[id]/apply`.
   Narasi: "Halaman ini mensimulasikan proses submit proposal dari sisi vendor. Untuk MVP, submit ini masih local-only dan belum tersimpan ke backend."

5. Setelah success, buka `/tender/vendor`.
   Narasi: "Setelah submit, vendor bisa melihat ringkasan proposal yang sudah dikirim dan statusnya, sekaligus shortcut ke tender terbuka lainnya."

6. Buka `/tender/internal`.
   Narasi: "Sekarang kita pindah ke perspektif internal PT WIP. Halaman ini menampilkan review queue dan membantu memilih tender mana yang akan direview lebih dalam."

7. Buka `/tender/internal/[id]`.
   Narasi: "Di sini internal bisa melihat proposal yang masuk, membandingkan kandidat, membuka detail proposal, dan melihat konteks histori contractor. Ini berfungsi sebagai decision support, bukan keputusan otomatis."

8. Buka `/contractors/[id]`.
   Narasi: "Halaman ini menunjukkan bahwa histori partner dapat dipakai untuk mendukung evaluasi tender jangka panjang, terutama untuk proyek kawasan industri yang terus berkembang."

9. Jika diperlukan, tutup dengan `/tracking`.
   Narasi: "Sebagai tambahan, kami juga menyiapkan demo tracking operasional untuk material atau item. Modul ini masih terpisah dari flow tender inti, tetapi menunjukkan arah integrasi di masa depan."

### Closing 30 detik

"Jadi, current MVP ini sudah cukup untuk memvalidasi alur tender PT WIP di depan client: mulai dari katalog tender, detail paket, simulasi submit proposal, review internal, sampai histori contractor dan opsional tracking. Setelah SOP dan kebutuhan operasional PT WIP dikonfirmasi, MVP ini bisa dikembangkan menjadi sistem yang lebih lengkap dengan login, database, workflow approval, dan integrasi dokumen real."

## 14. Manual Test Checklist

### /dashboard

- halaman terbuka tanpa error
- metrik tampil
- CTA ke `/tender`, `/tender/internal`, dan `/contractors` berfungsi
- section `Recommended Demo Flow` dan `Tender Pulse` tampil

### /tender

- statistik katalog tampil
- search, filter, dan sort dapat digunakan
- tender cards muncul
- CTA `View Detail` membuka route detail yang benar
- shortcut ke `/tender/vendor` dan `/tender/internal` tampil

### /tender/[id]

- detail tender tampil lengkap
- scope, requirements, required documents, milestones tampil
- proposal overview tampil jika ada
- CTA `Submit Proposal` dan `Review Internally` berfungsi

### /tender/[id]/apply

- tender summary tampil
- form dapat diisi
- tombol `Submit Proposal Simulation` memunculkan success state
- CTA `View Vendor Dashboard` dan `Back to Tender Detail` tampil setelah success
- tidak ada dependency ke backend

### /tender/vendor

- vendor profile summary tampil
- metric cards tampil
- proposal list vendor tampil
- suggested open tenders tampil
- CTA `Browse All Tenders` berfungsi

### /tender/internal

- hero internal review tampil
- metric cards tampil
- status guide tender dan proposal tampil
- review queue tampil
- CTA `Review Tender` membuka route detail internal yang benar

### /tender/internal/[id]

- halaman review detail terbuka untuk tender yang didukung
- submitted contractors tampil
- comparison table tampil
- `View Proposal` membuka drawer
- contractor history preview berubah mengikuti proposal terpilih
- action di drawer tampil tanpa menyebabkan error

### /contractors

- seluruh external partner cards tampil
- type, category, status, score, dan completed projects tampil
- CTA `View Contractor History` berfungsi

### /contractors/[id]

- profile summary tampil
- strengths tampil
- project history tampil
- CTA kembali ke internal review dan contractors berfungsi

### /tracking

- barcode search tampil
- sample tracking items tampil
- CTA ke `/tracking/[barcode]` berfungsi

### /tracking/[barcode]

- tracking snapshot tampil
- status item tampil
- event log atau timeline tampil
- barcode invalid masuk ke not found

## 15. Ringkasan Akhir

Secara current state, yang sudah siap untuk pitching adalah:

- public company profile sebagai pembuka konteks
- dashboard command center
- tender catalog dengan filter dan sort
- tender detail yang cukup lengkap
- proposal apply page sebagai simulasi vendor flow
- vendor dashboard
- internal procurement review list dan detail
- contractor history
- operational tracking demo terpisah

Yang masih simulasi:

- proposal submission persistence
- upload dokumen real
- status update real dari internal action
- approval workflow
- authentication
- database
- audit trail
- integrasi tracking ke tender

Langkah berikutnya setelah client memberikan feedback adalah mengonfirmasi SOP procurement PT WIP, role pengguna yang dibutuhkan, dokumen wajib, approval chain, scoring model, dan kebutuhan integrasi. Setelah itu, MVP ini bisa diturunkan menjadi scope build yang lebih konkret untuk fase implementasi berikutnya.

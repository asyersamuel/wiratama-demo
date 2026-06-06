# Tender MVP Demo Guide

## Tujuan Demo

Demo ini dipakai untuk pitching PT WIP agar stakeholder dapat melihat alur tender kawasan industri secara ringkas, profesional, dan mudah dipahami tanpa harus menunggu backend, database, atau workflow approval final.

Yang perlu ditekankan saat presentasi:

- ini adalah MVP lokal
- tidak ada auth real
- tidak ada database
- tidak ada upload dokumen real
- semua aksi status bersifat local-only

## Role Mode

### Vendor

Menu yang tampil:

- `Daftar Tender`
- `Portal Vendor`

### Internal PT WIP

Menu yang tampil:

- `Dashboard`
- `Review Tender`
- `Kontraktor`
- `Tracking`

## Flow Demo yang Disarankan

### 1. Mode Vendor -> `/tender`

Yang ditunjukkan:

- daftar paket tender
- status tender
- deadline
- nilai estimasi

Yang disampaikan:

- vendor mulai dari melihat daftar tender, bukan langsung masuk ke form.

### 2. Buka `/tender/[id]`

Yang ditunjukkan:

- ringkasan tender
- scope pekerjaan
- persyaratan
- dokumen yang dibutuhkan
- timeline tender

Yang disampaikan:

- vendor membaca detail paket terlebih dahulu sebelum mengajukan proposal.

### 3. Buka `/tender/[id]/apply`

Yang ditunjukkan:

- profil vendor terprefill
- field proposal realistis
- checklist dokumen visual-only

Yang disampaikan:

- submit proposal pada MVP ini tersimpan sebagai demo state lokal di browser.

### 4. Submit lalu buka `/tender/vendor`

Yang ditunjukkan:

- profil vendor
- status verifikasi
- daftar pengajuan saya
- status proposal yang baru saja dikirim

Yang disampaikan:

- setelah submit, vendor dapat memantau status proposal dari portal vendor.

### 5. Switch ke Mode Internal PT WIP -> `/dashboard`

Yang ditunjukkan:

- ringkasan tender aktif
- proposal masuk
- proposal perlu review
- shortlist

Yang disampaikan:

- dashboard ini khusus ringkasan internal, bukan halaman menu.

### 6. Buka `/tender/internal`

Yang ditunjukkan:

- tender yang memiliki proposal
- jumlah proposal masuk
- jumlah proposal perlu review

Yang disampaikan:

- tim internal memilih tender yang akan direview lebih lanjut dari sini.

### 7. Buka `/tender/internal/[id]`

Yang ditunjukkan:

- daftar proposal vendor
- comparison table ringkas
- CTA `Lihat Proposal`

Yang disampaikan:

- halaman ini fokus pada review satu tender saja, sehingga tidak padat.

### 8. Buka proposal drawer

Yang ditunjukkan:

- snapshot profil vendor
- NIB
- NPWP
- status verifikasi
- harga penawaran
- durasi
- tanggal mulai
- metode kerja
- pengalaman relevan
- peralatan
- tenaga kerja
- dokumen pengajuan
- catatan vendor
- catatan internal

Lalu lakukan update status:

- `Tandai Under Review`
- `Minta Klarifikasi`
- `Masukkan Shortlist`
- `Pilih sebagai Awarded`
- `Tandai Tidak Dipilih`

Yang disampaikan:

- perubahan status ini local-only, tetapi cukup untuk menunjukkan alur end-to-end saat pitching.

### 9. Buka `/contractors/[id]` bila diperlukan

Yang ditunjukkan:

- legalitas vendor
- kontak PIC
- bidang usaha
- dokumen legal
- pengalaman proyek
- histori pekerjaan

Yang disampaikan:

- profil vendor dipakai sebagai konteks evaluasi tender, bukan sekadar katalog partner.

### 10. Optional `/tracking`

Yang ditunjukkan:

- tracking operasional kawasan

Yang disampaikan:

- modul ini terpisah dari alur tender utama dan tidak diubah oleh refactor tender.

## Skenario Utama yang Perlu Diuji

1. Masuk `Mode Vendor`
2. Buka `Pembangunan Jalan Utama Kawasan Industri Zona A`
3. Ajukan proposal sebagai `PT Prima Infrastruktur Abadi`
4. Buka `Portal Vendor`
5. Pastikan proposal muncul dengan status `Submitted`
6. Switch ke `Mode Internal PT WIP`
7. Buka `Review Tender`
8. Masuk ke tender yang sama
9. Buka proposal `PT Prima Infrastruktur Abadi`
10. Ubah status proposal
11. Kembali ke `Portal Vendor`
12. Pastikan status proposal berubah sesuai aksi internal

## Reset Demo

Gunakan tombol `Reset Demo` di navbar bila ingin mengembalikan data ke kondisi awal.

Kapan dipakai:

- sebelum presentasi dimulai
- setelah mencoba beberapa skenario status
- saat ingin mengulang flow vendor dari awal

## Batasan yang Perlu Disampaikan

- tidak ada persistence server
- tidak ada multi-user synchronization
- tidak ada approval workflow real
- tidak ada upload file real
- tidak ada API production

## Penutup Pitch

Kalimat penutup yang aman:

"MVP ini menunjukkan bagaimana alur tender PT WIP bisa dipresentasikan secara end-to-end, mulai dari vendor melihat tender, mengajukan proposal, hingga tim internal melakukan review dan mengubah status proposal secara visual. Setelah kebutuhan bisnis final dikonfirmasi, fondasi ini bisa diteruskan ke tahap implementasi sistem yang lebih lengkap."

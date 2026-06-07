# Public Company Profile Design Rules

## Tujuan

Dokumen ini menjadi acuan desain untuk rebuild public company profile Next.js App Router berdasarkan struktur UI dari HTML target.

Fokusnya adalah:

- membangun ulang struktur visual dan urutan section semirip mungkin
- menjaga seluruh konten tetap generic, dummy, dan aman
- memastikan tidak ada identitas asli, data spesifik, atau asset asli yang ikut terbawa

## Prinsip Utama

- HTML target dipakai sebagai referensi struktur UI, bukan sebagai sumber identitas.
- Layout, hierarchy, section order, dan interaction pattern harus mengikuti HTML target sedekat mungkin.
- Seluruh copy, angka, nama, testimonial, berita, metadata, kontak, dan asset harus diganti total.
- Semua route public harus terasa developed, bukan placeholder kosong.
- Area portal dan tender tidak boleh terpengaruh.

## Struktur Homepage Yang Harus Diikuti

Homepage public harus mengikuti urutan ini:

1. Fixed navbar
2. Products mega menu
3. Large hero
4. Stats band
5. About section
6. Product visual cards / flip cards
7. Awards / recognition
8. Testimonials
9. Masterplan / development media section
10. Highlight / welcome video-style section
11. News grid
12. Final CTA
13. Footer

## Rule Rebuild UI

- Rebuild HTML target menjadi komponen Next.js modular.
- Pertahankan ritme spacing, hierarchy, grid behavior, dan visual emphasis.
- Pertahankan pola desktop/mobile navbar dan mega menu.
- Hero harus besar, immersive, dan memiliki overlay.
- Stats band harus muncul sebagai blok terpisah yang menempel ke hero.
- Products harus tampil sebagai visual cards dengan hover/flip feel.
- Awards dan testimonials boleh diganti menjadi responsive grid.
- Video section harus tetap terasa seperti video/highlight section walau memakai placeholder.
- Footer harus multi-column dan informatif seperti struktur target.

## Hard Rule Sanitasi Konten

Jangan ambil atau pakai informasi spesifik dari website asal.

Yang dilarang dipakai:

- nama brand asli
- nama perusahaan asli
- domain asli
- logo asli
- favicon asli
- asset URL asli
- nama file asset asli
- metadata asli
- deskripsi asli
- judul asli
- testimonial asli
- nama orang asli
- nama pejabat asli
- nama jabatan asli
- nama lokasi spesifik asli
- statistik asli
- angka asli
- award asli
- judul berita asli
- isi berita asli
- alamat asli
- email asli
- nomor telepon asli
- link video asli
- link virtual tour asli
- flag icon asli
- script tracking asli
- komentar kode yang menyebut brand asli

## Rule Copywriting

Seluruh copy public harus generic, aman, dan non-spesifik.

Gunakan:

- dummy company name
- generic industrial estate copy
- generic investment and infrastructure language
- dummy statistics
- dummy testimonials
- dummy news
- dummy compliance statements
- placeholder contact data
- lorem ipsum bila perlu untuk filler text

Jangan:

- menyalin kalimat asli dari HTML target
- menyalin narasi perusahaan asli
- menyalin klaim spesifik yang terhubung ke entitas nyata

## Rule Asset

Gunakan asset publik atau placeholder saja.

Sumber asset yang diperbolehkan:

- `https://placehold.co/...`
- gambar publik generik dari sumber aman seperti Unsplash
- CSS gradient
- abstract pattern
- placeholder block
- generated decorative shapes

Sumber asset yang dilarang:

- URL image dari HTML target
- logo target
- screenshot target
- icon flag target
- thumbnail video target
- embed video target
- asset CDN target

## Rule Interaksi

- Mobile menu wajib pakai React state.
- Products mega menu wajib pakai React state.
- Hover/flip product cards boleh pakai CSS.
- Jangan pakai Swiper, Bootstrap JS, jQuery, Isotope, atau script eksternal dari target.
- Slider boleh diganti grid responsif atau simple static rotation.
- Video interaction cukup placeholder play button, tidak perlu embed asli.

## Rule Metadata

Semua metadata public harus baru dan generic.

Wajib diganti:

- page title
- meta description
- Open Graph title
- Open Graph description
- social preview copy

Metadata tidak boleh menyebut:

- brand asli
- domain asli
- lokasi asli
- event asli

## Rule Halaman Turunan

Semua halaman turunan navbar wajib developed:

- `/about`
- `/why-us`
- `/products`
- `/development`
- `/portfolio`
- `/resources`
- `/compliance`
- `/news`
- `/contact`

Setiap halaman harus:

- punya hero sendiri
- punya section yang cukup untuk terasa lengkap
- konsisten secara visual dengan homepage
- menggunakan data dummy dari `features/company-profile/data/**`

## Rule Implementasi Data

- Jangan hardcode copy panjang langsung di JSX bila bisa dipindah ke data file.
- Semua konten public harus disimpan di `features/company-profile/data/**`.
- Komponen presentasional harus reusable.
- Shared component yang berpotensi dipakai portal sebaiknya tidak diubah agresif.
- Bila ragu, buat komponen baru di `components/company-profile/**`.

## Rule Validasi

Sebelum menyelesaikan pekerjaan, lakukan validasi berikut:

- pastikan semua route public bisa dibuka
- pastikan semua navbar link internal dan aktif
- pastikan tidak ada `href` kosong
- pastikan tidak ada domain target
- pastikan tidak ada asset target
- pastikan tidak ada script tracking
- pastikan tidak ada nama brand asli
- pastikan tidak ada informasi spesifik asli
- pastikan konten dummy/lorem ipsum tetap konsisten dan aman

## Checklist Sanitasi Cepat

Gunakan checklist ini saat review:

- apakah ada nama asli yang lolos?
- apakah ada angka/stat asli yang lolos?
- apakah ada image URL asli yang lolos?
- apakah ada metadata asli yang lolos?
- apakah ada copy yang terlalu mirip dengan website asal?
- apakah ada embed/script eksternal?
- apakah semua asset benar-benar publik atau placeholder?
- apakah lorem ipsum dipakai hanya sebagai filler aman, bukan hasil copy dari target?

## Kesimpulan

Target HTML harus diperlakukan sebagai blueprint struktur UI.

Bukan sebagai sumber:

- identitas
- data
- copy
- asset
- metadata
- script

Semua hasil akhir harus tampil mirip dari sisi pola desain, tetapi sepenuhnya aman, generic, dan bebas dari informasi spesifik website asal.

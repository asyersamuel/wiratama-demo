# Company Profile Public Website Design Specification

## 1. Tujuan Dokumen

Dokumen ini adalah acuan desain untuk membangun ulang halaman company profile public di project Next.js App Router.

HTML target yang dilampirkan diperlakukan sebagai **target struktur UI**, bukan sekadar inspirasi. Artinya implementasi harus mengikuti pola layout, urutan section, hierarchy visual, card pattern, navbar, mega menu, footer, dan responsivitas dari HTML tersebut semirip mungkin.

Namun semua konten yang dapat mengidentifikasi website target harus diganti dengan dummy/generic content.

## 2. Prinsip Utama

1. Rebuild struktur UI dari HTML target ke Next.js.
2. Pertahankan urutan section homepage.
3. Pertahankan pola visual utama: fixed navbar, large hero, stats band, product cards, recognition cards, testimonial cards, video placeholders, news cards, dan footer.
4. Ganti seluruh brand, logo, gambar, statistik, testimonial, berita, metadata, link eksternal, alamat, email, nomor telepon, dan script asli.
5. Buat implementasi modular dan data-driven.
6. Jangan mengubah area portal/tender.
7. Halaman turunan navbar harus dikembangkan, bukan placeholder kosong.
8. Semua menu dan CTA harus menggunakan route internal Next.js.

## 3. Batasan Implementasi

### 3.1 Area yang Tidak Boleh Diubah

Jangan sentuh:

```txt
app/(portal)/**
features/tender/**
features/tender/components/**
features/tender/data/**
features/tender/demo-store.ts
features/tender/service.ts
features/tender/types.ts
features/contractor/**
features/supplier/**
features/tracking/**
components/shared/portal-page-intro.tsx
components/shared/portal-shell.tsx
components/shared/portal-top-nav.tsx
components/shared/barcode-search.tsx
components/shared/demo-note.tsx
lib/status.ts
lib/mock-api.ts
```

### 3.2 Area yang Boleh Dibuat atau Diubah

```txt
app/(public)/**
app/globals.css
components/company-profile/**
features/company-profile/**
features/company-profile/data/**
components/shared/page-hero.tsx
components/shared/site-header.tsx
components/shared/site-footer.tsx
```

Catatan: ubah komponen shared hanya jika benar-benar public-only. Jika ragu, buat komponen baru di `components/company-profile/**`.

## 4. Sanitasi Konten

HTML target mengandung brand, asset, metadata, testimonial, news, alamat, link, dan script asli. Semua itu wajib diganti.

### 4.1 Dilarang Digunakan

Jangan gunakan:

- nama brand asli
- nama company asli
- domain asli
- logo asli
- URL asset asli
- nama file asset asli
- title/meta description asli
- testimonial asli
- nama orang asli
- nama jabatan asli
- nama pejabat asli
- nama lokasi spesifik asli
- award asli
- judul berita asli
- isi berita asli
- statistik asli
- angka asli
- alamat asli
- email asli
- nomor telepon asli
- link video asli
- link virtual tour asli
- flag icon asli
- script tracking asli
- komentar kode yang menyebut identitas website target

### 4.2 Pengganti yang Diizinkan

Gunakan:

- dummy company name
- generic industrial estate copy
- generic business/investment copy
- lorem ipsum
- dummy statistics
- dummy testimonials
- dummy people names
- dummy awards
- dummy news
- dummy contact data
- placeholder logo
- placeholder/generic images
- gradient background

### 4.3 Asset Strategy

Gunakan salah satu:

```txt
https://placehold.co/...
Unsplash generic industrial/urban/warehouse/business/infrastructure images
CSS gradient placeholder
simple decorative div placeholder
```

Jangan gunakan `src`, `href`, `background-image`, `iframe`, favicon, atau thumbnail dari HTML target.

## 5. Script dan Dependency

### 5.1 Jangan Digunakan

HTML target memakai beberapa dependency/script untuk tracking, slider, lightbox, layout filtering, dan menu behavior. Jangan copy script tersebut.

Jangan gunakan:

- tracking script
- ads/conversion script
- analytics script
- Bootstrap JS
- jQuery
- Isotope
- Swiper script dari HTML target
- lightbox script
- inline script dari HTML target

### 5.2 Pengganti

Gunakan:

- React state untuk mobile navbar dan mega menu
- CSS hover untuk product flip/reveal card
- CSS transition untuk animation
- responsive CSS grid untuk awards/testimonials/news
- fake video placeholder untuk video sections

## 6. Design Language

### 6.1 Karakter Visual

Target visual:

- corporate landing page
- clean, polished, demo-ready
- large fixed navbar
- large image/visual hero
- strong section spacing
- dark overlay di atas image
- accent divider line
- stat band/card strip
- image-heavy product cards
- responsive card grids
- multi-column footer

### 6.2 Typography

HTML target memakai kombinasi sans-serif modern. Untuk implementasi:

- Heading: gunakan font sans-serif modern dengan weight 600-800.
- Body: gunakan sans-serif dengan weight 400-500.
- CTA/menu: uppercase optional atau title case, weight 600.
- Stats number: besar, bold, compact.
- Card title: medium-large, bold.
- Body paragraph: line-height lega.

Rekomendasi token:

```css
--font-heading: var(--font-sans);
--font-body: var(--font-sans);
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-4xl: clamp(2rem, 5vw, 4.5rem);
```

### 6.3 Color System

Gunakan nuansa corporate industrial yang mendekati pola target, tetapi tidak perlu menyalin identitas brand.

Rekomendasi:

```css
--cp-bg: #ffffff;
--cp-bg-muted: #f5f6f2;
--cp-surface: #ffffff;
--cp-surface-dark: #111827;
--cp-text: #17202a;
--cp-text-muted: #667085;
--cp-border: rgba(17, 24, 39, 0.12);
--cp-accent: #f4c542;
--cp-accent-dark: #b88900;
--cp-overlay: rgba(0, 0, 0, 0.48);
```

### 6.4 Spacing

```css
--cp-container: 1200px;
--cp-section-y: clamp(4rem, 8vw, 7rem);
--cp-section-y-sm: clamp(3rem, 6vw, 5rem);
--cp-radius-sm: 0.75rem;
--cp-radius-md: 1.25rem;
--cp-radius-lg: 2rem;
```

### 6.5 Responsive Breakpoints

```txt
Mobile: < 768px
Tablet: 768px - 1023px
Desktop: >= 1024px
Large desktop: >= 1280px
```

## 7. Homepage Structure

Homepage `/` harus mengikuti urutan section berikut.

---

## 7.1 Header / Public Navbar

### Target Struktur

- fixed top navbar
- logo area kiri
- menu utama di tengah
- utility/CTA area kanan
- mobile hamburger
- active nav state
- products mega menu
- desktop hover/focus
- mobile tap/click

### Navigation Mapping

| Label | Route | Catatan |
|---|---:|---|
| Home | `/` | landing utama |
| About | `/about` | halaman company overview |
| Why Us | `/why-us` | value proposition |
| Products | `/products` | parent page |
| Development | `/development` | development/masterplan |
| Portfolio | `/portfolio` | project/partner showcase |
| Resources | `/resources` | resource center |
| Compliance | `/compliance` | trust/compliance |
| News | `/news` | news listing dummy |
| Contact | `/contact` | contact page |

### Products Mega Menu

| Label | Route |
|---|---|
| Industrial Land | `/products#industrial-land` |
| Factory Building | `/products#factory-building` |
| Commercial Area | `/products#commercial-area` |
| Warehouse | `/products#warehouse` |
| Residential | `/products#residential` |

### Behavior

Desktop:

- menu utama horizontal
- products mega menu muncul saat hover/focus
- mega menu full-width atau wide panel
- product item berupa visual card kecil

Mobile:

- hamburger membuka drawer/menu vertical
- products membuka nested list saat tap
- klik link menutup mobile menu

### Component

```txt
components/company-profile/public-navbar.tsx
components/company-profile/product-mega-menu.tsx
features/company-profile/data/navigation.ts
```

---

## 7.2 Hero Section

### Target Struktur

- full/large viewport section
- background image/slideshow area
- dark overlay
- heading kecil/eyebrow
- heading utama besar
- CTA button
- stats band berada di bawah hero content

### Sanitized Content

Gunakan dummy:

- eyebrow: `Future-Ready Industrial Estate`
- title: `A Strategic Business Destination for Modern Growth`
- CTA: `Explore Why Us`
- secondary CTA optional: `View Portfolio`

### Visual

- gunakan generic infrastructure/industrial background
- jika tidak memakai image, gunakan gradient + subtle pattern
- no real slideshow dependency
- boleh static hero atau simple CSS rotation

### Component

```txt
components/company-profile/hero-section.tsx
features/company-profile/data/overview.ts
```

---

## 7.3 Stats Band

### Target Struktur

- card strip/band di bawah hero
- 5 stat item horizontal di desktop
- stacked/wrapped di mobile

### Dummy Stats

| Metric | Label |
|---|---|
| 4,800+ | Managed Area |
| 120+ | Business Partners |
| 8 | Development Zones |
| 25K+ | Workforce Capacity |
| 30+ | Recognition Milestones |

Angka boleh disesuaikan, tetapi jangan memakai angka asli dari HTML target.

### Component

```txt
components/company-profile/stats-band.tsx
features/company-profile/data/overview.ts
```

---

## 7.4 About Section

### Target Struktur

- large heading
- accent divider
- paragraph
- decorative logo/image group di sisi kanan/bawah

### Sanitized Content

Gunakan generic copy tentang kawasan bisnis, infrastruktur, sustainability, dan long-term growth.

### Visual

- left text block
- right/bottom visual placeholders
- 3 decorative placeholder badges/cards untuk menggantikan logo asli

### Component

```txt
components/company-profile/about-section.tsx
```

---

## 7.5 Products Section

### Target Struktur

- full-width section
- centered section title
- accent divider
- 5 product cards
- image background
- overlay title
- hover/flip reveal description

### Product Items

| ID | Title | Route |
|---|---|---|
| `industrial-land` | Industrial Land | `/products#industrial-land` |
| `factory-building` | Factory Building | `/products#factory-building` |
| `commercial-area` | Commercial Area | `/products#commercial-area` |
| `warehouse` | Warehouse | `/products#warehouse` |
| `residential` | Residential | `/products#residential` |

### Behavior

Desktop:

- hover shows back/reveal content
- card height consistent
- images cover

Mobile:

- no complex 3D requirement
- description can be always visible or revealed through simple overlay

### Component

```txt
components/company-profile/product-grid.tsx
features/company-profile/data/products.ts
```

---

## 7.6 Recognition / Awards Section

### Target Struktur

- heading centered
- accent divider
- card list/carousel-like layout
- image/icon placeholder
- title
- description

### Sanitized Content

Gunakan dummy recognition:

- Regional Infrastructure Recognition
- Sustainable Development Milestone
- Digital Operations Excellence
- Community Impact Program
- Business Growth Recognition

Jangan gunakan nama award asli.

### Implementation

- gunakan grid responsif, bukan Swiper
- optional decorative pagination dots statis jika ingin mirip target

### Component

```txt
components/company-profile/awards-section.tsx
```

---

## 7.7 Testimonials Section

### Target Struktur

- heading centered
- accent divider
- testimonial cards
- quote icon
- quote body
- avatar
- name
- job title

### Sanitized Content

Gunakan dummy people:

- Alex Morgan — Chief Operations Officer
- Maya Hartono — Investment Director
- Daniel Lee — Supply Chain Partner
- Clara Wijaya — Development Consultant

Quotes harus generic dan bukan parafrase testimonial asli.

### Implementation

- grid 2 kolom desktop
- 1 kolom mobile
- tidak pakai carousel script

### Component

```txt
components/company-profile/testimonials-section.tsx
```

---

## 7.8 Masterplan / Development Section

### Target Struktur

- two-column layout
- left content
- accent divider
- right video card with border accent
- iframe di target diganti placeholder

### Sanitized Content

Generic copy tentang master planning, scalable infrastructure, dan phased development.

### Visual

- fake video card
- play button decorative
- no external embed
- optional map/grid placeholder

### Component

```txt
components/company-profile/masterplan-section.tsx
```

---

## 7.9 Highlight Video / Welcome Section

### Target Struktur

- full-bleed background video/image
- dark overlay
- three-column feel:
  - heading
  - play button
  - short paragraph
- mobile stacked

### Sanitized Content

Generic heading:

```txt
Welcome to a Future-Ready Business District
```

### Visual

- background gradient/image placeholder
- large play icon button
- no external video link

### Component

```txt
components/company-profile/highlight-video-section.tsx
```

---

## 7.10 News Section

### Target Struktur

- centered heading
- accent divider
- optional filter area
- 3 news cards
- image
- date
- title
- read more

### Sanitized Content

Dummy news:

- `New Infrastructure Phase Announced for Business District`
- `Sustainability Program Expands Across Development Zones`
- `Partner Ecosystem Forum Highlights Long-Term Growth`

Dates can be generic and safe.

### Behavior

- simple grid
- no Isotope
- optional category chips with React state only if needed

### Component

```txt
components/company-profile/news-section.tsx
features/company-profile/data/news.ts
```

---

## 7.11 CTA Section

### Target Struktur

Tambahkan CTA final setelah news atau sebelum footer.

### Content

- heading: `Ready to Explore the Opportunity?`
- description: dummy
- button 1: `/contact`
- button 2: `/portfolio`

### Component

```txt
components/company-profile/cta-section.tsx
```

---

## 7.12 Footer

### Target Struktur

- multi-column footer
- intro/logo area
- quick links
- products links
- resources/contact area
- social links optional
- copyright

### Sanitized Content

Gunakan dummy:

- company name: `Lorem Ipsum Company`
- address: `Business District Avenue, Demo City`
- phone: `+62 000 0000 0000`
- email: `hello@example.com`
- no real address, no real email, no real phone

### Component

```txt
components/company-profile/public-footer.tsx
features/company-profile/data/footer.ts
```

## 8. Public Child Pages

Selain homepage, semua halaman navbar harus developed.

---

## 8.1 `/about`

### Tujuan

Memperluas about section dari homepage.

### Sections

1. Page hero
2. Company overview
3. Vision and mission
4. Values cards
5. Timeline dummy
6. CTA

### Components

```txt
HeroSection / PageHero variant
PageSection
FeatureCard
Timeline or custom timeline
CtaSection
```

---

## 8.2 `/why-us`

### Tujuan

Menjelaskan value proposition.

### Sections

1. Page hero
2. Advantage cards
3. Infrastructure benefits
4. Access/location benefits with dummy wording
5. Operational support benefits
6. CTA to products/contact

---

## 8.3 `/products`

### Tujuan

Halaman detail product dari mega menu.

### Sections

1. Page hero
2. Anchored product detail: `#industrial-land`
3. Anchored product detail: `#factory-building`
4. Anchored product detail: `#commercial-area`
5. Anchored product detail: `#warehouse`
6. Anchored product detail: `#residential`
7. CTA

Each product section:

- image placeholder
- title
- description
- key features
- CTA

---

## 8.4 `/development`

### Tujuan

Memperluas masterplan/development section.

### Sections

1. Page hero
2. Development cluster cards
3. Masterplan overview
4. Infrastructure timeline
5. Milestone cards
6. CTA to portfolio

---

## 8.5 `/portfolio`

### Tujuan

Menampilkan project dan partner ecosystem dummy.

### Sections

1. Page hero
2. Project cards
3. Partner ecosystem cards
4. Impact metrics
5. CTA to contact

---

## 8.6 `/resources`

### Tujuan

Resource center.

### Sections

1. Page hero
2. Resource cards:
   - Brochure
   - Investor Guide
   - FAQ
   - Regulation
   - Media Kit
3. Help/CTA block

All links must be internal or dummy safe anchors.

---

## 8.7 `/compliance`

### Tujuan

Trust, compliance, and sustainability page.

### Sections

1. Page hero
2. Compliance framework
3. Policy cards
4. Sustainability cards
5. Certificate dummy cards
6. CTA

---

## 8.8 `/news`

### Tujuan

Listing dummy news.

### Sections

1. Page hero
2. Featured article
3. Category/tag chips
4. News grid
5. CTA

---

## 8.9 `/contact`

### Tujuan

Contact page public.

### Sections

1. Page hero
2. Contact form UI dummy
3. Office info dummy
4. Map placeholder
5. CTA

Form tidak perlu backend.

## 9. Component Architecture

Direkomendasikan:

```txt
components/company-profile/
  public-navbar.tsx
  product-mega-menu.tsx
  public-footer.tsx
  public-page-shell.tsx
  page-section.tsx
  hero-section.tsx
  stats-band.tsx
  about-section.tsx
  product-grid.tsx
  awards-section.tsx
  testimonials-section.tsx
  masterplan-section.tsx
  highlight-video-section.tsx
  news-section.tsx
  cta-section.tsx
  contact-section.tsx
  feature-card.tsx
  placeholder-media.tsx
```

## 10. Data Architecture

Direkomendasikan:

```txt
features/company-profile/
  types.ts
  service.ts
  data/
    navigation.ts
    overview.ts
    products.ts
    pages.ts
    news.ts
    footer.ts
```

### Data Files

| File | Isi |
|---|---|
| `navigation.ts` | public nav, product mega menu |
| `overview.ts` | hero, stats, about, awards, testimonials, masterplan, highlight |
| `products.ts` | product list, anchors, features |
| `pages.ts` | child page content |
| `news.ts` | news items dummy |
| `footer.ts` | footer links and dummy contact |

Jangan hardcode konten panjang langsung di JSX.

## 11. Interaction Specification

### Navbar

- client component
- `isMenuOpen` untuk mobile menu
- `isMegaOpen` untuk products mega menu
- close menu setelah link diklik
- support `aria-expanded`
- support keyboard focus

### Mega Menu

Desktop:

- open on hover/focus
- close on mouse leave or blur
- wide panel with product cards

Mobile:

- open on tap
- nested list/cards
- close after link click

### Product Cards

Desktop:

- hover/flip or overlay reveal

Mobile:

- always readable or simple reveal
- no inaccessible hover-only content

### Video Placeholder

- play button decorative
- no external iframe
- optional click leads to `/resources` or internal anchor

### News

- grid only
- optional category chips with React state
- no external layout library

## 12. Styling Strategy

### Namespace

Semua style public harus berada dalam namespace agar tidak bocor ke portal.

Contoh:

```tsx
<div data-public-profile>
  {children}
</div>
```

CSS:

```css
[data-public-profile] .cp-section {
  ...
}
```

### Global CSS Rule

Jika menambah styling di `app/globals.css`, pastikan semua selector diawali:

```css
[data-public-profile]
.cp-
```

Jangan menulis selector global seperti:

```css
.container
.navbar
.card
section
h1
```

yang bisa mengganggu portal.

### Naming Convention

Gunakan prefix:

```txt
cp-
```

Contoh:

```txt
cp-navbar
cp-hero
cp-section
cp-card
cp-product-card
cp-footer
```

## 13. Accessibility

Wajib:

- semua link punya text yang jelas
- button menu punya `aria-expanded`
- mobile menu bisa ditutup
- gambar dekoratif punya empty alt atau role presentation
- gambar bermakna punya alt generic
- color contrast cukup
- hover-only content tetap tersedia di mobile
- no empty href
- no external tracking iframe

## 14. SEO and Metadata

Jangan gunakan metadata asli dari HTML target.

Gunakan metadata dummy:

```ts
export const metadata = {
  title: "Company Profile Demo",
  description: "A demo company profile website for an industrial and investment platform.",
};
```

Page metadata bisa dibuat generic per route.

## 15. Acceptance Criteria

Implementasi dianggap selesai jika:

1. Semua route public tersedia:
   - `/`
   - `/about`
   - `/why-us`
   - `/products`
   - `/development`
   - `/portfolio`
   - `/resources`
   - `/compliance`
   - `/news`
   - `/contact`

2. Homepage mengikuti urutan section target:
   - navbar
   - hero
   - stats
   - about
   - products
   - recognition
   - testimonials
   - masterplan
   - highlight video
   - news
   - CTA
   - footer

3. Semua halaman turunan developed dan tidak kosong.

4. Navbar fixed dan reusable.

5. Footer reusable.

6. Mega menu Products bekerja di desktop dan mobile.

7. Mobile navbar bisa dibuka dan ditutup.

8. Semua link internal dan valid.

9. Tidak ada href kosong.

10. Tidak ada asset asli dari HTML target.

11. Tidak ada script tracking.

12. Tidak ada copy original dari HTML target.

13. Tidak ada perubahan pada portal/tender.

14. Styling public tidak bocor ke portal.

15. `npm run lint` dan `npm run build` berhasil jika script tersedia.

## 16. Handoff Prompt untuk AI Agent

Gunakan instruksi berikut setelah file ini dibuat:

```txt
Baca docs/design.md dan implementasikan company profile public sesuai spesifikasi.

HTML target harus direbuild penuh secara struktur/UI, tetapi semua konten/asset/brand original wajib diganti dummy.

Jangan sentuh area portal/tender.
Ikuti component architecture, data architecture, sanitasi, responsive behavior, dan acceptance criteria di docs/design.md.

Setelah implementasi, jalankan lint/build jika tersedia dan laporkan file dibuat/diubah.
```

## 17. Final Validation Checklist

Sebelum handoff, pastikan:

```txt
[ ] Public layout memakai navbar/footer baru.
[ ] Homepage mengikuti struktur target.
[ ] All public routes exist.
[ ] Product anchors work.
[ ] Mega menu works.
[ ] Mobile menu works.
[ ] Child pages are developed.
[ ] No original brand/company names.
[ ] No original asset URLs.
[ ] No original metadata.
[ ] No original testimonial/news/statistic.
[ ] No tracking scripts.
[ ] No global CSS leakage.
[ ] Portal routes untouched.
[ ] Lint passes if available.
[ ] Build passes if available.
```

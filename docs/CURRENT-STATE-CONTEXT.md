# Wiratama Industrial MVP — Current State Context

> Dokumen ini adalah **konteks lengkap** untuk AI agent (atau developer) yang akan menambahkan fitur baru—khususnya **Mini ERP**—ke atas scaffold demo ini. Dokumen menjelaskan: tech stack, struktur folder, arsitektur route, design system, pola state management, struktur data, dan area-area yang sengaja dibiarkan kosong untuk ekspansi ke depan.

---

## 1. Identitas Proyek

- **Nama internal**: `wiratama` (lihat `package.json:name`)
- **Tujuan**: MVP demo *pitching* untuk PT Wiratama Indramayu Perkasa (PT WIP), sebuah kawasan industri terintegrasi.
- **Fokus**: memperlihatkan alur (flow) bisnis kawasan industri, **bukan** integrasi database atau backend production.
- **Audience target**:
  1. Publik / calon tenant & investor (company profile).
  2. Vendor / kontraktor eksternal (tender submission, tracking).
  3. Tim internal PT WIP (procurement, review, evaluasi, operasional).
- **Batasan eksplisit** (lihat `docs/mvp-blueprint.md`):
  - Semua data masih *local mock* + *localStorage* untuk state demo.
  - Tidak ada auth real, tidak ada database, tidak ada API production.
  - Tidak ada upload file nyata, tidak ada scanner barcode nyata.

---

## 2. Tech Stack & Konfigurasi

### 2.1 Runtime & Framework

| Layer | Versi | Catatan |
|---|---|---|
| `next` | `16.2.7` | ⚠️ Versi **breaking-change** (lihat `AGENTS.md`). Baca `node_modules/next/dist/docs/` sebelum menulis kode. |
| `react` / `react-dom` | `19.2.4` | Server Components by default; pakai `"use client"` hanya bila butuh state/efek/browser API. |
| `typescript` | `^5` | `strict: true`, `moduleResolution: "bundler"`. |
| `tailwindcss` | `^4` | Dipakai via PostCSS (`@tailwindcss/postcss`). |
| `node` types | `^20` | Standar LTS. |

### 2.2 Dependencies Penting

```jsonc
"dependencies": {
  "next": "16.2.7",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "embla-carousel-react": "^8.6.0",   // carousel (siap pakai)
  "lucide-react": "^1.17.0",          // icon set
  "leaflet": "^1.9.4",                // peta kawasan (real map)
  "react-leaflet": "^5.0.0",          // wrapper React untuk Leaflet
  "@types/leaflet": "^1.9.21"         // dev type only
}
```

> **Catatan untuk Mini ERP**: stack di atas minim—tidak ada Zustand/Redux, tidak ada form library, tidak ada date picker, tidak ada tabel data-grid. Untuk Mini ERP kemungkinan perlu menambah dependency (lihat §12).

### 2.3 Scripts

```jsonc
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

Tidak ada test script, tidak ada type-check script eksplisit (`tsc --noEmit` belum didefinisikan).

### 2.4 Konfigurasi Penting

- **`next.config.ts`**: hanya `images.remotePatterns` untuk `unsplash.com`, `placehold.co`, `picsum.photos`. **Tidak ada** `experimental`, **tidak ada** custom webpack, **tidak ada** env-based switch.
- **`tsconfig.json`**: `paths: { "@/*": ["./*"] }`—semua import pakai prefix `@/`.
- **`eslint.config.mjs`**: flat config + `eslint-config-next/core-web-vitals` & `/typescript`. Default ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`.
- **`postcss.config.mjs`**: hanya plugin `@tailwindcss/postcss`.
- **`.gitignore`**: standar Next.js, ignore `.env*`, `.next/`, `node_modules/`, `*.tsbuildinfo`.

### 2.5 Aset Statis (`public/`)

- `logo.png` — logo PT WIP (dipakai di navbar publik & portal).
- `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` — default Next.js starter, **belum dibersihkan**.

### 2.6 Folder Kosong / Cadangan

Folder-folder ini sudah dibuat tapi **kosong**, kemungkinan untuk ekspansi:

- `app/[locale]/admin/(protected)/news/` — struktur rute sudah ada (`create/`, `[id]/edit/`), tapi **tanpa page.tsx**. Disiapkan untuk **admin panel**.
- `app/[locale]/admin/(protected)/news/create/` → kosong
- `app/[locale]/admin/(protected)/news/[id]/edit/` → kosong
- `components/admin/news/` → kosong
- `lib/admin/` → kosong
- `messages/` → kosong (sebelumnya disiapkan untuk i18n, belum diimplementasi)
- `components/about/` → hanya `interactive-milestones.tsx`
- `features/news/` → kosong

> Folder `app/[locale]/admin/(protected)/news/...` adalah **slot kosong yang sangat jelas** untuk fitur Mini ERP / admin panel. Lihat §11.

---

## 3. Arsitektur Folder

Prinsip (lihat `docs/mvp-blueprint.md §1`):
- `app/` → hanya route, layout, page.
- `features/` → domain bisnis (mock data, types, service, komponen spesifik).
- `components/` → UI lintas fitur (`shared/`) + UI primitif (`ui/`).
- `lib/` → utilitas umum non-domain.

### 3.1 Pohon Direktori Final

```text
app/
  layout.tsx                     # Root layout (html lang="id", Tailwind globals)
  globals.css                    # Tailwind + design tokens
  not-found.tsx                  # 404 generik
  favicon.ico
  (public)/                      # ROUTE GROUP: company profile publik
    layout.tsx                   # PublicNavbar + PublicFooter
    page.tsx                     # Homepage (HeroSection + dst.)
    about/page.tsx
    central-java/page.tsx
    compliance/page.tsx
    contact/page.tsx
    development/page.tsx
    news/page.tsx
    portfolio/page.tsx
    products/page.tsx
    resources/page.tsx
    virtual-tour/page.tsx        # 360° interaktif demo
    why-us/page.tsx
  (portal)/                      # ROUTE GROUP: portal tender/tracking
    layout.tsx                   # PortalShell (PortalTopNav)
    dashboard/page.tsx           # Command center internal PT WIP
    contractors/
      page.tsx
      [id]/page.tsx
    suppliers/
      page.tsx
      [id]/page.tsx
    tender/
      page.tsx                   # Daftar tender (Vendor)
      vendor/page.tsx            # Portal Vendor
      guest/page.tsx             # Dashboard tender publik (calon vendor)
      join/page.tsx              # Form registrasi vendor
      internal/
        page.tsx                 # Review Tender (list)
        [id]/page.tsx            # Detail Review (komparasi + drawer)
      [id]/
        page.tsx                 # Detail tender (Vendor)
        apply/page.tsx           # Form pengajuan proposal
    tracking/
      page.tsx                   # Barcode search + list records
      [barcode]/page.tsx         # Detail record + event log
  [locale]/
    admin/
      (protected)/
        news/
          create/                # ← folder kosong (cadangan)
          [id]/edit/             # ← folder kosong (cadangan)

components/
  shared/                        # Komponen lintas fitur
    barcode-search.tsx           # Form search barcode (client)
    demo-note.tsx                # Banner catatan demo
    global-hero.tsx              # Hero generik untuk halaman publik
    page-hero.tsx                # Hero panel untuk portal
    portal-page-intro.tsx        # Header halaman portal
    portal-shell.tsx             # Wrapper layout portal
    portal-top-nav.tsx           # TopNav + role switcher (client)
    site-footer.tsx              # (legacy/duplicate)
    site-header.tsx              # (legacy/duplicate)
    timeline.tsx                 # Timeline generik
  ui/                            # Primitif UI
    metric-card.tsx
    section-card.tsx
    status-pill.tsx              # Badge status dengan tone mapping
  company-profile/               # Komponen khusus company profile
    public-navbar.tsx
    public-footer.tsx
    public-page-shell.tsx
    product-mega-menu.tsx
    hero-section.tsx
    stats-band.tsx
    about-section.tsx
    product-grid.tsx
    awards-section.tsx
    testimonials-section.tsx
    masterplan-section.tsx
    highlight-video-section.tsx
    news-section.tsx
    pid-section.tsx
    region-section.tsx
    resources-section.tsx
    why-us-section.tsx
    page-section.tsx
    placeholder-media.tsx
    contact-section.tsx
    feature-card.tsx
    compliance-section.tsx
  home/                          # Komponen khusus homepage
    hero-section.tsx
    about-section.tsx
    master-planning-section.tsx
    products-section.tsx
    awards-carousel.tsx
    testimonials-carousel.tsx
    welcome-video-section.tsx
    news-section.tsx
  about/
    interactive-milestones.tsx
  admin/
    news/                        # ← folder kosong (cadangan)

features/                        # Domain-driven
  company-profile/
    types.ts                     # 418 baris — semua type company profile
    service.ts                   # getCompanyProfile() aggregator
    data/
      navigation.ts              # Public nav + mega menu
      overview.ts                # Hero, stats, about, awards, dst.
      pages.ts                   # Konten per route (about, why-us, dst.)
      products.ts                # 6 product items
      news.ts                    # News dummy
      footer.ts                  # Footer + contact info
      pid.ts                     # Public Information Disclosure tabs
      region.ts                  # Central Java region tabs
      resources-docs.ts          # Annual report, sustainability, dst.
      why-us.ts                  # Why Us tabs (SEZ, master-plan, dst.)
      compliance-tabs.ts         # Compliance tabs
  tender/
    types.ts                     # 194 baris — Tender, Proposal, status, dst.
    service.ts                   # 246 baris — read-only aggregator
    demo-store.ts                # ⚠️ Client state via localStorage + useSyncExternalStore
    data/
      tenders.ts                 # 450 baris — 3 paket tender + proposals seed
    components/
      tender-directory.tsx       # List tender (filter, sort, search)
      tender-detail-view.tsx     # Detail tender (Vendor)
      tender-area-map.tsx        # Peta kawasan (SSR + dynamic Leaflet)
      tender-real-map.tsx        # Implementasi Leaflet
      vendor-proposal-form.tsx   # Form apply proposal
      guest-tender-directory.tsx # Listing tender publik
      internal-review-list.tsx   # List review (internal)
      internal-tender-review-detail.tsx  # Detail review + drawer
      proposal-comparison-table.tsx      # Tabel komparasi proposal
      proposal-detail-drawer.tsx  # Drawer update status proposal
  contractor/
    types.ts                     # Contractor schema
    service.ts                   # listContractors, getContractorById
    data/contractors.ts          # 235 baris — 3 vendor seed
  supplier/
    types.ts
    service.ts
    data/suppliers.ts            # ~59 baris — beberapa supplier seed
  tracking/
    types.ts                     # TrackingRecord, event, dst.
    service.ts                   # 113 baris — list, getByBarcode, search, stats
    data/items.ts                # 314 baris — sample barcode records
  news/                          # ← folder kosong

lib/
  format.ts                      # Intl formatters (IDR, date, compact)
  mock-api.ts                    # simulateLatency() — fake API delay
  navigation.ts                  # Portal mode, public nav, role-based menu
  status.ts                      # getStatusLabel, getStatusTone (mapping)
  admin/                         # ← folder kosong (cadangan)

messages/                        # ← folder kosong (cadangan i18n)

docs/                            # Dokumentasi internal
  mvp-blueprint.md               # Arsitektur MVP + flow pitching
  tender-current-state.md        # State tender saat ini
  tender-demo-guide.md           # Skenario demo pitching
  design.md                      # Spesifikasi desain public profile

public/
  logo.png
  file.svg, globe.svg, next.svg, vercel.svg, window.svg
```

---

## 4. Route Map Lengkap

### 4.1 Public Profile (route group `(public)`)

| Route | Halaman | Tipe | Sumber Data |
|---|---|---|---|
| `/` | Homepage (hero, about, products, awards, dst.) | Server Component | `getCompanyProfile()` |
| `/about` | About Us | Server | `publicPageContent.about` |
| `/why-us` | Why Us (tabs: SEZ, master-plan, infrastructure, one-stop, policy) | Server | `whyUsItems` + `publicPageContent.whyUs` |
| `/products` | Product detail (anchors: `#industrial-land`, `#factory-building`, dst.) | Server | `productItems` |
| `/development` | Development / Masterplan | Server | `developmentClusters`, `developmentTimeline` |
| `/portfolio` | Portfolio proyek + partner ecosystem | Server | `portfolioProjects`, `partnerEcosystem` |
| `/resources` | Resource center (annual report, sustainability, newsletter) | Server | `resourceItems` |
| `/compliance` | Compliance tabs | Server | `complianceFramework` + `sustainabilityItems` |
| `/news` | News listing + PID (Public Information Disclosure) tabs | Server | `newsItems` + `pidTabs` |
| `/contact` | Contact form dummy + office info | Server | `contactInfo` + `contactFields` |
| `/central-java` | Central Java region tabs | Server | `regionTabs` |
| `/virtual-tour` | Interactive 360° tour | **Client** | Hardcoded `tourZones` (di dalam page) |

**Layout**: `app/(public)/layout.tsx` membungkus dengan `<PublicNavbar navigation={site.navigation} />` + `<PublicFooter content={site.footer} />`. Styling di-namespace dengan `data-public-profile` agar tidak bocor ke portal.

### 4.2 Portal (route group `(portal)`)

Portal punya **role switcher demo** dengan 3 mode (`lib/navigation.ts`):

| Mode | Storage Key | Landing | Menu |
|---|---|---|---|
| `vendor` | `wip-portal-mode-v1` | `/tender` | `/tender`, `/tender/vendor` |
| `internal` | `wip-portal-mode-v1` | `/dashboard` | `/dashboard`, `/tender/internal`, `/contractors`, `/tracking` |
| `guest` | `wip-portal-mode-v1` | `/tender/guest` | `/tender/guest`, `/tender/join` |

Mode disimpan di `localStorage` dan terdeteksi otomatis dari path (`getDefaultPortalMode(pathname)`).

#### Tender

| Route | Mode | Halaman | Tipe | Sumber Data |
|---|---|---|---|---|
| `/tender` | vendor | Dashboard Tender Vendor (list + summary card) | **Client** | `useDemoTenders(seedTenders)` |
| `/tender/vendor` | vendor | Portal Vendor (profil + daftar proposal) | **Client** | `useDemoTenders` |
| `/tender/guest` | guest | Dashboard Tender Publik | Server | `getGuestTenderCards()` |
| `/tender/join` | guest | Form registrasi vendor (mailto) | Server | Hardcoded steps |
| `/tender/[id]` | vendor | Detail Tender (timeline, scope, requirement) | Mixed | `getTenderById()` + `useDemoTenders` |
| `/tender/[id]/apply` | vendor | Form Apply Proposal (prefill vendor) | **Client** | Hardcoded + form state |
| `/tender/internal` | internal | Review Tender (list) | Server | `getReviewTenders()` |
| `/tender/internal/[id]` | internal | Detail Review + komparasi + drawer | **Client** | `useDemoTenders` |

#### Lainnya

| Route | Mode | Halaman | Tipe |
|---|---|---|---|
| `/dashboard` | internal | Command center + map + metric cards | **Client** |
| `/contractors` | internal | Direktori vendor | Server |
| `/contractors/[id]` | internal | Profil vendor lengkap | Server |
| `/suppliers` | internal | Direktori supplier | Server |
| `/suppliers/[id]` | internal | Profil supplier | Server |
| `/tracking` | internal | Barcode search + recent entries + attention | Server |
| `/tracking/[barcode]` | internal | Detail record + event log | Server |

### 4.3 Locale/Admin (cadangan)

| Route | Status |
|---|---|
| `app/[locale]/admin/(protected)/news/create/` | **folder kosong** |
| `app/[locale]/admin/(protected)/news/[id]/edit/` | **folder kosong** |

Disiapkan untuk **admin panel Mini ERP** (CMS news minimal), lihat §11.

---

## 5. Design System & Konvensi Visual

### 5.1 Design Tokens (`app/globals.css`)

```css
:root {
  --background: #f6f4f3;
  --foreground: #1f2937;
  --surface: rgba(255, 255, 255, 0.82);
  --surface-strong: #ffffff;
  --line: rgba(31, 41, 55, 0.08);
  --muted: #5f6672;
  --accent: #8f2234;          /* maroon — warna utama brand */
  --accent-soft: #f7e8eb;
  --accent-strong: #6f1526;
  --success: #0f766e;
  --warning: #a16207;
  --danger: #b91c1c;
  --font-manrope: "Bahnschrift", "Aptos", "Segoe UI", sans-serif;
  --font-plex-mono: "Consolas", "Lucida Console", monospace;
}
```

Dideklarasikan ulang ke Tailwind v4 via `@theme inline` agar bisa dipakai sebagai utility class (`bg-[var(--color-accent)]`, `text-[var(--color-foreground)]`, dll).

### 5.2 Utilitas Kustom (di `app/globals.css` @layer utilities)

- `.shell` — `max-w-7xl` container dengan padding responsif.
- `.portal-shell` — `max-w-[1280px]` (lebih lebar untuk portal).
- `.panel` / `.panel-strong` — kartu glassmorphism dengan border halus.
- `.eyebrow` — label kecil di atas judul (uppercase, accent color).
- `.display-title` — `text-4xl`–`text-6xl` tracking tight.
- `.section-title` — `text-2xl`–`text-3xl` tracking tight.
- `.code-label` — label kecil monospace uppercase (untuk label field).
- `.mesh-grid` — background grid pattern halus.
- `.tender-card` / `.tender-card-soft` — kartu khusus portal tender.
- `.tender-input` / `.tender-textarea` — input dengan border-radius `18px`.
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-secondary-accent`, `.btn-ghost` — tombol.

### 5.3 Public Profile Namespace

Setiap style company profile di-namespace dengan atribut `data-public-profile`:

```tsx
<div data-public-profile>
  <div className="cp-section ...">...</div>
</div>
```

```css
[data-public-profile] .cp-section { ... }
```

Class prefix: `cp-*` (navbar, hero, footer, mega menu, dst).

> ⚠️ **Jaga**: style publik **tidak boleh** bocor ke portal. Style portal pakai class Tailwind biasa + utility `.panel`, `.tender-card`, dll.

### 5.4 Konvensi Status & Tone

File `lib/status.ts` memetakan string status ke label Indonesia + tone (warna):

- `StatusTone = "neutral" | "accent" | "success" | "warning" | "danger"`
- Mapping mencakup: tender (`draft`, `open`, `under_review`, `shortlisting`, `awarded`, `closed`), proposal (`submitted`, `clarification`, `shortlisted`, `not_selected`), tracking (`verified`, `pending_document`, `flagged`, `low_risk`, `medium_risk`, dst.).
- Komponen `components/ui/status-pill.tsx` otomatis memilih tone dari string via `getStatusTone()`.

### 5.5 Komponen UI Reusable

| Komponen | File | Tujuan |
|---|---|---|
| `StatusPill` | `components/ui/status-pill.tsx` | Badge status dengan tone otomatis |
| `MetricCard` | `components/ui/metric-card.tsx` | Card metric di dashboard (label + value + hint) |
| `SectionCard` | `components/ui/section-card.tsx` | Panel dengan judul + deskripsi + body |
| `PortalPageIntro` | `components/shared/portal-page-intro.tsx` | Header halaman portal (eyebrow + title + description) |
| `PageHero` | `components/shared/page-hero.tsx` | Hero panel untuk portal (dengan stats opsional) |
| `GlobalHero` | `components/shared/global-hero.tsx` | Hero dark untuk halaman publik (dengan background image) |
| `BarcodeSearch` | `components/shared/barcode-search.tsx` | Form input + sample barcode chips |
| `DemoNote` | `components/shared/demo-note.tsx` | Banner catatan "Demo only" |
| `Timeline` | `components/shared/timeline.tsx` | Timeline generik (untuk milestone tender) |

### 5.6 Formatter Utilitas (`lib/format.ts`)

```ts
formatCurrency(148_000_000_000)      // "Rp148.000.000.000"
formatCompactNumber(120)             // "120"
formatCompactCurrency(148_000_000_000) // "IDR 148M"
formatDate("2026-06-24")             // "24 Jun 2026"
formatDateTime("2026-06-06T08:14:00+07:00") // "06 Jun 2026, 08.14"
```

Locale: `id-ID`.

---

## 6. State Management — Pola `demo-store`

### 6.1 Mengapa Tidak Pakai Zustand/Redux?

Untuk MVP pitching, state demo (proposal baru + status update) cukup disimpan di **`localStorage`**, diakses via React `useSyncExternalStore`. Tidak ada dependensi state management.

### 6.2 File Kunci: `features/tender/demo-store.ts`

```ts
// Storage keys:
const DEMO_STATE_KEY = "wip-tender-demo-state-v1";
const DEMO_STATE_EVENT = "wip-tender-demo-state-change";

type TenderDemoState = {
  addedProposals: TenderProposal[];        // Proposal baru yang disubmit vendor
  proposalOverrides: Record<string, {     // Override status per proposal
    status?: ProposalStatus;
    internalNotes?: string;
  }>;
  tenderStatusById: Record<string, TenderStatus>; // Override status tender
};
```

**API publik**:
- `useTenderDemoState()` — hook reaktif untuk baca state (server snapshot = default).
- `applyDemoStateToTenders(seedTenders, demoState)` — merge seed + override.
- `useDemoTenders(seedTenders)` — hook yang menggabungkan keduanya (`useMemo`).
- `addDemoProposal(proposal)` — tambahkan proposal baru.
- `updateDemoProposalStatus({ proposalId, tenderId, status, internalNotes, relatedProposalIds })` — ubah status proposal. **Side effect**: kalau status `awarded`, semua proposal lain di tender yang sama otomatis jadi `not_selected`.
- `resetTenderDemoState()` — hapus localStorage + reload page.

**Sinkronisasi**: pakai `window.dispatchEvent(new Event(DEMO_STATE_EVENT))` + listener `storage` event. Tab lain di browser yang sama akan ikut update.

### 6.3 Cara Pakai di Komponen

```tsx
"use client";
import { useDemoTenders } from "@/features/tender/demo-store";
import { tenders as seedTenders } from "@/features/tender/data/tenders";

export default function TenderPage() {
  const tenders = useDemoTenders(seedTenders); // reaktif
  // ...
}
```

### 6.4 Portal Mode Storage

`components/shared/portal-top-nav.tsx`:
```ts
const PORTAL_MODE_KEY = "wip-portal-mode-v1";
type PortalMode = "vendor" | "internal" | "guest";
```

Disimpan di `localStorage` saat mode berubah atau terdeteksi dari pathname.

### 6.5 Reset Demo

Tombol **Reset Demo** ada di dropdown top-nav (role switcher). Fungsi: konfirmasi → `resetTenderDemoState()` → `window.location.reload()`.

### 6.6 Implikasi untuk Mini ERP

Pola ini bisa di-extend untuk Mini ERP. Saran: tambahkan key localStorage baru seperti `wip-erp-state-v1` di file baru `features/erp/demo-store.ts`. **Jangan** reuse `wip-tender-demo-state-v1` agar tidak konflik dengan reset demo tender.

---

## 7. Data Layer & Service Pattern

### 7.1 Pola Service (read-only)

Setiap fitur punya `service.ts` dengan fungsi async yang mensimulasikan latency:

```ts
// lib/mock-api.ts
export async function simulateLatency(ms = 120) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
```

```ts
// features/tender/service.ts (contoh)
export async function getTenders(): Promise<Tender[]> {
  await simulateLatency();
  return tenders; // dari data/tenders.ts
}

export async function getTenderById(id: string): Promise<Tender | undefined> {
  await simulateLatency();
  return tenders.find((item) => item.id === id);
}
```

Selalu return data **mentah** (seed). Kalau halaman butuh reactivity, panggil `useDemoTenders(seedTenders)` di komponen client setelah menerima data.

### 7.2 Pola Agregator Service

`features/company-profile/service.ts` mengumpulkan semua data dari banyak file `data/*.ts` jadi satu objek besar:

```ts
const companyProfileSiteData: CompanyProfileSiteData = {
  navigation: publicNavigation,
  home: { hero: homeHeroContent, about: aboutContent, ... },
  products: productItems,
  news: newsItems,
  footer: footerContent,
  // ... dst
};

export async function getCompanyProfile() {
  await simulateLatency();
  return companyProfileSiteData;
}
```

### 7.3 Skema Data Penting

#### `Tender` (`features/tender/types.ts`)

```ts
{
  id, code, title, category, location, zone,
  estimatedValue, status, deadline, startDate,
  description, publicSummary, publicValueLabel, isPublic,
  scope: string[],
  requirements: string[],
  requiredDocuments: string[],
  frequentDocuments: { id, label, kind }[],
  relatedParties: { contractorId, role, workstream }[],
  mapPosition: { markerLabel, shortLabel, x, y },  // % koordinat
  milestones: { label, date, note }[],
  proposals: TenderProposal[]
}
```

#### `TenderProposal`

```ts
{
  proposalId, tenderId, vendorId, vendorName, vendorType: "contractor" | "supplier",
  offeredPrice, estimatedDurationDays, proposedStartDate,
  workMethod, relevantExperience, mainEquipment: string[], manpowerCount,
  offerValidityDays, vendorNotes, internalNotes,
  submittedAt, status, score?: number,
  documents: { type, label, status: "ready" | "missing", note? }[]
}
```

`ProposalDocumentType` catalog tetap di `proposalDocumentCatalog` (7 jenis: teknis, harga, company profile, legal, pengalaman, K3, peralatan).

#### `Contractor` (`features/contractor/types.ts`)

```ts
{
  id, name, type: "contractor", category,
  businessField, businessClassification, establishedYear,
  verificationStatus, nib, npwp, address,
  picName, picTitle, email, phone,
  workforceCount, serviceAreas: string[],
  specialization, onTimeRecord,
  completedProjects, averageScore,
  summary, performanceSummary: string[],
  legalDocuments: { name, status, note? }[],
  projectExperiences: { projectName, client, year, scope, contractValue, result }[],
  history: { project, year, packageName, result }[]
}
```

#### `Supplier` (lebih ringkas)

```ts
{ id, name, category, status, reliabilityScore, leadTime, summary,
  suppliedPackages: string[], notes: string[] }
```

#### `TrackingRecord` (`features/tracking/types.ts`)

```ts
{
  barcode, contractorName, contractorPic,
  supplierName, supplierOrigin,
  materialName, materialCategory, quantity, unit,
  origin, destinationZone, workArea,
  vehiclePlate, vehicleType, driverName, driverId,
  legalStatus, gateStatus, riskLevel,
  scheduledDate, entryTime, exitTime,
  verificationNotes, gateOfficer, rejectionReason?, riskNotes?,
  documents: { name, status: "valid"|"missing"|"expired"|"mismatch", note }[],
  events: { time, title, description, officer?, tone? }[]
}
```

### 7.4 Vendor Demo ID (Hardcoded!)

```ts
// features/tender/service.ts
const demoVendorId = "prima-infrastruktur-abadi";
const demoVendorName = "PT Prima Infrastruktur Abadi";
```

Vendor "PT Prima Infrastruktur Abadi" (`id: prima-infrastruktur-abadi`) adalah **aktor utama demo**:
- Tersimpan di `contractors.ts` (id sama).
- Dipakai di summary vendor (`getVendorProposalSummary`).
- Dipakai untuk filter proposal vendor (`/tender/vendor`).
- Menjadi identitas default untuk submit proposal dari `/tender/[id]/apply`.

> Untuk Mini ERP yang punya multi-user, ini perlu di-replace dengan sistem auth + user identity.

---

## 8. Detail Per Modul Fitur

### 8.1 Tender Management (modul utama)

**3 paket tender seed** (lihat `features/tender/data/tenders.ts`):

| Kode | Judul | Status | isPublic | Proposals (vendor) |
|---|---|---|---|---|
| `TND-WIP-001` | Pembangunan Jalan Utama Kawasan Industri Zona A | `open` | ✓ | 3 (Indra, Karya Beton, Prima) |
| `TND-WIP-002` | Pekerjaan Drainase Utama Zona A | `open` | ✗ | 1 (Karya Beton) |
| `TND-WIP-003` | Pengadaan Pipa HDPE Jaringan Air Bersih | `open` | ✓ | 0 |

**3 vendor aktif** (lihat `features/contractor/data/contractors.ts`):
1. `prima-infrastruktur-abadi` — PT Prima Infrastruktur Abadi (aktor utama)
2. `indra-konstruksi-mandiri` — PT Indra Konstruksi Mandiri
3. `karya-beton-nusantara` — PT Karya Beton Nusantara

**Status enums**:

```ts
TenderStatus = "draft" | "open" | "under_review" | "shortlisting" | "awarded" | "closed";
ProposalStatus = "draft" | "submitted" | "under_review" | "clarification" | "shortlisted" | "awarded" | "not_selected";
```

**Peta kawasan**: pakai `leaflet` + `react-leaflet` (dimuat via `next/dynamic` untuk hindari SSR). Koordinat marker disimpan sebagai `x, y` (%), bukan lat/lng.

### 8.2 Contractor & Supplier History

- **Contractor** lebih detail (legal lengkap, pengalaman, performance, history).
- **Supplier** lebih ringkas (kategori, reliability, lead time, supplied packages).
- Halaman `/contractors` & `/suppliers` adalah list card. Detail di `/contractors/[id]` & `/suppliers/[id]`.

### 8.3 Barcode Tracking

- Sample barcode: `WIP-TRK-2026-001` (lihat `features/tracking/data/items.ts`).
- Lookup via `BarcodeSearch` component, navigasi ke `/tracking/[barcode]`.
- Detail menampilkan: legal status, gate status, risk level, documents, event log.

### 8.4 Company Profile (publik)

- **12 halaman publik** lengkap dengan konten dummy (semua generik, bukan brand asli).
- Data didriven dari `features/company-profile/data/*.ts`.
- Layout dibungkus `data-public-profile` untuk namespace styling.
- Komponen `HeroSection` punya 4 variant: `home`, `page`, `news`, `dark` (union type).

---

## 9. Konvensi Kode

### 9.1 Import Path

Selalu pakai alias `@/...`:

```ts
import { tenders } from "@/features/tender/data/tenders";
import { StatusPill } from "@/components/ui/status-pill";
import { simulateLatency } from "@/lib/mock-api";
```

### 9.2 Server vs Client Components

- **Default**: Server Component (tidak ada `"use client"`).
- Pakai `"use client"` **hanya** jika butuh: `useState`, `useEffect`, `useRouter`, `usePathname`, `useDemoTenders`, atau event handler.
- Komponen client umumnya di `features/*/components/*.tsx` dan beberapa `components/shared/*.tsx`.

### 9.3 TypeScript

- `strict: true` — handle null/undefined eksplisit.
- Tipe data didominsasikan oleh `types.ts` di setiap fitur.
- Hindari `any`; pakai `unknown` + narrow.

### 9.4 Styling

- Tailwind v4 utility-first + class kustom dari `globals.css`.
- Tidak ada CSS-in-JS, tidak ada CSS Modules, tidak ada styled-components.
- Untuk portal: pakai class Tailwind langsung atau utilitas `.panel`, `.tender-card`, `.btn-*`.
- Untuk public profile: pakai class namespace `cp-*` + Tailwind biasa.

### 9.5 Page Props (Next.js 15+/16)

```tsx
// Server Component dengan dynamic route
export default async function Page(props: PageProps<"/contractors/[id]">) {
  const { id } = await props.params; // async di Next 15+
  // ...
}
```

Catatan: di Next.js 15+, `params` adalah **Promise** dan harus di-await.

### 9.6 Komentar

Sangat minim — mayoritas komponen tidak punya komentar. Tidak ada dokumentasi inline. Penamaan sudah self-documenting.

---

## 10. Konvensi Visual (Reference Cepat untuk Mini ERP)

### 10.1 Pola Card (Portal)

```tsx
<article className="tender-card p-6 sm:p-7">
  <div className="flex flex-wrap items-start justify-between gap-4">
    <div>
      <p className="code-label">{tender.code}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
        {tender.title}
      </h1>
    </div>
    <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
  </div>
  <p className="mt-4 text-base leading-8 copy-muted">{tender.description}</p>
</article>
```

### 10.2 Pola Page Header (Portal)

```tsx
<PortalPageIntro
  eyebrow="POV Internal PT WIP"
  title="Dashboard Internal PT WIP"
  description="Pantau status tender, proposal masuk, ..."
/>
```

### 10.3 Pola Grid Metric

```tsx
<section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
  <MetricCard label="Tender Aktif" value="3" hint="..." />
  ...
</section>
```

### 10.4 Pola Status Mapping

```tsx
import { getStatusLabel, getStatusTone } from "@/lib/status";

<StatusPill>{getStatusLabel(record.status)}</StatusPill>
// atau dengan tone eksplisit
<StatusPill tone="success">{record.status}</StatusPill>
```

### 10.5 Pola Filter / Sort / Search

Lihat `features/tender/components/tender-directory.tsx` — semua state lokal, filter multi-kriteria, sort by field.

---

## 11. Area Cadangan & Titik Ekspansi untuk Mini ERP

### 11.1 Folder Cadangan (sudah ada, belum diisi)

1. **`app/[locale]/admin/(protected)/news/{create,[id]/edit}/`** — slot untuk admin CRUD news. Bisa jadi entry point Mini ERP admin panel.
2. **`components/admin/news/`** — slot untuk komponen admin.
3. **`lib/admin/`** — slot untuk service admin.
4. **`features/news/`** — slot untuk domain news (mirip `features/contractor/`).
5. **`messages/`** — slot untuk i18n (saat ini kosong, indikasi kuat bahwa localization akan ditambah).

> Folder `app/[locale]/admin/...` diproteksi dengan route group `(protected)` — naming ini menyiratkan akan ada middleware/proxy untuk auth check.

### 11.2 Pola Rekomendasi untuk Mini ERP

#### Opsi A: Route Group `erp/` Sejajar `(portal)/`

```
app/
  (portal)/          # tender/tracking (existing)
  (erp)/             # BARU — modul ERP internal
    layout.tsx       # ERPLayout dengan sidebar admin
    erp/
      dashboard/page.tsx          # ERP dashboard
      inventory/
        page.tsx
        [id]/page.tsx
      finance/
        page.tsx
      hr/
        page.tsx
      procurement/  # mungkin integrasi dengan tender
```

#### Opsi B: Sub-route di Bawah `(portal)/`

Tambah folder `app/(portal)/erp/...` agar layout portal navbar tetap dipakai.

#### Opsi C: Manfaatkan Slot yang Ada

Gunakan `app/[locale]/admin/(protected)/` yang sudah ada. Tambahkan `app/[locale]/admin/(protected)/erp/...` dengan layout admin (sidebar + auth gate).

### 11.3 Modul ERP yang Umum

Berdasarkan gap analysis, modul yang masuk akal untuk ditambahkan:

| Modul | Relevansi | Data Existing yang Bisa Dimanfaatkan |
|---|---|---|
| **Inventory / Material** | Procurement material sudah ada di tender HDPE | `TenderProposal.mainEquipment`, tracking `materialName`/`quantity`/`unit` |
| **Vendor Management** | CRUD vendor + scoring | `Contractor` schema sudah ada |
| **Purchase Order (PO)** | Setelah tender di-award, dibuat PO | `TenderProposal.offeredPrice`, `proposedStartDate` |
| **Invoice / Billing** | Tagihan dari vendor | Belum ada — buat baru |
| **Payment Tracking** | Status pembayaran PO | Belum ada — buat baru |
| **Delivery / Receiving** | Konfirmasi material datang | Mirip `TrackingRecord` (gate) |
| **Asset / Equipment** | Daftar alat kontraktor | `TenderProposal.mainEquipment` |
| **HR / Workforce** | Daftar tenaga kerja | `Contractor.workforceCount` |
| **Finance / Budget** | Budget per zona/tender | `Tender.estimatedValue` |
| **Reporting / Dashboard** | KPI agregat | `TenderStats`, `InternalTenderSummary` |

### 11.4 Pola yang Bisa Di-reuse

1. **`useDemoXxx` pattern** dari `features/tender/demo-store.ts` — salin pola untuk `features/erp/demo-store.ts`.
2. **`StatusPill` + `lib/status.ts`** — tambah status ERP (`paid`, `unpaid`, `partial`, `overdue`).
3. **`MetricCard` + `SectionCard`** — reusable untuk dashboard ERP.
4. **`PortalShell` / `PortalPageIntro`** — pertimbangkan bikin `ERPLayout` + `ERPPageIntro` baru dengan sidebar.
5. **`Service` + `data/`** — buat `features/erp/service.ts` + `features/erp/data/{purchases,invoices,payments}.ts`.
6. **`formCurrency`/`formatDate`** dari `lib/format.ts` — sudah handle IDR locale.
7. **`trackingRecords`** sebagai referensi data untuk modul delivery/receiving.

### 11.5 Dependency yang Kemungkinan Diperlukan

| Dep | Tujuan |
|---|---|
| `zod` atau `valibot` | Validasi form & type-safe data |
| `react-hook-form` | Form management |
| `@tanstack/react-table` | Tabel data dengan sort/filter/pagination |
| `recharts` atau `chart.js` | Chart di dashboard |
| `date-fns` atau `dayjs` | Date manipulation lebih lanjut (saat ini pakai `Intl.DateTimeFormat`) |
| `nanoid` | ID generator |
| `papaparse` atau `xlsx` | Export/import Excel/CSV untuk laporan |
| `@react-pdf/renderer` | Generate PDF invoice/PO |

> Tambah dependency via `npm install` dan update `package.json`. Selalu periksa kompatibilitas dengan React 19 & Next 16.

---

## 12. Catatan Penting Saat Tambah Fitur Baru

### 12.1 Baca Dulu

1. **`AGENTS.md`** — Next.js 16 breaking changes, baca `node_modules/next/dist/docs/` sebelum tulis kode.
2. **`docs/mvp-blueprint.md`** — pola folder & prinsip.
3. **`docs/tender-current-state.md`** — state tender terkini.
4. **`docs/design.md`** — aturan styling public profile (namespace).
5. **Dokumen ini** — konteks keseluruhan.

### 12.2 Jangan Dilakukan

- ❌ Sentuh `features/tender/**`, `features/contractor/**`, `features/supplier/**`, `features/tracking/**` kecuali eksplisit menambah fitur.
- ❌ Ubah `lib/status.ts` tone mapping (kalau perlu status baru, tambahkan entry, jangan ubah yang ada).
- ❌ Bikin CSS yang bocor ke portal/public yang lain (namespace: `cp-*` untuk publik, scope sendiri untuk ERP).
- ❌ Pakai `localStorage` key yang sudah ada (`wip-tender-demo-state-v1`, `wip-portal-mode-v1`).
- ❌ Hapus folder kosong `app/[locale]/admin/`, `messages/`, `features/news/`, `lib/admin/` — itu slot masa depan.

### 12.3 Boleh Dilakukan

- ✅ Tambah file di `app/(portal)/...` atau buat route group baru `(erp)/...`.
- ✅ Tambah komponen UI di `components/ui/` atau `components/shared/` (jangan duplikasi nama yang ada).
- ✅ Tambah utilitas di `lib/`.
- ✅ Tambah fitur baru lengkap di `features/<nama-fitur>/` dengan pola `types.ts` + `service.ts` + `data/*.ts` + `components/*.tsx`.
- ✅ Extend `lib/status.ts` dengan status baru (jangan replace).
- ✅ Tambah `useSyncExternalStore` pattern di file baru untuk state demo (jangan reuse key).

### 12.4 Testing

Belum ada test script. `npm run lint` adalah satu-satunya quality gate. Pertimbangkan tambah test (Vitest + Playwright untuk Mini ERP karena ada logic flow).

---

## 13. Quick-Reference: Lokasi Penting

| Yang Dicari | Lokasi |
|---|---|
| Type tender, proposal, tracking | `features/tender/types.ts`, `features/tracking/types.ts` |
| Data seed | `features/*/data/*.ts` |
| Service function | `features/*/service.ts` |
| State demo client-side | `features/tender/demo-store.ts` |
| Status label & tone | `lib/status.ts` |
| Currency/date formatter | `lib/format.ts` |
| Portal mode & navigation | `lib/navigation.ts` |
| Sidebar/top-nav portal | `components/shared/portal-top-nav.tsx` |
| Layout portal | `components/shared/portal-shell.tsx` |
| Layout public | `app/(public)/layout.tsx` |
| Tokens warna | `app/globals.css` |
| Halaman 404 | `app/not-found.tsx` |
| Logo | `public/logo.png` |
| Blueprint pitching | `docs/mvp-blueprint.md` |
| State tender sekarang | `docs/tender-current-state.md` |
| Skenario demo | `docs/tender-demo-guide.md` |
| Spesifikasi public profile | `docs/design.md` |

---

## 14. Ringkasan Eksekutif (1 menit baca)

- **Apa**: Demo pitching Next.js 16 + React 19 + Tailwind 4 untuk PT WIP kawasan industri.
- **Luar (publik)**: Company profile dengan 12 halaman (home, about, products, development, portfolio, news, contact, dst.) ber-namespace `data-public-profile`.
- **Dalam (portal)**: 3 mode (vendor, internal, guest) dengan tender management (3 paket), contractor/supplier directory (3+ vendor), barcode tracking (sample records).
- **State**: localStorage via `useSyncExternalStore` (`features/tender/demo-store.ts`). Reset demo via tombol di top-nav.
- **Data**: Semua hardcoded di `features/*/data/*.ts`. Service async dengan `simulateLatency()`.
- **Visual**: Maroon accent (`#8f2234`), Tailwind v4, class kustom `.panel`, `.tender-card`, `.btn-*`, namespace `cp-*` untuk publik.
- **Cadangan Mini ERP**:
  - `app/[locale]/admin/(protected)/` sudah ada (folder kosong dengan hint news CRUD).
  - `components/admin/`, `lib/admin/`, `features/news/`, `messages/` — semua folder kosong siap diisi.
  - Pola `useDemoXxx` + `service.ts` + `data/` siap di-reuse.
  - StatusPill, MetricCard, format util siap di-extend.

Saat menambahkan Mini ERP, ikuti pola existing: pisahkan `features/erp/`, pakai `useSyncExternalStore` untuk state demo, tambahkan status di `lib/status.ts`, gunakan Tailwind + utilitas `.panel`/`.tender-card`-style untuk konsistensi, dan baca Next.js 16 docs sebelum pakai API baru.

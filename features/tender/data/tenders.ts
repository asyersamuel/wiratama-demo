import {
  proposalDocumentCatalog,
  type ProposalDocument,
  type TenderFrequentDocument,
  type Tender,
  type TenderProposal,
} from "@/features/tender/types";

function createReadyDocuments(
  includedTypes: ProposalDocument["type"][],
): ProposalDocument[] {
  return proposalDocumentCatalog.map((document) => ({
    type: document.type,
    label: document.label,
    status: includedTypes.includes(document.type) ? "ready" : "missing",
  }));
}

function createProposal(
  proposal: Omit<TenderProposal, "documents"> & {
    documentTypes: ProposalDocument["type"][];
  },
): TenderProposal {
  return {
    proposalId: proposal.proposalId,
    tenderId: proposal.tenderId,
    vendorId: proposal.vendorId,
    vendorName: proposal.vendorName,
    vendorType: proposal.vendorType,
    offeredPrice: proposal.offeredPrice,
    estimatedDurationDays: proposal.estimatedDurationDays,
    proposedStartDate: proposal.proposedStartDate,
    workMethod: proposal.workMethod,
    relevantExperience: proposal.relevantExperience,
    mainEquipment: proposal.mainEquipment,
    manpowerCount: proposal.manpowerCount,
    offerValidityDays: proposal.offerValidityDays,
    vendorNotes: proposal.vendorNotes,
    internalNotes: proposal.internalNotes,
    submittedAt: proposal.submittedAt,
    status: proposal.status,
    score: proposal.score,
    documents: createReadyDocuments(proposal.documentTypes),
  };
}

function createFrequentDocuments(
  documents: Array<{
    id: string;
    label: string;
    kind: TenderFrequentDocument["kind"];
  }>,
): TenderFrequentDocument[] {
  return documents.map((document) => ({
    id: document.id,
    label: document.label,
    kind: document.kind,
  }));
}

export const tenders: Tender[] = [
  {
    id: "jalan-utama-zona-a",
    code: "TND-WIP-001",
    title: "Pembangunan Jalan Utama Kawasan Industri Zona A",
    category: "Pekerjaan Infrastruktur Jalan",
    location: "Kawasan Industri PT WIP, Indramayu",
    zone: "Zona A",
    estimatedValue: 148_000_000_000,
    status: "open",
    deadline: "2026-06-24",
    startDate: "2026-07-15",
    description:
      "Paket pekerjaan jalan utama untuk koridor akses kawasan industri tahap awal, termasuk rigid pavement, bahu jalan, serta koordinasi drainase koridor utilitas.",
    publicSummary:
      "Paket pekerjaan jalan utama kawasan untuk mendukung akses logistik awal dan konektivitas koridor proyek di Zona A.",
    publicValueLabel: "Estimasi indikatif: IDR 120-150 miliar",
    isPublic: true,
    scope: [
      "Pembersihan area kerja dan persiapan subgrade koridor utama.",
      "Pekerjaan rigid pavement dan bahu jalan untuk jalur logistik utama.",
      "Pemasangan marka dasar, curb line, dan perlengkapan keselamatan awal.",
      "Koordinasi interface dengan paket drainase dan utilitas kawasan.",
    ],
    requirements: [
      "Memiliki pengalaman minimal 3 proyek sejenis dalam 5 tahun terakhir.",
      "Mampu melakukan mobilisasi alat utama dan tenaga inti maksimal 14 hari setelah penunjukan.",
      "Menyampaikan metode kerja, rencana mutu, dan rencana K3 tingkat proyek.",
    ],
    requiredDocuments: [
      "Company Profile dan legalitas perusahaan.",
      "Daftar pengalaman proyek sejenis.",
      "Proposal teknis dan metode kerja.",
      "Proposal harga / RAB dan rencana durasi pekerjaan.",
    ],
    frequentDocuments: createFrequentDocuments([
      {
        id: "tor",
        label: "TOR / Kerangka Acuan Kerja",
        kind: "technical",
      },
      {
        id: "rks",
        label: "RKS / Rencana Kerja dan Syarat",
        kind: "technical",
      },
      {
        id: "boq",
        label: "BoQ / Bill of Quantity",
        kind: "commercial",
      },
      {
        id: "jadwal-tender",
        label: "Jadwal Tender",
        kind: "schedule",
      },
    ]),
    relatedParties: [
      {
        contractorId: "indra-konstruksi-mandiri",
        role: "contractor",
        workstream: "Pekerjaan jalan utama kawasan",
      },
      {
        contractorId: "karya-beton-nusantara",
        role: "contractor",
        workstream: "Rigid pavement dan beton koridor",
      },
      {
        contractorId: "prima-infrastruktur-abadi",
        role: "vendor",
        workstream: "Vendor terdaftar untuk koridor infrastruktur",
      },
    ],
    mapPosition: {
      markerLabel: "Zona A - Jalan Utama",
      shortLabel: "Jalan Utama",
      x: 28,
      y: 38,
    },
    milestones: [
      {
        label: "Tender dibuka",
        date: "2026-06-08",
        note: "Dokumen tender mulai dapat dipelajari oleh vendor terdaftar.",
      },
      {
        label: "Penjelasan pekerjaan",
        date: "2026-06-13",
        note: "Tim PT WIP menjelaskan koridor, elevasi awal, dan batas pekerjaan.",
      },
      {
        label: "Batas akhir proposal",
        date: "2026-06-24",
        note: "Proposal teknis dan komersial ditutup untuk proses evaluasi.",
      },
      {
        label: "Evaluasi internal",
        date: "2026-06-27",
        note: "Tim internal mulai membandingkan penawaran yang masuk.",
      },
    ],
    proposals: [
      createProposal({
        proposalId: "PR-WIP-ROAD-IKM-001",
        tenderId: "jalan-utama-zona-a",
        vendorId: "indra-konstruksi-mandiri",
        vendorName: "PT Indra Konstruksi Mandiri",
        vendorType: "contractor",
        offeredPrice: 145_200_000_000,
        estimatedDurationDays: 198,
        proposedStartDate: "2026-07-18",
        workMethod:
          "Pekerjaan dibagi per segmen dengan mobilisasi dua workfront agar koridor utama dapat terbuka bertahap.",
        relevantExperience:
          "Berpengalaman pada pekerjaan jalan kawasan dan drainase tie-in untuk proyek estate development.",
        mainEquipment: ["Asphalt finisher", "Concrete paver", "Excavator 20 ton", "Motor grader"],
        manpowerCount: 122,
        offerValidityDays: 45,
        vendorNotes:
          "Mobilisasi alat utama direncanakan 10 hari setelah surat penunjukan kerja.",
        internalNotes:
          "Perlu review lanjutan pada asumsi percepatan jadwal dan sinkronisasi drainase sisi koridor.",
        submittedAt: "2026-06-21",
        status: "under_review",
        score: 88,
        documentTypes: [
          "proposal_teknis",
          "proposal_harga",
          "company_profile",
          "legal_document",
          "pengalaman_proyek",
          "k3_safety_statement",
          "daftar_peralatan",
        ],
      }),
      createProposal({
        proposalId: "PR-WIP-ROAD-KBN-001",
        tenderId: "jalan-utama-zona-a",
        vendorId: "karya-beton-nusantara",
        vendorName: "PT Karya Beton Nusantara",
        vendorType: "contractor",
        offeredPrice: 146_800_000_000,
        estimatedDurationDays: 205,
        proposedStartDate: "2026-07-20",
        workMethod:
          "Fokus pada rigid pavement bertahap dengan penguatan mutu beton dan kontrol pengecoran per blok kerja.",
        relevantExperience:
          "Memiliki pengalaman pada rigid pavement kawasan industri dan struktur pendukung akses logistik.",
        mainEquipment: ["Concrete paver", "Wheel loader", "Concrete vibrator", "Water tanker"],
        manpowerCount: 114,
        offerValidityDays: 45,
        vendorNotes:
          "Kesiapan batching partner sudah tersedia di radius kurang dari 25 km dari lokasi proyek.",
        internalNotes:
          "Dokumen lengkap. Perlu cek kapasitas percepatan jika pekerjaan overlap dengan drainase koridor.",
        submittedAt: "2026-06-22",
        status: "submitted",
        score: 84,
        documentTypes: [
          "proposal_teknis",
          "proposal_harga",
          "company_profile",
          "legal_document",
          "pengalaman_proyek",
          "k3_safety_statement",
          "daftar_peralatan",
        ],
      }),
    ],
  },
  {
    id: "drainase-utama-zona-a",
    code: "TND-WIP-002",
    title: "Pekerjaan Drainase Utama Zona A",
    category: "Pekerjaan Drainase Kawasan",
    location: "Kawasan Industri PT WIP, Indramayu",
    zone: "Zona A",
    estimatedValue: 64_000_000_000,
    status: "under_review",
    deadline: "2026-07-02",
    startDate: "2026-07-25",
    description:
      "Paket drainase utama untuk mendukung pengendalian limpasan, perlindungan koridor jalan, dan kesiapan plot kawasan tahap awal.",
    publicSummary:
      "Paket drainase utama kawasan untuk mendukung pengendalian limpasan dan kesiapan utilitas dasar di Zona A.",
    publicValueLabel: "Estimasi indikatif: IDR 55-70 miliar",
    isPublic: true,
    scope: [
      "Pekerjaan galian dan saluran utama drainase kawasan.",
      "Pemasangan box culvert dan crossing pada akses internal.",
      "Koordinasi outfall dengan sistem pengelolaan air kawasan.",
    ],
    requirements: [
      "Berpengalaman pada proyek drainase, culvert, atau pengendalian limpasan kawasan industri.",
      "Menyertakan rencana dewatering dan sequencing pekerjaan lapangan.",
      "Menyampaikan struktur organisasi proyek, QC plan, dan K3 plan.",
    ],
    requiredDocuments: [
      "Company Profile dan legalitas perusahaan.",
      "Daftar pengalaman proyek drainase sejenis.",
      "Metode kerja drainase dan sequencing.",
      "Proposal harga / RAB.",
    ],
    frequentDocuments: createFrequentDocuments([
      {
        id: "gambar-teknis",
        label: "Gambar Teknis",
        kind: "technical",
      },
      {
        id: "boq",
        label: "BoQ / Bill of Quantity",
        kind: "commercial",
      },
      {
        id: "aanwijzing",
        label: "Berita Acara Aanwijzing",
        kind: "administrative",
      },
      {
        id: "jadwal-tender",
        label: "Jadwal Tender",
        kind: "schedule",
      },
    ]),
    relatedParties: [
      {
        contractorId: "karya-beton-nusantara",
        role: "contractor",
        workstream: "Drainase utama dan struktur box culvert",
      },
      {
        contractorId: "indra-konstruksi-mandiri",
        role: "contractor",
        workstream: "Site drainage dan pekerjaan sipil kawasan",
      },
    ],
    mapPosition: {
      markerLabel: "Zona A - Drainase",
      shortLabel: "Drainase",
      x: 49,
      y: 58,
    },
    milestones: [
      {
        label: "Tender dibuka",
        date: "2026-06-10",
        note: "Vendor dapat mulai mempelajari kebutuhan teknis paket drainase.",
      },
      {
        label: "Klarifikasi teknis",
        date: "2026-06-18",
        note: "Tim engineering PT WIP menjawab pertanyaan teknis vendor.",
      },
      {
        label: "Evaluasi internal",
        date: "2026-06-26",
        note: "Proposal yang masuk mulai ditinjau oleh procurement dan engineering.",
      },
    ],
    proposals: [
      createProposal({
        proposalId: "PR-WIP-DRN-KBN-001",
        tenderId: "drainase-utama-zona-a",
        vendorId: "karya-beton-nusantara",
        vendorName: "PT Karya Beton Nusantara",
        vendorType: "contractor",
        offeredPrice: 62_000_000_000,
        estimatedDurationDays: 135,
        proposedStartDate: "2026-07-28",
        workMethod:
          "Pekerjaan saluran utama dilakukan per segmen dengan prioritas area crossing dan titik outfall.",
        relevantExperience:
          "Memiliki pengalaman pada struktur drainase beton, culvert, dan rigid pavement support works.",
        mainEquipment: ["Excavator 20 ton", "Concrete mixer", "Crawler crane", "Dewatering pump"],
        manpowerCount: 96,
        offerValidityDays: 45,
        vendorNotes:
          "Tim lapangan tersedia penuh untuk fase box culvert dan saluran utama dalam dua workfront.",
        internalNotes:
          "Masuk shortlist awal untuk paket drainase karena harga kompetitif dan pengalaman cukup relevan.",
        submittedAt: "2026-06-20",
        status: "shortlisted",
        score: 86,
        documentTypes: [
          "proposal_teknis",
          "proposal_harga",
          "company_profile",
          "legal_document",
          "pengalaman_proyek",
          "k3_safety_statement",
          "daftar_peralatan",
        ],
      }),
    ],
  },
  {
    id: "pipa-hdpe-air-bersih",
    code: "TND-WIP-003",
    title: "Pengadaan Pipa HDPE Jaringan Air Bersih",
    category: "Pengadaan Material Utilitas",
    location: "Kawasan Industri PT WIP, Indramayu",
    zone: "Zona Utilitas",
    estimatedValue: 21_500_000_000,
    status: "open",
    deadline: "2026-06-28",
    startDate: "2026-07-10",
    description:
      "Pengadaan pipa HDPE dan fitting untuk mendukung jaringan distribusi air bersih kawasan tahap awal secara bertahap.",
    publicSummary:
      "Pengadaan material utilitas berupa pipa HDPE untuk mendukung jaringan air bersih kawasan tahap awal.",
    publicValueLabel: "Estimasi indikatif: IDR 20-25 miliar",
    isPublic: true,
    scope: [
      "Pengadaan pipa HDPE sesuai spesifikasi dan drawing yang telah disetujui.",
      "Penyusunan rencana pengiriman bertahap sesuai kebutuhan instalasi lapangan.",
      "Penyediaan dokumen mutu material dan sertifikat pendukung.",
    ],
    requirements: [
      "Mampu menyediakan material sesuai spesifikasi teknis dan jadwal pengiriman bertahap.",
      "Menyertakan product data sheet dan sertifikat mutu material.",
      "Memiliki pengalaman pengadaan utilitas atau material infrastruktur sejenis.",
    ],
    requiredDocuments: [
      "Company Profile dan legalitas perusahaan.",
      "Product data sheet dan sertifikat mutu.",
      "Daftar pengalaman pengadaan material sejenis.",
      "Proposal harga / quotation dan jadwal pengiriman.",
    ],
    frequentDocuments: createFrequentDocuments([
      {
        id: "product-spec",
        label: "Gambar Teknis",
        kind: "technical",
      },
      {
        id: "template-harga",
        label: "Template Proposal Harga",
        kind: "commercial",
      },
      {
        id: "form-vendor",
        label: "Form Administrasi Vendor",
        kind: "administrative",
      },
      {
        id: "jadwal-pengiriman",
        label: "Jadwal Tender",
        kind: "schedule",
      },
    ]),
    relatedParties: [
      {
        contractorId: "prima-infrastruktur-abadi",
        role: "vendor",
        workstream: "Vendor terdaftar material utilitas",
      },
      {
        contractorId: "karya-beton-nusantara",
        role: "vendor",
        workstream: "Vendor pendukung pekerjaan beton dan utilitas",
      },
    ],
    mapPosition: {
      markerLabel: "Zona Utilitas - Pipa HDPE",
      shortLabel: "Pipa HDPE",
      x: 73,
      y: 32,
    },
    milestones: [
      {
        label: "RFQ dibuka",
        date: "2026-06-09",
        note: "Vendor dapat mulai mempelajari spesifikasi pengadaan pipa HDPE.",
      },
      {
        label: "Klarifikasi spesifikasi",
        date: "2026-06-16",
        note: "Tim utilitas PT WIP membuka sesi klarifikasi teknis material.",
      },
      {
        label: "Penutupan quotation",
        date: "2026-06-28",
        note: "Batas akhir pengajuan quotation dan dokumen pendukung.",
      },
    ],
    proposals: [],
  },
];

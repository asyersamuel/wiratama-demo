import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { SectionCard } from "@/components/ui/section-card";

const vendorOnboardingSteps = [
  "Siapkan dokumen legal perusahaan.",
  "Kirim email pengajuan vendor ke PT WIP.",
  "PT WIP melakukan verifikasi administrasi.",
  "Jika disetujui, vendor mendapatkan akses portal.",
  "Vendor dapat mengikuti tender.",
];

const vendorDocuments = [
  "Surat Pengajuan Menjadi Vendor",
  "Company Profile",
  "NIB",
  "NPWP",
  "Akta Perusahaan",
  "Sertifikat Badan Usaha / izin terkait",
  "Sertifikat K3 jika ada",
  "Daftar pengalaman proyek",
  "Daftar peralatan utama",
  "Data PIC perusahaan",
  "Rekening perusahaan jika diperlukan",
  "Surat pernyataan kepatuhan/legalitas material jika relevan",
];

const mailtoSubject = "Pengajuan Akun Vendor - [Nama Perusahaan]";
const mailtoBody = `Yth. Tim Procurement PT Wiratama Indramayu Perkasa,

Kami bermaksud mengajukan pendaftaran sebagai vendor/kontraktor untuk dapat mengikuti proses tender di lingkungan PT WIP.

Nama Perusahaan:
NIB:
NPWP:
Bidang Usaha:
Nama PIC:
Jabatan PIC:
Nomor Telepon:
Email:

Bersama email ini kami akan melampirkan dokumen:
1. Company Profile
2. NIB
3. NPWP
4. Akta Perusahaan
5. Sertifikat/Izin Usaha
6. Sertifikat K3 jika ada
7. Daftar pengalaman proyek
8. Daftar peralatan utama

Mohon informasi lebih lanjut terkait proses verifikasi vendor.

Hormat kami,
[Nama PIC]
[Nama Perusahaan]`;

const mailtoHref = `mailto:procurement@wiratama-indramayu.co.id?subject=${encodeURIComponent(
  mailtoSubject,
)}&body=${encodeURIComponent(mailtoBody)}`;

export default function TenderJoinPage() {
  return (
    <div className="space-y-6">
      <PortalPageIntro
        eyebrow="POV Guest"
        title="Ajukan Akun Vendor"
        description="Calon vendor dapat menggunakan halaman ini sebagai panduan singkat untuk mengajukan akses ke portal tender PT WIP melalui email resmi procurement."
      />

      <section className="tender-card p-6 sm:p-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl">
            <p className="code-label">Akses portal vendor</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Langkah singkat untuk bergabung sebagai vendor
            </h2>
            <p className="mt-3 text-sm leading-7 copy-muted">
              Seluruh proses pada MVP ini masih bersifat manual dan demonstratif.
              Tombol di bawah hanya membuka email client lokal dengan template yang
              sudah disiapkan untuk mempermudah pitching alur pengajuan akun vendor.
            </p>
          </div>

          <a href={mailtoHref} className="btn btn-primary">
            Ajukan Akun Vendor via Email
          </a>
        </div>
      </section>

      <SectionCard
        title="Tahapan Pengajuan"
        description="Alur berikut menjelaskan proses sederhana dari sisi calon vendor sebelum memperoleh akses portal."
      >
        <ol className="grid gap-3 text-sm leading-7 text-slate-700">
          {vendorOnboardingSteps.map((step, index) => (
            <li
              key={step}
              className="rounded-[20px] border border-[var(--line)] bg-white/80 px-4 py-4"
            >
              <span className="font-semibold text-slate-950">{index + 1}.</span>{" "}
              {step}
            </li>
          ))}
        </ol>
      </SectionCard>

      <SectionCard
        title="Dokumen yang Perlu Disiapkan"
        description="Checklist berikut dapat dipakai sebagai panduan awal bagi calon vendor sebelum mengirim email pengajuan."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {vendorDocuments.map((document) => (
            <div
              key={document}
              className="rounded-[18px] border border-[var(--line)] bg-white/80 px-4 py-3 text-sm text-slate-700"
            >
              {document}
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Template Email"
        description="Gunakan template berikut melalui tombol email agar format pengajuan vendor tetap konsisten."
      >
        <div className="rounded-[24px] border border-[var(--line)] bg-[#faf8f8] p-5">
          <p className="code-label">Tujuan email</p>
          <p className="mt-2 text-sm font-medium text-slate-900">
            procurement@wiratama-indramayu.co.id
          </p>

          <p className="code-label mt-5">Subject</p>
          <p className="mt-2 text-sm font-medium text-slate-900">{mailtoSubject}</p>

          <p className="code-label mt-5">Body template</p>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-[20px] border border-[var(--line)] bg-white p-4 font-sans text-sm leading-7 text-slate-700">
            {mailtoBody}
          </pre>
        </div>
      </SectionCard>
    </div>
  );
}

import Link from "next/link";
import type { FooterData } from "@/features/company-profile/types";

// Dummy icons using standard SVG paths (lucide-react equivalents)
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2.5 7.1c.3-1.1 1.2-2 2.3-2.3C7.5 4.3 12 4.3 12 4.3s4.5 0 7.2.5c1.1.3 2 1.2 2.3 2.3.5 2.7.5 7.7.5 7.7s0 5-.5 7.7c-.3 1.1-1.2 2-2.3 2.3-2.7.5-7.2.5-7.2.5s-4.5 0-7.2-.5c-1.1-.3-2-1.2-2.3-2.3-.5-2.7-.5-7.7-.5-7.7s0-5 .5-7.7z"/><path d="m10 15 5-3-5-3z"/></svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

type PublicFooterProps = {
  content?: FooterData; // Maintained for prop compatibility with layout.tsx
};

export function PublicFooter({ content }: PublicFooterProps) {
  return (
    <footer className="bg-[#1f1f1f] text-white pt-16 lg:pt-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          
          {/* Column 1: Logo & Follow Us */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <img src="/logo.png" alt="Wiratama Indramayu Perkasa Logo" className="w-20 h-auto object-contain brightness-0 invert" />
              <span className="text-xl font-bold tracking-tight leading-tight">Wiratama Indramayu<br/>Perkasa</span>
            </div>
            
            <div className="flex flex-col gap-4">
              <h3 className="text-[#d6b56d] font-bold tracking-wide text-sm">Follow Us</h3>
              <div className="flex items-center gap-5">
                <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-[#d6b56d] transition-colors">
                  <YoutubeIcon className="w-5 h-5" />
                </a>
                <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-[#d6b56d] transition-colors">
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-[#d6b56d] transition-colors">
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-[#d6b56d] transition-colors">
                  <FacebookIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[#d6b56d] font-bold tracking-wide text-sm">Explore</h3>
            <ul className="flex flex-col gap-4">
              {['Link 1', 'Link 2', 'Lorem', 'Ipsum'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm text-gray-300 hover:text-[#d6b56d] transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Management Building & Suggestion */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <h3 className="text-[#d6b56d] font-bold tracking-wide text-sm">Management Building</h3>
              <ul className="flex flex-col gap-5 text-sm text-gray-300">
                <li className="flex items-start gap-4">
                  <MapPinIcon className="w-5 h-5 shrink-0 text-[#d6b56d]" />
                  <span className="leading-relaxed -mt-0.5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</span>
                </li>
                <li className="flex items-center gap-4">
                  <PhoneIcon className="w-5 h-5 shrink-0 text-[#d6b56d]" />
                  <span>+62 000 0000 0000</span>
                </li>
                <li className="flex items-center gap-4">
                  <MailIcon className="w-5 h-5 shrink-0 text-[#d6b56d]" />
                  <span>dummy@loremipsum.com</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-[#d6b56d] font-bold tracking-wide text-sm">Suggestion & Information</h3>
              <ul className="flex flex-col gap-4 text-sm text-gray-300">
                <li className="flex items-center gap-4">
                  <MailIcon className="w-5 h-5 shrink-0 text-[#d6b56d]" />
                  <span>dummy@loremipsum.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Representative Office */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[#d6b56d] font-bold tracking-wide text-sm">Representative Office</h3>
            <ul className="flex flex-col gap-5 text-sm text-gray-300">
              <li className="flex items-start gap-4">
                <MapPinIcon className="w-5 h-5 shrink-0 text-[#d6b56d]" />
                <span className="leading-relaxed -mt-0.5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</span>
              </li>
              <li className="flex items-center gap-4">
                <PhoneIcon className="w-5 h-5 shrink-0 text-[#d6b56d]" />
                <span>+62 000 0000 0000</span>
              </li>
              <li className="flex items-center gap-4">
                <MailIcon className="w-5 h-5 shrink-0 text-[#d6b56d]" />
                <span>dummy@loremipsum.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-white/10 bg-[#1a1a1a]">
        <div className="max-w-[1440px] mx-auto px-6 py-6 lg:px-10 flex flex-col md:flex-row items-center justify-center">
          <p className="text-sm text-gray-400 text-center">
            @ Copyright Wiratama Indramayu Perkasa 2026
          </p>
        </div>
      </div>
    </footer>
  );
}

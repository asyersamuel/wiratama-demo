import type { Metadata } from "next";
import { PublicPageShell } from "@/components/company-profile/public-page-shell";
import { InteractiveMilestones } from "@/components/about/interactive-milestones";
import { GlobalHero } from "@/components/shared/global-hero";

export const metadata: Metadata = {
  title: "About Us | Lorem Ipsum",
  description: "Lorem ipsum dolor sit amet",
};

function AboutSection() {
  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Lorem Ipsum Sit Amet</h2>
          <div className="w-16 h-1 bg-yellow-500 mb-8"></div>
          <div className="space-y-4 text-slate-600 text-lg">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-500 rounded-2xl transform translate-x-4 translate-y-4 opacity-20"></div>
          <img src="https://picsum.photos/800/1000" alt="About placeholder" className="w-full h-auto rounded-2xl shadow-xl relative z-10 object-cover aspect-[4/5]" />
        </div>
      </div>
    </div>
  );
}

function VisionMissionSection() {
  return (
    <div className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        <div className="space-y-12">
          <div>
            <h3 className="text-3xl font-bold text-yellow-600 mb-4">Vision</h3>
            <p className="text-slate-700 text-lg leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-yellow-600 mb-4">Mission</h3>
            <p className="text-slate-700 text-lg leading-relaxed mb-6">Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.</p>
            <ol className="list-decimal pl-6 space-y-3 text-slate-700 text-lg marker:text-yellow-600 marker:font-bold">
              <li className="pl-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li className="pl-2">Integer nec odio. Praesent libero.</li>
              <li className="pl-2">Sed cursus ante dapibus diam.</li>
              <li className="pl-2">Sed nisi. Nulla quis sem at nibh elementum imperdiet.</li>
              <li className="pl-2">Duis sagittis ipsum. Praesent mauris.</li>
            </ol>
          </div>
        </div>
        <div className="relative hidden lg:flex items-center justify-center">
          {/* Subtle geometric/building silhouette */}
          <svg viewBox="0 0 400 400" className="w-full max-w-lg fill-slate-200/60 drop-shadow-sm">
            <rect x="40" y="150" width="80" height="250" rx="4" />
            <rect x="130" y="80" width="100" height="320" rx="4" />
            <rect x="240" y="200" width="60" height="200" rx="4" />
            <rect x="310" y="120" width="70" height="280" rx="4" />
            <path d="M 130 80 L 180 30 L 230 80 Z" />
            <path d="M 310 120 L 345 80 L 380 120 Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function CoreValuesSection() {
  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Lorem Ipsum Values</h2>
          <div className="w-16 h-1 bg-yellow-500 mx-auto mb-8"></div>
          <p className="text-slate-600 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {[
            { letter: 'L', title: 'Lorem', desc: 'Ipsum dolor sit amet consectetur adipiscing.', color: 'blue-900' },
            { letter: 'O', title: 'Omnis', desc: 'Iste natus error sit voluptatem accusantium.', color: 'yellow-500' },
            { letter: 'R', title: 'Repellendus', desc: 'Temporibus autem quibusdam et aut officiis.', color: 'blue-700' },
            { letter: 'E', title: 'Eligendi', desc: 'Optio cumque nihil impedit quo minus id.', color: 'yellow-600' },
            { letter: 'M', title: 'Maxime', desc: 'Placeat facere possimus omnis voluptas.', color: 'slate-800' },
            { letter: 'I', title: 'Itaque', desc: 'Earum rerum hic tenetur a sapiente delectus.', color: 'blue-800' },
          ].map((item, idx) => {
            const colorMap: Record<string, { text: string, border: string }> = {
              'blue-900': { text: 'text-blue-900', border: 'border-blue-900' },
              'yellow-500': { text: 'text-yellow-500', border: 'border-yellow-500' },
              'blue-700': { text: 'text-blue-700', border: 'border-blue-700' },
              'yellow-600': { text: 'text-yellow-600', border: 'border-yellow-600' },
              'slate-800': { text: 'text-slate-800', border: 'border-slate-800' },
              'blue-800': { text: 'text-blue-800', border: 'border-blue-800' },
            };
            const colors = colorMap[item.color];

            return (
              <div key={idx} className="flex flex-col h-full group cursor-pointer transition-transform hover:-translate-y-2">
                <div className={`text-6xl font-black ${colors.text} mb-4 text-center drop-shadow-sm`}>{item.letter}</div>
                <div className={`bg-slate-50/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border-t-4 ${colors.border} flex-1 relative overflow-hidden transition-shadow hover:shadow-md`}>
                  <div className="absolute -right-6 -bottom-6 text-9xl font-black text-slate-200 opacity-30 z-0 transition-transform group-hover:scale-110">{item.letter}</div>
                  <div className="relative z-10">
                    <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}



function ProfileCard({ data }: { data: any }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl transition-shadow hover:shadow-lg border border-slate-50">
      <div className="relative mb-8 mt-4">
        <div className="absolute inset-0 bg-yellow-50 transform rotate-45 rounded-2xl -z-10 w-36 h-36 -left-2 -top-2"></div>
        <img src={data.img} alt={data.name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md relative z-10" />
      </div>
      <h4 className="text-2xl font-bold text-yellow-600 mb-2">{data.name}</h4>
      <p className="text-slate-600 font-medium uppercase tracking-wider text-sm">{data.title}</p>
    </div>
  );
}

function LeadershipSection() {
  const board1 = [
    { name: 'Lorem Ipsum', title: 'Dolor Sit Amet', img: 'https://i.pravatar.cc/200?img=11' },
    { name: 'Consectetur Adipiscing', title: 'Elit Sed Do', img: 'https://i.pravatar.cc/200?img=12' },
  ];

  const board2 = [
    { name: 'Eiusmod Tempor', title: 'Incididunt Labore', img: 'https://i.pravatar.cc/200?img=33' },
    { name: 'Magna Aliqua', title: 'Ut Enim Ad', img: 'https://i.pravatar.cc/200?img=44' },
    { name: 'Minim Veniam', title: 'Quis Nostrud', img: 'https://i.pravatar.cc/200?img=55' },
  ];

  return (
    <div className="py-16 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Board 1 */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Lorem Ipsum Board 1</h2>
            <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {board1.map((p, i) => <ProfileCard key={i} data={p} />)}
          </div>
        </div>

        {/* Board 2 */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Lorem Ipsum Board 2</h2>
            <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {board2.map((p, i) => <ProfileCard key={i} data={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <PublicPageShell>
      <div className="w-full flex flex-col font-sans">
        <GlobalHero
          eyebrow="ABOUT US"
          title="Lorem Ipsum Dolor Sit Amet"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          hasCTA={false}
        />
        <AboutSection />
        <VisionMissionSection />
        <CoreValuesSection />
        <InteractiveMilestones />
        <LeadershipSection />
      </div>
    </PublicPageShell>
  );
}

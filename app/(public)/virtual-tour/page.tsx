"use client";

import { useState } from "react";
import { GlobalHero } from "@/components/shared/global-hero";
import { PageSection } from "@/components/company-profile/page-section";
import { PublicPageShell } from "@/components/company-profile/public-page-shell";
import { publicPageContent } from "@/features/company-profile/data/pages";

const pageContent = publicPageContent.virtualTour;

type TourZone = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  tone: "gold" | "slate" | "teal" | "emerald" | "copper" | "sand";
  hotspots: Array<{
    id: string;
    label: string;
    top: string;
    left: string;
    targetZone: string;
    tooltip: string;
  }>;
};

const tourZones: TourZone[] = [
  {
    id: "gateway",
    name: "North Gateway & Security Corridor",
    description: "The main entry gate with advanced license plate recognition, custom clearance buffer zones, and aesthetic frontage.",
    tags: ["24/7 Security", "Logistics Control", "Aesthetic Frontage"],
    tone: "gold",
    hotspots: [
      {
        id: "hs-to-commercial",
        label: "To Commercial Core",
        top: "45%",
        left: "70%",
        targetZone: "commercial",
        tooltip: "Click to travel to the Central Commercial Core",
      },
      {
        id: "hs-to-logistics",
        label: "To Logistics Yards",
        top: "50%",
        left: "30%",
        targetZone: "logistics",
        tooltip: "Click to travel to the logistics and warehousing zone",
      },
    ],
  },
  {
    id: "logistics",
    name: "Logistics Hub & Truck Staging",
    description: "High-clearance warehouse facilities, cross-docking yards, and wide internal roadways designed to keep commercial flow separated and fluent.",
    tags: ["Cross-docking", "12m Clear Height", "Heavy Vehicle Access"],
    tone: "teal",
    hotspots: [
      {
        id: "hs-to-gateway",
        label: "Back to Gateway",
        top: "40%",
        left: "15%",
        targetZone: "gateway",
        tooltip: "Return to the main entrance gateway",
      },
      {
        id: "hs-to-utility",
        label: "To Utility Spine",
        top: "48%",
        left: "80%",
        targetZone: "utility",
        tooltip: "View energy, water, and treatment infrastructure",
      },
    ],
  },
  {
    id: "commercial",
    name: "Central Commercial Core",
    description: "Multi-use commercial space, meeting centers, food blocks, and administrative offices supporting tenant needs.",
    tags: ["Offices", "Dining & Amenities", "Meeting Rooms"],
    tone: "copper",
    hotspots: [
      {
        id: "hs-to-gateway",
        label: "To Main Gate",
        top: "55%",
        left: "20%",
        targetZone: "gateway",
        tooltip: "View the arrival sequence",
      },
      {
        id: "hs-to-residential",
        label: "To Residential Cluster",
        top: "42%",
        left: "60%",
        targetZone: "residential",
        tooltip: "Go to workforce accommodation and housing",
      },
    ],
  },
  {
    id: "utility",
    name: "Utility Infrastructure Spine",
    description: "Integrated electricity substations, wastewater recycling networks, and fiber-optic communication conduits built for operational compliance.",
    tags: ["Redundant Power", "Wastewater Treatment", "ESG Compliance"],
    tone: "slate",
    hotspots: [
      {
        id: "hs-to-logistics",
        label: "To Logistics Hub",
        top: "40%",
        left: "25%",
        targetZone: "logistics",
        tooltip: "Go to warehousing and distribution yards",
      },
      {
        id: "hs-to-industrial",
        label: "To Industrial Plots",
        top: "45%",
        left: "75%",
        targetZone: "industrial",
        tooltip: "Explore ready-to-build manufacturing plots",
      },
    ],
  },
  {
    id: "industrial",
    name: "Manufacturing & Industrial Plots",
    description: "Ready-to-build, pre-leveled ground plots with high-capacity utility connections and flexible zoning for custom factories.",
    tags: ["Flexible Zoning", "Soil Compaction Done", "High Utility Draw"],
    tone: "sand",
    hotspots: [
      {
        id: "hs-to-utility",
        label: "To Utility Spine",
        top: "52%",
        left: "15%",
        targetZone: "utility",
        tooltip: "View utility connection nodes",
      },
      {
        id: "hs-to-commercial",
        label: "To Commercial Core",
        top: "38%",
        left: "85%",
        targetZone: "commercial",
        tooltip: "Walk to offices and executive facilities",
      },
    ],
  },
  {
    id: "residential",
    name: "Executive & Workforce Housing",
    description: "Self-contained residential clusters providing comfortable lodging, retail support, and green paths close to work.",
    tags: ["Workforce Lodging", "Green Trails", "Convenience Shops"],
    tone: "emerald",
    hotspots: [
      {
        id: "hs-to-commercial",
        label: "Back to Commercial",
        top: "48%",
        left: "30%",
        targetZone: "commercial",
        tooltip: "Go back to the central business block",
      },
    ],
  },
];

export default function VirtualTourPage() {
  const [activeZoneId, setActiveZoneId] = useState("gateway");
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  const activeZone = tourZones.find((z) => z.id === activeZoneId) || tourZones[0];

  const handleRotateLeft = () => setRotation((prev) => prev - 15);
  const handleRotateRight = () => setRotation((prev) => prev + 15);
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.8));
  const handleReset = () => {
    setRotation(0);
    setZoom(1);
  };

  const gradientClasses = {
    gold: "from-[#6e5622] via-[#a38038] to-[#121922]",
    teal: "from-[#0d4548] via-[#1c646b] to-[#0d141d]",
    copper: "from-[#5a3615] via-[#94622f] to-[#1a110b]",
    slate: "from-[#1a2837] via-[#415162] to-[#0c121a]",
    sand: "from-[#524a3e] via-[#75695b] to-[#1b1e24]",
    emerald: "from-[#13442f] via-[#246b4e] to-[#0c1713]",
  };

  return (
    <PublicPageShell>
      <GlobalHero
        eyebrow="VIRTUAL TOUR"
        title="Lorem Ipsum Dolor Sit Amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        hasCTA={false}
      />

      <PageSection
        eyebrow="Interactive 360° Tour"
        title="Digital Site Walkthrough"
        description="Select a development zone from the list or click the active hotspots inside the viewer to experience the industrial estate's circulation flow."
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main 360 Viewer Block */}
          <div className="flex flex-col gap-4">
            <div className="relative h-[480px] w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-200/50 shadow-xl group">
              
              {/* Simulated 360° background projection */}
              <div 
                className={`absolute inset-0 bg-gradient-to-r ${gradientClasses[activeZone.tone]} transition-all duration-700 ease-in-out`}
                style={{
                  backgroundPosition: `${rotation}px center`,
                  transform: `scale(${zoom})`,
                  backgroundSize: "200% 100%",
                }}
              >
                {/* Visual mesh overlay to simulate 3D projection */}
                <div 
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.4) 100%),
                      linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: "100% 100%, 40px 40px, 40px 40px",
                  }}
                />

                {/* Decorative architectural grid markers to visualize rotation */}
                <div className="absolute inset-0 flex items-center justify-around text-white/5 font-mono text-9xl select-none pointer-events-none">
                  <span>W</span>
                  <span>I</span>
                  <span>P</span>
                </div>
              </div>

              {/* View Overlay Title */}
              <div className="absolute top-5 left-5 z-10 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs font-semibold uppercase tracking-wider border border-white/10">
                Active View: {activeZone.name}
              </div>

              {/* Hotspots */}
              {activeZone.hotspots.map((hs) => (
                <button
                  key={hs.id}
                  onClick={() => {
                    setActiveZoneId(hs.targetZone);
                    handleReset();
                  }}
                  onMouseEnter={() => setHoveredHotspot(hs.id)}
                  onMouseLeave={() => setHoveredHotspot(null)}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group/hs cursor-pointer"
                  style={{ top: hs.top, left: hs.left }}
                >
                  <div className="relative">
                    {/* Ring animation */}
                    <span className="absolute -inset-2 rounded-full bg-[#d6b56d]/40 animate-ping opacity-75" />
                    
                    {/* Core Point */}
                    <div className="w-5 h-5 rounded-full bg-white border-4 border-[#d6b56d] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover/hs:scale-125">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                    </div>

                    {/* Tooltip Overlay */}
                    <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/95 text-white border border-slate-700/60 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 shadow-md ${
                      hoveredHotspot === hs.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                    }`}>
                      <p className="font-semibold text-[#d6b56d]">{hs.label}</p>
                      <p className="text-[10px] text-slate-300 mt-0.5">{hs.tooltip}</p>
                    </div>
                  </div>
                </button>
              ))}

              {/* Viewer Controls */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10 text-white">
                <button 
                  onClick={handleRotateLeft} 
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  title="Look Left"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                </button>
                
                <button 
                  onClick={handleRotateRight} 
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  title="Look Right"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </button>

                <div className="w-px h-4 bg-white/20 mx-1" />

                <button 
                  onClick={handleZoomIn} 
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  title="Zoom In"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" x2="12" y1="5" y2="19"/>
                    <line x1="5" x2="19" y1="12" y2="12"/>
                  </svg>
                </button>

                <button 
                  onClick={handleZoomOut} 
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  title="Zoom Out"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" x2="19" y1="12" y2="12"/>
                  </svg>
                </button>

                <button 
                  onClick={handleReset} 
                  className="px-3 py-1 hover:bg-white/10 rounded-full text-xs font-semibold transition-colors"
                  title="Reset view"
                >
                  Reset
                </button>
              </div>

              {/* Compass Ring Indicator */}
              <div className="absolute bottom-5 right-5 z-10 w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center select-none pointer-events-none">
                <div 
                  className="w-8 h-8 rounded-full border-t-2 border-t-[#d6b56d] border-white/5 transition-transform duration-200"
                  style={{ transform: `rotate(${rotation}deg)` }}
                />
              </div>

            </div>

            {/* Selected Zone Description Box */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">{activeZone.name}</h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">{activeZone.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {activeZone.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-slate-50 border border-slate-200/60 text-slate-700 px-3 py-1 rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-slate-900 px-1">Development Zones</h3>
            
            <div className="flex flex-col gap-3">
              {tourZones.map((zone) => {
                const isActive = zone.id === activeZoneId;
                
                return (
                  <button
                    key={zone.id}
                    onClick={() => {
                      setActiveZoneId(zone.id);
                      handleReset();
                    }}
                    className={`text-left p-4 rounded-2xl border transition-all flex flex-col gap-1 select-none ${
                      isActive 
                        ? "bg-white border-[#d6b56d] shadow-[0_4px_12px_rgba(214,181,109,0.15)] translate-x-1" 
                        : "bg-white/50 border-slate-200/80 hover:border-slate-300 hover:bg-white/80"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold uppercase tracking-wider ${
                        isActive ? "text-[#d6b56d]" : "text-slate-500"
                      }`}>
                        Zone {zone.id.toUpperCase()}
                      </span>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d6b56d]" />
                      )}
                    </div>
                    
                    <span className="text-sm font-bold text-slate-900 mt-1 leading-tight">
                      {zone.name.split(" & ")[0].split(" - ")[0]}
                    </span>
                    
                    <span className="text-xs text-slate-500 line-clamp-2 leading-normal mt-0.5">
                      {zone.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </PageSection>

    </PublicPageShell>
  );
}

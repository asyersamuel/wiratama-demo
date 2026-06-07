"use client";

import { useState } from "react";

const MILESTONES = [
  {
    year: 2020,
    title: "Lorem Ipsum Dolor Sit Amet",
    points: [
      "Consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      "Labore et dolore magna aliqua ut enim ad minim veniam.",
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    ],
    image: "https://picsum.photos/800/600?random=1",
  },
  {
    year: 2021,
    title: "Ut Enim Ad Minim Veniam",
    points: [
      "Duis aute irure dolor in reprehenderit in voluptate velit.",
      "Esse cillum dolore eu fugiat nulla pariatur.",
      "Excepteur sint occaecat cupidatat non proident.",
    ],
    image: "https://picsum.photos/800/600?random=2",
  },
  {
    year: 2022,
    title: "Sed Ut Perspiciatis Unde",
    points: [
      "Omnis iste natus error sit voluptatem accusantium doloremque.",
      "Laudantium, totam rem aperiam, eaque ipsa quae ab illo.",
      "Inventore veritatis et quasi architecto beatae vitae.",
    ],
    image: "https://picsum.photos/800/600?random=3",
  },
  {
    year: 2023,
    title: "Nemo Enim Ipsam Voluptatem",
    points: [
      "Quia voluptas sit aspernatur aut odit aut fugit.",
      "Sed quia consequuntur magni dolores eos qui ratione.",
      "Voluptatem sequi nesciunt neque porro quisquam est.",
    ],
    image: "https://picsum.photos/800/600?random=4",
  },
  {
    year: 2024,
    title: "Qui In Ea Voluptate Velit",
    points: [
      "Esse quam nihil molestiae consequatur, vel illum qui dolorem.",
      "Eum fugiat quo voluptas nulla pariatur at vero eos.",
      "Et accusamus et iusto odio dignissimos ducimus qui.",
    ],
    image: "https://picsum.photos/800/600?random=5",
  },
];

export function InteractiveMilestones() {
  const [activeYear, setActiveYear] = useState(MILESTONES[0].year);

  const activeData = MILESTONES.find((m) => m.year === activeYear) || MILESTONES[0];

  return (
    <div className="py-16 md:py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Lorem Ipsum Milestones</h2>
          <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        {/* Active Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          <div className="order-2 lg:order-1">
            <div className="text-6xl md:text-7xl font-bold text-yellow-500 mb-4 drop-shadow-sm transition-all duration-300">
              {activeData.year}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 transition-all duration-300">
              {activeData.title}
            </h3>
            <ul className="space-y-4 text-lg">
              {activeData.points.map((bullet, i) => (
                <li key={i} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-yellow-500 mr-4 mt-2.5 flex-shrink-0"></span>
                  <span className="text-slate-700">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="absolute inset-0 bg-slate-200 rounded-2xl transform translate-x-4 translate-y-4 shadow-sm"></div>
            <img 
              key={activeData.year}
              src={activeData.image} 
              alt={`Milestone ${activeData.year}`} 
              className="w-full h-auto rounded-2xl shadow-lg relative z-10 object-cover aspect-video animate-in fade-in duration-500" 
            />
          </div>
        </div>

        {/* Timeline Navigation Bar (Bottom) */}
        <div className="max-w-4xl mx-auto mt-12 relative">
          {/* The horizontal line running behind the buttons */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-slate-200 z-0"></div>
          
          {/* The scrollable row of buttons */}
          <div className="relative z-10 flex items-center justify-between overflow-x-auto gap-4 py-4 px-2" style={{ scrollbarWidth: "none" }}>
            {MILESTONES.map((m) => {
              const isActive = m.year === activeYear;
              return (
                <button
                  key={m.year}
                  onClick={() => setActiveYear(m.year)}
                  className={`flex-shrink-0 w-24 py-3 text-center font-bold text-lg rounded-md transition-all cursor-pointer ${
                    isActive
                      ? "bg-yellow-500 text-white shadow-md border-2 border-yellow-500 scale-105"
                      : "bg-white text-slate-700 border-2 border-slate-200 hover:border-yellow-500"
                  }`}
                >
                  {m.year}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

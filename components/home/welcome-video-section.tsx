import React from "react";
import { Play } from "lucide-react";

export function WelcomeVideoSection() {
  return (
    <section className="bg-slate-900 py-16 lg:py-20 border-t-4 border-yellow-600">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          
          {/* Left: Title */}
          <div className="lg:w-1/3 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight">
              Welcome to <br />
              <strong className="font-bold">Lorem Ipsum</strong>
            </h2>
          </div>

          {/* Center: Play Button */}
          <div className="lg:w-1/3 flex justify-center">
            <button 
              className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-yellow-600 flex items-center justify-center group hover:bg-yellow-600 transition-colors duration-500"
              aria-label="Play welcome video"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-yellow-600 rounded-full flex items-center justify-center group-hover:scale-90 transition-transform duration-500">
                <Play className="text-white w-8 h-8 ml-2" fill="currentColor" />
              </div>
            </button>
          </div>

          {/* Right: Description */}
          <div className="lg:w-1/3 text-center lg:text-left">
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

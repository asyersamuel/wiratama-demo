import React from "react";

export function AboutSection() {
  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Lorem Ipsum Dolor
            </h2>
            <div className="w-16 h-1 bg-yellow-600 mb-8 rounded-full" />
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          {/* Right Column: Visual Mask */}
          <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex justify-center items-end gap-2 md:gap-4 overflow-hidden group">
            {/* Using 3 separate blocks that act as masks/silhouettes */}
            <div 
              className="w-1/3 h-[70%] bg-cover bg-center rounded-t-lg transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: 'url("https://picsum.photos/600/800?random=2")' }}
            />
            <div 
              className="w-1/3 h-[100%] bg-cover bg-center rounded-t-lg transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: 'url("https://picsum.photos/600/1000?random=3")' }}
            />
            <div 
              className="w-1/3 h-[85%] bg-cover bg-center rounded-t-lg transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: 'url("https://picsum.photos/600/900?random=4")' }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}

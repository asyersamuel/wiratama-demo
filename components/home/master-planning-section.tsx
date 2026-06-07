import React from "react";

export function MasterPlanningSection() {
  return (
    <section className="bg-slate-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Lorem Ipsum Master Plan
            </h2>
            <div className="w-16 h-1 bg-yellow-600 mb-8 rounded-full" />
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>

          {/* Right Column: Video Embed */}
          <div className="order-1 lg:order-2 relative">
            {/* Golden offset border/shadow */}
            <div className="absolute inset-0 bg-yellow-600 translate-x-4 translate-y-4 rounded-xl" />
            
            {/* Video Container */}
            <div className="relative bg-white rounded-xl overflow-hidden aspect-video shadow-lg">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&showinfo=0&controls=1" 
                title="Placeholder Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

import React from "react";

export function ProductsSection() {
  const products = [
    { title: "Lorem Ipsum 1", bgImage: "https://picsum.photos/600/800?random=11" },
    { title: "Lorem Ipsum 2", bgImage: "https://picsum.photos/600/800?random=12" },
    { title: "Lorem Ipsum 3", bgImage: "https://picsum.photos/600/800?random=13" },
    { title: "Lorem Ipsum 4", bgImage: "https://picsum.photos/600/800?random=14" },
  ];

  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Lorem Ipsum Products
          </h2>
          <div className="w-16 h-1 bg-yellow-600 mx-auto rounded-full" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <div 
              key={idx}
              className="group relative w-full aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url("${product.bgImage}")` }}
              />

              {/* Default State: Dark Gradient + Title at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                <h3 className="text-xl font-bold text-white">{product.title}</h3>
              </div>

              {/* Hover State: Blue Overlay + Content */}
              <div className="absolute inset-0 bg-slate-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-center p-8">
                <h3 className="text-2xl font-bold text-white mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {product.title}
                </h3>
                <p className="text-white/80 text-sm md:text-base transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

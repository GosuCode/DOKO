"use client";

import DisplayImage from "../display-image";

function ProductImage({ image, name }: { image: string; name: string }) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl transform rotate-2 group-hover:rotate-3 transition-transform duration-300"></div>
      <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden group-hover:shadow-3xl transition-all duration-300">
        <div className="relative h-96 md:h-[500px]">
          <DisplayImage
            public_id={image}
            alt={name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductImage;

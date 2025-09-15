"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductImagesGridProps {
  images: string[];
}

export default function ProductImagesGrid({ images }: ProductImagesGridProps) {
  const [selectedImage, setSelectedImage] = useState(images.length > 0 ? images[0] : "/images/common/placeholder.svg");
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div id="image-grid" className="flex flex-row">
      {/* Left column: small images */}
      {images.length > 0 && (
      <div id="image-grid-miniatures" className="flex flex-col gap-4 mr-6">
        {images.slice(0, 6).map((source, index) => (
          <button key={source} className="w-20 h-20 bg-center bg-cover bg-no-repeat" onClick={() => handleImageClick(source)}>
            <Image
              src={source}
              alt={`Vista ${index + 1}`}
              width={80}
              height={80}
              // className="w-auto object-cover"
            />
          </button>
        ))}
      </div>
      )}
      {/* Right column: preview image */}
      <div id="image-grid-preview" className="flex w-full aspect-square items-center">
        <Image
          src={selectedImage}
          alt={"Product Image"}
          width={600}
          height={600}
          // className="w-full object-cover"
        />
      </div>
    </div>
  );
};
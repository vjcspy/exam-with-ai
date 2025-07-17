'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageTextToggleProps {
  imageSrc: string;
  text: string;
  imageAlt?: string;
  className?: string;
}

export function ImageTextToggle({
  imageSrc,
  text,
  imageAlt = 'Image',
  className = '',
}: ImageTextToggleProps) {
  const [showImage, setShowImage] = useState(true);

  const toggleView = () => {
    setShowImage(!showImage);
  };

  return (
    <div
      className={`w-full h-full flex items-center justify-center cursor-pointer ${className}`}
      onClick={toggleView}
    >
      {showImage ? (
        <div className="relative w-full h-full">
          <Image src={imageSrc} alt={imageAlt} fill className="object-contain" priority />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center p-4 overflow-auto">
          <p className="text-foreground">{text}</p>
        </div>
      )}
    </div>
  );
}

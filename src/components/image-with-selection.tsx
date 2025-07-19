'use client';

import Image from 'next/image';

import { useAppSelector } from '@/lib/redux/store';

interface ImageWithSelectionProps {
  imageSrc: string;
  imageAlt?: string;
  className?: string;
}

export function ImageWithSelection({
  imageSrc,
  imageAlt = 'Image',
  className = '',
}: ImageWithSelectionProps) {
  const selection = useAppSelector((state) => state.alignment);
  // Calculate selection overlay position and size
  const selectionStyle = {
    top: `${selection.top}%`,
    right: `${100 - selection.right}%`,
    bottom: `${100 - selection.bottom}%`,
    left: `${selection.left}%`,
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Image src={imageSrc} alt={imageAlt} fill className="object-contain" priority />

      {/* Selection overlay */}
      <div className="absolute inset-0">
        {/* Top overlay */}
        <div
          className="absolute left-0 right-0 bg-black/50"
          style={{ top: 0, bottom: `calc(100% - ${selection.top}%)` }}
        />

        {/* Right overlay */}
        <div
          className="absolute top-0 bottom-0 bg-black/50"
          style={{ left: `${selection.right}%`, right: 0 }}
        />

        {/* Bottom overlay */}
        <div
          className="absolute left-0 right-0 bg-black/50"
          style={{ top: `${selection.bottom}%`, bottom: 0 }}
        />

        {/* Left overlay */}
        <div
          className="absolute top-0 bottom-0 bg-black/50"
          style={{ left: 0, right: `calc(100% - ${selection.left}%)` }}
        />

        {/* Selection border */}
        <div
          className="absolute border border-primary pointer-events-none"
          style={selectionStyle}
        />
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';

import { toggleImage } from '@/lib/redux/slices/uiSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';

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
  const dispatch = useAppDispatch();
  const showImage = useAppSelector((state) => state.ui.showImage);

  const toggleView = () => {
    dispatch(toggleImage());
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

'use client';

import { useAppSelector } from '@/lib/redux/store';

import { ImageOverlay } from './image-overlay';

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

  return (
    <ImageOverlay
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      className={className}
      selection={selection}
    />
  );
}

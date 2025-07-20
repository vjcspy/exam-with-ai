'use client';

import { toggleImage } from '@/lib/redux/slices/uiSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';

import { ImageOverlay } from './image-overlay';

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
  const selection = useAppSelector((state) => state.alignment);

  const toggleView = () => {
    dispatch(toggleImage());
  };

  return (
    <div
      className={`w-full h-full flex items-center justify-center cursor-pointer ${className}`}
      onClick={toggleView}
    >
      {showImage ? (
        <ImageOverlay
          imageSrc={imageSrc}
          imageAlt={imageAlt}
          selection={selection}
          pointerEventsNone={true}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center p-4 overflow-auto">
          <p className="text-foreground">{text}</p>
        </div>
      )}
    </div>
  );
}

'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { toggleImage } from '@/lib/redux/slices/uiSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';

interface ImageTextToggleProps {
  imageSrc: string;
  text: string;
  imageAlt?: string;
  className?: string;
}

interface ImageDimensions {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
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

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions | null>(null);

  const calculateImageDimensions = () => {
    if (!containerRef.current || !imageRef.current) return;

    const container = containerRef.current;
    const image = imageRef.current;

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;

    if (imageWidth === 0 || imageHeight === 0) return;

    // Calculate the actual displayed size using object-contain logic
    const containerRatio = containerWidth / containerHeight;
    const imageRatio = imageWidth / imageHeight;

    let displayWidth, displayHeight, offsetX, offsetY;

    if (imageRatio > containerRatio) {
      // Image is wider relative to container - fit to width
      displayWidth = containerWidth;
      displayHeight = containerWidth / imageRatio;
      offsetX = 0;
      offsetY = (containerHeight - displayHeight) / 2;
    } else {
      // Image is taller relative to container - fit to height
      displayWidth = containerHeight * imageRatio;
      displayHeight = containerHeight;
      offsetX = (containerWidth - displayWidth) / 2;
      offsetY = 0;
    }

    setImageDimensions({
      width: displayWidth,
      height: displayHeight,
      offsetX,
      offsetY,
    });
  };

  useEffect(() => {
    const handleResize = () => {
      calculateImageDimensions();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const handleImageLoad = () => {
    calculateImageDimensions();
  };

  // Calculate selection overlay position and size based on actual image dimensions
  const getOverlayStyles = () => {
    if (!imageDimensions || !containerRef.current) return {};

    const { width, height, offsetX, offsetY } = imageDimensions;
    const container = containerRef.current;

    const selectionLeft = (selection.left / 100) * width + offsetX;
    const selectionTop = (selection.top / 100) * height + offsetY;
    const selectionRight = (selection.right / 100) * width + offsetX;
    const selectionBottom = (selection.bottom / 100) * height + offsetY;

    return {
      selectionStyle: {
        left: `${selectionLeft}px`,
        top: `${selectionTop}px`,
        right: `${container.offsetWidth - selectionRight}px`,
        bottom: `${container.offsetHeight - selectionBottom}px`,
      },
      overlayStyles: {
        top: {
          left: `${offsetX}px`,
          right: `${container.offsetWidth - offsetX - width}px`,
          top: `${offsetY}px`,
          bottom: `${container.offsetHeight - selectionTop}px`,
        },
        right: {
          left: `${selectionRight}px`,
          right: `${container.offsetWidth - offsetX - width}px`,
          top: `${offsetY}px`,
          bottom: `${container.offsetHeight - offsetY - height}px`,
        },
        bottom: {
          left: `${offsetX}px`,
          right: `${container.offsetWidth - offsetX - width}px`,
          top: `${selectionBottom}px`,
          bottom: `${container.offsetHeight - offsetY - height}px`,
        },
        left: {
          left: `${offsetX}px`,
          right: `${container.offsetWidth - selectionLeft}px`,
          top: `${offsetY}px`,
          bottom: `${container.offsetHeight - offsetY - height}px`,
        },
      },
    };
  };

  const toggleView = () => {
    dispatch(toggleImage());
  };

  // Only calculate overlay styles when showing image
  const overlayData = showImage ? getOverlayStyles() : {};

  return (
    <div
      className={`w-full h-full flex items-center justify-center cursor-pointer ${className}`}
      onClick={toggleView}
    >
      {showImage ? (
        <div ref={containerRef} className="relative w-full h-full">
          <Image
            ref={imageRef}
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
            priority
            onLoad={handleImageLoad}
          />

          {/* Selection overlay - read-only */}
          {imageDimensions && overlayData.overlayStyles && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Top overlay */}
              <div className="absolute bg-black/30" style={overlayData.overlayStyles.top} />

              {/* Right overlay */}
              <div className="absolute bg-black/30" style={overlayData.overlayStyles.right} />

              {/* Bottom overlay */}
              <div className="absolute bg-black/30" style={overlayData.overlayStyles.bottom} />

              {/* Left overlay */}
              <div className="absolute bg-black/30" style={overlayData.overlayStyles.left} />

              {/* Selection border */}
              <div
                className="absolute border border-primary/70"
                style={overlayData.selectionStyle}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center p-4 overflow-auto">
          <p className="text-foreground">{text}</p>
        </div>
      )}
    </div>
  );
}

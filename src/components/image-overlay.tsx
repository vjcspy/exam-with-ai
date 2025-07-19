'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface ImageOverlayProps {
  imageSrc: string;
  imageAlt?: string;
  className?: string;
  selection: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  overlayOpacity?: number;
  borderClassName?: string;
  pointerEventsNone?: boolean;
}

export interface ImageDimensions {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}

export function ImageOverlay({
  imageSrc,
  imageAlt = 'Image',
  className = '',
  selection,
  overlayOpacity = 50,
  borderClassName = 'border-primary',
  pointerEventsNone = false,
}: ImageOverlayProps) {
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

  const overlayData = getOverlayStyles();
  const overlayClass = `bg-black/${overlayOpacity}`;
  const pointerEventsClass = pointerEventsNone ? 'pointer-events-none' : '';

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <Image
        ref={imageRef}
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-contain"
        priority
        onLoad={handleImageLoad}
      />

      {/* Selection overlay */}
      {imageDimensions && overlayData.overlayStyles && (
        <div className={`absolute inset-0 ${pointerEventsClass}`}>
          {/* Top overlay */}
          <div className={`absolute ${overlayClass}`} style={overlayData.overlayStyles.top} />

          {/* Right overlay */}
          <div className={`absolute ${overlayClass}`} style={overlayData.overlayStyles.right} />

          {/* Bottom overlay */}
          <div className={`absolute ${overlayClass}`} style={overlayData.overlayStyles.bottom} />

          {/* Left overlay */}
          <div className={`absolute ${overlayClass}`} style={overlayData.overlayStyles.left} />

          {/* Selection border */}
          <div
            className={`absolute border ${borderClassName}`}
            style={overlayData.selectionStyle}
          />
        </div>
      )}
    </div>
  );
}

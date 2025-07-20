'use client';

import { useJobAnswerData } from '@/hooks/useJobAnswerData';
import { toggleImage } from '@/lib/redux/slices/uiSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';

import { ImageOverlay } from './image-overlay';

interface ImageTextToggleProps {
  imageSrc: string;
  imageAlt?: string;
  className?: string;
}

export function ImageTextToggle({
  imageSrc,
  imageAlt = 'Image',
  className = '',
}: ImageTextToggleProps) {
  const dispatch = useAppDispatch();
  const showImage = useAppSelector((state) => state.ui.showImage);
  const selection = useAppSelector((state) => state.alignment);
  const {
    state: { ragAnswer, aiAnswer, question, errorMessage, processMessage },
  } = useJobAnswerData();

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
        <div className="w-full h-full flex flex-col p-4 overflow-auto">
          {/* Question section - 60% height with internal scroll */}
          <div className="flex-[0.6] flex items-start justify-start overflow-hidden">
            <div className="w-full h-full overflow-auto">
              <p className="text-foreground text-sm text-left whitespace-pre-line">
                {question ? question : processMessage}
              </p>
            </div>
          </div>
          {/* RAG section - 20% height */}
          <div className="flex-[0.1] flex items-start justify-start">
            {ragAnswer && (
              <p className="text-green-500 text-left whitespace-pre-line">Answer: {ragAnswer}</p>
            )}
          </div>
          {/* AI section - 20% height */}
          <div className="flex-[0.1] flex items-start justify-start">
            {aiAnswer && (
              <p className="text-green-500 text-left whitespace-pre-line">AI: {aiAnswer}</p>
            )}
          </div>
          <div className="flex-[0.2] flex items-start justify-start">
            {errorMessage && (
              <p className="text-red-500 text-left whitespace-pre-line">Error: {errorMessage}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

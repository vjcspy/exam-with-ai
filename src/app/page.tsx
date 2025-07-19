'use client';

import { AlignCenter, BrainCircuit, Camera, MessageSquare } from 'lucide-react';
import { useEffect, useMemo } from 'react';

import { ActionButton } from '@/components/action-button';
import { ImageAlignment } from '@/components/image-alignment';
import { ImageTextToggle } from '@/components/image-text-toggle';
import { ImageWithSelection } from '@/components/image-with-selection';
import { NavigationBar } from '@/components/navigation-bar';
import { useCurrentImage } from '@/hooks/useCurrentImage';
import { useImageAlignmentActions } from '@/hooks/useImageAlignmentActions';
import { useJobActions } from '@/hooks/useJobActions';
import { setShowAlignment, toggleAlignment } from '@/lib/redux/slices/uiSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { jobProcessor } from '@/lib/services/JobProcessor';

export default function Home() {
  const dispatch = useAppDispatch();
  const { showAlignment } = useAppSelector((state) => state.ui);
  const alignment = useAppSelector((state) => state.alignment);
  const { sampleText } = useAppSelector((state) => state.content);
  const { job } = useAppSelector((state) => state.job);
  const currentImage = useCurrentImage();
  const { capture, loading } = useJobActions();

  const {
    actions: { handleAlignmentChange },
  } = useImageAlignmentActions();

  const handleToggleAlignment = () => {
    dispatch(toggleAlignment());
  };

  useEffect(() => {
    // Provide the dispatch function to the JobProcessor
    jobProcessor.setDispatch(dispatch);
    jobProcessor.start();
  }, [dispatch]);

  const ImageBlock = useMemo(() => {
    if (!currentImage) return <>{JSON.stringify(job, null, 2)}</>;
    if (showAlignment) {
      return <ImageWithSelection imageSrc={currentImage} />;
    } else {
      return <ImageTextToggle imageSrc={currentImage} text={sampleText} />;
    }
  }, [showAlignment, sampleText, currentImage, job]);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Main content - 50/50 split */}
      <div className="flex-1 flex flex-col pb-16">
        {/* Top half - Image/Text */}
        <div className="h-1/2 p-4">{ImageBlock}</div>

        {/* Bottom half - Buttons or Alignment */}
        <div className="h-1/2 p-4">
          {showAlignment ? (
            <ImageAlignment
              onAlignmentChange={handleAlignmentChange}
              initialAlignment={alignment}
              onCancel={() => dispatch(setShowAlignment(false))}
              onSave={() => {
                // In a real application, you might want to do something with the alignment
                console.log('Saving alignment:', alignment);
                dispatch(setShowAlignment(false));
              }}
            />
          ) : (
            <div className="h-full grid grid-rows-2 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <ActionButton className="w-full h-full" onClick={capture} disabled={loading}>
                  <div className="w-full h-full flex items-center justify-center gap-2">
                    <Camera size={16} />
                    <span>{loading ? 'Capturing...' : 'Capture'}</span>
                  </div>
                </ActionButton>

                <ActionButton className="w-full h-full" onClick={handleToggleAlignment}>
                  <div className="w-full h-full flex items-center justify-center gap-2">
                    <AlignCenter size={16} />
                    <span>Align</span>
                  </div>
                </ActionButton>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <ActionButton
                  className="w-full h-full"
                  onClick={() => console.log('ASK RAG clicked')}
                >
                  <div className="w-full h-full flex items-center justify-center gap-2">
                    <BrainCircuit size={16} />
                    <span>ASK RAG</span>
                  </div>
                </ActionButton>

                <ActionButton className="w-full h-full" onClick={() => console.log('ASK clicked')}>
                  <div className="w-full h-full flex items-center justify-center gap-2">
                    <MessageSquare size={16} />
                    <span>ASK</span>
                  </div>
                </ActionButton>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation bar */}
      <NavigationBar />
    </div>
  );
}

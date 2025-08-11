'use client';

import { AlignCenter, BrainCircuit, Camera, MessageSquare } from 'lucide-react';
import { useEffect, useMemo } from 'react';

import { ActionButton } from '@/components/action-button';
import { ConfirmActionButton } from '@/components/confirm-action-button';
import { ImageAlignment } from '@/components/image-alignment';
import { ImageTextToggle } from '@/components/image-text-toggle';
import { ImageWithSelection } from '@/components/image-with-selection';
import { NavigationBar } from '@/components/navigation-bar';
import { useCurrentImage } from '@/hooks/useCurrentImage';
import { useImageAlignmentActions } from '@/hooks/useImageAlignmentActions';
import { useJobActions } from '@/hooks/useJobActions';
import { setShowAlignment } from '@/lib/redux/slices/uiSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { jobProcessor } from '@/lib/services/JobProcessor';

export default function Home() {
  const dispatch = useAppDispatch();
  const { showAlignment } = useAppSelector((state) => state.ui);
  const alignment = useAppSelector((state) => state.alignment);
  const { job } = useAppSelector((state) => state.job);
  const { imageUrl } = useCurrentImage();
  const {
    capture,
    loading,
    askRAG,
    state: { isDisableAskRAG, isDisabledCapture },
  } = useJobActions();

  const {
    actions: { handleAlignmentChange, handleToggleAlignment },
  } = useImageAlignmentActions();

  useEffect(() => {
    // Provide the dispatch function to the JobProcessor
    jobProcessor.setDispatch(dispatch);
    jobProcessor.start();
  }, [dispatch]);

  const ImageBlock = useMemo(() => {
    if (!imageUrl)
      return (
        <pre className="whitespace-pre-wrap break-words overflow-auto max-w-full h-full bg-secondary/20 p-2 rounded-sm text-xs">
          {JSON.stringify(job, null, 2)}
        </pre>
      );
    if (showAlignment) {
      return <ImageWithSelection imageSrc={imageUrl} />;
    } else {
      return <ImageTextToggle imageSrc={imageUrl} />;
    }
  }, [showAlignment, imageUrl, job]);

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
                // Save alignment to local storage
                try {
                  localStorage.setItem('alignment', JSON.stringify(alignment));
                  console.log('Saving alignment to localStorage:', alignment);
                } catch (error) {
                  console.error('Failed to save alignment to localStorage:', error);
                }
                dispatch(setShowAlignment(false));
              }}
            />
          ) : (
            <div className="h-full grid grid-rows-2 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <ConfirmActionButton
                  className="w-full h-full"
                  onSubmit={capture}
                  isDisabled={isDisabledCapture}
                  normalText={
                    <div className="w-full h-full flex items-center justify-center gap-2">
                      <Camera size={16} />
                      <span>{isDisabledCapture ? 'Capture' : 'Capture'}</span>
                    </div>
                  }
                />

                <ActionButton className="w-full h-full" onClick={handleToggleAlignment}>
                  <div className="w-full h-full flex items-center justify-center gap-2">
                    <AlignCenter size={16} />
                    <span>Align</span>
                  </div>
                </ActionButton>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <ConfirmActionButton
                  className="w-full h-full"
                  onSubmit={askRAG}
                  isDisabled={isDisableAskRAG}
                  normalText={
                    <div className="w-full h-full flex items-center justify-center gap-2">
                      <BrainCircuit size={16} />
                      <span>{isDisableAskRAG ? 'ASK RAG' : 'ASK RAG'}</span>
                    </div>
                  }
                />

                <ActionButton className="w-full h-full" onClick={() => console.log('ASK clicked')}>
                  <div className="w-full h-full flex items-center justify-center gap-2">
                    <MessageSquare size={16} />
                    <span>{loading ? 'Loading...' : 'ASK AI'}</span>
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

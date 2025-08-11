'use client';

import { AlignCenter, BrainCircuit, Camera, MessageSquare } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

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
  const [copyFeedback, setCopyFeedback] = useState<'idle' | 'copied' | 'no-question'>('idle');

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

  // const hasQuestion = useMemo(() => {
  //   const question = job?.data?.question;
  //   return question && (typeof question !== 'string' || question.trim().length > 0);
  // }, [job]);

  useEffect(() => {
    const question = job?.data?.question;
    if (question && (typeof question !== 'string' || question.trim().length > 0)) {
      if (copyFeedback === 'no-question') {
        setCopyFeedback('idle');
      }
    }
  }, [job, copyFeedback, setCopyFeedback]);

  const handleCopyQuestion = useCallback(async () => {
    try {
      const question = job?.data?.question;
      if (!question || (typeof question === 'string' && question.trim().length === 0)) {
        setCopyFeedback('no-question');
        setTimeout(() => setCopyFeedback('idle'), 2000);
        console.warn('No question available to copy');
        return;
      }

      const text = typeof question === 'string' ? question : JSON.stringify(question);

      if (navigator?.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopyFeedback('copied');
        setTimeout(() => setCopyFeedback('idle'), 2000);
        console.log('Question copied to clipboard');
        return;
      }

      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopyFeedback('copied');
      setTimeout(() => setCopyFeedback('idle'), 2000);
      console.log('Question copied to clipboard (fallback)');
    } catch (error) {
      console.error('Failed to copy question to clipboard:', error);
      setCopyFeedback('idle');
    }
  }, [job]);

  const getCopyButtonText = useCallback(() => {
    if (loading) return 'Loading...';
    if (copyFeedback === 'copied') return 'Copied!';
    if (copyFeedback === 'no-question') return 'No Question';
    return 'Copy Question';
  }, [loading, copyFeedback]);

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

                <ActionButton
                  className="w-full h-full"
                  onClick={handleCopyQuestion}
                  disabled={copyFeedback !== 'idle'}
                >
                  <div className="w-full h-full flex items-center justify-center gap-2">
                    <MessageSquare size={16} />
                    <span>{getCopyButtonText()}</span>
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

'use client';

import { AlignCenter, BrainCircuit, Camera, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';

import { ActionButton } from '@/components/action-button';
import { ImageAlignment } from '@/components/image-alignment';
import { ImageTextToggle } from '@/components/image-text-toggle';
import { ImageWithSelection } from '@/components/image-with-selection';
import { NavigationBar } from '@/components/navigation-bar';
import { jobProcessor } from '@/lib/services/JobProcessor';

// Sample image and text for demonstration
const SAMPLE_IMAGE = '/next.svg';
const SAMPLE_TEXT =
  'This is a sample text that will be displayed when the image is clicked. In a real application, this could be information extracted from the image or any other relevant content.';

export default function Home() {
  const [showAlignment, setShowAlignment] = useState(false);
  const [alignment, setAlignment] = useState({ top: 0, right: 100, bottom: 100, left: 0 });
  const [showImage, setShowImage] = useState(true);

  const handleAlignmentChange = (newAlignment: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }) => {
    setAlignment(newAlignment);
    // In a real application, you might want to save this alignment for later use
  };

  const toggleAlignment = () => {
    setShowAlignment(!showAlignment);
  };

  useEffect(() => {
    jobProcessor.start();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Main content - 50/50 split */}
      <div className="flex-1 flex flex-col pb-16">
        {/* Top half - Image/Text */}
        <div className="h-1/2 p-4">
          {showImage ? (
            showAlignment ? (
              <ImageWithSelection imageSrc={SAMPLE_IMAGE} selection={alignment} />
            ) : (
              <ImageTextToggle imageSrc={SAMPLE_IMAGE} text={SAMPLE_TEXT} />
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center p-4">
              <p className="text-foreground">{SAMPLE_TEXT}</p>
            </div>
          )}
        </div>

        {/* Bottom half - Buttons or Alignment */}
        <div className="h-1/2 p-4">
          {showAlignment ? (
            <ImageAlignment
              onAlignmentChange={handleAlignmentChange}
              initialAlignment={alignment}
              onCancel={() => setShowAlignment(false)}
              onSave={() => {
                // In a real application, you might want to do something with the alignment
                console.log('Saving alignment:', alignment);
                setShowAlignment(false);
              }}
            />
          ) : (
            <div className="h-full grid grid-rows-2 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <ActionButton
                  className="w-full h-full"
                  onClick={() => console.log('Capture clicked')}
                >
                  <div className="w-full h-full flex items-center justify-center gap-2">
                    <Camera size={16} />
                    <span>Capture</span>
                  </div>
                </ActionButton>

                <ActionButton className="w-full h-full" onClick={toggleAlignment}>
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

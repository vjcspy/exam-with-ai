'use client';

import { useState } from 'react';

import { ActionButton } from './action-button';

interface ImageAlignmentProps {
  onAlignmentChange: (alignment: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }) => void;
  initialAlignment?: { top: number; right: number; bottom: number; left: number };
  onCancel?: () => void;
  onSave?: () => void;
}

export function ImageAlignment({
  onAlignmentChange,
  initialAlignment = { top: 0, right: 100, bottom: 100, left: 0 },
  onCancel,
  onSave,
}: ImageAlignmentProps) {
  const [alignment, setAlignment] = useState(initialAlignment);

  const handleSliderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'top' | 'right' | 'bottom' | 'left'
  ) => {
    const value = parseInt(e.target.value, 10);

    const newAlignment = { ...alignment };

    // Apply constraints
    if (type === 'left' && value >= alignment.right) {
      return; // Left can't be greater than or equal to right
    }
    if (type === 'right' && value <= alignment.left) {
      return; // Right can't be less than or equal to left
    }
    if (type === 'top' && value >= alignment.bottom) {
      return; // Top can't be greater than or equal to bottom
    }
    if (type === 'bottom' && value <= alignment.top) {
      return; // Bottom can't be less than or equal to top
    }

    newAlignment[type] = value;
    setAlignment(newAlignment);
    onAlignmentChange(newAlignment);
  };

  return (
    <div className="w-full space-y-6 p-4">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Left: {alignment.left}%</span>
          <span className="text-sm font-medium">{alignment.left}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="99"
          value={alignment.left}
          onChange={(e) => handleSliderChange(e, 'left')}
          className="w-full h-3 bg-border rounded-md appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Right: {alignment.right}%</span>
          <span className="text-sm font-medium">{alignment.right}%</span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={alignment.right}
          onChange={(e) => handleSliderChange(e, 'right')}
          className="w-full h-3 bg-border rounded-md appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Top: {alignment.top}%</span>
          <span className="text-sm font-medium">{alignment.top}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="99"
          value={alignment.top}
          onChange={(e) => handleSliderChange(e, 'top')}
          className="w-full h-3 bg-border rounded-md appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Bottom: {alignment.bottom}%</span>
          <span className="text-sm font-medium">{alignment.bottom}%</span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={alignment.bottom}
          onChange={(e) => handleSliderChange(e, 'bottom')}
          className="w-full h-3 bg-border rounded-md appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Save and Cancel buttons */}
      <div className="flex justify-between gap-6 mt-8">
        <ActionButton className="flex-1 h-14 text-base py-4" onClick={onSave}>
          <span>Save</span>
        </ActionButton>

        <ActionButton className="flex-1 h-14 text-base py-4" onClick={onCancel} variant="outline">
          <span>Cancel</span>
        </ActionButton>
      </div>
    </div>
  );
}

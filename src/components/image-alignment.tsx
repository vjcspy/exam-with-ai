"use client";

import { useState } from "react";
import { ActionButton } from "./action-button";

interface ImageAlignmentProps {
  onAlignmentChange: (alignment: { top: number; right: number; bottom: number; left: number }) => void;
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
    type: "top" | "right" | "bottom" | "left"
  ) => {
    const value = parseInt(e.target.value, 10);

    let newAlignment = { ...alignment };

    // Apply constraints
    if (type === "left" && value >= alignment.right) {
      return; // Left can't be greater than or equal to right
    }
    if (type === "right" && value <= alignment.left) {
      return; // Right can't be less than or equal to left
    }
    if (type === "top" && value >= alignment.bottom) {
      return; // Top can't be greater than or equal to bottom
    }
    if (type === "bottom" && value <= alignment.top) {
      return; // Bottom can't be less than or equal to top
    }

    newAlignment[type] = value;
    setAlignment(newAlignment);
    onAlignmentChange(newAlignment);
  };

  return (
    <div className="w-full space-y-4 p-4">
      <div className="flex items-center space-x-2">
        <span className="w-16 text-xs">Left: {alignment.left}%</span>
        <input
          type="range"
          min="0"
          max="99"
          value={alignment.left}
          onChange={(e) => handleSliderChange(e, "left")}
          className="flex-1 h-1 bg-border rounded-sm appearance-none cursor-pointer"
        />
      </div>

      <div className="flex items-center space-x-2">
        <span className="w-16 text-xs">Right: {alignment.right}%</span>
        <input
          type="range"
          min="1"
          max="100"
          value={alignment.right}
          onChange={(e) => handleSliderChange(e, "right")}
          className="flex-1 h-1 bg-border rounded-sm appearance-none cursor-pointer"
        />
      </div>

      <div className="flex items-center space-x-2">
        <span className="w-16 text-xs">Top: {alignment.top}%</span>
        <input
          type="range"
          min="0"
          max="99"
          value={alignment.top}
          onChange={(e) => handleSliderChange(e, "top")}
          className="flex-1 h-1 bg-border rounded-sm appearance-none cursor-pointer"
        />
      </div>

      <div className="flex items-center space-x-2">
        <span className="w-16 text-xs">Bottom: {alignment.bottom}%</span>
        <input
          type="range"
          min="1"
          max="100"
          value={alignment.bottom}
          onChange={(e) => handleSliderChange(e, "bottom")}
          className="flex-1 h-1 bg-border rounded-sm appearance-none cursor-pointer"
        />
      </div>

      {/* Save and Cancel buttons */}
      <div className="flex gap-2 mt-6">
        <ActionButton 
          className="w-32"
          onClick={onSave}
        >
          <span>Save</span>
        </ActionButton>

        <ActionButton 
          className="w-32"
          onClick={onCancel}
          variant="outline"
        >
          <span>Cancel</span>
        </ActionButton>
      </div>
    </div>
  );
}

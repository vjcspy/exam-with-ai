import { ButtonHTMLAttributes, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

interface ConfirmActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  isDisabled?: boolean;
  onSubmit: () => void;
  confirmText?: string;
  normalText?: React.ReactNode;
}

export function ConfirmActionButton({
  children,
  className,
  variant = 'default',
  isDisabled = false,
  onSubmit,
  confirmText = 'Confirm',
  normalText,
  onClick,
  ...props
}: ConfirmActionButtonProps) {
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [isInDelay, setIsInDelay] = useState(false);

  // Reset delay state when confirmation state changes to false
  useEffect(() => {
    if (!needsConfirmation) {
      setIsInDelay(false);
    }
  }, [needsConfirmation]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // If in delay period, ignore clicks
    if (isInDelay) {
      return;
    }

    if (isDisabled && !needsConfirmation) {
      // First click when disabled - show confirmation and start delay
      setNeedsConfirmation(true);
      setIsInDelay(true);
      // After 0.5 seconds, allow confirmation
      setTimeout(() => {
        setIsInDelay(false);
      }, 500);
      return;
    }

    if (isDisabled && needsConfirmation) {
      // Second click when disabled - execute onSubmit and reset
      onSubmit();
      setNeedsConfirmation(false);
      return;
    }

    // Normal click (not disabled) - execute onClick if provided
    if (onClick) {
      onClick(e);
    } else {
      onSubmit();
    }
  };

  // Reset confirmation state when moving away from the button
  const handleMouseLeave = () => {
    if (needsConfirmation) {
      setNeedsConfirmation(false);
    }
  };

  return (
    <button
      className={cn(
        'h-full px-4 text-sm font-medium border border-border rounded-sm transition-colors flex items-center justify-center',
        variant === 'default'
          ? 'bg-background text-foreground hover:bg-secondary'
          : 'bg-transparent hover:bg-secondary/10',
        needsConfirmation && !isInDelay && 'bg-amber-100 text-amber-900 border-amber-500',
        needsConfirmation &&
          isInDelay &&
          'bg-gray-200 text-gray-500 border-gray-400 cursor-not-allowed',
        className
      )}
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {needsConfirmation ? (
        <div className="w-full h-full flex items-center justify-center gap-2">
          {isInDelay ? `Wait...` : confirmText}
        </div>
      ) : (
        normalText || children
      )}
    </button>
  );
}

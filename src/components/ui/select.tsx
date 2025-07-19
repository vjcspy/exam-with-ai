'use client';

import { forwardRef, SelectHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, label, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5">
        {label && <label className="text-sm font-medium">{label}</label>}
        <select
          className={cn(
            'h-10 px-3 py-2 text-sm border border-border rounded-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary',
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };

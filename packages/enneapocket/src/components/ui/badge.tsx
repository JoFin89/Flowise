import React from 'react';
import { cn } from '@/lib/utils';

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600', className)}
      {...props}
    />
  );
}

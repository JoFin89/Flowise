import React from 'react';
import { cn } from '@/lib/utils';

export function Accordion({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-y-2', className)} {...props} />;
}

export function AccordionItem({ className, ...props }: React.HTMLAttributes<HTMLDetailsElement>) {
  return <details className={cn('rounded-2xl border bg-white/70 p-3', className)} {...props} />;
}

export function AccordionTrigger({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <summary className={cn('cursor-pointer text-sm font-semibold text-slate-900', className)} {...props} />
  );
}

export function AccordionContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-2 text-sm text-slate-600', className)} {...props} />;
}

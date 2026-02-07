import React from 'react';
import { cn } from '@/lib/utils';

export function Command({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-2xl border bg-white p-3 shadow-sm', className)} {...props} />;
}

export function CommandInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn('w-full rounded-xl border border-slate-200 px-3 py-2 text-sm', className)}
      {...props}
    />
  );
}

export function CommandList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-3 space-y-2', className)} {...props} />;
}

export function CommandItem({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn('flex w-full items-center justify-between rounded-xl border border-slate-100 px-3 py-2 text-left text-sm hover:border-brand-500 hover:bg-brand-50', className)}
      {...props}
    />
  );
}

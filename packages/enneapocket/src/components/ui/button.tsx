import React from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  const variants: Record<Variant, string> = {
    primary: 'bg-brand-600 text-white hover:bg-brand-500',
    secondary: 'bg-slate-900 text-white hover:bg-slate-700',
    ghost: 'bg-transparent text-brand-600 hover:bg-brand-50'
  };

  return (
    <button
      className={cn('inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition', variants[variant], className)}
      {...props}
    />
  );
}

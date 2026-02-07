import React from 'react';
import { cn } from '@/lib/utils';

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
}

export function Tabs({ className, value, onValueChange, children }: TabsProps) {
  return (
    <div className={cn('space-y-3', className)} data-value={value}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, { value, onValueChange });
      })}
    </div>
  );
}

export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex gap-2 overflow-x-auto pb-1', className)} {...props} />;
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  tabValue: string;
}

export function TabsTrigger({ className, value, onValueChange, tabValue, ...props }: TabsTriggerProps) {
  const isActive = value === tabValue;
  return (
    <button
      className={cn(
        'rounded-full px-4 py-1 text-sm font-semibold transition',
        isActive ? 'bg-brand-600 text-white' : 'bg-white text-slate-600',
        className
      )}
      onClick={() => onValueChange?.(tabValue)}
      type="button"
      {...props}
    />
  );
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  tabValue: string;
}

export function TabsContent({ className, value, tabValue, ...props }: TabsContentProps) {
  if (value !== tabValue) return null;
  return <div className={cn('space-y-3', className)} {...props} />;
}

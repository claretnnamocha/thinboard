import * as React from 'react';
import { cn } from '@/lib/utils';

interface DataTableShellProps {
  toolbar?: React.ReactNode;
  pagination?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DataTableShell({
  toolbar,
  pagination,
  children,
  className,
}: DataTableShellProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {toolbar && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          {toolbar}
        </div>
      )}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        {children}
      </div>
      {pagination && (
        <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
          {pagination}
        </div>
      )}
    </div>
  );
}

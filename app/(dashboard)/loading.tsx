import { Skeleton } from '@/components/ui/skeleton';
import { StatCardSkeleton } from '@/components/dashboard/loading-state';

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      {/* Page header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Stat cards */}
      <StatCardSkeleton />

      {/* Content section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-52" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
        <div className="rounded-lg border border-border bg-card divide-y divide-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3">
              <Skeleton className="h-8 w-8 rounded-full shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-5 w-16 rounded-full shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

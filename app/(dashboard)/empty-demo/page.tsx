'use client';

import * as React from 'react';
import { Inbox, FileSearch, Users } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import { ContentSection } from '@/components/dashboard/content-section';
import { EmptyState } from '@/components/dashboard/empty-state';
import { ErrorState } from '@/components/dashboard/error-state';
import { LoadingState, StatCardSkeleton } from '@/components/dashboard/loading-state';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function EmptyDemoPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="State patterns"
        description="Reference for empty, error, and loading states used across the dashboard."
      >
        <Badge variant="secondary">Stage 4</Badge>
      </PageHeader>

      <ContentSection title="Empty states">
        <div className="grid gap-4 md:grid-cols-2">
          <EmptyState
            icon={Inbox}
            title="No notifications"
            description="You're all caught up. New notifications will appear here."
          />
          <EmptyState
            icon={Users}
            title="No team members"
            description="Invite your colleagues to get started."
            action={{
              label: 'Invite member',
              onClick: () => toast.success('Invite sent!'),
            }}
          />
        </div>
        <EmptyState
          icon={FileSearch}
          title="No results found"
          description='Try adjusting your search query or clearing active filters.'
          className="mt-2"
        />
      </ContentSection>

      <ContentSection title="Error states">
        <div className="grid gap-4 md:grid-cols-2">
          <ErrorState />
          <ErrorState
            message="Could not load user data. Check your connection and try again."
            onRetry={() => toast.info('Retrying…')}
          />
        </div>
      </ContentSection>

      <ContentSection
        title="Loading states"
        description="Skeleton placeholders that match real content dimensions."
      >
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Stat card skeletons
            </p>
            <StatCardSkeleton />
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              List row skeletons
            </p>
            <div className="rounded-lg border border-border bg-card p-4">
              <LoadingState rows={4} />
            </div>
          </div>
        </div>
      </ContentSection>
    </div>
  );
}

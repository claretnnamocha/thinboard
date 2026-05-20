'use client';

import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { PageHeader } from '@/components/dashboard/page-header';
import { StatCard } from '@/components/dashboard/stat-card';
import { ContentSection } from '@/components/dashboard/content-section';
import { ChartCard } from '@/components/charts/chart-card';
import { AreaChartWidget } from '@/components/charts/area-chart-widget';
import { BarChartWidget } from '@/components/charts/bar-chart-widget';
import { LineChartWidget } from '@/components/charts/line-chart-widget';
import { StatusBadge } from '@/components/data/status-badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  getMetrics,
  getRecentActivity,
  getRevenueSeries,
  getTrafficBySource,
  getOrdersSeries,
} from '@/lib/mock-data';

const CHART_COLORS = {
  primary: '#2563eb',
  secondary: '#0ea5e9',
  accent: '#10b981',
  muted: '#64748b',
};

export default function OverviewPage() {
  const metrics = getMetrics();
  const activity = getRecentActivity();
  const revenue = getRevenueSeries();
  const traffic = getTrafficBySource();
  const orders = getOrdersSeries();

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title="Overview"
        description="Track performance across your workspace."
      >
        <Select defaultValue="30d">
          <SelectTrigger className="h-8 w-36 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </PageHeader>

      {/* Row 1 — Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <StatCard
            key={m.id}
            title={m.title}
            value={m.value}
            delta={m.delta}
            icon={m.icon}
          />
        ))}
      </div>

      {/* Row 2 — Area + Bar charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard
          title="Revenue"
          description="Monthly revenue vs. target (last 12 months)"
        >
          <AreaChartWidget
            data={revenue}
            xKey="month"
            series={[
              { key: 'revenue', color: CHART_COLORS.primary, label: 'Revenue' },
              { key: 'target', color: CHART_COLORS.muted, label: 'Target' },
            ]}
            valuePrefix="$"
            height={224}
          />
        </ChartCard>

        <ChartCard
          title="Traffic by source"
          description="Unique visitors per acquisition channel"
        >
          <BarChartWidget
            data={traffic}
            xKey="source"
            series={[
              { key: 'visitors', color: CHART_COLORS.secondary, label: 'Visitors' },
            ]}
            height={224}
          />
        </ChartCard>
      </div>

      {/* Row 3 — Line chart full width */}
      <ChartCard
        title="Daily orders"
        description="Order volume over the last 30 days"
      >
        <LineChartWidget
          data={orders}
          xKey="day"
          series={[{ key: 'orders', color: CHART_COLORS.accent, label: 'Orders' }]}
          height={200}
          tickInterval={4}
        />
      </ChartCard>

      {/* Row 4 — Recent activity */}
      <ContentSection
        title="Recent activity"
        description="Latest actions across your workspace."
        action={
          <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
            <Link href="/users">
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        }
      >
        <div className="rounded-lg border border-border bg-card divide-y divide-border">
          {activity.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 px-4 py-2.5 hover:bg-muted/30 transition-colors"
            >
              <Avatar className="h-7 w-7 shrink-0">
                <AvatarFallback className="text-[10px] font-medium bg-primary/10 text-primary">
                  {item.user
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-foreground">
                  <span className="font-medium">{item.user}</span>{' '}
                  <span className="text-muted-foreground">{item.action}</span>{' '}
                  <span className="font-medium">{item.target}</span>
                </p>
              </div>
              <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">
                {item.timestamp}
              </span>
              <StatusBadge status={item.status} className="shrink-0" />
            </div>
          ))}
        </div>
      </ContentSection>
    </div>
  );
}

'use client';

import * as React from 'react';
import { PanelLeftClose, PanelLeftOpen, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarNav } from './sidebar-nav';

const SIDEBAR_EXPANDED_WIDTH = 220;
const SIDEBAR_COLLAPSED_WIDTH = 56;

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  return (
    <TooltipProvider>
      <aside
        style={{
          width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH,
        }}
        className={cn(
          'hidden md:flex flex-col shrink-0 border-r border-border bg-card transition-[width] duration-200 ease-in-out overflow-hidden',
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            'flex h-14 items-center border-b border-border px-3',
            collapsed ? 'justify-center' : 'gap-2 px-4',
          )}
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          {!collapsed && (
            <span className="font-semibold text-sm tracking-tight text-foreground">
              AdminStarter
            </span>
          )}
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-4">
          <SidebarNav collapsed={collapsed} />
        </div>

        {/* Footer nav */}
        <div className="py-2">
          <SidebarNav collapsed={collapsed} footer />
        </div>

        <Separator />

        {/* Collapse toggle */}
        <div className={cn('flex p-2', collapsed ? 'justify-center' : 'justify-end')}>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  );
}

export { SIDEBAR_EXPANDED_WIDTH, SIDEBAR_COLLAPSED_WIDTH };

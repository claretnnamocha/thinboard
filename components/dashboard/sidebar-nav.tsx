'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, NAV_FOOTER_ITEMS } from './nav-config';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SidebarNavProps {
  collapsed: boolean;
  footer?: boolean;
}

export function SidebarNav({ collapsed, footer = false }: SidebarNavProps) {
  const pathname = usePathname();
  const items = footer ? NAV_FOOTER_ITEMS : NAV_ITEMS;

  return (
    <nav className="flex flex-col gap-1 px-2">
      {items.map((item) => {
        const isActive =
          item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
        const Icon = item.icon;

        const link = (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              collapsed ? 'justify-center px-2' : '',
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            )}
          >
            <Icon
              className={cn(
                'h-4 w-4 shrink-0',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground group-hover:text-accent-foreground',
              )}
            />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        );

        if (collapsed) {
          return (
            <Tooltip key={item.href} delayDuration={0}>
              <TooltipTrigger asChild>{link}</TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          );
        }

        return link;
      })}
    </nav>
  );
}

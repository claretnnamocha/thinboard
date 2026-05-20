'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarNav } from './sidebar-nav';

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[240px] p-0">
          <SheetHeader className="border-b border-border px-4 py-3">
            <SheetTitle asChild>
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <LayoutDashboard className="h-4 w-4" />
                </div>
                <span className="text-sm font-semibold">AdminStarter</span>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <TooltipProvider>
            <div className="flex flex-col py-4" onClick={() => setOpen(false)}>
              <SidebarNav collapsed={false} />
              <div className="mt-auto border-t border-border pt-2">
                <SidebarNav collapsed={false} footer />
              </div>
            </div>
          </TooltipProvider>
        </SheetContent>
      </Sheet>
    </>
  );
}

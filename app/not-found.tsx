import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '404 — Page Not Found' };

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 px-4 text-center">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <LayoutDashboard className="h-6 w-6" />
      </div>
      <p className="mb-1 font-mono text-sm font-medium text-muted-foreground">404</p>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="mb-8 max-w-xs text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Back to dashboard</Link>
      </Button>
    </div>
  );
}

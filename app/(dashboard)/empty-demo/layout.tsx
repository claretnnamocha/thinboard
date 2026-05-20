import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'State Patterns' };

export default function EmptyDemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

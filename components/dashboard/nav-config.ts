import { FlaskConical, LayoutDashboard, Settings, Users, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '/', icon: LayoutDashboard },
  { label: 'Users', href: '/users', icon: Users },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export const NAV_FOOTER_ITEMS: NavItem[] = [
  { label: 'State Patterns', href: '/empty-demo', icon: FlaskConical },
  { label: 'UI Kit', href: '/ui-kit', icon: Wrench },
];

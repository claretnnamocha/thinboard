// Shared type placeholders — extend as stages are added

export type Theme = 'light' | 'dark' | 'system';

export type NavItem = {
  label: string;
  href: string;
  icon?: string;
};

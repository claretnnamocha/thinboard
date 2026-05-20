'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="h-9 w-9 rounded-md border border-border bg-transparent"
        aria-label="Toggle theme"
        disabled
      />
    );
  }

  const next =
    theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';

  const label =
    theme === 'light'
      ? 'Switch to dark mode'
      : theme === 'dark'
        ? 'Switch to system mode'
        : 'Switch to light mode';

  const icon =
    theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '💻';

  return (
    <button
      onClick={() => setTheme(next)}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-transparent text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  );
}

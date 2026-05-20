'use client';

import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import { Monitor, Moon, Sun } from 'lucide-react';

import { PageHeader } from '@/components/dashboard/page-header';
import { SettingsProfileForm } from '@/components/forms/settings-profile-form';
import { SettingsNotificationsForm } from '@/components/forms/settings-notifications-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const THEMES = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
] as const;

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account, notifications, and appearance."
      />

      <Tabs defaultValue="profile">
        <TabsList className="mb-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* ── Profile ─────────────────────────────────────────── */}
        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile information</CardTitle>
              <CardDescription>
                Update your name, email, and bio. These are visible to your team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsProfileForm />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Notifications ────────────────────────────────────── */}
        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notification preferences</CardTitle>
              <CardDescription>
                Choose which events trigger emails or in-app alerts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsNotificationsForm />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Appearance ───────────────────────────────────────── */}
        <TabsContent value="appearance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Appearance</CardTitle>
              <CardDescription>
                Choose how the dashboard looks. System follows your OS preference.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-w-lg">
                <div className="grid grid-cols-3 gap-3">
                  {THEMES.map(({ value, label, icon: Icon }) => {
                    const active = theme === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          setTheme(value);
                          toast.success(`Theme set to ${label}`);
                        }}
                        className={cn(
                          'flex flex-col items-center gap-3 rounded-lg border-2 p-4 text-sm font-medium transition-all',
                          active
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground',
                        )}
                      >
                        <ThemePreview mode={value} />
                        <span className="flex items-center gap-1.5">
                          <Icon className="h-3.5 w-3.5" />
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground">
                  Current theme: <strong className="text-foreground">{theme ?? 'system'}</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ThemePreview({ mode }: { mode: string }) {
  const isDark = mode === 'dark';
  const isSystem = mode === 'system';

  if (isSystem) {
    return (
      <div className="relative h-14 w-full overflow-hidden rounded-md border border-border">
        <div className="absolute inset-0 left-0 w-1/2 bg-white" />
        <div className="absolute inset-0 left-1/2 bg-slate-900" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-2.5 w-8 rounded-sm bg-primary/70" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'h-14 w-full overflow-hidden rounded-md border',
        isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white',
      )}
    >
      <div className={cn('flex h-4 items-center gap-1 px-2', isDark ? 'bg-slate-800' : 'bg-slate-100')}>
        <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
        <div className={cn('h-1.5 flex-1 rounded-sm', isDark ? 'bg-slate-700' : 'bg-slate-200')} />
      </div>
      <div className="grid grid-cols-4 gap-1 p-2">
        <div className="col-span-1 h-4 rounded-sm bg-primary/60" />
        <div className={cn('col-span-3 h-4 rounded-sm', isDark ? 'bg-slate-700' : 'bg-slate-200')} />
        <div className={cn('col-span-4 h-2 rounded-sm', isDark ? 'bg-slate-800' : 'bg-slate-100')} />
      </div>
    </div>
  );
}

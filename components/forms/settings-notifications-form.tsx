'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { notificationSettingsSchema, type NotificationSettingsValues } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const NOTIFICATION_FIELDS: {
  key: keyof NotificationSettingsValues;
  label: string;
  description: string;
}[] = [
  { key: 'emailDigest', label: 'Weekly email digest', description: 'Receive a summary of activity every Monday morning.' },
  { key: 'deploymentAlerts', label: 'Deployment alerts', description: 'Get notified when a deployment succeeds or fails.' },
  { key: 'memberActivity', label: 'Member activity', description: 'Alerts when team members join, leave, or change roles.' },
  { key: 'securityAlerts', label: 'Security alerts', description: 'Critical alerts for login attempts and permission changes.' },
  { key: 'marketingEmails', label: 'Product updates & marketing', description: 'News, tips, and promotional content from us.' },
];

const DEFAULTS: NotificationSettingsValues = {
  emailDigest: true,
  deploymentAlerts: true,
  memberActivity: false,
  securityAlerts: true,
  marketingEmails: false,
};

export function SettingsNotificationsForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm<NotificationSettingsValues>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: DEFAULTS,
  });

  function onSubmit(_data: NotificationSettingsValues) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast.success('Preferences saved', { description: 'Your notification settings have been updated.' });
        resolve();
      }, 600);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 max-w-lg">
      {NOTIFICATION_FIELDS.map((field, i) => (
        <div key={field.key}>
          <div className="flex items-start justify-between gap-4 py-4">
            <div className="space-y-0.5">
              <Label htmlFor={`notif-${field.key}`} className="text-sm font-medium leading-none">
                {field.label}
              </Label>
              <p className="text-xs text-muted-foreground">{field.description}</p>
            </div>
            <Controller
              name={field.key}
              control={control}
              render={({ field: f }) => (
                <Switch
                  id={`notif-${field.key}`}
                  checked={f.value}
                  onCheckedChange={f.onChange}
                  className="shrink-0 mt-0.5"
                />
              )}
            />
          </div>
          {i < NOTIFICATION_FIELDS.length - 1 && <Separator />}
        </div>
      ))}

      <div className="pt-4">
        <Button type="submit" disabled={isSubmitting || !isDirty}>
          {isSubmitting ? 'Saving…' : 'Save preferences'}
        </Button>
      </div>
    </form>
  );
}

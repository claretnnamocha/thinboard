'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { profileSettingsSchema, type ProfileSettingsValues } from '@/lib/validators';
import { FormField } from './form-field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const DEFAULTS: ProfileSettingsValues = {
  name: 'Alice Chen',
  email: 'alice@example.com',
  bio: 'Admin of this workspace.',
  role: 'admin',
};

export function SettingsProfileForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileSettingsValues>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: DEFAULTS,
  });

  const role = watch('role');

  function onSubmit(_data: ProfileSettingsValues) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast.success('Profile saved', { description: 'Your changes have been applied.' });
        resolve();
      }, 600);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-lg">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" htmlFor="pf-name" error={errors.name?.message} required>
          <Input
            id="pf-name"
            placeholder="Jane Doe"
            {...register('name')}
            aria-invalid={!!errors.name}
            className={errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}
          />
        </FormField>

        <FormField label="Email address" htmlFor="pf-email" error={errors.email?.message} required>
          <Input
            id="pf-email"
            type="email"
            placeholder="jane@example.com"
            {...register('email')}
            aria-invalid={!!errors.email}
            className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
          />
        </FormField>
      </div>

      <FormField
        label="Bio"
        htmlFor="pf-bio"
        error={errors.bio?.message}
        hint="Brief description shown on your profile. Max 300 characters."
      >
        <Textarea
          id="pf-bio"
          rows={3}
          placeholder="Tell your team a little about yourself…"
          {...register('bio')}
          aria-invalid={!!errors.bio}
          className={errors.bio ? 'border-destructive focus-visible:ring-destructive' : ''}
        />
      </FormField>

      <FormField label="Role" htmlFor="pf-role" error={errors.role?.message} required>
        <Select
          value={role}
          onValueChange={(v) => setValue('role', v as ProfileSettingsValues['role'], { shouldDirty: true })}
        >
          <SelectTrigger id="pf-role" aria-invalid={!!errors.role} className={errors.role ? 'border-destructive' : ''}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <div className="flex items-center gap-3 pt-1">
        <Button type="submit" disabled={isSubmitting || !isDirty}>
          {isSubmitting ? 'Saving…' : 'Save changes'}
        </Button>
        {isDirty && (
          <span className="text-xs text-muted-foreground">You have unsaved changes.</span>
        )}
      </div>
    </form>
  );
}

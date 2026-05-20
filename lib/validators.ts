import { z } from 'zod';

export const profileSettingsSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  bio: z.string().max(300, 'Bio must be 300 characters or fewer').optional(),
  role: z.enum(['admin', 'editor', 'viewer'], {
    error: 'Please select a role',
  }),
});

export type ProfileSettingsValues = z.infer<typeof profileSettingsSchema>;

export const notificationSettingsSchema = z.object({
  emailDigest: z.boolean(),
  deploymentAlerts: z.boolean(),
  memberActivity: z.boolean(),
  securityAlerts: z.boolean(),
  marketingEmails: z.boolean(),
});

export type NotificationSettingsValues = z.infer<typeof notificationSettingsSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginValues = z.infer<typeof loginSchema>;

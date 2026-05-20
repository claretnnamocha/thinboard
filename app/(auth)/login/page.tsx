'use client';

import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { loginSchema, type LoginValues } from '@/lib/validators';
import { FormField } from '@/components/forms/form-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(_data: LoginValues) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast.info('Auth not implemented', {
          description: 'Connect Supabase Auth to enable sign-in.',
        });
        resolve();
      }, 600);
    });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 px-4">
      {/* Logo */}
      <div className="mb-6 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <LayoutDashboard className="h-4 w-4" />
        </div>
        <span className="text-lg font-semibold tracking-tight">AdminStarter</span>
      </div>

      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Sign in</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              label="Email"
              htmlFor="login-email"
              error={errors.email?.message}
              required
            >
              <Input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register('email')}
                aria-invalid={!!errors.email}
                className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
              />
            </FormField>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="login-password"
                  className={errors.password ? 'text-destructive' : ''}
                >
                  Password<span className="ml-0.5 text-destructive">*</span>
                </Label>
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-xs font-normal"
                >
                  Forgot password?
                </Button>
              </div>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                {...register('password')}
                aria-invalid={!!errors.password}
                className={errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}
              />
              {errors.password && (
                <p className="text-xs font-medium text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </CardContent>

        <Separator />

        <CardFooter className="justify-center py-4">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to dashboard
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

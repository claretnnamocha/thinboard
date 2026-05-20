# Admin Dashboard Starter

A production-quality admin shell built with **Next.js 15 App Router**, **shadcn/ui**, and **Tailwind CSS**. Clone it, swap out the mock data for real API calls, and ship.

## What this template is

- A complete dashboard layout (collapsible sidebar, mobile nav, header)
- Reusable component patterns: stat cards, data tables, charts, forms, dialogs, toasts
- Zod + react-hook-form integrated as the standard for all forms
- Three Recharts widgets (Area, Bar, Line) with dark-mode-aware styling
- Consistent light/dark theme using CSS variables + next-themes

## What is intentionally excluded

- **Authentication** — wire up Supabase Auth, NextAuth, or Clerk when ready
- **Database** — no Prisma, no Drizzle, no API routes; all data is mocked in `lib/mock-data.ts`
- **State management** — no Redux, Zustand, etc.; local state is sufficient at this scale

---

## Quick start

```bash
npm install
npm run dev
# open http://localhost:3000
```

| Command | Description |
|---|---|
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check (no emit) |
| `npm run format` | Prettier write |

---

## Stack

| Tool | Purpose |
|---|---|
| Next.js 15 App Router | Framework, layouts, routing |
| React 19 | UI library |
| TypeScript 5 (strict) | Type safety |
| Tailwind CSS 3 | Utility-first styles |
| shadcn/ui | Accessible component primitives |
| next-themes | Light / dark / system theme |
| react-hook-form | Form state management |
| Zod v4 | Schema validation |
| Recharts | Chart library |
| Sonner | Toast notifications |
| Lucide React | Icon set |

---

## Folder structure

```
app/
  layout.tsx                Root layout — fonts, ThemeProvider, Toaster, metadata
  globals.css               All design tokens as CSS custom properties
  not-found.tsx             Branded 404 page
  (auth)/
    login/page.tsx          Sign-in form (Zod-validated; no real auth)
  (dashboard)/
    layout.tsx              Sidebar + header shell (client layout)
    error.tsx               Error boundary for all dashboard routes
    page.tsx                Overview: stat cards, charts, activity feed
    users/page.tsx          Users list with DataTable, dialogs, toasts
    settings/page.tsx       Settings: Profile, Notifications, Appearance tabs
    empty-demo/page.tsx     Reference for empty / error / loading states
  ui-kit/page.tsx           All UI primitives in one scrollable page

components/
  charts/
    chart-card.tsx          Card wrapper for any chart
    chart-tooltip.tsx       Dark-mode-aware custom tooltip
    area-chart-widget.tsx   Responsive area chart
    bar-chart-widget.tsx    Responsive bar chart
    line-chart-widget.tsx   Responsive line chart
  dashboard/
    app-sidebar.tsx         Collapsible sidebar with nav
    dashboard-header.tsx    Top bar with mobile hamburger + theme toggle
    mobile-nav.tsx          Sheet-based mobile navigation
    nav-config.ts           Central list of nav items
    page-header.tsx         Page title + description + optional action slot
    content-section.tsx     Section wrapper with title + action slot
    stat-card.tsx           KPI card with delta trend indicator
    empty-state.tsx         Empty state: icon + title + description + CTA
    error-state.tsx         Error state with optional retry button
    loading-state.tsx       Skeleton loading placeholders
  data/
    data-table.tsx          Generic sortable / searchable / paginated table
    table-toolbar.tsx       Search input + action slot
    table-pagination.tsx    First / prev / next / last page controls
    status-badge.tsx        Colored badge for active/invited/suspended/etc.
    search-input.tsx        Controlled search input with clear button
  forms/
    form-field.tsx          Label + field + inline error / hint helper
    settings-profile-form.tsx
    settings-notifications-form.tsx
  ui/                       shadcn/ui primitives (generated, don't edit directly)
  theme-provider.tsx        next-themes wrapper
  theme-toggle.tsx          Light/dark/system toggle button

lib/
  types.ts                  Shared TypeScript types (User, MetricCard, etc.)
  validators.ts             Zod schemas + inferred types
  mock-data.ts              All fake data (replace with real API calls)
  utils.ts                  cn() helper — clsx + tailwind-merge
```

---

## How to add a nav item and page

**1. Register the nav item** in `components/dashboard/nav-config.ts`:

```ts
import { MyIcon } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  // ...existing items
  { label: 'Products', href: '/products', icon: MyIcon },
];
```

**2. Create the page** at `app/(dashboard)/products/page.tsx`:

The `(dashboard)/layout.tsx` automatically wraps it with the sidebar, header, and max-width container.

**3. Use `PageHeader` and `ContentSection`**:

```tsx
'use client'; // only if you need hooks; remove for server components

import { PageHeader } from '@/components/dashboard/page-header';
import { ContentSection } from '@/components/dashboard/content-section';
import { Button } from '@/components/ui/button';

export default function ProductsPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Products" description="Manage your product catalog.">
        <Button size="sm">Add product</Button>
      </PageHeader>

      <ContentSection title="All products">
        {/* DataTable, cards, etc. */}
      </ContentSection>
    </div>
  );
}
```

**4. Add metadata** (optional) by creating `app/(dashboard)/products/layout.tsx`:

```tsx
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Products' };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

---

## How to add a form

Forms follow a three-layer pattern: **schema → component → toast**.

**1. Define the schema** in `lib/validators.ts`:

```ts
import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  price: z.number().positive('Price must be positive'),
  active: z.boolean(),
});

export type ProductValues = z.infer<typeof productSchema>;
```

**2. Create the form component** in `components/forms/`:

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { productSchema, type ProductValues } from '@/lib/validators';
import { FormField } from '@/components/forms/form-field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function ProductForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<ProductValues>({ resolver: zodResolver(productSchema) });

  async function onSubmit(data: ProductValues) {
    await saveProduct(data); // replace with real call
    toast.success('Product saved');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <FormField label="Name" htmlFor="prod-name" error={errors.name?.message} required>
        <Input
          id="prod-name"
          {...register('name')}
          className={errors.name ? 'border-destructive' : ''}
        />
      </FormField>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : 'Save'}
      </Button>
    </form>
  );
}
```

**Toast conventions:**
- `toast.success('...')` — operation completed
- `toast.info('...')` — informational (invite sent, etc.)
- `toast.error('...')` — show the API error message

---

## How to add a chart widget

**1. Add data to `lib/mock-data.ts`** (or fetch from an API):

```ts
export function getMySeries() {
  return [
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: 140 },
    // ...
  ];
}
```

**2. Use a chart widget inside `ChartCard`**:

```tsx
import { ChartCard } from '@/components/charts/chart-card';
import { LineChartWidget } from '@/components/charts/line-chart-widget';
import { getMySeries } from '@/lib/mock-data';

export function MySectionChart() {
  const data = getMySeries();
  return (
    <ChartCard title="My Metric" description="Monthly trend">
      <LineChartWidget
        data={data}
        xKey="month"
        series={[{ key: 'value', color: '#2563eb', label: 'Value' }]}
        height={200}
      />
    </ChartCard>
  );
}
```

Available widgets: `AreaChartWidget`, `BarChartWidget`, `LineChartWidget`. All accept:
- `data` — array of objects
- `xKey` — key for the x-axis labels
- `series` — array of `{ key, color, label }` objects
- `valuePrefix` / `valueSuffix` — format values in the tooltip (e.g. `"$"`, `"%"`)
- `height` — pixel height (default 220)

All charts use `ResponsiveContainer` and read `hsl(var(--border))` / `hsl(var(--muted-foreground))` from the active theme, so they automatically adapt to light and dark mode.

---

## How to theme (CSS variables)

All design tokens live in `app/globals.css` as CSS custom properties. Tailwind is wired to consume them via `tailwind.config.ts`.

**Light tokens** are on `:root`, **dark tokens** on `.dark`. next-themes toggles the `.dark` class on `<html>`.

To change the primary color:

```css
/* app/globals.css */
:root {
  --primary: 210 100% 45%; /* HSL — hue saturation lightness */
  --primary-foreground: 0 0% 100%;
}

.dark {
  --primary: 210 100% 60%;
  --primary-foreground: 0 0% 100%;
}
```

Full token list: `background`, `foreground`, `card`, `card-foreground`, `popover`, `popover-foreground`, `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `muted`, `muted-foreground`, `accent`, `accent-foreground`, `destructive`, `destructive-foreground`, `border`, `input`, `ring`, `radius`.

---

## Empty, Error, and Loading states

See `/empty-demo` for a live reference. Import from `@/components/dashboard/`:

```tsx
import { EmptyState } from '@/components/dashboard/empty-state';
import { ErrorState } from '@/components/dashboard/error-state';
import { LoadingState } from '@/components/dashboard/loading-state';

<EmptyState
  icon={Inbox}
  title="No notifications"
  description="You're all caught up."
  action={{ label: 'Settings', onClick: handleSettings }}
/>

<ErrorState message="Could not load data." onRetry={refetch} />

<LoadingState rows={5} />
```

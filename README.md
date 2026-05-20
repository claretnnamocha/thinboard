# Thinboard

**Thinboard** is a thin, open-source admin dashboard template for Next.js — a reusable shell you clone, re-theme, and extend for internal tools, SaaS admin panels, or any CRUD-style backend UI.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)
![License](https://img.shields.io/badge/License-MIT-green)

## What this is

Thinboard is intentionally **thin**: layout, design tokens, UI primitives, and example pages — not a full product.

- **Shell**: collapsible sidebar, header, page scaffolding, light/dark theming
- **UI kit**: buttons, inputs, tables, dialogs, toasts, and more ([shadcn/ui](https://ui.shadcn.com))
- **Examples**: overview with charts, users list, settings forms
- **Excluded by design**: real authentication, database, and API layers (bring your own per project)

## Features

- Next.js 15 **App Router** + strict TypeScript
- **shadcn/ui** + Tailwind CSS + CSS variable theming
- **Light / dark / system** theme via `next-themes`
- Collapsible sidebar + mobile drawer layout
- Data table pattern: search, sort, pagination (client-side demo)
- **Recharts** dashboard widgets with mock data
- **react-hook-form** + Zod on the settings example
- **Sonner** toasts
- **`/ui-kit`** — living catalog of components

## Quick start

```bash
git clone https://github.com/YOUR_USERNAME/thinboard.git
cd thinboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start dev server         |
| `npm run build` | Production build         |
| `npm run start` | Run production build     |
| `npm run lint`  | Run ESLint               |

## Demo routes

| Route       | Purpose                             |
|-------------|-------------------------------------|
| `/`         | Dashboard overview (stats + charts) |
| `/users`    | Data table example                  |
| `/settings` | Forms + validation example          |
| `/ui-kit`   | Component showcase                  |
| `/login`    | Auth UI shell (no real auth)        |

## Project structure

```
app/
  (auth)/login/          # Login shell
  (dashboard)/           # Sidebar layout + pages
components/
  ui/                    # shadcn primitives
  dashboard/             # Sidebar, header, page chrome
  charts/                # Chart wrappers
  data/                  # Table, search, badges
  forms/                 # Form helpers + examples
lib/
  mock-data.ts           # Typed demo data
  validators.ts          # Zod schemas
  utils.ts               # cn() and helpers
types/
  index.ts               # Shared TypeScript types
```

## Customize for your project

### 1. Re-theme

Edit CSS variables in `app/globals.css` (`--primary`, `--radius`, etc.). Components inherit tokens automatically.

### 2. Add a nav item + page

1. Add a link in `components/dashboard/nav-config.ts`
2. Create `app/(dashboard)/your-page/page.tsx`
3. Use `<PageHeader />` inside the existing dashboard layout

### 3. Add a list page (CRUD)

Copy the `/users` pattern:

- Define types in `types/`
- Add mock or API-backed data in `lib/`
- Compose `DataTable`, `SearchInput`, `StatusBadge`, dialogs, and toasts

### 4. Add a form

1. Add a Zod schema in `lib/validators.ts`
2. Build a form in `components/forms/` with react-hook-form
3. Follow `/settings` for validation and submit feedback

### 5. Add a chart

1. Add series data in `lib/mock-data.ts`
2. Drop a widget from `components/charts/` into `ChartCard`

## Tech stack

| Layer       | Choice                    |
|-------------|---------------------------|
| Framework   | Next.js 15 (App Router)   |
| Language    | TypeScript                |
| Styling     | Tailwind CSS              |
| Components  | shadcn/ui (Radix)         |
| Icons       | Lucide                    |
| Charts      | Recharts                  |
| Forms       | react-hook-form + Zod     |
| Toasts      | Sonner                    |

## Philosophy

**Thin, not opinionated.** Thinboard ships patterns and UI so you can focus on domain logic — wire your APIs, auth, and data layer without fighting the layout.

## Roadmap

- [ ] Command palette (⌘K)
- [ ] i18n example
- [ ] Storybook for `components/ui`
- [ ] Example API route + data-fetching pattern

## Contributing

Contributions are welcome. Please open an issue before large changes. Keep PRs focused on the generic template — avoid product-specific auth providers, databases, or branding.

1. Fork the repo
2. Create a branch (`git checkout -b feat/your-feature`)
3. Commit with a clear message
4. Open a pull request

## License

Thinboard is open source under the [MIT License](LICENSE).

Copyright (c) 2026 Claret Nnamocha

You are free to use, modify, and distribute this project, including in commercial work, with minimal restrictions. See [LICENSE](LICENSE) for the full text.

---

**Thinboard** — clone it, theme it, ship your admin.

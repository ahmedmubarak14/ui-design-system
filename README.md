# UI Kit

A production-grade React component library covering base primitives, application UI, marketing sections, and auth pages. Built with Next.js 15, Tailwind CSS v4, and TypeScript.

Sixty-plus components, copy-paste friendly, no UI vendor lock-in.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's inside

### Base components (`src/components/base/`)
| File | Components |
|------|-----------|
| `button.tsx` | Button (7 variants × 5 sizes + icon-only) |
| `badge.tsx` | Badge, BadgeGroup, Tag |
| `avatar.tsx` | Avatar (with status), AvatarGroup |
| `input.tsx` | Input, Textarea, Label, HelperText, FormField |
| `forms.tsx` | Checkbox, Radio, RadioGroup, Toggle |
| `misc.tsx` | Select, Slider, ProgressBar, ProgressRing, Tooltip, FeaturedIcon, Spinner, RatingStars |

### Application UI (`src/components/application/`)
| File | Components |
|------|-----------|
| `alert.tsx` | Alert, Banner, EmptyState |
| `modal.tsx` | Modal, Drawer, ConfirmDialog |
| `navigation.tsx` | Tabs, Breadcrumbs, Pagination, Stepper |
| `dropdown.tsx` | Dropdown, Combobox, CommandMenu |
| `table.tsx` | Table (with selection, sort), TH, TD, TR primitives |
| `card.tsx` | Card, CardHeader, MetricCard, StatGrid |
| `sidebar.tsx` | Sidebar (with nested items), TopNav |
| `feedback.tsx` | FileUpload, UploadedFileItem, Skeleton, ToastProvider, useToast |
| `charts.tsx` | AreaChart, BarChart, LineChart, DonutChart, ChartLegend |

### Marketing (`src/components/marketing/`)
| File | Components |
|------|-----------|
| `sections.tsx` | Hero, SectionHeader, FeaturesGrid, CtaSection, PricingTable, FaqAccordion, Testimonial, LogoCloud, Footer, StatsSection |

### Auth pages (`src/app/auth/`)
Sign in, sign up, forgot password, and 404 templates.

## Design tokens

All design tokens live in `src/app/globals.css` using Tailwind v4's `@theme` directive. Change a single CSS variable, the entire system updates.

- **5 color scales** (gray, brand, success, warning, error) × 12 steps each
- **6 display type sizes** with letter-spacing tuned for headlines
- **6 shadow elevations** from `xs` through `3xl`
- **9 radius tokens** from `xxs` (2px) through `4xl` (24px)
- Custom focus ring, scroll bar, animations (`fade-in-up`, `shimmer`)

## Customizing the brand

Open `src/app/globals.css` and update the `--color-brand-*` scale. Every component picks up the change.

```css
@theme {
  --color-brand-600: #your-color-here;
  /* ...rest of the scale */
}
```

## Routes

| Path | What's there |
|------|--------------|
| `/` | Library home, links to all sections |
| `/base` | Every base component, every variant |
| `/application` | Modals, tables, charts, sidebar, all interactive |
| `/marketing` | Hero, pricing, testimonials, footer, full sections |
| `/auth` | Sign in, sign up, forgot password, 404 |

## Stack

- **Next.js 15** with App Router
- **React 19**
- **Tailwind CSS v4** (CSS-first config)
- **TypeScript 5.7**
- **Recharts** for data visualizations
- **Lucide React** for icons
- **Geist** font family + Instrument Serif for display

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Home
│   ├── globals.css         # Design tokens + base styles
│   ├── base/page.tsx       # Base showcase
│   ├── application/page.tsx
│   ├── marketing/page.tsx
│   └── auth/page.tsx
├── components/
│   ├── base/               # Primitives
│   ├── application/        # App UI
│   ├── marketing/          # Marketing sections
│   └── showcase.tsx        # Layout helpers for demo pages
└── lib/
    └── utils.ts            # cn() helper
```

## Conventions

- **Client components** are marked `"use client"` only when needed (state, refs, portals).
- **Variants** use `class-variance-authority` for type-safe prop combinations.
- **Class merging** uses `tailwind-merge` via the `cn()` helper to handle conflicts.
- **Forwarding refs** on form elements so they work with React Hook Form, Formik, etc.

## License

MIT. Use freely in commercial or personal projects.

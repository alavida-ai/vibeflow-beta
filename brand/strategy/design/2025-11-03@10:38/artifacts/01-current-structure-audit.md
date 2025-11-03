# Shadcn Admin Template - Current Structure Audit

**Date:** 2025-11-03
**Purpose:** Document the current state of the shadcn admin template before transformation into a design system showcase app

---

## Executive Summary

This is a comprehensive Next.js 15 application built with shadcn/ui components, featuring:
- **3 Dashboard variations** with different layouts and visualizations
- **Authentication system** (login, register, forgot password)
- **Task management** with advanced data tables
- **User management** with CRUD operations
- **Settings pages** (profile, billing, plans, connected apps, notifications)
- **Developer tools** (API keys, webhooks, events/logs)
- **Error pages** (401, 403, 404, 503, generic error)

**Tech Stack:**
- Next.js 15.1.7 with App Router
- React 19.0.0
- TypeScript 5.7.3
- Tailwind CSS 4.0.7
- shadcn/ui components (38 UI components)
- Radix UI primitives
- TanStack Table for data tables
- Recharts for visualizations
- React Hook Form + Zod for forms

---

## Directory Structure

### Complete Route Tree

```
/app/src/app/
├── layout.tsx                          # Root layout (theme, toaster, providers)
├── providers.tsx                       # Theme + Search providers
├── globals.css                         # Global styles
│
├── (auth)/                             # Authentication route group
│   ├── layout.tsx                      # Auth layout (centered, logo header)
│   ├── login/
│   │   ├── page.tsx
│   │   └── components/
│   │       └── user-auth-form.tsx
│   ├── register/
│   │   ├── page.tsx
│   │   └── components/
│   │       └── register-form.tsx
│   └── forgot-password/
│       ├── page.tsx
│       └── components/
│           └── forgot-password-form.tsx
│
├── (dashboard)/                        # Dashboard route group
│   ├── layout.tsx                      # Dashboard layout (sidebar, header)
│   │
│   ├── (dashboard-1)/                  # Nested route group (default dashboard)
│   │   ├── page.tsx                    # Route: /
│   │   ├── components/
│   │   │   └── dashboard-1-actions.tsx
│   │   └── boards/
│   │       ├── overview/               # Tab content
│   │       └── analytics/              # Tab content
│   │
│   ├── dashboard-2/                    # Route: /dashboard-2
│   │   ├── page.tsx
│   │   ├── components/
│   │   │   ├── dashboard-2-actions.tsx
│   │   │   ├── recent-activity.tsx
│   │   │   ├── revenue-chart.tsx
│   │   │   ├── stats-card.tsx
│   │   │   ├── stats.tsx
│   │   │   └── visitors.tsx
│   │   └── data/
│   │       ├── data.ts
│   │       ├── recent-activities.ts
│   │       └── schema.ts
│   │
│   ├── dashboard-3/                    # Route: /dashboard-3
│   │   ├── page.tsx
│   │   ├── components/
│   │   │   ├── dashboard-3-actions.tsx
│   │   │   ├── budget.tsx
│   │   │   ├── radar-card.tsx
│   │   │   ├── stack-bar.tsx
│   │   │   ├── stats.tsx
│   │   │   └── visitors.tsx
│   │   └── data/
│   │       └── data.tsx
│   │
│   ├── tasks/                          # Route: /tasks
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── [id]/
│   │   │   └── page.tsx                # Route: /tasks/[id]
│   │   ├── components/
│   │   │   ├── tasks-table.tsx
│   │   │   ├── tasks-columns.tsx
│   │   │   ├── tasks-primary-actions.tsx
│   │   │   ├── tasks-mutate-drawer.tsx
│   │   │   ├── tasks-import-dialog.tsx
│   │   │   ├── tasks-detail-dialog.tsx
│   │   │   ├── tasks-detail-viewer.tsx
│   │   │   ├── data-table-toolbar.tsx
│   │   │   ├── data-table-column-header.tsx
│   │   │   ├── data-table-faceted-filter.tsx
│   │   │   ├── data-table-pagination.tsx
│   │   │   ├── data-table-row-actions.tsx
│   │   │   └── data-table-view-options.tsx
│   │   └── data/
│   │       ├── schema.ts
│   │       ├── data.ts
│   │       └── tasks.ts
│   │
│   ├── users/                          # Route: /users
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── [id]/
│   │   │   ├── page.tsx                # Route: /users/[id]
│   │   │   └── components/
│   │   ├── components/
│   │   │   ├── users-table.tsx
│   │   │   ├── users-columns.tsx
│   │   │   ├── users-stats.tsx
│   │   │   ├── user-primary-actions.tsx
│   │   │   ├── users-action-dialog.tsx
│   │   │   ├── users-invite-dialog.tsx
│   │   │   ├── users-deactivate-dialog.tsx
│   │   │   ├── data-table-toolbar.tsx
│   │   │   ├── data-table-column-header.tsx
│   │   │   ├── data-table-faceted-filter.tsx
│   │   │   ├── data-table-pagination.tsx
│   │   │   ├── data-table-row-actions.tsx
│   │   │   └── data-table-view-options.tsx
│   │   └── data/
│   │       ├── schema.ts
│   │       ├── data.ts
│   │       └── users.ts
│   │
│   ├── settings/                       # Route: /settings
│   │   ├── layout.tsx                  # Settings sidebar layout
│   │   ├── page.tsx                    # General settings
│   │   ├── components/
│   │   │   ├── sidebar-nav.tsx
│   │   │   ├── content-section.tsx
│   │   │   ├── general-form.tsx
│   │   │   └── delete-actions.tsx
│   │   ├── profile/
│   │   │   ├── page.tsx
│   │   │   └── profile-form.tsx
│   │   ├── billing/
│   │   │   ├── page.tsx
│   │   │   └── billing-form.tsx
│   │   ├── notifications/
│   │   │   ├── page.tsx
│   │   │   └── notifications-form.tsx
│   │   ├── plans/
│   │   │   ├── page.tsx
│   │   │   ├── plan-detail.tsx
│   │   │   ├── components/
│   │   │   │   ├── subscribe-drawer.tsx
│   │   │   │   └── add-new-card.tsx
│   │   │   └── data/
│   │   │       └── data.ts
│   │   └── connected-apps/
│   │       ├── page.tsx
│   │       ├── components/
│   │       │   └── connect-app-form.tsx
│   │       └── data/
│   │           └── data.tsx
│   │
│   └── developers/                     # Route: /developers
│       ├── layout.tsx                  # Developers tabs layout
│       ├── overview/
│       │   ├── page.tsx
│       │   ├── components/
│       │   │   ├── recent-activity.tsx
│       │   │   ├── total-visitors-chart.tsx
│       │   │   ├── api-requests-chart.tsx
│       │   │   └── api-response-time-chart.tsx
│       │   └── data/
│       │       └── data.tsx
│       ├── api-keys/
│       │   ├── page.tsx
│       │   └── components/
│       │       └── create-api-key-dialog.tsx
│       ├── webhooks/
│       │   ├── page.tsx
│       │   ├── [id]/
│       │   │   ├── page.tsx
│       │   │   └── components/
│       │   │       ├── webhook-detail-actions.tsx
│       │   │       ├── webhook-status-icon.tsx
│       │   │       ├── webhook-logs-table.tsx
│       │   │       └── webhook-logs-columns.tsx
│       │   ├── components/
│       │   │   ├── webhooks-table.tsx
│       │   │   ├── webhooks-columns.tsx
│       │   │   ├── add-webhook.tsx
│       │   │   ├── mutate-webhook.tsx
│       │   │   ├── data-table-toolbar.tsx
│       │   │   └── data-table-column-header.tsx
│       │   └── data/
│       └── events-&-logs/
│           ├── page.tsx
│           ├── components/
│           │   ├── logs.tsx
│           │   ├── logs-table.tsx
│           │   ├── logs-list.tsx
│           │   ├── logs-toolbar.tsx
│           │   ├── logs-actions.tsx
│           │   ├── filters.tsx
│           │   ├── mobile-filter-sheet.tsx
│           │   ├── route-view.tsx
│           │   ├── referrers.tsx
│           │   ├── view-all-routes.tsx
│           │   ├── view-all-referrers.tsx
│           │   └── import-dialog.tsx
│           └── data/
│
└── (errors)/                           # Error pages route group
    ├── 401/
    │   └── page.tsx
    ├── 403/
    │   └── page.tsx
    ├── 404/
    │   └── page.tsx
    ├── 503/
    │   └── page.tsx
    └── error/
        └── page.tsx
```

---

## Component Inventory

### UI Components (KEEP - These are shadcn/ui primitives)

Located in `/app/src/components/ui/`:

1. `accordion.tsx` - Collapsible content panels
2. `alert-dialog.tsx` - Modal confirmation dialogs
3. `alert.tsx` - Inline notification messages
4. `avatar.tsx` - User profile images
5. `badge.tsx` - Status indicators and labels
6. `breadcrumb.tsx` - Navigation breadcrumbs
7. `button.tsx` - Clickable buttons with variants
8. `calendar.tsx` - Date selection calendar
9. `card.tsx` - Container component for content grouping
10. `chart.tsx` - Chart wrapper components
11. `checkbox.tsx` - Form checkbox input
12. `collapsible.tsx` - Expandable/collapsible content
13. `command.tsx` - Command palette/search
14. `dialog.tsx` - Modal dialogs
15. `drawer.tsx` - Slide-out panels
16. `dropdown-menu.tsx` - Contextual menus
17. `form.tsx` - Form field components
18. `input.tsx` - Text input fields
19. `label.tsx` - Form labels
20. `pagination.tsx` - Page navigation
21. `popover.tsx` - Floating content popovers
22. `progress.tsx` - Progress bars
23. `radio-group.tsx` - Radio button groups
24. `scroll-area.tsx` - Scrollable containers
25. `select.tsx` - Dropdown select inputs
26. `separator.tsx` - Visual dividers
27. `sheet.tsx` - Side panel dialogs
28. `sidebar.tsx` - Collapsible sidebar navigation (New in shadcn/ui v2)
29. `skeleton.tsx` - Loading placeholders
30. `switch.tsx` - Toggle switches
31. `table.tsx` - Data table primitives
32. `tabs.tsx` - Tabbed interfaces
33. `textarea.tsx` - Multi-line text input
34. `toast.tsx` - Toast notifications
35. `toaster.tsx` - Toast notification container
36. `tooltip.tsx` - Hover tooltips

**Total: 36 shadcn/ui components**

---

### Shared Components (KEEP - Reusable utilities)

Located in `/app/src/components/`:

1. `back-button.tsx` - Navigation back button
2. `calendar-date-picker.tsx` - Enhanced date picker
3. `command-menu.tsx` - Global command palette
4. `confirm-dialog.tsx` - Reusable confirmation dialog
5. `copy-button.tsx` - Copy-to-clipboard button
6. `date-input.tsx` - Date input field
7. `date-picker.tsx` - Single date picker
8. `date-range-picker.tsx` - Date range selection
9. `logo.tsx` - Application logo component
10. `long-text.tsx` - Text truncation/expansion
11. `password-input.tsx` - Password input with visibility toggle
12. `search-input.tsx` - Search input field
13. `search-provider.tsx` - Search context provider
14. `search.tsx` - Search component
15. `select-dropdown.tsx` - Enhanced select dropdown
16. `theme-provider.tsx` - Theme context provider
17. `theme-switch.tsx` - Dark/light mode toggle

**Total: 17 shared components**

---

### Layout Components (KEEP - Navigation structure)

Located in `/app/src/components/layout/`:

1. `app-sidebar.tsx` - Main application sidebar
2. `header.tsx` - Dashboard header component
3. `nav-group.tsx` - Sidebar navigation groups
4. `nav-user.tsx` - User profile in sidebar
5. `team-switcher.tsx` - Organization/team switcher
6. `types.ts` - TypeScript types for sidebar
7. `data/sidebar-data.tsx` - Sidebar navigation configuration

**Total: 7 layout components**

---

### Error Components (KEEP - Error page templates)

Located in `/app/src/components/errors/`:

1. `forbidden.tsx` - 403 Forbidden error
2. `general-error.tsx` - Generic error component
3. `maintenance-error.tsx` - 503 Maintenance error
4. `not-found-error.tsx` - 404 Not Found error
5. `unauthorized-error.tsx` - 401 Unauthorized error

**Total: 5 error components**

---

### Page-Specific Components (REMOVE - Will be deleted)

All components located within `/app/src/app/(dashboard)/*/components/` are page-specific and will be removed:

#### Dashboard 1 Components (2 files)
- `(dashboard-1)/components/dashboard-1-actions.tsx`
- Plus board content in `boards/overview/` and `boards/analytics/`

#### Dashboard 2 Components (6 files)
- `dashboard-2/components/dashboard-2-actions.tsx`
- `dashboard-2/components/recent-activity.tsx`
- `dashboard-2/components/revenue-chart.tsx`
- `dashboard-2/components/stats-card.tsx`
- `dashboard-2/components/stats.tsx`
- `dashboard-2/components/visitors.tsx`

#### Dashboard 3 Components (6 files)
- `dashboard-3/components/dashboard-3-actions.tsx`
- `dashboard-3/components/budget.tsx`
- `dashboard-3/components/radar-card.tsx`
- `dashboard-3/components/stack-bar.tsx`
- `dashboard-3/components/stats.tsx`
- `dashboard-3/components/visitors.tsx`

#### Tasks Components (13 files)
- `tasks/components/tasks-table.tsx`
- `tasks/components/tasks-columns.tsx`
- `tasks/components/tasks-primary-actions.tsx`
- `tasks/components/tasks-mutate-drawer.tsx`
- `tasks/components/tasks-import-dialog.tsx`
- `tasks/components/tasks-detail-dialog.tsx`
- `tasks/components/tasks-detail-viewer.tsx`
- `tasks/components/data-table-toolbar.tsx`
- `tasks/components/data-table-column-header.tsx`
- `tasks/components/data-table-faceted-filter.tsx`
- `tasks/components/data-table-pagination.tsx`
- `tasks/components/data-table-row-actions.tsx`
- `tasks/components/data-table-view-options.tsx`

#### Users Components (13 files)
- `users/components/users-table.tsx`
- `users/components/users-columns.tsx`
- `users/components/users-stats.tsx`
- `users/components/user-primary-actions.tsx`
- `users/components/users-action-dialog.tsx`
- `users/components/users-invite-dialog.tsx`
- `users/components/users-deactivate-dialog.tsx`
- `users/components/data-table-toolbar.tsx`
- `users/components/data-table-column-header.tsx`
- `users/components/data-table-faceted-filter.tsx`
- `users/components/data-table-pagination.tsx`
- `users/components/data-table-row-actions.tsx`
- `users/components/data-table-view-options.tsx`

#### Settings Components (7 files)
- `settings/components/sidebar-nav.tsx`
- `settings/components/content-section.tsx`
- `settings/components/general-form.tsx`
- `settings/components/delete-actions.tsx`
- `settings/profile/profile-form.tsx`
- `settings/billing/billing-form.tsx`
- `settings/notifications/notifications-form.tsx`
- `settings/plans/components/subscribe-drawer.tsx`
- `settings/plans/components/add-new-card.tsx`
- `settings/plans/plan-detail.tsx`
- `settings/connected-apps/components/connect-app-form.tsx`

#### Developers Components (21 files)
- `developers/overview/components/recent-activity.tsx`
- `developers/overview/components/total-visitors-chart.tsx`
- `developers/overview/components/api-requests-chart.tsx`
- `developers/overview/components/api-response-time-chart.tsx`
- `developers/api-keys/components/create-api-key-dialog.tsx`
- `developers/webhooks/components/webhooks-table.tsx`
- `developers/webhooks/components/webhooks-columns.tsx`
- `developers/webhooks/components/add-webhook.tsx`
- `developers/webhooks/components/mutate-webhook.tsx`
- `developers/webhooks/components/data-table-toolbar.tsx`
- `developers/webhooks/components/data-table-column-header.tsx`
- `developers/webhooks/[id]/components/webhook-detail-actions.tsx`
- `developers/webhooks/[id]/components/webhook-status-icon.tsx`
- `developers/webhooks/[id]/components/webhook-logs-table.tsx`
- `developers/webhooks/[id]/components/webhook-logs-columns.tsx`
- `developers/events-&-logs/components/logs.tsx`
- `developers/events-&-logs/components/logs-table.tsx`
- `developers/events-&-logs/components/logs-list.tsx`
- `developers/events-&-logs/components/logs-toolbar.tsx`
- `developers/events-&-logs/components/logs-actions.tsx`
- `developers/events-&-logs/components/filters.tsx`
- `developers/events-&-logs/components/mobile-filter-sheet.tsx`
- `developers/events-&-logs/components/route-view.tsx`
- `developers/events-&-logs/components/referrers.tsx`
- `developers/events-&-logs/components/view-all-routes.tsx`
- `developers/events-&-logs/components/view-all-referrers.tsx`
- `developers/events-&-logs/components/import-dialog.tsx`

#### Auth Components (3 files)
- `(auth)/login/components/user-auth-form.tsx`
- `(auth)/register/components/register-form.tsx`
- `(auth)/forgot-password/components/forgot-password-form.tsx`

**Total page-specific components to remove: ~90+ files**

---

## Navigation Structure

### Current Sidebar Configuration

Located in `/app/src/components/layout/data/sidebar-data.tsx`:

```typescript
{
  user: {
    name: "ausrobdev",
    email: "rob@shadcnblocks.com",
    avatar: "/avatars/ausrobdev-avatar.png"
  },
  teams: [
    {
      name: "Shadcnblocks - Admin Kit",
      logo: Logo,
      plan: "Nextjs + shadcn/ui"
    },
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise"
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup"
    }
  ],
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          icon: IconLayoutDashboard,
          items: [
            { title: "Dashboard 1", url: "/" },
            { title: "Dashboard 2", url: "/dashboard-2" },
            { title: "Dashboard 3", url: "/dashboard-3" }
          ]
        },
        { title: "Tasks", url: "/tasks", icon: IconChecklist },
        { title: "Users", url: "/users", icon: IconUsers }
      ]
    },
    {
      title: "Pages",
      items: [
        {
          title: "Auth",
          icon: IconLockAccess,
          items: [
            { title: "Login", url: "/login" },
            { title: "Register", url: "/register" },
            { title: "Forgot Password", url: "/forgot-password" }
          ]
        },
        {
          title: "Errors",
          icon: IconBug,
          items: [
            { title: "Unauthorized", url: "/401", icon: IconLock },
            { title: "Forbidden", url: "/403", icon: IconUserOff },
            { title: "Not Found", url: "/404", icon: IconError404 },
            { title: "Internal Server Error", url: "/error", icon: IconServerOff },
            { title: "Maintenance Error", url: "/503", icon: IconBarrierBlock }
          ]
        }
      ]
    },
    {
      title: "Other",
      items: [
        {
          title: "Settings",
          icon: IconSettings,
          items: [
            { title: "General", icon: IconTool, url: "/settings" },
            { title: "Profile", icon: IconUser, url: "/settings/profile" },
            { title: "Billing", icon: IconCoin, url: "/settings/billing" },
            { title: "Plans", icon: IconChecklist, url: "/settings/plans" },
            { title: "Connected Apps", icon: IconApps, url: "/settings/connected-apps" },
            { title: "Notifications", icon: IconNotification, url: "/settings/notifications" }
          ]
        },
        {
          title: "Developers",
          icon: IconCode,
          items: [
            { title: "Overview", url: "/developers/overview" },
            { title: "API Keys", url: "/developers/api-keys" },
            { title: "Webhooks", url: "/developers/webhooks" },
            { title: "Events/Logs", url: "/developers/events-&-logs" }
          ]
        }
      ]
    }
  ]
}
```

### Navigation Hierarchy

```
General
├── Dashboard (dropdown)
│   ├── Dashboard 1 (/)
│   ├── Dashboard 2 (/dashboard-2)
│   └── Dashboard 3 (/dashboard-3)
├── Tasks (/tasks)
└── Users (/users)

Pages
├── Auth (dropdown)
│   ├── Login (/login)
│   ├── Register (/register)
│   └── Forgot Password (/forgot-password)
└── Errors (dropdown)
    ├── Unauthorized (/401)
    ├── Forbidden (/403)
    ├── Not Found (/404)
    ├── Internal Server Error (/error)
    └── Maintenance Error (/503)

Other
├── Settings (dropdown)
│   ├── General (/settings)
│   ├── Profile (/settings/profile)
│   ├── Billing (/settings/billing)
│   ├── Plans (/settings/plans)
│   ├── Connected Apps (/settings/connected-apps)
│   └── Notifications (/settings/notifications)
└── Developers (dropdown)
    ├── Overview (/developers/overview)
    ├── API Keys (/developers/api-keys)
    ├── Webhooks (/developers/webhooks)
    └── Events/Logs (/developers/events-&-logs)
```

---

## Layout Hierarchy

### Root Layout
**File:** `/app/src/app/layout.tsx`

**Responsibilities:**
- HTML document structure
- Font loading (Inter font)
- Global CSS injection
- Providers wrapper (theme + search)
- Toaster component
- Metadata (title, description)

**Key Features:**
- `suppressHydrationWarning` for theme support
- Dark mode class toggling
- Global body classes

---

### Auth Layout
**File:** `/app/src/app/(auth)/layout.tsx`

**Responsibilities:**
- Centered authentication container
- Logo and branding header
- Responsive width constraints (480px max on desktop)
- Vertical/horizontal centering

**Applied to:**
- `/login`
- `/register`
- `/forgot-password`

---

### Dashboard Layout
**File:** `/app/src/app/(dashboard)/layout.tsx`

**Responsibilities:**
- Sidebar provider (collapsible state management)
- AppSidebar component rendering
- Cookie-based sidebar state persistence
- Content area wrapper with responsive grid
- Scroll lock handling

**Applied to:**
- All dashboard routes (/, /dashboard-2, /dashboard-3)
- Task management (/tasks)
- User management (/users)
- Settings pages (/settings/*)
- Developer tools (/developers/*)

---

### Settings Layout
**File:** `/app/src/app/(dashboard)/settings/layout.tsx`

**Responsibilities:**
- Settings sidebar navigation
- Content area wrapper
- Responsive layout (sidebar collapses on mobile)

**Applied to:**
- `/settings` (General)
- `/settings/profile`
- `/settings/billing`
- `/settings/notifications`
- `/settings/plans`
- `/settings/connected-apps`

---

### Developers Layout
**File:** `/app/src/app/(dashboard)/developers/layout.tsx`

**Responsibilities:**
- Tab-based navigation for developer sections
- Shared header/actions area

**Applied to:**
- `/developers/overview`
- `/developers/api-keys`
- `/developers/webhooks`
- `/developers/events-&-logs`

---

## Providers and Context

### Theme Provider
**File:** `/app/src/components/theme-provider.tsx`

**Purpose:** Dark/light mode management using `next-themes`

**Features:**
- System theme detection
- Class-based theme switching
- Persistent theme preference
- Disable transitions on theme change

---

### Search Provider
**File:** `/app/src/components/search-provider.tsx`

**Purpose:** Global search command palette state

**Features:**
- Cmd+K / Ctrl+K keyboard shortcut
- Global search dialog state management
- Used by command-menu component

---

### Sidebar Provider
**From:** `@/components/ui/sidebar`

**Purpose:** Collapsible sidebar state management

**Features:**
- Cookie-based state persistence
- Open/close state tracking
- Mobile responsiveness

---

## Hooks

Located in `/app/src/hooks/`:

1. `use-mobile.tsx` - Detect mobile viewport
2. `use-toast.ts` - Toast notification hook
3. `use-dialog-state.tsx` - Dialog state management

---

## Utilities

Located in `/app/src/lib/`:

1. `utils.ts` - Utility functions (cn, etc.)
2. `filter-countries.ts` - Country filtering helper
3. `notify-submitted-values.tsx` - Form submission notification

---

## Dependencies Analysis

### Core Framework
- `next@15.1.7` - Latest Next.js with App Router
- `react@19.0.0` - React 19
- `react-dom@19.0.0` - React DOM 19
- `typescript@5.7.3` - TypeScript

### UI Primitives (Radix UI)
- `@radix-ui/react-*` - 18 Radix UI primitives
- All shadcn/ui components are built on Radix UI

### Styling
- `tailwindcss@4.0.7` - Tailwind CSS v4 (latest)
- `tailwindcss-animate` - Animation utilities
- `tailwind-merge` - Class merging utility
- `class-variance-authority` - Variant-based styling
- `clsx` - Class name composition

### Forms & Validation
- `react-hook-form@7.53.2` - Form state management
- `@hookform/resolvers` - Form validation resolvers
- `zod@3.23.8` - Schema validation

### Data Tables
- `@tanstack/react-table@8.20.5` - Headless table library
- Powers all data table implementations

### Charts & Visualization
- `recharts@2.15.1` - Chart library
- Used in all dashboard visualizations

### UI Libraries
- `@tabler/icons-react@3.22.0` - Tabler icon set
- `lucide-react@0.475.0` - Lucide icon set
- Icons used throughout navigation and UI

### Date/Time
- `date-fns@4.1.0` - Date manipulation
- `date-fns-tz@3.2.0` - Timezone support
- `react-day-picker@8.10.1` - Calendar/date picker

### Other
- `cmdk@1.0.4` - Command palette (Cmd+K)
- `next-themes@0.4.4` - Theme management
- `vaul@1.1.2` - Drawer component
- `@faker-js/faker@9.3.0` - Mock data generation
- `country-region-data@3.1.0` - Country/region data

---

## Public Assets

Located in `/app/public/`:

1. `shadcnblocks-admin-logo.svg` - Application logo
2. `avatars/` - User avatar images (21 files)
   - `ausrobdev-avatar.png`
   - Various sample avatars

---

## Routes Summary

### Active Routes (20+ pages)

**Authentication (3)**
- `/login` - User login
- `/register` - User registration
- `/forgot-password` - Password recovery

**Dashboards (3)**
- `/` - Dashboard 1 (tabs: overview, analytics)
- `/dashboard-2` - Dashboard 2
- `/dashboard-3` - Dashboard 3

**Task Management (2)**
- `/tasks` - Task list with data table
- `/tasks/[id]` - Task detail page

**User Management (2)**
- `/users` - User list with data table
- `/users/[id]` - User detail page

**Settings (6)**
- `/settings` - General settings
- `/settings/profile` - Profile settings
- `/settings/billing` - Billing information
- `/settings/notifications` - Notification preferences
- `/settings/plans` - Subscription plans
- `/settings/connected-apps` - Third-party integrations

**Developer Tools (4)**
- `/developers/overview` - Developer dashboard
- `/developers/api-keys` - API key management
- `/developers/webhooks` - Webhook configuration
- `/developers/webhooks/[id]` - Webhook detail
- `/developers/events-&-logs` - Event logs

**Error Pages (5)**
- `/401` - Unauthorized
- `/403` - Forbidden
- `/404` - Not Found
- `/503` - Service Unavailable
- `/error` - Generic error

---

## Key Patterns and Features

### Route Groups
- `(auth)` - Authentication pages (special layout)
- `(dashboard)` - All dashboard pages (sidebar layout)
- `(dashboard-1)` - Nested group for default dashboard
- `(errors)` - Error pages (minimal layout)

### Data Table Pattern
Used in:
- Tasks section
- Users section
- Webhooks section
- Event logs section

**Components:**
- `*-table.tsx` - Main table wrapper
- `*-columns.tsx` - Column definitions
- `data-table-toolbar.tsx` - Filters and search
- `data-table-pagination.tsx` - Pagination controls
- `data-table-column-header.tsx` - Sortable headers
- `data-table-faceted-filter.tsx` - Filter dropdowns
- `data-table-row-actions.tsx` - Row action menus
- `data-table-view-options.tsx` - Column visibility

### Settings Pattern
- Sidebar navigation with nested routes
- Form-based pages with validation
- Responsive layout (sidebar → tabs on mobile)

### Developer Tools Pattern
- Tab-based navigation at layout level
- Shared header across all developer pages
- Data visualization and monitoring focus

---

## Configuration Files

### TypeScript
- Uses TypeScript 5.7.3
- Path aliases configured (`@/*` → `src/*`)
- Strict mode enabled

### Tailwind
- Tailwind CSS v4.0.7
- Custom theme configuration
- Animation utilities included
- Typography plugin (`@tailwindcss/typography`)

### Next.js
- App Router (not Pages Router)
- React 19
- Server Components by default
- Client Components marked with `"use client"`

---

## Notes for Transformation

### Components to Preserve
1. **All UI components** (`/components/ui/*`) - Core design system
2. **Shared components** (`/components/*`) - Reusable utilities
3. **Layout components** (`/components/layout/*`) - Navigation structure
4. **Error components** (`/components/errors/*`) - Error templates
5. **Hooks** (`/hooks/*`) - Custom React hooks
6. **Utilities** (`/lib/*`) - Helper functions

### Components to Remove
1. All page-specific components in `/app/(dashboard)/*/components/`
2. All data files in `/app/(dashboard)/*/data/`
3. Auth form components (login, register, forgot password)

### Routes to Remove
1. All dashboard routes (`/`, `/dashboard-2`, `/dashboard-3`)
2. All task routes (`/tasks/*`)
3. All user routes (`/users/*`)
4. All settings routes (`/settings/*`)
5. All developer routes (`/developers/*`)
6. All auth routes (`/login`, `/register`, `/forgot-password`)
7. Keep error routes for reference/templates

### Layouts to Modify
1. Root layout - Keep (contains theme, providers)
2. Dashboard layout - Modify (update sidebar data)
3. Auth layout - Remove (no auth pages in showcase)
4. Settings layout - Remove (no settings in showcase)
5. Developers layout - Remove (no developer tools in showcase)

---

## Summary Statistics

- **Total Routes:** 20+ pages
- **UI Components:** 36 shadcn/ui components
- **Shared Components:** 17 reusable components
- **Layout Components:** 7 navigation components
- **Error Components:** 5 error templates
- **Page-Specific Components:** ~90+ files (to be removed)
- **Hooks:** 3 custom hooks
- **Utilities:** 3 utility files
- **Dependencies:** 40+ packages
- **Route Groups:** 4 groups (auth, dashboard, dashboard-1, errors)

---

## Next Steps

With this audit complete, we can proceed to:

1. **Phase 2:** Clean up the template
   - Remove all page-specific components
   - Delete all current routes except error pages
   - Update sidebar-data.tsx with placeholder navigation
   - Keep all UI components, shared components, and layouts

2. **Phase 3:** Build new showcase structure
   - Create component showcase pages
   - Build interactive component demos
   - Add documentation pages
   - Configure new navigation

3. **Phase 4:** Enhance and polish
   - Add code highlighting
   - Add copy-to-clipboard for code examples
   - Add search functionality
   - Add theme customization tools

# Design System Integration - Setup Complete ✅

The Vibeflow design system (`/brand/strategy/design/`) is now integrated with the Next.js app.

## What's Configured

### ✅ TypeScript Path Aliases
**File:** `/app/tsconfig.json`

```json
"paths": {
  "@/*": ["./src/*"],
  "@brand/*": ["../brand/*"],
  "@design": ["../brand/strategy/design"],
  "@design/*": ["../brand/strategy/design/*"]
}
```

**Usage:**
```tsx
import { Card, NeonButton } from '@design/components';
import '@design/build/tokens.css';
```

### ✅ Design Tokens Imported
**File:** `/app/src/app/globals.css` (line 2)

```css
@import "../../../brand/strategy/design/build/tokens.css";
```

All design tokens are now available as CSS variables:
- `var(--color-neon-pink)`, `var(--color-neon-cyan)`
- `var(--spacing-lg)`, `var(--spacing-xl)`
- `var(--font-family-display)`, `var(--font-size-4xl)`
- And 90+ more tokens

### ✅ Build Scripts Configured
**File:** `/app/package.json`

```json
"scripts": {
  "dev": "next dev",
  "build": "npm run tokens:build && next build",
  "tokens:build": "cd ../brand/strategy/design && npm run tokens:build",
  "tokens:watch": "cd ../brand/strategy/design && npm run tokens:watch"
}
```

### ✅ MDX Components Provider
**File:** `/app/mdx-components.tsx`

Makes all design system components available globally in MDX files:
- Card
- NeonButton
- StatCard
- SectionHeader
- ActivityItem
- BarChart

### ✅ Next.js MDX Configuration
**File:** `/app/next.config.ts`

Configured to support `.mdx` files and use the components provider.

### ✅ Test Pages Created
- **TSX Test:** `/app/src/app/design-test/page.tsx` - Full component showcase
- **MDX Test:** `/app/src/app/mdx-test/page.mdx` - MDX with embedded components

---

## To Enable MDX Support (Required)

MDX packages need to be installed. Run this in the `/app/` directory:

```bash
cd app
npm install @next/mdx @mdx-js/loader @mdx-js/react
```

**What this enables:**
- `.mdx` files in the `app/` directory
- Components automatically available (via `mdx-components.tsx`)
- AI-generated content with branded components

---

## Testing the Integration

### 1. Build Design Tokens
```bash
cd /brand/strategy/design
npm run tokens:build
```

### 2. Start the App
```bash
cd /app
npm run dev
```

### 3. View Test Pages

**Component Test (TSX):** http://localhost:3000/design-test
- Shows all design system components
- Tests import via `@design/components`
- Displays color tokens, stats, charts

**MDX Test:** http://localhost:3000/mdx-test *(requires MDX packages)*
- Shows components in MDX content
- Tests `mdx-components.tsx` provider
- Demonstrates AI content generation pattern

---

## Usage Patterns

### Pattern 1: Import in TSX Components

```tsx
// In any component file
import { Card, NeonButton, StatCard } from '@design/components';

export function MyComponent() {
  return (
    <Card glow={true}>
      <StatCard label="SESSIONS" value="24,891" indicator="pink" />
      <NeonButton variant="primary">Click Me</NeonButton>
    </Card>
  );
}
```

### Pattern 2: Use in MDX Files

```mdx
---
title: "My Blog Post"
---

# Welcome

<Card glow={true}>
  <StatCard label="VIEWS" value="10,000" indicator="cyan" />
</Card>

<NeonButton variant="primary">Read More</NeonButton>
```

**No imports needed** - components available automatically via `mdx-components.tsx`.

### Pattern 3: Use Design Tokens Directly

```tsx
<div
  className="p-[--spacing-lg] rounded-[--radius-md]"
  style={{
    background: 'var(--color-neon-pink)',
    color: 'var(--color-neon-white)'
  }}
>
  Custom styled with tokens
</div>
```

### Pattern 4: AI-Generated Content

**Agent Context:**
```
Load:
- /brand/strategy/design/DESIGN.md (token reference)
- /brand/strategy/design/components/README.md (component API)

Generate MDX with:
- Card, StatCard, NeonButton components
- Design token CSS variables
- Brand voice and messaging
```

**Agent Output:**
```mdx
<Card glow={true}>
  <SectionHeader>OWN YOUR INFRASTRUCTURE</SectionHeader>

  <StatCard
    label="EFFICIENCY"
    value="10-20x"
    subtitle="Without losing quality"
    indicator="cyan"
  />

  <NeonButton variant="primary">Start Building</NeonButton>
</Card>
```

---

## Development Workflow

### Editing Design Tokens

```bash
# 1. Edit tokens
cd /brand/strategy/design
vim tokens/color.json  # or typography.json, spacing.json

# 2. Rebuild tokens
npm run tokens:build

# 3. App hot-reloads automatically (tokens.css imported in globals.css)
```

### Adding New Components

```bash
# 1. Create component in design system
cd /brand/strategy/design/components
vim NewComponent.tsx

# 2. Export from index
# Add to components/index.ts

# 3. Make available in MDX (optional)
cd /app
# Add to mdx-components.tsx
```

### Watching for Changes

**Terminal 1 - Watch tokens:**
```bash
cd /brand/strategy/design
npm run tokens:watch
```

**Terminal 2 - Run app:**
```bash
cd /app
npm run dev
```

Changes to tokens auto-rebuild and hot-reload in the app.

---

## File Structure

```
/workspace-root/
├── /app/                                      # Next.js app
│   ├── tsconfig.json                          # ✅ Path aliases configured
│   ├── next.config.ts                         # ✅ MDX configured
│   ├── mdx-components.tsx                     # ✅ Component provider created
│   ├── package.json                           # ✅ Build scripts added
│   └── /src/
│       ├── /app/
│       │   ├── globals.css                    # ✅ Tokens imported
│       │   ├── /design-test/
│       │   │   └── page.tsx                   # ✅ TSX test created
│       │   └── /mdx-test/
│       │       └── page.mdx                   # ✅ MDX test created
│
├── /brand/strategy/design/                    # Design system (source)
│   ├── /tokens/                               # Source of truth
│   │   ├── color.json
│   │   ├── typography.json
│   │   └── spacing.json
│   ├── /build/
│   │   └── tokens.css                         # Generated, imported by app
│   ├── /components/
│   │   ├── Card.tsx
│   │   ├── NeonButton.tsx
│   │   ├── StatCard.tsx
│   │   └── index.ts
│   ├── DESIGN.md                              # Technical docs
│   └── STRATEGY.md                            # Strategic rationale
```

---

## Next Steps

### Immediate (Required for MDX)
- [ ] Install MDX packages: `npm install @next/mdx @mdx-js/loader @mdx-js/react`
- [ ] Test MDX page: http://localhost:3000/mdx-test

### Short Term
- [ ] Update content-creation skill to reference design system
- [ ] Create example content generation workflow
- [ ] Document AI agent usage patterns

### Long Term
- [ ] Add more components as needed
- [ ] Create dark mode tokens (extend pattern)
- [ ] Add animation tokens
- [ ] Consider component library npm package (optional)

---

## Design System Documentation

**For developers:**
- Technical reference: `/brand/strategy/design/DESIGN.md`
- Component API: `/brand/strategy/design/components/README.md`
- Token structure: `/brand/strategy/design/tokens/`

**For strategists:**
- Strategic rationale: `/brand/strategy/design/STRATEGY.md`
- Brand fundamentals: `/brand/strategy/brand-fundamentals/STRATEGY.md`

**For AI agents:**
- Load DESIGN.md for token reference
- Load components/README.md for component API
- Generate brand-consistent content automatically

---

## Troubleshooting

### Issue: Components not found

**Error:** `Module not found: Can't resolve '@design/components'`

**Solution:**
1. Check TypeScript path aliases in `tsconfig.json`
2. Restart TypeScript server (VS Code: Cmd+Shift+P → "Restart TS Server")
3. Restart Next.js dev server

### Issue: Design tokens not applying

**Error:** CSS variables showing as `undefined` or not applying styles

**Solution:**
1. Build tokens: `cd /brand/strategy/design && npm run tokens:build`
2. Verify `tokens.css` exists: `cat /brand/strategy/design/build/tokens.css`
3. Check import in `globals.css` (line 2)
4. Hard refresh browser (Cmd+Shift+R)

### Issue: MDX components not available

**Error:** Components undefined in MDX files

**Solution:**
1. Install MDX packages: `npm install @next/mdx @mdx-js/loader @mdx-js/react`
2. Check `mdx-components.tsx` exists and exports `useMDXComponents`
3. Verify Next.js config includes MDX (pageExtensions)
4. Restart dev server

---

**Setup Status:** ✅ Complete (pending MDX package install)

**Created:** 2025-11-03
**Last Updated:** 2025-11-03

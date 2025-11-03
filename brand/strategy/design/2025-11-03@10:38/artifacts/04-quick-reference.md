# Phase 4: Quick Reference Guide

## Token Integration at a Glance

### 🎨 What Was Built
A complete integration of 53 design tokens from the Vibeflow design system into the showcase app.

### 📊 Token Count by Category
- **Color**: 18 tokens (Brand, Neutral, Semantic)
- **Typography**: 19 tokens (Families, Sizes, Weights, Line Heights)
- **Spacing**: 9 tokens (xs through 5xl)
- **Border Radius**: 7 tokens (none through full)
- **Total**: 53 design tokens

## Key Files

### Core Integration
```
/app/src/lib/token-reader.ts          # Token parsing utility
/app/src/app/globals.css              # Imports tokens.css
/app/src/styles/tokens.css            # Design system CSS
```

### Display Components
```
/app/src/components/tokens/
├── ColorSwatch.tsx                   # Color displays
├── TypeScale.tsx                     # Typography displays
└── SpacingScale.tsx                  # Spacing/radius displays
```

### Token Page
```
/app/src/app/(dashboard)/tokens/page.tsx    # Main showcase page
```

## Usage Examples

### Reading Tokens in Code
```typescript
import { getAllTokens } from '@/lib/token-reader'

const tokens = getAllTokens()
console.log(tokens.colors.brand)      // [{ name: 'Primary', value: '#2563EB', cssVar: '--color-brand-primary' }]
console.log(tokens.typography.fontSizes)  // Font size tokens
console.log(tokens.spacing)           // Spacing tokens
console.log(tokens.radius)            // Radius tokens
```

### Using Token Display Components
```typescript
import { ColorPalette } from '@/components/tokens/ColorSwatch'
import { TypeScaleList } from '@/components/tokens/TypeScale'
import { SpacingScaleList } from '@/components/tokens/SpacingScale'

// Display colors
<ColorPalette
  title="Brand Colors"
  tokens={tokens.colors.brand}
  description="Primary brand colors"
  showCssVars={true}
/>

// Display type scale
<TypeScaleList
  tokens={tokens.typography.fontSizes}
  showCssVars={true}
/>

// Display spacing
<SpacingScaleList
  tokens={tokens.spacing}
  showCssVars={true}
/>
```

### Using CSS Variables in Components
```css
/* In your CSS or Tailwind */
.my-component {
  color: var(--color-brand-primary);
  font-size: var(--font-size-base);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
}
```

```tsx
// In inline styles
<div style={{
  backgroundColor: 'var(--color-brand-primary)',
  fontSize: 'var(--font-size-lg)',
  padding: 'var(--spacing-md)',
  borderRadius: 'var(--radius-lg)'
}}>
```

## Token Naming Convention

### Pattern
```
{Category}{SubCategory}{Name}
```

### Examples
```
ColorBrandPrimary       → --color-brand-primary
FontSizeBase           → --font-size-base
SpacingMd              → --spacing-md
RadiusLg               → --radius-lg
```

## Update Workflow

### When Tokens Change
1. Update source tokens in `/brand/strategy/design/tokens/`
2. Build tokens: `cd /brand/strategy/design && npm run tokens:build`
3. Copy to app: `cp /brand/strategy/design/build/tokens.css /app/src/styles/tokens.css`
4. Rebuild app: `cd /app && npm run build`

### Automated Script (Future Enhancement)
```bash
#!/bin/bash
# scripts/sync-tokens.sh

# Build tokens
cd ../brand/strategy/design
npm run tokens:build

# Copy to app
cp build/tokens.css ../../../app/src/styles/tokens.css

# Rebuild app
cd ../../../app
npm run build

echo "✅ Tokens synced successfully"
```

## TypeScript Interfaces

### Available Types
```typescript
import type {
  ColorToken,
  TypographyToken,
  SpacingToken,
  RadiusToken,
  FontWeightToken,
  LineHeightToken
} from '@/lib/token-reader'

// All tokens follow this structure:
interface Token {
  name: string        // Display name (e.g., "Primary")
  value: string       // Token value (e.g., "#2563EB")
  cssVar: string      // CSS variable name (e.g., "--color-brand-primary")
}
```

## Component Props

### ColorPalette
```typescript
interface ColorPaletteProps {
  title: string                    // Section title
  tokens: ColorToken[]             // Array of color tokens
  description?: string             // Optional description
  showCssVars?: boolean           // Show CSS variable names
}
```

### TypeScaleList
```typescript
interface TypeScaleListProps {
  tokens: TypographyToken[]       // Array of font size tokens
  sampleText?: string             // Custom sample text
  showCssVars?: boolean          // Show CSS variable names
}
```

### SpacingScaleList
```typescript
interface SpacingScaleListProps {
  tokens: SpacingToken[]          // Array of spacing tokens
  showCssVars?: boolean          // Show CSS variable names
}
```

## Directory Structure

```
/app/
├── src/
│   ├── app/
│   │   ├── globals.css                    ← Imports tokens.css
│   │   └── (dashboard)/
│   │       └── tokens/
│   │           └── page.tsx               ← Token showcase page
│   ├── lib/
│   │   └── token-reader.ts                ← Token parsing utility
│   ├── components/
│   │   └── tokens/
│   │       ├── ColorSwatch.tsx            ← Color components
│   │       ├── TypeScale.tsx              ← Typography components
│   │       └── SpacingScale.tsx           ← Spacing/radius components
│   └── styles/
│       └── tokens.css                     ← Design system CSS
└── artifacts/
    ├── 04a-token-reader.ts                ← Token reader code
    ├── 04b-token-display-components.tsx   ← Display components code
    ├── 04c-integration-summary.md         ← Integration details
    ├── 04-phase-complete.md               ← Phase summary
    └── 04-quick-reference.md              ← This file
```

## Available Tokens

### Colors (18)
```
Brand:    Primary, Secondary, Accent
Neutral:  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
Semantic: Success, Error, Warning, Info
```

### Typography (19)
```
Families:     Sans, Mono
Sizes:        xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl
Weights:      Normal, Medium, Semibold, Bold
Line Heights: Tight, Normal, Relaxed
```

### Spacing (9)
```
xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl
```

### Border Radius (7)
```
none, sm, md, lg, xl, 2xl, full
```

## Common Tasks

### Add a New Token Type
1. Add to design system source
2. Rebuild tokens
3. Add interface to `token-reader.ts`
4. Add parsing function to `token-reader.ts`
5. Create display component
6. Add to tokens page

### Display a Single Token
```typescript
import { ColorSwatch } from '@/components/tokens/ColorSwatch'

const token = {
  name: 'Primary',
  value: '#2563EB',
  cssVar: '--color-brand-primary'
}

<ColorSwatch token={token} showCssVar={true} />
```

### Get Specific Token Category
```typescript
import { getColorTokens } from '@/lib/token-reader'

const { brand, neutral, semantic } = getColorTokens()
console.log(brand[0])  // { name: 'Primary', value: '#2563EB', cssVar: '...' }
```

## Build Commands

```bash
# Build design tokens
cd /brand/strategy/design
npm run tokens:build

# Build app
cd /app
npm run build

# Run dev server
npm run dev
```

## Verification Checklist

- [ ] Tokens build successfully
- [ ] tokens.css copied to app/src/styles/
- [ ] globals.css imports tokens.css
- [ ] token-reader.ts reads tokens correctly
- [ ] Display components render properly
- [ ] Tokens page shows all token categories
- [ ] App builds without errors
- [ ] Dev server starts successfully

## Troubleshooting

### Build fails with "Can't resolve tokens.css"
- Ensure tokens.css is in `/app/src/styles/`
- Check import path in globals.css

### "ENOENT: no such file or directory" error
- Ensure tokens are built: `npm run tokens:build`
- Check tokens.json exists in build directory

### Tokens not displaying
- Check token-reader.ts file path is correct
- Verify tokens.json has valid JSON
- Check component imports in tokens page

### CSS variables not available
- Ensure globals.css imports tokens.css
- Check @theme directive in tokens.css
- Verify build completed successfully

## Resources

### Files to Reference
- `/app/src/lib/token-reader.ts` - Token parsing logic
- `/app/src/components/tokens/` - Display components
- `/app/src/app/(dashboard)/tokens/page.tsx` - Usage examples

### External Documentation
- Style Dictionary: https://amzn.github.io/style-dictionary/
- Next.js CSS: https://nextjs.org/docs/app/building-your-application/styling/css
- Tailwind v4: https://tailwindcss.com/docs

---

**Quick Start**: View tokens at `/tokens` route in the app.

# Neonwave '94 Component Library

React components implementing the Neonwave '94 retro/cyberpunk aesthetic from Figma.

## Design Tokens

All components use CSS custom properties from the design token system:

```bash
# Build tokens before using components
npm run tokens:build
```

Import the generated CSS in your app:

```tsx
import '../build/tokens.css';
```

## Components

### Card

Glassmorphic card container with optional neon glow effect.

```tsx
import { Card } from './components';

<Card glow={true}>
  <p>Content here</p>
</Card>
```

**Props:**
- `children: ReactNode` - Card content
- `className?: string` - Additional CSS classes
- `glow?: boolean` - Enable neon glow shadow (default: true)

---

### StatCard

Metric display card with neon indicator dot and subtitle.

```tsx
import { StatCard } from './components';

<StatCard
  label="SESSIONS"
  value="24,891"
  subtitle="+12.4% WoW"
  indicator="pink"
/>
```

**Props:**
- `label: string` - Metric label (displayed in Press Start 2P font)
- `value: string | number` - Primary metric value
- `subtitle?: string` - Optional secondary text
- `indicator?: 'pink' | 'cyan'` - Neon indicator color (default: 'pink')

---

### NeonButton

Retro-styled button with translucent background and Press Start 2P font.

```tsx
import { NeonButton } from './components';

<NeonButton
  variant="primary"
  size="md"
  onClick={() => console.log('Clicked!')}
>
  Click Me
</NeonButton>
```

**Props:**
- `children: ReactNode` - Button text
- `variant?: 'primary' | 'secondary'` - Button style variant
- `size?: 'sm' | 'md' | 'lg'` - Button size
- `onClick?: () => void` - Click handler
- `className?: string` - Additional CSS classes

---

### ActivityItem

Single activity feed item with message and timestamp.

```tsx
import { ActivityItem } from './components';

<ActivityItem
  message="New signup: retro_fan92"
  timestamp="2m"
/>
```

**Props:**
- `message: string` - Activity description
- `timestamp: string` - Time elapsed (e.g., "2m", "1h")

---

### SectionHeader

Retro-styled section header with Press Start 2P font and wide letter-spacing.

```tsx
import { SectionHeader } from './components';

<SectionHeader>PERFORMANCE</SectionHeader>
```

**Props:**
- `children: ReactNode` - Header text
- `className?: string` - Additional CSS classes

---

### BarChart

Simple neon cyan bar chart with glow effect.

```tsx
import { BarChart } from './components';

const data = [46, 135, 203, 232, 215, 157];

<BarChart
  data={data}
  maxHeight={256}
/>
```

**Props:**
- `data: number[]` - Array of values to visualize
- `maxHeight?: number` - Chart height in pixels (default: 256)
- `className?: string` - Additional CSS classes

---

### DashboardExample

Complete dashboard implementation demonstrating all components.

```tsx
import { DashboardExample } from './components';

<DashboardExample />
```

This component shows the full Neonwave '94 dashboard with:
- Header with gradient and buttons
- Overview section with date/time
- Stats grid (4 metric cards)
- Performance chart
- Activity feed
- Footer with online indicator

## Design System Integration

### Color Usage

```tsx
// Neon colors
--color-neon-pink: #ff33ee
--color-neon-cyan: #06bbe0
--color-neon-white: #fdf5ff

// Backgrounds
--color-background-primary: #0c0420 (deep purple)
--color-background-card: rgba(16, 9, 37, 0.6) (glassmorphic)
--color-background-button: rgba(12, 4, 32, 0.4) (translucent)

// Text hierarchy
--color-text-primary: #fdf5ff (100%)
--color-text-secondary: rgba(253, 245, 255, 0.9)
--color-text-tertiary: rgba(253, 245, 255, 0.8)
--color-text-quaternary: rgba(253, 245, 255, 0.7)
--color-text-muted: rgba(253, 245, 255, 0.6)
```

### Typography

```tsx
// Display font (retro pixel)
--font-family-display: 'Press Start 2P', monospace

// Body font (modern legible)
--font-family-sans: Inter, system-ui, sans-serif

// Letter spacing for retro feel
--font-letter-spacing-retro: 0.2em
--font-letter-spacing-retro-wide: 0.3em
```

### Effects

```tsx
// Neon glow shadows
--shadow-neon-glow-pink: 0px 0px 8px 0px #ff33ee
--shadow-neon-glow-pink-lg: 0px 0px 10px 0px rgba(255, 51, 238, 0.6)
--shadow-neon-glow-pink-soft: 0px 10px 25px 0px rgba(255, 51, 238, 0.2)
```

## Installation Notes

### Required Font

Install the Press Start 2P font for authentic retro typography:

```html
<!-- In your HTML head -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
```

Or via npm:

```bash
npm install @fontsource/press-start-2p
```

```tsx
// In your app
import '@fontsource/press-start-2p';
```

### Tailwind Configuration

If using Tailwind v4, import the token CSS in your main CSS file:

```css
@import '../brand/strategy/design/build/tokens.css';
```

The `@theme` directive will automatically make all design tokens available as Tailwind utilities.

## File Structure

```
2025-11-03@12:01/components/
├── index.ts                  # Component exports
├── README.md                 # This file
├── Card.tsx                  # Glassmorphic container
├── StatCard.tsx              # Metric display card
├── NeonButton.tsx            # Retro button
├── ActivityItem.tsx          # Activity feed item
├── SectionHeader.tsx         # Section header
├── BarChart.tsx              # Data visualization
└── DashboardExample.tsx      # Full dashboard demo
```

## Design Strategy

See `/brand/strategy/design/STRATEGY.md` for:
- Complete design system philosophy
- Strategic rationale for Neonwave '94 aesthetic
- Token architecture documentation
- Integration with brand positioning

## Figma Source

Original design: Figma file `koOvjsfOkZVISvI8Q2C3lS` (test-design)

Design tokens are extracted from Figma and maintained in:
- `/brand/strategy/design/tokens/color.json`
- `/brand/strategy/design/tokens/typography.json`
- `/brand/strategy/design/tokens/spacing.json`

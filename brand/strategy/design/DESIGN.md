# Vibeflow Design System - Technical Documentation

## 1. Overview

This design system transforms design tokens into Tailwind v4 CSS utilities for brand-consistent visual content generation.

**What it is:**
- JSON design tokens (colors, typography, spacing) stored in `/brand/strategy/design/tokens/`
- Style Dictionary transforms tokens into Tailwind v4-compatible CSS
- Generated CSS variables used directly in Tailwind utility classes
- Single source of truth for all brand visual properties

**Purpose:**
Enable AI agents and developers to generate on-brand visual content programmatically using consistent design tokens.

**Philosophy:**
Own your infrastructure, not rent tools. This system embeds design decisions directly into your codebase, ensuring brand consistency across all generated content.

**Content Workflow Integration:**
1. Agent loads `/brand/strategy/design/DESIGN.md` (this file)
2. Agent understands available design tokens
3. Agent generates JSX with Tailwind classes using CSS variables
4. Result: Brand-consistent output automatically

---

## 2. Quick Start

### Building Tokens

**From the design system directory:**
```bash
cd /brand/strategy/design

# Install dependencies (first time only)
npm install

# Build tokens (transforms JSON → CSS)
npm run tokens:build

# Watch for changes (auto-rebuild)
npm run tokens:watch
```

**From your app directory:**
```bash
cd /app

# Build tokens before app build
npm run tokens:build

# Watch tokens during development
npm run tokens:watch
```

**Generated output:**
- `/brand/strategy/design/build/tokens.css` - Imported into app/src/app/globals.css
- `/brand/strategy/design/build/tokens.json` - Debugging reference

**Integration:** Tokens automatically imported via globals.css, no manual copying needed!

---

## 3. Token Reference

### Colors

**Brand Colors:**
```
--color-brand-primary: #2563EB (Blue)
--color-brand-secondary: #7C3AED (Purple)
--color-brand-accent: #F59E0B (Amber)
```

**Neutral Scale:**
```
--color-neutral-50: #FAFAFA (Lightest)
--color-neutral-100: #F5F5F5
--color-neutral-200: #E5E5E5
--color-neutral-300: #D4D4D4
--color-neutral-400: #A3A3A3
--color-neutral-500: #737373 (Mid-gray)
--color-neutral-600: #525252
--color-neutral-700: #404040
--color-neutral-800: #262626
--color-neutral-900: #171717
--color-neutral-950: #0A0A0A (Darkest)
```

**Semantic Colors:**
```
--color-semantic-success: var(--color-brand-primary)
--color-semantic-error: #DC2626 (Red)
--color-semantic-warning: var(--color-brand-accent)
--color-semantic-info: var(--color-brand-secondary)
```

**Note:** Semantic colors use `var()` references to base tokens. Changing `--color-brand-primary` automatically updates `--color-semantic-success`.

### Typography

**Font Families:**
```
--font-family-sans: Inter, system-ui, sans-serif
--font-family-mono: JetBrains Mono, monospace
```

**Font Sizes:**
```
--font-size-xs: 0.75rem (12px)
--font-size-sm: 0.875rem (14px)
--font-size-base: 1rem (16px)
--font-size-lg: 1.125rem (18px)
--font-size-xl: 1.25rem (20px)
--font-size-2xl: 1.5rem (24px)
--font-size-3xl: 1.875rem (30px)
--font-size-4xl: 2.25rem (36px)
--font-size-5xl: 3rem (48px)
--font-size-6xl: 3.75rem (60px)
```

**Font Weights:**
```
--font-weight-normal: 400
--font-weight-medium: 500
--font-weight-semibold: 600
--font-weight-bold: 700
```

**Line Heights:**
```
--font-line-height-tight: 1.25
--font-line-height-normal: 1.5
--font-line-height-relaxed: 1.75
```

### Spacing

**Spacing Scale:**
```
--spacing-xs: 0.25rem (4px)
--spacing-sm: 0.5rem (8px)
--spacing-md: 1rem (16px)
--spacing-lg: 1.5rem (24px)
--spacing-xl: 2rem (32px)
--spacing-2xl: 3rem (48px)
--spacing-3xl: 4rem (64px)
--spacing-4xl: 5rem (80px)
--spacing-5xl: 6rem (96px)
```

**Border Radius:**
```
--radius-none: 0
--radius-sm: 0.125rem (2px)
--radius-md: 0.375rem (6px)
--radius-lg: 0.5rem (8px)
--radius-xl: 0.75rem (12px)
--radius-2xl: 1rem (16px)
--radius-full: 9999px (Pill shape)
```

---

## 4. Tailwind v4 Usage

### How Tokens Become Utilities

Tailwind v4's `@theme` directive automatically generates utility classes from your design tokens:

```tsx
// Using color tokens (clean utilities!)
<div className="bg-brand-primary text-neutral-50">
  Brand-colored box with light text
</div>

// Using spacing tokens
<div className="p-lg rounded-md">
  Box with 24px padding and 6px border radius
</div>

// Combining multiple tokens
<button className="bg-brand-primary text-white px-md py-sm rounded-md font-semibold">
  Click Me
</button>
```

**How it works:**
- `--color-brand-primary` → generates `bg-brand-primary`, `text-brand-primary`, `border-brand-primary`
- `--spacing-lg` → generates `p-lg`, `m-lg`, `gap-lg`, `space-lg`
- `--radius-md` → generates `rounded-md`
- `--font-weight-semibold` → generates `font-semibold`

### Common Patterns

**Buttons:**
```tsx
<button className="bg-brand-primary text-white px-md py-sm rounded-md font-semibold">
  Click Me
</button>
```

**Cards:**
```tsx
<div className="bg-white p-lg rounded-lg border border-neutral-200">
  <h2 className="text-2xl font-bold text-neutral-900">
    Card Title
  </h2>
  <p className="text-base text-neutral-700">
    Card content goes here with proper typography.
  </p>
</div>
```

**Typography Hierarchy:**
```tsx
<article>
  <h1 className="text-5xl font-bold leading-tight text-neutral-900">
    Article Heading
  </h1>

  <h2 className="text-3xl font-semibold leading-tight text-neutral-800">
    Section Heading
  </h2>

  <p className="text-base leading-normal text-neutral-700">
    Body text with comfortable reading line height.
  </p>
</article>
```

**Alert Components:**
```tsx
// Success alert
<div className="bg-semantic-success/10 border border-semantic-success p-md rounded-md">
  <p className="text-semantic-success font-medium">Success message</p>
</div>

// Error alert
<div className="bg-semantic-error/10 border border-semantic-error p-md rounded-md">
  <p className="text-semantic-error font-medium">Error message</p>
</div>
```

**Presentation Slides:**
```tsx
<div className="w-full h-screen bg-brand-primary p-5xl flex flex-col justify-center">
  <h1 className="text-6xl font-bold text-white leading-tight">
    Slide Title
  </h1>
  <p className="text-2xl text-white/90 mt-xl">
    Subtitle or key message
  </p>
</div>
```

---

## 5. Build Process

### Rebuilding Tokens

After editing any file in `/brand/strategy/design/tokens/`:

```bash
npm run tokens:build
```

**What happens:**
1. Style Dictionary reads all `tokens/*.json` files
2. Transforms tokens to Tailwind v4 format
3. Generates `build/tokens.css` with `@theme` directive
4. Generates `build/tokens.json` for debugging

**Build time:** < 1 second

### Watch Mode (Auto-rebuild)

For active development:

```bash
npm run tokens:watch
```

Automatically rebuilds whenever token files change. Keep this running during design system updates.

### Fetch from Figma (Future)

```bash
npm run tokens:fetch
```

**Current status:** Placeholder for future Figma API integration.

**Manual alternative:** Export tokens from Figma using plugins (VarVar, Tokens Studio) and copy to `tokens/` directory.

### Build Output

**tokens.css:**
```css
/**
 * Do not edit directly, this file was auto-generated.
 */

@theme {
  --color-brand-primary: #2563EB;
  --color-brand-secondary: #7C3AED;
  /* ... all other tokens */
  --color-semantic-success: var(--color-brand-primary);
}
```

**tokens.json:**
```json
{
  "--color-brand-primary": "#2563EB",
  "--color-brand-secondary": "#7C3AED",
  "--color-semantic-success": "var(--color-brand-primary)"
}
```

### Importing into NextJS

**In your app CSS file:**

```css
/* app/src/app/globals.css */
@import "tailwindcss";
@import "../../../../brand/strategy/design/build/tokens.css";
```

All tokens now available as clean Tailwind utilities:
- `bg-brand-primary`, `text-neutral-700`
- `p-lg`, `m-xl`, `gap-md`
- `rounded-lg`, `text-2xl`, `font-bold`

---

## 6. Adding New Tokens

### JSON File Structure

All tokens follow this format:

```json
{
  "category": {
    "subcategory": {
      "token-name": { "value": "token-value" }
    }
  }
}
```

### Example: Adding a New Color

**File:** `/brand/strategy/design/tokens/color.json`

```json
{
  "color": {
    "brand": {
      "primary": { "value": "#2563EB" },
      "secondary": { "value": "#7C3AED" },
      "accent": { "value": "#F59E0B" },
      "tertiary": { "value": "#10B981" }  // New token
    }
  }
}
```

**After rebuild:**
- CSS variable: `--color-brand-tertiary: #10B981`
- Tailwind usage: `className="bg-brand-tertiary"` (clean utility!)

### Token Aliasing (Referencing Other Tokens)

Tokens can reference other tokens using `{category.subcategory.name}` syntax:

```json
{
  "color": {
    "brand": {
      "primary": { "value": "#2563EB" }
    },
    "button": {
      "primary-bg": { "value": "{color.brand.primary}" }
    }
  }
}
```

**Generated CSS:**
```css
--color-brand-primary: #2563EB;
--color-button-primary-bg: var(--color-brand-primary);
```

**Why use aliasing:**
- Single source of truth (change primary once, updates everywhere)
- Semantic naming (button-primary-bg describes purpose, not value)
- Easy rebranding (swap base colors, semantic tokens update automatically)

### After Adding Tokens

```bash
npm run tokens:build
```

New tokens immediately available in Tailwind classes.

---

## 7. Figma Integration

### Option 1: Plugins (Quick Start)

**Recommended plugins:**
- **VarVar** - Export Figma variables to JSON
- **Tokens Studio** - Advanced token management

**Workflow:**
1. Install plugin in Figma
2. Select variables/styles to export
3. Export as JSON
4. Save to `/brand/strategy/design/tokens/` directory
5. Run `npm run tokens:build`

**Token naming alignment:**
- Figma: `brand/primary` → JSON: `color.brand.primary`
- Figma: `spacing/md` → JSON: `spacing.md`

Use dot notation in JSON. Style Dictionary converts to kebab-case CSS variables.

### Option 2: MCP Server (AI Workflows)

**Purpose:** AI-assisted code generation from Figma designs, not token export automation.

**Use cases:**
- Generate component code from Figma frames
- Extract layout structures
- Analyze design compositions

**Not for:** Automated token synchronization (use plugins or REST API instead).

**See:** `/brand/strategy/design/2025-11-03@10:07/artifacts/02b-figma-integration.md` for MCP setup details.

### Option 3: REST API (Full Automation)

**For CI/CD pipelines and full automation:**

1. Get Figma API token (Settings → Account → Personal Access Tokens)
2. Use Figma REST API to fetch variables
3. Transform API response to token JSON format
4. Automate via Node.js script or CI/CD workflow

**Example workflow:**
```bash
node scripts/fetch-figma-tokens.js
npm run tokens:build
git commit -m "Update tokens from Figma"
```

**Benefits:**
- Designers update Figma, tokens sync automatically
- No manual export required
- Single source of truth maintained

### Token Naming Best Practices

**Figma variable naming:**
- Use forward slashes: `brand/primary`, `spacing/lg`
- Match JSON structure: `color.brand.primary`, `spacing.lg`

**JSON token naming:**
- Use dot notation: `color.brand.primary`
- Style Dictionary converts to: `--color-brand-primary`
- Consistent hierarchy enables predictable variable names

---

## 8. Agent Usage Patterns

### How AI Agents Use This System

**Step-by-step workflow:**

1. **Agent loads design documentation:**
   ```
   Read /brand/strategy/design/DESIGN.md
   ```

2. **Agent understands available tokens:**
   - Colors: `--color-brand-primary`, `--color-neutral-700`
   - Typography: `--font-size-xl`, `--font-weight-bold`
   - Spacing: `--spacing-md`, `--radius-lg`

3. **Agent generates JSX with Tailwind classes:**
   ```tsx
   <div className="bg-brand-primary p-lg rounded-md">
     <h1 className="text-4xl font-bold text-white">
       Generated Content
     </h1>
   </div>
   ```

4. **Result:** Brand-consistent output automatically

### Example Agent Prompt

```
Generate a presentation slide for Vibeflow using the design system.

Context:
- Design tokens: /brand/strategy/design/DESIGN.md
- Use Tailwind v4 utilities (tokens auto-generate classes)
- Clean syntax: className="bg-brand-primary" (no brackets!)

Requirements:
- Slide title using text-4xl or larger
- Body text using text-base
- CTA button using brand primary color (bg-brand-primary)
- Proper spacing with p-*, m-* utilities (lg, xl, 2xl, etc.)
- Border radius using rounded-* utilities

Output: React JSX component
```

### Agent Best Practices

**1. Always use brand tokens, never hardcode values:**

```tsx
// Good - use brand tokens
<div className="bg-brand-primary">

// Bad - hardcoded Tailwind defaults
<div className="bg-blue-600">
```

**2. Use semantic tokens for intent:**

```tsx
// Good (intent-based)
<div className="border-semantic-success">

// Acceptable (base token)
<div className="border-brand-primary">

// Bad (hardcoded)
<div className="border-blue-600">
```

**3. Combine tokens for complete styles:**

```tsx
<button className="
  bg-brand-primary
  text-white
  px-md
  py-sm
  rounded-md
  font-semibold
  text-base
">
  Complete Button
</button>
```

**4. Load this file progressively:**

Agents don't need to load entire file upfront. Load sections as needed:
- Generating UI? Load token reference section
- Setting up pipeline? Load build process section
- Adding tokens? Load token addition section

---

## 9. File Structure Reference

```
/brand/strategy/design/
├── tokens/                      ← Source of truth (edit these)
│   ├── color.json               ← Brand colors, neutrals, semantic
│   ├── typography.json          ← Fonts, sizes, weights, line heights
│   ├── spacing.json             ← Spacing scale, border radius
│   └── config.json              ← Style Dictionary configuration
│
├── build/                       ← Generated (don't edit)
│   ├── tokens.css               ← Import into NextJS (@theme directive)
│   └── tokens.json              ← Debugging reference
│
├── DESIGN.md                    ← This file (technical docs)
├── STRATEGY.md                  ← Strategic rationale
├── CHANGELOG.md                 ← Version history
├── package.json                 ← Build scripts
└── .gitignore                   ← Excludes build/ and node_modules/
```

**Edit workflow:**
1. Edit `tokens/*.json` (source of truth)
2. Run `npm run tokens:build`
3. Generated `build/tokens.css` updates
4. Import updated CSS into app

**Never edit:**
- `build/tokens.css` (auto-generated, changes overwritten)
- `build/tokens.json` (auto-generated, for debugging only)

---

## 10. Troubleshooting

### Tokens Not Updating

**Symptom:** Changed token values not appearing in generated CSS.

**Solutions:**
```bash
# 1. Rebuild tokens
npm run tokens:build

# 2. Check generated CSS
cat build/tokens.css | grep "color-brand-primary"

# 3. Restart NextJS dev server (cache issue)
# Stop dev server (Ctrl+C) and restart
```

### CSS Variables Not Working

**Symptom:** `className="bg-[--color-brand-primary]"` not applying styles.

**Checklist:**
- [ ] Is `build/tokens.css` imported in app CSS?
- [ ] Using bracket notation? `bg-[--color-brand-primary]` not `bg-color-brand-primary`
- [ ] NextJS dev server restarted after token changes?
- [ ] Browser DevTools shows CSS variable value? (Inspect element → Computed styles)

**Debug in browser:**
```javascript
// In browser console
getComputedStyle(document.documentElement).getPropertyValue('--color-brand-primary')
// Should return: "#2563EB"
```

### Build Errors

**Symptom:** `npm run tokens:build` fails with error.

**Common issues:**

**1. Invalid JSON syntax:**
```json
// Bad (trailing comma)
{
  "color": {
    "primary": { "value": "#2563EB" },
  }
}

// Good
{
  "color": {
    "primary": { "value": "#2563EB" }
  }
}
```

**2. Invalid token reference:**
```json
// Bad (typo in reference)
"success": { "value": "{color.brnad.primary}" }

// Good
"success": { "value": "{color.brand.primary}" }
```

**3. Missing Style Dictionary:**
```bash
npm list style-dictionary
# If not found:
npm install
```

### Token Aliasing Not Working

**Symptom:** Semantic tokens not referencing base tokens (shows literal value instead of `var()`).

**Check Style Dictionary config:**

**File:** `/brand/strategy/design/tokens/config.json`

```json
{
  "platforms": {
    "tailwind-v4": {
      "transformGroup": "css",
      "outputReferences": true  // Must be true for var() references
    }
  }
}
```

**If `outputReferences: false`:**
- All tokens output as literal values
- No `var()` references generated
- Changes to base tokens don't propagate

**Set to `true` for token aliasing to work.**

---

## Additional Resources

**Project Documentation:**
- `/brand/strategy/design/STRATEGY.md` - Strategic rationale for design system
- `/brand/strategy/design/CHANGELOG.md` - Version history and updates
- `/brand/strategy/design/2025-11-03@10:07/PLAN.md` - Implementation plan

**External Documentation:**
- [Style Dictionary Documentation](https://amzn.github.io/style-dictionary/)
- [Tailwind v4 Documentation](https://tailwindcss.com/docs)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

**Token Format Reference:**
- W3C Design Tokens Format: https://design-tokens.github.io/community-group/format/

---

**Last Updated:** 2025-11-03@10:07
**Version:** 1.0.0

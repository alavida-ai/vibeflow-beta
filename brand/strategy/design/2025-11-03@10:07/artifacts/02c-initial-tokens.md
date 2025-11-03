# Phase 2c: Initial Design Tokens

## Token Files Created

Three foundational token files have been created in `/brand/strategy/design/tokens/`:

### 1. Color Tokens
**File:** `/brand/strategy/design/tokens/color.json`

Defines the brand color palette organized into three categories:

- **Brand colors** - Primary, secondary, and accent colors for brand identity
- **Neutral scale** - 11-step grayscale (50-950) for backgrounds, text, and borders
- **Semantic colors** - Intent-based colors (success, error, warning, info)

### 2. Typography Tokens
**File:** `/brand/strategy/design/tokens/typography.json`

Defines the type system across four dimensions:

- **Font families** - Sans-serif (Inter) and monospace (JetBrains Mono) with system fallbacks
- **Font sizes** - 10-step scale from xs (0.75rem) to 6xl (3.75rem)
- **Font weights** - Four weights (normal, medium, semibold, bold)
- **Line heights** - Three heights (tight, normal, relaxed) for different text densities

### 3. Spacing Tokens
**File:** `/brand/strategy/design/tokens/spacing.json`

Defines spatial scales for layout consistency:

- **Spacing scale** - 9-step scale from xs (0.25rem) to 5xl (6rem) for margins, padding, gaps
- **Radius scale** - 7-step scale from none to full for border-radius values

---

## Token Structure Explanation

### Hierarchical Naming Convention

Design tokens use dot notation to create a clear hierarchy:

```
category.subcategory.variant
```

**Examples:**
- `color.brand.primary` - Brand category, brand subcategory, primary variant
- `font.size.xl` - Font category, size subcategory, xl variant
- `spacing.md` - Spacing category, md variant (no subcategory needed)

This structure enables:
- **Logical organization** - Related tokens grouped together
- **Easy discovery** - Predictable naming makes tokens findable
- **Scalability** - Add new variants without restructuring

### Semantic Layering (Base → Semantic)

The token system uses two layers:

**Layer 1: Base Tokens** (the source)
```json
"color": {
  "brand": {
    "primary": { "value": "#2563EB" }
  }
}
```

**Layer 2: Semantic Tokens** (the meaning)
```json
"color": {
  "semantic": {
    "success": { "value": "{color.brand.primary}" }
  }
}
```

**Why this matters:**
- Base tokens define the actual values (hex codes, rem units)
- Semantic tokens define the intent (what does this color mean?)
- Changing `color.brand.primary` updates `color.semantic.success` automatically
- Components use semantic tokens, not base tokens directly

### Value Format (JSON Structure)

All tokens follow Style Dictionary's required format:

```json
{
  "tokenName": {
    "value": "actual value here"
  }
}
```

**Key requirements:**
- Token name is the key
- Must have a `"value"` property
- Value can be a literal (`"#2563EB"`) or a reference (`"{color.brand.primary}"`)

---

## Token Aliasing Examples

### How Token References Work

Token aliasing allows tokens to reference other tokens using curly brace syntax:

```json
{
  "color": {
    "brand": {
      "primary": { "value": "#2563EB" }
    },
    "semantic": {
      "success": { "value": "{color.brand.primary}" }
    }
  }
}
```

**What happens:**
1. Style Dictionary reads `{color.brand.primary}`
2. Resolves to `#2563EB`
3. Outputs resolved value in generated CSS/SCSS/JS

**Result in CSS:**
```css
--color-brand-primary: #2563EB;
--color-semantic-success: #2563EB;
```

### Why Semantic Tokens Reference Base Tokens

**Pattern:** Semantic tokens should always reference base tokens, never use direct values.

**Good (uses reference):**
```json
"semantic": {
  "success": { "value": "{color.brand.primary}" }
}
```

**Bad (uses direct value):**
```json
"semantic": {
  "success": { "value": "#2563EB" }
}
```

**Why references matter:**
- **Single source of truth** - Change blue once, updates everywhere
- **Maintainability** - Rebrand means updating base tokens only
- **Consistency** - Impossible for semantic tokens to drift from base
- **Flexibility** - Swap semantic mappings without changing values

### Benefits of Token Aliasing

**1. Single Source of Truth**
```json
// Update primary color once
"primary": { "value": "#2563EB" }

// Automatically updates:
// - success (references primary)
// - link color (references primary)
// - button primary (references primary)
```

**2. Theme Variations**
```json
// Light theme
"background": { "value": "{color.neutral.50}" }

// Dark theme (same token, different reference)
"background": { "value": "{color.neutral.900}" }
```

**3. Contextual Mapping**
```json
// Different contexts, same base color
"success": { "value": "{color.brand.primary}" }
"link": { "value": "{color.brand.primary}" }
"focus": { "value": "{color.brand.primary}" }

// Change all three by updating one base token
```

---

## Naming Conventions

### Kebab-Case for Multi-Word Tokens

Use kebab-case when token names contain multiple words:

```json
{
  "font": {
    "line-height": {
      "tight": { "value": "1.25" }
    }
  }
}
```

**Note:** In this starter set, we simplified to camelCase (`lineHeight`) for JSON readability. In production, follow your team's convention consistently.

### Number Suffixes for Scales

**Grayscale (50-950):**
```json
"neutral": {
  "50": { "value": "#FAFAFA" },   // Lightest
  "500": { "value": "#737373" },  // Middle
  "950": { "value": "#0A0A0A" }   // Darkest
}
```

**Type scale (xs-6xl):**
```json
"size": {
  "xs": { "value": "0.75rem" },   // Smallest
  "base": { "value": "1rem" },     // Default
  "6xl": { "value": "3.75rem" }   // Largest
}
```

**Pattern:**
- Small to large progression
- Consistent intervals (50-step for colors, t-shirt sizes for typography/spacing)
- `base` for the default/reference size

### Semantic Naming for Intent

Use semantic names that describe the purpose, not the appearance:

**Good (intent-based):**
```json
"semantic": {
  "success": { "value": "{color.brand.primary}" },
  "error": { "value": "#DC2626" },
  "warning": { "value": "{color.brand.accent}" }
}
```

**Bad (appearance-based):**
```json
"semantic": {
  "green": { "value": "{color.brand.primary}" },
  "red": { "value": "#DC2626" },
  "yellow": { "value": "{color.brand.accent}" }
}
```

**Why this matters:**
- Intent survives visual redesigns (success can change from blue to green)
- Self-documenting code (`color-success` vs `color-blue`)
- Accessibility mindset (meaning over color)

---

## Customization Guidance

### These Are Starter Tokens

The tokens created in this phase are **intentionally generic** to demonstrate structure. They are:

- Industry-standard colors (blue primary, purple secondary)
- Common neutral grayscale
- Popular fonts (Inter, JetBrains Mono)
- Standard spacing scales

**Next steps:**
1. Replace with your actual brand colors
2. Use your brand's typography (font families, sizes, weights)
3. Adjust spacing to match your design system

### Replace With Actual Brand Colors

Update `/brand/strategy/design/tokens/color.json` with brand colors:

```json
{
  "color": {
    "brand": {
      "primary": { "value": "#YOUR_PRIMARY_HEX" },
      "secondary": { "value": "#YOUR_SECONDARY_HEX" },
      "accent": { "value": "#YOUR_ACCENT_HEX" }
    }
  }
}
```

**Sources for brand colors:**
- Existing brand guidelines
- Marketing team assets
- Logo color palette
- Website design comps

### Export From Figma for Brand Alignment

For teams using Figma as source of truth:

**Manual export:**
1. Open Figma file with design system
2. Document color variables, text styles, spacing values
3. Manually transcribe to token JSON files

**Automated export (recommended):**
1. Install Figma plugin: "Design Tokens" or "Tokens Studio"
2. Export tokens from Figma in Style Dictionary format
3. Replace starter token files with Figma exports
4. Maintain Figma as single source of truth

**Benefits of Figma sync:**
- Designers control token values
- Automated sync prevents drift
- Single source of truth for design and code

---

## Token System Summary

**What we built:**
- Three token files (color, typography, spacing)
- Hierarchical naming structure (category.subcategory.variant)
- Semantic layering (base tokens → semantic tokens)
- Token aliasing for single source of truth

**Why it matters:**
- **Consistency** - Same values used everywhere
- **Maintainability** - Update once, change everywhere
- **Scalability** - Add platforms without duplicating values
- **Designer-developer sync** - Shared language for design decisions

**Next phase:**
- Configure Style Dictionary to transform these tokens
- Generate platform-specific outputs (CSS, SCSS, JS)
- Integrate tokens into development workflow

---

## File Paths Reference

```
/brand/strategy/design/tokens/
├── color.json        ← Brand colors, neutrals, semantic colors
├── typography.json   ← Font families, sizes, weights, line heights
└── spacing.json      ← Spacing scale, border radius scale
```

All tokens ready for transformation via Style Dictionary (configured in next phase).

# Phase 2a: Style Dictionary Configuration - Completion Report

**Phase:** 2a
**Status:** ✅ Complete
**Date:** 2025-11-03@10:07

## Objective

Configure Style Dictionary to output Tailwind v4-compatible CSS using the `@theme` directive for seamless integration with Tailwind's design token system.

## Configuration File Created

**File:** `/brand/strategy/design/tokens/config.json`

```json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "tailwind-v4": {
      "transformGroup": "css",
      "buildPath": "build/",
      "files": [{
        "destination": "tokens.css",
        "format": "css/variables",
        "options": {
          "selector": "@theme",
          "outputReferences": true
        }
      }]
    },
    "json": {
      "transformGroup": "js",
      "buildPath": "build/",
      "files": [{
        "destination": "tokens.json",
        "format": "json/flat"
      }]
    }
  }
}
```

## Key Configuration Decisions

### 1. `@theme` Selector Instead of `:root`

**Choice:** `"selector": "@theme"`

**Rationale:**
- Tailwind v4 introduces `@theme` as the canonical directive for design token registration
- Unlike `:root` which defines CSS custom properties globally, `@theme` integrates tokens directly into Tailwind's utility class generation
- Enables Tailwind to generate utilities like `bg-brand-primary` or `text-brand-secondary` automatically from token names
- Provides better DX: tokens become first-class citizens in Tailwind's IntelliSense

**Technical difference:**
```css
/* Old approach (:root) */
:root {
  --color-brand-primary: #2563EB;
}
/* Usage: class="bg-[var(--color-brand-primary)]" */

/* Tailwind v4 (@theme) */
@theme {
  --color-brand-primary: #2563EB;
}
/* Usage: class="bg-brand-primary" */
```

### 2. `outputReferences: true` for Token Aliasing

**Choice:** `"outputReferences": true`

**Rationale:**
- Enables **semantic token aliasing** where one token references another
- Maintains single source of truth: changing a base token updates all references automatically
- Critical for theme consistency (e.g., button colors reference brand colors)

**Example:**
```json
// Input tokens
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

// Output CSS with outputReferences: true
@theme {
  --color-brand-primary: #2563EB;
  --color-button-primary-bg: var(--color-brand-primary); /* Reference! */
}

// Output CSS with outputReferences: false
@theme {
  --color-brand-primary: #2563EB;
  --color-button-primary-bg: #2563EB; /* Hardcoded duplicate */
}
```

### 3. Dual Output (CSS + JSON)

**Choice:** Two platform configurations: `tailwind-v4` + `json`

**Rationale:**

**Primary Output (CSS):**
- `build/tokens.css` - Production-ready CSS for Tailwind v4 integration
- Used in application via `@import` in Tailwind config

**Secondary Output (JSON):**
- `build/tokens.json` - Flat JSON representation of all tokens
- **Purpose:**
  - Debugging token transformations
  - Validation during CI/CD pipelines
  - Documentation generation
  - Consumption by non-CSS tools (e.g., React Native, design tools)

## Expected Output Format

When Style Dictionary builds tokens, it will generate:

### tokens.css (Primary Output)
```css
@theme {
  /* Colors */
  --color-brand-primary: #2563EB;
  --color-brand-secondary: #7C3AED;
  --color-brand-accent: #10B981;

  /* With references */
  --color-button-primary-bg: var(--color-brand-primary);
  --color-button-primary-hover: var(--color-brand-primary-dark);

  /* Typography */
  --font-family-sans: "Inter", system-ui, sans-serif;
  --font-size-base: 16px;
  --font-weight-regular: 400;
  --font-weight-semibold: 600;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
}
```

### tokens.json (Debug Output)
```json
{
  "color-brand-primary": "#2563EB",
  "color-brand-secondary": "#7C3AED",
  "color-button-primary-bg": "#2563EB",
  "font-family-sans": "\"Inter\", system-ui, sans-serif"
}
```

## Configuration Properties Explained

| Property | Value | Purpose |
|----------|-------|---------|
| `source` | `["tokens/**/*.json"]` | Glob pattern to find all token JSON files |
| `transformGroup` | `"css"` | Apply CSS-specific transformations (kebab-case, px units, etc.) |
| `buildPath` | `"build/"` | Output directory for generated files |
| `format` | `"css/variables"` | Generate CSS custom properties format |
| `selector` | `"@theme"` | Use Tailwind v4's `@theme` directive |
| `outputReferences` | `true` | Preserve token references with `var()` |

## Integration with Tailwind v4

Once tokens are built, they integrate with Tailwind via:

```css
/* app.css or global.css */
@import "./brand/strategy/design/build/tokens.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

Tailwind v4 will automatically:
1. Parse `@theme` directive
2. Register all `--color-*` tokens as color utilities
3. Register all `--spacing-*` tokens as spacing utilities
4. Generate utilities: `bg-brand-primary`, `text-brand-secondary`, `p-md`, etc.

## Next Steps

**Phase 2b:** Figma integration documentation (parallel, no dependencies)
**Phase 2c:** Initial token set creation (parallel, no dependencies)
**Phase 3:** Build pipeline testing (depends on 2a, 2b, 2c completion)

Once Phase 3 runs `npm run tokens:build`, this configuration will generate the first version of `build/tokens.css` and `build/tokens.json`.

## Verification

Configuration file created and ready for build execution:
- ✅ `/brand/strategy/design/tokens/config.json` exists
- ✅ `@theme` selector configured for Tailwind v4 compatibility
- ✅ `outputReferences` enabled for token aliasing
- ✅ Dual output (CSS + JSON) configured
- ✅ Ready for Phase 3 build pipeline testing

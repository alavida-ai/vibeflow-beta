# Design System Implementation v1

**Created:** 2025-11-03@10:07
**Execution Folder:** `/brand/strategy/design/2025-11-03@10:07/`

## Objective

Establish a scalable design system architecture that enables brand-consistent visual content generation through:
- **Design tokens** as single source of truth (JSON format)
- **Figma integration** for token export/sync
- **Tailwind v4** CSS utilities generated from tokens
- **NextJS dashboard** for visual system documentation
- **Agent workflows** that generate on-brand visual content

This creates infrastructure ownership (not tool dependency) aligned with Vibeflow's core philosophy.

## Approach

**Phase 1: Foundation**
Set up base architecture with domain structure, documentation files, and token infrastructure.

**Phase 2: Token System (Parallel)**
- Configure Style Dictionary to transform tokens → Tailwind v4
- Set up Figma integration for token export
- Create initial token set (colors, typography, spacing)

**Phase 3: Build Pipeline**
Connect tokens → Style Dictionary → Tailwind v4 CSS output with build automation.

**Phase 4: Documentation**
Write comprehensive DESIGN.md and STRATEGY.md with usage patterns, rationale, and integration guides.

**Phase 5: Integration Guide**
Document NextJS dashboard integration approach and agent workflow patterns.

## Input Data

**Location:** `data/`

None required - workflow creates system from scratch. However, if brand tokens already exist in Figma:
- Optional: `data/figma-file-id.txt` - Figma file ID for future automation
- Optional: `data/existing-brand-tokens.json` - Any existing token definitions

## Step by Step Tasks

### 1. Foundation Setup

Create base directory structure, initialize package.json, and establish documentation files.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- None (creating from scratch)

**Output Artifact:** `artifacts/01-foundation-setup.md`

**Task Details:**

Create the following structure at `/brand/strategy/design/`:

```
/brand/strategy/design/
├── DESIGN.md                    (empty - populated in Phase 4)
├── STRATEGY.md                  (empty - populated in Phase 4)
├── CHANGELOG.md                 (initialized with v1 entry)
├── /tokens/                     (directory created)
├── /build/                      (directory created)
└── package.json                 (initialized with dependencies)
```

**package.json** should include:
- `style-dictionary` as dependency
- Build scripts: `tokens:build`, `tokens:watch`
- Name: `@vibeflow/design`
- Version: `1.0.0`
- Main export: `./build/tokens.css`

Initialize CHANGELOG.md with:
```markdown
# Changelog

## [1.0.0] - 2025-11-03

### Added
- Initial design system architecture
- Token infrastructure (Style Dictionary)
- Tailwind v4 integration
- Figma export capability
```

Document completion in artifact with directory structure confirmation.

---

### 2a. Style Dictionary Configuration

Configure Style Dictionary to output Tailwind v4-compatible CSS with @theme directive.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-foundation-setup.md`

**Output Artifact:** `artifacts/02a-style-dictionary-config.md`

**Task Details:**

Create `/brand/strategy/design/tokens/config.json`:

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

Key requirements:
- Output format: Tailwind v4 `@theme` directive
- CSS variables with `--` prefix
- Enable `outputReferences` for token aliasing
- Secondary JSON output for debugging

Document configuration choices and expected output format in artifact.

---

### 2b. Figma Integration Setup

Document Figma token export options (MCP server, plugins, API) and create integration guide.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-foundation-setup.md`

**Output Artifact:** `artifacts/02b-figma-integration.md`

**Task Details:**

Research and document three Figma integration approaches:

**1. Figma MCP Server (Recommended for automation)**
- How to install and configure
- Authentication setup
- Example commands for variable export
- Pros/cons for this use case

**2. Figma Plugins (Manual/semi-automated)**
- VarVar plugin
- Design Tokens Manager
- Design Tokens (W3C) Export
- Comparison and recommendation

**3. Figma REST API (Full automation)**
- API endpoint for variables
- Authentication flow
- Example curl/node script
- When to use this approach

For the recommended approach (MCP Server), provide:
- Installation steps
- Configuration for `.mcp.json`
- Example workflow: Figma → JSON → Style Dictionary
- Script template for `tokens:fetch` npm script

Document in artifact as integration guide.

---

### 2c. Initial Token Set

Create foundational design tokens (colors, typography, spacing) in JSON format.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-foundation-setup.md`

**Output Artifact:** `artifacts/02c-initial-tokens.md`

**Task Details:**

Create three token files in `/brand/strategy/design/tokens/`:

**1. `color.json`** - Brand color system
```json
{
  "color": {
    "brand": {
      "primary": { "value": "#2563EB" },
      "secondary": { "value": "#7C3AED" },
      "accent": { "value": "#F59E0B" }
    },
    "neutral": {
      "50": { "value": "#FAFAFA" },
      "100": { "value": "#F5F5F5" },
      "900": { "value": "#171717" },
      "950": { "value": "#0A0A0A" }
    },
    "semantic": {
      "success": { "value": "{color.brand.primary}" },
      "error": { "value": "#DC2626" },
      "warning": { "value": "{color.brand.accent}" }
    }
  }
}
```

**2. `typography.json`** - Type scale and font families
```json
{
  "font": {
    "family": {
      "sans": { "value": "Inter, system-ui, sans-serif" },
      "mono": { "value": "JetBrains Mono, monospace" }
    },
    "size": {
      "xs": { "value": "0.75rem" },
      "sm": { "value": "0.875rem" },
      "base": { "value": "1rem" },
      "lg": { "value": "1.125rem" },
      "xl": { "value": "1.25rem" },
      "2xl": { "value": "1.5rem" },
      "3xl": { "value": "1.875rem" },
      "4xl": { "value": "2.25rem" }
    },
    "weight": {
      "normal": { "value": "400" },
      "medium": { "value": "500" },
      "semibold": { "value": "600" },
      "bold": { "value": "700" }
    }
  }
}
```

**3. `spacing.json`** - Spacing scale
```json
{
  "spacing": {
    "xs": { "value": "0.25rem" },
    "sm": { "value": "0.5rem" },
    "md": { "value": "1rem" },
    "lg": { "value": "1.5rem" },
    "xl": { "value": "2rem" },
    "2xl": { "value": "3rem" },
    "3xl": { "value": "4rem" }
  }
}
```

Note: These are starter tokens. Real tokens should come from Figma or brand guidelines.

Document token structure, naming conventions, and aliasing patterns in artifact.

---

### 3. Build Pipeline Integration

Test Style Dictionary build, verify Tailwind v4 output, and configure build scripts.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/02a-style-dictionary-config.md`
- `artifacts/02c-initial-tokens.md`

**Output Artifact:** `artifacts/03-build-pipeline.md`

**Task Details:**

1. **Run Style Dictionary build:**
```bash
cd /brand/strategy/design
npm install
npx style-dictionary build --config tokens/config.json
```

2. **Verify output:**
Check that `build/tokens.css` contains:
```css
@theme {
  --color-brand-primary: #2563EB;
  --color-brand-secondary: #7C3AED;
  /* ... etc */
}
```

3. **Configure npm scripts in package.json:**
```json
{
  "scripts": {
    "tokens:build": "style-dictionary build --config tokens/config.json",
    "tokens:watch": "style-dictionary build --config tokens/config.json --watch",
    "tokens:fetch": "echo 'TODO: Configure Figma MCP token fetch'"
  }
}
```

4. **Test token aliasing:**
Verify that `semantic.success` correctly references `color.brand.primary`.

5. **Create `.gitignore`:**
```
node_modules/
build/
```

Document build process, output verification, and any issues encountered in artifact.

---

### 4a. DESIGN.md Documentation

Write comprehensive technical documentation for developers and agents using the design system.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-foundation-setup.md`
- `artifacts/02a-style-dictionary-config.md`
- `artifacts/02b-figma-integration.md`
- `artifacts/02c-initial-tokens.md`
- `artifacts/03-build-pipeline.md`

**Output Artifact:** `artifacts/04a-design-documentation.md` and `/brand/strategy/design/DESIGN.md`

**Task Details:**

Write `/brand/strategy/design/DESIGN.md` with the following sections:

**1. Overview**
- What this design system is
- Purpose and philosophy (ownership, not dependency)
- How it fits into content generation workflows

**2. Token Reference**
- Color tokens with visual examples
- Typography tokens (font families, sizes, weights)
- Spacing tokens
- Semantic tokens and aliasing

**3. Tailwind v4 Usage**
- How tokens become Tailwind utilities
- Usage examples:
  - `className="bg-[--color-brand-primary]"`
  - `className="text-[--font-size-xl]"`
  - `className="p-[--spacing-lg]"`
- Common patterns for buttons, cards, typography

**4. Build Process**
- How to rebuild tokens: `npm run tokens:build`
- How to watch for changes: `npm run tokens:watch`
- How to fetch from Figma: `npm run tokens:fetch`

**5. Adding New Tokens**
- JSON file structure
- Naming conventions
- Token aliasing (referencing other tokens)
- Rebuilding after changes

**6. Figma Integration**
- How to export variables from Figma
- Token naming alignment between Figma and JSON
- Sync workflow

**7. Agent Usage Patterns**
- How agents should load DESIGN.md
- How agents should generate JSX with Tailwind classes
- Example agent workflow for presentation generation

Write in technical, direct style. Include code examples. Focus on "how to use" not "why we built it" (that's STRATEGY.md).

Document completion in artifact.

---

### 4b. STRATEGY.md Documentation

Write strategic rationale for design system decisions and architectural choices.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-foundation-setup.md`
- `artifacts/02a-style-dictionary-config.md`
- `artifacts/02b-figma-integration.md`
- `artifacts/03-build-pipeline.md`

**Output Artifact:** `artifacts/04b-strategy-documentation.md` and `/brand/strategy/design/STRATEGY.md`

**Task Details:**

Write `/brand/strategy/design/STRATEGY.md` with the following sections:

**1. Design System Philosophy**
- Ownership over convenience (design tokens as infrastructure you own)
- Single source of truth (Figma → JSON → Tailwind)
- Version control and audit trails
- Systematic over ad-hoc (tokens guide all visual decisions)

**2. Architecture Decisions**

**Why Style Dictionary?**
- Industry standard for token transformation
- Platform-agnostic (can output for web, iOS, Android)
- Open source and extensible
- Owned infrastructure, not SaaS dependency

**Why Tailwind v4?**
- Native design token support via `@theme`
- CSS-first configuration (not JavaScript)
- Utility-first approach matches agent generation patterns
- Runtime theming capability for future dark mode

**Why Figma Integration?**
- Designers work in Figma (respect their workflow)
- Variables become tokens (no manual translation)
- Single source of truth (design → code sync)
- MCP server enables automation (ownership maintained)

**3. Token Naming Conventions**
- Kebab-case for consistency with CSS
- Semantic layering (base → semantic → component)
- Rationale for structure

**4. Extension Pattern**
- How to extend base tokens (like voice/twitter pattern)
- Platform-specific tokens (web vs mobile)
- Theme variations (light/dark mode preparation)

**5. Integration with Brand Strategy**
- How design tokens relate to voice/messaging strategy
- Visual consistency = textual consistency
- Both systems flow from brand fundamentals

**6. Future Roadmap**
- Dark mode support
- Component library (optional, post-v1)
- Animation tokens
- Responsive breakpoint tokens
- Platform-specific extensions (iOS, Android)

Write in strategic, analytical style. Reference brand philosophy. Explain "why" decisions were made.

Document completion in artifact.

---

### 5. NextJS Integration Guide

Document how to import design system into NextJS dashboard and create integration template.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/03-build-pipeline.md`
- `artifacts/04a-design-documentation.md`

**Output Artifact:** `artifacts/05-nextjs-integration.md` and `/brand/strategy/design/INTEGRATION.md`

**Task Details:**

Create `/brand/strategy/design/INTEGRATION.md` with:

**1. Dashboard Architecture**

Proposed structure:
```
/workspace-root/
├── /brand/strategy/design/        ← Design system
│   └── /build/tokens.css          ← Generated by Style Dictionary
└── /dashboard/                     ← NextJS app (user builds this)
    ├── package.json
    ├── app/
    │   ├── globals.css             ← Import tokens here
    │   ├── page.tsx                ← Dashboard home
    │   ├── tokens/page.tsx         ← Token visualization
    │   └── components/page.tsx     ← Component examples
    └── tailwind.config.ts          ← Tailwind configuration
```

**2. NextJS Setup Steps**

Step-by-step guide:

**A. Install dependencies:**
```bash
cd dashboard
npm install tailwindcss @tailwindcss/vite
```

**B. Configure Tailwind:**
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
}

export default config
```

**C. Import tokens in globals.css:**
```css
/* app/globals.css */
@import "tailwindcss";
@import "../../brand/strategy/design/build/tokens.css";
```

**D. Use tokens in components:**
```tsx
// app/page.tsx
export default function Home() {
  return (
    <div className="bg-[--color-brand-primary] p-[--spacing-lg]">
      <h1 className="text-[--font-size-4xl] font-[--font-weight-bold]">
        Vibeflow Design System
      </h1>
    </div>
  )
}
```

**3. Token Visualization Page**

Template for `app/tokens/page.tsx`:
- Display all color tokens with swatches
- Display typography scale with examples
- Display spacing scale with visual boxes
- Interactive token browser

**4. Build Integration**

How to handle token rebuilds:
```json
{
  "scripts": {
    "dev": "next dev",
    "build:tokens": "cd ../brand/strategy/design && npm run tokens:build",
    "dev:with-tokens": "npm run build:tokens && npm run dev"
  }
}
```

**5. Agent Workflow Integration**

How agents use this system:
1. Agent loads `/brand/strategy/design/DESIGN.md`
2. Agent generates JSX for presentation/visual content
3. Agent uses Tailwind classes referencing tokens
4. Output is brand-consistent automatically

Example prompt pattern for agents:
```
Generate a presentation slide using the Vibeflow design system.

Context:
- Design tokens: /brand/strategy/design/DESIGN.md
- Use Tailwind classes with CSS variables
- Example: className="bg-[--color-brand-primary]"

Generate JSX for slide with title and CTA button.
```

**6. Development Workflow**

Daily workflow:
1. Update tokens in Figma (or JSON files)
2. Run `npm run tokens:fetch` (if using Figma)
3. Run `npm run tokens:build`
4. View changes in NextJS dashboard
5. Commit token changes to git

Document in INTEGRATION.md as complete setup guide.

---

### 6. Final Synthesis

Consolidate all artifacts into final STRATEGY.md with execution summary and next steps.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-foundation-setup.md`
- `artifacts/02a-style-dictionary-config.md`
- `artifacts/02b-figma-integration.md`
- `artifacts/02c-initial-tokens.md`
- `artifacts/03-build-pipeline.md`
- `artifacts/04a-design-documentation.md`
- `artifacts/04b-strategy-documentation.md`
- `artifacts/05-nextjs-integration.md`

**Output Artifact:** `artifacts/06-execution-summary.md` and update `/brand/strategy/design/2025-11-03@10:07/SUMMARY.md`

**Task Details:**

Create execution summary documenting:

**1. What Was Accomplished**
- Foundation structure created
- Style Dictionary configured for Tailwind v4
- Figma integration documented
- Initial token set established
- Build pipeline tested
- Documentation written (DESIGN.md, STRATEGY.md, INTEGRATION.md)

**2. Architecture Decisions**
- Style Dictionary → Tailwind v4 pipeline
- Figma MCP for automation
- Token-first approach (JSON as source of truth)
- NextJS path alias import (no npm package needed)

**3. Files Created**
List all files with brief descriptions

**4. Next Steps for User**

**Immediate:**
- Review DESIGN.md and STRATEGY.md
- Customize initial tokens (or export from Figma)
- Build NextJS dashboard following INTEGRATION.md
- Test token generation and visualization

**Phase 2 (Optional):**
- Set up Figma MCP server for automated sync
- Create component library (React components using tokens)
- Add dark mode tokens
- Extend with animation/transition tokens

**5. How Agents Will Use This**
- Load `/brand/strategy/design/DESIGN.md` for token reference
- Generate JSX with Tailwind classes
- Maintain brand consistency in all visual outputs
- Example workflows documented

**6. Success Metrics**
- All visual content uses design tokens (no hardcoded colors/spacing)
- Consistent brand appearance across presentations, social graphics, etc.
- Design changes propagate automatically (update tokens → rebuild → done)
- Full ownership of design system (no SaaS dependencies)

Write comprehensive summary suitable for stakeholder review.

## Success Criteria

- ✅ Complete directory structure at `/brand/strategy/design/`
- ✅ Style Dictionary configured and building Tailwind v4 CSS
- ✅ Initial token set (colors, typography, spacing) created and generating CSS
- ✅ DESIGN.md provides clear usage documentation
- ✅ STRATEGY.md explains architectural rationale
- ✅ INTEGRATION.md guides NextJS setup
- ✅ Build pipeline tested and working (`npm run tokens:build`)
- ✅ Figma integration documented with MCP approach
- ✅ Agent usage patterns documented
- ✅ All artifacts created and consolidated

**Definition of Done:**
Marketing Architect can:
1. Build NextJS dashboard using tokens
2. Update tokens and see changes reflected
3. Understand how to sync with Figma
4. Guide agents to generate on-brand visual content

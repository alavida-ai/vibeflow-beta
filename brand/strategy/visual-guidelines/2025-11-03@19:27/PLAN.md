# Visual Assets Guidelines Strategy

**Created:** 2025-11-03@19:27
**Execution Folder:** [brand/strategy/visual-assets/2025-11-03@19:27](.)

## Objective

Create a comprehensive visual assets guidelines document (STRATEGY.md) by systematically analyzing OWWO's website screenshots to extract and codify their visual design system, including color palette, typography, composition principles, brand elements, and visual tone.

## Approach

We'll analyze the 5 website screenshots through parallel visual analysis phases, extracting different aspects of the design system simultaneously. Each analysis will focus on a specific design dimension (color, type, composition, brand elements, mood), then synthesize findings into a unified, actionable STRATEGY.md that can guide future visual asset creation.

The approach prioritizes:
- **Evidence-based extraction** - Every guideline references specific screenshots
- **Systematic coverage** - All major design dimensions analyzed
- **Actionable output** - Guidelines practical enough for immediate use
- **Brand consistency** - Patterns identified across multiple screenshots

## Input Data

**Location:** `data/`

All 5 website screenshots from OWWO's brand:
- `data/screenshot-1-hero.png` - Homepage hero with yellow background, logo mark, and value props
- `data/screenshot-2-services.png` - Services section with card layouts and portfolio grid
- `data/screenshot-3-differentiators.png` - Value prop circles with yellow highlighting
- `data/screenshot-4-team.png` - Team section with 3D portrait cards and typography hierarchy
- `data/screenshot-5-footer.png` - Footer with brand elements and contact info

Note: Screenshots copied from [/brand/strategy/visual-guidelines/web-screenshots/](/brand/strategy/visual-guidelines/web-screenshots/)

## Step by Step Tasks

### 1. Prepare Input Data

Copy screenshots from visual-guidelines folder into execution data folder for analysis.

**Agent:** Operations Manager (self)
**Instructions:** Copy files directly
**Input Artifacts:** None

**Output Artifact:** `data/screenshot-*.png` (5 files)

**Task Details:**
Copy the 5 screenshots from `/brand/strategy/visual-guidelines/web-screenshots/` into the execution folder's `data/` directory with descriptive names for easy reference during analysis.

---

### 2a. Color Palette Extraction

Extract and document the complete color palette used across all screenshots.

**Agent:** analyst
**Instructions:** Inline instructions below
**Input Artifacts:**
- All screenshots in `data/`

**Output Artifact:** `artifacts/02a-color-palette.md`

**Task Details:**

Analyze all 5 screenshots to extract the complete color palette. For each color identified:

1. **Document the color** with:
   - Color name (descriptive, e.g., "Primary Yellow", "Accent Purple")
   - Hex code (approximate if exact value unknown)
   - Visual description
   - Usage pattern (where/how it appears)
   - Screenshots where it appears

2. **Categorize colors** into:
   - Primary colors (dominant brand colors)
   - Secondary colors (supporting colors)
   - Accent colors (used sparingly for emphasis)
   - Neutral colors (backgrounds, text)

3. **Identify color relationships**:
   - Which colors pair together
   - Contrast patterns
   - Hierarchy (most to least prominent)

Format output as a structured markdown document with color swatches described, usage examples, and screenshot references.

---

### 2b. Typography Analysis

Analyze and document typography patterns, hierarchy, and usage across the website.

**Agent:** analyst
**Instructions:** Inline instructions below
**Input Artifacts:**
- All screenshots in `data/`

**Output Artifact:** `artifacts/02b-typography.md`

**Task Details:**

Analyze typography across all 5 screenshots to identify:

1. **Font families** used:
   - Heading fonts vs body fonts
   - Any special/display fonts
   - Monospace or code-style fonts

2. **Type hierarchy**:
   - H1, H2, H3 styles and characteristics
   - Body text characteristics
   - Small text/captions
   - All caps usage patterns

3. **Type styling patterns**:
   - Bold vs regular weight usage
   - Uppercase vs lowercase patterns
   - Letter spacing
   - Line height patterns
   - Text color usage

4. **Type composition**:
   - How type creates visual hierarchy
   - Emphasis techniques (highlighting, weight, size)
   - Alignment patterns

Provide examples from specific screenshots for each pattern identified.

---

### 2c. Brand Elements Inventory

Identify and document all distinctive brand elements, logos, marks, and visual motifs.

**Agent:** analyst
**Instructions:** Inline instructions below
**Input Artifacts:**
- All screenshots in `data/`

**Output Artifact:** `artifacts/02c-brand-elements.md`

**Task Details:**

Catalog all brand elements visible across the screenshots:

1. **Logo and brand marks**:
   - Primary logo design and characteristics
   - Logo variations (if any)
   - Logo placement patterns
   - Tagline/brand descriptor

2. **Visual motifs**:
   - Recurring shapes or patterns
   - Geometric elements
   - Icon style
   - Symbol usage

3. **Brand signatures**:
   - Unique visual treatments
   - Distinctive design elements
   - Photography/illustration style
   - 3D elements and rendering style

4. **Application patterns**:
   - How brand elements are used together
   - Size and scale patterns
   - Consistency vs variation

Document with specific screenshot references showing each element in context.

---

### 2d. Composition & Layout Patterns

Analyze composition principles, layout structures, and spatial relationships.

**Agent:** analyst
**Instructions:** Inline instructions below
**Input Artifacts:**
- All screenshots in `data/`

**Output Artifact:** `artifacts/02d-composition-layout.md`

**Task Details:**

Analyze how visual elements are arranged and composed:

1. **Layout structures**:
   - Grid systems (if visible)
   - Column layouts
   - Card/module patterns
   - Section structures

2. **Spatial relationships**:
   - Whitespace usage (generous, tight, balanced)
   - Spacing patterns between elements
   - Padding and margins
   - Vertical rhythm

3. **Composition principles**:
   - Balance (symmetric vs asymmetric)
   - Visual hierarchy through placement
   - Focal point creation
   - Flow and reading order

4. **Content patterns**:
   - How text and images combine
   - Media embed treatments
   - Call-to-action placement
   - Navigation patterns

Identify patterns that repeat across multiple screenshots and note any section-specific variations.

---

### 2e. Tone & Mood Analysis

Analyze the overall visual tone, mood, and emotional qualities conveyed by the design.

**Agent:** analyst
**Instructions:** Inline instructions below
**Input Artifacts:**
- All screenshots in `data/`

**Output Artifact:** `artifacts/02e-tone-mood.md`

**Task Details:**

Analyze the emotional and aesthetic qualities of the visual design:

1. **Overall tone descriptors**:
   - Professional vs playful
   - Serious vs lighthearted
   - Corporate vs creative
   - Traditional vs innovative

2. **Aesthetic qualities**:
   - Modern, retro, futuristic, etc.
   - Minimal vs maximal
   - Organic vs geometric
   - Warm vs cool

3. **Emotional resonance**:
   - What feelings does the design evoke?
   - Energy level (calm, energetic, bold)
   - Approachability vs exclusivity
   - Sophistication level

4. **Industry/context fit**:
   - Web3/crypto aesthetic alignment
   - Creative agency positioning
   - How visual tone supports brand message

Support observations with specific visual examples from screenshots.

---

### 3. Strategic Synthesis

Synthesize all analysis artifacts into a comprehensive, actionable Visual Assets Guidelines STRATEGY.md.

**Agent:** strategist
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/02a-color-palette.md`
- `artifacts/02b-typography.md`
- `artifacts/02c-brand-elements.md`
- `artifacts/02d-composition-layout.md`
- `artifacts/02e-tone-mood.md`

**Output Artifact:** `artifacts/03-synthesis.md` and `STRATEGY.md`

**Task Details:**

Create a comprehensive Visual Assets Guidelines document that:

1. **Consolidates findings** from all 5 analysis phases into coherent guidelines
2. **Structures by design system categories**:
   - Color Palette (with usage rules)
   - Typography System (with hierarchy and application)
   - Brand Elements (with usage guidelines)
   - Composition Principles (with do's and don'ts)
   - Visual Tone & Style (with mood descriptors)

3. **Makes guidelines actionable**:
   - Clear rules for each design element
   - Practical application guidance
   - Examples of correct usage
   - Common patterns to follow

4. **Maintains brand consistency**:
   - Identifies what's mandatory vs flexible
   - Notes patterns that appear across multiple contexts
   - Highlights signature elements that define the brand

5. **References source material**:
   - All guidelines reference specific screenshot evidence
   - Uses markdown links to analysis artifacts
   - Preserves audit trail from synthesis → analysis → screenshots

Output should be production-ready STRATEGY.md suitable for guiding visual asset creation across all channels.

## Success Criteria

- ✅ All 5 screenshots analyzed systematically across 5 design dimensions
- ✅ Complete color palette documented with hex codes and usage patterns
- ✅ Typography system fully specified with hierarchy and application rules
- ✅ All brand elements cataloged with usage guidelines
- ✅ Composition principles articulated with practical examples
- ✅ Visual tone clearly defined and aligned with brand positioning
- ✅ STRATEGY.md is comprehensive, actionable, and evidence-based
- ✅ All guidelines reference specific screenshot examples
- ✅ Document ready for immediate use in visual asset creation

# Synthesize Brand Fundamentals Strategy

Transform founder interview research into clear, actionable brand fundamentals that define who you are and why you exist.

---

## Synthesis Objective

**Goal:** Create prescriptive brand fundamentals that guide all strategic and creative decisions.

**Inputs:**
- `/research/founder-interview/RESEARCH.md`

**Output:**
- `/strategy/brand-fundamentals/STRATEGY.md` (polished, opinionated guidance)
- Updated CHANGELOG.md

---

## Prerequisites Check

Before synthesis, verify:

1. **Research exists:** `/research/founder-interview/RESEARCH.md` file is present
2. **Research is current:** Research `last_updated` (frontmatter) is newer than strategy `last_updated` OR strategy doesn't exist yet
3. **Research is complete:** RESEARCH.md contains mission, values, vision, origin story

If prerequisites fail, prompt user to run research workflow first.

---

## Synthesis Process

### Phase 1: Strategic Synthesis

**Purpose:** Transform research findings into prescriptive brand fundamentals.

**Delegation:**
- **Agent:** general-purpose
- **Instructions:** [phase-1-synthesis.md](phase-1-synthesis.md)
- **Context needed:** `/research/founder-interview/RESEARCH.md` (path reference)

**Synthesis activities:**
- Extract and refine mission statement (why you exist)
- Articulate core values with explanations (what you believe)
- Clarify vision (where you're going)
- Document origin story (how you started)
- Define brand principles (how values manifest in decisions)
- Add cross-references to research for audit trail

**Output:** `/strategy/brand-fundamentals/STRATEGY.md`

---

## Output Structure

Use template: [templates/brand-fundamentals.md](../../templates/brand-fundamentals.md)

**Required sections:**

1. **Frontmatter** - Metadata with last_updated, research sources
2. **Mission & Purpose** - Why the business exists
3. **Core Values** - Fundamental beliefs (with explanations)
4. **Vision** - Long-term aspirations
5. **Origin Story** - How and why the business was founded
6. **Brand Principles** - How values translate into decisions

**Tone:** Prescriptive, clear, inspiring
**Format:** Markdown with cross-references to research

---

## Update vs Create

**Creating (first time):**
- No existing STRATEGY.md
- Synthesize from research

**Updating:**
- Existing STRATEGY.md present
- Compare research date with strategy date
- Only update if research is newer
- Update CHANGELOG.md with what changed
